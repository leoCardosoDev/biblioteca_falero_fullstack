# ADR 008: Timestamp & Auditing Strategy (DDD & Governance)

## Status
Accepted

## Context
The system requires a clear definition of where and why to use `created_at` and `updated_at` timestamps.
- **Problem**: Indiscriminate use of timestamps creates noise in static tables and misses audit trails in critical entities.
- **Goal**: Apply timestamps strictly where there is **relevant state change** or **audit requirements**.
- **Principle**: Timestamps are an audit tool, not decoration.

## Decision
We categorize entities into four levels regarding timestamp usage:

### 1. Mandatory (Business Entities / Aggregate Roots)
**Rule**: Must have `created_at` and `updated_at`.
- **Entities**:
  - `user` (profile changes)
  - `unit` (location/contact changes)
  - `login` (security lifecycle)
  - `work` (catalog corrections)
  - `work_copy` (status/maintainance)
  - `loan` (lifecycle evolution)
  - `reservation` (fulfillment status)
  - `maintenance` (audit trail)

### 2. Recommended (Control & Governance)
**Rule**: Recommended `created_at` and `updated_at` (especially `updated_at` for role/permissions).
- **Entities**:
  - `role`
  - `permission`
  - `role_permission`

### 3. Optional (Technical/Value Objects)
**Rule**: `created_at` only (soft requirement), or none.
- **Entities**:
  - `neighborhood` (created on demand)
  - `city` (stable data)

### 4. Forbidden / Unnecessary (Static Lookups)
**Rule**: No timestamps. These are immutable catalogues.
- **Entities**:
  - `state`
  - `genre`
  - `language`
  - `work_type`
  - `location` (physical shelves/aisles - rarely move)
  - `author`
  - `publisher`

## Implementation Standard
```sql
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
```
(Or equivalent TypeORM decorators `@CreateDateColumn` and `@UpdateDateColumn`)

## Consequences
### Positive
- **Clarity**: Developers know exactly when to add timestamps.
- **Performance**: Reduces storage/indexing overhead on static tables.
- **Semantics**: The schema reflects the "liveness" of the data.

### Negative
- **Inconsistency**: Not every table has the same columns (intentional divergence).
