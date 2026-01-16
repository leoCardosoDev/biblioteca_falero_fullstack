# Audit Report: Infrastructure Layer (Repositories)

## Objective
Audit the `infra/db/typeorm` tests to ensure they verify data integrity, mapping correctness, and robust error handling at the persistence boundary.

## Summary of Repositories Audited
- `UserRepository`
- `LoginRepository`
- `RoleRepository`
- `NeighborhoodRepository`

## Findings

### FI-001: Exceptional "Domain Shielding"
**Location:** `UserTypeOrmRepository.ts`
**Issue:** The repository implementats a `toUserModel` reconstitution method that uses domain Value Objects to validate data loaded from the database. If the DB contains corrupt data (e.g. invalid email format), the repository returns `null`/`undefined` instead of polluting the domain with invalid entities.
**Test Quality:** Excellent. Tests like `Should return undefined from loadByEmail if user data is corrupt` (Line 439) explicitly verify this defensive behavior.

### FI-002: Inconsistent Reconstitution Strategy
**Location:** `LoginTypeOrmRepository.ts` vs `UserTypeOrmRepository.ts`
**Issue:** `UserRepository` fails fast (returns `null`) on data corruption. `LoginRepository` attempts manual recovery (e.g. `Id.generate()` if `roleId` is missing).
**Risk:** `LoginRepository` might return an "incomplete" but "valid-looking" object that causes downstream domain failures (e.g. permissions mismatch due to random Role ID).
**Test Quality:** `LoginTypeOrmRepository.spec.ts` verifies the fallback logic, but the logic itself is a domain risk.

### FI-003: Integration Coverage
**Location:** All repository tests.
**Quality:** High. All repositories use `better-sqlite3` in-memory for integration testing rather than mocking TypeORM. This ensures that real DB constraints (Unique, Not Null, FKs) and TypeORM mappings (decorations) are verified.

### FI-004: Soft Delete Awareness
**Location:** `UserRepository` and `LoginRepository`.
**Quality:** Robust. Tests specifically verify that soft-deleted users are excluded from `loadByEmail`, `loadByCpf`, and `loadAll`.

## Verdict
**[PASS]**
The infrastructure layer is the strongest part of the backend test suite. The implementation of "Domain Shielding" (Manual reconstitution with validation) significantly raises the quality bar. 
