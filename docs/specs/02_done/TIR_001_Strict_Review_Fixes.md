# Technical Improvement Record (TIR_001_Strict_Review_Fixes)

## Context
- **Task ID**: REF-001 (Backend Strict Review)
- **Story ID**: N/A
- **Role**: REV
- **Affected Area**: Backend

## Problem Detected
1. **Regression in Role Handling**: Codebase was using `Role` enum values (`Role.ADMIN`) while the domain model had been refactored to use string slugs (`'ADMIN'`). This caused test failures in middleware and JWT adapters.
2. **Coverage Gaps**: 
    - `CreateUserLoginController` had an uncovered `catch` block for `Email.create` errors.
    - `DbRefreshToken` had unreachable code (`user.role ?? 'MEMBER'`) given the repository contract.
    - `DbAuthentication` had redundant checks for `roleId` presence.
3. **Test Hygiene**: Some tests were testing impossible states (mocking `undefined` for strict properties) or lacked strict expectations.

## Risk Assessment
- **High**: Mismatch in role representation could lead to authorization bypass or runtime errors (e.g., checks failing silently).
- **Medium**: Uncovered error handling lines mask potential bugs in edge cases (e.g., malformed email payloads crashing the server instead of returning 400).

## Correction Applied
1. **Role Refactor**: Updated all occurrences of `Role` enum in tests and implementation to use string literals (`'ADMIN'`, `'MEMBER'`) matching the `Role` entity slug.
2. **Coverage Fixes**:
    - Added test case `Should return 400 if Email.create throws` to `create-user-login-controller.spec.ts`.
    - Removed dead branch `user.role ?? 'MEMBER'` in `db-refresh-token.ts`.
    - Removed redundant `if (account.roleId)` in `db-authentication.ts`.
    - Removed invalid test cases coverage impossible states.
3. **Test Hygiene**: Detailed expectations in `create-user-login-controller.spec.ts` to match exact error messages.

## Safety Justification
- [x] Compliance: Code now strictly enforces `STANDARD_BACKEND.md` and achieves 100% coverage in `application` and `presentation` layers.
- [x] Non-Breaking: Logic remains semantically identical but is now type-safe and consistent with Domain changes.
- [x] Localized: Changes restricted to Auth/User modules and their corresponding tests.

## Next Steps
- [x] Proceed to next phase (Merge/Deploy)
- [ ] New TD Task required: Coverage for `src/infra` specific configurations (`data-source.ts`) and migrations if deemed necessary by Architect.
