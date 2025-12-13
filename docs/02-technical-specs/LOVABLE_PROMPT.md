# Preflight Check — Lovable Prompt
## Ready-to-Paste Prompt for Lovable

**Version:** 2.0  
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

## AI INTEGRATION (CRITICAL - READ CAREFULLY)

Use Lovable AI (Gemini 2.5 Flash) for the analysis feature. No external API keys needed.

Implementation requirements:
1. Create a constant called SYSTEM_PROMPT in the codebase containing the full system prompt below
2. When user clicks "Run Preflight", call Lovable AI with:
   - System message: the SYSTEM_PROMPT constant
   - User message: the textarea content (trimmed)
3. The AI call must include the system prompt as context, not just the user input
4. Store the SYSTEM_PROMPT in a separate file: /src/constants/systemPrompt.ts

Example AI call structure (Lovable will implement this):

    const response = await callLovableAI({
      system: SYSTEM_PROMPT,
      user: userInput.trim(),
      maxTokens: 500
    });

## SYSTEM PROMPT (store as SYSTEM_PROMPT constant)

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

## END OF SYSTEM PROMPT

## LAYOUT

- Clean, minimal design
- Light gray background (#F9FAFB)
- Centered white card, max-width 640px, rounded corners, subtle shadow

## HEADER

- Airplane emoji ✈️ + title "Preflight Check" (bold, 24px)
- Subtitle "Catch issues before generating" (gray, 16px)

## PRESET CHIPS (below header)

3 clickable chips with EXACT content:
1. "Document chat" → populates: "An app where users can upload documents and chat with them"
2. "Task manager" → populates: "App for managing tasks"
3. "BMI calculator" → populates: "A BMI calculator. Two fields: weight (kg), height (cm). One button: Calculate. Shows result with category (underweight/normal/overweight/obese). Color-coded result. No login. No data saved. Mobile responsive."

## INPUT

- Large textarea (min 4 rows)
- Min 10 characters, max 2000 characters
- Placeholder: "Describe what you want to build..."
- Character counter showing "X / 2000"
- Button disabled if input < 10 chars (after trim)

## BUTTON

- "Run Preflight" (purple primary)
- Disabled when textarea empty OR during cooldown
- Shows "Analyzing..." with spinner during loading
- 4 second cooldown after each run (including after retry)
- During cooldown show: "Wait Xs..." with countdown (4, 3, 2, 1)

## OUTPUT (appears below input after run)

- Parse the AI response to display 3 cards with icons and headings:
  1. ⚠️ What's unclear
  2. 🧨 What could break
  3. 🛠️ What to add before generating
- Each card has bullet points (max 3)
- OR single card "✅ Ready to generate. No major issues found."
- CRITICAL: Always show raw AI output (parsing for styling only, never hide)
- If parsing fails, show the raw output anyway

## AFTER OUTPUT

- "Copy refined prompt" button (copies input + Add sentences without "Add:" prefix)
- Before/After side-by-side preview
- "Check Another" button to reset

## COPY REFINED PROMPT LOGIC (implement exactly)

1. Take the original user input (trimmed)
2. Extract all lines from the AI output that start with "Add:" (may have "• " prefix)
3. Remove the "Add: " prefix and any quotes from each extracted line
4. Concatenate: originalInput + "\n\n" + extractedLines.join("\n")
5. Copy result to clipboard
6. If no "Add:" lines found, copy only the original input

## ERROR HANDLING

- Timeout: 15 seconds max for AI response
- On timeout or API error: show toast "Preflight couldn't run this time. Try again."
- Retry button available but respects cooldown (4s)
- Never show blank screen

## FOOTER

- "Clearer input → better output" (small, gray, centered)

## KEYBOARD

- Ctrl/Cmd + Enter = Run Preflight (only when button enabled)
- Esc = Reset to initial state

## RULES (NON-NEGOTIABLE)

- Use Lovable AI with the SYSTEM_PROMPT - no external API keys
- Raw AI output always visible (parsing for styling only)
- Mobile responsive
- No login, no database, no analytics
- Retry does not bypass cooldown
- Cooldown applies after EVERY run (success or failure)
- System prompt must be stored as a constant and used in every AI call
```

---

## VERIFICATION CHECKLIST

After Lovable generates, verify:

### AI Integration
- [ ] SYSTEM_PROMPT constant exists in codebase
- [ ] AI call includes system prompt as context
- [ ] AI response appears after clicking "Run Preflight"
- [ ] Output follows the emoji header format

### UI Elements
- [ ] Header shows ✈️ Preflight Check
- [ ] 3 preset chips visible
- [ ] Textarea has character counter
- [ ] Button says "Run Preflight"

### Functionality
- [ ] Clicking chip populates textarea with exact text
- [ ] Cooldown shows countdown after run (4, 3, 2, 1)
- [ ] Copy refined button works correctly
- [ ] Before/After preview works
- [ ] Esc resets the form
- [ ] Ctrl/Cmd+Enter triggers run
- [ ] Raw output visible even if parsing fails

---

## IF SOMETHING DOESN'T WORK

Common fixes to ask Lovable:

| Issue | What to say |
|-------|-------------|
| AI not using system prompt | "The AI call must include the SYSTEM_PROMPT constant as the system message, not just the user input" |
| No cooldown | "Add 4 second cooldown after each run with visible countdown showing 4, 3, 2, 1" |
| No emoji headers in output | "AI output must use exact emoji headers: ⚠️ What's unclear, 🧨 What could break, 🛠️ What to add" |
| Missing preset chips | "Add 3 preset chips below header with exact content I specified" |
| Button stays enabled | "Disable button during cooldown and loading state" |
| No raw output | "Always show raw AI output in a visible area, use parsing only for card styling" |
| Copy refined doesn't work | "Copy refined should extract lines starting with Add:, remove the prefix, and append to original input" |

---

## AI TROUBLESHOOTING

If the AI output doesn't match expected format:

1. **Check system prompt is being sent**: The SYSTEM_PROMPT constant must be included in every AI call
2. **Verify Lovable AI is being used**: No external API keys should be required
3. **Test with preset chips**: "Document chat" should produce 3+3+3 output, "BMI calculator" should produce "Ready to generate"

---

**END OF LOVABLE PROMPT DOCUMENT**
