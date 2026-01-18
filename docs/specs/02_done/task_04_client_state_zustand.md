# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_04_client_state_zustand.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_01_init_structure_lint.md`
</dependent_tasks>

<context>
- **Task 01 Summary**: Established Modular Monolith skeleton and architectural boundaries.
- **Task 02 Summary**: Implemented UI Foundation with Tailwind and polymorphic Button primitive.
- **Task 03 Summary**: Implemented Server State Infra (Axios Adapter as Class, TanStack Query). Established rule for mandatory Adapters for 3rd party libs and Test Mirroring.
- We need a solution for **Global Client State** (UI State, Session Tokens, User Preferences).
- **Zustand** is chosen for its simplicity and atomic updates (ADR-015).
- We must avoid "Polluting" the store with Server Data (use Query for that).
</context>

<scope>
Establish the Global Store.

1. **Store Implementation**:
    - Install `zustand`.
    - Create `src/shared/store/use-app-store.ts`.
    - **Modules (Slices)**:
        - `theme`: 'light' | 'dark' | 'system'. Actions: `setTheme`.
        - `sidebar`: `isOpen: boolean`. Actions: `toggleSidebar`.
        - `session`: `token: string | null`, `user: { id, name } | null`. Actions: `sestSession`, `clearSession`.
            - *Note: Keeping session in Zustand + Persist is cleaner than raw LocalStorage calls distributed everywhere.*

2. **Persistence**:
    - Use `persist` middleware from Zustand.
    - Persist `theme` and `session` to `localStorage`.
    - Do NOT persist `sidebar` (optional, but usually better to reset on reload).

3. **DevTools**:
    - Wrap with `devtools` middleware for debugging.

4. **Standards Enforcement**:
    - **Adapter Pattern**: Wrap `zustand` to ensure it is easily replaceable and contained within Infra/Shared.
    - **Test Location**: Tests must be created in `app/frontend/tests/shared/store/` mirroring the implementation path.
</scope>

<requirements>
- **Stack**: Zustand, TypeScript
- **Negative Constraints**:
    - Do NOT put deeply nested objects if possible. Keep state flat.
    - Do NOT use Redux-style reducers unless necessary. Use simple actions.
- **Files**:
    - `src/shared/store/*`
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `useAppStore` hook is exported.
- [x] Can set and retrieve `theme`.
- [x] Session token persists after page reload (Simulate with console).
- [x] TypeScript types for the Store are comprehensive.
- [x] Tests mirror the source path in `app/frontend/tests/`.
- [x] 3rd party lib usage is wrapped by an Adapter.
</acceptance_criteria>

<output>
1. **Summary**: Configured Global Client Store with Persistence.
2. **Decisions**: Included Session in Store to act as the "Source of Truth" for Auth status.
3. **Manual Test Guide**: `useAppStore.getState().setTheme('dark')` in console and check LocalStorage.
</output>
