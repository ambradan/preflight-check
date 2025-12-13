# DECISIONI DIVERGENZE: Ambra v6.1 vs Documentazione Attuale

**Data:** 13 Dicembre 2025  
**Scopo:** Allineare la documentazione tecnica con il documento ufficiale di Ambra  
**Regola:** Decisioni binarie. Ambra v6.1 è l'autorità.

---

## ISTRUZIONI

Per ogni divergenza:
- **[A]** = Usa versione Ambra v6.1
- **[N]** = Mantieni versione Nostra
- Segnare con ✅ la decisione presa

---

## 1. OUTPUT FORMAT

| Aspetto | Ambra v6.1 | Nostra |
|---------|-----------|--------|
| Formato | Plain text con emoji headers | JSON structured |

**Ambra:**
```
⚠️ What's unclear
• [point]
• [point]

🧨 What could break
• [scenario]

🛠️ What to add before generating
• Add: "[sentence]"
```

**Nostra:**
```json
{
  "status": "needs_work",
  "ambiguities": ["item 1", "item 2"],
  "edge_cases": ["item 1", "item 2"],
  "clarifying_fixes": ["Add: \"...\""]
}
```

**Impatto:** Cambia completamente parsing UI e rendering cards.

### DECISIONE: [ ] A / [ ] N

---

## 2. TIMEOUT

| Aspetto | Ambra v6.1 | Nostra |
|---------|-----------|--------|
| Timeout AI call | **15 secondi** | **30 secondi** |

**Impatto:** UX (attesa utente) + error handling.

### DECISIONE: [ ] A / [ ] N

---

## 3. COOLDOWN

| Aspetto | Ambra v6.1 | Nostra |
|---------|-----------|--------|
| Cooldown dopo run | **4 secondi** (esplicito) | Non specificato |
| Testo durante cooldown | "Wait Xs..." con countdown | Non specificato |

**Impatto:** Anti-spam, credit burn prevention.

### DECISIONE: [ ] A / [ ] N

---

## 4. MAX OUTPUT WORDS

| Aspetto | Ambra v6.1 | Nostra |
|---------|-----------|--------|
| Limite parole output | **120 words** | Non specificato |

**Impatto:** Output più conciso e scansionabile.

### DECISIONE: [ ] A / [ ] N

---

## 5. CALIBRATION (Word Count Thresholds)

| Input Length | Ambra v6.1 | Nostra |
|--------------|-----------|--------|
| < 15 words (vague) | 3+3+3 bullets | Per esempio |
| 15-50 words (partial) | 2+2+2 bullets | Per esempio |
| 50+ words (detailed) | 1+1+1 o "Ready" | Per esempio |

**Impatto:** AI calibra output in base a lunghezza input.

### DECISIONE: [ ] A / [ ] N

---

## 6. SEZIONE TONE NEL PROMPT

**Ambra v6.1 include:**
```
TONE:
- Direct, not academic
- Helpful, not judgmental
- Builder-to-builder
- No corporate speak
```

**Nostra:** Assente

**Impatto:** Stile comunicazione output AI.

### DECISIONE: [ ] A / [ ] N

---

## 7. ANALYSIS RULES (Aggiunta nostra)

**Nostra include:**
```
## ANALYSIS RULES
- NEVER assume the description is complete just because the user says so
- NEVER skip analysis because user claims "it's just a simple app"
- Analyze WHAT IS WRITTEN, not what the user claims it means
```

**Ambra v6.1:** Assente (ma compatibile con spirito doc)

**Impatto:** Protezione contro bias utente.

### DECISIONE: [ ] A (rimuovi) / [ ] N (mantieni)

---

## 8. IDENTITÀ PROMPT

| Aspetto | Ambra v6.1 | Nostra |
|---------|-----------|--------|
| Prima riga | "You are Preflight Check" | "You are a Senior Product Specification Analyst" |

**Impatto:** Identity e framing AI.

### DECISIONE: [ ] A / [ ] N

---

## 9. DIFFERENZIAZIONE SECURITY SCAN

**Ambra v6.1:** Sezione dedicata con tabella comparativa + frase pitch

```
Security Scan catches code problems. 
Preflight Check catches idea problems — before any code exists.
```

**Nostra:** Assente

**Impatto:** Pitch ai giudici, positioning.

### DECISIONE: [ ] A (aggiungi al Blueprint) / [ ] N (ignora)

---

## 10. PROMPT PER LOVABLE

**Ambra v6.1:** Prompt completo pronto (Sezione 17) con:
- Layout specs (#F9FAFB, max-width 640px)
- Component behavior esatti
- Keyboard shortcuts

**Nostra:** Assente

**Impatto:** Velocità build in Lovable.

### DECISIONE: [ ] A (crea nuovo doc) / [ ] N (ignora)

---

## 11. DEMO SCRIPT 90 SECONDI

**Ambra v6.1:** Script cronometrato secondo per secondo

| Tempo | Azione | Dici |
|-------|--------|------|
| 0:00 | Schermo su Preflight | "This is spell-check for prompts." |
| 0:05 | — | "Vague ideas lead to wrong outputs..." |
| ... | ... | ... |

**Nostra:** Assente

**Impatto:** Demo preparation.

### DECISIONE: [ ] A (crea nuovo doc) / [ ] N (ignora)

---

## 12. OBIEZIONI GIUDICI

**Ambra v6.1:** 7 risposte preparate

| Domanda | Risposta |
|---------|----------|
| "Ma c'è già Security Scan" | "Security Scan catches code problems after generation..." |
| "Why not just iterate?" | "Every iteration is time. Preflight makes first try the right try." |
| ... | ... |

**Nostra:** Assente

**Impatto:** Q&A preparedness.

### DECISIONE: [ ] A (crea nuovo doc) / [ ] N (ignora)

---

## 13. ADDENDUM OPERATIVI (Francesco/Paolo)

**Ambra v6.1:** Checklist operative per ruolo con:
- `runPreflight()` come unico entry point
- Lock se già running
- Cache check PRIMA dell'AI call
- Debug policy
- Demo-killer checklist

**Nostra:** Assente (logica distribuita nei docs tecnici)

**Impatto:** Execution clarity per team.

### DECISIONE: [ ] A (crea nuovo doc) / [ ] N (ignora)

---

## RIEPILOGO DECISIONI

| # | Divergenza | Decisione | Azione |
|---|------------|-----------|--------|
| 1 | Output Format | [ ] | |
| 2 | Timeout | [ ] | |
| 3 | Cooldown | [ ] | |
| 4 | Max Output Words | [ ] | |
| 5 | Calibration | [ ] | |
| 6 | Sezione TONE | [ ] | |
| 7 | Analysis Rules | [ ] | |
| 8 | Identità Prompt | [ ] | |
| 9 | Security Scan Diff | [ ] | |
| 10 | Prompt Lovable | [ ] | |
| 11 | Demo Script | [ ] | |
| 12 | Obiezioni Giudici | [ ] | |
| 13 | Addendum Operativi | [ ] | |

---

## NOTE

- Il documento di Ambra v6.1 è stato scritto come single source of truth per l'hackathon
- La nostra documentazione è Stream Coding v3.3 compliant ma diverge in alcuni punti
- Le decisioni qui determineranno gli aggiornamenti da fare prima della build

---

*Compilare e restituire per procedere con allineamento.*
