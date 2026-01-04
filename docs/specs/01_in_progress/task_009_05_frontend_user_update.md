# Task 009.5: Frontend Feature - Edit User

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<context>
Admins need to update user information.
</context>

<objectives>
1.  Implement **Edit User** functionality.
</objectives>

<endpoints>
- `PUT /users/:id`
</endpoints>

<scope>
## 1. Data Layer
- [ ] Implement `RemoteUpdateUser` (HttpAdapter -> PUT /users/:id).
- [ ] Payload: Name, Email, Role, Gender, Phone. (Note: Address update might be missing in PUT /users/:id based on schema analysis, verify if needed).

## 2. Main Layer
- [ ] Create `makeRemoteUpdateUser` factory.
- [ ] Inject into `UserList` factory.

## 3. Presentation Layer
- [ ] Update `UserForm` to handle "Edit Mode".
</scope>
