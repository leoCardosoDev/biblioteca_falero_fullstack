# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Frontend Testing Strategy & Architecture Refactor
- **Owner**: Frontend Architecture Team
- **Status**: approved
- **Version**: 1.2
- **Created At**: 2026-01-20
- **Last Updated**: 2026-01-20
</meta>

<related_specs>
- `app/docs/reports/fix-tests-reports.md` (Latest Analysis)
- `app/docs/technical_records/TECH_STACK_MODERNIZATION.md`
- `app/docs/adr/014_frontend_modular_monolith.md`
- `app/docs/adr/013_modular_monolith_clean_architecture.md`
</related_specs>

<context>
The frontend modernization is largely complete in `src/`, but the `tests/` directory is out of sync, leading to a broken build state.
Recent analysis (`fix-tests-reports.md`) confirms **28 failing test files**, primarily in the **Presentation Layer**, due to incorrectly mapped import aliases (`@/presentation` vs `@/shared/presentation`) and physical directory mismatches.
Additionally, the Tech Stack Modernization requires verification that no legacy libraries (e.g., `react-router-dom` v6 legacy patterns, `axios` if replaced, etc.) remain in the codebase or dependencies.
</context>

<problem>
1.  **Structural Integrity Failure**: `tests/presentation` exists but `src/presentation` has moved to `src/shared/presentation`. This causes 28 test files to fail resolution.
2.  **Missing Report Logic**: The `Reports` module has a skipped test `reports-structure.spec.ts` and lacks the `GenerateReport` use case implementation required by the domain.
3.  **Potential Dependency Debt**: We need to ensure `package.json` and imports are perfectly clean of legacy libraries referenced in `TECH_STACK_MODERNIZATION.md`.
</problem>

<objectives>
- **Primary**: Fix the 28 failing presentation tests by aligning the test directory structure with the source (`tests/shared/presentation`).
- **Secondary**: Implement the missing `GenerateReport` use case and enable its structure tests to complete the Reports module.
- **Tertiary**: Verify and enforce the "Clean Stack" rule (removal of legacy deps).
</objectives>

<success_metrics>
- **Build Health**: `npm run test:all` returns Exit Code 0.
- **Coverage**: All presentation tests pass with correct imports.
- **Completeness**: `Reports` module has a passing `GenerateReport` test.
- **Hygiene**: `package.json` contains only approved modern stack libraries.
</success_metrics>

<scope>
### In Scope
1.  **Test Structure Migration**:
    - MOVE `tests/presentation` -> `tests/shared/presentation`.
    - UPDATE imports in all moved files from `@/presentation` to `@/shared/presentation`.
2.  **Reports Module Implementation**:
    - Unskip `reports-structure.spec.ts`.
    - Implement `GenerateReport` Use Case (check date logic).
    - Add Unit Tests for `GenerateReport`.
3.  **Dependency Verification**:
    - Confirm removal of `react-router-dom` (verify `node_modules` / `package.json`).
    - Audit used imports.

### Out of Scope
- Refactoring `Geography` or `Dashboard` modules beyond what is needed for the build to pass.
</scope>

<functional_requirements>
1.  **Path Resolution**: All tests must resolve their SUTs (System Under Test) using the correct `@/shared` aliases.
2.  **Date Validation**: `GenerateReport` must throw an error if `startDate > endDate`.
</functional_requirements>

<execution_plan>
1.  **Review**: Read `TECH_STACK_MODERNIZATION.md` to confirm forbidden libraries.
2.  **Refactor**:
    - `mv tests/presentation tests/shared/presentation`
    - `sed -i 's|@/presentation|@/shared/presentation|g'`
3.  **Implement**: Write `GenerateReport` use case and tests.
4.  **Verify**: Run `npm run test:all`.
</execution_plan>

<acceptance_criteria>
- [ ] `npm run test:unit` passes.
- [ ] `npm run test:integration` passes.
- [ ] CI pipeline (`npm run test:ci`) passes.
</acceptance_criteria>

<risk_management>
- **Risk**: Finding circular dependencies when moving presentation tests.
- **Mitigation**: Use `dependency-cruiser` to validate graph after move.
</risk_management>
