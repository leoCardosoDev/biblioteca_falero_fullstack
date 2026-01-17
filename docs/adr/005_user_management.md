# ADR 005: User Management & API Strategy

## Status
Accepted

## Context
User management requires coordinating two distinct modules: **Identity** (Profile) and **AccessControl** (Credentials).
The API Surface must present a coherent experience to the Frontend while maintaining strict modular separation in the Backend.
Reference: [ADR 002](002_user_login_separation.md).

## Decision
We enforce the following **Module-Responsibility Map** for User features.

### 1. API Responsibilities

#### A. Public User Registration (`POST /signup`) - Choreographer
*   **Layer**: `src/main/composites/signup` (Orchestration).
*   **Flow**:
    1.  Call `Identity.CreateUser()` -> Returns `userId`.
    2.  Call `AccessControl.CreateLogin(userId, password)` -> Returns `loginId`.
    3.  Return `201 Created`.

#### B. Administrative Management (`/users`)
*   **Endpoints**:
    *   `GET /users` -> Owned by **Identity** (Presentation).
    *   `PUT /users/:id` -> Owned by **Identity** (Presentation).
    *   `POST /users/:id/access` -> Owned by **AccessControl** (Presentation).

### 2. Validation Rules
*   **Duplication Check**:
    *   **Identity**: Checks `email` (Contact) uniqueness.
    *   **AccessControl**: Checks `email` (Login Username) uniqueness - *Yes, redundant check required for consistency.*

### 3. Error Handling Standard
*   **400 Bad Request**: Validation Composite Failure.
*   **401 Unauthorized**: Invalid JWT.
*   **403 Forbidden**: Valid JWT, but `Role` insufficient.
*   **409 Conflict**: Unique constraint violation (Email/CPF already exists).

## Consequences
*   **Orchestration**: "Sign Up" is not a simple use case; it is a composition of two atomic use cases.
*   **Clarity**: Backend developers know exactly which module to touch when "User Listing" is broken (Identity).

## Compliance
New user-related features MUST be categorized into `Identity` or `AccessControl` before coding.
