
# TASK-APP-001: Clean Architecture - AddUser Use Case

**Role**: Principal Software Architect / Staff Engineer

## 🧩 Task ID
**TASK-APP-001**

## ❗ Problem (Current State)
The `DbAddUser` use case (`src/application/usecases/db-add-user.ts`) contains orchestration logic that belongs in the Domain or Factory.
-   **Why it is wrong**: It manually creates `Address` VOs, handles Geo Entity lookup logic mixed with business rules, and manually triggers `DomainEvents`.
-   **Where**: `src/application/usecases/db-add-user.ts`.
-   **Violation**: Clean Architecture - Use Cases should orchestrate, not implement core domain factories.

## 🎯 Objective
Simplify `DbAddUser` to primarily coordinate the Repository and the Domain Entity. Complex creation logic (like resolving Geo IDs) should be encapsulated in a Domain Service or the factory itself if possible (though Geo lookup is likely a Domain Service concern).

## 🔧 What Needs to Be Done
1.  **Refactor Geo Logic**: The `GetOrCreateGeoEntityService` usage is fine, but the orchestration regarding *when* to call it and how to bind it to `Address` could be cleaner.
2.  **Delegate Creation**: Use the new `User.create` (from TASK-DDD-001) to handle the User creation and Event generation.
3.  **Remove Manual Event Calls**: The Use Case should just call `user.pullEvents()` or similar, or the Repository should handle saving events if using that pattern, but `DbAddUser` shouldn't be manually constructing the `UserCreated` payload if possible.

## 🔄 Impact Analysis
-   **Used by**: `AddUserController`.
-   **Dependencies**: `AddUserRepository`, `LoadUserBy...`.
-   **Risk**: Medium. Logic movement must ensure no business rule is dropped.

## 🧭 Safe Migration Strategy (NON-NEGOTIABLE)
1.  **Wait for TASK-DDD-001**: This depends on the `User` class being available.
2.  **Refactor Internal**: Modify the body of `add()` method. Input/Output signatures can remain the same (Primitive/DTO in, DTO out).
3.  **Test**: Run existing tests for `DbAddUser`. They should pass without modification if the contract is strictly kept.

## ✅ Acceptance Criteria
-   [ ] `DbAddUser` does NOT manually instantiate `UserCreated` event payload.
-   [ ] `DbAddUser` delegates creation to `User` aggregate.
-   [ ] Tests pass.
