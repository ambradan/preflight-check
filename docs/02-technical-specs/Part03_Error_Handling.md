# Preflight Check — Technical Specs — Part 03
## Error Handling Specification

**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Status:** Implementation Ready  
**Stream Coding:** v3.3 Compliant  
**Document Type:** Implementation (HOW)

---

## 📋 Table of Contents

1. [Overview](#1-overview)
2. [Error Classification](#2-error-classification)
3. [Error Handling Matrix](#3-error-handling-matrix)
4. [Recovery Workflows](#4-recovery-workflows)
5. [User Messages](#5-user-messages)
6. [Anti-Patterns (DO NOT)](#6-anti-patterns-do-not)
7. [Test Case Specifications](#7-test-case-specifications)
8. [References](#8-references)

---

## 1. OVERVIEW

### 1.1 Purpose

This document specifies all error scenarios and handling strategies for Preflight Check.

### 1.2 Error Philosophy

1. **Fail gracefully** — Never show technical errors to users
2. **Preserve work** — Never clear user input on error
3. **Enable recovery** — Always provide a way forward
4. **Be honest** — Don't hide errors, explain them simply

### 1.3 Error Categories

| Category | Source | Recovery |
|----------|--------|----------|
| Validation | Client-side | Instant feedback |
| Network | Connection | Retry button |
| API | Lovable/Claude | Retry button |
| Parse | JSON response | Rephrase suggestion |

---

## 2. ERROR CLASSIFICATION

### 2.1 Client-Side Errors (Validation)

| Error Code | Trigger | Severity | Blocking? |
|------------|---------|----------|-----------|
| `EMPTY_INPUT` | Input empty after trim | Low | Yes |
| `TOO_SHORT` | Input < 10 chars | Low | Yes |
| `TOO_LONG` | Input > 2000 chars | Low | Yes |

**Handling:** Inline validation, button stays disabled.

### 2.2 Network Errors

| Error Code | Trigger | Severity | Blocking? |
|------------|---------|----------|-----------|
| `NETWORK_ERROR` | fetch() throws | Medium | Yes |
| `TIMEOUT` | No response in 15s | Medium | Yes |

**Handling:** Show error state with retry button.

### 2.3 API Errors

| Error Code | HTTP Status | Trigger | Severity |
|------------|-------------|---------|----------|
| `API_ERROR` | 500 | Server error | High |
| `RATE_LIMITED` | 429 | Too many requests | Medium |
| `UNAUTHORIZED` | 401 | Auth failure | High |
| `BAD_REQUEST` | 400 | Invalid request | Medium |

**Handling:** Show error state with retry button.

### 2.4 Parse Errors

| Error Code | Trigger | Severity |
|------------|---------|----------|
| `PARSE_ERROR` | JSON.parse() fails | Medium |
| `SCHEMA_ERROR` | Missing required fields | Medium |
| `INVALID_STATUS` | Status not in enum | Medium |

**Handling:** Show error state, suggest rephrasing.

---

## 3. ERROR HANDLING MATRIX

### 3.1 Validation Errors

| Error | Detection | Response | UI State | Recovery |
|-------|-----------|----------|----------|----------|
| Empty input | `trim().length === 0` | Show validation message | Button disabled | User types |
| Too short | `length < 10` | Show "at least 10 chars" | Button disabled | User types more |
| Too long | `length > 2000` | Show "max 2000 chars" | Counter red, button disabled | User shortens |

### 3.2 Network Errors

| Error | Detection | Response | UI State | Retry |
|-------|-----------|----------|----------|-------|
| Offline | `navigator.onLine === false` | "Check your internet" | Error card | Auto on reconnect |
| Timeout | 15s AbortController | "Taking too long" | Error card | Manual button (respects cooldown) |
| Connection refused | fetch throws TypeError | "Connection error" | Error card | Manual button |

### 3.3 API Errors

| Error | HTTP | Detection | Response | Retry |
|-------|------|-----------|----------|-------|
| Server error | 500 | `!response.ok` | "Service unavailable" | After 5s |
| Rate limit | 429 | `response.status === 429` | "Wait a moment" | After 60s |
| Unauthorized | 401 | `response.status === 401` | Refresh page | Manual |
| Bad request | 400 | `response.status === 400` | "Invalid request" | Manual |

### 3.4 Parse Errors

| Error | Detection | Response | Suggestion |
|-------|-----------|----------|------------|
| Invalid JSON | `JSON.parse()` throws | "Could not analyze" | Rephrase |
| Missing status | `!result.status` | "Invalid response" | Rephrase |
| Invalid status | `!['needs_work','ready'].includes(status)` | "Invalid response" | Rephrase |
| Missing arrays | `!Array.isArray(ambiguities)` | "Invalid response" | Rephrase |

---

## 4. RECOVERY WORKFLOWS

### 4.1 Standard Retry Flow

```
User clicks "Analyze"
    │
    ▼
API Call (timeout: 15s)
    │
    ├─── Success ──────► Show Results ──► Cooldown 4s starts
    │
    └─── Error ──────► Show Error State ──► Cooldown 4s starts
                            │
                            ▼
                       Button shows "Wait Xs..." countdown
                            │
                            ▼
                       Cooldown expires
                            │
                            ▼
                       User clicks "Try Again"
                            │
                            ▼
                       API Call (retry) ──► Cooldown 4s starts again
```

**Critical:** Retry does NOT bypass cooldown. Every run (success or fail) triggers 4s cooldown.

### 4.2 Cooldown Flow (CRITICAL)

```
Any API call completes (success OR failure)
    │
    ▼
Start 4s cooldown
Button disabled
Button text: "Wait 4s..." → "Wait 3s..." → "Wait 2s..." → "Wait 1s..."
    │
    ▼
Cooldown expires
    │
    ▼
Button re-enabled: "Run Preflight"
User can submit again
```

**Why cooldown matters:**
- Prevents credit burn from spam clicks
- Prevents double API calls from nervous users
- Gives AI time to complete
- Clear feedback = fewer frustrated retries

### 4.3 Rate Limit Recovery

```
API returns 429
    │
    ▼
Disable button for 60s (overrides 4s cooldown)
Show countdown: "Try again in 60s"
    │
    ▼
Timer expires
    │
    ▼
Re-enable button
User can retry
```

### 4.4 Parse Error Recovery

```
JSON parse fails OR schema invalid
    │
    ▼
Show error: "Could not analyze. Try rephrasing?"
Keep user input
    │
    ▼
User modifies input
    │
    ▼
User clicks "Try Again"
    │
    ▼
New API call
```

---

## 5. USER MESSAGES

### 5.1 Validation Messages

| Error | Message | Tone |
|-------|---------|------|
| Empty | "Please enter a description" | Neutral |
| Too short | "Please enter at least 10 characters" | Helpful |
| Too long | "Description too long (max 2000 characters)" | Informative |

### 5.2 Network Messages

| Error | Message | Tone |
|-------|---------|------|
| Offline | "Connection error. Check your internet." | Helpful |
| Timeout | "Analysis taking too long. Try again?" | Empathetic |

### 5.3 API Messages

| Error | Message | Tone |
|-------|---------|------|
| 500 | "Service temporarily unavailable" | Apologetic |
| 429 | "Too many requests. Wait a moment." | Calm |
| 401 | "Session expired. Please refresh." | Direct |

### 5.4 Parse Messages

| Error | Message | Tone |
|-------|---------|------|
| Parse fail | "Could not analyze. Try rephrasing?" | Helpful |
| Schema fail | "Something went wrong. Try again?" | Neutral |

### 5.5 Message Guidelines

| DO | DON'T |
|----|-------|
| ✅ "Try again" | ❌ "Error 500" |
| ✅ "Check your internet" | ❌ "NetworkError: Failed to fetch" |
| ✅ "Service unavailable" | ❌ "API rate limit exceeded" |
| ✅ Simple language | ❌ Technical jargon |
| ✅ Suggest action | ❌ Just state problem |

---

## 6. ANTI-PATTERNS (DO NOT)

### 6.1 Error Handling Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| Show stack traces | Confuses users, security risk | Generic user message |
| Clear input on error | User loses work | Keep input, show error |
| Silent failures | User thinks app is broken | Always show feedback |
| Auto-retry infinitely | Burns API quota | Max 3 retries |
| Ignore 429 | Gets rate limited more | Implement backoff |
| Generic "Error" | Not actionable | Specific message + action |

### 6.2 UX Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| Error toast that auto-hides | User misses it | Persistent until dismissed |
| Red everything | Creates panic | Calm colors, clear message |
| No retry option | User stuck | Always offer retry |
| Block entire app | Over-reaction | Localize error to output area |
| Show error + results | Confusing | One or the other |

### 6.3 Code Anti-patterns

```typescript
// ❌ WRONG: Swallowing errors
try {
  await analyze();
} catch (e) {
  // do nothing
}

// ✅ CORRECT: Handle explicitly
try {
  await analyze();
} catch (e) {
  setError(getErrorMessage(e));
  setUIState('error');
}

// ❌ WRONG: Exposing internals
catch (e) {
  setError(e.message); // "TypeError: Cannot read property..."
}

// ✅ CORRECT: User-friendly message
catch (e) {
  setError("Something went wrong. Please try again.");
  console.error(e); // Log for debugging
}
```

---

## 7. TEST CASE SPECIFICATIONS

### 7.1 Validation Error Tests

| Test ID | Scenario | Input | Expected |
|---------|----------|-------|----------|
| ERR-V01 | Empty submit | "" | Button disabled, no API call |
| ERR-V02 | Too short | "hello" | Error message, button disabled |
| ERR-V03 | Too long | 2001 chars | Counter red, button disabled |
| ERR-V04 | Whitespace only | "   " | Error message, button disabled |
| ERR-V05 | Valid then invalid | Type 15 chars, delete to 5 | Button changes to disabled |

### 7.2 Network Error Tests

| Test ID | Scenario | Mock | Expected UI |
|---------|----------|------|-------------|
| ERR-N01 | Offline | `navigator.onLine = false` | "Check your internet" |
| ERR-N02 | Timeout | Delay 31s | "Taking too long" |
| ERR-N03 | DNS failure | fetch throws | "Connection error" |
| ERR-N04 | Connection reset | fetch throws | "Connection error" |

### 7.3 API Error Tests

| Test ID | Scenario | Mock Response | Expected UI |
|---------|----------|---------------|-------------|
| ERR-A01 | Server error | 500 | "Service unavailable" + retry |
| ERR-A02 | Rate limited | 429 | "Wait a moment" + countdown |
| ERR-A03 | Unauthorized | 401 | "Session expired. Refresh." |
| ERR-A04 | Bad request | 400 | "Invalid request" + retry |

### 7.4 Parse Error Tests

| Test ID | Scenario | Mock Response | Expected UI |
|---------|----------|---------------|-------------|
| ERR-P01 | Invalid JSON | `{invalid` | "Could not analyze" |
| ERR-P02 | Missing status | `{}` | "Something went wrong" |
| ERR-P03 | Invalid status | `{status: "bad"}` | "Something went wrong" |
| ERR-P04 | Non-array items | `{status: "needs_work", ambiguities: "string"}` | "Something went wrong" |

### 7.5 Recovery Tests

| Test ID | Scenario | Action | Expected |
|---------|----------|--------|----------|
| ERR-R01 | Retry after 500 | Click "Try Again" | New API call |
| ERR-R02 | Retry after timeout | Click "Try Again" | New API call |
| ERR-R03 | Rate limit countdown | Wait 60s | Button re-enabled |
| ERR-R04 | Input preserved | Error occurs | Input still contains text |
| ERR-R05 | Max retries | Click 4 times | "Please try again later" |

### 7.6 Test Fixtures

```typescript
// Mock responses for testing
const mockResponses = {
  success: {
    status: 200,
    body: { status: 'needs_work', ambiguities: ['item'], edge_cases: [], clarifying_fixes: [] }
  },
  serverError: {
    status: 500,
    body: { error: 'Internal Server Error' }
  },
  rateLimited: {
    status: 429,
    headers: { 'Retry-After': '60' }
  },
  invalidJson: {
    status: 200,
    body: '{invalid json'
  }
};
```

---

## 8. REFERENCES

### 8.1 Schema References

| Topic | Location | Anchor |
|-------|----------|--------|
| Error codes | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#error-codes) | `#error-codes` |
| Timing constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#timing-constraints) | `#timing-constraints` |

### 8.2 Related Technical Specs

| Topic | Document | Section |
|-------|----------|---------|
| UI States | [Part02](./Part02_UI_Components.md#state-management) | Section 4 |
| System Prompt | [Part01](./Part01_System_Prompt.md) | Section 2 |

---

## DOCUMENT INTEGRITY

**Document Type:** Implementation (HOW)  
**Part:** 3 of 3 (Technical Specs)  
**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Stream Coding:** v3.3 Compliant

**Sections included per v3.3:**
- ✅ Error Handling Matrix (Section 3)
- ✅ Anti-patterns (Section 6)
- ✅ Test Case Specifications (Section 7)
- ✅ Deep Links / References (Section 8)

---

**END OF PART 03 — ERROR HANDLING SPECIFICATION**
