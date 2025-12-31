# ADR 005: User Management Strategy

## Context & Problem
The system requires robust user management allowing profile creation, listing, updating, and deletion, alongside separate access credential management. The Frontend needs clear contracts, business rules, and error handling to implement administration screens.

## Drivers
- **Security**: Mandatory Authentication and Authorization via JWT.
- **Integrity**: Rigorous validation in multiple layers (Schema and Domain).
- **Separation of Concerns**: Profile data separated from login credentials.
- **Scalability**: Support for roles (`admin`, `librarian`, `user`).

## Decision
We implement a user management flow based on DDD and Clean Architecture in the Backend, with the following contracts:

### 1. User Endpoints
- `POST /users`: Basic profile creation.
    - **Requires**: Authentication (Admin/Librarian).
    - **Payload**: `{ full_name, email, rg, cpf, address: { street, number... } }`.
- `GET /users`: User listing.
    - **Requires**: Authentication (Admin/Librarian).
- `PUT /users/:id`: Profile/Role update.
    - **Requires**: Authentication (Admin).
    - **Payload**: `{ full_name?, email?, role?, rg?, cpf?, address? }`.
- `DELETE /users/:id`: User removal.
    - **Requires**: Authentication (Admin).
- `POST /users/:userId/login`: Access credential creation.
    - **Requires**: Authentication (Admin/Librarian).
    - **Payload**: `{ password, role_id }`.

### 2. Authentication
- `POST /login`: Login with email/password. Returns `accessToken`, `refreshToken`, `name`, and `role`.
- `POST /refresh-token`: Token renewal using `refreshToken`.

### 3. Validation & Business Rules
- **CPF/Email/RG**: Must be unique in the system.
- **Password**: Minimum 8 chars, containing uppercase, lowercase, number, and special char.
- **Value Objects**: Validations (CPF, Email, Address) are centralized in Domain Value Objects.

### 4. Error Handling
- `400 Bad Request`: Validation error or missing parameters.
- `401 Unauthorized`: Invalid or expired token.
- `403 Forbidden`: Business rule violation (e.g., CPF already exists) or insufficient permission (RBAC).
- `404 Not Found`: User not found.

## Consequences
- **Positive**: High code traceability and security. Clear separation between "who the user is" and "how they access".
- **Negative**: Higher frontend complexity to manage the two-step flow (Create Profile -> Create Login).
