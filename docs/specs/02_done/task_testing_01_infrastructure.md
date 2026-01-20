# <role>
# System Architect
# </role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The frontend testing infrastructure is currently immature and does not align with the new **Modular Monolith** architecture. There is no support for E2E tests (Playwright is not initialized effectively), and Unit/Integration tests are mixed or missing. We need to restructure the test environment to support the new strategy before moving actual test files.
</context>

<scope>
1.  **Playwright Initialization**:
    *   Initialize Playwright in `tests/e2e`.
    *   Ensure strict separation from unit tests.
    *   Add a basic sanity E2E test (e.g., visit home page).

2.  **Vitest Configuration**:
    *   Update `vitest.config.ts`.
    *   **Coverage**: Remove exclusions for `src/presentation/react/pages` and other application parts (aim for "True" coverage visibility).
    *   **Test Separation**: Configure Vitest to distinguish between `.spec.ts` (Unit - Fast, Mocked) and `.test.ts` (Integration - Slower, Real Adapters).
    *   Create separate scripts in `package.json`: `test:unit`, `test:integration`, `test:all`.

3.  **Linting/Types**:
    *   Ensure TypeScript knows about the `tests` folder structure (update `tsconfig.json` if necessary to include `tests/**/*`).
</scope>

<requirements>
- **Stack**: Vitest, Playwright, TypeScript.
- **Negative Constraints**:
    *   Do NOT move existing test files yet (that is Task 02).
    *   Do NOT write full test suites yet.
- **Performance**: Unit tests configuration must ensure they remain fast (no browser launch for unit).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `tests/e2e` directory exists with Playwright config.
- [x] `package.json` has `test:unit` (runs only `*.spec.ts`) and `test:integration` (runs only `*.test.ts`).
- [x] `vitest.config.ts` coverage settings include Presentation layer (Pages).
- [x] Running `npm run test:unit` does NOT trigger Playwright or integration tests.
</acceptance_criteria>

<output>
1. **Summary**: Test infrastructure (Vitest + Playwright) configured and ready for modular structure.
2. **Decisions**: SeparatedUnit/Integration via file extensions (`.spec.ts` vs `.test.ts`).
3. **Manual Test Guide**: Run `npm run test:unit`, `npm run test:integration`, `npm run test:e2e` and verify expected behavior (even if empty).
</output>

<technical_constraints>
1.  **Test Definition Definitions**:
    *   **Unit (`.spec.ts`)**: Tests for `Domain` entities/services and pure `Application` use cases. MUST NOT import `react`, `@testing-library/react`, or involve DOM. MUST be solvable with plain Node.js runtime.
    *   **Integration (`.test.ts`)**: Tests for `Infra` (Repositories, Adapters) and `Presentation` (React Components).
        *   **Infra Tests**: Must use `msw` (Mock Service Worker) or equivalent to mock network calls. NEVER hit the real backend in Integration tests.
        *   **Component Tests**: Use `@testing-library/react`.
    *   **E2E**: Playwright tests only.
2.  **Configuration Safety**:
    *   `vitest.config.ts` must implicitly Exclude `tests/e2e` to prevent Vitest from trying to run Playwright files.
    *   Ensure `happy-dom` or `jsdom` is used ONLY for Integration/Component tests (can be configured via file-header comment or separate config if separate execution is desired, but strict file separation `test` vs `spec` combined with distinct configs is preferred).
</technical_constraints>
