# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_08_main_entry_migration.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_03_infra_server_state.md`
- `task_05_tanstack_router_init.md`
- `task_06_identity_module_skeleton.md`
- `task_07_geography_module_skeleton.md`
</dependent_tasks>

<context>
- **Task 01 Summary**: Established Modular Monolith skeleton and architectural boundaries. Configured path aliases and strict ESLint boundaries.
- **Task 02 Summary**: Implemented UI Foundation with Tailwind and polymorphic Button primitive using CVA and Radix Slot.
- **Task 03 Summary**: Implemented Server State Infra (Axios Adapter as Class, TanStack Query). Established rule for mandatory Adapters for 3rd party libs and Test Mirroring.
- **Task 04 Summary**: Configured Global Client Store with Zustand using the Slices and Adapter patterns. Implemented theme, sidebar, and persistent session state with 100% test coverage.
- **Task 05 Summary**: Initialized the Type-Safe Routing Engine with TanStack Router using code-based routing.
- **Task 06 Summary**: Established Identity Module skeleton with factory-based routing to preserve architectural boundaries.
- **Task 07 Summary**: Established Geography Module skeleton with factory-based routing, mirroring the Identity module pattern.
- **Composition Root**: The entry point where everything wires together.
- We need to compose the Module Routes into the Main Router and wrap the App with Providers.
</context>

<scope>
Wire it all together.

1. **Route Composition**:
    - In `src/main/router/router.tsx`:
        - Import `identityRoute` from `@/modules/identity/public`.
        - Import `geographyRoute` from `@/modules/geography/public`.
        - Create the `routeTree` using `rootRoute.addChildren([identityRoute, geographyRoute])`.
        - Create the `router` instance with this tree.

2. **App Provider Composition**:
    - In `src/main/App.tsx` (or `Providers.tsx`):
        - Wrap with `QueryClientProvider` (from `@/shared/infra/query`).
        - Wrap with `RouterProvider` (pass the `router` instance).
        - (Optional) `ReactQueryDevtools` and `TanStackRouterDevtools` (if not already in root route).

3. **Entry Point**:
    - Ensure `src/main.tsx` renders `<App />`.

</scope>

<requirements>
- **Stack**: React, Query, Router.
- **Negative Constraints**: N/A.
- **Files**:
    - `src/main/**/*`
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Application successfully builds.
- [x] Navigating to `/login` renders the Identity Placeholder.
- [x] Navigating to `/locations` renders the Geography Placeholder.
- [x] 404 works for unknown routes.
- [x] Providers are active (verify via DevTools).
</acceptance_criteria>

<output>
1. **Summary**: Integrated all Modules and Providers. System is Live.
2. **Decisions**: Main acts as the "Glue", preserving module independence.
3. **Manual Test Guide**: Run `npm run dev` and click through the routes.
</output>
