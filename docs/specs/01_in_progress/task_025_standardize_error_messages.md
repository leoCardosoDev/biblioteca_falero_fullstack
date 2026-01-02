# Task 025: Standardized Error Messages

## Standards Compliance
- [ ] @[STANDARD_GITFLOW.md]
- [ ] @[STANDARD_GENERAL.md]
- [ ] @[STANDARD_BACKEND.md]

## Goal
Implement a robust and standardized error handling mechanism in the backend to ensure all failed requests return a structured, helpful, and localized (PT-BR) payload.


## Context
API consumers currently receive inconsistent or empty error bodies for common failures (like invalid CPF).

## Architectural Strategy
1. **Global Hook**: Use Fastify's `setErrorHandler` in `src/main/config/app.ts`.
2. **Domain Integration**: Map custom domain errors to the standard schema.
3. **Validation Integration**: Intercept Zod errors and format them with field detail.

## Standards
- Follows `STANDARD_BACKEND.md`.
- Requires 100% code coverage for the handler.

## Handoff
Route to [BACKEND-DEV] for execution.
