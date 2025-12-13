# Preflight Check — Master Blueprint

**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Status:** Strategic Document — Approved  
**Stream Coding:** v3.3 Compliant  
**Document Type:** Strategic (WHAT and WHY)

---

## 📋 Table of Contents

1. [Mission & Problem](#1-mission--problem)
2. [Solution & Value Proposition](#2-solution--value-proposition)
3. [Target Users](#3-target-users)
4. [MVP Scope Definition](#4-mvp-scope-definition)
5. [Success Metrics](#5-success-metrics)
6. [Competitive Positioning](#6-competitive-positioning)
7. [Technical Architecture](#7-technical-architecture)
8. [Go-to-Market (Hackathon)](#8-go-to-market-hackathon)
9. [References](#9-references)

---

## 1. MISSION & PROBLEM

### 1.1 The Problem

**Vibe coding tools (Lovable, Cursor, Claude Code) have a fatal flaw:**

When your description is vague, AI doesn't ask questions — it guesses. And it guesses wrong.

```
User: "I want an app to manage team tasks"

AI: *generates app*

User: "No, I meant personal tasks, not team"
      "Where's the due date field?"
      "How do I assign tasks?"

→ Rebuild after rebuild
→ Wasted credits
→ Frustration
→ "This AI tool sucks"
```

**The real problem:** The description was incomplete. The AI did its best with ambiguous input.

### 1.2 Problem Quantification

| Metric | Estimate | Source |
|--------|----------|--------|
| Average rebuilds per project | 3-5x | User feedback |
| Time wasted per rebuild | 30-60 min | User feedback |
| Credit cost per rebuild | €5-20 | Platform pricing |
| User frustration | HIGH | NPS surveys |

### 1.3 Root Cause

Users don't realize their descriptions are incomplete because:
1. They assume context is obvious
2. They think in features, not user flows
3. They skip edge cases
4. They don't specify data structures

**Implementation Implication:** The tool must educate users about WHAT makes a description complete, not just flag problems.

---

## 2. SOLUTION & VALUE PROPOSITION

### 2.1 The Solution

**Preflight Check** analyzes app descriptions BEFORE code generation, catching:

| Category | What It Finds | Icon |
|----------|---------------|------|
| **Ambiguities** | Things user assumes are obvious but AI will guess wrong | ⚠️ |
| **Edge Cases** | Realistic scenarios the description doesn't address | 🧨 |
| **Clarifying Fixes** | Specific phrases to ADD — copy-paste ready | 🛠️ |

### 2.2 Value Proposition

**For vibe coders who are tired of rebuilding apps:**

> "Preflight Check finds what's missing in your idea before AI guesses wrong."

Unlike:
- Generic writing assistants (not specialized for app descriptions)
- Code review tools (too late — code already generated)
- AI chat refinement ("make it better" doesn't tell you WHAT to fix)

Preflight Check:
- Analyzes BEFORE generation
- Gives specific, copy-paste fixes
- Prevents rebuilds at source

### 2.3 The Meta-Play

**Preflight Check IS the problem it solves.**

We're using AI to validate descriptions for AI tools. This creates a virtuous cycle:
1. User writes description
2. Preflight validates description
3. Better description → better AI output
4. Fewer rebuilds → happier user
5. Happier user → tells others

**Implementation Implication:** The system prompt must be exceptionally well-crafted because we're demonstrating our own methodology.

---

## 3. TARGET USERS

### 3.1 Primary Personas

| Persona | Description | Pain Point | What They Need |
|---------|-------------|------------|----------------|
| **Solo Founder** | Non-technical, building MVP alone | "I keep rebuilding because AI misunderstands me" | Specific fixes, not generic advice |
| **Non-Technical Founder** | Has budget, no coding skills | "I waste hours explaining to AI what I want" | Clear checklist of what to specify |
| **Junior Developer** | Learning vibe coding tools | "I don't know what to include in descriptions" | Educational feedback |
| **Product Manager** | Writing specs for AI tools | "My specs are too vague for AI execution" | Professional-grade validation |
| **AI Tool Beginner** | First time using Lovable/Cursor | "I don't understand why my output is wrong" | Gentle, actionable guidance |

### 3.2 User Jobs-to-be-Done

1. **Validate** my description before spending credits
2. **Learn** what makes a good app description
3. **Fix** specific issues with copy-paste phrases
4. **Confidence** that my description is complete

**Implementation Implication:** Output must be scannable (max 3 items), actionable (copy-paste), and educational (explains WHY).

---

## 4. MVP SCOPE DEFINITION

### 4.1 What We Build (MVP)

| Feature | Specification | Priority |
|---------|---------------|----------|
| Text input | Single textarea, 10-2000 chars | P0 |
| Analyze button | Single action, clear feedback | P0 |
| Output: Ambiguities | Max 3 items, max 15 words each | P0 |
| Output: Edge Cases | Max 3 items, max 15 words each | P0 |
| Output: Fixes | Max 3 items, "Add: ..." format | P0 |
| Status indicator | Binary: `needs_work` / `ready` | P0 |
| Language matching | Output matches input language | P0 |

### 4.2 What We DON'T Build (MVP)

| Feature | Why Excluded | Future? |
|---------|--------------|---------|
| Scoring system | Adds complexity without value | Maybe v2 |
| User accounts | Friction, unnecessary for validation | v2 |
| History | Storage complexity | v2 |
| Multi-language UI | Single language sufficient | v2 |
| Export/share | Copy-paste sufficient | v2 |
| API access | Not needed for hackathon | v2 |
| Multiple descriptions | Single input sufficient | v2 |
| Comparison mode | Overcomplicated for MVP | v3 |

### 4.3 Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Max input | 2000 chars | Balance detail vs. cost |
| Min input | 10 chars | Prevent empty submissions |
| Max items per section | 3 | Scannable output |
| Max words per item | 15 | Concise, actionable |
| API timeout | 30 seconds | UX threshold |

**Implementation Implication:** Constraints are hard limits in the system prompt AND UI validation.

---

## 5. SUCCESS METRICS

### 5.1 Hackathon Success (December 13, 2025)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Working demo | Yes/No | Live URL accessible |
| 3-minute video | Complete | Uploaded before 18:00 |
| Submission | On time | Before 18:00 CET |
| Demo examples | 3+ working | Show ambiguous → clear flow |

### 5.2 Product Success (Post-Hackathon)

| Metric | Target | Timeline |
|--------|--------|----------|
| Test users | 50 | Week 1 |
| Daily active | 20 | Week 2 |
| Positive feedback | >70% | Week 2 |
| Rebuild reduction | -50% reported | Week 4 |

**Implementation Implication:** Hackathon metrics are P0. Post-hackathon metrics inform future development.

---

## 6. COMPETITIVE POSITIONING

### 6.1 Competitive Landscape

| Competitor | What They Do | Our Advantage |
|------------|--------------|---------------|
| ChatGPT | General refinement | Not specialized for app descriptions |
| Grammarly | Writing quality | Doesn't understand app requirements |
| Lovable AI | Generates code | Too late — already generating |
| Claude | Can analyze | No specialized prompt, generic output |

### 6.2 Our Moat

1. **Specialized System Prompt** — Engineered for app description validation
2. **Structured Output** — 3 sections, max 3 items, max 15 words
3. **Copy-Paste Fixes** — "Add: ..." format, not generic advice
4. **Binary Decision** — `needs_work` or `ready`, no ambiguous scores

### 6.3 Why Now?

- Vibe coding exploding (Lovable, Cursor, Claude Code)
- Users frustrated with rebuild cycles
- No dedicated tool exists
- Hackathon = perfect validation opportunity

**Implementation Implication:** The specialized system prompt IS the product. Protect and iterate on it.

### 6.4 ⚠️ Differentiation from Security Scan (CRITICAL)

Lovable already has **Security Scan**, which acts AFTER code generation.
Preflight Check acts **BEFORE** any code exists.

| Security Scan (existing) | Preflight Check (ours) |
|--------------------------|------------------------|
| **After** generation | **Before** generation |
| Analyzes **code** | Analyzes **idea/prompt** |
| Final step (pre-publish) | **Step zero** (pre-generation) |
| Answers: "Is the code secure?" | Answers: "Is the idea clear?" |

**Pitch phrase (memorize this):**

> "Security Scan catches **code** problems. Preflight Check catches **idea** problems — before any code exists."

**Complete Loop:**

```
Idea → [PREFLIGHT CHECK] → Generate → Build → [SECURITY SCAN] → Publish
        ↑ us                                    ↑ them
```

**If a judge asks "But Lovable already has Security Scan?":**

> "Security Scan is the last step — it catches code problems before publish. Preflight is step zero — it catches idea problems before generation. Together they complete the loop. Different layer, same philosophy."

**Implementation Implication:** This positioning is critical for pitch. The team must be able to articulate this distinction instantly.

---

## 7. TECHNICAL ARCHITECTURE

### 7.1 Architecture Overview

```
┌─────────────────────────────────────────────┐
│              USER INTERFACE                  │
│  ┌─────────────────────────────────────────┐│
│  │  Textarea (10-2000 chars)               ││
│  │  [0/2000 chars]                         ││
│  └─────────────────────────────────────────┘│
│              [ Analyze ]                    │
├─────────────────────────────────────────────┤
│              LOVABLE BACKEND                 │
│  ┌─────────────────────────────────────────┐│
│  │  Claude API (via Lovable integration)   ││
│  │  System Prompt: Preflight Analyst       ││
│  │  Output: JSON (status + 3 sections)     ││
│  └─────────────────────────────────────────┘│
├─────────────────────────────────────────────┤
│              OUTPUT DISPLAY                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────┐│
│  │⚠️ Ambiguities│ │🧨 Edge Cases │ │🛠️ Fixes ││
│  │ • item 1    │ │ • item 1    │ │ • Add:  ││
│  │ • item 2    │ │ • item 2    │ │ • Add:  ││
│  │ • item 3    │ │ • item 3    │ │ • Add:  ││
│  └─────────────┘ └─────────────┘ └─────────┘│
└─────────────────────────────────────────────┘
```

### 7.2 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Lovable (React + Tailwind) | Hackathon requirement |
| AI | Claude via Lovable | Zero setup, built-in |
| Hosting | Lovable deployment | Instant, free tier |
| State | React useState | Simple, no persistence needed |

### 7.3 Data Flow

```
1. User types description (10-2000 chars)
2. User clicks "Analyze"
3. Frontend validates length
4. Request sent to Lovable backend
5. Lovable calls Claude with system prompt
6. Claude returns JSON response
7. Frontend parses JSON
8. UI displays 3 cards (or success state)
```

**Implementation Implication:** See [Part02_UI_Components.md](../02-technical-specs/Part02_UI_Components.md) for detailed UI specs.

---

## 8. GO-TO-MARKET (HACKATHON)

### 8.1 Hackathon Timeline

| Time | Milestone | Owner |
|------|-----------|-------|
| 10:00 | Start, repo created | Francesco |
| 10:30 | System prompt finalized | Francesco |
| 12:00 | Basic UI working | Francesco |
| 14:00 | Integration complete | Francesco |
| 15:00 | Testing begins | Paolo |
| 16:00 | Bug fixes complete | Francesco |
| 17:00 | README + Video | Ambra |
| 17:30 | Submission | Ambra |
| 18:00 | Deadline | - |

### 8.2 Demo Script

**Opening (30s):**
> "What if you could validate your app idea BEFORE AI tries to build it?"

**Problem (30s):**
> Show: vague description → wrong output → rebuild cycle

**Solution (60s):**
> Demo: same description → Preflight Check → clear fixes → correct output

**Value (30s):**
> "Better descriptions. Fewer rebuilds. More building."

**CTA (30s):**
> "Try it at [URL]. Built in 8 hours at OGR Torino."

### 8.3 Judging Criteria Alignment

| Criterion (20%) | Our Strength |
|-----------------|--------------|
| **Innovation** | Meta-play: AI validating for AI tools |
| **Impact** | Solves real pain (rebuild cycles) |
| **Technical Quality** | Clean JSON API, proper error handling |
| **User Experience** | Ultra-simple (input → click → output) |
| **Demo Completeness** | Live demo with real examples |

**Implementation Implication:** Pitch script and demo must align with judging criteria.

---

## 9. REFERENCES

### 9.1 v3.3 Implementation Details Location

| Content Type | Location |
|--------------|----------|
| Anti-patterns | [Part01 System Prompt](../02-technical-specs/Part01_System_Prompt.md#anti-patterns) |
| Test Case Specifications | [Part01 System Prompt](../02-technical-specs/Part01_System_Prompt.md#test-cases) |
| Error Handling Matrix | [Part03 Error Handling](../02-technical-specs/Part03_Error_Handling.md) |

*This document provides strategic overview. Technical documents provide implementation specifications.*

### 9.2 Schema References

| Topic | Location | Anchor |
|-------|----------|--------|
| Input constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#input-constraints) | `#input-constraints` |
| Output constraints | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#output-constraints) | `#output-constraints` |
| Data models | [Schema Reference](../03-schemas/00_SCHEMA_REFERENCE.md#data-models) | `#data-models` |

### 9.3 Technical References

| Topic | Document | Section |
|-------|----------|---------|
| System Prompt | [Part01](../02-technical-specs/Part01_System_Prompt.md) | Section 2 |
| UI Components | [Part02](../02-technical-specs/Part02_UI_Components.md) | All |
| Error Handling | [Part03](../02-technical-specs/Part03_Error_Handling.md) | All |

### 9.4 External Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Hackathon Manual | [Syllotips Notion](https://syllotips.notion.site/Build-The-Future-Of-Personal-AI-2025-Hacker-Manual-2b69dad185cf80e0b9cfded123ba8e60) | Rules & prizes |
| Submission Form | [Google Form](https://forms.gle/hERTcQoiREHp8Y9X6) | Final submission |
| Project Description | [Google Doc](https://docs.google.com/document/d/1erEf9jRWGNb-I42eulWnUn7OHmU0b3f5e5MZm-QoVgI/edit) | Original spec |
| Team Roadmap | [Google Doc](https://docs.google.com/document/d/1v5C2t3C4_ZENO2bNmVe-Bi8dABDoxkqEVbuPyvs1GMs/edit) | Timeline |

---

## DOCUMENT INTEGRITY

**Document Type:** Strategic (WHAT and WHY)  
**Version:** 1.0  
**Last Updated:** December 13, 2025  
**Stream Coding:** v3.3 Compliant

**This document:** Strategic vision, business context, go-to-market  
**Technical specs:** Implementation details live in `02-technical-specs/`

---

**END OF MASTER BLUEPRINT**
