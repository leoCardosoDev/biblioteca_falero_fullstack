# Task: Implement ManageUserAccess UseCase in Backend

## 1. Scope
Create a new unified UseCase `ManageUserAccess` to handle administrative updates to a user's access credentials (Role, Status, Password). This UseCase will be the single operational point for these security-critical changes.

## 2. Motivation
Currently, "User Profile" (Name, Email) and "User Access" (Role, Status, Password) responsibilities are blurred. `UpdateUser` allows status changes without sufficient security context, and `BlockUser` is too limited. A unified, secure, and atomic operation is required to support the administrative "Gerenciar Acesso" context.

## 3. Impact Analysis

### User Lifecycle Impact Analysis
*   **List Users**:
    *   *Code Changes*: None.
    *   *Layer*: Unaffected.
    *   *Tests*: Unchanged.
    *   *Invariant*: The `ListUsers` output must effectively show the current status and role, which will now be modified by this new UseCase.
*   **Create User**:
    *   *Code Changes*: None. New users continue to stem from `AddUser` with default `ACTIVE` status.
    *   *Layer*: Unaffected.
    *   *Tests*: Unchanged.
*   **Update User**:
    *   *Code Changes*: `UpdateUser` UseCase will **remain unchanged** for now but will effectively only be used for profile data by the frontend.
    *   *Layer*: Application/Domain.
    *   *Tests*: Existing tests must remain unchanged to ensure backward compatibility.

### Layer Dependency Impact Simulation
*   **Domain**:
    *   *Change*: Add `ManageUserAccess` interface and `ManageUserAccessParams`.
    *   *Breaking Points*: None. Pure additive change.
*   **Application**:
    *   *Change*: Implement `DbManageUserAccess`.
    *   *Dependencies*: Depends on `LoginRepository` (needs new method), `RoleRepository`, `UpdateUserStatusRepository`.
    *   *Ripple Effect*: `LoginRepository` interface change will force update in `LoginTypeOrmRepository`.
*   **Infra**:
    *   *Change*: `ManageUserAccessController` creation. `LoginTypeOrmRepository` update.
    *   *Containment*: `LoginTypeOrmRepository` changes must be strictly limited to adding the `updatePassword` method.
*   **Presentation**:
    *   *Change*: Register new route.
    *   *Precondition*: AuthMiddleware must be active on this route.

## 4. Chosen Architectural Path

**We will implement the `ManageUserAccess` UseCase pattern.**

*   **Design**: A single coordination UseCase `DbManageUserAccess` that orchestrates checks and updates.
*   **Persistence**: We will **extend the `LoginRepository` interface** to include `updatePassword(id: Id, passwordHash: string): Promise<void>`.
*   **Security**: Privilege checks (Actor vs Target, Actor vs New Role) will be hardcoded within the UseCase logic.

### Rejected Alternatives
*   **Rejected**: Modifying `UpdateUser` to handle credentials.
    *   *Reasoning*: Violates Single Responsibility Principle and confuses self-sevice profile updates with administrative actions.
*   **Rejected**: Creating separate `UpdateUserStatus`, `UpdateUserRole`, `UpdateUserPassword` endpoints for the generic modal.
    *   *Reasoning*: The UI presents these as a single logical "Save" operation. Atomicity is preferred here. UseCase reuse (like `BlockUser`) is permitted internally but the entry point must be unified.
*   **Rejected**: Creating a new `PasswordRepository`.
    *   *Reasoning*: Password is an intrinsic property of the Login aggregate. Separating it causes unnecessary fragmentation.

## 5. Implementation Details

### Interfaces
```typescript
export type ManageUserAccessParams = {
  actorId: string
  targetId: string
  roleId?: string
  status?: UserStatus
  password?: string
}

export interface ManageUserAccess {
  perform: (params: ManageUserAccessParams) => Promise<Either<Error, void>>
}
```

### Required Logic steps
1.  **Repo Extension**: Add `updatePassword` to `LoginRepository`. Implement in `LoginTypeOrmRepository`.
2.  **UseCase Implementation**: `DbManageUserAccess`.
    *   Guard: Actor exists & is Active.
    *   Guard: Target exists.
    *   Guard: Actor Level > Target Level.
    *   Logic: If `roleId` present -> Check Actor Level >= New Role Level -> Update Role.
    *   Logic: If `status` present -> Update Status.
    *   Logic: If `password` present -> Hash -> Update Password.
3.  **Controller**: `ManageUserAccessController`.
4.  **Factory**: `ManageUserAccessControllerFactory`.

## 6. Test Strategy
*   **Unit Tests (`DbManageUserAccess.spec.ts`)**:
    *   Test **Privilege Escalation**: Actor attempting to set Role higher than their own (Expect Error).
    *   Test **Unauthorized Modification**: Actor attempting to modify equal/higher power level Target (Expect Error).
    *   Test **Success**: Verify calls to `updateStatus`, `updateRole`, `updatePassword` on Repositories.
*   **Integration Tests**:
    *   Verify route is protected by `AuthMiddleware`.

## 7. GitFlow
*   **Branch**: `feature/manage-access-control`
*   **Type**: `feat`
