---
description: 
---

---
description: Run type-checking, automated tests, and a SOLID review before accepting a change.
---

Use `.agents/agents.md` and execute this sequence:

1. Act as `@qa` and apply the `api-quality` skill.
2. Stop if type-checking or any test fails after the allowed repair attempts.
3. Act as `@reviewer` and inspect the final diff against `.agents/rules/engineering.md`.
4. Summarize the checks performed, the evidence observed, and any remaining risk.
5. Wait for human approval before treating the change as accepted.