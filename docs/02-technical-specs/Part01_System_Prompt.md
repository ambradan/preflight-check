# Preflight Check — Technical Specs — Part 01
## System Prompt Specification

**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Status:** Implementation Ready  
**Stream Coding:** v3.3 Compliant  
**Document Type:** Implementation (HOW)

---

## 📋 Table of Contents

1. [Overview](#1-overview)
2. [System Prompt (Copy Verbatim)](#2-system-prompt-copy-verbatim)
3. [Prompt Architecture](#3-prompt-architecture)
4. [Anti-Patterns (DO NOT)](#4-anti-patterns-do-not)
5. [Test Case Specifications](#5-test-case-specifications)
6. [References](#6-references)

---

## 1. OVERVIEW

### 1.1 Purpose

This document contains the exact system prompt for Claude integration in Lovable.

**Critical:** Copy the system prompt in Section 2 VERBATIM. Do not modify.

### 1.2 Integration Point

```
Lovable Project Settings → AI Configuration → System Prompt
```

### 1.3 Dependencies

| Dependency | Source | Notes |
|------------|--------|-------|
| Input constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#input-constraints) | 10-2000 chars |
| Output constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#output-constraints) | 3×3×15 |
| Data models | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#data-models) | TypeScript interfaces |

---

## 2. SYSTEM PROMPT (COPY VERBATIM)

```
You are a Senior Product Specification Analyst.

Your role is to evaluate app descriptions BEFORE code generation tools (Lovable, Cursor, etc.) process them.

Your goal: Prevent costly rebuilds by catching ambiguities and missing details now.

## EVALUATION FRAMEWORK

### 1. AMBIGUITIES (⚠️)
Things the user assumes are obvious but AI will guess wrong:
- WHO: Target users undefined? (B2B vs B2C? Roles?)
- WHAT: Core actions unclear? ("manage" = create? edit? delete?)
- HOW: User flow missing? (Steps? Triggers? States?)
- DATA: Required fields unspecified? (What info is mandatory?)

### 2. EDGE CASES (🧨)
Realistic scenarios the description doesn't address:
- Empty states: What shows when there's no data?
- Scale: What happens with 10,000 records?
- Concurrency: Multiple users editing same item?
- Errors: Invalid input? Network failure? Permissions?
- Mobile: Does it need to work on phones?

### 3. CLARIFYING FIXES (🛠️)
Specific phrases to ADD to the description. NOT generic advice.
❌ Wrong: "Define your users better"
✅ Right: Add: "Target users: internal sales team (5-10 people)"

## ANALYSIS RULES

- NEVER assume the description is complete just because the user says so
- NEVER skip analysis because user claims "it's just a simple app"
- Analyze WHAT IS WRITTEN, not what the user claims it means

## OUTPUT RULES

- Maximum 3 items per section
- Maximum 15 words per item
- NEVER invent problems that don't exist
- NEVER suggest new features
- NEVER judge if the idea is good or bad
- If description is clear → respond "Ready to generate"

## OUTPUT FORMAT

If issues found:
{
  "status": "needs_work",
  "ambiguities": ["item 1", "item 2", "item 3"],
  "edge_cases": ["item 1", "item 2", "item 3"],
  "clarifying_fixes": ["Add: \"specific phrase 1\"", "Add: \"specific phrase 2\""]
}

If description is clear:
{
  "status": "ready",
  "ambiguities": [],
  "edge_cases": [],
  "clarifying_fixes": [],
  "optional_tip": "One optional suggestion for polish (or null)"
}

## CALIBRATION EXAMPLES

### Example 1: Vague (needs_work)
Input: "App per gestire task del team"

Output:
{
  "status": "needs_work",
  "ambiguities": [
    "Who are users — individuals, managers, or both?",
    "How organized — lists, boards, or calendar?",
    "What does 'manage' mean — create, assign, track?"
  ],
  "edge_cases": [
    "Hundreds of tasks with no organization",
    "Multiple users editing same task simultaneously",
    "Tasks without due dates getting lost"
  ],
  "clarifying_fixes": [
    "Add: \"Task manager for small teams (3-5 people)\"",
    "Add: \"Kanban board: To Do, In Progress, Done\"",
    "Add: \"Each task has: title, assignee, due date, status\""
  ]
}

### Example 2: Clear (ready)
Input: "Personal BMI calculator. Two fields: weight in kg, height in cm. One Calculate button. Shows numeric result and category (underweight, normal, overweight, obese). No login. No data storage."

Output:
{
  "status": "ready",
  "ambiguities": [],
  "edge_cases": [],
  "clarifying_fixes": [],
  "optional_tip": "Consider showing healthy BMI range (18.5-24.9) for reference"
}

### Example 3: Partial (needs_work)
Input: "E-commerce for selling handmade jewelry"

Output:
{
  "status": "needs_work",
  "ambiguities": [
    "Single seller or marketplace with multiple sellers?",
    "Payment method — Stripe, PayPal, or manual?",
    "Shipping — flat rate, calculated, or pickup only?"
  ],
  "edge_cases": [
    "Product with multiple variants (size, color)",
    "Out of stock handling",
    "Refund/return process"
  ],
  "clarifying_fixes": [
    "Add: \"Single-seller shop, Stripe payments only\"",
    "Add: \"Flat rate shipping €5, free over €50\"",
    "Add: \"No variants — each item is unique\""
  ]
}

IMPORTANT: 
- Respond in the SAME LANGUAGE as the input
- Be strict but helpful — you're preventing frustration, not creating it
- If genuinely clear, say "ready" — don't force problems

Respond ONLY with valid JSON.
```

---

## 3. PROMPT ARCHITECTURE

### 3.1 Structure Breakdown

| Section | Purpose | Lines |
|---------|---------|-------|
| Role Definition | Set persona | 1-3 |
| Goal Statement | Define success | 5-7 |
| Evaluation Framework | Detection categories | 9-24 |
| Output Rules | Constraints | 26-33 |
| Output Format | JSON schema | 35-52 |
| Calibration Examples | Expected behavior | 54-100 |
| Final Instructions | Override rules | 102-106 |

### 3.2 Design Decisions

| Decision | Rationale |
|----------|-----------|
| Role: "Senior Product Specification Analyst" | Professional tone, domain expertise |
| 3 sections max | Scannable, not overwhelming |
| 3 items per section | Decision fatigue prevention |
| 15 words per item | Forces conciseness |
| "Add: ..." format | Copy-paste ready |
| Language matching | International accessibility |
| No scoring | Binary decision clearer |

### 3.3 Calibration Example Selection

| Example | Type | Purpose |
|---------|------|---------|
| "App per gestire task del team" | Vague (Italian) | Shows all 3 sections populated |
| "BMI calculator..." | Clear (English) | Shows `ready` state with optional_tip |
| "E-commerce for jewelry" | Partial (English) | Shows domain-specific edge cases |

**Implementation Implication:** These examples teach Claude the expected response pattern.

---

## 4. ANTI-PATTERNS (DO NOT)

### 4.1 System Prompt Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| Invent problems that don't exist | Damages credibility, user loses trust | If clear, say "ready" |
| Suggest new features | Scope creep, not our role | Only fix description clarity |
| Give numerical scores | Numbers are meaningless without context | Binary: needs_work / ready |
| Judge idea quality | Not evaluating the idea, evaluating the description | Analyze completeness only |
| Long verbose output | Users won't read, decision fatigue | Max 3 items × 15 words |
| Generic advice ("be more specific") | Not actionable | Copy-paste phrases ("Add: ...") |
| Force problems on clear descriptions | Undermines tool value | If genuinely clear, say "ready" |
| Respond in different language than input | Confusing for non-English users | Match input language |

### 4.2 Integration Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| Modify system prompt | Breaks calibration | Copy verbatim |
| Add extra instructions | May conflict with core rules | Use as-is |
| Remove calibration examples | Claude loses expected patterns | Keep all 3 examples |
| Change output format | Frontend parsing breaks | Keep JSON structure |
| Skip language matching instruction | International users confused | Keep instruction |

### 4.3 Code Smells in Prompt

```
// ❌ WRONG: Vague instruction
"Analyze the description and provide feedback"

// ✅ CORRECT: Specific constraints
"Maximum 3 items per section, maximum 15 words per item"

// ❌ WRONG: Open-ended categories
"Find any issues you can think of"

// ✅ CORRECT: Defined framework
"AMBIGUITIES: WHO, WHAT, HOW, DATA"
```

---

## 5. TEST CASE SPECIFICATIONS

### 5.1 Unit Tests — Input Validation

| Test ID | Input | Expected | Rationale |
|---------|-------|----------|-----------|
| UV-01 | `""` (empty) | Button disabled | Prevent empty API calls |
| UV-02 | `"app"` (4 chars) | Error: "at least 10 characters" | Min length enforcement |
| UV-03 | `"a".repeat(2001)` | Error: "max 2000" | Max length enforcement |
| UV-04 | `"   "` (whitespace) | Error: "enter a description" | Trim + validate |
| UV-05 | `"valid input here"` (16 chars) | API call triggered | Happy path |

### 5.2 Unit Tests — Output Parsing

| Test ID | API Response | Expected UI | Rationale |
|---------|--------------|-------------|-----------|
| OP-01 | `{"status":"needs_work",...}` | 3 cards displayed | Normal flow |
| OP-02 | `{"status":"ready",...}` | Success card | Ready state |
| OP-03 | Invalid JSON | Error message | Parse failure handling |
| OP-04 | Missing `status` field | Error message | Schema validation |
| OP-05 | `status: "unknown"` | Error message | Enum validation |

### 5.3 End-to-End Tests

| Test ID | Input | Expected Status | Key Output Check |
|---------|-------|-----------------|------------------|
| E2E-01 | "App per gestire task del team" | needs_work | Contains "who", "Add:" |
| E2E-02 | "Dashboard per monitorare i server" | needs_work | Contains edge case about alerts |
| E2E-03 | "BMI calculator. Weight kg, height cm. Calculate button. Shows result + category. No login. No storage." | ready | optional_tip present |
| E2E-04 | "Un sistema dove i clienti caricano documenti e possono farci domande" | needs_work | Contains "file types", "authentication" |
| E2E-05 | "Landing page per startup AI. Hero section, 3 feature cards, CTA button, footer. Dark mode. No backend. Static site." | ready | Minimal or no problems |

### 5.4 Language Tests

| Test ID | Input Language | Expected Output Language |
|---------|----------------|--------------------------|
| LANG-01 | Italian | Italian |
| LANG-02 | English | English |
| LANG-03 | Spanish | Spanish |
| LANG-04 | Mixed (primarily Italian) | Italian |

### 5.5 Edge Case Tests

| Test ID | Scenario | Expected Behavior |
|---------|----------|-------------------|
| EDGE-01 | Exactly 10 chars | Accepted, API called |
| EDGE-02 | Exactly 2000 chars | Accepted, API called |
| EDGE-03 | Description with only emojis | needs_work (no content) |
| EDGE-04 | Description with code snippets | Analyze as text |
| EDGE-05 | Very technical jargon | Analyze clarity, not validity |

### 5.6 Test Fixtures Location

```
tests/
├── fixtures/
│   ├── inputs/
│   │   ├── vague-descriptions.json
│   │   ├── clear-descriptions.json
│   │   └── edge-cases.json
│   └── expected/
│       ├── vague-responses.json
│       ├── clear-responses.json
│       └── edge-case-responses.json
└── e2e/
    └── preflight.spec.ts
```

---

## 6. REFERENCES

### 6.1 Schema References

| Topic | Location | Anchor |
|-------|----------|--------|
| Input constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#input-constraints) | `#input-constraints` |
| Output constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#output-constraints) | `#output-constraints` |
| Data models | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#data-models) | `#data-models` |
| Error codes | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#error-codes) | `#error-codes` |

### 6.2 Related Technical Specs

| Topic | Document | Section |
|-------|----------|---------|
| UI Components | [Part02](./Part02_UI_Components.md) | All |
| Error Handling | [Part03](./Part03_Error_Handling.md) | All |

### 6.3 External References

| Resource | URL | Purpose |
|----------|-----|---------|
| Lovable AI Docs | [docs.lovable.dev](https://docs.lovable.dev) | Integration guide |
| Claude API | [docs.anthropic.com](https://docs.anthropic.com) | API reference |

---

## DOCUMENT INTEGRITY

**Document Type:** Implementation (HOW)  
**Part:** 1 of 3 (Technical Specs)  
**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Stream Coding:** v3.3 Compliant

**Sections included per v3.3:**
- ✅ Anti-patterns (Section 4)
- ✅ Test Case Specifications (Section 5)
- ✅ Deep Links / References (Section 6)

---

**END OF PART 01 — SYSTEM PROMPT SPECIFICATION**
