# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<role>
You are a Senior Frontend Engineer responsible for migrating the critical Identity Refactoring.
</role>

<dependent_tasks>
- `app/docs/specs/02_done/task_06_identity_module_skeleton.md` (Skeleton created)
- `app/docs/specs/02_done/task_08_main_entry_migration.md` (Router ready)
</dependent_tasks>

<context>
The `Identity` module skeleton exists at `src/modules/identity`.
However, the actual business logic (User entity, Auth UseCases) and UI (Login Page, User List) still reside in the legacy folders:
- `src/domain/user`
- `src/application/user`
- `src/infra/user`
- `src/presentation/views/Login`
- `src/presentation/views/User`

The application allows users to Login and Manage Users.
</context>

<scope>
Migrate all Identity-related code to `src/modules/identity` and refactor to use the new stack.

1.  **Domain Layer** (`src/modules/identity/domain`):
    - Move `User` entity and Value Objects (Email, Password, etc.).
    - Ensure strict isolation (no imports from outside module except shared-kernel).

2.  **Infra Layer** (`src/modules/identity/infra`):
    - Create `HttpIdentityRepository` implementing `IdentityRepository` (if interface exists) or defining it.
    - **Mocking**: Maintain existing mocks or implement temporary mocks in the Repository if the backend endpoint is not ready, to ensure the UI remains testable and viewable.
    - Use new `AxiosAdapter` (from `shared/infra`).
    - Remove old manual Axios calls.

3.  **Application Layer** (`src/modules/identity/application`):
    - **Refactor**: Replace `UserContext` and `useAuth` hook (if using Context API) with **Zustand** store (`useAuthStore`).
    - **Refactor**: Replace `useEffect` data fetching with **TanStack Query** hooks (`useLogin`, `useUsers`, `useCreateUser`, etc.).
    - Move UseCases if they contain complex logic; otherwise, simplify into Query/Mutation hooks.

4.  **Presentation Layer** (`src/modules/identity/presentation`):
    - Move `LoginPage`, `UserListPage`, `UserForm`.
    - Update them to use the new Hooks and Store.
    - Connect to the Route Factory defined in Task 06.

5.  **Tests**:
    - Move all related tests to `tests/frontend/identity/`.
    - Ensure they pass.
</scope>

<requirements>
- **Stack**: React, TypeScript, TanStack Query, Zustand, Tailwind CSS.
- **Negative Constraints**:
    - NO usage of `React.Context` for server state or auth state.
    - NO direct `axios` imports in components.
    - NO dependency cycles.
</requirements>

<architectural_guidance>
> **Refactoring Engine**: Apply detailed patterns from `app/docs/prompts/refactor.md` and `.agent/standards/STANDARD_REFACTORING.md`.

### 1. Detectable Smells & Actions
- **Feature Envy**: If `UserContext` or legacy controllers access `User` fields repeatedly to determine logic (e.g., `user.role === 'ADMIN'`), **MOVE METHOD** to the `User` Domain Entity (e.g., `user.isAdmin()`, `user.canEdit()`).
- **Large Class**: If the legacy `UserContext` handles Auth, User Profile, and Permissions, **EXTRACT CLASS** (or Store Slices). Split into `AuthStore` (Session) and `UserStore` (Data).
- **Duplicated Logic**: If form validation appears in multiple components, **EXTRACT METHOD** into a Validator generic or Domain Value Object (e.g., `Password.create(value)` handles validation).

### 2. Mandatory Patterns
- **Repository Pattern**: `HttpIdentityRepository` must return Domain Entities, not raw API responses. Use Mappers.
- **Adapter Pattern**: Use `AxiosAdapter` exclusively. Do not leak Axios types to the Application layer.
</architectural_guidance>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`
- `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Codebase: Logic moved to `src/modules/identity`.
- [ ] Codebase: `src/domain/user` and related legacy folders are empty/deleted.
- [ ] Feature: Login works (token stored, redirect occurs).
- [ ] Feature: User List loads using TanStack Query.
- [ ] Test: All Identity tests pass in `tests/frontend/identity`.
- [ ] Lint: No boundary violations in `src/modules/identity`.
</acceptance_criteria>
