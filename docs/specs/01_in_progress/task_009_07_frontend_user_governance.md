# Task 009.7: Frontend Feature - User Governance

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<context>
Admins need to govern user access (Block/Unblock, Promote/Demote, Delete).
</context>

<objectives>
1.  Implement **Delete User** (Soft Delete).
2.  Implement **Block/Unblock User** (Status).
3.  Implement **Promote/Demote User** (Role).
</objectives>

<endpoints>
- `DELETE /users/:id`
- `PATCH /users/:id/status` (Body: `{ status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE' }`)
- `PATCH /users/:id/role` (Body: `{ roleId: UUID }` - Note: Endpoint might accept role name or ID, check schema. Schema says `roleId` UUID. Need to map Roles to IDs in frontend).
</endpoints>

<scope>
## 1. Data Layer
- [ ] Implement `RemoteDeleteUser`.
- [ ] Implement `RemoteUpdateUserStatus`.
- [ ] Implement `RemoteUpdateUserRole`.

## 2. Main Layer
- [ ] Create factories for above usecases.
- [ ] Inject into `UserList` factory.

## 3. Presentation Layer
- [ ] **Delete Action**: Confirmation Modal.
- [ ] **Block/Unblock Action**: Toggle or Menu Action.
- [ ] **Manage Role Action**: Modal or Dropdown.
</scope>
