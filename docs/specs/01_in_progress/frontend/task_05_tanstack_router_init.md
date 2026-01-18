# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_05_tanstack_router_init.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_01_init_structure_lint.md`
</dependent_tasks>

<context>
- We are migrating to **TanStack Router** to enable 100% Type-Safe routing.
- We will use **Code-Based Routing** (or Manual Route Definitions) to map strictly to our Modular Monolith structure (`src/modules/*`).
- *Note: File-based routing is powerful but often assumes a flat `routes/` directory which conflicts with our strict `modules/` encapsulation.*
</context>

<scope>
Initialize the Routing Engine.

1. **Dependencies**:
    - Install `@tanstack/react-router`.
    - Install `@tanstack/router-devtools`.

2. **Router Setup**:
    - Create `src/main/router/router.tsx` to export the `router` instance.
    - Create `src/main/router/root-route.tsx`:
        - Define the `rootRoute`.
        - Add `<Outlet />`.
        - Add `<TanStackRouterDevtools />` (conditional for dev).
        - Add `<NotFound />` component fallback.
    - **Type Safety**: Register the router instance for TypeScript module augmentation:
        ```typescript
        declare module '@tanstack/react-router' {
          interface Register {
            router: typeof router
          }
        }
        ```

3. **Public Interface**:
    - Export `Link`, `useNavigate`, `useParams` from `@tanstack/react-router` re-exported via `src/shared/infra/router/index.ts`?
    - *Decision*: Better to import directly from `@tanstack/react-router` usually, but for "Shared Kernel" abstraction, we might wrap it. **Architect Ruling**: Use direct imports for now to minimal friction, strict typing relies on the library's exports.

</scope>

<requirements>
- **Stack**: TanStack Router, TypeScript.
- **Negative Constraints**: Do NOT define all application routes here. Only the Shell/Root. The modules will provide their own route branches.
- **Files**:
    - `src/main/router/*`
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Router instance is created.
- [ ] Root Route with Layout (Outlet) is defined.
- [ ] TypeScript Module Augmentation is present (allowing `Link` to be typed later).
- [ ] DevTools are integrated.
</acceptance_criteria>

<output>
1. **Summary**: Initialized the Type-Safe Routing Engine.
2. **Decisions**: Code-based routing selected to support Modular Architecture (Modules export route objects, Main composes them).
3. **Manual Test Guide**: Inspect `router` object in console.
</output>
