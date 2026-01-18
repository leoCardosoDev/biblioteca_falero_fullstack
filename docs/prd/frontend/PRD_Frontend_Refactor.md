# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<meta>
- **PRD Name**: Frontend Refactor & Modular Migration
- **Owner**: Tech Lead
- **Status**: Draft
- **Version**: 1.0
- **Created At**: 2026-01-18
- **Last Updated**: 2026-01-18
</meta>

<related_specs>
- `app/docs/specs/01_in_progress/frontend/task_09_migrate_identity.md` (Proposed)
- `app/docs/specs/01_in_progress/frontend/task_10_migrate_geography.md` (Proposed)
- `app/docs/specs/01_in_progress/frontend/task_11_migrate_library_core.md` (Proposed)
</related_specs>

<context>
The frontend application has successfully established a **Modular Monolith Foundation** (ADR 014). The infrastructure, shared kernel, and main entry points are modernized and configured with strict boundaries and new tooling (TanStack Router, Query, Zustand).

However, the bulk of the **business logic and UI implementation** currently resides in a legacy **Layered Architecture** structure (`src/domain`, `src/application`, `src/infra`, `src/presentation`). This creates a "Hybrid State" where the architecture is defined but the code is not yet compliant.
</context>

<problem>
The current state ("Hybrid Architecture") presents significant risks:
1.  **Architectural Violation**: The legacy code in `src/presentation` and `src/domain` bypasses the new Strict Boundary rules defined in `eslint-plugin-boundaries`, as it sits outside the `modules/` directory.
2.  **Duplication & Confusion**: Developers are unsure whether to follow the old patterns (Context API, useEffect) or the new ones (TanStack Query, Zustand) because both exist side-by-side.
3.  **Tech Debt**: The legacy code uses deprecated patterns (manual `axios` calls, `useEffect` for fetching, string-based routing) which are explicitly forbidden by ADR 015.
4.  **Test Colocation**: Tests are currently scattered in `src/` instead of the mandated `tests/` root mirror.
</problem>

<objectives>
- **Primary Objective**: Migrate 100% of the legacy code from `src/{domain,application,infra,presentation}` into self-contained Bounded Contexts within `src/modules/`.
- **Secondary Objective**: Eliminate usage of deprecated libraries/patterns (e.g., direct Axios usage, Context for server state) during the migration.
- **Tertiary Objective**: Achieve a clean `src/` directory containing ONLY `modules/`, `shared/`, and `main/`.
- **Quality Objective**: Perform a **Deep Refactor** on all migrated code to drastically improve Test Coverage, reduce Cyclic Complexity, and limit File Size (lines of code).
</objectives>

<success_metrics>
- **Completion**: 0 files remaining in `src/domain`, `src/application`, `src/infra` (root), and `src/presentation`.
- **Compliance**: 100% of feature code resides within `src/modules/{feature}`.
- **Quality**: 0 ESLint errors for Boundary violations.
- **Testing**: All tests relocated to `tests/frontend/` and passing.
- **Code Metrics**:
    - **Test Coverage**: 100% line coverage for critical domain/application logic.
    - **Maintainability**: Max file size < 300 LOC (soft limit).
    - **Efficiency**: Removal of unused/dead code detected during migration.
</success_metrics>

<users>
- **Developers**: Will benefit from clear architectural boundaries and improved DX.
- **End Users**: Will experience improved stability (type-safe routing) and performance (TanStack Query caching), though the primary goal is refactoring.
</users>

<scope>
### In Scope
- **Identity Migration**: Move Login, User Management, Auth Logic to `src/modules/identity`.
- **Geography Migration**: Move Address/Location logic to `src/modules/geography`.
- **New Modules**: Create modules for remaining features found in legacy:
    - **Library/Catalog**: Books, Loans, Reservations.
    - **Dashboard**: Dashboard widgets and views.
    - **Reports**: Reporting features.
- **Refactoring**: Convert data fetching to TanStack Query within the new modules.
- **Deep Code Optimization**:
    - Break down large files into smaller, single-purpose functions/components.
    - Improve code readability and remove redundancy (DRY).
    - Ensure all migrated logic has accompanying unit/integration tests.
- **Cleanup**: Delete unused legacy infrastructure (old Axios client, old manual repositories if replaced by generic adapters).
- **Test Restructuring**: Move all `.spec.ts` and `.test.tsx` files to `tests/`.

### Out of Scope
- **Visual Redesign**: The goal is architectural refactoring, not changing the visual design (unless implied by replacing UI components with Shared UI).
- **Backend Changes**: strictly frontend scope.
</scope>

<functional_requirements>
1.  **Module Self-Containment**: Each migrated feature MUST have its own `domain`, `application` (optional), `infra` (optional), and `presentation` layers *inside* the module folder.
2.  **Strict Public API**: Modules MUST only expose features via their `index.ts` or `public/` directory.
3.  **Route Isolation**: Each module MUST define its own Route Factory to be consumed by `src/main`.
4.  **Legacy Deletion**: After a feature is verified in `modules/`, its counterpart in the legacy folders MUST be deleted.
</functional_requirements>

<non_functional_requirements>
- **Performance**: No regression in load times; expectation of improvement due to better caching.
- **Maintainability**: Strict adherence to SOLID principles and DDD within modules.
- **Testability**: Tests must be decoupled from implementation details where possible.
</non_functional_requirements>

<dependencies>
- **Completed Foundation**: Relies on the work done in Tasks 01-08 (Router, Query, Shared UI).
</dependencies>

<risks>
- **Regression**: Breaking existing features during migration.
    - *Mitigation*: Comprehensive regression testing (manual & automated) before deleting legacy code.
- **Scope Creep**: Attempting to rewrite business logic while moving it.
    - *Mitigation*: Stick to "Lift and Shift" + "Pattern Adaptation" (Adapter replacement). Do not change business rules.
</risks>

<acceptance_criteria>
- Given the legacy Login page, When migrated to `modules/identity`, Then it uses `useLogin` (TanStack Query) and `useAuth` (Zustand) instead of Context/useEffect.
- Given the `src/` directory, When the refactor is complete, Then `domain`, `application`, `infra`, `presentation` directories DO NOT exist.
- Given the Test Suite, When run, Then all tests passed and are located in `tests/`.
</acceptance_criteria>

<open_questions>
- Should "Books", "Loans", "Reservations" be one module (`Library`) or separate?
    - *Decision*: Group under `Library` (or `Lending` + `Catalog`) to avoid module explosion, unless they are very distinct Bounded Contexts. For now, we will assume distinct modules or a `Catalog` / `Circulation` split, but a single `Library` module might be safer for start. *Recommendation*: Analyze domain complexity during task spec creation.
</open_questions>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`
- `app/docs/adr/015_frontend_modernization_stack.md`
- `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>
