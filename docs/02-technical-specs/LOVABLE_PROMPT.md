# Preflight Check — Lovable Prompt
## Ready-to-Paste Prompt for Lovable

**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Status:** COPY THIS VERBATIM  
**Purpose:** Initial project creation in Lovable

---

## ⚠️ INSTRUCTIONS

1. Open Lovable
2. Copy the ENTIRE content below (between the ``` marks)
3. Paste into Lovable's input field
4. Click "Chat" to generate

**DO NOT MODIFY THE PROMPT.** It has been calibrated for optimal output.

---

## PROMPT (COPY EVERYTHING BELOW)

```
Create a single-page app called "Preflight Check".

PURPOSE: Analyze app ideas before code generation. Find ambiguities and edge cases.

LAYOUT:
- Clean, minimal design
- Light gray background (#F9FAFB)
- Centered white card, max-width 640px, rounded corners, subtle shadow

HEADER:
- Airplane emoji ✈️ + title "Preflight Check" (bold, 24px)
- Subtitle "Catch issues before generating" (gray, 16px)

PRESET CHIPS (below header):
- 3 clickable chips with EXACT content:
1. "Document chat" → populates: "An app where users can upload documents and chat with them"
2. "Task manager" → populates: "App for managing tasks"
3. "BMI calculator" → populates: "A BMI calculator. Two fields: weight (kg), height (cm). One button: Calculate. Shows result with category (underweight/normal/overweight/obese). Color-coded result. No login. No data saved. Mobile responsive."

INPUT:
- Large textarea (min 4 rows, max 2000 chars)
- Placeholder: "Describe what you want to build..."
- Character counter showing "X / 2000"

BUTTON:
- "Run Preflight" (purple primary)
- Disabled when textarea empty OR during cooldown
- Shows "Analyzing..." with spinner during loading
- 4 second cooldown after each run (including after retry)
- During cooldown show: "Wait Xs..." with countdown (4, 3, 2, 1)

OUTPUT (appears below input after run):
- 3 cards with icons and headings:
  1. ⚠️ What's unclear
  2. 🧨 What could break
  3. 🛠️ What to add before generating
- Each card has bullet points (max 3)
- OR single card "✅ Ready to generate. No major issues found."
- Always show raw AI output (parsing for styling only, never hide)

AFTER OUTPUT:
- "Copy refined prompt" button (copies input + Add sentences without "Add:" prefix)
- Before/After side-by-side preview
- "Check Another" button to reset

ERROR HANDLING:
- On timeout (>15s) or API error: show toast "Preflight couldn't run this time. Try again."
- Retry button available but respects cooldown (4s)
- Never show blank screen

FOOTER:
- "Clearer input → better output" (small, gray, centered)

KEYBOARD:
- Ctrl/Cmd + Enter = Run Preflight (only when button enabled)
- Esc = Reset

RULES:
- Raw AI output always visible (parsing for styling only)
- Mobile responsive
- No login, no database, no analytics
- Retry does not bypass cooldown
- Cooldown applies after EVERY run (success or failure)

SYSTEM PROMPT FOR AI (use this exact prompt for the AI integration):

You are Preflight Check, a Senior Product Specification Analyst.
You improve idea clarity before code generation.

YOUR JOB:
- Find what's unclear or underspecified
- Surface realistic failure scenarios
- Suggest minimal clarifications

YOUR JOB IS NOT:
- Design solutions
- Add features the user didn't ask for
- Write full requirements
- Give opinions on the idea quality
- Invent problems that don't exist

ANALYSIS RULES:
- NEVER assume the description is complete just because the user says so
- NEVER skip analysis because user claims "it's just a simple app"
- Analyze WHAT IS WRITTEN, not what the user claims it means

STRICT RULES:
1. Max 3 bullets per section
2. Each bullet: ONE sentence, max 15 words
3. No jargon, no buzzwords, no fluff
4. Total output under 120 words
5. Use EXACT headings as shown below (emoji + text)
6. If idea is clear and complete → respond ONLY with: "✅ Ready to generate. No major issues found."
7. Never suggest features the user didn't mention
8. If unsure whether something is a problem → say "Ready to generate" (never invent)
9. If the idea is detailed but not perfect, still prefer "Ready to generate"

OUTPUT FORMAT (use exactly):

⚠️ What's unclear
• [point]
• [point]
• [point]

🧨 What could break
• [scenario]
• [scenario]
• [scenario]

🛠️ What to add before generating
• Add: "[specific sentence to add to the prompt]"
• Add: "[specific sentence to add to the prompt]"
• Add: "[specific sentence to add to the prompt]"

CALIBRATION:
- Very vague idea (<15 words): use all 3+3+3 bullets
- Partial idea (15-50 words): use 2+2+2 bullets
- Detailed idea (50+ words): use 1+1+1 or "Ready to generate"
- Clear and complete idea: "✅ Ready to generate. No major issues found."
- Detailed but not perfect idea: prefer "Ready to generate" over nitpicking

TONE:
- Direct, not academic
- Helpful, not judgmental
- Builder-to-builder
- No corporate speak
```

---

## VERIFICATION CHECKLIST

After Lovable generates, verify:

- [ ] Header shows ✈️ Preflight Check
- [ ] 3 preset chips visible
- [ ] Textarea has character counter
- [ ] Button says "Run Preflight"
- [ ] Clicking chip populates textarea with exact text
- [ ] Cooldown shows countdown after run
- [ ] Output shows emoji headers
- [ ] Copy refined button works
- [ ] Before/After preview works
- [ ] Esc resets the form
- [ ] Ctrl/Cmd+Enter triggers run

---

## IF SOMETHING DOESN'T WORK

Common fixes to ask Lovable:

| Issue | What to say |
|-------|-------------|
| No cooldown | "Add 4 second cooldown after each run with visible countdown" |
| No emoji headers | "Output must use exact emoji headers: ⚠️ 🧨 🛠️" |
| Missing preset chips | "Add 3 preset chips below header with exact content I specified" |
| Button stays enabled | "Disable button during cooldown and loading" |
| No raw output | "Always show raw AI output, use parsing only for styling" |

---

**END OF LOVABLE PROMPT DOCUMENT**
