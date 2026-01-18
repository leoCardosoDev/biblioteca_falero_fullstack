# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/backend/refactor/spec_01_geography_refactor.md`.
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `Geography` module currently splits its domain layer into `domain/entities` (logic) and `domain/models` (anemic interfaces). This violates ADR 013 and creates fragmentation. The goal is to unify these into `domain/entities`.
</context>

<scope>
Detailed list of what needs to be implemented.
1. **Refactor `src/modules/geography`**:
    - Move/Merge all interfaces from `src/modules/geography/domain/models` into their corresponding classes in `src/modules/geography/domain/entities`.
    - If a model has no corresponding entity, create the Entity class in `entities`.
    - Delete `src/modules/geography/domain/models`.
    - Update `src/modules/geography/domain/index.ts` (barrel file).
    - Update all imports in `application`, `infra`, `presentation`, `tests` that referenced `domain/models`.
</scope>

<requirements>
- **Stack**: Backend Typescript (Node.js)
- **Negative Constraints**: Do NOT change database schema. Do NOT keep `domain/models` directory.
- **Performance**: N/A
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **ADR**: `app/docs/adr/013_modular_monolith_clean_architecture.md`
</standards_compliance>

<database_schema>
```sql
-- No changes
```
</database_schema>

<api_specification>
#### N/A
Refactoring internal structure only.
</api_specification>

<acceptance_criteria>
- [ ] `src/modules/geography/domain/models` directory does not exist.
- [ ] All geography entities (City, State, etc.) are in `src/modules/geography/domain/entities`.
- [ ] No imports reference `geography/domain/models`.
- [ ] `npm run test` passes.
</acceptance_criteria>

<output>
1. **Summary**: Merged Geography models into entities.
2. **Decisions**: strictly following PRD Unified Domain Entities.
3. **Manual Test Guide**: Run `npm run test`.
</output>
