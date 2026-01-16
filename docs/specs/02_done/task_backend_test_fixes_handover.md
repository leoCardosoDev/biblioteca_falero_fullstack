# Task Handover: Backend Test Fixes

## Status: IN PROGRESS
**Date:** 2026-01-01
**Context:** Fixing regressions and remaining failures across the backend test suite.

## What was done
1. **Infrastructure Fixes**:
   - Updated `UserTypeOrmRepository` to correctly join and load `Role` entities associated with `Login`.
   - Fixed `toUserModel` reconstitution in repository to pass string slugs to `UserRole.create`.
   - Registered `RoleTypeOrmEntity` and `PermissionTypeOrmEntity` in integration test data sources to prevent partial entity registration errors.

2. **Integration Test Stability**:
   - **`user-repository.spec.ts`**: All tests PASS. Fixed foreign key violations by seeding mandatory roles (ADMIN, LIBRARIAN, MEMBER) and using valid UUIDs.
   - **`login-repository.spec.ts`**: All tests PASS. Fixed similar FK and seeding issues.
   - **`add-user-login-routes.test.ts`**: All tests PASS. Added required `email` field to payloads and corrected the JWT token role to use string literals.

3. **Validation Logic**:
   - Updated `CreateUserLoginValidationFactory` to include the `email` field, aligning with the controller's requirements.

## Blockers / Remaining Work
A full system test run (`npm test`) revealed several regressions in other modules that were still relying on a potentially deleted or moved `Role` enum, or were not updated to handle the new `email` field validation.

### 1. JWT & Authentication
- **File**: `src/infra/cryptography/jwt-adapter.spec.ts`
- **Issue**: Tests are calling `sign`/`encrypt` and expecting `Role.ADMIN` (enum), but it seems to be translating to `undefined` or `'MEMBER'` if not handled properly as a string.
- **Problem**: `JwtAdapter` expectations in tests are failing because of mismatch between `Role.ADMIN` and its string representation.

### 2. Middleware & Authorization
- **File**: `src/presentation/middlewares/require-role-middleware.spec.ts`
- **Issue**: `RequireRoleMiddleware` tests are returning `403` instead of `200`.
- **Reason**: Likely because the middleware compares input roles (now strings) using a different logic or the test isn't passing the correct mock data.

### 3. Controller Failures
- **File**: `tests/presentation/controllers/create-user-login-controller.spec.ts`
- **Issue**: `InvalidEmailError: Invalid email format` and `500` errors.
- **Reason**: Payload in tests needs to be updated to match current validation standards.

### 4. Use Case Regressions
- **File**: `tests/application/usecases/db-refresh-token.spec.ts`
- **Issue**: Mismatch in `Encrypter` payload expectations (`'ADMIN'` string vs `Role.ADMIN`).

## Next Steps for Resume
1. Run `npx jest src/infra/cryptography/jwt-adapter.spec.ts` and fix the role handling.
2. Run `npx jest src/presentation/middlewares/require-role-middleware.spec.ts`.
3. Check `src/presentation/controllers/create-user-login-controller.ts` logic vs its spec file.
4. Finalize `DbRefreshToken` expectations.
5. Run full coverage check.

## Useful Commands
- `npm test -- tests/main/routes/add-user-login-routes.test.ts` (Already passing)
- `npx jest src/infra/cryptography/jwt-adapter.spec.ts`
- `npx jest tests/presentation/controllers/create-user-login-controller.spec.ts`
