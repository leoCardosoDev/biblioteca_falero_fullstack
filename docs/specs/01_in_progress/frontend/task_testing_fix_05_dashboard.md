# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_02_identity.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_03_shared_kernel.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_04_geography.md` (COMPLETED)
</dependent_tasks>

<completed>
- **Task 01 (Foundation)**:
    - Fixed Vitest unit configuration (`restoreMocks`, `setupFiles`).
    - Standardized `jsdom` environment for `.tsx` files.
    - Repaired `Library` module unit tests (Entities, Use Cases) ensuring architectural alignment.
- **Task 02 (Identity)**:
    - Implemented comprehensive unit tests for `Identity` module.
    - **Domain**: `User` entity (state, transitions, immutability) and 6 Value Objects (`Email`, `Cpf`, `Name`, `UserRole`, `UserStatus`, `Address`).
    - **Application**: Unit tests for `Login`, `LoadUsers`, `LoadUserById`, and `Logout` use cases.
    - **Verification**: 90 unit tests added and passing in `tests/modules/identity`.
- **Task 03 (Shared Kernel)**:
    - Created `tests/shared/application/common/either.spec.ts` (12 tests for Either pattern).
    - Created `tests/shared/infra/http/axios-http-client.spec.ts` (7 tests for HTTP adapter).
    - Created `tests/shared/infra/cache/local-storage-adapter.spec.ts` (6 tests for cache adapter).
    - **Verification**: 32 unit tests passing in `tests/shared`.
- **Task 04 (Geography)**:
    - Backfilled unit tests for `Geography` module covering Domain and Application layers.
    - **Domain**: `State`, `City`, `Neighborhood` entities and `Address` Value Object.
    - **Application**: Unit tests for `GetStates`, `GetCities`, `GetNeighborhoods`, and `GetAddressByZipCode` use cases.
    - **Verification**: 46 unit tests added and passing in `tests/modules/geography`.
</completed>

<context>
The `Dashboard` module aggregates data for the home screen.
It likely involves complex data compilation or purely presentation logic.
</context>

<scope>
1. **Application Tests**:
   - `LoadDashboardMetrics` UseCase: Test aggregation logic, zero states, error states.
   
2. **Infra Tests**:
   - `DashboardRepository`: Test DTO mapping from API response to Domain entities.

3. **Presentation**:
   - `DashboardLayout` or `Widget` components: Test they render correctly with mocked data (Integration test).
</scope>

<requirements>
- **Stack**: Vitest, React Testing Library.
- **Negative Constraints**:
    - Do NOT test actual charts rendering pixel-perfect (use snapshot or basic existence check).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `tests/modules/dashboard` populated.
- [x] Correctly handles empty dashboard state.
</acceptance_criteria>

<output>
1. **Summary**: Tests for Dashboard aggregation logic.
2. **Decisions**: Focused on data correctness over visual charting accuracy.
3. **Manual Test Guide**: `npm run test:unit`.
</output>

<technical_constraints>
- **Performance / Scale**:
    - Tests for aggregation logic should include cases with "empty", "normal", and "high volume" data samples to ensure linear verification.
- **DTO Mapping**:
    - `DashboardRepository` tests must verifying strict mapping from Raw API JSON -> Domain Entity.
    - Ensure missing optional fields in API response are handled gracefully (defaults or nullable types in Domain).
- **Presentation**:
    - Do not test Canvas/SVG rendering details of charts.
    - Test that the *Component* receives the correct props (data points) from the hook/presenter.
</technical_constraints>
