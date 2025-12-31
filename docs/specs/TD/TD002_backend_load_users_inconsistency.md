# TD002: Backend Inconsistency in LoadUsers (GET /users)

## Context
During the backend refactor (Task 006), the logic to separate `User` from `Login` was implemented. However, only the `GET /users/:id` endpoint was updated to return the nested `login` object (containing `role` and `status`). The bulk list endpoint `GET /users` still returns only the `User` data, lacking the association with `Login`.

## Technical Impact
- The Frontend will see inconsistent data structures depending on whether it loads a single user or a list.
- The `UserList` component will not be able to display roles or statuses without an additional API call per user, or a future refactor to the bulk list response.

## Recommended Fix
1.  **Infrastructure**: Update `UserTypeOrmRepository.loadAll()` to perform a `LEFT JOIN` with the `logins` table and map the result to include the `login` field in the `UserModel`.
2.  **Application**: Ensure `UserModel` in the domain has an optional `login` field (already present in some models but inconsistent across use cases).
3.  **Presentation**: Update `LoadUsersController` to serialize the nested `login` field in the array response.

## Priority
Medium (Required for efficient frontend data display).
