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
- [ ] Implement `RemoteLoadAddressByZipCode` (HttpAdapter -> GET /addresses/cep/:zipCode).
- [ ] Payload (Add User): 
    - Name, Email, RG, CPF, Gender, Phone.
    - Address (Optional but recommended):
        - `zipCode`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`.
        - `neighborhoodId`, `cityId` (auto-filled from ZipCode lookup).

## 2. Main Layer
- [ ] Create `makeRemoteAddUser` and `makeRemoteLoadAddressByZipCode` factories.
- [ ] Inject into `UserList` / `UserForm` factory.

## 3. Presentation Layer
- [ ] Update `UserForm` to collect strict fields.
- [ ] Ensure validation matches Backend rules (CPF/RG format).
</scope>
