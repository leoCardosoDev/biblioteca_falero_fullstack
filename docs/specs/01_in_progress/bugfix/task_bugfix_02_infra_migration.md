<role>
You are the DATABASE & INFRASTRUCTURE SPECIALIST.
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/bugfix/task_bugfix_01_domain_address.md`
- `app/docs/specs/reports/qa/ADR_ADDRESS_RESTRUCTURING.md`
</dependent_tasks>

<context>
The Domain has been updated to expect strict IDs. Now the Database must strictly enforce these relationships.
Current DB Schema allows orphan records (missing FKs) and lacks the `address_state_id` column.
</context>

<scope>
1. **Backend (Infrastructure Layer)**:
   - Create Migration `CreateStrictGeoFks` to add `address_state_id` and strict FK constraints.
   - Update `UserTypeOrmEntity` with `@ManyToOne` relationships for State, City, Neighborhood.
   - Update `UserMapper.toDTO` to handle the new Relation Objects (accessing `.value`).
   - Update `UserMapper.toDomain` (UserTypeOrmRepository) to reconstruct the User with new Address structure.
   - Update `CachedAddressGateway` to serialize/deserialize the new ID-based structures.
   - **Cleanup**: Delete `src/main/seeds/city-seed.ts` as we are moving to a Lazy Population strategy (ADR: ARCH_ADDRESS_FULL_FLOW).
</scope>

<requirements>
- **Stack**: TypeORM, MySQL, Redis.
- **Negative Constraints**: No new libraries.
</requirements>

<standards_compliance>
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<database_schema>
```sql
ALTER TABLE users ADD COLUMN address_state_id VARCHAR(36);
ALTER TABLE users ADD CONSTRAINT fk_user_state FOREIGN KEY (address_state_id) REFERENCES state(id);
ALTER TABLE users ADD CONSTRAINT fk_user_city FOREIGN KEY (address_city_id) REFERENCES city(id);
ALTER TABLE users ADD CONSTRAINT fk_user_neighborhood FOREIGN KEY (address_neighborhood_id) REFERENCES neighborhood(id);
-- Strict FKs for Geo Hierarchy
ALTER TABLE city ADD CONSTRAINT fk_city_state FOREIGN KEY (state_id) REFERENCES state(id);
ALTER TABLE neighborhood ADD CONSTRAINT fk_neighborhood_city FOREIGN KEY (city_id) REFERENCES city(id);
```
</database_schema>

<acceptance_criteria>
- [x] Backend: Migration runs successfully locally.
- [x] Backend: `UserTypeOrmEntity` matches DB schema.
- [x] Backend: `UserMapper` correctly converts between Domain (IDs) and Persistence (Strings/Relations).
- [x] Backend: Legacy `city-seed.ts` removed.
</acceptance_criteria>

<output>
1. **Summary**: Database hardened with strict FKs; Persistence layer synced with Domain.
2. **Status**: COMPLETED. Migration `CreateStrictGeoFks` created, Entities updated, Repositories refactored, Tests passed.
</output>
