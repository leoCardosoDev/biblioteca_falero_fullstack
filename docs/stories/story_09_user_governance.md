# Story 09: User Governance Management

## 1. Background
Currently, Administrators cannot update a user's **Role** (e.g., promote a User to Librarian) or **Status** (e.g., Block a suspicious user) via the API. The `PUT /users/:id` endpoint is strictly for profile information (Name, Address, etc.).

## 2. User Story
**AS AN** Administrator
**I WANT** to change a user's access level (Role) and account status (Status)
**SO THAT** I can manage system security and governance effectively.

## 3. Acceptance Criteria

### Scenario 1: Promoting a User
- **GIVEN** a user with role `USER`
- **WHEN** I send a request to update their role to `LIBRARIAN`
- **THEN** their login record should be updated with the new Role ID
- **AND** they should receive the new permissions upon next login.

### Scenario 2: Blocking a User
- **GIVEN** an active user
- **WHEN** I send a request to set their status to `BLOCKED`
- **THEN** their user record should be updated
- **AND** they should be immediately prevented from logging in (if token validation checks status) or prevented on next token refresh.

### Scenario 3: Separation of Concerns
- **GIVEN** I want to update *only* the specific governance field
- **WHEN** I use the dedicated governance endpoints
- **THEN** the user's profile data (Name, Email) should remain untouched.
