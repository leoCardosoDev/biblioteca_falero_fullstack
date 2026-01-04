# Task 009.4: Frontend Feature - Create User

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<context>
Admin/Librarians need to register new users (Students, Teachers, etc.).
</context>

<objectives>
1.  Implement **Create User** functionality.
</objectives>

<endpoints>
- `POST /users`
</endpoints>

<scope>
## 1. Data Layer
- [ ] Implement `RemoteAddUser` (HttpAdapter -> POST /users).
- [ ] Payload: Name, Email, RG, CPF, Gender, Phone, Address (optional), Status (defaults ACTIVE in backend).

## 2. Main Layer
- [ ] Create `makeRemoteAddUser` factory.
- [ ] Inject into `UserList` factory.

## 3. Presentation Layer
- [ ] Update `UserForm` to collect strict fields.
- [ ] Ensure validation matches Backend rules (CPF/RG format).
</scope>
