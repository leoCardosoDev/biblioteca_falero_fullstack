# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/backend/refactor/spec_02_identity_refactor.md`.
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<dependent_tasks>
- spec_01_geography_refactor.md (Soft dependency for order, can be parallel)
</dependent_tasks>

<context>
The `Identity` module currently places its Rich Domain Models inside `src/modules/identity/domain/models`, creating semantic confusion as they are actual Entities, not anemic models. This violates the project convention of using `domain/entities`.
</context>

<scope>
Detailed list of what needs to be implemented.
1. **Refactor `src/modules/identity`**:
    - Rename/Move directory `src/modules/identity/domain/models` to `src/modules/identity/domain/entities`.
    - If `domain/entities` already exists, move files into it.
    - Update `src/modules/identity/domain/index.ts`.
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
- [ ] `src/modules/identity/domain/models` directory does not exist.
- [ ] All identity entities (User, Login, Account, etc.) are in `src/modules/identity/domain/entities`.
- [ ] No imports reference `identity/domain/models`.
- [ ] `npm run test` passes.
</acceptance_criteria>

<output>
1. **Summary**: Moved Identity models to entities.
2. **Decisions**: strictly following PRD Unified Domain Entities.
3. **Manual Test Guide**: Run `npm run test`.
</output>
