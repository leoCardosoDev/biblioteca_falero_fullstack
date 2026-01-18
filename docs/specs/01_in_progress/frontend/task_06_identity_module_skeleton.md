# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_06_identity_module_skeleton.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_01_init_structure_lint.md`
- `task_05_tanstack_router_init.md`
</dependent_tasks>

<context>
- **Identity Context**: Handles Authentication (Login) and User Management.
- Needs to be a self-contained module with its own Routing, State, and UI.
</context>

<scope>
Establish the Identity Module Skeleton.

1. **Folder Structure**:
    - Ensure `src/modules/identity/` exists with:
        - `domain/` (Entities, Types)
        - `application/` (Hooks/Services generic logic)
        - `infra/` (API calls specific to Identity)
        - `presentation/` (Components, Pages, Routes)
        - `public/` (Exports)

2. **Route Definition (The Contract)**:
    - Create `src/modules/identity/presentation/routes.ts`.
    - Define a `identityRoute` (parent) and `loginRoute` (child).
    - Use `createRoute` from `@tanstack/react-router`.
    - **Page Components**: Create a placeholder `src/modules/identity/presentation/pages/LoginPage.tsx` (Just "Hello Login").

3. **Public API**:
    - In `src/modules/identity/public/index.ts`:
        - Export `identityRoute` (so `main` can mount it).
        - Export any shared types (e.g., `User` interface if shared, though preferably shared via a Kernel if truly generic. For now, keep it local).

</scope>

<requirements>
- **Stack**: React, TanStack Router.
- **Negative Constraints**:
    - Do NOT implement the actual Login Form logic or API integration yet. Skeleton and Route wiring only.
- **Files**:
    - `src/modules/identity/**/*`
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `LoginPage` component exists (Placeholder).
- [ ] `identityRoute` is defined and includes `/login` path.
- [ ] Public API exports the route object.
- [ ] `npm run lint` passes (Boundaries respected).
</acceptance_criteria>

<output>
1. **Summary**: Created the Identity Bounded Context skeleton.
2. **Decisions**: Routes defined inside the module to maintain encapsulation.
3. **Manual Test Guide**: N/A (Will be visible once Main integrates it in Task 08).
</output>
