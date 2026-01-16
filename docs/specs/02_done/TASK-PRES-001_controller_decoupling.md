# TASK-PRES-001: Presentation - Controller Decoupling

**Role**: Principal Software Architect / Staff Engineer

## 🧩 Task ID
**TASK-PRES-001**

## ❗ Problem (Current State)
The `AddUserController` (`src/presentation/controllers/add-user-controller.ts`) manually instantiates Domain Value Objects (`Name.create`, etc.).
-   **Why it is wrong**: The Controller is coupled to the Domain's specific factory methods and validation logic. It essentially acts as part of the Domain.
-   **Where**: `src/presentation/controllers/add-user-controller.ts`.
-   **Violation**: Layer Boundaries. Presentation should parse request -> DTO -> UseCase.

## 🎯 Objective
Refactor `AddUserController` to pass raw data (or a simple DTO) to the `AddUser` Use Case.

## 🔧 What Needs to Be Done
1.  **Update Use Case Interface**: Ensure `AddUser` interface accepts `AddUserParams` that are primitives/DTOs, NOT Value Objects. (It seems `AddUserParams` currently expects VOs, which forces the Controller to create them).
2.  **Refactor Interface**: Change `AddUserParams` in `src/domain/usecases/add-user.ts` to use `string` instead of `Name`, `Email`, etc.
3.  **Update Controller**: Remove `Name.create`, etc., from `AddUserController`. Pass `httpRequest.body` fields directly to `this.addUser.add()`.
4.  **Move Validation**: The validation happens inside `User.create` (called by Use Case). If it fails, the Use Case returns/throws an Error, which the Controller catches and maps to HTTP 400.

## 🔄 Impact Analysis
-   **Used by**: `AddUser` route.
-   **Dependencies**: Use Case contracts.
-   **Risk**: Medium. Changing the Use Case interface requires updating the implementation (`DbAddUser`) simultaneously.

## 🧭 Safe Migration Strategy (NON-NEGOTIABLE)
1.  **Parallel Interface**: Create `AddUserParamsDTO` vs `AddUserParamsVO` if needed, but better to just switch the Use Case implementation to accept primitives.
2.  **Update Implementation**: Update `DbAddUser` to accept primitives and create VOs internally (Task APP-001).
3.  **Update Controller**: Simplify Controller.

## ✅ Acceptance Criteria
-   [ ] `AddUserController` contains NO imports from `domain/value-objects/*.ts` (except maybe types if really needed, but preferably not).
-   [ ] Controller responsibility is limited to HTTP parsing and Validating (basic schema) -> Call Use Case -> Format Response.
