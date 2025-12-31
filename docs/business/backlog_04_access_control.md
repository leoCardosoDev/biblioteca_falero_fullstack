# 🔐 Access Control Context (Auth & Authz)

## 📝 Description
Manages Authentication (who you are) and Authorization (what you can do). Implements a standard RBAC (Role-Based Access Control) model.

## 🏛️ Entities

### `Login`
Represents the credentials and access state.
*   **user_id**: Reference to `User.User` (The identity).
*   **role_id**: Reference to `Role`.
*   **password_hash**: string(255) - Securely hashed password.
*   **active**: boolean - Whether login is permitted.
*   **created_at**: datetime.

### `Role`
Represents a group or profile (e.g., 'Admin', 'Librarian', 'Student').
*   **description**: string(30) - Name of the role.

### `Permission`
Represents a specific operation or granular power.
*   **code**: string(50) - Unique code (e.g., `CREATE_BOOK`, `MANAGE_USERS`).
*   **active**: boolean.

### `RolePermission`
Mapping between Roles and Permissions (Many-to-Many).
*   **role_id**: Reference to `Role`.
*   **permission_id**: Reference to `Permission`.

## 🔗 Relationships
*   **Login** belongs to a **User**.
*   **Login** has one **Role**.
*   **Role** has many **Permissions**.

## 📏 Business Rules
*   **Security**: Passwords must never be stored in plain text.
*   **RBAC**: Access decisions should be based on Permissions, not just Roles. Roles are grouping mechanisms.
*   **Independence**: A User exists without a Login (e.g., a student who hasn't registered online yet), but a Login requires a User.
