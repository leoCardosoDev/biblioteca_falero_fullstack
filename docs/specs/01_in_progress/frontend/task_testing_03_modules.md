# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_01_infrastructure.md`
- `app/docs/specs/01_in_progress/frontend/task_testing_02_shared.md`
</dependent_tasks>

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
- [ ] `tests/modules/geography` exists with 4 layers.
- [ ] `tests/modules/reports` exists with 4 layers.
- [ ] `tests/modules/dashboard` exists with 4 layers.
- [ ] At least one placeholder test exists per new module.
- [ ] `npm run test:unit` runs these placeholders (successfully or skipped).
</acceptance_criteria>

<output>
1. **Summary**: Created test directory shells for missing modules.
2. **Decisions**: Used placeholders to enforce structure before implementation.
3. **Manual Test Guide**: Run `ls -R tests/modules` and verify structure.
</output>

<technical_constraints>
1.  **Module Isolation**:
    *   Tests in `tests/modules/A` MUST NOT import source code from `src/modules/B`.
    *   They may import from `src/shared` or `tests/shared/test-utils`.
2.  **Placeholder Policy**:
    *   Use `describe.skip` or `it.todo` for placeholders to ensure they show up in reports as "Pending" rather than "Passing" (false confidence).
    *   Do NOT use empty `test('should work', () => {})` which passes essentially doing nothing.
</technical_constraints>
