# ARCHITECTURAL REVIEW REPORT

**Date**: 2026-01-06
**Scope**: `app/backend`
**Reviewer**: Principal Software Architect (AI)

## ❌ Critical Issues
_Issues that threaten architecture or business correctness._

1.  **Anemic Domain Model**: The `User` entity is an `interface`, lacking behavior. Invariants are unprotected, leading to scattered validation logic.
    *   *Violation*: DDD / Clean Architecture.
2.  **Controller as Domain Factory**: `AddUserController` instantiates Value Objects (`Name.create`, etc.), effectively leaking domain factory responsibility to the Presentation Layer.
    *   *Violation*: Layer Boundaries (Presentation -> Domain internals).
3.  **Repository Business Logic**: `UserTypeOrmRepository` re-validates domain objects upon retrieval using `create` methods. This creates a risk of data intractability if business rules change.
    *   *Violation*: Infrastructure leaks (Persistence shouldn't validate on read).

## ⚠️ Design Smells
_Long-term maintainability risks._

1.  **Use Case Orchestration Leak**: `DbAddUser` manually constructs `DomainEvents` payloads and handles granular object creation, which should be delegated to the Aggregate Root or a Domain Service.
2.  **Inconsistent Error Handling**: Mixed use of `try/catch` and `instanceof Error` for Value Object creation across the codebase.
3.  **Primitive Obsession in Interfaces**: Use Cases and Repositories mix VOs and primitives in their signatures, leading to confusion about who is responsible for conversion.

## 🧠 Architectural Observations
-   **Standard Structure**: The folder structure (`domain`, `application`, `infra`, `presentation`) is correct and Clean Architecture compliant in *form*, but the *content* violates the separation of concerns.
-   **Value Objects**: Usage of Value Objects (`Name`, `Email`, etc.) is good, but their instantiation is happening in the wrong places (Controllers/Repos instead of Domain/Application).

## 🛠️ Correction Tasks
The following granular tasks have been created to address these issues:

| Task ID | Description | Priority |
| :--- | :--- | :--- |
| [TASK-DDD-001](./TASK-DDD-001_rich_user_model.md) | **Rich Domain Model**: Convert User to Class, encapsulate logic. | High |
| [TASK-APP-001](./TASK-APP-001_clean_add_user.md) | **Clean Use Case**: Refactor AddUser to delegate creation to Domain. | High |
| [TASK-INFRA-001](./TASK-INFRA-001_repository_cleanup.md) | **Repo Cleanup**: Remove VO validation on read, use dumb mapping. | Medium |
| [TASK-PRES-001](./TASK-PRES-001_controller_decoupling.md) | **Controller Decoupling**: Pass DTOs/Primitives to Use Case. | Medium |

## ✅ What Is Acceptable (Minimal)
-   The system works, but it is fragile to changes in business rules and has high coupling between layers.
-   The proposed tasks will move the specific logic (validation, events, factory) to the Domain layer, making the outer layers (Infra, Presentation) thinner and safer.
