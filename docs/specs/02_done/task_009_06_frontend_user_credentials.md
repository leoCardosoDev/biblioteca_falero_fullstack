# Task 009.6: Frontend Feature - User Credentials

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<context>
Users need login credentials to access the system. Credentials (Login) are separate from User Profile.
</context>

<objectives>
1.  Implement **Add User Login** functionality.
</objectives>

<endpoints>
- `POST /users/:userId/login`
</endpoints>

<scope>
## 1. Data Layer
- [ ] Implement `RemoteAddUserLogin` (HttpAdapter -> POST /users/:userId/login).
- [ ] Payload: `password` (Username is not required, Backend uses Email from User).

## 2. Main Layer
- [ ] Create `makeRemoteAddUserLogin` factory.
- [ ] Inject into `UserList` factory.

## 3. Presentation Layer
- [ ] Refactor `CredentialModal`.
- [ ] **Remove Username Input**: Display User's Email as read-only.
- [ ] **Password Validation**: Ensure strong password rules (8 chars, upper, lower, number, special).
</scope>
