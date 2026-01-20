# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_01_shared.md`
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_02_identity.md`
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_03_library.md`
</dependent_tasks>

<context>
The `Reports` module likely involves data fetching and visualization. Strictly decouple the fetching/processing (Application) from the caching/network (Infra).

**Summary of Previous Work:**
1. **Task 1 (Shared)**: Strictly layered foundation; `react-router-dom` removed (replaced by `TanStack Router`); `shared/application` is pure.
2. **Task 2 (Identity)**: Strictly decoupled module; Application layer is now pure (no `zustand` or `react-query`); state and hooks moved to `infra` adapters and stores.
3. **Task 3 (Library)**: Strictly layered module; Application layer purified (no React hooks/Query logic); Uses pure UseCases and LibraryRepository interface; Query Adapters implemented in Infra layer; Presentation uses wired hooks. Verified with 0 violations.
</context>

<scope>
1.  **Application Layer Refactoring** (`src/modules/reports/application`):
    *   **Protocols**: `ReportsRepository`.
    *   **UseCases**: `GenerateReportUseCase`, `GetDashboardStatsUseCase`.
    *   **Pure Logic**: Any data transformation for charts should be here (or in Domain Services), NOT in the Component.

2.  **Infra Layer Implementations** (`src/modules/reports/infra`):
    *   **Repository Impl**: `HttpReportsRepository`.
    *   **Adapters**: `useReportsQuery`.

3.  **Presentation Implementation**:
    *   Components receive data via Adapters.
    *   Ensure Charting libraries (if any) are kept in Presentation, but data prep is Domain/App.

4.  **Routing**:
    *   `TanStack Router` usage.
</scope>

<requirements>
- **Stack**: TypeScript, React.
- **Negative Constraints**:
    *   Application layer: NO `react-query`, `axios`.

<technical_constraints>
1.  **Interface Naming**: Interfaces in `application/protocols` MUST NOT use the `I` prefix (e.g., `ReportsRepository`).
2.  **DTO Separation**: Distinct DTOs for API Response vs Application View Models. Reports often have complex transformations.
3.  **Computed State**: Heavy calculations should be in Application Services, not in React Render cycle.
</technical_constraints>
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Architecture: `reports/application` pure TS.
- [ ] Implementation: Data fetching is abstracted.
- [ ] Feature: Reports visible and correct.
</acceptance_criteria>

<output>
1. **Summary**: Reports module decoupled.
2. **Decisions**: Chart logic optimization deferred to Presentation, but data logic in App.
3. **Manual Test Guide**: View Dashboard/Reports.
</output>
