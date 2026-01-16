# Task 020: Enforce Timestamp Governance (Schema Update)

<role>
You are the BACKEND ENGINEER.
</role>

<dependent_tasks>
- Task 007 (Backend Refactor Domain) - ideally done during refactor.
</dependent_tasks>

<context>
We need to align the database schema with ADR 008 regarding `created_at` and `updated_at`.
Currently, usage might be inconsistent. We must ensure "living" entities have audit trails and "static" entities do not.
</context>

<scope>
1. **Backend**:
   - Review all TypeORM Entities.
   - **Add** `@CreateDateColumn` and `@UpdateDateColumn` to:
     - `User`, `Unit`, `Login`, `Work`, `WorkCopy`, `Loan`, `Reservation`, `Maintenance`.
     - `Role`, `Permission`, `RolePermission`.
   - **Remove** these columns from (if present):
     - `State`, `Genre`, `Language`, `WorkType`, `Location`, `Author`, `Publisher`.
   - **Adjust** optional entities:
     - `Neighborhood`, `City` (Keep `created_at` if useful for debugging, remove `updated_at`).
   - Create a Migration to apply these schema changes.
2. **Frontend**:
   - None (API contracts remain largely the same, mostly internal audit fields).
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Do NOT use database Triggers if TypeORM or default SQL values suffice.
- **Performance**: Minimal impact.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **ADR**: `app/docs/adr/008_timestamp_governance.md`
</standards_compliance>

<database_schema>
```sql
-- Example for Mandatory tables:
ALTER TABLE user 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW(); -- Handle ON UPDATE via ORM or Trigger if needed

-- Example for Static tables:
ALTER TABLE state 
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS updated_at;
```
</database_schema>

<api_specification>
N/A - Internal Schema Change.
</api_specification>

<acceptance_criteria>
- [ ] Backend: Mandatory entities have populated audit timestamps.
- [ ] Backend: Static entities do not have timestamp columns.
- [ ] Backend: Updates to a User or Work entity correctly update the `updated_at` field.
- [ ] Backend: Migration runs successfully up and down.
</acceptance_criteria>

<output>
1. **Summary**: Enforced ADR 008 across the database schema.
2. **Decisions**: Removed noise from lookup tables.
3. **Manual Test Guide**: Update a record in `user` and check if `updated_at` changes. Check `state` table structure.
</output>
