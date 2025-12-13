# Preflight Check — Schema Reference

**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Status:** Single Source of Truth  
**Stream Coding:** v3.3 Compliant

---

## 🎯 CRITICAL: DO NOT DUPLICATE THESE VALUES

**All other documentation files must reference THIS file for constraints and data models.**

**Why:** Prevents contradictions when values change. Update here once, all docs stay consistent.

**How to reference:**
```markdown
See [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#input-constraints) for constraints
```

---

## 📊 CONSTRAINT SUMMARY

```
Input:
├─ Min length:        10 characters
├─ Max length:        2,000 characters
└─ Required:          Yes (non-empty after trim)

Output:
├─ Sections:          3 (Ambiguities, Edge Cases, Fixes)
├─ Items per section: Max 3
├─ Words per item:    Max 15
└─ Status values:     "needs_work" | "ready"

Timing:
├─ API timeout:       15 seconds
├─ Cooldown:          4 seconds (after every run)
├─ Rate limit:        None (Lovable handles)
└─ Max output:        120 words
```

---

## 📥 INPUT CONSTRAINTS

| Constraint | Value | Validation | Error Message |
|------------|-------|------------|---------------|
| `min_length` | 10 | `input.trim().length >= 10` | "Please enter at least 10 characters" |
| `max_length` | 2000 | `input.length <= 2000` | "Description too long (max 2000 characters)" |
| `required` | true | `input.trim().length > 0` | "Please enter a description" |

### Input Validation Logic

```typescript
function validateInput(input: string): ValidationResult {
  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: "Please enter a description" };
  }
  
  if (trimmed.length < 10) {
    return { valid: false, error: "Please enter at least 10 characters" };
  }
  
  if (input.length > 2000) {
    return { valid: false, error: "Description too long (max 2000 characters)" };
  }
  
  return { valid: true };
}
```

---

## 📤 OUTPUT CONSTRAINTS

| Constraint | Value | Enforced By |
|------------|-------|-------------|
| `sections` | 3 | System prompt |
| `max_items_per_section` | 3 | System prompt |
| `max_words_per_item` | 15 | System prompt |
| `status_values` | `["needs_work", "ready"]` | System prompt + TypeScript |
| `language` | Match input | System prompt |

### Output Section Definitions

| Section | Icon | Purpose | Format |
|---------|------|---------|--------|
| `ambiguities` | ⚠️ | Things AI will guess wrong | Short phrase |
| `edge_cases` | 🧨 | Scenarios not addressed | Short phrase |
| `clarifying_fixes` | 🛠️ | Phrases to add | `"Add: \"...\""` |

---

## 🗄️ DATA MODELS

### Request Model

```typescript
interface PreflightRequest {
  description: string;  // 10-2000 chars, trimmed
}
```

### Response Model

**Note:** AI outputs plain text with emoji headers (not JSON).

```typescript
// Parsed result from plain text output
interface PreflightResponse {
  status: "needs_work" | "ready";
  raw: string;                 // Always keep raw output
  ambiguities: string[];       // max 3 items, max 15 words each
  edge_cases: string[];        // max 3 items, max 15 words each
  clarifying_fixes: string[];  // max 3 items, format: "Add: \"...\""
}
```

### Raw Output Format

```
⚠️ What's unclear
• [point]
• [point]
• [point]

🧨 What could break
• [scenario]
• [scenario]
• [scenario]

🛠️ What to add before generating
• Add: "[specific sentence]"
• Add: "[specific sentence]"
• Add: "[specific sentence]"
```

OR (if ready):

```
✅ Ready to generate. No major issues found.
```

### Validation Result Model

```typescript
interface ValidationResult {
  valid: boolean;
  error?: string;
}
```

### UI State Model

```typescript
type UIState = 
  | "empty"           // No input yet
  | "typing"          // Input < 10 chars
  | "valid"           // Input valid, ready to analyze
  | "loading"         // API call in progress
  | "results"         // Showing analysis results
  | "error";          // Error state

interface AppState {
  input: string;
  uiState: UIState;
  result: PreflightResponse | null;
  error: string | null;
}
```

---

## ⏱️ TIMING CONSTRAINTS {#timing-constraints}

| Constraint | Value | Rationale |
|------------|-------|-----------|
| `api_timeout` | 15000 ms (15s) | UX threshold - fail fast |
| `cooldown` | 4000 ms (4s) | Prevent spam clicks, credit burn |
| `debounce_input` | 0 ms | No debounce (analyze on click only) |
| `loading_min` | 500 ms | Prevent flash of loading state |

### Cooldown Behavior

```
Any run completes (success OR failure)
    │
    ▼
Cooldown starts: 4 seconds
Button text: "Wait 4s..." → "Wait 3s..." → "Wait 2s..." → "Wait 1s..."
    │
    ▼
Cooldown expires
Button re-enabled: "Run Preflight"
```

**Critical:** Retry does NOT bypass cooldown.

---

## 🎨 UI CONSTRAINTS

| Element | Constraint | Value |
|---------|------------|-------|
| Textarea | Min height | 120px |
| Textarea | Max height | 300px |
| Textarea | Font size | 16px |
| Button | Width (mobile) | 100% |
| Button | Width (desktop) | auto |
| Cards | Border radius | 8px |
| Cards | Padding | 16px |

### Card Colors

| Card Type | Background Color |
|-----------|------------------|
| ⚠️ Ambiguities | `#FEF3C7` (light yellow) |
| 🧨 Edge Cases | `#FEE2E2` (light red) |
| 🛠️ Fixes | `#DBEAFE` (light blue) |
| ✅ Ready | `#D1FAE5` (light green) |

---

## 📋 STATUS VALUES

### `needs_work`

Returned when description has issues.

```json
{
  "status": "needs_work",
  "ambiguities": ["item 1", "item 2"],
  "edge_cases": ["item 1"],
  "clarifying_fixes": ["Add: \"specific phrase\""]
}
```

### `ready`

Returned when description is clear.

```json
{
  "status": "ready",
  "ambiguities": [],
  "edge_cases": [],
  "clarifying_fixes": [],
  "optional_tip": "Consider adding X for polish"
}
```

---

## 🌍 LANGUAGE BEHAVIOR

| Input Language | Output Language | Example |
|----------------|-----------------|---------|
| English | English | "Who are the target users?" |
| Italian | Italian | "Chi sono gli utenti target?" |
| Spanish | Spanish | "¿Quiénes son los usuarios objetivo?" |
| Mixed | Primary language | Detect dominant language |

**Detection:** System prompt instructs Claude to match input language.

---

## ⚠️ ERROR CODES

| Code | HTTP | Meaning | User Message |
|------|------|---------|--------------|
| `EMPTY_INPUT` | 400 | Input is empty | "Please enter a description" |
| `TOO_SHORT` | 400 | Input < 10 chars | "Please enter at least 10 characters" |
| `TOO_LONG` | 400 | Input > 2000 chars | "Description too long (max 2000 characters)" |
| `API_TIMEOUT` | 504 | Claude didn't respond in 15s | "Preflight couldn't run this time. Try again." |
| `API_ERROR` | 500 | Claude API error | "Service temporarily unavailable" |
| `PARSE_ERROR` | 500 | Invalid JSON from Claude | "Could not analyze. Try rephrasing?" |
| `NETWORK_ERROR` | 0 | No network connection | "Connection error. Check your internet." |
| `RATE_LIMITED` | 429 | Too many requests | "Too many requests. Wait a moment." |

---

## 📊 EXAMPLE OUTPUTS

### Example 1: Vague Input (needs_work)

**Input:**
```
App per gestire task del team
```

**AI Output (plain text):**
```
⚠️ What's unclear
• Who are users — individuals, managers, or both?
• How organized — lists, boards, or calendar?
• What does 'manage' mean — create, assign, track?

🧨 What could break
• Hundreds of tasks with no organization
• Multiple users editing same task simultaneously
• Tasks without due dates getting lost

🛠️ What to add before generating
• Add: "Task manager for small teams (3-5 people)"
• Add: "Kanban board: To Do, In Progress, Done"
• Add: "Each task has: title, assignee, due date, status"
```

### Example 2: Clear Input (ready)

**Input:**
```
A BMI calculator. Two fields: weight (kg), height (cm). One button: Calculate. Shows result with category (underweight/normal/overweight/obese). Color-coded result. No login. No data saved. Mobile responsive.
```

**AI Output (plain text):**
```
✅ Ready to generate. No major issues found.
```

### Example 3: Partial Input (needs_work, fewer bullets)

**Input:**
```
E-commerce for selling handmade jewelry with Stripe payments
```

**AI Output (plain text):**
```
⚠️ What's unclear
• Single seller or marketplace with multiple sellers?
• Shipping — flat rate, calculated, or pickup only?

🧨 What could break
• Product with multiple variants (size, color)
• Out of stock handling

🛠️ What to add before generating
• Add: "Single-seller shop, I am the only vendor"
• Add: "Flat rate shipping €5, free over €50"
```

---

## 🔗 REFERENCES

### Internal Documentation

| Topic | Document | Section |
|-------|----------|---------|
| System Prompt | [Part01](../02-technical-specs/Part01_System_Prompt.md) | Section 2 |
| UI Components | [Part02](../02-technical-specs/Part02_UI_Components.md) | All |
| Error Handling | [Part03](../02-technical-specs/Part03_Error_Handling.md) | All |
| Master Blueprint | [Blueprint](../01-master-blueprint/MASTER_BLUEPRINT.md) | All |

---

## DOCUMENT INTEGRITY

**Document Type:** Reference (Single Source of Truth)  
**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Stream Coding:** v3.3 Compliant

**Maintenance:** When constraints change → update this file only.

---

**END OF SCHEMA REFERENCE**
