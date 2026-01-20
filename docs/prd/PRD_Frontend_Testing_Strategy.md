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
- **Version**: 1.1
- **Created At**: 2026-01-20
- **Last Updated**: 2026-01-20
</meta>

<related_specs>
- `app/docs/reports/2026-01-20_frontend_test_analysis.md`
- `app/docs/adr/014_frontend_modular_monolith.md`
- `app/docs/adr/013_modular_monolith_clean_architecture.md`
- `app/docs/adr/015_frontend_modernization_stack.md`
</related_specs>

<context>
The frontend application has shifted to a **Modular Monolith** architecture with **Clean Architecture** principles (ADR 013, ADR 014). While the source code (`src/`) reflects this structure, the testing strategy (`tests/`) has lagged behind. 

Recent analysis (`2026-01-20_frontend_test_analysis.md`) reveals a **CRITICAL** state:
- `npm run test:unit` fails (Exit Code 1).
- Envirronment misconfiguration (Node vs JSDOM) causes component tests to crash.
- Major modules (`geography`, `reports`, `dashboard`, `identity`) lack semantic testing coverage.
- The `tests/` directory structure does not mirror `src/`, causing confusion and hidden coverage gaps.
</context>

<problem>
The current testing architecture is incompatible with the codebase's Modular Monolith structure and is technically broken.

1.  **Broken Execution Foundation**: The test runner is misconfigured. Component tests requiring the DOM are running in a `node` environment, causing immediate failures (`document is not defined`).
2.  **Structural Divergence**: `tests/modules` is missing critical business modules found in `src/`. `tests/shared` contains invalid structures (e.g., `store` folder instead of `infra/store`).
3.  **Missing Test Pyramid**: The suite is monolithic (`.spec.ts` only). There are **zero** explicitly separated integration or E2E tests, which are required for a reliable Modular Monolith.
4.  **Implementation Divergence**: Existing tests (e.g., in `Library` module) assert behavior that no longer matches the implementation, referencing non-existent methods or properties.
</problem>

<objectives>
- **Primary Objective**: Establish a **Green Build** and **1:1 Structural Mirror** between `src/` and `tests/`.
- **Secondary Objective**: Implement a supported **Test Pyramid** by separating Unit (`.spec.ts`), Integration (`.test.ts`), and E2E tests, with correct environment configurations for each.
</objectives>

<success_metrics>
- **North Star Metric**: **True 100% Structural Parity** (Every `src` module folder has a corresponding `tests` folder).
- **Supporting Metrics**:
    - **Execution Stability**: `npm run test:unit` passes with 0 failures.
    - **Configuration Correctness**: Component tests run in `jsdom`, Logic tests run in `node`.
    - **Backlog Burndown**: 33 currently failing tests fixed or correctly categorized.
- **Baseline**: 33 failing tests, 4 passed. Missing 3 key modules in tests.
- **Target**: 100% passing tests, 0 environment errors, all modules represented in `tests/`.
</success_metrics>

<users>
- **Developers**: Need a predictable place to write tests matching their source file (e.g., `src/.../MyUseCase.ts` -> `tests/.../MyUseCase.spec.ts`).
- **DevOps**: Need a stable CI pipeline that actually verifies code health.
</users>

<scope>
### In Scope
1.  **Foundation Repair (Immediate)**:
    - Fix `vitest.unit.config.ts` to support both `node` and `jsdom` environments (or split configs).
    - Fix assertion errors in `Library` module tests.
    - Fix mock definitions in `Library` use case tests.
2.  **Structural Realignment**:
    - Create `tests/modules/{geography,reports,dashboard,identity}` mirroring `src`.
    - Enforce `domain`, `application`, `infra`, `presentation` layers in tests.
3.  **Test Strategy Implementation**:
    - Define file naming conventions: `*.spec.ts` (Unit), `*.test.ts` (Integration).
    - Configure scripts: `test:unit`, `test:integration`.

### Out of Scope
- Writing new feature code.
- Backfilling 100% logical coverage (focus is on *structure* and *green build* first).
- Backend testing.
</scope>

<functional_requirements>
1.  **Environment Segregation**: The system must verify that files ending in `.tsx` or imported from `presentation` run in a **JSDOM** environment, while pure `domain/application` logic runs in **Node**.
2.  **Strict Mirroring**: The test directory tree must match the source directory tree.
3.  **Valid Mocks**: All mocks used in existing tests must align with the current `interface` definitions in `src`.
</functional_requirements>

<non_functional_requirements>
- **Performance**: Unit tests must run in parallel and complete in <10s.
- **Maintainability**: Standardized naming (`.spec.ts` vs `.test.ts`) must be enforced by tooling or convention.
</non_functional_requirements>

<user_flows>
- **Developer fixes a bug**:
    1.  Dev runs `npm run test:unit`.
    2.  **Result**: Tests pass (currently fails).
- **Developer adds a new Module**:
    1.  Dev creates `src/modules/new-feature`.
    2.  Dev MUST create `tests/modules/new-feature` with matching sub-layers.
</user_flows>

<ux_guidelines>
- N/A
</ux_guidelines>

<dependencies>
- **Vitest**: Test runner.
- **Testing Library**: For component testing.
- **JSDOM**: For browser environment simulation.
</dependencies>

<risks>
- **Hidden Bugs**: Fixing the environment might reveal *more* runtime errors in components that were previously crashing early.
- **Breaking Changes**: Renaming test files to split Unit/Integration might break open PRs.
</risks>

<assumptions>
- The code in `src` is the "Source of Truth". Tests must be updated to match `src`, not vice-versa.
</assumptions>

<acceptance_criteria>
- Given `npm run test:unit`, When executed, Then it completes with Exit Code 0.
- Given `vitest.config`, When component tests run, Then `window` and `document` are defined.
- Given the `tests/modules` folder, When listed, Then it contains `geography`, `reports`, and `dashboard` folders.
- Given the `Library` module tests, When run, Then assertions regarding `isAvailable` and `repository` methods pass.
</acceptance_criteria>

<open_questions>
- None. Analysis is complete.
</open_questions>

<standards_compliance>
- `workflow/standards/STANDARD_GENERAL.md`
- `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<handoff_notes>
- Proceed to Phase 1: Fix the Foundation (Configuration & Library Tests).
</handoff_notes>
