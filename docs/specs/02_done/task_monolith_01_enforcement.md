# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
System Architect / DevOps Engineer
</role>

<dependent_tasks>
- None (This is the foundational step for Monolith Consolidation)
</dependent_tasks>

<context>
The frontend is currently in a "Hybrid" state with both Modular Monolith (`src/modules`) and Legacy Clean Architecture (`src/domain`, `src/application`) structures. To safely migrate without regression, we need automated enforcement of boundaries. `dependency-cruiser` will be the primary tool for visualization and enforcement.
</context>

<scope>
1. **Frontend**:
   - **Install**: Add `dependency-cruiser` to `devDependencies`.
   - **Configure**: Initialize `.dependency-cruiser.js` with a custom rule set:
     - **Rule 1 (Strict)**: New modules (`src/modules/*`) MUST NOT import from Root (`src/domain`, `src/application`, etc.). *Severity: ERROR (Fail the build).*
     - **Rule 2 (Strict)**: `src/shared` MUST NOT import from `src/modules/*`.
     - **Rule 3 (Strict)**: `src/shared` internal layers must respect Clean Architecture (Domain -> App -> Infra -> Presentation). 
       - *Forbidden*: Domain importing Presentation/Infra.
       - *Forbidden*: Application importing Presentation/Infra.
   - **Script**: Add `npm run depcruise` script to `package.json`.
   - **ESLint**: Update `eslint-plugin-boundaries` configuration regarding "Hybrid" state.
     - *Constraint*: Configure it to allow legacy roots for *existing* files but WARN/ERROR for *new* usages if possible, or rely on DepCruiser for the graph check.

2. **CI Integration**:
   - Ensure `npm run depcruise` is added to the CI pipeline (e.g. Github Actions or `pre-commit` hook).
   - It MUST fail the pipeline on violations.
</scope>

<technical_constraints>
- **Tooling**: `dependency-cruiser` version must be locked.
- **Strictness**: We are seeking "Fail Fast" behavior. 
- **Exclusions**: Ensure test files (`*.spec.ts`, `tests/`) have their own relaxed rules or specific "Test -> Source" allowed direction, but must NOT violate module boundaries (e.g., `tests/modules/identity` cannot import `src/modules/geography` private internals).
- **Visualization**: The command should support generating a mermaid or dot graph for documentation purposes (optional but recommended).
</technical_constraints>

<requirements>
- **Stack**: `dependency-cruiser`, `eslint-plugin-boundaries`.
- **Constraint**: Do not break the current build unexpectedly.
  - *Strategy*: If the existing codebase has thousands of violations, utilize `dependency-cruiser`'s "baseline" feature (`--preserve-baseline`) to whitelist existing technical debt while preventing NEW violations.
- **Performance**: The check should run reasonably fast (part of CI).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Frontend: `dependency-cruiser` is installed and configured with the 3 major rules defined.
- [x] Frontend: `npm run depcruise` executes successfully and fails on *new* violations.
- [x] Frontend: A specific rule exists to detect imports from `src/modules` to `src/domain` (Root) and is set to ERROR.
- [x] Frontend: CI pipeline includes the `npm run depcruise` step (via Husky `pre-push` hook).
- [x] Documentation: A generated dependency graph image is saved to `app/docs/artifacts/dep_graph_initial.svg` (or similar) to visualize the mess before cleaning.
</acceptance_criteria>

<output>
1. **Summary**: Installed tooling and established the architectural baseline.
2. **Decisions**: Chose `dependency-cruiser` for its graph capabilities and strict rule engine.
3. **Manual Test Guide**: Run `npm run depcruise` and verify it detects a known violation (create a temporary one to test).
</output>
