# <role>
# You are the TEST AUTOMATION ENGINEER.
# </role>

<context>
The `src` directory has been refactored into a **Modular Monolith** (`src/modules`, `src/shared`).
However, the `tests` directory still reflects the old **Layered Monolith** structure (`tests/domain`, `tests/application`, etc.).
This disconnect makes it difficult to navigate and maintain tests for specific bounded contexts.
</context>

<objective>
Refactor the `tests` directory to verify the code in `src` by mirroring its structure.
The `tests` folder must be a reflection of the `src` folder.
</objective>

<scope>
1.  **Structure Mirroring**:
    -   Create `tests/modules` and `tests/shared`.
    -   Refactor existing tests from the horizontal layers (`tests/domain`, `tests/application`, `tests/infra`) into their respective vertical slices in `tests/modules` or `tests/shared`.
    -   **Mapping**:
        -   `src/modules/geography` -> `tests/modules/geography`
        -   `src/modules/identity` -> `tests/modules/identity`
        -   `src/shared` -> `tests/shared`
        -   `src/main` -> `tests/main` (if applicable)

2.  **Import Refactoring**:
    -   Update all relative and absolute imports in the moved test files to match the new location.
    -   Ensure factories and test helpers are also moved or correctly referenced.

3.  **Configuration**:
    -   Update `jest.config.ts` (and `jest.integration.config.ts` etc.) to support the new paths.
    -   Ensure `tsconfig.json` paths are respected or updated if separate for tests.

4.  **Verification**:
    -   Ensure strict equality between `src` module structure and `tests` module structure.
    -   Run all tests to ensure 0 regressions.
</scope>

<steps>
1.  Create the directory skeleton in `tests/`.
2.  Move `tests/shared/*` -> `tests/shared/*`.
3.  Move `tests/*/geography` related files -> `tests/modules/geography/*`.
4.  Move `tests/*/identity` related files -> `tests/modules/identity/*`.
5.  Clean up empty layered directories (`tests/domain`, `tests/application`, etc.).
6.  Fix imports in all moved files.
7.  Verify `npm run test:unit` and `npm run test:integration`.
</steps>

<acceptance_criteria>
- [x] `tests/modules/identity` exists and contains all identity tests.
- [x] `tests/modules/geography` exists and contains all geography tests.
- [x] `tests/shared` contains shared kernel tests.
- [x] No "orphan" tests left in the old layered folders.
- [x] `npm run test:unit` passes.
- [x] `npm run test:integration` passes.
</acceptance_criteria>
