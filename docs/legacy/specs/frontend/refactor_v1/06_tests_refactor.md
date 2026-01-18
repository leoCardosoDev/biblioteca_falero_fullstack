# <role>
# You are the TEST AUTOMATION ENGINEER.
# </role>

<context>
The frontend refactoring has moved files to `src/modules` and `src/shared`.
The existing test suite (using Vitest) in `tests/` and source folders still points to old locations.
</context>

<scope>
1.  **Refactor Imports**: Update all import statements in test files:
    -   `@/domain` -> `@/modules/identity/domain` or `@/shared/domain`.
    -   `@/presentation` -> `@/modules/identity/presentation` etc.
2.  **Config**: Ensure `vitest.config.ts` picks up the new aliases (it likely uses vite config, so verify Spec 01 covered it).
3.  **Execution**: Run `npm run test` and `npm run test:ci`.
4.  **Coverage**: Ensure 100% test pass rate is restored.
</scope>

<requirements>
- **Stack**: Vitest, React Testing Library.
- **Critical**: 100% Pass rate.
</requirements>

<impact_analysis>
- **Tests**: 100% impacted.
</impact_analysis>

<acceptance_criteria>
- [ ] `npm run test` passes.
- [ ] `npm run test:ci` passes.
</acceptance_criteria>
