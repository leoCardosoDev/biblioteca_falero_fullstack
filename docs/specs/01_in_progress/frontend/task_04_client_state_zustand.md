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
- [ ] `useAppStore` hook is exported.
- [ ] Can set and retrieve `theme`.
- [ ] Session token persists after page reload (Simulate with console).
- [ ] TypeScript types for the Store are comprehensive.
</acceptance_criteria>

<output>
1. **Summary**: Configured Global Client Store with Persistence.
2. **Decisions**: Included Session in Store to act as the "Source of Truth" for Auth status.
3. **Manual Test Guide**: `useAppStore.getState().setTheme('dark')` in console and check LocalStorage.
</output>
