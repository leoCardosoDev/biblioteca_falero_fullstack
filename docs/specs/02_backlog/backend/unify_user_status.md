# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/02_backlog/backend/unify_user_status.md`.
# </role>

<role>
You are the Technical Lead ensuring domain integrity. You are correcting a historical divergence where `User` status and `Login` status were separated.
</role>

<dependent_tasks>
- **Prerequisite**: `app/docs/specs/01_in_progress/backend/refactor/spec.md` (DDD Refactor).
- **Prerequisite**: `app/docs/specs/01_in_progress/frontend/refactor/spec.md`.
</dependent_tasks>

<context>
-   Currently, `Login` has `active` (boolean).
-   `User` might have implicit status logic or none.
-   DDD Violation: Status is a core domain property of the `User` (Aggregate Root), not just the `Login` mechanism.
</context>

<scope>
Refactoring Status Management.

### Backend
1.  **Domain**: Add `status` (Enum: ACTIVE, INACTIVE, SUSPENDED, BLOCKED) to `User` entity.
2.  **Migration**: Create migration to backfill `User.status` based on `Login.active` (if Login.active=true -> User.active).
3.  **Logic**: Deprecate `Login.active` logic. All checks must check `User.status`.
4.  **API**: Update `GET /users`, `PATCH /users/:id/status` endpoints.

### Frontend
1.  **Models**: Update `User` model with `status` field.
2.  **UI**: Update User List badges to use `status`.
3.  **Forms**: Allow Admin to toggle Status (dropdown or toggle) impacting the `User` entity.
</scope>

<requirements>
-   **Stack**: Node.js, Fastify, React.
-   **Constraint**: Backward compatibility during deployment (Database migration strategy).
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
</standards_compliance>

<acceptance_criteria>
- [ ] **DB**: `user` table has `status` column.
- [ ] **Logic**: Blocking a User prevents Login.
- [ ] **UI**: User List shows correct status.
</acceptance_criteria>
