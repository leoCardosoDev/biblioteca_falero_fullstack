# Manage User Access Feature

## Overview
The `Manage User Access` feature allows administrators to manage the access credentials and status of users in the system. This includes assigning roles (Role Based Access Control), updating user status (Active, Inactive, Blocked), and managing passwords.

**Endpoint**: `POST /users/:id/access`

## Functional Requirements

### 1. Update User Access
- **Permission**: Only users with `ADMIN` role can access this endpoint.
- **Scope**: Can update any user's access data.
- **Conditional Updates**: Writes to the database occur ONLY if the new value provided is different from the current value.

### 2. Login Management (Upsert)
- **Existing Login**:
    - If the user already has a login record, the system updates the provided fields (`roleId`, `status`, `password`).
- **Missing Login**:
    - If the user does NOT have a login record AND a `password` is provided in the payload, the system creates a new Login record.
    - If the user does NOT have a login record AND `password` is missing, the system returns an error (`MissingParamError: password`).

### 3. Field details
- **Role (`roleSlug` or `role`)**:
    - Accepts both `role` (legacy support) and `roleSlug` in the payload.
    - Maps to `RoleId` in the database.
    - Enforces hierarchy: Admin cannot assign a role with higher power level than their own.
- **Status (`status`)**:
    - Updates both `User.status` and `Login.status` (if Login exists).
    - `ACTIVE` User status sets Login to active; other statuses set Login to inactive.
- **Password (`password`)**:
    - Securely hashed using Bcrypt before storage.
    - Compared using `HashComparer` to avoid re-hashing identical passwords.

## Data Flow

1. **Request**: `POST /users/:id/access`
2. **Validation**:
    - Check if Actor is Admin.
    - Validate payload format.
3. **Execution (`DbManageUserAccess`)**:
    - Load Actor and Target User.
    - **Check 1**: Does Target have Login?
        - **No**:
            - Is Password provided?
                - **Yes**: Create Login (`AddLoginRepository`).
                - **No**: Return Error.
        - **Yes**:
            - Load Target Login.
    - **Check 2**: Role update needed?
        - If `roleSlug` provided AND different from current -> Update Role.
    - **Check 3**: Status update needed?
        - If `status` provided AND different from current -> Update User & Login Status.
    - **Check 4**: Password update needed?
        - If `password` provided -> Compare with hash.
        - If different -> Hash & Update Password.
4. **Response**: `204 No Content` (Success) or Error (400/403/404).

## Dependencies
- `LoadUserByIdRepository`
- `LoadLoginByUserIdRepository`
- `AddLoginRepository`
- `UpdateLoginRoleRepository`
- `UpdateUserStatusRepository`
- `UpdateLoginStatusRepository`
- `UpdateLoginPasswordRepository`
- `LoadRoleBySlugRepository`
- `Hasher` / `HashComparer`
