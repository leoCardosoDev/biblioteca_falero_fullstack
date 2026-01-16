# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) / SOFTWARE ARCHITECT (ARC).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_frontend_clean_boundaries.md`.
# </role>

<dependent_tasks>
- [STORY_025: Frontend Refactor](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/stories/story_025_frontend_refactor.md)
</dependent_tasks>

<context>
Currently, React components (e.g., `Login.tsx`) mix "View" responsibilities (JSX, Tailwind classes) with "Controller" responsibilities (Form state handling, UseCase execution, Navigation logic). To achieve "Enterprise/Sankhya" level decoupling, these responsibilities must be strictly separated. This allows the View to be "dumb" (pure rendering) and the Controller to handle all logic and orchestration.
</context>

<scope>
1.  **Define Pattern**:
    - [ ] Adopt a strict Container/Presenter (or Controller/View) pattern.
    - [ ] **Controller (Container/Hook)**: Handles `useAuth`, `useForm`, navigation, and error state. Returns plain props to the View.
    - [ ] **View (Presenter)**: Receives logic via props (`onSubmit`, `isLoading`, `errors`). Contains ONLY JSX and Styles.
2.  **Refactor Login Component**:
    - [ ] Split `Login.tsx` into `LoginController.tsx` (logic) and `LoginView.tsx` (UI).
    - [ ] Ensure `LoginView` has ZERO dependencies on application logic hooks, only receiving data/callbacks via props.
3.  **Apply to other major components**:
    - [ ] Identify other "smart" components and apply the same pattern.
</scope>

<requirements>
- **Strict Separation**: View components must be reusable and unaware of the infrastructure/application state management.
- **Testability**: View components can be tested with Storybook/unit tests purely by passing props. Controllers can be tested for logic without rendering complex UI.
</requirements>

<acceptance_criteria>
- [ ] `Login.tsx` logic extracted to a controller/hook layer.
- [ ] `LoginView` imports NO application hooks (`useAuth`, etc.), only UI components and React basics.
- [ ] Functional equivalence is maintained.
</acceptance_criteria>

<output>
- **Refactored Components**: Split into Logic and View.
- **Proof of Decoupling**: View can be rendered with mock props without a Provider.
</output>
