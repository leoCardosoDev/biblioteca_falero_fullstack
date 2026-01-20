# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_02_identity.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_03_shared_kernel.md` (COMPLETED)
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
</completed>

<context>
The `Geography` module manages Cities, States, and Addresses.
Currently, it has no tests, only an empty shell structure.
We need to backfill tests to match `src/modules/geography`.
</context>

<scope>
1. **Domain Tests**:
   - `City` Entity.
   - `State` Entity.
   - `Address` Value Object (if present).

2. **Application Tests**:
   - `GetCity` / `ListCities` UseCase.
   - `GetState` UseCase.
   - `ResolveAddress` Policy/Service (if applicable).

3. **Presentation (Optional/Integration)**:
   - If UI components (dropdowns) are complex, add integration tests for `CitySelect` component.
</scope>

<requirements>
- **Stack**: Vitest.
- **Negative Constraints**:
    - Do NOT test the external API provider (Google Maps etc), mock the Infra Adapter.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `tests/modules/geography` is populated with real tests (no more placeholders).
- [ ] Tests pass Green.
</acceptance_criteria>

<output>
1. **Summary**: Backfilled testing for Geography module.
2. **Decisions**: Mocked external geography providers in Infra tests.
3. **Manual Test Guide**: `npm run test:unit`.
</output>

<technical_constraints>
- **Immutability Verification**:
    - `City`, `State`, `Address` must be immutable. Tests should attempt mutation (in TS via `as any` or strictly purely) or rely on `readonly` properties.
- **Data Source**:
    - If `GeographyRepository` uses hardcoded JSON:
        - Tests must verify that `getAll()` returns **copies** of the data, not references to the internal source, to prevent accidental mutation by consumers.
- **Mocking Strategy**:
    - External API providers (e.g. Google Maps) must be mocked at the **Adapter** level.
    - Do NOT make real network calls to external geocoding APIs during tests.
</technical_constraints>
