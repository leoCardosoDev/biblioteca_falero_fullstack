# Task 008: Backend Separation of Access Control

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_007_backend_refactor_domain.md`
- Depends on: `app/docs/bussines/story_04_access_control.md`
</dependent_tasks>

<context>
Authentication logic currently resides mixed within User. We need to split it into a dedicated `Login` aggregate and implement RBAC.
</context>

<scope>
**Backend**:
1.  **Login Entity**: Create `Login` entity (`user_id`, `role_id`, `password_hash`, `active`).
2.  **Role/Permission**: Create `Role` and `Permission` entities and their relation.
3.  **UseCases**:
    -   `CreateLogin`: Link to existing User.
    -   `Authenticate`: Validate against `Login` table (not User directly).
4.  **Database**: TypeORM entities for `login`, `role`, `permission`, `role_permission`.
5.  **Seeds**: Seed basic Roles (Admin, Librarian) and Permissions.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM, JWT.
- **Constraint**: Passwords MUST be hashed.
- **Constraint**: Login MUST reference a User ID.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `Login` entity implemented.
- [ ] `Role` and `Permission` entities implemented.
- [ ] Authentication flow validates against `Login` table.
- [ ] `AddUser` (Identity) flow distinct from `CreateLogin` (Access) flow.
</acceptance_criteria>

<output>
1.  Functional RBAC system.
2.  Separated Login/User tables.
</output>
