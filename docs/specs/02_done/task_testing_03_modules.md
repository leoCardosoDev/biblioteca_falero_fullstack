# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_01_infrastructure.md`
- `app/docs/specs/01_in_progress/frontend/task_testing_02_shared.md`
</dependent_tasks>

<summary_completed_tasks>
### Task 01: Testing Infrastructure
- **Playwright Initialized**: Configured in `app/frontend/playwright.config.ts`. Added basic sanity test.
- **Vitest Separation**: Created `vitest.unit.config.ts` (node) and `vitest.integration.config.ts` (jsdom).
- **Scripts**: Added `test:unit`, `test:integration`, `test:e2e`, and `test:all`.
- **Coverage**: Refined `vitest.config.ts` for full visibility.

### Task 02: Shared Module Tests
- **Structural Realignment**: `tests/shared` now strictly mirrors `src/shared` layers (`domain`, `application`, `infra`, `presentation`).
- **Relocation**: Moved store tests from `tests/shared/store` to `tests/shared/infra/store`.
- **Environment Compliance**: Renamed to `*.test.ts` where DOM is required (e.g., `useAppStore`).
- **Clean Slate**: Deleted invalid `tests/shared/store` directory and scaffolded empty layers with `.gitkeep`.
</summary_completed_tasks>

<context>
Several modules present in `src/modules` (`geography`, `reports`, `dashboard`) are completely missing from `tests/modules`. This leads to zero coverage visibility for these features. We need to establish the physical testing structure for them.
</context>

<scope>
1.  **Create Module Test Shells**:
    *   Create `tests/modules/geography/{domain,application,infra,presentation}`.
    *   Create `tests/modules/reports/{domain,application,infra,presentation}`.
    *   Create `tests/modules/dashboard/{domain,application,infra,presentation}`.

2.  **Placeholder Tests**:
    *   Add a simple placeholder test (e.g., `it.todo('should be implemented')`) in each module to ensure the directory structure is preserved by Git.
    *   Example: `tests/modules/geography/geography.spec.ts` (or specific file placeholder).

3.  **Verify Parity**:
    *   Ensure `tests/modules` contains all modules present in `src/modules`.
</scope>

<requirements>
- **Stack**: Vitest.
- **Negative Constraints**:
    *   Do NOT write the actual business logic tests yet (out of scope).
    *   Do NOT deviate from the Standard Module Structure.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `tests/modules/geography` exists with 4 layers.
- [x] `tests/modules/reports` exists with 4 layers.
- [x] `tests/modules/dashboard` exists with 4 layers.
- [x] At least one placeholder test exists per new module.
- [x] `npm run test:unit` runs these placeholders (successfully or skipped).
</acceptance_criteria>

<output>
1. **Summary**: Successfully established the physical testing structure for missing modules.
   - Created `tests/modules/{geography,reports,dashboard}` mirroring `src/modules`.
   - Each module contains the 4 mandatory layers (`domain`, `application`, `infra`, `presentation`) with `.gitkeep` files.
   - Added placeholder tests using `it.todo()` to ensure visibility in test reports without providing false confidence.
2. **Decisions**: Used mirroring to maintain strict architectural parity between source and tests.
3. **Verification**: Confirmed via `ls -R` and `npm run test:unit` (3 todo/skipped tests visible).
</output>

<technical_constraints>
1.  **Module Isolation**:
    *   Tests in `tests/modules/A` MUST NOT import source code from `src/modules/B`.
    *   They may import from `src/shared` or `tests/shared/test-utils`.
2.  **Placeholder Policy**:
    *   Use `describe.skip` or `it.todo` for placeholders to ensure they show up in reports as "Pending" rather than "Passing" (false confidence).
    *   Do NOT use empty `test('should work', () => {})` which passes essentially doing nothing.
</technical_constraints>
