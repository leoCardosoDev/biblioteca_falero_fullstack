# Task 006: Backend Refactoring - User & Login Separation

## Context
Refactoring the Backend to adhere to **ADR 002**. We must separate the monolithic `User` concept into `User` (Identity) and `Login` (Access).

## Objectives
1.  **Database & Entities**: Create `LoginTypeOrmEntity` and strip auth fields from `UserTypeOrmEntity`.
2.  **Repositories**: Split `UserTypeOrmRepository` responsibilities.
3.  **Use Cases**: Update `AddUser` to *only* create the person. Update `AddUserLogin` (or similar) to handle credentials.
4.  **API Contract (FINAL)**:
    *   `GET /users`: Returns `UserModel[]` merged with Login status (left join logic).
        *   Payload: `{ id, name, cpf, ..., login: { role, status } | null }`
    *   `POST /users`: Creates **only** the person (`usuario` table).
        *   Body: `{ name, email, cpf, rg, birthDate, address }`
        *   Response: `{ id, ... }` (No role/status)
    *   `POST /users/:id/login`: Creates/Updates the Login entry.
        *   Body: `{ password, role, status }`
    *   `PUT /users/:id`: Updates *only* person data.

## Step-by-Step Implementation

### 1. Persistence Layer / Infrastructure
*   **Modify `UserTypeOrmEntity`**:
    *   REMOVE: `password`, `role`, `status`.
    *   KEEP: `id`, `name`, `email`, `rg`, `cpf`, `birthDate`, `address*`.
    *   *Note*: Ensure `email` is kept here as contact info.
*   **Create `LoginTypeOrmEntity`**:
    *   Columns: `id`, `usuario_id` (FK), `grupo_id` (Implied Role), `senha_hash`, `ativo`, `criado_em`.
    *   *Simplification*: For now, use `role` (string) column instead of full `grupo` table if strict table creation isn't required by task, BUT ADR 002 mentions `grupo`. *Decision*: Follow ADR 002 concept, but if no `grupo` table exists yet, map `role` string on `Login` entity to keep it simple but separated. **Wait**, reference SQL has `grupo` table.
    *   **Strict SQL Alignment**: Create `GroupTypeOrmEntity`?
    *   *Direct instruction*: "Backend vai criar assim". Let's stick to the simplest valid implementation of ADR 002 that works.
    *   **Refined Plan**:
        *   `UserTypeOrmEntity`: `users` table.
        *   `LoginTypeOrmEntity`: `logins` table. (Has `userId`, `password`, `role`, `status`).

### 2. Domain Layer
*   Update `UserModel`: Remove `role`, `status`.
*   Create `LoginModel`: `{ userId, role, status, ... }`.
*   Update `AddUser` UseCase: Returns `UserModel`.
*   Create/Update `ManageUserAccess` UseCase: Handles creating/updating login.

### 3. Presentation Layer (Controllers)
*   **Split the `AddUserController`**:
    *   It currently handles everything.
    *   **NEW BEHAVIOR**: It specifically creates the User (Person).
    *   *Note*: Requires seeding/migration of existing data?
    *   *Dev Mode*: It is acceptable to drop/reset the database (`synchronize: true`).

### 4. Tests
*   Update `db-add-user.spec.ts`.
*   Create `db-add-user-login.spec.ts`.

## Deliverables
*   Fully working Backend API with separated concerns.
*   `swagger` / `routes` updated to reflect the new structure.
*   **IMPORTANT**: The "User List" endpoint (`GET /users`) MUST still return the `role` and `status` if a login exists, so the frontend can display it. This requires a LEFT JOIN in the repository.

**Output Schema for `GET /users`**:
```json
[
  {
    "id": "uuid",
    "name": "Leo",
    "email": "leo@gmail.com",
    "login": {
      "role": "admin",
      "status": "active"
    }
  },
  {
    "id": "uuid2",
    "name": "Reader Only",
    "email": "reader@gmail.com",
    "login": null
  }
]
```
