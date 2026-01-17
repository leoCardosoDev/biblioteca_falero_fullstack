# ADR 001: Frontend Clean Architecture Standard

## Status
Accepted

## Context
The interaction between Frontend and Backend requires a clear separation of concerns. The Frontend must not be tightly coupled to the specific unstable implementation details of the Backend (e.g., API URL changes, DTO format shifts).
We must apply Clean Architecture principles to the Frontend to ensure:
1.  **Framework Independence**: UI (React) is loosely coupled to Business Logic.
2.  **Testability**: Crucial logic can be unit tested without mounting React components.
3.  **Stability**: The "Application" shouldn't break just because an API route changed.

## Decision
The Frontend Application **MUST** follow a strict adaptation of Clean Architecture, separated into 4 distinct layers.

### 1. The Structure (Frontend)

```text
/src
 ├─ domain/         <-- Interface Definitions (Models & UseCases)
 ├─ data/           <-- App Logic (Implementations of UseCases) [Optional/Combined]
 ├─ infra/          <-- Gateway Implementations (Axios, LocalStorage)
 ├─ presentation/   <-- UI Components, Pages, Hooks
 └─ main/           <-- Composition Root (Factories)
```

### 2. Layer Rules

#### A. Domain Layer (`src/domain`)
*   **Responsibility**: Defines the **Contract** of the application.
*   **Contents**: Models (Interfaces), UseCases (Interfaces), and Errors.
*   **Dependencies**: **ZERO**. Pure TypeScript.
*   **Example**: `authentication.ts` (Interface), `account-model.ts` (Interface).

#### B. Infrastructure Layer (`src/infra`)
*   **Responsibility**: Implements external communication.
*   **Contents**: `AxiosHttpClient`, `LocalStorageAdapter`.
*   **Dependencies**: Depends on **Domain** (Models) and Third-Party Libraries (Axios).

#### C. Presentation Layer (`src/presentation`)
*   **Responsibility**: Render UI and handle user interaction.
*   **Contents**: React Components, Pages, Custom Hooks, Contexts.
*   **Dependencies**: Depends on **Domain** (Interfaces). **MUST NOT** depend on Infra.
*   **State Management**: Local state (useState) or Global state (Context/Zustand) belongs here.

#### D. Main Layer (`src/main`)
*   **Responsibility**: Composition Root. Connects layers.
*   **Contents**: Factories (`makeLoginPage`), Adapters, Decorators.
*   **Dependencies**: Depends on **ALL** other layers to wire them together.

### 3. Dependency Injection
The Frontend **MUST** use Dependency Injection (DI) to decouple Components from Implementations.
*   **factories**: All instantiation happens in `src/main/factories`.
*   **injection**: Pages receive UseCases as props or via Context, strictly typed as the **Domain Interface**, never the concrete class.

## Consequences

### Positive
*   **Decoupling**: You can swap `Axios` for `Fetch` by changing 1 class in `infra` and 1 factory in `main`. The UI never knows.
*   **Mocking**: Testing the UI is trivial; just inject a `SpyAuthentication` implementation of the Domain interface.

### Negative
*   **Indirection**: Requires creating interfaces for interactions that might feel "simple" (like login).
*   **Files**: Minimum 3 files for a feature (Interface, Implementation, Factory).

## Compliance
New Frontend features **MUST** define their UseCases in `domain` before writing any React code.
Direct calls to `axios` or `fetch` inside React Components are **FORBIDDEN**.
