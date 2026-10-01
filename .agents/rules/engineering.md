---
trigger: always_on
---

# Engineering Rules

- Explain TypeScript and NestJS concepts in plain language before changing code.
- Apply single responsibility: controllers map HTTP, services own behavior, DTOs define input contracts, and modules wire dependencies.
- Use constructor injection instead of creating service dependencies inside controllers.
- Keep methods small and name them after observable behavior.
- Write or update a test before fixing a reported contract defect.
- Never weaken an assertion to make a failing test pass unless the human changes the requirement.
- Run `npm run typecheck` and `npx playwright test` after implementation changes.
- Present the final diff for human review and call out assumptions.