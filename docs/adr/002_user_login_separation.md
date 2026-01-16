# ADR 002: User Identity vs System Access Separation

## Status
Accepted

## Context
The current application implementation treats "User" as a single monolithic entity containing both personal data (Identity) and system access safeguards (Login/Role/Status).

However, tThe specific business domain (Library System - "Falero") requires a strict separation of concerns to support:
1.  **Person Existence w/o Access**: A user (e.g., a Reader) may exist in the system for borrowing purposes without having a login account.
2.  **Role-Based Access Control (RBAC)**: Permissions are managed via precise `Roles` and `Permissions`, not just simple string flags.
3.  **Scalability**: Future support for multiple profiles per user.

The reference database schema (Refactored SQL) explicitly defines this structure.

## Decision
We will enforce the architectural separation of **Identity**, **Access**, and **Authorization** layers as follows:

### 1. Conceptual Model

### 1. Conceptual Model

*   **User (`user`)**: Represents the **Person/Identity**.
    *   *Responsibility*: Holds civil data (Full Name, RG, CPF, Address, Contact).
    *   *Constraint*: Can exist independently of a system login.
    *   *Identifier*: `user.id`.

*   **Login (`login`)**: Represents the **System Access/Account**.
    *   *Responsibility*: Authentication credentials (Password Hash), Account Status (Active/Inactive), and Audit data.
    *   *Constraint*: Must belong to exactly one User.
    *   *Identifier*: `login.id` (links to `user.id`).

*   **Role (`role`)**: Represents the **Group/Profile**.
    *   *Responsibility*: Defines a named set of permissions (e.g., "Admin", "Librarian").
    *   *Constraint*: A Login belongs to a Role.

*   **Permission (`permission`)**: Represents a **Capability/Operation**.
    *   *Responsibility*: Granular action allowed in the system (e.g., `REGISTER_BOOK`, `LOAN_BOOK`).
    *   *Relation*: Many-to-Many mapping with Role (`role_permission`).

### 2. Implementation Standards

#### Domain Layer
*   User Aggregate should focus on Identity.
*   Login/Account Aggregate should focus on Authentication.
*   Permission checking must be performed against the *Role* permissions, not the User entity itself.

#### Persistence Layer (TypeORM)
*   **`UserTypeOrmEntity`**: Maps to `user` table.
    *   Columns: `full_name`, `rg`, `cpf`, `gender`, `address_*`, `email`*, `phone`.
    *   *Note*: `email` is in `user` (contact info) and unique.

*   **`LoginTypeOrmEntity`**: Maps to `login` table.
    *   Columns: `user_id`, `role_id`, `password_hash`, `active`.

#### Auth Flow
1.  **Backend** validates `email` + `password`.
2.  Query: `Login` -> join `User` (where `user.email` = input).
3.  Token Payload: Should contain `login_id`, `user_id`, `role_id`, and potentially a list of reduced `permissions` (or fetch on demand).

## Consequences

### Positive
*   **Alignment**: Matches the legacy/reference database perfectly.
*   **Flexibility**: Allows registering patrons (Readers) without forcing them to have passwords/logins immediately.
*   **Security**: Granular control over what a "Role" means via `grupo_operacao`.

### Negative
*   **Refactoring Cost**: Existing `UserTypeOrmEntity` merging these concepts must be split.
*   **Complexity**: Basic CRUD operations now involve joining two tables (`user` + `login`).

## Compliance
All future features involving User Management or Authentication must adhere to this separation. Existing "monolithic" User implementations are considered **Technical Debt** and must be refactored.
