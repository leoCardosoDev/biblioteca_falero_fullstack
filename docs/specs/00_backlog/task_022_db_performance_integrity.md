# Task 022: Database Performance & Integrity Improvements

<role>
You are the BACKEND ENGINEER.
</role>

<dependent_tasks>
- Task 021 (Soft Delete & Status).
</dependent_tasks>

<context>
To finalize data maturity, we need to apply Optimistic Locking (versioning), Strategic Indexes, and Business Constraints at the database level.
</context>

<scope>
1. **Backend**:
   - **Optimistic Locking**:
     - Add `version` (int, default 1) column to Aggregate Roots: `User`, `Work`, `Loan`, `Unit`.
     - Configure TypeORM `@VersionColumn()`.
   - **Strategic Indexes**:
     - Create Indexes for:
       - `login(user_id)`, `login(role_id)`
       - `loan(user_id)`, `loan(unit_id)`
       - `work_copy(status)`
       - `reservation(status)`
   - **Business Constraints**:
     - Ensure Unique Constraint: `work_copy_id` can appear in specific unique ways (e.g., only one active loan per copy).
     - *Note*: If DB constraint is too complex for "active loan", enforce via Service, but prefer DB partial index if possible (e.g., `UNIQUE(work_copy_id) WHERE return_date IS NULL` - *Postgres valid*).
   - Create Migration.
2. **Frontend**:
   - None.
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Avoid logic-heavy DB functions.
- **Performance**: Indexes must target actual query patterns.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **ADR**: `app/docs/adr/009_mature_data_architecture.md`
</standards_compliance>

<database_schema>
```sql
-- Versioning
ALTER TABLE "user" ADD COLUMN version INT DEFAULT 1;

-- Indexes
CREATE INDEX idx_login_user ON login(user_id);
-- ... others

-- Constraints
CREATE UNIQUE INDEX idx_one_active_loan_per_copy 
ON loan(work_copy_id) 
WHERE return_date IS NULL;
```
</database_schema>

<api_specification>
N/A.
</api_specification>

<acceptance_criteria>
- [ ] Backend: Aggregate Roots have version column.
- [ ] Backend: Concurrent updates fail with OptimisticLockError.
- [ ] Backend: Strategic indexes exist.
- [ ] Backend: Database prevents creating a second active loan for the same copy.
</acceptance_criteria>

<output>
1. **Summary**: Applied indexes, constraints, and optimistic locking.
2. **Decisions**: Used partial index for active loan constraint.
3. **Manual Test Guide**: Try to insert two active loans for same copy directly in DB -> Error.
</output>
