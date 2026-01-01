# Task 007: Frontend Adaptation - User & Login Separation

## Context
The Backend has been refactored (Task 006) to separate `User` (Identity) from `Login` (Access). The Frontend must adapt to consume these new APIs **strictly as delivered**.

> [!WARNING]
> **API Inconsistency (TD002)**: Currently, only `GET /users/:id` returns the nested `login` object. The bulk list `GET /users` returns only user data without login info. The frontend must handle this discrepancy.

## Objectives
1.  **Consume `GET /users`**: Handle the current payload where `login` is **absent** (it won't even be null, just missing).
2.  **Adapt User Form**:
    *   Create Mode: Call `POST /users` (Person Data).
    *   If "Grant Access" is checked: Call `POST /users/:id/login` using the ID returned from Step 1.
3.  **Adapt User List**:
    *   Display placeholders ("-") for Role/Status in the list view (due to backend limitation).
    *   Full details will only be visible when opening a user's details (via `GET /users/:id`).
4.  **Strict Constraint**: DO NOT modify backend code. Adapt the Frontend to the current API behavior.

## Step-by-Step Implementation

### 1. Model & Adapter Layer
*   Update `UserModel` interface in Frontend:
    ```typescript
    export interface UserLogin {
      role: 'admin' | 'librarian' | 'user';
      status: 'active' | 'inactive';
    }

    export interface UserModel {
      id: string;
      name: string;
      email: string;
      rg: string;
      cpf: string;
      birthDate: string;
      address?: {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
      };
      login?: UserLogin | null; // Optional to handle both endpoints
    }
    ```

### 2. User Management Hook (`useUserManagement`)
*   **Load**: `users` state populated from `GET /users` (no login info).
*   **Load Individual**: `GET /users/:id` (with login info) to populate the "Edit" form completely.
*   **Create**:
    *   Step 1: `addUser.perform(personData)` -> returns `{ id }`.
    *   Step 2: If access requested, `addUserLogin.perform(id, credentials)`.
*   **Update**:
    *   Call `PUT /users/:id` for civil data.
    *   Call relevant login update endpoint for access changes.

### 3. UI Components
*   **`UserList`**: Columns "Tipo" and "Status" will currently show empty/placeholder until TD002 is fixed. Use a tooltip or note explaining this.
*   **`UserForm`**: Maintain a unified form but orchestrate multiple API calls in the submit handler.

## Verification
*   Create a user (Person only).
*   Create a login for an existing user.
*   Verify List vs. Detail view behavior.

## Standards Compliance
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`

## Dependencies
*   **Related**: [TD002: Backend Inconsistency](../TD/TD002_backend_load_users_inconsistency.md)
