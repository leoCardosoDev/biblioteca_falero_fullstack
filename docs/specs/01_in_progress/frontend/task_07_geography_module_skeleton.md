# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_07_geography_module_skeleton.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_01_init_structure_lint.md`
- `task_05_tanstack_router_init.md`
</dependent_tasks>

<context>
- **Task 01 Summary**: Established Modular Monolith skeleton and architectural boundaries.
- **Task 02 Summary**: Implemented UI Foundation with Tailwind and polymorphic Button primitive.
- **Task 03 Summary**: Implemented Server State Infra (Axios Adapter as Class, TanStack Query). Established rule for mandatory Adapters for 3rd party libs and Test Mirroring.
- **Task 04 Summary**: Configured Global Client Store with Zustand using the Slices and Adapter patterns. Implemented theme, sidebar, and persistent session state with 100% test coverage.
- **Task 05 Summary**: Initialized the Type-Safe Routing Engine with TanStack Router.
- **Task 06 Summary**: Established Identity Module skeleton with factory-based routing to respect architectural boundaries.
- **Geography Context**: Handles Cities, States, Locations.
- Similar structure to Identity.
</context>

<scope>
Establish the Geography Module Skeleton.

1. **Folder Structure**:
    - Ensure `src/modules/geography/` exists with:
        - `domain/`, `application/`, `infra/`, `presentation/`, `public/`.

2. **Route Definition**:
    - Create `src/modules/geography/presentation/routes.ts`.
    - Define `geographyRoute` (parent) and `locationsRoute` (child - list of locations).
    - **Page Components**: Create `src/modules/geography/presentation/pages/LocationsListPage.tsx` (Placeholder).

3. **Public API**:
    - In `src/modules/geography/public/index.ts`:
        - Export `geographyRoute`.

</scope>

<requirements>
- **Stack**: React, TanStack Router.
- **Negative Constraints**: N/A.
- **Files**:
    - `src/modules/geography/**/*`
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `LocationsListPage` component exists (Placeholder).
- [x] `geographyRoute` is defined and includes `/locations` path.
- [x] Public API exports the route object.
</acceptance_criteria>

<output>
1. **Summary**: Created the Geography Bounded Context skeleton using a factory pattern for routes to preserve architectural boundaries and module encapsulation, mirroring the Identity module.
2. **Decisions**: Used `createGeographyRoutes(parentRoute)` factory to avoid `Geography -> Main` dependency violation.
3. **Manual Test Guide**: N/A (Will be visible once Main integrates it in Task 08).
</output>
