# STATUS: COMPLETED
# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
System Architect
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `shared` module currently provides common utilities, but the application layer across the monolith is heavily coupled to infrastructure libraries (`react-router-dom`, `@tanstack/react-query`, `zustand`, `axios`). We need to enforce strict boundaries starting with the shared foundation and global dependencies.
</context>

<scope>
1.  **Dependency Cleanup**:
    *   **Uninstall**: `react-router-dom` (ensure no usage remains in `shared` or root).
    *   **Install**: `playwright` (dev dependency).
    *   **Verify**: Ensure `axios` is NOT exported from `shared` directly; only via `HttpClient`.

2.  **Shared Adapters & Abstractions**:
    *   **Protocols**: Ensure `shared/application` defines strict interfaces for any shared services (e.g., `Logger`, `HttpClient`).
    *   **Infra**: Ensure `shared/infra` implements these using `axios` (hidden).
    *   **State/Query Abstractions**:
        *   Create `shared/infra/adapters/QueryAdapter.ts` (or similar strategies if needed, though mostly this is per-module).
        *   If `shared` uses any state, move it to `infra`.

3.  **Global Enforcement Prep**:
    *   Ensure `dependency-cruiser` acts on these new rules (though actual config might be in a separate task, we should at least ensure shared complies).

4.  **Routing**:
    *   Ensure `shared/presentation` uses `TanStack Router` primitives if any linking is needed.
</scope>

<requirements>
- **Stack**: TypeScript, React, TanStack Router, Playwright.
- **Negative Constraints**:
    *   NO `react-router-dom`.
    *   `shared/application` MUST NOT import `axios`, `zustand`, `@tanstack/react-query`.
    *   `shared/domain` MUST NOT import *anything* from infra or libraries.

<technical_constraints>
1.  **Interface Naming**: Interfaces in `application/protocols` MUST NOT use the `I` prefix (e.g., `Logger` not `ILogger`).
2.  **Explicit Dependency Injection**: `shared` modules typically don't have a container, so manual DI or functional composition in `infra` adapters is preferred.
3.  **No React in Domain/Application**: These layers must be testable in Node.js environment (no browser globals).
</technical_constraints>
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Dependencies: `pkg.json` does not contain `react-router-dom`.
- [x] Dependencies: `playwright` is installed.
- [x] Architecture: `shared/application` has 0 imports from `axios`, `zustand`, `@tanstack/*`.
- [x] Architecture: `shared/infra` contains the implementation details for HTTP/Storage.
</acceptance_criteria>

<output>
1. **Summary**: Shared module is strictly layered and global dependencies are cleaned.
2. **Decisions**: Removed `react-router-dom` in favor of `TanStack Router`.
3. **Manual Test Guide**: Run build and verify no missing package errors.
</output>
