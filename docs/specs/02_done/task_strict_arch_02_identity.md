# STATUS: COMPLETED
# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_01_shared.md`
</dependent_tasks>

<context>
The `Identity` module was migrated to the folder structure but still violates strict dependency rules. Application services/hooks likely import `zustand` or `react-query` directly.

**Update from Task 1 (Shared foundation completed)**:
- `react-router-dom` has been completely uninstalled and replaced by `TanStack Router`.
- `shared/application` is now pure; `axios` is encapsulated in `shared/infra`.
- Legacy routing code and unused app factories have been removed.
</context>

<scope>
1.  **Application Layer Refactoring** (`src/modules/identity/application`):
    *   **Define Protocols**: Create `IdentityRepository` (or `AuthRepository`) interface defining methods like `login`, `logout`, `getUser`.
    *   **Pure UseCases**: Create classes/functions `LoginUseCase`, `LogoutUseCase` that depend ONLY on `IdentityRepository`.
    *   **Remove Libs**: Remove ALL imports of `zustand`, `@tanstack/react-query` from this layer.

2.  **Infra Layer Implementations** (`src/modules/identity/infra`):
    *   **Repository Impl**: Implement `HttpIdentityRepository` using `shared/infra/HttpClient`.
    *   **State Adapter**: If `useAuthStore` (Zustand) exists, move the *store creation* to `infra/store/authStore.ts`.
    *   **Query Adapter**: Create custom hooks in `infra/adapters` (e.g., `useLoginMutation`) that wrap `useMutation` and call the `LoginUseCase`.

3.  **Presentation Layer Updates**:
    *   Update components (`LoginPage`) to import from `infra/adapters` (or a facade exported from `application` that delegates to infra, depending on strictness). *Per PRD: "Update View to use Adapter".*
    *   Ensure no direct `useMutation` usage in components.

4.  **Routing**:
    *   Ensure strict usage of `TanStack Router` for redirects/links.
</scope>

<requirements>
- **Stack**: TypeScript, React.
- **Negative Constraints**:
    *   Application layer: NO `zustand`, `react-query`, `axios`, `react-router-dom`.

<technical_constraints>
1.  **Interface Naming**: Interfaces in `application/protocols` MUST NOT use the `I` prefix (e.g., `IdentityRepository` not `IIdentityRepository`).
2.  **UseCase Purity**: UseCases must be pure functions or classes with NO side effects (API calls, Storage) except via injected interfaces.
3.  **Infra Adapters**: React Hooks (`useLoginMutation`) belong in `infra/adapters` and should act as the Composition Root for the UseCase.
</technical_constraints>
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Architecture: `identity/application` contains NO infrastructure imports.
- [x] Implementation: `useAuthStore` implementation is in `infra`.
- [x] Implementation: `useLogin` logic is split into `LoginUseCase` (Pure App) and `useLoginMutation` (Infra Adapter).
- [x] Tests: Unit tests for `LoginUseCase` run without any React/Query providers.
</acceptance_criteria>

<output>
1. **Summary**: Identity module strictly decoupled and aligned with Modular Monolith standards.
2. **Decisions**:
   - Application layer stripped of `zustand` and `react-query`.
   - `IdentityRepository` interface (no `I` prefix) established in `application/protocols`.
   - `HttpIdentityRepository` implemented in `infra/http`.
   - `useAuthStore` moved to `infra/store`.
   - `createIdentityHooks` factory moved to `infra/adapters`.
3. **Manual Test Guide**: Run `npm run build` and `npm test` for LoginUseCase. Verify Login flow in the browser.
</output>
