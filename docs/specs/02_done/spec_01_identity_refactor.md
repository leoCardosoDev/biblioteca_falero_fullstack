# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<dependent_tasks>
- PRD: app/docs/prd/PRD_Architecture_Compliance.md
</dependent_tasks>

<context>
- Current Status: The `identity` module violates ADR 003 by housing `usecases` within the `domain` layer.
- Components to be moved: All Use Cases currently in `src/modules/identity/domain`.
- Target: `src/modules/identity/application/usecases`.
</context>

<scope>
Detailed list of what needs to be implemented.
1. **Backend**:
   - Create directory `src/modules/identity/application/usecases`.
   - Move all use case classes/functions from `src/modules/identity/domain` to `src/modules/identity/application/usecases`.
   - Update `gateways` if they are wrongly placed (ensure Interface in Domain/Application, Implementation in Infra).
   - Update all imports in `src/modules/identity` and consumers.
   - Update `index.ts` (barrel files) to reflect new structure.
   - Run tests to ensure no regression.
2. **Frontend**: N/A
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, Clean Architecture
- **Negative Constraints**: Do not change business logic. Do not add new features.
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
- [ ] `src/modules/identity/domain` contains NO `usecases`.
- [ ] `src/modules/identity/application/usecases` contains all identity use cases.
- [ ] All imports are resolved correctly.
- [ ] `npm run test:unit` passes for identity module.
- [ ] `eslint` check passes.
</acceptance_criteria>

<output>
1. **Summary**: Refactored Identity module structure.
2. **Decisions**: Moved use cases to application layer to comply with ADR 003.
3. **Manual Test Guide**: Run `npm run test:unit` and verify directory tree.
</output>
