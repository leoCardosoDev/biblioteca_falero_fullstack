# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<dependent_tasks>
- PRD: app/docs/prd/PRD_Architecture_Compliance.md
</dependent_tasks>

<context>
- Current Status: The `geography` module violates ADR 003 by housing `usecases` within the `domain` layer.
- Components to be moved: All Use Cases currently in `src/modules/geography/domain`.
- Target: `src/modules/geography/application/usecases`.
</context>

<scope>
Detailed list of what needs to be implemented.
1. **Backend**:
   - Create directory `src/modules/geography/application/usecases`.
   - Move all use case classes/functions from `src/modules/geography/domain` to `src/modules/geography/application/usecases`.
   - Update `gateways` if they are wrongly placed.
   - Update all imports in `src/modules/geography` and consumers.
   - Update `index.ts` (barrel files).
   - Run tests to ensure no regression.
2. **Frontend**: N/A
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, Clean Architecture
- **Negative Constraints**: Do not change business logic.
- **Performance**: N/A
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **Ref**: ADR 003, ADR 013
</standards_compliance>

<database_schema>
```sql
-- No Schema Changes
```
</database_schema>

<api_specification>
#### No API Changes
Refactoring internal structure only.
</api_specification>

<acceptance_criteria>
- [ ] `src/modules/geography/domain` contains NO `usecases`.
- [ ] `src/modules/geography/application/usecases` contains all geography use cases.
- [ ] All imports are resolved correctly.
- [ ] `npm run test:unit` passes for geography module.
- [ ] `eslint` check passes.
</acceptance_criteria>

<output>
1. **Summary**: Refactored Geography module structure.
2. **Decisions**: Moved use cases to application layer.
3. **Manual Test Guide**: Run `npm run test:unit`.
</output>
