# ADR 002: Module Responsibility Separation (Identity vs Access Control)

## Status
Accepted

## Context
A common failure mode in monolithic architectures is the "God User Class", where a single Entity handles Identity (Name, Address), Authentication (Password), and Authorization (Roles).
This creates tight coupling between disparate business domains.
To support the **Modular Monolith** (ADR 013), we must enforce a hard boundary between **Who a Person Is** (Identity) and **What they can do** (Access).

## Decision
We enforce a strict separation of concerns across two distinct Bounded Contexts (Modules).

### 1. Identity Module (`src/modules/identity`)
*   **Responsibility**: Manages the *Civil Persona*.
*   **Aggregate Root**: `User`
*   **Data Owned**: Full Name, CPF, RG, Address, Email (Contact), Phone.
*   **Rules**:
    *   A `User` can exist without a `Login`.
    *   Knows NOTHING about Passwords, Roles, or Tokens.
*   **Public Contract**: `UserGateway.findById(id)`, `UserGateway.exists(email)`.

### 2. Access Control Module (`src/modules/access-control`)
*   **Responsibility**: Manages *System Entry & Security*.
*   **Aggregate Root**: `Login`
*   **Entities**: `Role`, `Permission`.
*   **Data Owned**: Password Hash, Active Status, Refresh Tokens, Role Assignment.
*   **Rules**:
    *   A `Login` MUST be linked to a `userId` (Foreign Key / Reference).
    *   Implements RBAC (Role-Based Access Control) and Hierarchy logic.
    *   Handles JWT Generation/Validation.

### 3. Interaction Rules
*   **Flow**: When a user logs in, `AccessControl` validates the password. It MAY call `Identity` (via Contract) to fetch the user's name for the token payload, BUT it must not directly query the `user` table.
*   **Registration**: A "Register" use case is an Orchestrator (in `Main` or specific Saga) that calls:
    1.  `Identity.CreateUser()` -> Returns `userId`
    2.  `AccessControl.CreateLogin(userId, ...)`

## Consequences

### Positive
*   **Security**: Authentication logic is isolated.
*   **Flexibility**: You can import "Users" (e.g., from a Legacy CSV) without generating Logins for them.
*   **Compliance**: GDPR/LGPD data (`Identity`) is separated from technical security data (`Access Control`).

### Negative
*   **Complexity**: Creating a "full user" requires touching two modules.
*   **Performance**: Login payload construction may require an internal cross-module call.

## Compliance
Any PR attempting to add "Password" to `User` or "Address" to `Login` MUST be rejected.
