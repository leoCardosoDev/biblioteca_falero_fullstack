# Technical Improvement Record (TIR_002_Specific_Coverage_Fixes)

## Context
- **Task ID**: REF-002 (Specific Coverage Gaps)
- **Story ID**: N/A
- **Role**: REV
- **Affected Area**: Backend (Shared Kernel & Infrastructure)

## Problem Detected
1. **Uncovered Monad Logic**: The `Either` monad (`src/shared/either.ts`) lacked test coverage for negative cases (`Right.isLeft()`, `Left.isRight()`).
2. **Uncovered Repository Methods**: `RoleTypeOrmRepository` (`src/infra/db/typeorm/role-repository.ts`) had low coverage, specifically missing tests for `loadById` and strictly typed mapping in `toDomain`.

## Risk Assessment
- **Low/Medium**: Low risk for `Either` as logic is trivial, but important for strictness. Medium risk for `RoleRepository` as `loadById` is a core method for RBAC; failure there could block admin operations.

## Correction Applied
1. **New Test Suite**: Created `tests/shared/either.spec.ts` covering all methods of `Left` and `Right` classes.
2. **New Test Suite**: Created `tests/infra/db/typeorm/role-repository.spec.ts` covering `loadBySlug` and `loadById` (both success and null scenarios), ensuring `toDomain` mapping is fully exercised.

## Safety Justification
- [x] Compliance: Achieves 100% coverage for the identified files.
- [x] Non-Breaking: No production code changes, only test additions.
- [x] Localized: Changes restricted to test folders.

## Next Steps
- [x] Proceed to next phase
