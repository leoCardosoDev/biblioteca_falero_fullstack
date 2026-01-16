<role>
Product & Domain Analyst and Architect responsible for defining the requirements, contracts, and implementation strategy for the User Management module, ensuring full-stack synchronization and adherence to Clean Architecture principles.
</role>

<dependent_tasks>
- [ADR 001: Login Architecture](../adr/001_login_architecture.md)
- [ADR 005: User Management](../adr/005_user_management.md)
</dependent_tasks>

<context>
- The backend core for user management is implemented (Domain, Application, Infra).
- [BUG] Missing `role` and `status` in Presentation Layer (Controllers and Serialization).
- Authentication and RBAC (Role-Based Access Control) are enforced on the backend.
- The system supports roles: **Admin**, **Librarian**, **Professor**.
- The system supports user statuses: **Active**, **Inactive**.
- Existing endpoints: `POST /users`, `GET /users`, `PUT /users/:id`, `DELETE /users/:id`, `POST /users/:userId/login`.
</context>

<scope>
Detailed implementation requirements for both Backend and Frontend:

### 1. Backend Layer (Node.js, DDD, TypeORM)

#### Domain Layer
- **Value Objects**:
    - `user-role.ts`: Enum/VO for `admin | librarian | professor`.
    - `user-status.ts`: Enum/VO for `active | inactive`.
- **UserModel**: Update with `role` and `status` fields using the new VOs.

#### Application Layer
- **UseCases**:
    - `db-add-user.ts`: Update to handle and validate `role` and `status`.
    - `db-update-user.ts`: Update to allow changing `role` and `status`.

#### Infrastructure Layer
- **TypeORM Entity**:
    - `user-entity.ts`: Add `role` and `status` columns.
- **Migrations**:
    - `AddRoleAndStatusToUsers`: Create migration to add columns to the `users` table.
- **Repository**:
#### Presentation Layer
- **Controllers**:
    - `add-user-controller.ts`: Add `role`/`status` extraction and serialization.
    - `update-user-controller.ts`: Add `role`/`status` extraction and serialization.
    - `load-users-controller.ts`: Add `role`/`status` serialization.
    - `load-user-by-id-controller.ts`: Add `role`/`status` serialization.
- **Validations**:
    - `add-user-validation-factory.ts`: Include `role` and `status` as required fields.

### 2. Frontend Layer (React, Clean Architecture)

#### Domain Layer
- **UserModel**: Synchronize `UserRole` and `UserStatus` types with backend.

#### Presentation Layer
- **UserListPage**: Add columns for "Cargo" (Role) and "Status".
- **UserForm**: 
    - Add select field for `Role` (Admin, Librarian, Professor).
    - Add select field for `Status` (Active, Inactive).
- **Hooks**: Update `useUserManagement` to handle the new state.

#### Main Layer
- **Factories**: Update composition roots to inject any necessary dependencies.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM (Backend) / React, Vitest, Axios, Zod (Frontend).
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
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
  "role": "admin | librarian | professor",
  "status": "active | inactive",
  "address": { ... }
}
```
**Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "admin | librarian | professor",
  "status": "active | inactive"
}
```

#### GET /users
**Response (200 OK)**: Array of User objects including `role` and `status`.
</api_specification>

<acceptance_criteria>
- [x] Backend Core: Migration successfully adds `role` and `status` columns.
- [x] Backend Core: `DbAddUser` and `DbUpdateUser` have 100% test coverage for the new fields.
- [ ] Backend Presentation: Controllers correctly extract and serialize `role` and `status`.
- [ ] Frontend: `UserListPage` correctly displays "Cargo" and "Status".
- [ ] Frontend: `UserForm` includes mandatory selects for Role and Status.
- [ ] Integration: End-to-end flow allows creating a "Professor" user with "Active" status.
</acceptance_criteria>

<output>
1. **Summary**: Synchronized User Management module with specific roles and statuses across the full stack.
2. **Decisions**: 
    - Used Value Objects in the Backend Domain to ensure type safety for roles and statuses.
    - Updated TypeORM mapping to persist the new fields.
    - Integrated standard PT-BR labels in the Frontend UI.
</output>
