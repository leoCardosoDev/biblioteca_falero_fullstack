# ADR 008: Timestamp Governance Policy

## Status
Accepted

## Context
Inconsistent usage of `created_at` and `updated_at` timestamps creates audit gaps and database noise.
We must deterministically define which entities require temporal tracking.

## Decision
We enforce the following **Timestamp Classification Categories**.

### 1. MANDATORY (Business Entities)
**Rule**: MUST have `created_at` AND `updated_at`.
**Scope**: All Aggregate Roots and Mutable Entities.
*   `User`, `Login`, `Unit`, `Work`, `WorkCopy`, `Loan`, `Reservation`, `Maintenance`.
*   **Reason**: Full audit trail of lifecycle is required.

### 2. RECOMMENDED (Security & Control)
**Rule**: MUST have `created_at`. `updated_at` is Recommended.
**Scope**: Configuration Entities.
*   `Role`, `Permission`, `RolePermission`.

### 3. FORBIDDEN (Static Catalogues)
**Rule**: MUST NOT have timestamps.
**Scope**: Immutable Domain Constants / Lookups.
*   `State`, `Genre`, `Language`, `WorkType`, `Author`, `Publisher`.
*   **Reason**: These are reference data. If they change, it is a migration event, not a runtime update. "Noise Reduction".

## Implementation Standard
All Timestamp columns MUST use the server usage time (UTC).
*   **TypeORM**: `@CreateDateColumn()`, `@UpdateDateColumn()`.
*   **SQL**: `DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`.

## Consequences
*   **Clarity**: DB Schema reviews are deterministic.
*   **Performance**: Reduced storage for static tables.

## Compliance
Schema migrations violating these rules will be rejected in Code Review.
