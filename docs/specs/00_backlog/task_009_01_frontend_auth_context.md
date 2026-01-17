# Task 009.1: Frontend - Auth Context Refactor (Architectural Cleanup)

<role>
You are the FRONTEND ARCHITECT (FRONTEND-ARC).
</role>

<dependent_tasks>
- Depends on: `task_008_backend_refactor_auth.md` (Done).
- Feature: Re-align Frontend with Backend's `Login` vs `User` split.
</dependent_tasks>

<context>
The Backend (Task 008) separated `Login` (Authentication) from `User` (Identity).
The Frontend currently uses a "God Object" `AccountModel` that mixes:
1.  **Session Data**: `accessToken`, `refreshToken`.
2.  **Identity Data**: `name` (which is actually `email` currently), `role`, `avatarUrl`.

This coupling makes the system fragile. We need to decouple the **Session** (how I access the API) from the **User Profile** (who I am).
</context>

<scope>
**Refactor `AuthContext` to support a Split State:**

1.  **DTO Definitions (`src/domain/models`)**:
    -   Create `LoginResponse`: Matches EXACTLY what the API returns (`accessToken`, `refreshToken`, `name`, `role`).
    -   Update `AccountModel`: Should represent the *User Profile* (cleaner entity), or be phased out in favor of `User`.

2.  **Auth State (`AuthContext`)**:
    -   `session`: `{ accessToken: string | null }` (Source of Truth for "Is Logged In").
    -   `user`: `{ name: string, role: string } | null` (Source of Truth for "Who is it").
    -   *Goal*: Allow `user` to be updated (e.g., "Edit Profile") without needing to re-login (re-issue tokens).

3.  **Adapters (`RemoteAuthentication`)**:
    -   Function `auth()` should return `LoginResponse`.
    -   Adapter logic should populate both `session` and `user` states.

4.  **Storage**:
    -   `accessToken`: Secure Storage (Cookie/LocalStorage).
    -   `user`: Cache (LocalStorage) for UI persistence, but non-critical.
</scope>

<acceptance_criteria>
- [ ] `LoginResponse` interface created and matching Backend response.
- [ ] `AuthContext` separates `session` (tokens) from `user` (profile) in its internal state.
- [ ] `RemoteAuthentication` returns `LoginResponse`.
- [ ] The app compiles and runs.
- [ ] Login flow works (Tokens saved, User redirected).
</acceptance_criteria>
