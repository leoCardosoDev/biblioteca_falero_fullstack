# Task 026: Hierarchical User Governance

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_008_backend_refactor_auth.md` (RBAC Foundation).
- User Story: `app/docs/stories/story_09_user_governance.md`
</dependent_tasks>

<context>
We need to enforce a **Hierarchical Access Control** system.
- **ADMIN**: The Superuser. Can manage ALL roles.
- **LIBRARIAN**: Operational Manager. Can manage *only* STUDENTS (Users).
- **PROFESSOR**: Academic staff.
- **STUDENT**: Consumer. Can only manage *self* (Profile).
</context>

<scope>
**Backend**:
1.  **Security Logic (Guard)**:
    - Implement `CanManageUser(actor, target)` logic.
    - Rule: `Actor.PowerLevel > Target.PowerLevel`.
    - Power Levels: ADMIN (100) > LIBRARIAN (50) > PROFESSOR (10) > STUDENT (0).
    
2.  **UseCases**:
    - `BlockUser`:
        - Admin -> Can block Librarian or Member.
        - Librarian -> Can block Member (e.g., late return).
        - Librarian -> CANNOT block Admin or other Librarian.
    - `PromoteUser`:
        - Admin -> Can promote Member to Librarian or Admin.
        - Librarian -> CANNOT promote anyone.

3.  **Routes**:
    - `PATCH /api/users/:id/status` (Block/Unblock)
    - `PATCH /api/users/:id/role` (Promote/Demote)

</scope>

<requirements>
- **Stack**: NestJS/Express (Fastify), TypeORM.
- **Pattern**: Strategy or Policy pattern for Permission Checks.
</requirements>

<acceptance_criteria>
- [ ] Logic prevents Librarian from blocking Admin.
- [ ] Logic allows Librarian to block Member.
- [ ] Admin can do anything.
- [ ] Unit tests for the Matrix of Permissions.
</acceptance_criteria>
