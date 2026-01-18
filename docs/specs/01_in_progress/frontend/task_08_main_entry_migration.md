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
- [ ] Application successfully builds.
- [ ] Navigating to `/login` renders the Identity Placeholder.
- [ ] Navigating to `/locations` renders the Geography Placeholder.
- [ ] 404 works for unknown routes.
- [ ] Providers are active (verify via DevTools).
</acceptance_criteria>

<output>
1. **Summary**: Integrated all Modules and Providers. System is Live.
2. **Decisions**: Main acts as the "Glue", preserving module independence.
3. **Manual Test Guide**: Run `npm run dev` and click through the routes.
</output>
