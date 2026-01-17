# ADR 009: Mature Data Architecture Standards

## Status
Accepted

## Context
To ensure enterprise-grade data integrity and prevent "Lost Updates" or accidental data destruction, we enforce strict data governance patterns.

## Decision
We enforce the following **Data Integrity Patterns** on all Aggregate Roots.

### 1. Soft Delete
**Rule**: Physical `DELETE` operations are **FORBIDDEN** on Business Aggregates.
**Mechanism**:
*   Column: `deleted_at` (Nullable DateTime).
*   Logic: `NULL` = Active. `Timestamp` = Deleted.
**Target**: `User`, `Login`, `Unit`, `Work`, `WorkCopy`, `Loan`.
**Exemption**: Link tables (e.g., `RolePermission`) may use physical delete if they represent pure relationships.

### 2. Optimistic Locking (Concurrency Control)
**Rule**: All Aggregate Roots MUST implement versioning to prevent race conditions.
**Mechanism**:
*   Column: `version` (Integer, Default 1).
*   Logic: `UPDATE ... SET version = version + 1 WHERE id = ? AND version = ?`.
*   Failure: If rows affected = 0, throw `ConcurrencyError`.
**Target**: `WorkCopy` (Inventory), `Loan` (Status), `User` (Profile).

### 3. Explicit Enum States
**Rule**: State MUST be explicit, never inferred.
*   **Bad**: `is_returned = true`
*   **Good**: `status = 'RETURNED'` (Enum).
*   **Reason**: Enables future states (`LOST`, `DAMAGED`) without schema changes.

## Consequences
*   **Reliability**: Eliminates race conditions in high-concurrency scenarios.
*   **Audit**: Preserves history of deleted items.

## Compliance
Repositories MUST automatically handle `deleted_at` filtering.
TypeORM/Prisma usage MUST enable version columns.
