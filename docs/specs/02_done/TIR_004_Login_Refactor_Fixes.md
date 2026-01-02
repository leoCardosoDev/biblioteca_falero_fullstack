# Technical Improvement Record (TIR_004)

## Context
- **Task ID**: Task-008
- **Story ID**: Create User Login Refactoring
- **Role**: REV
- **Affected Area**: Backend | Tests | Infra

## Problem Detected
During the code review ([REV] role) of the "Create User Login" refactoring, several technical inconsistencies and non-compliances were identified:
1. **Redundant Logic**: The `CreateUserLoginController` and `DbCreateUserLogin` use case still expected/handled `email` in the input, which contradicted the new architectural decision of fetching the email internally via `userId`.
2. **Test Regression**: Integration tests (`create-user-login-routes.test.ts`) and unit tests were sending `email` in the request body, leading to false positives or inconsistent states.
3. **Data Integrity in Tests**: The `UsersSeed` used placeholder CPF strings (e.g., 'any_cpf') which triggered `[DATA CORRUPTION]` errors in the `UserTypeOrmRepository` due to strict domain validation.
4. **Value Object Mismatch**: `db-add-neighborhood.spec.ts` had type mismatches where it used raw strings for fields expecting the `Id` value object, and failed UUID format validation.
5. **Linting Hygiene**: Multiple migration files had unused imports (`TableForeignKey`) and unused caught error variables (`e`), violating the project's pristine codebase standard.

## Risk Assessment
- **Invalid Data**: Allowing invalid CPFs in seeds could lead to unpredictable repository behavior or test failures in unrelated suites.
- **Architectural Drift**: Keeping `email` in the request payload leaks internal implementation details to the client and increases the attack surface.
- **Code Rot**: Accumulating lint warnings and unused code degrades maintainability and violates the strict code hygiene policy.

## Correction Applied
1. **Refined API**: Removed `email` from `CreateUserLoginController` request body and `DbCreateUserLogin` input parameters. Email is now fetched via `LoadUserByIdRepository`.
2. **Updated Tests**: Synchronized all tests (controller, route, use case, factory) to match the new payload structure.
3. **Corrected Seed Data**: Replaced all placeholder CPFs in `UsersSeed` and related tests with valid CPF numbers to satisfy domain constraints.
4. **Strict Type Enforcement**: Updated `db-add-neighborhood.spec.ts` to use `Id.create()` with valid UUIDs, ensuring consistency with the domain entity models.
5. **Lint Resolution**: Removed unused imports and prefixed unused caught errors with `_` in migration files.
6. **Consolidated Imports**: Normalized imports across modified files to use `index.ts` files for Value Objects.

## Safety Justification
- [x] Compliance: Follows `STANDARD_BACKEND.md` and `prompt_code_reviewer.md`.
- [x] Non-Breaking: Business logic intent (creating a login) remains intact, only the transmission/validation of the email field was corrected.
- [x] Localized: Changes were restricted to the affected feature and its supporting tests/infra.

## Next Steps
- [x] Proceed to next phase (Merge to develop)
- [ ] New TD Task required: None
