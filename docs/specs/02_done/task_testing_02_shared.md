# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_01_infrastructure.md`
</dependent_tasks>

<summary_completed_tasks>
### Task 01: Testing Infrastructure
- **Playwright Initialized**: Configured in `app/frontend/playwright.config.ts` with output in `tests/e2e`. Added basic sanity test.
- **Vitest Separation**: Created `vitest.unit.config.ts` (node env) and `vitest.integration.config.ts` (jsdom env) to enforce strict separation between unit (`*.spec.ts`) and integration (`*.test.ts`) tests.
- **Scripts**: Added `test:unit`, `test:integration`, `test:e2e`, and `test:all` to `package.json`.
- **Coverage**: Refined `vitest.config.ts` to remove presentation layer exclusions, ensuring true coverage visibility.
</summary_completed_tasks>

<context>
The `tests/shared` directory currently contains invalid structures (e.g., `tests/shared/store`) and does not mirror the strict clean architecture layers found in `src/shared` (`domain`, `application`, `infra`, `presentation`). This creates confusion and violates the "Screaming Architecture" principle.
</context>

<scope>
1.  **Refactor `tests/shared`**:
    *   Create `tests/shared/{domain,application,infra,presentation}`.
    *   Remove/Rename invalid folders like `store`.
    *   Move existing shared tests into their appropriate layer folder.

2.  **Strict Mirroring**:
    *   Ensure that for every tested file in `src/shared/X`, the test lives in `tests/shared/X`.

3.  **Cleanup**:
    *   Update imports in moved test files.
    *   Verify linting passes after moves.
</scope>

<requirements>
- **Stack**: Vitest, TypeScript.
- **Negative Constraints**:
    *   Do NOT create "store" folders (State belongs in `infra` or `application` specific logic).
    *   Do NOT mix integration tests in unit folders.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `tests/shared` contains ONLY: `domain`, `application`, `infra`, `presentation` (plus maybe `test-utils` if absolutely needed, but prefer `src/shared/infra/test-utils`).
- [x] No `tests/shared/store` exists.
- [x] Existing shared tests pass after move.
- [x] Structure matches `src/shared`.
</acceptance_criteria>

<output>
1. **Summary**: `tests/shared` structurally mirrors `src/shared`.
2. **Decisions**: Enforced Layered Architecture in tests.
3. **Manual Test Guide**: Check directory tree of `tests/shared`. Run tests to ensure no import errors.
</output>

<technical_constraints>
1.  **Strict Layer Compliance**:
    *   `tests/shared/domain`: PURE TypeScript. No `react`, no `infra` imports.
    *   `tests/shared/application`: PURE TypeScript. Mocks allowed for repositories. No `react` imports (unless testing specifically hooks that are pure logic, though those are rare in App layer).
    *   `tests/shared/infra`: dependency-inversion tests.
2.  **Import Bans**:
    *   Enforce `eslint-plugin-boundaries` (or similar check) in tests if possible. e.g., `tests/shared/domain` cannot import from `src/shared/infra`.
3.  **Fixture Management**:
    *   Do not create global "test-utils" that couple layers. Create layer-specific test factories if needed (e.g., `DomainFactory` in `tests/shared/domain/test-utils`).
</technical_constraints>
