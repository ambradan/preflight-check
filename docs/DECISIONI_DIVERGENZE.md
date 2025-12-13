# DECISIONI DIVERGENZE: Ambra v6.1 vs Documentazione Attuale

**Data:** 13 Dicembre 2025  
**Stato:** ✅ COMPLETATO  
**Scopo:** Allineare la documentazione tecnica con il documento ufficiale di Ambra

---

## ✅ DECISIONI CONFERMATE — FINALE

| # | Divergenza | Decisione | Valore | Azione |
|---|------------|-----------|--------|--------|
| 1 | Output Format | **AMBRA** | Plain text + emoji | ✅ Part01 aggiornato |
| 2 | Timeout | **AMBRA** | 15 secondi | ✅ Part03 + Schema aggiornati |
| 3 | Cooldown | **AMBRA** | 4 secondi con countdown | ✅ Part03 + Schema aggiornati |
| 4 | Max Output Words | **AMBRA** | 120 parole | ✅ Part01 aggiornato |
| 5 | Calibration | **AMBRA** | <15w→3+3+3, 15-50w→2+2+2, 50+w→1+1+1/Ready | ✅ Part01 aggiornato |
| 6 | Sezione TONE | **AMBRA** | Direct, builder-to-builder, no corporate | ✅ Part01 aggiornato |
| 7 | Analysis Rules | **NOSTRA** | Mantieni protezione anti-bypass | ✅ Mantenuto in Part01 |
| 8 | Identità Prompt | **COMBINATA** | "You are Preflight Check, a Senior Product Specification Analyst" | ✅ Part01 aggiornato |
| 9 | Security Scan Diff | **AMBRA** | Aggiungere tabella + pitch al Blueprint | ✅ Blueprint aggiornato |
| 10 | Prompt Lovable | **AMBRA** | Prompt singolo pronto (no attach) | ✅ LOVABLE_PROMPT.md creato |
| 11 | Demo Script | **IGNORA** | Resta in Ambra v6.1 (responsabilità Driver) | N/A |
| 12 | Obiezioni Giudici | **IGNORA** | Resta in Ambra v6.1 (responsabilità Driver) | N/A |
| 13 | Addendum Operativi | **IGNORA** | Resta in Ambra v6.1 (checklist operative) | N/A |

---

## 📁 FILE AGGIORNATI

| File | Versione | Modifiche |
|------|----------|-----------|
| `Part01_System_Prompt.md` | 2.0 | Nuovo system prompt completo |
| `Part03_Error_Handling.md` | 1.1 | Timeout 15s, Cooldown 4s |
| `00_SCHEMA_REFERENCE.md` | 1.1 | Timing, output format |
| `MASTER_BLUEPRINT.md` | 1.1 | Sezione 6.4 Security Scan |
| `LOVABLE_PROMPT.md` | 1.0 | **NUOVO** - Prompt pronto |

---

## 📋 RIEPILOGO CHIAVE

### System Prompt (v2.0)
- Identità: "You are Preflight Check, a Senior Product Specification Analyst"
- Output: Plain text con emoji headers (⚠️ 🧨 🛠️)
- Max: 120 parole totali, 3 bullet × 15 parole
- Calibration: per word count (<15, 15-50, 50+)
- Include: ANALYSIS RULES (protezione anti-bypass)
- Include: TONE (builder-to-builder)

### Timing
- Timeout: 15 secondi
- Cooldown: 4 secondi dopo OGNI run (success o fail)
- Countdown visibile: "Wait 4s..." → "Wait 3s..." → ...

### Posizionamento
- Security Scan = DOPO (codice)
- Preflight Check = PRIMA (idea)
- Pitch: "Security Scan catches code problems. Preflight catches idea problems."

---

## ⚠️ COSA RESTA IN AMBRA v6.1 (NON DUPLICARE)

Questi contenuti sono responsabilità di Ambra (Driver) e Paolo (Validator):

1. **Demo Script 90 secondi** — Sezione 11
2. **Pitch Versions** (30s, 15s, 5s) — Sezione 11
3. **Obiezioni Giudici** — Sezione 12
4. **Checklist Francesco** — Addendum
5. **Checklist Paolo** — Addendum
6. **Timeline dettagliata** — Sezione 10

---

*Documento completato. Documentazione tecnica allineata.*
