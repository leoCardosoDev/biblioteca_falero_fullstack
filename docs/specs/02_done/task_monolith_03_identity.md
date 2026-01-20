# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_monolith_02_shared.md` (Shared Kernel ready)
</dependent_tasks>

<prior_task_summary task="task_monolith_01_enforcement">
## Summary of Task 01: Enforcement

### What Was Implemented
1. **dependency-cruiser** installed and configured in `.dependency-cruiser.cjs` with 5 boundary rules.
2. **Husky Integration**: `pre-push` hook runs architectural checks.
3. **Baseline**: 16 pre-existing violations documented to be fixed during migration.
</prior_task_summary>

<prior_task_summary task="task_monolith_02_shared">
## Summary of Task 02: Shared Module

### What Was Implemented
1. **Clean Architecture Structure**: Restructured `src/shared` into 4 strict layers:
   - `src/shared/domain/` (Pure Business Rules)
   - `src/shared/application/common/` (Result, Either, Orchestration patterns)
   - `src/shared/infra/` (HttpClient, Query, Adapters, Store)
   - `src/shared/presentation/ui/` (Atomic React Components)
2. **Migration**:
   - Moved `ui/` -> `presentation/ui`.
   - Moved `lib/` -> `application/common`.
   - Moved `store/` -> `infra/store`.
3. **Enforcement**:
   - `dependency-cruiser` verified the internal layering of `shared`.
   - All imports fixed across the codebase for moved shared components.
</prior_task_summary>

<context>
Critical Domain logic for "User" and "Authentication" currently lives in the legacy root `src/domain/models/user.ts` and `src/domain/usecases`. This must be moved to `src/modules/identity` to encapsulate the Identity Bounded Context.
</context>

<scope>
1. **Domain Layer Migration** (`src/modules/identity/domain`):
   - Move `User` Entity and `ValueObjects` (Email, Password) from `src/domain` to `src/modules/identity/domain`.
   - **Refactor Check**: Ensure these are pure TS classes/types. No React imports.

2. **Application Layer Migration** (`src/modules/identity/application`):
   - Move User/Auth related Use Cases or Services to `src/modules/identity/application`.
   - **Refactor**: Define `Interfaces` (Ports) for any infrastructure needed (e.g., `IAuthRepository`).
   - Use `shared` DTOs/Errors.

3. **Infra Layer Migration** (`src/modules/identity/infra`):
   - Move API repositories/mappers to `src/modules/identity/infra`.
   - **Strict Rule**: These MUST implement the interfaces defined in `application`.
   - Uses `shared/infra/HttpClient` (wrapper), NOT axios directly.

4. **Presentation Layer Migration** (`src/modules/identity/presentation`):
   - Verify `LoginPage`, `UserList`, etc. are in `src/modules/identity/presentation`.
   - Update their imports to point to the new local locations.

5. **Test Migration (Mandatory)**:
   - Move related tests from `src/...` to `tests/modules/identity/...`, mirroring the new structure.
   - Example: `src/modules/identity/domain/user.ts` -> `tests/modules/identity/domain/user.spec.ts`.

6. **Exposing Public API**:
   - Define `src/modules/identity/public-api.ts` for external modules to use.
   - *Constraint*: Only expose what is absolutely necessary (e.g., `User` entity, `useAuth` hook). Do not expose internal infra details.
</scope>

<technical_constraints>
- **Test Location**: STRICT enforcement of `tests/` root folder rule (Standard 11).
- **Dependency Inversion**: Infra depends on Application. Application depends on Domain. Presentation depends on Application.
- **State Management**: If `Zustand` is used for Auth, it belongs in `application` (orchestration) or `infra` (persistence), but exposed via a stable hook in `application` boundary.
- **DTOs**: Presentation/React components should receive DTOs or Read-Models, ensuring they don't operate on raw infra responses.
</technical_constraints>

<requirements>
- **Stack**: TypeScript, React.
- **Breaking Changes**: Heavy impact on imports.
- **Constraint**: `identity` MUST NOT import from `src/domain` anymore. It must be self-contained (depending only on `shared`).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Codebase: `src/domain/models/user.ts` does not exist (moved).
- [x] Codebase: `src/modules/identity` is population with `domain`, `application`, `infra`, `presentation`.
- [ ] Tests: Relevant tests are MOVED to `tests/modules/identity/`.
- [x] Architecture: `dependency-cruiser` shows `identity` does NOT depend on `src/domain`.
- [x] Architecture: `infra` repositories implement `application` interfaces.
- [x] Feature: User Login and Profile functionalities work as before (regression tested).
</acceptance_criteria>

<output>
1. **Summary**: Verified that the Identity context was already fully migrated to the `src/modules/identity` module, following the 4 Clean Architecture layers.
2. **Implementation Details**:
   - **Domain Layer**: Confirmed existence of `User` entity using Value Objects (Name, Email, Cpf, etc.) and pure domain errors.
   - **Application Layer**: Verified `IdentityRepository` interface and its usage via custom hooks and Zustand store.
   - **Infra Layer**: Confirmed `HttpIdentityRepository` correctly implements the application protocol and uses the shared `HttpClient` wrapper.
   - **Presentation Layer**: Verified `LoginPage` and `UserListPage` are correctly integrated with the new module structure and routes.
3. **Verification**:
   - `dependency-cruiser` confirmed the module is strictly self-contained with no forbidden imports from legacy roots.
   - Manual verification confirmed Login and User List flows are functional.
4. **Manual Test Guide**: Login and navigate to a protected route (e.g., `/users`).

</output>
