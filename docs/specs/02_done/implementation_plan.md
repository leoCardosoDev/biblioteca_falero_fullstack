# ManageUserAccess UseCase Implementation Plan

## 1. Module: Identity (Domain Layer)
- [ ] Create `src/modules/identity/domain/usecases/manage-user-access.ts` defining `ManageUserAccess` interface and params.

## 2. Module: Identity (Application Layer)
- [ ] Create `src/modules/identity/application/usecases/db-manage-user-access.ts`.
    - Implement the logic:
        - Helper to update Password (if provided).
        - Helper to update Role (if provided).
        - Helper to update Status (if provided).
    - Dependencies:
        - `UpdateLoginPasswordRepository` (already exists in LoginTypeOrmRepository)
        - `UpdateLoginRoleRepository` (already exists in LoginTypeOrmRepository)
        - `UpdateLoginStatusRepository` (already exists in LoginTypeOrmRepository)
        - `UpdateUserStatusRepository` (already exists in UserTypeOrmRepository)

## 3. Module: Identity (Main Layer - Factories & Presentation)
- [ ] Create `src/modules/identity/presentation/controllers/manage-user-access-controller.ts`.
- [ ] Create `src/modules/identity/main/factories/usecases/db-manage-user-access-factory.ts`.
- [ ] Create `src/modules/identity/main/factories/controllers/manage-user-access-controller-factory.ts`.
- [ ] Register route in `src/modules/identity/main/routes/user-routes.ts` (or relevant route file).

## 4. Verification
- [ ] Create test `tests/modules/identity/presentation/controllers/manage-user-access-controller.spec.ts`.
- [ ] Run tests to ensure `POST /users/:id/access` works as expected.
