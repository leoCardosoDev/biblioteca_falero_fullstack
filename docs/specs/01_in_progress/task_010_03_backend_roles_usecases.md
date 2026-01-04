# Task 010.3: Backend - Business Logic & Permissions

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<context>
Currently, `DbAddUserLogin` allows creation of any role without checking the requestor's authority. We need to enforce independent hierarchy rules: An actor can only Create/Manage users with strictly lower power level.
</context>

<objectives>
1.  Secure User Creation (`AddUser`).
2.  Enforce Hierarchical Access Control (Power Level > Target Level).
</objectives>

<scope>
## 1. Use Case Refactor
- [ ] Refactor `DbAddUser` / `DbAddUserLogin`:
    - Inject `actorId` into the input params (passed from Controller).
    - Retrieve `Actor` (User/Login) and their `Role`.
    - Retrieve `Target Role` (from input).
    - **Logic**: `if (Actor.PowerLevel <= Target.PowerLevel) throw AccessDeniedError`.

## 2. Adaptation
- [ ] Update Controllers (`AddUserController`, `CreateUserLoginController`) to extract `userId` from the request (token) and pass it as `actorId`.
</scope>
