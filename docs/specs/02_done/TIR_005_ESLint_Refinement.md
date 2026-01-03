# TIR_005: ESLint 'any' Fixes and Import Normalization

## Problem
ESLint reported 7 `any` type errors in `login-repository.spec.ts`. Additionally, imports across test files were not consolidated to folder indexes, violating V6 standards.

## Rationale
Using `any` reduces type safety. Non-consolidated imports increase coupling to internal structures. Standardizing both ensures a more robust and compliant codebase.

## Corrective Actions
- **login-repository.spec.ts**: Replaced 7 `as any` with `as unknown as LoginTypeOrmEntity` or `Repository<LoginTypeOrmEntity>`.
- **Import Normalization**: Consolidated layer-level imports in `login-repository.spec.ts` and `create-user-login-controller.spec.ts` to reference folder indexes.
- **Index Exports**: Added missing exports in `@/infra/db/typeorm/index.ts` and `@/domain/usecases/index.ts` to support consolidated imports.
- **Type Safety**: Improved mock return types to avoid casting to `any`.
