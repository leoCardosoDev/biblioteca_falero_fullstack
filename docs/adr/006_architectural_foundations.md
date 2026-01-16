# ADR 006: Strategic Domain Design & Global Conventions

## Status
Accepted

## Context
The project requires a scalable, enterprise-grade architecture capable of growing without technical debt. Previous iterations had mixed naming conventions (English/Portuguese) and loose domain boundaries. The database schema has been refactored to support a strict DDD approach.

## Decision
We explicitly adopt the following **3 Pillars of Architecture**:

### 1. DDD First (Strategic Design)
The system is divided into strict **Bounded Contexts** to decouple complexity. Using the *Shared Kernel* pattern for common structures.

#### Context Map
*   **Geography (Shared Kernel)**: State, City, Neighborhood.
*   **User (Identity)**: Person data, Address (VO), independent of credentials.
*   **Access Control (Auth)**: Login, Role, Permission (RBAC).
*   **Unit**: Physical libraries/schools.
*   **Catalog**: Bibliographic data (Work, Author, Publisher).
*   **Inventory**: Physical copies (WorkCopy).
*   **Circulation**: Loans and Reservations.
*   **Communication**: Messages/Support.

### 2. Ubiquitous Language (English Only)
All code, database tables, columns, enums, files, and documentation (where possible/technical) MUST use **English**.
*   *Tables*: `user`, `role`, `permission` (NOT `usuario`, `grupo`).
*   *Code*: `UserService`, `LoanRepository` (NOT `UsuarioService`).
*   *Reasoning*: Unifies the codebase, standardizes library usage, and aligns with international standards.

### 3. Rich Domain Models & Value Objects
We reject "Anemic Models". Validations and business logic reside in the Domain Entities and Value Objects (VO).

#### Address as a Value Object
*   Address is NOT an entity. It does not have an ID.
*   It is embedded in aggregates (User, Unit) as a set of columns (`address_street`, `address_number`, etc.).
*   *Implication*: We do not have an `addresses` table. We treat address as an immutable property of the root entity.

#### Other VOs
*   `CPF`, `CNPJ`, `Email`, `ISBN` are Value Objects with self-validation regex logic.

## Consequences
*   **Consistency**: No more guessing if a table is `tb_usuario` or `users`.
*   **Maintainability**: Bounded contexts allow teams to work in parallel without stepping on toes (e.g., Catalog team vs Circulation team).
*   **Performance**: Embedding Value Objects (Address) avoids unnecessary joins.
