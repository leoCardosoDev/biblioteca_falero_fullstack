# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
System Architect
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_monolith_03_identity.md`
- `app/docs/specs/01_in_progress/frontend/task_monolith_04_geography.md`
</dependent_tasks>

<prior_task_summary task="task_monolith_01_enforcement">
## Summary of Task 01: Enforcement

### What Was Implemented
1. **dependency-cruiser** installed and configured in `.dependency-cruiser.cjs` with 5 boundary rules.
2. **Husky Integration**: `pre-push` hook runs architectural checks.
3. **Baseline**: Pre-existing violations documented to be fixed during migration.
</prior_task_summary>

<prior_task_summary task="task_monolith_02_shared">
## Summary of Task 02: Shared Module

### What Was Implemented
1. **Clean Architecture Structure**: Restructured `src/shared` into 4 strict layers: `domain`, `application`, `infra`, and `presentation`.
2. **Migration**: Moved UI components, utilities (Either/Result), and infra wrappers (HttpClient) to their respective layers.
3. **Enforcement**: `dependency-cruiser` verified the internal layering and total isolation of the shared module.
</prior_task_summary>

<prior_task_summary task="task_monolith_03_identity">
## Summary of Task 03: Identity Module

### What Was Implemented
1. **Full Migration**: The Identity context was fully migrated to `src/modules/identity` with all 4 Clean Architecture layers.
2. **Domain Excellence**: Implemented `User` entity using Value Objects (Email, Cpf, etc.) for strict validation.
3. **Infrastructure**: `HttpIdentityRepository` implemented using the shared `HttpClient` wrapper, ensuring infrastructure decoupling.
4. **Presentation**: `LoginPage` and `UserListPage` integrated into the modular structure.
</prior_task_summary>

<prior_task_summary task="task_monolith_04_geography">
## Summary of Task 04: Geography Module

### What Was Implemented
1. **Full Migration**: The Geography context (City, State, Neighborhood) was fully migrated to `src/modules/geography`.
2. **Consolidation**: Legacy separate use cases (`LoadCityById`, etc.) consolidated into a single `IGeographyRepository` protocol.
3. **Legacy Cleanup**: Deleted legacy domain models and use cases from `src/domain`, resolving technical debt.
4. **Verification**: `tsc` and `dependency-cruiser` confirmed the new module is clean and correctly isolated.
</prior_task_summary>

<context>
With Identity and Geography migrated, the Root Legacy folders (`src/domain`, `src/application`, `src/infra`, `src/presentation`) should be effectively empty or contain only dead code. It is time to remove them and enforce strict Modular Monolith structure.
</context>

<scope>
1. **Verification**:
   - Check if any files remain in root `src/domain`, `src/application`, `src/infra`, `src/presentation`.
   - if files exist (e.g., `Library`, `Dashboard` legacy code), CREATE a plan to migrate them immediately OR move them to a `src/legacy` folder to allow deleting the root folders (if full migration is not possible yet). *Assumption based on PRD: All domain code was Identity/Geography.*

2. **Deletion**:
   - Delete `src/domain`.
   - Delete `src/application`.
   - Delete `src/infra` (root).
   - Delete `src/presentation` (root).

3. **Configuration Cleanup**:
   - Remove legacy path aliases from `tsconfig.json` (e.g., `@domain/*`, `@application/*`).
   - Remove legacy aliases from `vite.config.ts` or `webpack.config.js`.

4. **Strict Enforcement**:
   - Update `dependency-cruiser` config: Set Rule "Module -> Root" to **ERROR** (or separate rule forbidding the existence of root folders entirely).
   - Update `eslint-plugin-boundaries` to **ERROR** on root access.

5. **Sanity Check**:
   - Run full build and test suite.
</scope>

<technical_constraints>
- **No Residuals**: Ensure no hidden `.gitkeep` files keep the folders a life.
- **Path Aliases**: The only allowed aliases should be `@/modules`, `@/shared`, and maybe `@/tests`.
- **Definition of Done**: The project structure MUST look like:
  - `src/main`
  - `src/modules`
  - `src/shared`
  - (No other folders in `src` except maybe `styles` or `assets` depending on strictness).
</technical_constraints>

<requirements>
- **Stack**: System Files.
- **Risk**: If there was hidden code in root, the build will fail.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Codebase: Root `src/domain`, `src/application`, `src/infra`, `src/presentation` folders DO NOT EXIST.
- [ ] Config: `tsconfig.json` contains no legacy path aliases.
- [ ] Build: `npm run build` passes.
- [ ] Lint: `npm run lint` passes.
- [ ] Dep-Cruise: `npm run depcruise` passes with 0 violations.
</acceptance_criteria>

<output>
1. **Summary**: Removed legacy root structures. Transition to Modular Monolith complete.
2. **Decisions**: Hard deletion of folders to force compliance.
3. **Manual Test Guide**: Verify folder structure in file explorer.
</output>
