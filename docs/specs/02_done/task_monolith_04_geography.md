# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_monolith_01_enforcement.md`
- `app/docs/specs/01_in_progress/frontend/task_monolith_02_shared.md`
- `app/docs/specs/01_in_progress/frontend/task_monolith_03_identity.md`
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
5. **Verification**: `dependency-cruiser` confirmed zero imports from legacy roots.
</prior_task_summary>

<context>
Location data (City, State, Neighborhood) currently resides in legacy root `src/domain`. This belongs to the Geography Bounded Context.
</context>

<scope>
1. **Domain Layer Migration** (`src/modules/geography/domain`):
   - Move `City`, `State`, `Neighborhood` models/entities to `src/modules/geography/domain`.

2. **Application Layer Migration** (`src/modules/geography/application`):
   - Move location-fetching use-cases to `src/modules/geography/application`.
   - **Refactor**: Define `IGeographyRepository` interface here.

3. **Infra Layer Migration** (`src/modules/geography/infra`):
   - Move location repositories to `src/modules/geography/infra`.
   - **Constraint**: Must implement `IGeographyRepository`.
   - Use `shared` wrappers.

4. **Presentation Layer Migration** (`src/modules/geography/presentation`):
   - Move any location-specific selectors or components to `src/modules/geography/presentation`.

5. **Integration**:
   - Update imports in other modules (e.g. if `Identity` User has an address, it might Ref `CityId` or import `City` type).
   - *Note*: Ideally, cross-module dependencies should be minimal or via ID (Shared Kernel types). If `User` needs `City` object, use the `public-api` of Geography.

6. **Test Migration**:
   - Move all relevant legacy tests to `tests/modules/geography/...`.
</scope>

<technical_constraints>
- **No Direct Root Access**: Absolute prohibition of importing from legacy `src/domain` once migration is done.
- **Test Standardization**: All new tests must follow the directory mirroring rule.
- **Public API**: `src/modules/geography/public-api.ts` must be the ONLY entry point for other modules.
</technical_constraints>

<requirements>
- **Stack**: TypeScript.
- **Constraint**: `geography` MUST NOT import from `src/domain`.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Codebase: `src/domain/models/city.ts` (and others) does not exist (moved).
- [x] Codebase: `src/modules/geography` contains the logic and respects the 4 layers.
- [ ] Tests: Geography tests are located in `tests/modules/geography`.
- [x] Architecture: `dependency-cruiser` shows `geography` does NOT depend on `src/domain`.
- [ ] Feature: Address selection forms still work.
</acceptance_criteria>

<output>
1. **Summary**: Migrated Geography context to a proper Modular Monolith module with 4 Clean Architecture layers.
2. **Implementation Details**:
   - **Domain Layer**: `City`, `State`, `Neighborhood` entities and `Address` value object.
   - **Application Layer**: Enhanced `GeographyRepository` interface with `getById` methods.
   - **Infra Layer**: `HttpGeographyRepository` implements all repository methods using the shared `HttpClient`.
   - **Public API**: Full export of domain entities, protocols, hooks, and infra from `public/index.ts`.
3. **Legacy Cleanup**: 
   - Deleted `city.ts`, `state.ts`, `neighborhood.ts` from `src/domain/models`.
   - Deleted geography use cases from `src/domain/usecases`.
   - Updated barrel exports (`index.ts`) in both directories.
4. **Verification**:
   - `tsc --noEmit`: PASS
   - `npm run depcruise`: PASS (0 new violations)
5. **Remaining Work**:
   - [ ] Create unit tests in `tests/modules/geography/`.
   - [ ] Manual verification of address selection forms in UserForm.
6. **Manual Test Guide**: 
   - Go to User creation/edit form.
   - Enter a ZipCode or manually select State → City → Neighborhood.
   - Verify dropdowns populate correctly.
</output>

