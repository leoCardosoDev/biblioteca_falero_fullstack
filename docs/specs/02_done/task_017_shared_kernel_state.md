# Task 017: Populate Shared Kernel (State)

<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
</role>

<dependent_tasks>
- None.
</dependent_tasks>

<context>
The "Shared Kernel" (Geography) is currently unpopulated, creating an operational bottleneck.
We need to populate the `state` table with a static list of Brazilian states (UF).
This data is immutable and should not be managed manually by admins.
</context>

<scope>
1. **Backend**:
   - Create `State` entity (if missing) with fields: `id`, `name`, `uf`.
   - Create a TypeORM migration (or SQL seed script) to insert the 27 Federative Units of Brazil.
   - Ensure the table is read-only for standard users (governance: immutable).
2. **Frontend**:
   - None (this is a backend database task).
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Do NOT build a CRUD UI for States. Do NOT allow manual insertion/deletion via API.
- **Performance**: N/A (One-time seed).
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<database_schema>
```sql
CREATE TABLE state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  uf VARCHAR(2) NOT NULL UNIQUE
);

-- Seed Data
INSERT INTO state (name, uf) VALUES
('Acre','AC'),
('Alagoas','AL'),
('Amapá','AP'),
('Amazonas','AM'),
('Bahia','BA'),
('Ceará','CE'),
('Distrito Federal','DF'),
('Espírito Santo','ES'),
('Goiás','GO'),
('Maranhão','MA'),
('Mato Grosso','MT'),
('Mato Grosso do Sul','MS'),
('Minas Gerais','MG'),
('Pará','PA'),
('Paraíba','PB'),
('Paraná','PR'),
('Pernambuco','PE'),
('Piauí','PI'),
('Rio de Janeiro','RJ'),
('Rio Grande do Norte','RN'),
('Rio Grande do Sul','RS'),
('Rondônia','RO'),
('Roraima','RR'),
('Santa Catarina','SC'),
('São Paulo','SP'),
('Sergipe','SE'),
('Tocantins','TO');
```
</database_schema>

<api_specification>
N/A (Database population only).
Use existing "List States" endpoint if creating one is strictly necessary for verifying, otherwise just direct DB data is fine for now.
</api_specification>

<acceptance_criteria>
- [ ] Backend: `state` table exists in the database.
- [ ] Backend: Table contains exactly 27 records (all Brazilian UFs).
- [ ] Backend: `uf` is unique.
- [ ] Backend: Data persists after migration runs.
</acceptance_criteria>

<output>
1. **Summary**: Created State entity and seeded data.
2. **Decisions**: Used static SQL insert as states do not change.
3. **Manual Test Guide**: Connect to DB and run `SELECT count(*) FROM state;` (Should return 27).
</output>
