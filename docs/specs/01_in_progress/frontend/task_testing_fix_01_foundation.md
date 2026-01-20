# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/02_done/task_testing_01_infrastructure.md`
- `app/docs/reports/2026-01-20_frontend_test_analysis.md`
</dependent_tasks>

<context>
The frontend testing suite is currently failing (Exit Code 1).
Analysis reveals:
1. Environment mismatch: Tests using `render` (React) are running in `node` environment (Config error).
2. Broken assertions: `Library` module tests expect properties/methods that do not match the source code.
3. Invalid mocks: Usecase tests use mocks that don't satisfy the interface.
</context>

<scope>
1. **Environment Configuration**:
   - Update `vitest.unit.config.ts` (or split config) to ensure files ending in `.tsx` or using specific imports run in `jsdom`.
   - Alternatively, strictly separate Component tests into `integration` suite if they are currently in `unit`.

2. **Library Module Repairs**:
   - Fix `Book` and `Loan` entity tests (assertion errors on `isAvailable`).
   - Fix `LoadBooks` usecase tests (mock interface mismatch `getBooks`).

3. **CI/CD Sanity**:
   - Ensure `npm run test:unit` passes with 0 failures after fixes.
   - Ensure `npm run test:integration` runs without environment errors.
</scope>

<requirements>
- **Stack**: Vitest, React Testing Library.
- **Negative Constraints**:
    - Do NOT delete valid tests that are failing; FIX them.
    - Do NOT ignore the environment error by mocking the global window in a hacky way; use the proper Vitest environment config.
- **Performance**: Tests must run fast (<5s).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `npm run test:unit` executes successfully (Exit Code 0).
- [x] `Library` module tests pass (Green).
- [x] No `document is not defined` errors in any suite.
</acceptance_criteria>

<output>
1. **Summary**: Fixed environment configuration and repaired broken legacy tests.
2. **Decisions**: Aligned test environment with component needs.
3. **Manual Test Guide**: Run `npm run test:unit`.
</output>

<technical_constraints>
- **Environment config**:
    - Must use `environmentMatchGlobs` in `vitest.config.ts` or separate `vitest.workspace` projects to strictly separate `jsdom` (React components) from `node` (Pure Logic/Domain).
    - Ambiguous file extensions (`.ts` vs `.tsx`) must be handled explicitly.
- **Library usage**:
    - **Prohibited**: Importing `@testing-library/react` in files designated as `node` environment.
    - **Required**: `restoreMocks: true` in config to prevent mock leakage between tests.
- **File structure**:
    - `tests/unit` -> Pure logic (fast, `node`).
    - `tests/integration` -> Component mounting (slower, `jsdom`).
</technical_constraints>
