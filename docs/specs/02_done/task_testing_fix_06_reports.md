# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_02_identity.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_03_shared_kernel.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_04_geography.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_05_dashboard.md` (COMPLETED)
</dependent_tasks>

<completed>
- **Task 01 (Foundation)**:
    - Fixed Vitest unit configuration (`restoreMocks`, `setupFiles`).
    - Standardized `jsdom` environment for `.tsx` files.
    - Repaired `Library` module unit tests (Entities, Use Cases) ensuring architectural alignment.
- **Task 02 (Identity)**:
    - Implemented comprehensive unit tests for `Identity` module.
    - **Domain**: `User` entity and 6 Value Objects (`Email`, `Cpf`, `Name`, `UserRole`, `UserStatus`, `Address`).
    - **Application**: Unit tests for `Login`, `LoadUsers`, `LoadUserById`, and `Logout` use cases.
- **Task 03 (Shared Kernel)**:
    - Created `tests/shared/application/common/either.spec.ts` (12 tests).
    - Created `tests/shared/infra/http/axios-http-client.spec.ts` (7 tests).
    - Created `tests/shared/infra/cache/local-storage-adapter.spec.ts` (6 tests).
- **Task 04 (Geography)**:
    - Backfilled unit tests for `Geography` module covering Domain and Application layers.
    - **Domain**: `State`, `City`, `Neighborhood` entities and `Address` Value Object.
    - **Application**: Unit tests for `GetStates`, `GetCities`, `GetNeighborhoods`, and `GetAddressByZipCode` use cases.
- **Task 05 (Dashboard)**:
    - Refactored `Dashboard` module to comply with Strict Clean Architecture (moved Hooks from Application to Infra).
    - Implemented 41 tests covering Repository, Hooks, Facade, and Presentation (`DashboardView`).
    - **Verification**: 100% Type-safe and tests passing.
</completed>

<context>
The `Reports` module generates PDF/CSV export data.
Logic validates date ranges, filters, and permissions.
</context>

<scope>
1. **Domain/Application Tests**:
   - `GenerateReport` UseCase: Test date range validation (start < end), required filters.
   - `ReportType` Value Object: Validation of supported types.

2. **Infra Tests**:
   - `ReportRepository`: Test download trigger (mocking `window.open` or Blob handling).
</scope>

<requirements>
- **Stack**: Vitest.
- **Negative Constraints**:
    - Do NOT test the actual binary content of the PDF. Test the *request* to generate it.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `tests/modules/reports` populated.
- [ ] Validation logic covered (Date ranges).
</acceptance_criteria>

<output>
1. **Summary**: Tests for Reports generation logic.
2. **Decisions**: Verified parameters, mocked file download.
3. **Manual Test Guide**: `npm run test:unit`.
</output>

<technical_constraints>
- **Browser API Mocking**:
    - Implementation likely uses `window.URL.createObjectURL` and `<a>` tag clicks.
    - **MUST** stub these globals in tests:
        - `vi.stubGlobal('URL', { createObjectURL: vi.fn(), revokeObjectURL: vi.fn() })`
        - Mock `HTMLAnchorElement.prototype.click`.
- **Determinism**:
    - Use `vi.useFakeTimers()` when testing date-range defaults (e.g. "Last 30 days").
    - Ensure tests do not fail when the month changes.
</technical_constraints>
