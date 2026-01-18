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
- [ ] `LocationsListPage` component exists (Placeholder).
- [ ] `geographyRoute` is defined and includes `/locations` path.
- [ ] Public API exports the route object.
</acceptance_criteria>

<output>
1. **Summary**: Created the Geography Bounded Context skeleton.
2. **Decisions**: N/A
3. **Manual Test Guide**: N/A
</output>
