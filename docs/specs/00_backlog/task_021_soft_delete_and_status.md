# Task 021: Implement Soft Delete and Explicit Status

<role>
You are the BACKEND ENGINEER.
</role>

<dependent_tasks>
- Task 020 (Timestamp Governance).
</dependent_tasks>

<context>
We need to transition the system to use "Soft Deletes" for auditing and "Explicit Status" for clarity.
Physical DELETEs are forbidden for business entities.
States should be Enums, not inferred.
</context>

<scope>
1. **Backend**:
   - **Soft Delete**:
     - Add `deleted_at` (nullable datetime) to entities: `User`, `Login`, `Unit`, `Work`, `WorkCopy`, `Loan`, `Reservation`.
     - Update TypeORM repositories (or BaseEntity) to filter `deleted_at IS NULL` by default.
   - **Explicit Status**:
     - Add `status` Enum column to `User`: `['ACTIVE', 'INACTIVE', 'BLOCKED']`.
     - Add `status` Enum column to `Loan`: `['OPEN', 'CLOSED', 'OVERDUE']`.
     - (Migration) Populate existing records with default status (ACTIVE/OPEN).
   - Create Migration for these schema changes.
2. **Frontend**:
   - None (API should just respect these states).
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Do NOT use physical DELETE in code anymore.
- **Performance**: Ensure `deleted_at` is indexed if high volume.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **ADR**: `app/docs/adr/009_mature_data_architecture.md`
</standards_compliance>

<database_schema>
```sql
ALTER TABLE "user" ADD COLUMN deleted_at TIMESTAMP NULL;
ALTER TABLE "user" ADD COLUMN status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL;
-- Repeat for other tables...
```
</database_schema>

<api_specification>
N/A - Internal Schema Constraint.
Endpoints that "delete" should now "soft delete".
</api_specification>

<acceptance_criteria>
- [ ] Backend: `deleted_at` column exists on specified tables.
- [ ] Backend: `delete()` operations now perform `update set deleted_at = now()`.
- [ ] Backend: `find()` operations exclude soft-deleted records.
- [ ] Backend: `User` and `Loan` have explicit status columns.
</acceptance_criteria>

<output>
1. **Summary**: Implemented Soft Delete and Explicit Status.
2. **Decisions**: Enum used for status for strict typing.
3. **Manual Test Guide**: Delete a user via API, check DB: record should exist with `deleted_at` populated.
</output>
