# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) / SOFTWARE ARCHITECT (ARC).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_027_frontend_router_adapter.md`.
# </role>

<dependent_tasks>
- [STORY_025: Frontend Refactor](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/stories/story_025_frontend_refactor.md)
</dependent_tasks>

<context>
The frontend components (e.g., `Login.tsx`) are currently tightly coupled to `react-router-dom` using hooks like `useNavigate` and components like `Link` directly. This makes the domain/presentation logic dependent on a specific routing library, hindering migration to other frameworks (Next.js, React Native) or updates to the new React Router APIs.
</context>

<scope>
1.  **Create Router Abstraction**:
    - [ ] Define a `Router` interface or Hook contract (e.g., `useAppNavigation`) in `src/presentation/protocols` (or `src/shared/protocols` if appropriate).
    - [ ] Interface should include common methods: `navigate(path: string)`, `goBack()`, etc.
2.  **Implement Adapter**:
    - [ ] Create `ReactRouterAdapter` (or `useReactRouterAdapter` hook) in `src/main/adapters` or `src/infra/router`.
    - [ ] This adapter will wrap `react-router-dom`'s `useNavigate`.
3.  **Refactor Components**:
    - [ ] Replace `useNavigate` in `Login.tsx` and other pages with the new `useAppNavigation` abstraction.
    - [ ] Replace `Link` components with a wrapped `AppLink` component (optional/advanced) if deemed necessary for "Enterprise" level.
</scope>

<requirements>
- **Abstraction**: Components should not import `react-router-dom`.
- **Adaptability**: The implementation details of routing are hidden behind the adapter.
</requirements>

<acceptance_criteria>
- [ ] `src/presentation/protocols/router.ts` (or similar) interface exists.
- [ ] `useAppNavigation` hook is used in `Login.tsx` effectively replacing `useNavigate`.
- [ ] Routing functionality remains unchanged.
</acceptance_criteria>

<output>
- **New Adapter**: `src/infra/router/react-router-adapter.ts` (or hook in main/adapters).
- **Refactored Code**: Components using the abstraction.
</output>
