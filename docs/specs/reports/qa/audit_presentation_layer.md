# Audit Report: Presentation Layer (Controllers)

## Objective
Audit the `presentation/controllers` tests to ensure they correctly map domain/application results to HTTP responses, enforce input validation protocols, and handle edge cases gracefully.

## Summary of Controllers Audited
- `AddUserController`
- `CreateUserLoginController`
- `UpdateUserController`
- `UpdateUserStatusController`
- `UpdateUserRoleController`

## Findings

### FP-001: Architectural Strategy Inconsistency
**Location:** Everywhere
**Issue:** Some controllers (e.g. `AddUserController`) use the Project's `Validation` protocol as a first-pass (likely for structure/required fields) and then manually call domain Value Objects for semantic validation. Others (like `UpdateUserController`) omit the `Validation` protocol entirely, relying solely on manual inline VO validation.
**Risk:** Lack of standardized validation makes the codebase harder to maintain and leads to "Fat Controllers" (e.g. `UpdateUserController` is significantly longer and more complex than its peers).

### FP-002: Missing Permission-Failure Verification
**Location:** `user-governance-controller.spec.ts`
**Issue:** The controller code handles `AccessDeniedError` by returning `forbidden(error)` (403), but there are no unit tests verifying this branch.
**Risk:** Regressions in permission error mapping would go unnoticed.

### FP-003: Hardcoded Default Domain Logic
**Location:** `create-user-login-controller.ts`
**Issue:** Values like `Role: MEMBER` and `Status: ACTIVE` are hardcoded in the controller during the use case call.
**Risk:** If the default role for new logins changes, it must be updated in the controller code rather than via a configuration or a domain service.

### FP-004: Manual DTO Mapping
**Location:** Most controllers.
**Issue:** Controllers manually pluck properties from domain models to build the JSON response.
**Risk:** New sensitive fields in the Domain Model might be accidentally leaked if the plucking logic is too permissive, or new important fields might be omitted.

## Verdict
**[CONDITIONALLY PASS]**
The controllers correctly handle the "Happy Path" and "Known Domain Errors", but the inconsistency in validation strategy and the lack of unit tests for permission failures are points of concern. 
