# ADR 009: Mature Data Architecture (Integrity & Governance)

## Status
Accepted

## Context
The system requires a mature data strategy to ensure long-term maintainability, auditability, and performance.
- **Problem**:
  - Hard deletes cause data loss and break history.
  - Implicit states (e.g., inferring "Open" loan by null return date) cause bugs.
  - Lack of concurrency control (locking) risks data overwrites.
  - Missing indexes hurt scale.
  - Domain events are needed for decoupling side effects.

## Decision
We will verify and enforce the following patterns across the persistence layer:

### 1. Soft Delete
**Rule**: Business entities are never physically deleted.
**Mechanism**: `deleted_at DATETIME NULL`.
**Target**: `user`, `login`, `unit`, `work`, `work_copy`, `loan`, `reservation`.
**Reason**: Audit requirement ("data never disappears").

### 2. Explicit Status
**Rule**: Core states must be explicit Enums, not inferred values.
**Targets**:
- `Loan`: OPEN, CLOSED, OVERDUE.
- `User`: ACTIVE, INACTIVE, BLOCKED.

### 3. Concurrency Control (Optimistic Locking)
**Rule**: Prevent "Lost Update" problem on aggregates.
**Mechanism**: `version INT DEFAULT 0`.
**Target**: All Aggregate Roots (`User`, `Work`, `Loan`, `Unit`).

### 4. Strategic Indexing
**Rule**: Index foreign keys and status columns used in high-frequency filters.

### 5. Domain Events
**Rule**: Persist domain events to a local table before/during transaction commit for audit and future async processing.
**Mechanism**: `domain_event` table.

## Consequences
### Positive
- **Safety**: Accidental deletes are reversible; history is preserved.
- **Clarity**: Status is readable and consistent.
- **Reliability**: Race conditions are prevented by versioning.
- **Extensibility**: Domain events capture side effects.

### Negative
- **Complexity**: All queries must filter `deleted_at IS NULL`.
- **Storage**: Tables grow indefinitely (requires archiving strategy simpler via soft delete).
