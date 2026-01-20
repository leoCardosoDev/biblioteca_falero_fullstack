# Frontend Testing Strategy & Architecture Refactor

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Frontend Testing Strategy & Architecture Refactor
- **Owner**: Frontend Architecture Team
- **Status**: draft
- **Version**: 1.0
- **Created At**: 2026-01-20
- **Last Updated**: 2026-01-20
</meta>

<related_specs>
- `app/docs/reports/frontend-test-analysis-report.md`
- `app/docs/adr/014_frontend_modular_monolith.md`
- `app/docs/adr/013_modular_monolith_clean_architecture.md`
</related_specs>

<context>
The frontend application has shifted to a **Modular Monolith** architecture with **Clean Architecture** principles (ADR 013, ADR 014). However, the testing strategy and directory structure have lagged behind. Currently, the `tests/` directory is structurally immature, incomplete, and does not mirror the `src/` modular structure. This disconnect creates a risk of regression, hinders refactoring, and obscures the true coverage of the system.
</context>

<problem>
The current testing architecture is incompatible with the codebase's Modular Monolith structure.

1.  **Structural Divergence**: `tests/modules` is missing critical modules (`geography`, `reports`, `dashboard`) that exist in `src/`. `tests/shared` contains invalid structures (e.g., `store` folder) that do not exist in `src/shared`.
2.  **Missing Test Types**: There are **zero** integration tests (`.test.ts`) and **zero** E2E tests, despite Playwright being installed. The test suite is purely unit-focused (`.spec.ts`).
3.  **False Confidence**: "100%" coverage metrics are likely achieved by excluding vast parts of the system (like Presentation layer pages and missing modules) from analysis.
4.  **Violation of ADR 014**: The "Screaming Architecture" mandated by ADR 014 is not respected in the test folder.
</problem>

<objectives>
- **Primary Objective**: Establish a **1:1 Structural Mirror** between `src/` and `tests/`. Every module and layer in source must have a corresponding test location.
- **Secondary Objective**: Implement the **Test Pyramid** by separating Unit (`.spec.ts`), Integration (`.test.ts`), and E2E tests, and ensuring coverage across Presentation, Application, Domain, and Infra layers.
</objectives>

<success_metrics>
- **North Star Metric**: **True 100% Coverage** of the *entire* codebase (including Presentation/Pages) with strict exclusions only for config/types.
- **Supporting Metrics**:
    - 100% Structural Parity (File count overlap between `src/**` and `tests/**` matches expectations).
    - Presence of Integration tests for all Repository adapters.
    - Presence of E2E tests for Critical User Flows (Login, Dashboard).
- **Baseline**: 32 Unit tests, 0 Integration, 0 E2E. Missing 3 modules.
- **Target**: Complete structural mirror, populated integration/E2E suites, correct Vitest configuration.
</success_metrics>

<users>
- **Developers**: Need clear places to put tests for each layer (Domain logic -> Unit, Repo -> Integration, Page -> Component/E2E).
- **QA/CI**: Needs reliable signals that the *entire* application works, not just isolated functions.
</users>

<scope>
### In Scope
- **Structural Refactoring**:
    - Create missing `tests/modules/{geography,reports,dashboard}`.
    - Clean up `tests/shared` to match `src/shared` layers (`domain`, `application`, `infra`, `presentation`).
- **Test Type Implementation**:
    - Configure Vitest to run `.test.ts` (Integration) separately or distinctly.
    - Initialize Playwright in `tests/e2e`.
- **Coverage Configuration**:
    - Update `vitest.config.ts` to remove broad exclusions (e.g., enable coverage for Pages).
- **Missing Tests**:
    - Add placeholder/skeleton tests for missing modules to ensure structure exists.

### Out of Scope
- Writing the full body of 1000+ tests (focus is on Structure, Strategy, and Critical Path first).
- Backend testing structure.
</scope>

<functional_requirements>
1.  **Strict Mirroring**: The system must enforce that for every `src/path/to/File.ts`, a corresponding `tests/path/to/File.spec.ts` (or `.test.ts`) location is valid and preferred.
2.  **Test Separation**: The system must support running Unit tests (fast, mocked) separately from Integration tests (slower, real adapters) and E2E (browser).
3.  **Full Module Coverage**: The system must include tests for `geography`, `reports`, and `dashboard` modules.
4.  **Layered Testing**:
    - **Domain**: Pure Unit tests.
    - **Application**: Unit tests (mocked ports).
    - **Infrastructure**: Integration tests (real adapters).
    - **Presentation**: Component tests (Testing Library) and E2E.
</functional_requirements>

<non_functional_requirements>
- **Maintainability**: Test structure must be intuitive for any dev familiar with the `src` structure.
- **Performance**: Unit tests should remain sub-second. Dependency Cruiser should enforce test boundaries if possible.
- **Reliability**: CI must fail if `tests/` structure diverges significantly from `src/` (enforced via review or script).
</non_functional_requirements>

<user_flows>
- **Developer Workflow**:
    1.  Create `src/modules/foo/application/MyUseCase.ts`.
    2.  Immediately know to create `tests/modules/foo/application/MyUseCase.spec.ts`.
    3.  Run `npm run test:unit` to verify.
</user_flows>

<ux_guidelines>
- N/A (Internal Codebase Structure)
</ux_guidelines>

<dependencies>
- **Vitest**: Test runner.
- **Playwright**: E2E runner.
- **React Testing Library**: Component testing.
- **Dependency Cruiser**: For structural enforcement (future).
</dependencies>

<risks>
- **CI Failure**: Exposing the lack of coverage by removing exclusions will likely drop the reported coverage to <20%, causing CI gates to fail.
    - *Mitigation*: Temporarily adjust CI thresholds or use a "baseline" file to ignore existing gaps while enforcing 100% on NEW code.
- **Refactoring friction**: Moving existing tests might lose git history or require updating many imports.
</risks>

<assumptions>
- The `src` structure is the source of truth and is correct (Modular Monolith).
- We have the authority to break the current "100%" coverage illusion to reveal the truth.
</assumptions>

<acceptance_criteria>
- Given the `tests/` directory, When inspected, Then it exactly mimics the structure of `src/` (modules, shared, layers).
- Given the `modules` directory, When checked, Then `identity`, `geography`, `reports`, `dashboard` all have corresponding test folders.
- Given `vitest.config.ts`, When coverage is run, Then it includes `src/presentation/react/pages` and other currently excluded application parts.
- Given the codebase, When a repository adapter is tested, Then it is done via a `.test.ts` file in the `infra` layer test folder.
</acceptance_criteria>

<open_questions>
- Should we enforce a strict file-naming convention (e.g., `*.it.ts` for integration)? (Proposed: `.test.ts` for integration, `.spec.ts` for unit).
</open_questions>

<standards_compliance>
- `modular-ddd-clean-arch.md`
- `adr/014_frontend_modular_monolith.md`
</standards_compliance>

<handoff_notes>
- **Do not generate task specs immediately.** Review this PRD first.
- Implementation should proceed in phases: Restructure -> Configure -> Populate Gaps.
</handoff_notes>
