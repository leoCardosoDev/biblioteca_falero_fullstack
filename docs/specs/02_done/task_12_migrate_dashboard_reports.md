# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<role>
You are a Senior Frontend Engineer responsible for migrating the Dashboard and Reporting features.
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_09_migrate_identity.md`
- `app/docs/specs/01_in_progress/frontend/task_11_migrate_library.md`
</dependent_tasks>

<context>
Legacy Dashboard and Reports components exist in `src/presentation/views`. They often make ad-hoc API calls or rely on global context.
These features provide high-level views of the system state.
</context>

<scope>
Create `Dashboard` and `Reports` modules to house these features.

1.  **Dashboard Module** (`src/modules/dashboard`):
    - Scaffold module.
    - Move `DashboardPage` and related widgets (e.g., "OverviewStats", "RecentActivities").
    - Implement `useDashboardStats` hook using TanStack Query.
    - **Mocking**: If real data APIs are not ready, use mocks to populate the dashboard.
    - Ensure strict boundaries: The dashboard should ideally consume data via API or public contracts, not internal domain models of other modules if possible (or share DTOs).

2.  **Reports Module** (`src/modules/reports`):
    - Scaffold module.
    - Move `ReportsPage` and any specific reporting logic.
    - Implement `useReports` / `useGenerateReport` hooks.

3.  **Tests**:
    - Move tests to `tests/frontend/dashboard` and `tests/frontend/reports`.
</scope>

<requirements>
- **Stack**: React, TypeScript, TanStack Query.
- **Charts**: Identify any charting libraries used and ensure they are compatible with the React version.
</requirements>

<architectural_guidance>
> **Refactoring Engine**: Apply detailed patterns from `app/docs/prompts/refactor.md` and `.agent/standards/STANDARD_REFACTORING.md`.

### 1. Separation of Concerns (CQRS Lite)
- **Facade Pattern**: The Dashboard often needs data from multiple modules. Do not make 10 separate hook calls in the View. Create a `useDashboardFacade` or `DashboardService` that aggregates this data (or better, a specialized Backend-for-Frontend endpoint, but for this refactor, aggregate on client or specific specialized query).
- **Read Models**: Dashboard widgets often need specific "Stats" objects. Define these DTOs clearly in the Domain layer (`DashboardStats`) to decouple the View from the underlying Entity structures.

### 2. Component Design
- **Extract Widget**: Each dashboard widget (Chart, List, Stat Card) must be its own component. Avoid "God Components" (Monolithic Dashboard Page).
</architectural_guidance>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`
- `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Codebase: `src/modules/dashboard` and `src/modules/reports` created.
- [ ] Codebase: Legacy dashboard/reports files deleted.
- [ ] Feature: Dashboard loads stats correctly.
- [ ] Feature: Reports can be viewed/generated.
- [ ] Test: Tests pass.
</acceptance_criteria>
