# ADR 006: Strategic Context Map & Foundations

## Status
Accepted

## Context
To ensure the **Modular Monolith** remains modular, we must explicitly define the Bounded Contexts and their relationships. Ambiguity in domain boundaries leads to logic leakage and entanglement.
We also establish the **language** of the code to prevent "Spanglish" debt.

## Decision
We enforce the following Strategic Design decisions.

### 1. The Context Map (Modules)
The application is composed of the following **Immutable Bounded Contexts**:

| Module Name | Responsibilities | Key Aggregates |
| :--- | :--- | :--- |
| **Identity** | Civil Identity, Personal Data | `User`, `Address` (VO) |
| **AccessControl** | AuthN, AuthZ, Security | `Login`, `Role`, `Permission` |
| **Geography** | Locations, Regional Data | `State`, `City`, `Neighborhood` |
| **Catalog** | Bibliographic Management | `Work`, `Author`, `Publisher`, `Subject` |
| **Inventory** | Physical Assets | `WorkCopy` (The Book item) |
| **Circulation** | Lending & Returns | `Loan`, `Reservation` |
| **Unit** | Library Branches | `Unit` |

**Rule**: Any new feature must fit into one of these contexts. If it does not, a new Context must be proposed via RFC/ADR.

### 2. Ubiquitous Language
**ENGLISH ONLY**.
*   All code (Classes, Variables, Database Tables, Columns) **MUST** be in English.
*   **Forbidden**: `Usuario`, `Livro`, `Emprestimo`.
*   **Mandatory**: `User`, `Work`/`Book`, `Loan`.
*   **Reason**: Consistency and international standard.

### 3. Shared Kernel Strategy
We use a **Shared Kernel** (`src/shared`) for:
*   **True Generic Code**: `Either` pattern, `AppError`, `Entity` base class.
*   **Cross-Cutting Concerns**: `Logger`, `DateProvider`.
*   **Bounded Contexts that became Generic**: `Geography` is largely a lookup service used by everyone, so it sits on the boundary of a distinct module and a Shared Kernel service.

## Consequences

### Positive
*   **Clarity**: Everyone knows where code belongs. "Book ISBN" -> Catalog. "Book Barcode" -> Inventory.
*   **Parallelism**: Teams can own specific contexts.

### Negative
*   **Integration**: Features crossing boundaries (e.g., "Loan a Book") require orchestration (Use Cases in Main or overarching Sagas).

## Compliance
**Strict Enforcement**: Database tables must follow the naming convention (snake_case, English). No `creation_data` (Portuguese mix) -> `created_at`.
