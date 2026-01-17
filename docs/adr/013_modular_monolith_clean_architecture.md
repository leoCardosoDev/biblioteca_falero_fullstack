# ADR 013: Modular Monolith with Clean Architecture

## Status
Accepted

## Context
As defined in [ADR 006](006_architectural_foundations.md), the system is divided into distinct Bounded Contexts (Geography, Identity, Access Control, etc.). However, without a strict physical architectural pattern, these contexts risk becoming entangled through ad-hoc dependencies.

A traditional layered architecture (Source Folder -> Layer -> Module) often leads to a "Distributed Core" where domain logic is fragmented across global directories (`src/domain`, `src/application`), making it difficult to isolate or extract specific business capabilities. Furthermore, broad access permissions between layers can result in "spaghetti execution flow" where Presentation layers bypass Application logic or Infrastructure details leak into the Domain.

## Decision
We adopt a **Modular Monolith** architecture combined with **Clean Architecture** principles as the governing technical standard.
This architecture is defined by the intersection of two axes:
1.  **Vertical Axis (Modular Architecture)**: High-level physical organization / isolation.
2.  **Horizontal Axis (Clean Architecture)**: Low-level dependency rules / separation of concerns.

### 1. Module Structure (Vertical Axis)
Each Bounded Context is implemented as a self-contained module within `src/modules/`. Each module functions as a "Mini Clean Architecture" system.

```text
src/
 ├─ modules/
 │   ├─ identity/           <-- Bounded Context
 │   │   ├─ domain/         <-- Enterprise logic (Entities, VOs)
 │   │   ├─ application/    <-- Application business rules (Use Cases)
 │   │   ├─ infra/          <-- Frameworks, Drivers, DB implementations
 │   │   └─ presentation/   <-- Interface Adapters (Controllers, API)
 │   │
 │   ├─ geography/
 │   └─ ...
 │
 ├─ shared/                 <-- True Cross-Cutting Concerns ONLY
 └─ main/                   <-- Composition Root (DI, Server, main router)
```

### 2. Dependency Rules (Horizontal Axis)
Within each module, the Dependency Rule is strictly enforced: **Source code dependencies can only point inward.**

*   **Domain**: Knows NOTHING about outer layers. No frameworks, no DB annotations, no HTTP logic.
*   **Application**: Defines Use Cases and Ports (Interfaces). Knows Domain. Knows NOTHING about UI or DB.
*   **Presentation**: Adapts input/output. Knows Application.
*   **Infrastructure**: Implements Ports defined in Application/Domain. Knows Application/Domain and External Frameworks.

### 3. Module Communication Rules
To preserve modularity, the following restrictions apply:

1.  **NO Direct Deep Imports**: A module cannot import internal code from another module (e.g., `identity` cannot import `geography/infra/Repo`).
2.  **Communication via Contracts**: Modules interact only through public Contracts/Gateways defined in the `application` layer or Shared Kernel.
3.  **No Shared Domain State**: Modules do not share database tables or Entity definitions directly. References are made via ID (Identifiers).

### 4. Enforcement Strategy
Architecture fidelity is not enforced by convention alone but by tooling:
*   **ESLint (eslint-plugin-boundaries)**: Protects against illegal imports (e.g., Domain importing Infra) and ensures module boundaries during development.
*   **Dependency Cruiser**: Validates the complete dependency graph in CI to detect cycles and indirect violation paths that ESLint cannot see.

## Consequences

### Positive
*   **High Cohesion**: Related code stays together. "Identity" logic is found in one folder, not scattered across 4 global folders.
*   **Loose Coupling**: Modules are decoupled. Changing the "Inventory" module has zero risk of breaking "Identity" logic if the Contract is maintained.
*   **Testability**: The Clean Architecture separation allows Domain and Application layers to be tested in isolation (Unit Tests) without mocking heavy infrastructure.
*   **Future Proofing**: If a module needs to become a Microservice, it is already physically isolated. Deployment is the only change required.

### Negative
*   **Boilerplate**: Requires defining explicit Interfaces/Ports and DTOs to cross boundaries.
*   **Learning Curve**: Developers must understand where logic belongs (Application vs Domain) and cannot take shortcuts (e.g., calling DB directly from Controller).
*   **Rigidity**: "Quick fixes" are harder to implement because the architecture forces correct placement of logic.

## Compliance
All new code MUST adhere to this structure. Existing code deviating from this pattern MUST be prioritized for refactoring during touchpoints.
