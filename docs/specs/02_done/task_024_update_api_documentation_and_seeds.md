# Task 024: Update API Documentation and Seeds

## Goal
Improve technical documentation and facilitate developer/QA onboarding by updating Swagger, manual test documentation, and providing comprehensive database seeds for all system roles.

## User Review Required
> [!IMPORTANT]
> - Default passwords for seeds will follow the standard: `_Falero@<role>2025`
> - Emails will follow the standard: `<role>@falero.com` (except for current admin)

## Proposed Changes

### [Component: Backend Documentation]


#### [MODIFY] [swagger.ts](../../../backend/src/main/config/swagger.ts)
- [x] Update OpenAPI info, schemas, and tags to accurately reflect the current state of the API.
- [x] Include **Mature Data Architecture** fields: `status`, `version`, `deletedAt`.
- [x] Add notes to DELETE endpoints explaining "Soft Delete" behavior.

#### [MODIFY] [manual-api-test.md](../../../backend/manual-api-test.md)
- [x] Update steps to reflect the separation of Login and User entities.
- [x] Add specific sections for testing as **ADMIN**, **LIBRARIAN**, and **STUDENT**.
- [x] Update response examples to show full metadata (`status`, `version`).

#### [MODIFY] [manual-api-test-commit.md](../../../backend/manual-api-test-commit.md)
- [x] Sync changes from `manual-api-test.md`.

#### [MODIFY] [User Stories](../../../docs/stories/)
- [x] Update `story_02`, `story_04`, and `story_07` to include Soft Delete, Explicit Status, and Versioning logic.

---

### [Component: Database Seeds]

#### [DELETE] [admin-seed.ts](../../../backend/src/main/seeds/admin-seed.ts)
- [x] Remove the separate admin seed file as it will be integrated into the consolidated seed.

#### [NEW] [users-seed.ts](../../../backend/src/main/seeds/users-seed.ts)
- [x] Create a single, consolidated seed to insert default users for all roles:
    - **ADMIN**: `admin@falero.com` (CPF: "200.732.960-31")
    - **LIBRARIAN**: `librarian@falero.com` (CPF: "932.712.030-24")
    - **STUDENT**: `user@falero.com` (CPF: "174.801.310-62")
- [x] Implement logic to check for existing users before creation to ensure idempotency.

#### [MODIFY] [package.json](../../../backend/package.json)
- [x] Remove `seed:admin` script.
- [x] Add `seed:users` script to run the consolidated `users-seed.js`.

---

## Verification Plan

### Automated Tests
- `npm run seed:users` execution and verification of DB state via SQL queries.

### Manual Verification
- Access Swagger UI at `http://localhost:5050/api-docs` to verify updated documentation.
- Execute manual API tests following the updated `manual-api-test.md`.
