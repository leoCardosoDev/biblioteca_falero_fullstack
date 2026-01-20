# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/prd/PRD_Strict_Architecture_Fixes.md`.
# This PRD is the source of truth for all downstream technical specs.
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Strict Architecture Fixes & Dependency Enforcement
- **Owner**: Architect Agent
- **Status**: draft
- **Version**: 1.0
- **Created At**: 2026-01-19
- **Last Updated**: 2026-01-19
</meta>

<related_specs>
- `app/docs/technical_records/TECH_STACK_MODERNIZATION.md`
- `app/docs/specs/01_in_progress/frontend/task_monolith_02_shared.md`
</related_specs>

<context>
The frontend refactoring initiative aims to transition the legacy codebase to a **Modular Monolith** with strict **Clean Architecture** boundaries.
An audit of the current state against `TECH_STACK_MODERNIZATION.md` revealed that while the structure is in place, the **strict decoupling rules** are being violated.
Specifically, the Application layer is heavily coupled to Infrastructure libraries (TanStack Query, Zustand), and the dependency migration is incomplete (legacy Router still present, Playwright missing).
</context>

<problem>
The current codebase violates the core architectural rule: **"The Application Layer must not know about Infrastructure."**
This manifests as:
1.  **Direct coupling:** Domain/Application logic imports `@tanstack/react-query` and `zustand` directly, making business logic hard to test without mocking complex libs and tying the system to specific vendors.
2.  **Incomplete Migration:** Legacy `react-router-dom` exists alongside `TanStack Router`, creating confusion and technical debt.
3.  **Missing Quality Tools:** `Playwright` is mandated but not installed.
4.  **Leaked Abstractions:** `axios` is used directly in factories without proper encapsulation via `HttpClient`.

These issues compromise the long-term maintainability and testability of the system, negating the benefits of the intended architecture.
</problem>

<objectives>
- **Primary Objective**: Enforce strict architectural boundaries by decoupling the Application layer from all Infrastructure concerns.
- **Secondary Objective**: Complete the technology stack migration by removing legacy dependencies and installing required testing tools.
</objectives>

<success_metrics>
- **North Star Metric**: 0 imports of `zustand`, `@tanstack/react-query`, or `react-router-dom` within `src/modules/*/application` (except inside explicit Adapter definitions if any).
- **Supporting Metrics**:
    - Build succeeds with `react-router-dom` removed.
    - Application layer unit tests can run without `QueryClientProvider` wrappers.
    - `depcruise` passes with strict rules enabled.
- **Baseline**: High coupling in Identity, Library, Reports modules.
- **Target**: Pure TypeScript Application layer relying only on Protocols/Interfaces.
</success_metrics>

<users>
- **Developers**: Will benefit from a clear separation of concerns and easier testing.
- **Architects**: Will see the intended Modular Monolith design strictly implemented.
</users>

<scope>
### In Scope
- **Dependency Cleanup**: Remove `react-router-dom`, install `playwright`.
- **Infrastructure Abstraction**:
    - Extract `TanStack Query` usage from Application Services/Hooks into `Infra/Adapters`.
    - Extract `Zustand` store creation from Application into `Infra/Adapters`.
    - Ensure `axios` is hidden behind `HttpClient` Protocol.
- **Application Refactoring**:
    - Define `Protocols` (Interfaces) for data fetching and state management in `Application`.
    - Convert mixed Hooks into **Pure UseCases** (Application) + **Adapter Hooks** (Infra).
- **Affected Modules**: `Identity`, `Library`, `Reports`, `Geography`, `Shared`.

### Out of Scope
- Redesigning the UI/UX.
- Changing business logic behavior (refactoring should be behavior-preserving).
- Backend changes.
</scope>

<functional_requirements>
1.  **Application Layer Isolation**: The system must define all external dependencies (State, Network, Cache) as **Interfaces** in the Application layer.
2.  **Infrastructure Injection**: The system must provide implementations for these interfaces in the `Infra` layer and inject them via Composition Root or Adapters.
3.  **Routing Consistency**: The system must use ONLY `TanStack Router` for all navigation.
4.  **Testing Infrastructure**: The system must utilize `Playwright` for E2E testing as defined in the stack.
</functional_requirements>

<non_functional_requirements>
- **Maintainability**: Code must strictly follow the dependency rule: `Domain < Application < Infra`.
- **Testability**: Application logic must be testable with simple Mocks/Stubs, without rendering React components or setting up Providers.
- **Type Safety**: All Protocols and UseCases must be strictly typed.
</non_functional_requirements>

<user_flows>
- **Refactoring Flow (Dev)**:
    1. Identify coupled Hook (e.g., `useLoans`).
    2. Extract business logic -> `GetLoansUseCase` (Pure).
    3. Define Protocol -> `ILoanRepository`.
    4. Move React/Query logic -> `useGetLoansQuery` (Adapter in Infra calls UseCase).
    5. Update View to use Adapter.
</user_flows>

<ux_guidelines>
- **No changes to end-user UX.** This is a structural refactor.
</ux_guidelines>

<dependencies>
- **TanStack Router**: Must completely replace React Router.
- **TanStack Query**: Must be relegated to the Infrastructure layer.
- **Zustand**: Must be relegated to the Infrastructure layer.
</dependencies>

<risks>
- **Regression**: Breaking existing flows while swapping Router or State management.
    - *Mitigation*: Ensure existing tests pass before merging. Add E2E tests for critical paths.
- **Over-engineering**: Creating too much boilerplate for simple CRUD.
    - *Mitigation*: Use pragmatic abstractions. A simple `useQueryAdapter` that calls a UseCase is sufficient.
</risks>

<assumptions>
- The current `TanStack Router` implementation is sufficient to carry the full load of the removed `React Router DOM`.
- The team agrees that "Hooks that fetch data" are Infrastructure concerns, not Application logic.
</assumptions>

<acceptance_criteria>
- Given the `package.json`, When inspected, Then `react-router-dom` is absent and `playwright` is present.
- Given any file in `src/modules/*/application`, When checked for imports, Then it **DOES NOT** import from `@tanstack/*`, `zustand`, `axios`, or `react-router-dom`.
- Given the `Identity` module, When examining `useAuthStore`, Then the store implementation resides in `infra` and is exposed via an interface/adapter to the application (or invoked only by Presentation/Infra).
- Given the `Library` module, When examining `useLoans`, Then it is composed of a Pure UseCase (Application) and a Query Adapter (Infra).
</acceptance_criteria>

<open_questions>
- Should we strictly forbid *all* React hooks in Application, or allow custom hooks that *only* contain logic (no side-effects/libs)?
    - *Decision*: For now, forbid hooks that import Infra libs. Pure logic hooks are acceptable but UseCases are preferred for core logic.
</open_questions>

<standards_compliance>
- `workflow/standards/STANDARD_GENERAL.md`
- `architectural-rules/modular-monolith`
</standards_compliance>

<handoff_notes>
- **Task Specs Generation**: Create granular tasks for each module (`Identity`, `Library`, etc.) to apply these fixes.
- **Priority**: High. Stop bleeding architecture violations.
</handoff_notes>
