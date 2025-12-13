# Preflight Check — Technical Specs — Part 02
## UI Components Specification

**Version:** 2.0  
**Last Updated:** December 13, 2025  
**Status:** Implementation Ready  
**Stream Coding:** v3.3 Compliant  
**Document Type:** Implementation (HOW)

---

## 📋 Table of Contents

1. [Overview](#1-overview)
2. [Layout Specification](#2-layout-specification)
3. [Component Specifications](#3-component-specifications)
4. [State Management](#4-state-management)
5. [Anti-Patterns (DO NOT)](#5-anti-patterns-do-not)
6. [Test Case Specifications](#6-test-case-specifications)
7. [Error Handling](#7-error-handling)
8. [References](#8-references)

---

## 1. OVERVIEW

### 1.1 Purpose

This document specifies all UI components for the Preflight Check MVP.

### 1.2 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Component framework (via Lovable) |
| Tailwind CSS | Styling |
| TypeScript | Type safety |

### 1.3 AI Integration

| Aspect | Value |
|--------|-------|
| AI Provider | Lovable AI (Gemini 2.5 Flash) |
| API Keys | None required (built-in) |
| System Prompt | Stored as constant in `/src/constants/systemPrompt.ts` |
| Output Format | Plain text with emoji headers |
| Timeout | 15 seconds |
| Cooldown | 4 seconds after every call |

**See:** [LOVABLE_PROMPT.md](./LOVABLE_PROMPT.md) for complete integration instructions.

### 1.4 Design Principles

1. **Minimal** — One input, one button, one output
2. **Scannable** — Results readable in 5 seconds
3. **Actionable** — Copy-paste fixes
4. **Responsive** — Mobile-first

---

## 2. LAYOUT SPECIFICATION

### 2.1 Desktop Layout (≥768px)

```
┌─────────────────────────────────────────────────────────┐
│                      HEADER                              │
│              ✈️ PREFLIGHT CHECK                          │
│     Catch issues before generating                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                  │    │
│  │  Describe what you want to build...            │    │
│  │                                                  │    │
│  │                                                  │    │
│  │                                                  │    │
│  └─────────────────────────────────────────────────┘    │
│                                       [0/2000 chars]    │
│                                                          │
│              [ ✈️  Run Preflight ]                      │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  OUTPUT AREA (hidden until results)                      │
│                                                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐    │
│  │⚠️ AMBIGUITIES│ │🧨 EDGE CASES │ │🛠️ CLARIFY BEFORE│    │
│  │             │ │             │ │    GENERATING   │    │
│  │ • item 1   │ │ • item 1   │ │ • Add: "..."    │    │
│  │ • item 2   │ │ • item 2   │ │ • Add: "..."    │    │
│  │ • item 3   │ │ • item 3   │ │ • Add: "..."    │    │
│  └─────────────┘ └─────────────┘ └─────────────────┘    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                      FOOTER                              │
│          Clearer input → better output                  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Mobile Layout (<768px)

```
┌─────────────────────────┐
│        HEADER           │
│   ✈️ PREFLIGHT CHECK    │
│   Catch issues before   │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ Describe the app... │ │
│ │                     │ │
│ │                     │ │
│ │                     │ │
│ └─────────────────────┘ │
│              [0/2000]   │
│                         │
│ [✈️ Run Preflight]      │
│                         │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ ⚠️ AMBIGUITIES      │ │
│ │ • item 1           │ │
│ │ • item 2           │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🧨 EDGE CASES       │ │
│ │ • item 1           │ │
│ │ • item 2           │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🛠️ CLARIFY          │ │
│ │ • Add: "..."       │ │
│ │ • Add: "..."       │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│  Clearer input →        │
│     better output       │
└─────────────────────────┘
```

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 Header Component

```tsx
interface HeaderProps {
  // No props needed
}

const Header: React.FC<HeaderProps> = () => (
  <header className="text-center py-8">
    <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
      ✈️ Preflight Check
    </h1>
    <p className="text-gray-600 mt-2">
      Catch issues before generating
    </p>
  </header>
);
```

| Property | Value |
|----------|-------|
| Padding | `py-8` (32px) |
| Title size | `text-3xl` (30px) |
| Subtitle color | `text-gray-600` |
| Alignment | Center |

### 3.2 Textarea Component

```tsx
interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const DescriptionInput: React.FC<TextareaProps> = ({ value, onChange, disabled }) => (
  <div className="relative">
    <textarea
      className="w-full min-h-[120px] max-h-[300px] p-4 border rounded-lg 
                 resize-y text-base focus:ring-2 focus:ring-blue-500
                 disabled:bg-gray-100 disabled:cursor-not-allowed"
      placeholder="Describe what you want to build..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      maxLength={2000}
    />
    <CharCounter current={value.length} max={2000} />
  </div>
);
```

| Property | Value | Rationale |
|----------|-------|-----------|
| Min height | 120px | Enough for 3-4 lines |
| Max height | 300px | Prevent page overflow |
| Padding | 16px | Comfortable input |
| Font size | 16px | Prevents iOS zoom |
| Border radius | 8px | Soft appearance |
| Max length | 2000 | Per Schema Reference |

### 3.3 Character Counter Component

```tsx
interface CharCounterProps {
  current: number;
  max: number;
}

const CharCounter: React.FC<CharCounterProps> = ({ current, max }) => {
  const isWarning = current > max * 0.9; // >90%
  const isError = current > max;
  
  return (
    <span className={`absolute bottom-2 right-2 text-sm
      ${isError ? 'text-red-500' : isWarning ? 'text-yellow-600' : 'text-gray-400'}`}>
      {current}/{max}
    </span>
  );
};
```

| State | Condition | Color |
|-------|-----------|-------|
| Normal | < 90% | `text-gray-400` |
| Warning | 90-100% | `text-yellow-600` |
| Error | > 100% | `text-red-500` |

### 3.4 Analyze Button Component

```tsx
interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  cooldown: number; // seconds remaining (0 = no cooldown)
}

const AnalyzeButton: React.FC<ButtonProps> = ({ onClick, disabled, loading, cooldown }) => {
  const isDisabled = disabled || loading || cooldown > 0;
  
  const getButtonText = () => {
    if (loading) return <><Spinner /> Analyzing...</>;
    if (cooldown > 0) return `Wait ${cooldown}s...`;
    return <>✈️ Run Preflight</>;
  };
  
  return (
    <button
      className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium
        flex items-center justify-center gap-2
        ${isDisabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {getButtonText()}
    </button>
  );
};
```

| State | Appearance | Text |
|-------|------------|------|
| Disabled | Gray background, not-allowed cursor | "Run Preflight" |
| Enabled | Purple-600 background, white text | "✈️ Run Preflight" |
| Hover | Purple-700 background | "✈️ Run Preflight" |
| Loading | Gray background, spinner | "Analyzing..." |
| Cooldown | Gray background | "Wait 4s..." → "Wait 3s..." → ... |

### 3.5 Result Card Component

```tsx
interface ResultCardProps {
  type: 'ambiguities' | 'edge_cases' | 'fixes' | 'ready';
  title: string;
  icon: string;
  items: string[];
}

const ResultCard: React.FC<ResultCardProps> = ({ type, title, icon, items }) => {
  const colors = {
    ambiguities: 'bg-yellow-50 border-yellow-200',
    edge_cases: 'bg-red-50 border-red-200',
    fixes: 'bg-blue-50 border-blue-200',
    ready: 'bg-green-50 border-green-200'
  };
  
  return (
    <div className={`p-4 rounded-lg border ${colors[type]}`}>
      <h3 className="font-semibold flex items-center gap-2 mb-3">
        {icon} {title}
      </h3>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">None found</p>
      )}
    </div>
  );
};
```

| Card Type | Background | Border |
|-----------|------------|--------|
| Ambiguities ⚠️ | `bg-yellow-50` | `border-yellow-200` |
| Edge Cases 🧨 | `bg-red-50` | `border-red-200` |
| Fixes 🛠️ | `bg-blue-50` | `border-blue-200` |
| Ready ✅ | `bg-green-50` | `border-green-200` |

### 3.6 Success State Component

```tsx
const SuccessState: React.FC = () => (
  <div className="p-6 rounded-lg bg-green-50 border border-green-200 text-center">
    <div className="text-4xl mb-3">✅</div>
    <h3 className="text-xl font-semibold text-green-700">Ready to Generate!</h3>
    <p className="text-green-600 mt-2">
      Your description is clear and complete.
    </p>
  </div>
);
```

### 3.7 AI Output Parser Component

```tsx
// Parse plain text AI output with emoji headers
interface ParsedOutput {
  status: 'needs_work' | 'ready';
  ambiguities: string[];
  edge_cases: string[];
  clarifying_fixes: string[];
}

function parseAIOutput(raw: string): ParsedOutput | null {
  // Check for "Ready to generate" first
  if (raw.includes('✅ Ready to generate')) {
    return {
      status: 'ready',
      ambiguities: [],
      edge_cases: [],
      clarifying_fixes: []
    };
  }
  
  // Try to parse sections by emoji headers
  const sections = {
    ambiguities: extractSection(raw, '⚠️'),
    edge_cases: extractSection(raw, '🧨'),
    clarifying_fixes: extractSection(raw, '🛠️')
  };
  
  // If all sections found, return parsed
  if (sections.ambiguities || sections.edge_cases || sections.clarifying_fixes) {
    return {
      status: 'needs_work',
      ...sections
    };
  }
  
  // Parsing failed - return null (will show raw output)
  return null;
}

function extractSection(raw: string, emoji: string): string[] {
  // Find section starting with emoji
  // Extract bullet points (lines starting with • or -)
  // Return array of items without the bullet prefix
}
```

**Critical:** If parsing fails, ALWAYS show raw output. Never hide AI response.

### 3.8 Raw Output Display Component

```tsx
interface RawOutputProps {
  raw: string;
}

const RawOutput: React.FC<RawOutputProps> = ({ raw }) => (
  <details className="mt-4">
    <summary className="text-sm text-gray-500 cursor-pointer">
      Show raw AI output
    </summary>
    <pre className="mt-2 p-3 bg-gray-100 rounded text-sm whitespace-pre-wrap">
      {raw}
    </pre>
  </details>
);
```

### 3.9 Error State Component

```tsx
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-center">
    <div className="text-4xl mb-3">⚠️</div>
    <h3 className="text-lg font-semibold text-red-700">{message}</h3>
    <button
      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      onClick={onRetry}
    >
      Try Again
    </button>
  </div>
);
```

---

## 4. STATE MANAGEMENT

### 4.1 Application State

```tsx
interface AppState {
  input: string;
  uiState: 'empty' | 'typing' | 'valid' | 'loading' | 'results' | 'error' | 'cooldown';
  result: PreflightResponse | null;
  rawOutput: string | null;  // CRITICAL: Always keep raw AI output
  error: string | null;
  cooldownSeconds: number;   // 0 = no cooldown, 4-1 = counting down
}

const initialState: AppState = {
  input: '',
  uiState: 'empty',
  result: null,
  rawOutput: null,
  error: null,
  cooldownSeconds: 0
};
```

### 4.2 Timing Constraints

| Constraint | Value | Behavior |
|------------|-------|----------|
| API Timeout | 15 seconds | Show error if exceeded |
| Cooldown | 4 seconds | After EVERY run (success or fail) |
| Countdown | Visual | "Wait 4s..." → "Wait 3s..." → "Wait 2s..." → "Wait 1s..." |

### 4.3 State Transitions

```
empty ─────────────────────────────────────────────────┐
  │ user types (length < 10)                           │
  ▼                                                    │
typing ──────────────────────────────────────────────┐ │
  │ user types (length >= 10)                        │ │
  ▼                                                  │ │
valid ─────────────────────────────────────────────┐ │ │
  │ user clicks Analyze                            │ │ │
  ▼                                                │ │ │
loading ─────────────────────────────────────────┐ │ │ │
  │ API success              API error           │ │ │ │
  ▼                          ▼                   │ │ │ │
results                    error                 │ │ │ │
  │ user clicks "Check Another"                    │ │ │ │
  └──────────────────────────────────────────────┴─┴─┴─┘
```

### 4.4 State → UI Mapping

| State | Textarea | Button | Output |
|-------|----------|--------|--------|
| `empty` | Enabled, placeholder | Disabled | Hidden |
| `typing` | Enabled, user input | Disabled | Hidden |
| `valid` | Enabled, user input | Enabled | Hidden |
| `loading` | Disabled | Loading spinner | Hidden |
| `results` | Enabled | "Check Another" | 3 cards or success |
| `error` | Enabled | "Try Again" | Error message |

---

## 5. ANTI-PATTERNS (DO NOT)

### 5.1 Layout Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| Fixed height textarea | Can't accommodate long descriptions | `min-h` + `max-h` + `resize-y` |
| Horizontal card layout on mobile | Cards too narrow to read | Vertical stack on mobile |
| Tiny touch targets (<44px) | Fails accessibility | Minimum 44px height for buttons |
| Text smaller than 16px on mobile | iOS auto-zoom on focus | Base font size 16px |

### 5.2 State Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| API call on every keystroke | Expensive, poor UX | Call only on button click |
| No loading state | User thinks app is broken | Show spinner immediately |
| Allow double-submit | Multiple API calls | Disable button while loading |
| Clear input on error | User loses their work | Keep input, show error |
| Auto-hide errors | User doesn't see them | Require user action to dismiss |

### 5.3 Component Anti-patterns

| ❌ Anti-pattern | Why It's Wrong | ✅ Correct Approach |
|-----------------|----------------|---------------------|
| Inline styles | Inconsistent, hard to maintain | Tailwind utility classes |
| Prop drilling 5+ levels | Complexity, bugs | Context or simpler structure |
| No TypeScript types | Runtime errors | Full type coverage |
| Magic numbers in code | Unclear, fragile | Use constants from Schema Reference |

### 5.4 Code Smells

```tsx
// ❌ WRONG: Magic number
<textarea maxLength={2000} />

// ✅ CORRECT: Named constant
const MAX_LENGTH = 2000; // From Schema Reference
<textarea maxLength={MAX_LENGTH} />

// ❌ WRONG: Inline condition
{items.length > 0 && items.map(...)}

// ✅ CORRECT: Clear conditional
{items.length > 0 ? (
  <ul>{items.map(...)}</ul>
) : (
  <p>None found</p>
)}
```

---

## 6. TEST CASE SPECIFICATIONS

### 6.1 Component Unit Tests

| Test ID | Component | Action | Expected |
|---------|-----------|--------|----------|
| UI-01 | Textarea | Type 5 chars | Counter shows "5/2000" |
| UI-02 | Textarea | Type 2001 chars | Counter red, input blocked |
| UI-03 | Button | Click when input empty | Nothing happens (disabled) |
| UI-04 | Button | Click when loading | Nothing happens (disabled) |
| UI-05 | CharCounter | Input at 90% | Counter yellow |
| UI-06 | ResultCard | Empty items array | Shows "None found" |
| UI-07 | ErrorState | Click "Try Again" | Callback fires |

### 6.2 Responsive Tests

| Test ID | Viewport | Expected |
|---------|----------|----------|
| RESP-01 | 320px (mobile) | Cards stack vertically |
| RESP-02 | 768px (tablet) | Cards in row |
| RESP-03 | 1024px (desktop) | Full width container |
| RESP-04 | 320px | Button full width |
| RESP-05 | 768px+ | Button auto width |

### 6.3 Accessibility Tests

| Test ID | Requirement | Verification |
|---------|-------------|--------------|
| A11Y-01 | Keyboard navigation | Tab through all interactive elements |
| A11Y-02 | Focus visible | Blue ring on focused elements |
| A11Y-03 | Color contrast | WCAG AA minimum (4.5:1) |
| A11Y-04 | Screen reader | Labels on all inputs |
| A11Y-05 | Touch targets | Minimum 44px × 44px |

### 6.4 State Transition Tests

| Test ID | Start State | Action | End State |
|---------|-------------|--------|-----------|
| ST-01 | empty | Type "hello" | typing |
| ST-02 | typing | Type to 10+ chars | valid |
| ST-03 | valid | Click Analyze | loading |
| ST-04 | loading | API success | results |
| ST-05 | loading | API error | error |
| ST-06 | results | Click "Check Another" | valid |
| ST-07 | error | Click "Try Again" | loading |

---

## 7. ERROR HANDLING

For UI-specific error handling, see [Part03 Error Handling](./Part03_Error_Handling.md).

### 7.1 UI Error Handling Summary

| UI State | Error Type | Response | Recovery |
|----------|------------|----------|----------|
| Input | Validation fail | Red counter, disabled button | User types more |
| Loading | API timeout (15s) | Show error card | Retry button (respects 4s cooldown) |
| Loading | Network offline | Show error card | Auto-retry on reconnect |
| Loading | API error (500) | Show error card | Retry button (respects 4s cooldown) |
| Results | Parse error | Show raw output | Never hide AI response |

**Full error specifications:** [Part03_Error_Handling.md](./Part03_Error_Handling.md)

---

## 8. REFERENCES

### 8.1 Schema References

| Topic | Location | Anchor |
|-------|----------|--------|
| Input constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#input-constraints) | `#input-constraints` |
| UI constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#ui-constraints) | `#ui-constraints` |
| Card colors | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#card-colors) | `#card-colors` |

### 8.2 Related Technical Specs

| Topic | Document | Section |
|-------|----------|---------|
| System Prompt | [Part01](./Part01_System_Prompt.md) | Section 2 |
| Error Handling | [Part03](./Part03_Error_Handling.md) | All |

### 8.3 External References

| Resource | URL |
|----------|-----|
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| React | [react.dev](https://react.dev) |

---

## DOCUMENT INTEGRITY

**Document Type:** Implementation (HOW)  
**Part:** 2 of 3 (Technical Specs)  
**Version:** 2.0  
**Last Updated:** December 13, 2025  
**Stream Coding:** v3.3 Compliant

**Sections included per v3.3:**
- ✅ Anti-patterns (Section 5)
- ✅ Test Case Specifications (Section 6)
- ✅ Error Handling (Section 7)
- ✅ Deep Links / References (Section 8)

---

**END OF PART 02 — UI COMPONENTS SPECIFICATION**
