# Task 025: Backend Logout Implementation

## Goal
Implement a secure logout endpoint that invalidates the user's session in the backend.

## Requirements
- Create a `POST /logout` endpoint.
- The endpoint must receive a `refreshToken`.
- The endpoint must invalidate the session associated with the `refreshToken` in the database.
- The endpoint must return `204 No Content` on success.
- Ensure 100% test coverage for the new code.

## Proposed Changes

### Domain
- Create `Logout` use case interface.

### Application
- Implement `DbLogout` use case.
- It must hash the `refreshToken` and call `InvalidateSessionRepository`.

### Presentation
- Create `LogoutController`.

### Main
- Add `LogoutController` factory.
- Register `POST /logout` route.

## Definition of Done
- Unit tests for `DbLogout` and `LogoutController`.
- Integration tests for `POST /logout` route.
- 100% coverage achieved.
