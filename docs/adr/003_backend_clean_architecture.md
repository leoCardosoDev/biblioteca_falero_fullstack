# ADR 003: Inner Module Architecture Standard

## Status
Accepted

## Context
The application follows a **Modular Monolith** architecture (defined in [ADR 013](013_modular_monolith_clean_architecture.md)).
While ADR 013 defines the high-level physical organization (`src/modules/<context>`), it is necessary to mandate exactly how code is organized *inside* each module to prevent structural decay ("Distributed Monolith" or "Spaghetti Code").

Previous approaches allowed for loose interpretation of layers, leading to inconsistent folder structures across modules. A deterministic standard is required to ensure traversability and maintainability.

## Decision
Every Bounded Context module located in `src/modules/` **MUST** strictly adhere to the following 4-layer Clean Architecture structure.
Existing layers are MANDATORY unless the module is a "Shared Kernel" (which may have a simplified structure).

### 1. The Structure
Inside `src/modules/<module-name>/`:

```text
/domain         <-- Enterprise Logic (The Core)
/application    <-- functionality (Use Cases)
/presentation   <-- Interface Adapters (HTTP/Console)
/infra          <-- Detail Implementations (DB/External)
```

### 2. Layer Definitions & Rules

#### A. Domain Layer (`src/modules/<module>/domain`)
*   **Responsibility**: Encapsulate Enterprise Business Rules.
*   **Contents**: Entities, Value Objects, Domain Services, Domain Events, Repository Interfaces (contracts).
*   **Dependencies**: **ZERO**. Must be pure TypeScript. No references to external libraries (ORM, HTTP, Frameworks).
*   **Enforcement**: Use `eslint-plugin-boundaries` to ban all imports except standard library.

#### B. Application Layer (`src/modules/<module>/application`)
*   **Responsibility**: Application specific business rules. Orchestra data flow.
*   **Contents**: Use Cases (Service Classes), DTOs (Input/Output), Gateway Interfaces (Contracts for Infra).
*   **Dependencies**: Depends ONLY on **Domain**.
*   **Enforcement**: CANNOT import from `presentation` or `infra`.

#### C. Presentation Layer (`src/modules/<module>/presentation`)
*   **Responsibility**: Adapt external input (HTTP Requests, CLI) to Application Use Cases.
*   **Contents**: Controllers, Presenters, ViewModels, Validation Composites.
*   **Dependencies**: Depends on **Application** (to call Use Cases) and **Domain** (for Types).
*   **Enforcement**: MUST NOT implement business logic. MUST NOT access Database directly.

#### D. Infrastructure Layer (`src/modules/<module>/infra`)
*   **Responsibility**: Implement interfaces defined in Domain/Application.
*   **Contents**: Repositories (TypeORM/Prisma), Adapters (Bcrypt, JWT), External API Clients.
*   **Dependencies**: Depends on **Domain** (Entities) and **Application** (Repository Interfaces).
*   **Enforcement**: This is the ONLY layer allowed to import low-level drivers (database drivers, crypto libs).

### 3. Dependency Rule
**Source Code Dependencies MUST always point inward.**
*   `Infra` -> `Application` -> `Domain`
*   `Presentation` -> `Application` -> `Domain`

## Consequences

### Positive
*   **Consistency**: Every module looks the same. A developer moving from "Identity" to "Catalog" sees the exact same folder structure.
*   **Testability**: Domain and Application layers are 100% unit-testable without mocking complex infrastructure.
*   **Isolation**: Frameworks (Fastify, TypeORM) are confined to the outer edges (`infra`, `presentation`).

### Negative
*   **Boilerplate**: Simple CRUD operations require 4 layers of files (Controller -> UseCase -> Repository Interface -> Repository Implementation).
*   **Rigidity**: "Quick hacks" are explicitly forbidden by the directory structure.

## Compliance
**Automated Enforcement**: CI pipeline must reject any Pull Request that introduces files outside this folder structure within `src/modules/`.
