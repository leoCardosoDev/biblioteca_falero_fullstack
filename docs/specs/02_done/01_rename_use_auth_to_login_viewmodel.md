# Frontend Refactoring: Explicit Login ViewModel

<role>
Refactoring Architect specializing in Frontend Architecture and MVVM/Clean Architecture patterns.
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `useAuth` hook currently mixes User Interface logic (loading state, error state) with Authentication logic (calling the context/usecase).
The name `useAuth` is generic and hides the fact that it is acting as a View Model for the Login Page.
Ideally, the `LoginController` should use a `useLoginViewModel` that exposes strictly what the View needs.
</context>

<scope>
1.  **Frontend**:
    - Rename/Refactor `useAuth` (in `pages/login` scope) to `useLoginViewModel`.
    - Ensure it exposes `loginState` (loading, error) and `loginCommand` (submit).
    - Ensure it does not leak implementation details from `useAuthContext`.
    - Update `LoginController` to use `useLoginViewModel`.
</scope>

<requirements>
- **Stack**: React, TypeScript
- **Negative Constraints**: Do not move business logic into the View.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<api_specification>
N/A
</api_specification>

<acceptance_criteria>
- [ ] `useLoginViewModel` exists.
- [ ] `LoginController` depends on `useLoginViewModel`.
- [ ] `useAuth` is verified to only be used as a generic adapter if needed, or removed if redundant.
- [ ] Login screen behaves exactly as before.
</acceptance_criteria>

<output>
1.  **Summary**: Created explicit ViewModel for Login.
2.  **Decisions**: MVVM pattern for Separation of Concerns.
3.  **Manual Test Guide**: Log in via UI.
</output>
