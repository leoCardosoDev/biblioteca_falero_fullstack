@ROO # <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/task_005_user_management.md`.
# </role>

<role>
Product & Domain Analyst responsible for defining the requirements and contracts for the User Management frontend module, ensuring alignment with the backend architecture discovered through reverse engineering.
</role>

<dependent_tasks>
- [ADR 001: Login Architecture](../adr/001_login_architecture.md)
- [ADR 005: User Management](../adr/005_user_management.md)
</dependent_tasks>

<context>
- The backend for user management is already implemented and follows a Clean Architecture/DDD structure.
- Authentication and RBAC (Role-Based Access Control) are enforced on the backend.
- The frontend needs to implement the administration interfaces for creating, listing, updating, and deleting users, as well as setting up their login credentials.
- Existing endpoints: `POST /users`, `GET /users`, `PUT /users/:id`, `DELETE /users/:id`, `POST /users/:userId/login`.
</context>

<scope>
Detailed list of frontend implementation requirements following the standard architecture:

1. **Domain Layer** (`src/domain`):
    - `models/user-model.ts`: User data structure.
    - `usecases/add-user.ts`: Interface for creating users.
    - `usecases/load-users.ts`: Interface for listing users.
    - `usecases/update-user.ts`: Interface for updating users.
    - `usecases/delete-user.ts`: Interface for deleting users.
    - `usecases/add-user-login.ts`: Interface for adding credentials.
    - `contracts/user-repository.ts`: Interface for the user repository.

2. **Application Layer** (`src/application`):
    - `usecases/db-add-user.ts`: Implementation of user creation logic.
    - `usecases/db-load-users.ts`: Implementation of user listing logic.
    - `usecases/db-update-user.ts`: Implementation of user updating logic.
    - `usecases/db-delete-user.ts`: Implementation of user deletion logic.
    - `usecases/db-add-user-login.ts`: Implementation of credential setup logic.

3. **Infrastructure Layer** (`src/infra`):
    - `http/http-user-repository.ts`: Axios implementation for user CRUD (/users).
    - `http/http-user-login-repository.ts`: Axios implementation for /users/:userId/login.

4. **Presentation Layer** (`src/presentation`):
    - `pages/user-list/user-list-page.tsx`: Route view for user management.
    - `components/user-form/user-form.tsx`: Reusable form for creation/edition.
    - `components/credential-modal/credential-modal.tsx`: Modal for setting up login/password.
    - `hooks/use-user-management.ts`: Logic extraction for user operations and state.
    - `helpers/user-serializers.ts`: Formatters for user data display.

5. **Main Layer** (`src/main`):
    - `factories/pages/user-list/user-list-factory.tsx`: Composition root for the user list.
    - `routes/router.tsx`: Register the new administrative route.
</scope>

<requirements>
- **Stack**: React, TypeScript, Vitest, React Testing Library, Axios, Zod.
- **Negative Constraints**: 
    - Do not store user passwords in local storage at any point.
    - Do not use third-party UI libraries for table/form components (use the project's Design System).
    - Do not bypass RBAC checks on the frontend (even if backend enforces them).
- **Performance**: 
    - User list should render within 300ms for up to 100 users.
    - Form validation must be instantaneous (client-side).
</requirements>

<standards_compliance>
- **General**: [STANDARD_GENERAL.md](../../../workflow/standards/STANDARD_GENERAL.md)
- **Context: FRONTEND**: [STANDARD_FRONTEND.md](../../../workflow/standards/STANDARD_FRONTEND.md)
- [ADR 004: Validation Strategy](../adr/004_validation_strategy.md)
</standards_compliance>

<api_specification>
#### POST /users
**Request**:
```json
{
  "name": "string",
  "email": "string (email)",
  "rg": "string",
  "cpf": "string",
  "birthDate": "string (YYYY-MM-DD)",
  "address": {
    "street": "string",
    "number": "string",
    "complement": "string",
    "neighborhood": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string"
  }
}
```
**Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "admin | librarian | user"
}
```

#### POST /users/:userId/login
**Request**:
```json
{
  "username": "string (optional)",
  "password": "string (min 8 chars, complex)"
}
```
**Response (200 OK)**:
```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "string"
}
```
</api_specification>

<acceptance_criteria>
- [ ] Frontend: `UserListPage` correctly displays data from `GET /users`.
- [ ] Frontend: `UserForm` strictly validates CPF, Email, and BirthDate before submission.
- [ ] Frontend: Deletion triggers a confirmation modal before calling the API.
- [ ] Frontend: Successful user creation redirects or opens the Credential Modal.
- [ ] Integration: Authorization token is sent in all request headers.
- [ ] Tests: Repository, UseCases, and Hook have 100% test coverage.
</acceptance_criteria>

<output>
1. **Summary**: Implemented a comprehensive user management module including CRUD and credential setup.
2. **Decisions**: 
    - Decoupled Profile Creation from Credential Setup to follow the backend's two-step process.
    - Used a central `useUserManagement` hook to shared state between the list and modals.
3. **Manual Test Guide**: 
    - Login as Admin.
    - Navigate to `/users`.
    - Create a new user (check validation success/fail).
    - After creation, trigger the "Set Login" button and define a password.
    - Edit the user's name and verify update.
    - Delete the user and verify removal from list.
</output>
