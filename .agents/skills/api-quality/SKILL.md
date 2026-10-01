---
name: api-quality
description: Runs the NestJS type-check and Playwright API tests, diagnoses failures, and reviews SOLID boundaries. Use after implementation changes or before a checkpoint.
---

# API Quality Skill

## When to use this skill

Use this skill after code changes, after a defect is reported, or before accepting a project checkpoint.

## How to use it

1. Read `.agents/rules/engineering.md`.
2. Run `npm run typecheck`.
3. Run `npx playwright test`.
4. For a failure, report the expected result, observed result, and likely production risk.
5. Fix implementation code before changing a test.
6. Re-run the checks, with a maximum of three repair attempts.
7. Stop and report the blocker if the checks still fail.
8. When checks pass, review controller-service separation, dependency injection, validation, naming, and error handling.