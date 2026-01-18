# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/backend/refactor/spec_03_shared_global_refactor.md`.
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<dependent_tasks>
- spec_01_geography_refactor.md
- spec_02_identity_refactor.md
</dependent_tasks>

<context>
The `Shared Kernel` (`src/shared`) and other potential areas may still contain `domain/models` or references to them. To fully align with the Unified Domain Entities strategy, we must ensure `domain/models` is eliminated project-wide.
</context>

<scope>
Detailed list of what needs to be implemented.
1. **Refactor Shared Kernel (`src/shared`)**:
    - Identify any `domain/models`.
    - If they are Value Objects or DTOs, move to `domain/value-objects` or `domain/types` (or `application/dtos` if strict DTO).
    - If they are Entities, move to `domain/entities`.
    - Remove `src/shared/domain/models` if exists.
2. **Global Cleanup**:
    - Search for any remaining `domain/models` directory in the entire `app/backend/src`.
    - Perform a global search for imports `from '.../domain/models'`.
    - Fix any remaining broken references.
</scope>

<requirements>
- **Stack**: Backend Typescript (Node.js)
- **Negative Constraints**: Do NOT keep `domain/models` directory.
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
- [ ] `src/shared/domain/models` directory does not exist.
- [ ] Global search for directory `models` inside `domain` returns 0 results.
- [ ] Global search for `from '.../domain/models'` returns 0 results.
- [ ] `npm run test` passes.
</acceptance_criteria>

<output>
1. **Summary**: Cleaned up shared kernel and enforced global removal of domain/models.
2. **Decisions**: strictly following PRD Unified Domain Entities.
3. **Manual Test Guide**: Run `npm run test`.
</output>
