# Task: Refactor User Access Management UI (Frontend)

## 1. Scope
Refactor the Frontend User Management interface to strictly separate "Profile Data" (Name, Email, etc.) from "Access Credentials" (Role, Password, Status). This task involves removing the Status field from the User Form and implementing the Status management within the "Gerenciar Acesso" modal.

## 2. Motivation
Currently, User Status can be edited in the User Form, which is primarily for demographic data. Changing status is a security operation that belongs with Credential Management (Passwords/Roles). Fixing this separation enhances security and UX clarity.

## 3. Impact Analysis

### User Lifecycle Impact Analysis
*   **List Users**:
    *   *Code Changes*: None. Status visualization remains essential.
    *   *Layer*: Unaffected.
    *   *Tests*: Unchanged.
*   **Create User**:
    *   *Code Changes*: `UserForm`: Remove `UserAccessControl` section. New users will default to `ACTIVE` (backend default).
    *   *Layer*: Presentation.
    *   *Tests*: Remove tests that verify "Status" field existence in `UserForm.spec.tsx`.
*   **Update User**:
    *   *Code Changes*: `UserForm`: Remove `UserAccessControl` section. `UserListController`: No longer sends `status` when calling `updateUser`.
    *   *Layer*: Presentation.
    *   *Tests*: Update `UserForm.spec.tsx` to ensure `status` is NOT present. Verify `RemoteUpdateUser` calls.

### Layer Dependency Impact Simulation
*   **Presentation (Components)**:
    *   *Change*: `CredentialModal` receives new props and logic for Status. `UserAccessControl` component is **deleted**.
    *   *State*: Validations for password must remain, validation for Status is added.
*   **Presentation (Gateways)**:
    *   *Change*: `UserGateway` interface adds `manageAccess(id: string, params: ManageAccessParams): Promise<void>`.
*   **Infra (Http)**:
    *   *Change*: `RemoteUser` (or `RemoteAccess`) implements the call to `POST /users/:id/access`.

## 4. Chosen Architectural Path

**We will implement a dedicated `RemoteManageUserAccess` flow.**

*   **Design**: The `CredentialModal` will use a new method `manageAccess` on the `UserGateway`.
*   **Refactoring**: We will **delete** `UserAccessControl.tsx` entirely to prevent zombie code.
*   **API Integration**: It will consume the new backend endpoint `POST /users/{id}/access`.

### Rejected Alternatives
*   **Rejected**: Overloading `RemoteUpdateUser` to handle access changes.
    *   *Reasoning*: The backend endpoint for profile updates is separate. Mixing them causes coupling.
*   **Rejected**: Hiding `UserAccessControl` with CSS or flags.
    *   *Reasoning*: Dead code must be removed to maintain codebase health.
*   **Rejected**: Keeping Status in User Form.
    *   *Reasoning*: Explicitly violates the separation of concerns goal of this task.

## 5. Implementation Details

### UI Logic
1.  **User Form**:
    *   Remove `<UserAccessControl />` and checks.
    *   Update `user-schema.ts` to remove `status`.
2.  **Credential Modal (renamed to Gerenciar Acesso)**:
    *   Add `Select` for `ACTIVE | INACTIVE | BLOCKED`.
    *   Bind to `ManageAccessParams.status`.
    *   Validation: `status` is required.

### Gateway Logic
```typescript
// UserGateway.ts
manageAccess: (id: string, params: ManageAccessParams) => Promise<void>
```

## 6. Test Strategy
*   **Unit Tests (`CredentialModal.spec.tsx`)**:
    *   Test rendering of Status select.
    *   Test validation (all fields valid).
    *   Test invocation of `onSave` with `role`, `status`, `password`.
*   **Unit Tests (`UserForm.spec.tsx`)**:
    *   **Crucial**: Verify that `Status` input is **absent**.

## 7. GitFlow
*   **Branch**: `feature/manage-access-control`
*   **Type**: `feat/refactor`
