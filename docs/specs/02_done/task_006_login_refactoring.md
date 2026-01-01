# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/task_006_login_refactoring.md`.
# </role>

<role>
Product & Domain Analyst responsible for defining the refactoring requirements for the Login module to ensure it strictly follows the `STANDARD_FRONTEND.md` architectural layers.
</role>

<dependent_tasks>
- [ADR 001: Login Architecture](../adr/001_login_architecture.md)
</dependent_tasks>

<context>
- Current login implementation lacks an `application/` layer.
- The `Infrastructure` layer (`HttpAuthentication`) directly implements the `Domain` interface.
- Folder structure is inconsistent with `STANDARD_FRONTEND.md` (e.g., `pages/` and `components/` are outside `presentation/`).
- Logic such as `localStorage` management is leaked into the `Presentation` layer (`useAuth`).
</context>

<scope>
Refactor the Login module to align with the standard architecture:

1. **Domain Layer** (`src/domain`):
    - Keep `models/account-model.ts` and `usecases/authentication.ts`.
    - Create `contracts/authentication-repository.ts` for the repository interface.

2. **Application Layer** (`src/application`):
    - [NEW] `usecases/remote-authentication.ts`: Orchestrates the authentication process, using the repository and managing side effects like token storage (via a storage contract).

3. **Infrastructure Layer** (`src/infra`):
    - [RENAME/REFACTOR] `http/http-authentication-repository.ts`: Implementation of the raw API call.
    - [NEW] `cache/local-storage-adapter.ts`: Implementation of the storage contract.

4. **Presentation Layer** (`src/presentation`):
    - [MOVE] Move all pages from `src/pages/login` to `src/presentation/pages/login`.
    - [MOVE] Move all related components to `src/presentation/components`.
    - [REFACTOR] `hooks/use-auth.ts`: Remove `localStorage` and `navigation` logic, focus only on UI state and calling the UseCase.

6. **Refactoring Standards**:
    - [REFACTOR] Update all imports to use path aliases (`@/`) instead of relative paths (`../../`).
    - [NEW] Implement `index.ts` (Barrel Export) in every directory containing more than one file.
    - [REFACTOR] Consolidate imports using the new barrel exports (e.g., `import { A, B } from '@/domain/errors'`).
</scope>

<requirements>
- **Stack**: Same as project defaults (React, TS, Vitest).
- **Negative Constraints**: 
    - No changes to the Backend API.
    - No changes to the existing UI behavior (only internal structure).
- **Standards**: Strictly follow `STANDARD_FRONTEND.md`.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Architecture: `src/application` exists and contains the orchestration logic.
- [ ] Architecture: `src/infra` contains only driver-level code (HTTP/Persistence).
- [ ] Architecture: `src/presentation` contains all UI-related files (pages, components, hooks).
- [ ] Logic: `localStorage` is handled through a contract implementation, not directly in hooks.
- [ ] Tests: `RemoteAuthentication` has 100% unit test coverage with mocked dependencies.
- [ ] Integration: Login continues to work end-to-end as before.
</acceptance_criteria>

<output>
1. **Summary**: Refactored login module to a 5-layer Clean Architecture.
2. **Decisions**: 
    - Introduced `AuthenticationRepository` to isolate API implementation details.
    - Centralized side-effects (token storage) in the Application layer to keep hooks pure.
3. **Manual Test Guide**: 
    - Run the application.
    - Perform a successful login.
    - Verify token is still saved in `localStorage`.
    - Verify redirection to home page.
</output>
