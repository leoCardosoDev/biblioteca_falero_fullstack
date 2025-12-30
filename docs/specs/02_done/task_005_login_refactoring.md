# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_005_login_refactoring.md`.
# </role>

<role>
I am drafting the specification for refactoring the Frontend Login to adhere to the project's Clean Architecture, Design System, and Coding Standards.
</role>

<dependent_tasks>
- [ADR 001 - Login Architecture](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/adr/001_login_architecture.md)
- [Design System Documentation](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/design_system/DESIGN_SYSTEM.md)
</dependent_tasks>

<context>
- **Current State**: A visual mockup exists in `app/frontend/src/pages/Login.tsx` using raw HTML and inline CSS.
- **Architectural Debt**: No clear separation between layers (Domain, Infra, Presentation, Main).
- **Standards Debt**: Tests are missing or not correctly located in `/tests`.
</context>

<scope>
Detailed refactoring of the Frontend Login feature.

1. **Domain Layer**:
   - [NEW] Create `app/frontend/src/domain/usecases/authentication.ts` (Interface).
   - [NEW] Create `app/frontend/src/domain/models/account-model.ts` (Type).
2. **Infrastructure Layer**:
   - [NEW] Create `app/frontend/src/infra/http/http-authentication.ts` (Implementation of `Authentication` using Axios).
3. **Presentation Layer**:
   - [MODIFY] `app/frontend/src/pages/Login.tsx`: Refactor to use Design System components and break down into smaller components (e.g., `LoginForm`, `LoginBanner`).
   - [NEW] Create `app/frontend/src/presentation/hooks/use-auth.ts` to manage authentication state and form logic with **real-time validation** (mode: `onChange`).
   - [NEW] Implement **Route Protection**: Create a `PrivateRoute` component or equivalent guard to protect the Dashboard.
4. **Main Layer (Composite Root)**:
   - [NEW] Create `app/frontend/src/main/factories/pages/login/login-factory.tsx` to handle dependency injection.
   - [NEW] Create `app/frontend/src/main/factories/usecases/authentication-factory.ts`.
5. **Testing**:
   - [NEW] Create `app/frontend/tests/presentation/pages/login.spec.tsx`.
   - [NEW] Create `app/frontend/tests/infra/http/http-authentication.spec.ts`.
</scope>

<requirements>
- **Stack**: React (Vite), TypeScript, TailwindCSS, Axios, React Hook Form, Zod, Vitest.
- **Specific requirements**:
  - **Real-time Validation**: Form must validate as the user types.
  - **Navigation**: Successful login must **redirect to Dashboard**.
  - **Security**: The Dashboard and other internal routes must be **protected** (unauthenticated users redirected to Login).
  - **Componentization**: Break `Login.tsx` into atomic/molecular components to improve reusability and readability.
- **Negative Constraints**: 
  - Do NOT use raw HTML `<input>` or `<button>` tags (use Design System components).
  - Do NOT put business logic (like API calling) inside the React Component.
  - Do NOT put tests inside the `src` folder (use `/tests`).
- **Standard Compliance**: 
  - [STANDARD_GENERAL.md](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/workflow/standards/STANDARD_GENERAL.md)
  - [STANDARD_FRONTEND.md](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/workflow/standards/STANDARD_FRONTEND.md)
</requirements>

<acceptance_criteria>
- [ ] **Architecture**: Separation of concerns between UI, Hook, Repository, and Factory is strictly followed as per ADR 001.
- [ ] **Design System**: Login page uses only components from the Design System.
- [ ] **Validation**: Errors are displayed in real-time as the user interacts with the form.
- [ ] **Redirection**: User is sent to `/` (Dashboard) immediately after successful authentication.
- [ ] **Route Guard**: Attempting to access `/` without being logged in redirects back to `/login`.
- [ ] **Componentization**: The Login page is composed of at least 2 sub-components (e.g., `LoginForm`, `LoginHeader`) to avoid a "god component".
- [ ] **TDD**: 100% test coverage for `HttpAuthentication` and integration tests for Login/Guard in `/tests`.
- [ ] **Clean Code**: Adheres to all naming and structure rules in `STANDARD_GENERAL.md`.
</acceptance_criteria>

<output>
1. **Summary**: Refactored the Frontend Login into a robust, testable, and standardized implementation following Clean Architecture, including route protection and real-time validation.
2. **Decisions**: 
   - Used `react-hook-form` mode `onChange` for immediate feedback.
   - Implemented a High-Order Component (HOC) or specialized Route Guard for protection.
3. **Manual Test Guide**: 
   - Open `/`. Verify redirect to `/login`.
   - Type an invalid email. Verify real-time error message.
   - Login with valid credentials. Verify redirect to `/`.
</output>
