# ADR 014: Frontend Modular Monolith Architecture

## Status
Accepted

## Context
The frontend currently uses a Layered Architecture (`src/presentation`, `src/domain`, `src/infra`). While this separates concerns, it does not spatially decouple distinct business capabilities. As the application grows, features become entangled, and it is difficult to identify which code belongs to which domain.
The backend has already successfully adopted a Modular Monolith structure (ADR 013). To maintain symmetry and "Screaming Architecture", the frontend should mirror this structure.

## Decision
We will restructure the frontend into a **Modular Monolith**.

### 1. The Structure
The `src/` directory will be organized into:
```text
src/
 ├─ modules/          <-- Bounded Contexts (Features)
 │   ├─ identity/
 │   └─ geography/
 ├─ shared/           <-- Shared Kernel (Generic UI, Utils)
 │   ├─ ui/
 │   └─ lib/
 ├─ main/             <-- Composition Root (Routes, App Entry)
 └─ infra/            <-- Global Infrastructure (optional, mostly moved to shared/modules)
```

### 2. Module Internal Structure
Each module MUST follow Clean Architecture internally, acting as a mini-application:
```text
src/modules/identity/
 ├─ domain/           <-- Pure Business Logic (Interfaces, Entities)
 ├─ application/      <-- Use Cases (No UI)
 ├─ infra/            <-- API Clients, Storage Adapters
 ├─ presentation/     <-- React Components, Pages
 └─ public/           <-- The ONLY public exports allowed
```

### 3. Module Boundaries
*   **Rules**:
    *   Modules **MUST NOT** import from other modules' internal paths (e.g., `modules/a/domain` cannot import `modules/b/domain`).
    *   Modules **MAY** import from `shared`.
    *   `main` **MAY** import from any module (to compose routes).
    *   Cross-module communication **MUST** happen via the **Public API** (`index.ts` in module root or `public` folder).

### 4. Shared Kernel (`src/shared`)
*   Contains generic code ONLY (e.g., `Button`, `Dialog`, `HttpClient` interface).
*   **MUST NOT** contain domain-specific business rules.

## Consequences

### Positive
*   **Symmetry**: Usage of similar mental models for Frontend and Backend.
*   **Decoupling**: Features can be modified, tested, or deleted in isolation.
*   **Ownership**: Clear boundaries for code ownership.
*   **Refactoring**: Easier to migrate a module to a Micro Frontend if needed in distant future.

### Negative
*   **Boilerplate**: Each module repeats the Clean Architecture layers.
*   **Complexity**: Requires stricter linting rules (enforced by `eslint-plugin-boundaries`).

## Compliance
*   **Linting**: CI MUST fail if module boundaries are violated.
*   **Review**: New features must be placed in `src/modules/{feature}`.
