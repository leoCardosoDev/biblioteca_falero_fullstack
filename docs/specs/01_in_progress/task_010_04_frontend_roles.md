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

### Canonical Roles
```typescript
export type UserRole = 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT'
```

### Access Control Rules (Hierarchy)
- **ADMIN** (100): Can create/manage ALL.
- **LIBRARIAN** (50): Can create/manage PROFESSOR, STUDENT.
- **PROFESSOR** (10): Can create/manage STUDENT.
- **STUDENT** (0): Read-only (Self).

### API Payload (Add User)
**POST /signup** (or **POST /users**)
```json
{
  "name": "New User",
  "email": "user@mail.com",
  "password": "strongPassword",
  "role": "STUDENT",
  "cpf": "123.456.789-00"
}
```
*Note: Backend will validate if CurrentUser has power > NewUser role.*
