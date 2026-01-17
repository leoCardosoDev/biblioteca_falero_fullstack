# Restore User Access Management (ManageUserAccess)

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Restore User Access Management
- **Owner**: Backend Team
- **Status**: draft
- **Version**: 1.0
- **Created At**: 2026-01-17
- **Last Updated**: 2026-01-17
</meta>

<related_specs>
- `app/backend/implementation_plan.md`
</related_specs>

<context>
- **Current State**: The frontend `HttpUserRepository.manageAccess` method expects a `POST /users/:id/access` endpoint.
- **Problem**: This route (and likely its underlying controller) was removed during a previous refactor of the identity module.
- **Impact**: Users cannot update roles, status, or passwords for other users via the UI.
</context>

<problem>
- **Issue**: Missing backend endpoint `POST /users/:id/access`.
- **Impact**: Administrative functions (changing user roles, blocking users, resetting passwords) are broken.
- **Evidence**: Static analysis of frontend code shows dependency on this route; backend route registry lacks it.
</problem>

<objectives>
- **Primary Objective**: Restore the `POST /users/:id/access` endpoint functionality.
- **Secondary Objective**: Ensure the implementation strictly follows the Modular Monolith and Clean Architecture standards (ADR 013).
</objectives>

<success_metrics>
- **Target**: `POST /users/:id/access` returns 204 or 200 on success.
- **Target**: Frontend `manageAccess` calls succeed without error.
</success_metrics>

<users>
- **Admin/Manager**: Needs to manage access rights and status of other users.
</users>

<scope>
### In Scope
- Create Use Case `ManageUserAccess` in Identity module.
- Create Controller `ManageUserAccessController`.
- Register route `POST /users/:id/access`.
- Support updating: `roleId`, `status`, `password`.
- Strict adherence to ADR 013 (Identity module boundaries).

### Out of Scope
- Frontend changes (assuming frontend code is correct and just needs the backend support).
- Modifications to other modules.
</scope>

<functional_requirements>
1. **Manage Access**: The system must allow an authorized user (Admin) to update the Role, Status, and Password of another user in a single transaction.
2. **Validation**: Inputs (Role ID, Password strength, Status valid enum) must be validated.
3. **Security**: Only authorized actors should be able to perform this action (Authorization check is assumed to be handled by middleware/decorators, but pure business logic should also be secure).
</functional_requirements>

<non_functional_requirements>
- **Architecture**: Must follow Modular Monolith with Clean Architecture (ADR 013).
- **Performance**: Standard REST API latency (<200ms).
</non_functional_requirements>

<user_flows>
- **Primary Flow**:
    1.  Admin sends `POST /users/:id/access` with `{ roleId, status, password }`.
    2.  System validates inputs.
    3.  System updates Login entity (Password, Role, Status) and/or User entity (Status).
    4.  System returns 204 No Content.
</user_flows>

<ux_guidelines>
- API only (Headless). Returns standard HTTP status codes.
</ux_guidelines>

<dependencies>
- **Identity Module**: Existing `UserTypeOrmRepository` and `LoginTypeOrmRepository`.
</dependencies>

<risks>
- **Data Consistency**: Updating multiple fields (Role, Status, Password) should ideally be atomic.
- **Permission Escalation**: Ensure proper checks so a user cannot escalate their own privileges (though mainly handled by Access Control module/middleware).
</risks>

<assumptions>
- The frontend sends `id` (User ID), `role` (Role ID), `status` (UserStatus string), and `password` (string).
- Existing Repositories (`LoginTypeOrmRepository`, `UserTypeOrmRepository`) have methods to support these updates or can be easily extended.
</assumptions>

<acceptance_criteria>
- Given an Admin user, When they submit a valid request to update a user's role to 'ADMIN', Then the target user's role is updated in the database.
- Given an Admin user, When they submit a request to block a user, Then the target user's status is set to 'BLOCKED'.
- Given an Admin user, When they submit a new password, Then the target user's password is changed (hashed).
</acceptance_criteria>

<open_questions>
- None.
</open_questions>

<standards_compliance>
- `app/docs/adr/013_modular_monolith_clean_architecture.md`
</standards_compliance>

<handoff_notes>
- Use existing `LoginTypeOrmRepository` methods (`updateRole`, `updateStatus`, `updatePassword`) and `UserTypeOrmRepository` (`updateStatus`) where available. Orchestrate them in the Use Case.
</handoff_notes>
