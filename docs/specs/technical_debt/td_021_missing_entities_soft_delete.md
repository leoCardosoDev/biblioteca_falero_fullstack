# Technical Debt: Soft Delete Implementation for Missing Entities (TD_021)

<role>
You are the BACKEND ENGINEER.
</role>

<context>
Task 021 required soft delete implementation for several entities. While `User` and `Login` were completed and corrected during [REV], the following entities are not yet present in the current backend project:
- `Unit`
- `Work`
- `WorkCopy`
- `Loan`
- `Reservation`

This debt must be cleared once these entities are implemented.
</context>

<scope>
1. **Infrastructure**:
   - Add `deleted_at` column to new entities as they are created.
   - Ensure repositories for these entities use `IsNull()` filter for soft delete.
2. **Migration**:
   - Create migrations for these columns as the tables are introduced.
</scope>

<requirements>
- Entities MUST follow the Soft Delete pattern established in `UserTypeOrmEntity`.
- Standard: `ADR 009 (Mature Data Architecture)`.
</requirements>

<acceptance_criteria>
- [ ] Specified entities have `deleted_at` column.
- [ ] Repositories for these entities filter out soft-deleted records.
- [ ] All "delete" operations are performed as updates (soft delete).
</acceptance_criteria>
