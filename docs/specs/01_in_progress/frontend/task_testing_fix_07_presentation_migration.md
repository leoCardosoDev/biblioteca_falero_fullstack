# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_06_reports.md`
</dependent_tasks>

<context>
The frontend tests for the presentation layer are currently located in `tests/presentation`, but the source code has moved to `src/shared/presentation`. This disconnect causes 28 test files to fail resolution.
Additionally, the project is modernizing its stack, requiring the removal of legacy libraries like `react-router-dom`.
</context>

<scope>
1. **Refactor Test Structure**:
   - Move `tests/presentation` directory to `tests/shared/presentation`.
   - Update all import paths in the moved files from `@/presentation` to `@/shared/presentation`.

2. **Dependency Hygiene**:
   - Verify removal of `react-router-dom` from `package.json` and `node_modules`.
   - ensure `TanStack Router` is being used (or prepared) as per `TECH_STACK_MODERNIZATION.md` (though strictly, just removing the old one is the goal here).
   - Audit imports to ensure no legacy libraries are referenced.

3. **Verify Build**:
   - Run `npm run test:unit` to ensure the structure change fixed the resolution errors.
   - Run `dependency-cruiser` (if available) to check for circular dependencies.
</scope>

<requirements>
- **Stack**: Vitest, Bash (for moves), sed (for replacements).
- **Constraints**:
    - Must not break existing passing tests in `tests/shared`.
    - Must ensure Git interprets moves correctly (use `git mv` if possible, though `mv` is fine if committed properly).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Directory `tests/presentation` no longer exists.
- [ ] Directory `tests/shared/presentation` exists and contains the moved files.
- [ ] All imports in `tests/shared/presentation/**/*.spec.ts` (and `.tsx`) use `@/shared/presentation`.
- [ ] `react-router-dom` is absent from `package.json`.
- [ ] `npm run test:unit` passes for presentation tests.
</acceptance_criteria>

<output>
1. **Summary**: Aligned test structure with source code; cleaned legacy deps.
2. **Decisions**: Moved tests to match source "Shared" kernel location.
3. **Manual Test Guide**: `npm run test:unit`.
</output>

<technical_constraints>
- **Search & Replace**:
    - **Safety First**: BEFORE running sed, run `grep -r "from ['\"]@/presentation" tests/shared/presentation` to verify what will be changed.
    - **Command Pattern**: Use `find tests/shared/presentation -type f -name "*.ts*" -exec sed -i 's/from \(['"'"']\)@\/presentation/from \1@\/shared\/presentation/g' {} +` to handle both single and double quotes preserving the original quote style.
    - **Verify**: Check for any missed imports: `grep -r "@\/presentation" tests/shared/presentation`.
- **Git**:
    - Use `git mv tests/presentation tests/shared/presentation` to preserve file history.
- **Verification**:
    - Run `npx tsc --noEmit` immediately after the move and replace to catch broken imports.
    - Run `npx vitest run tests/shared/presentation` to verify tests pass in new location.
</technical_constraints>
