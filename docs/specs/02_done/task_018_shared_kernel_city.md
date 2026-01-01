# Task 018: Populate Shared Kernel (City)

<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
</role>

<dependent_tasks>
- Task 017 (State Population).
</dependent_tasks>

<context>
Populate the `city` table with all Brazilian municipalities.
This should be done via an automated seed script using official data (IBGE), not manual entry.
</context>

<scope>
1. **Backend**:
   - Create `City` entity (if missing) with fields: `id`, `name`, `state_id`.
   - Implement a Seed Script (node script) that:
     - Downloads/Reads a curated list of cities (JSON/CSV from IBGE).
     - Resolves `state_id` from the existent `state` table by `uf`.
     - Inserts cities into the database.
2. **Frontend**:
   - None.
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Do NOT rely on admin manual entry.
- **Performance**: Script should handle bulk inserts efficiently (not one by one if 5000+ cities).
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<database_schema>
```sql
CREATE TABLE city (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  state_id UUID NOT NULL REFERENCES state(id),
  CONSTRAINT uq_city_name_state UNIQUE(name, state_id)
);
```
</database_schema>

<api_specification>
N/A (Seed Script).
</api_specification>

<acceptance_criteria>
- [ ] Backend: `city` table exists and references `state`.
- [ ] Backend: Seed script runs successfully without errors.
- [ ] Backend: All municipalities from the source (IBGE) are inserted correctly linked to their states.
- [ ] Integration: Correctly resolves `state_id` from `uf` during seeding.
</acceptance_criteria>

<output>
1. **Summary**: Created City entity and automated seed script.
2. **Decisions**: Used IBGE source for consistency.
3. **Manual Test Guide**: Run seed script, then query `SELECT c.name, s.uf FROM city c JOIN state s ON c.state_id = s.id WHERE c.name = 'São Paulo';`
</output>
