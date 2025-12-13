# ✈️ Preflight Check

**Find what's missing in your app idea before AI guesses wrong.**

[![Built at](https://img.shields.io/badge/Built%20at-Building%20The%20Future%20Of%20Personal%20AI-yellow)](https://syllotips.notion.site/Build-The-Future-Of-Personal-AI-2025-Hacker-Manual-2b69dad185cf80e0b9cfded123ba8e60)
[![Made with Lovable](https://img.shields.io/badge/Made%20with-Lovable-ff69b4)](https://lovable.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎯 The Problem

Tools like Lovable, Cursor, and Claude Code let you describe an app and get working code. **But when your description is vague, AI doesn't ask questions — it guesses.** And it guesses wrong.

```
You: "I want an app to manage team tasks"

AI: *generates an app*

You: "No, I meant personal tasks, not team"
     "Where's the due date field?"
     "How do I assign tasks?"

→ Rebuild after rebuild
→ Wasted credits
→ Frustration
```

## 💡 The Solution

**Preflight Check** analyzes your app description *before* you generate code, catching:

| Section | What It Finds |
|---------|---------------|
| ⚠️ **Ambiguities** | Things you assume are obvious but AI will guess wrong |
| 🧨 **Edge Cases** | Realistic scenarios your description doesn't address |
| 🛠️ **Fixes** | Specific phrases to add — copy-paste ready |

**Result:** Better description → correct generation → fewer rebuilds.

---

## 🚀 Demo

**Live Demo:** [concept-refine.lovable.app](https://concept-refine.lovable.app)

### Example

**Input:**
```
App per gestire task del team
```

**Output:**

> ⚠️ **Ambiguities**
> - Who are users — individuals, managers, or both?
> - How organized — lists, boards, or calendar?
> - What does "manage" mean — create, assign, track?
>
> 🧨 **Edge Cases**
> - Hundreds of tasks with no organization
> - Multiple users editing same task simultaneously
> - Tasks without due dates getting lost
>
> 🛠️ **Clarify Before Generating**
> - Add: "Task manager for small teams (3-5 people)"
> - Add: "Kanban board: To Do, In Progress, Done"
> - Add: "Each task has: title, assignee, due date, status"

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Lovable (React + Tailwind) |
| AI | Lovable AI (Gemini 2.5 Flash) — no API keys needed |
| Hosting | Lovable deployment |

---

## 📖 Documentation

This project follows **Stream Coding v3.3** methodology.

```
docs/
├── 00_START_HERE.md              # Start here
├── 01-master-blueprint/
│   └── MASTER_BLUEPRINT.md       # Strategic vision (WHAT/WHY)
├── 02-technical-specs/
│   ├── Part01_System_Prompt.md   # AI prompt specification
│   ├── Part02_UI_Components.md   # UI specification
│   ├── Part03_Error_Handling.md  # Error scenarios
│   └── LOVABLE_PROMPT.md         # 🚀 Ready-to-paste prompt
└── 03-schemas/
    └── 00_SCHEMA_REFERENCE.md    # Data models (single source)
```

---

## 🏃 Quick Start

1. Open [Lovable](https://lovable.dev)
2. Create new project  
3. Copy the ENTIRE prompt from `docs/02-technical-specs/LOVABLE_PROMPT.md`
4. Paste into Lovable's input field and click "Chat"
5. Lovable generates the app with AI integration included

---

## 👥 Team

| Name | Role | Links |
|------|------|-------|
| **Ambra Danesin** | Product & Pitch | [LinkedIn](https://linkedin.com/in/ambradanesin) |
| **Francesco Marinoni Moretto** | Development | [LinkedIn](https://linkedin.com/in/frmoretto) |
| **Paolo Nugnes** | Testing & Validation | [LinkedIn](https://linkedin.com/in/paolonugnes) |

---

## 🏆 Hackathon

Built in 8 hours at **Building The Future Of Personal AI** hackathon.

| Attribute | Value |
|-----------|-------|
| **Event** | Building The Future Of Personal AI |
| **Date** | December 13, 2025 |
| **Location** | OGR Torino |
| **Track** | Real-World Problems, Vibe-Coded Solutions |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- [Lovable](https://lovable.dev) for the vibe coding platform
- [Anthropic](https://anthropic.com) for Claude
- [Stream Coding](https://github.com/frmoretto/stream-coding) methodology

---

**Built with ✈️ by developers who got tired of rebuilding.**
