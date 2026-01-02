# Task 026: User Governance Implementation

## 1. Introduction
This task implements the definition of specific endpoints for User Governance. Following the Single Responsibility Principle (SRP) and avoiding "God Methods", we will separate **Profile Updates** from **Governance Updates**.

## 2. Architectural Design [ARC]

### 2.1 Context
- `PUT /api/users/:id`: Remains exclusive for **Profile Data** (Name, Address, Phone, personal Email).
- **New Endpoints**: Dedicated to governance actions.

### 2.2 New Routes
1.  **Update Status**
    - `PATCH /api/users/:id/status`
    - Body: `{ "status": "BLOCKED" | "ACTIVE" | "INACTIVE" }`
    - Logic: Updates `users` table.

2.  **Update Role**
    - `PATCH /api/users/:id/role`
    - Body: `{ "role": "admin" | "librarian" | "user" }`
    - Logic: Updates `logins` table (found by `userId`).

### 2.3 Security
- **Role Required**: `ADMIN` only. (Librarians cannot promote users or block admins).

## 3. Implementation Steps [DEV]

### 3.1 Domain Layer
- Define `UpdateUserStatus` UseCase.
- Define `UpdateUserRole` UseCase.
- Ensure `UserStatus` and `UserRole` Value Objects are reused.

### 3.2 Infra Layer
- Add `updateStatus` method to `UserTypeOrmRepository`.
- Add `updateRole` method to `LoginTypeOrmRepository`.

### 3.3 Main Layer (Routes)
- Register `PATCH /users/:id/status`
- Register `PATCH /users/:id/role`

## 4. Verification [QA]
- Verify Admin can block User.
- Verify Admin can promote User.
- Verify User cannot access these endpoints.
