# TASK-DDD-001: Rich Domain Model - User Aggregate

**Role**: Principal Software Architect / Staff Engineer

## 🧩 Task ID
**TASK-DDD-001**

## ❗ Problem (Current State)
The `User` entity (`src/domain/models/user.ts`) is currently defined as a TypeScript `interface`, not a class.
-   **Why it is wrong**: This constitutes an **Anemic Domain Model**. The data is separated from the behavior. Validation logic and invariants are scattered across Use Cases and Controllers.
-   **Where**: `src/domain/models/user.ts`.
-   **Violation**: DDD Principle - Aggregate Roots must encapsulate state and behavior.

## 🎯 Objective
Transform the `UserModel` interface into a rich `User` class (Aggregate Root) that protects its invariants and encapsulates business logic (e.g., event dispatching, state transitions).

## 🔧 What Needs to Be Done
1.  **Rename**: Rename `UserModel` to `UserProps` or keep as `User` interface for DTO/Persistence.
2.  **Create Entity**: Create a `User` class in `src/domain/entities/user.ts` (create the directory if missing).
3.  **Implement Factory**: Add a static `create()` method to the class to handle validation and event generation (`UserCreated`).
4.  **Encapsulate**: Make properties private/readonly, exposing only necessary getters.
5.  **Move Logic**: Move logic from `DbAddUser` (handling events) into the `User.create` method.

## 🔄 Impact Analysis
-   **Used by**: Almost all Use Cases (`DbAddUser`, `DbLoadUsers`, etc.) and Repositories.
-   **Dependencies**: Controllers depend on the `UserModel` interface.
-   **Risk**: High. Changing the return type of Use Cases from an interface to a Class instance might break object spreading (`...user`) or serialization if not handled carefully.

## 🧭 Safe Migration Strategy (NON-NEGOTIABLE)
1.  **Parallel Creation**: Create the `User` class in a new file `src/domain/entities/user.ts` without deleting the old interface yet.
2.  **DTO Separation**: Ensure the Use Cases return a DTO (plain object/interface) to the Controller, while using the `User` class internally.
3.  **Refactor Use Case**: Update `DbAddUser` to instantiate the `User` class, but map it back to `UserModel` (or a new DTO) before returning, to maintain backward compatibility with Controllers.
4.  **Incremental Adoption**: Migrate other Use Cases one by one.

## ✅ Acceptance Criteria
-   [ ] `src/domain/entities/user.ts` exists as a class.
-   [ ] `User.create(...)` returns a valid User instance or Error.
-   [ ] `User` class handles `UserCreated` domain event internally (if creating new).
-   [ ] `DbAddUser` uses `User` class but returns a compatible structure.
