# Task 010.4: Frontend - Role Alignment & UI Logic

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<context>
The backend now enforces strict roles (Admin, Librarian, Professor, Student). The Frontend must reflect these options and enforce the same hierarchy constraints in the UI (hiding options the user cannot create).
</context>

<objectives>
1.  Update Frontend Models to match Backend Canonical Roles.
2.  Implement Dynamic Form Logic (Role Select).
</objectives>

<scope>
## 1. Domain / Models
- [ ] Update `UserRole` type: `'admin' | 'librarian' | 'professor' | 'student'`.
- [ ] Update `UserForm` Schema (Zod) to accept new values.

## 2. UI Components
- [ ] Update `UserForm`:
    - **Dynamic Options**: Filter the "Role" dropdown.
        - `currentUser.role === 'admin'` -> Show [Librarian, Professor, Student].
        - `currentUser.role === 'librarian'` -> Show [Professor, Student].
        - `currentUser.role === 'professor'` -> Show [Student].
        - `currentUser.role === 'student'` -> (Should not access this form).
- [ ] Update `UserList`:
    - **Badges**: Ensure new roles have distinct visual badges/colors.
        - Professor: Purple?
        - Student: Blue?
</scope>

## 3. Domain & Rules

### API Payload & Flow (Add Privileged User)
Since `POST /users` does not set credentials or role, and `POST /users/:id/login` defaults to STUDENT, creating a Librarian/Professor requires a sequence:

1.  **Create Profile**: `POST /users`
    ```json
    { "name": "...", "email": "...", "cpf": "..." }
    ```
    *(Returns `id`)*

2.  **Create Login**: `POST /users/:id/login`
    ```json
    { "password": "StrongPassword123!" }
    ```
    *(Defaults to Role: STUDENT)*

3.  **Promote Role**: `PATCH /users/:id/role`
    ```json
    { "roleId": "UUID" } // Check if backend expects ID or Slug. 
    // Backend Implementation of `updateUserRoleSchema` expects `roleId` (UUID).
    // Frontend must lookup Role ID by Slug first? Or does backend accept Slug?
    // Wait, updateUserRoleSchema says roleId: string (uuid).
    // Frontend needs to fetch Roles list first to get IDs for 'ADMIN', 'LIBRARIAN' etc.
    ```
    *Note: Frontend must fetch available Roles to map Slug -> ID.*

### Canonical Roles
```typescript
export type UserRole = 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT'
```
*Note: Backend `UserRole` value object normalizes to UPPERCASE.*
