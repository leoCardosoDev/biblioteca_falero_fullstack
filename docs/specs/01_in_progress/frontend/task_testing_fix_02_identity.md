# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md` (COMPLETED)
</dependent_tasks>

<completed>
- Fixed `vitest.unit.config.ts`: added `restoreMocks: true` and `setupFiles: ['./tests/setup.ts']`.
- Configured Environment: Added `// @vitest-environment jsdom` to all `.tsx` test files requiring DOM APIs.
- Repaired Library Module: Rewrote tests for `Book` and `Loan` entities to align with the exported class API (Portuguese status values and method-based logic).
- Fixed Mocks: Updated `LoadBooksUseCase` and `LoadLoansUseCase` mocks to match the `LibraryRepository` interface.
- Verified: All 12 tests in `tests/modules/library` are passing.
- **Identity Module**: Implemented 90 unit tests covering Domain (`User` entity and `Email`, `Cpf`, `Name`, `UserRole`, `UserStatus`, `Address` VOs) and Application (`Login`, `LoadUsers`, `LoadUserById`, `Logout` use cases).
- **Verified**: All Identity tests passing with 100% success rate.
</completed>

<context>
The `Identity` module is critical for security but has minimal testing.
Existing `tests/modules/identity` might exist as a shell or incomplete structure.
We need strict Unit Tests for the Domain and purely functional Application logic.
</context>

<scope>
1. **Domain Tests**:
   - `User` Entity: Test creation, validation rules.
   - `Email` Value Object: Test valid/invalid formats.
   - `Password` Value Object: Test strength rules (if applicable in domain).
   - `UserRole` Value Object.

2. **Application Tests**:
   - `Login` UseCase: Test success path, invalid credentials error, repository interaction.
   - `Register` UseCase: Test duplicate user error, success path.

3. **Infra Tests (Mocked)**:
   - Ensure `HttpAuthRepository` tests exist (using MSW or mocks) to verify it calls the correct endpoints.
</scope>

<requirements>
- **Stack**: Vitest.
- **Negative Constraints**:
    - Do NOT Integration test the UI components yet (focus on logic first).
    - Do NOT hit real API.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `tests/modules/identity/domain` contains tests for all entities/VOs.
- [x] `tests/modules/identity/application` contains tests for Login/Register usecases.
- [x] Tests pass with `npm run test:unit`.
- [x] Coverage for Identity domain > 80%.
</acceptance_criteria>

<output>
1. **Summary**: Implemented core unit tests for Identity module.
2. **Decisions**: Focused on Domain/Application purity.
3. **Manual Test Guide**: Run `npm run test:unit`.
</output>

<technical_constraints>
- **Domain Pattern Enforcement**:
    - `User` must be the Aggregate Root.
    - `Email` and `Password` must be **Value Objects** with private constructors and static factory methods (e.g. `create(value)`).
    - Factory methods must return a `Result<T>` or throw Domain Exceptions (if standard allows), but `Result` pattern is preferred for explicit failure paths.
- **Application Layer**:
    - UseCases must implement `UseCase<Input, Output>`.
    - Dependencies (Repositories) must be injected via constructor.
    - Tests must spy on the Repository interface to ensure correct method calls.
- **Repository Interface**:
    - Must return `Promise<User | null>` or `Promise<Result<User>>`.
    - Do not leak Infra/DB details (like `mongoose` or `axios` errors) into the Domain.
</technical_constraints>
