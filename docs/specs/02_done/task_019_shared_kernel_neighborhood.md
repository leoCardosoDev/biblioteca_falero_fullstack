# Task 019: Shared Kernel (Neighborhood On-Demand)

<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
</role>

<dependent_tasks>
- Task 018 (City Population).
</dependent_tasks>

<context>
Populating all neighborhoods is inefficient. We will adopt an "On-Demand" strategy.
Neighborhoods are created automatically when referenced if they don't exist for the given city, or implicitly via an API designed for autocomplete/creation.
</context>

<scope>
1. **Backend**:
   - Create `Neighborhood` entity with fields: `id`, `name`, `city_id`.
   - Implement Endpoint: `POST /api/neighborhoods`.
     - Input: `{ "city_id": "...", "name": "Vila Mariana" }`.
     - Logic: Check if exists. If yes, return id. If no, create and return id.
   - Ensure logs/audit for created neighborhoods.
2. **Frontend**:
   - (Future Task) Implement Autocomplete component that calls this API.
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Do NOT allow DELETE of neighborhoods (referential integrity). UPDATE only by Admin.
- **Performance**: Efficient lookup by (city_id, name).
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<database_schema>
```sql
CREATE TABLE neighborhood (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  city_id UUID NOT NULL REFERENCES city(id),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT uq_neighborhood_name_city UNIQUE(name, city_id)
);
```
</database_schema>

<api_specification>
#### POST /api/neighborhoods
**Request**:
```json
{
  "city_id": "uuid-of-sao-paulo",
  "name": "Vila Mariana"
}
```
**Response**:
```json
{
  "id": "uuid-of-created-or-found-neighborhood",
  "name": "Vila Mariana",
  "city_id": "uuid-of-sao-paulo",
  "created": true // or false if existed
}
```
</api_specification>

<acceptance_criteria>
- [ ] Backend: `neighborhood` table exists with FK to `city`.
- [ ] Backend: POST /api/neighborhoods creates a new record if it doesn't exist.
- [ ] Backend: POST /api/neighborhoods returns existing record if it already exists (idempotent-ish).
- [ ] Backend: Cannot create duplicate neighborhood in same city.
</acceptance_criteria>

<output>
1. **Summary**: Implemented Neighborhood entity and functional "find-or-create" API.
2. **Decisions**: Adopted on-demand creation to avoid massive incomplete seed.
3. **Manual Test Guide**: Call POST with a new name, verify creation. Call again, verify same ID returned.
</output>
