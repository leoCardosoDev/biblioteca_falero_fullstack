# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<meta>
- **PRD Name**: Frontend Refactor & Modernization
- **Owner**: Tech Lead
- **Status**: Draft
- **Version**: 1.0
- **Created At**: 2026-01-17
- **Last Updated**: 2026-01-17
</meta>

<related_specs>
- `app/docs/specs/01_in_progress/frontend/refactor/01_config.md`
- `app/docs/technical_records/TECH_STACK_MODERNIZATION.md`
</related_specs>

<context>
The current frontend (React + Vite) uses a Layered Architecture. While clean, it struggles to scale with the backend's Modular Monolith structure. Business logic is often leaking into components or generic hooks, and the lack of strict module boundaries prevents "Screaming Architecture".
</context>

<problem>
1.  **Implicit Boundaries**: It is too easy to import undefined dependencies between features (e.g., Identity importing Geography internals).
2.  **State Management Complexity**: Mixing server state (API) and client state in Context/Effects leads to bugs and race conditions.
3.  **Routing Fragility**: String-based routing in React Router DOM makes refactoring dangerous (broken links).
4.  **Developer Experience**: Lack of standard patterns for data fetching results in boilerplate and inconsistent error handling.
</problem>

<objectives>
- **Primary Objective**: Transition the frontend to a **Modular Monolith** architecture that strictly mirrors the Backend's Bounded Contexts.
- **Secondary Objective**: Modernize the stack (TanStack Router, Query, Zustand) to enforce type safety and eliminate boilerplate.
</objectives>

<success_metrics>
- **Type Safety**: 100% of Routes and Search Params are typed.
- **Build Time**: `< 2min` cold build.
- **Lighthouse**: Accessibility & Performance scores `> 90`.
- **Test Coverage**: Maintain `> 80%` coverage during refactor.
</success_metrics>

<users>
- **Developers**: Primary users of the architecture. Need clear boundaries and type safety.
- **End Users**: Benefit from faster navigation (optimistic UI) and fewer bugs.
</users>

<scope>
### In Scope
- **Architecture**: Migration to `src/modules/{context}` structure.
- **Routing**: Migration from React Router DOM to **TanStack Router**.
- **State**: Migration to **TanStack Query** (Server) and **Zustand** (Client).
- **Styling**: **Tailwind CSS** + **Radix UI** primitives.
- **Testing**: **Playwright** for E2E flows.

### Out of Scope
- backend API changes (Strictly frontend refactor).
- "Offline First" with sync engines (e.g. ElectricSQL) - Postponed.
</scope>

<functional_requirements>
1.  **Modular Structure**: The system MUST implement `src/modules/identity`, `src/modules/geography`, etc.
2.  **Strict Boundaries**: Modules MUST NOT import each other's internals (enforced by lint).
3.  **Type-Safe Navigation**: All internal links MUST be type-checked.
4.  **Optimistic UI**: The system MUST support optimistic updates for common actions (Vote, Edit).
</functional_requirements>

<non_functional_requirements>
- **Performance**: Route transitions MUST occur in `< 200ms` (using preload/prefetch).
- **Observability**: All API errors MUST be logged to the monitoring service (mocked for now).
- **Maintainability**: No "God Components".
</non_functional_requirements>

<user_flows>
- **Primary Flow (Dev)**: Developer adds a new feature in `src/modules/X`, defines a route in `route.ts`, and it is automatically fully typed.
- **Primary Flow (User)**: User navigates between modules without full page reloads, preserving state in URL.
</user_flows>

<ux_guidelines>
- **Loading**: Use Suspense boundaries with Skeleton UIs.
- **Errors**: Use Error Boundaries for graceful degradation (Module crashing doesn't kill App).
</ux_guidelines>

<dependencies>
- Backend API consistency (Module boundaries must align).
</dependencies>

<risks>
- **Route Migration**: Breaking existing deep links during router migration.
    - *Mitigation*: Comprehensive E2E tests with Playwright before switch.
- **Learning Curve**: Team adapting to TanStack Router concepts.
</risks>

<assumptions>
- The backend API is stable enough to support generated types (OpenAPI integration in future, manual for now).
</assumptions>

<acceptance_criteria>
- Given a new module "X", When added to `src/modules`, Then it is isolated and can only communicate via its Public API.
- Given a build command, When run, Then it enforces strict boundary rules.
</acceptance_criteria>

<open_questions>
- Should we use TanStack Router's file-based routing or code-based? (Decision: Code-based for cleaner module encapsulation).
</open_questions>

<standards_compliance>
- `workflow/standards/STANDARD_GENERAL.md`
- `workflow/standards/STANDARD_FRONTEND.md` (Will need updates for new stack)
</standards_compliance>

<handoff_notes>
- This PRD initiates the creation of updated `STANDARD_FRONTEND.md` and new ADRs.
</handoff_notes>
