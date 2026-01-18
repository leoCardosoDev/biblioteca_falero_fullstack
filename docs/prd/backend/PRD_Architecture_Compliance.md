# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/prd/PRD_<short_name>.md`.
# This PRD is the source of truth for all downstream technical specs.
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Architecture Compliance & Refactor
- **Owner**: Architecture Team
- **Status**: draft
- **Version**: 1.0
- **Created At**: 2026-01-17
- **Last Updated**: 2026-01-17
</meta>

<related_specs>
- None (to be generated)
</related_specs>

<context>
- The system has adopted a **Modular Monolith** architecture (ADR 013).
- **ADR 003** mandates a strict 4-layer structure (`domain`, `application`, `presentation`, `infra`) for every module.
- Current analysis of `app/backend/src` reveals structural divergences, specifically the presence of `usecases` within the `domain` layer of identifying modules (`identity`, `geography`).
</context>

<problem>
- **Logic Leakage**: Application Component logic (Use Cases) is polluting the `domain` layer.
- **Violation of Standards**: ADR 003 explicitly places "Use Cases" in the `application` layer and restricts the `domain` layer to strict Enterprise Business Rules (Entities, VOs).
- **Inconsistent Dependencies**: Split placement of use cases (some in `domain`, some in `application`) creates confusion and potential circular dependencies.
- **Ambiguous Definitions**: Terminology for contracts (`gateways` vs `repositories`) is inconsistent between layers.
</problem>

<objectives>
- **Primary Objective**: Enforce strict alignment with ADR 003 and ADR 013 across all modules.
- **Secondary Objective**: Standardize the location of all architectural components (Gateways, Errors, Protocols).
</objectives>

<success_metrics>
- **North Star Metric**: 100% Compliance with ADR 003 Directory Structure.
- **Supporting Metrics**:
  - `domain` layers contain ZERO `usecases`.
  - All Use Cases reside in `application/usecases`.
  - `eslint-plugin-boundaries` reports 0 violations.
- **Baseline**: Current state has `usecases` in `domain/`.
- **Target**: `domain` is pure Enterprise Logic.
</success_metrics>

<users>
- **Developers**: Need clear, predictable structure to maintain velocity.
- **Architects**: Need enforcement of rules to prevent erosion.
</users>

<scope>
### In Scope
- Refactoring `src/modules/identity`
- Refactoring `src/modules/geography`
- Verification of `src/shared` compliance
- Moving `usecases` from `domain` to `application`
- Directing `protocols` and `gateways` to their correct layers defined in ADRs
- Updating all imports affected by moves

### Out of Scope
- Changing business logic behavior (refactor only)
- Adding new features
- UI/Frontend changes
</scope>

<functional_requirements>
1. The system must maintain identical behavior after refactoring (Pure Refactoring).
2. The `domain` layer **MUST NOT** contain `usecases`.
3. The `application` layer **MUST** contain all `usecases`.
</functional_requirements>

<non_functional_requirements>
- **Performance**: No regression.
- **Maintainability**: Improved traversability and clarity.
- **Compliance**: Strict adherence to Clean Architecture.
</non_functional_requirements>

<user_flows>
- **Primary Flow**: N/A (Code Refactoring)
</user_flows>

<ux_guidelines>
- N/A
</ux_guidelines>

<dependencies>
- Internal: Requires passing CI/Tests after file moves.
</dependencies>

<risks>
- **Breaking Changes**: Moving files will break imports across the application.
- **Risk**: High volume of file touches.
- **Mitigation**: Automated refactoring tools or careful step-by-step moves with strict "Fix Lint/Test" cycles.
</risks>

<assumptions>
- Existing tests cover the logic being moved, allowing for safe verifying of the refactor.
</assumptions>

<acceptance_criteria>
- Given the `identity` module, When I inspect `src/modules/identity/domain`, Then I see NO `usecases` directory.
- Given the `identity` module, When I inspect `src/modules/identity/application`, Then I see ALL `usecases`.
- Given the `geography` module, When I inspect `src/modules/geography/domain`, Then I see NO `usecases` directory.
- All tests pass (`npm run test:unit`, `npm run test:integration`).
- Lint checks pass with no circular dependencies.
</acceptance_criteria>

<open_questions>
- Should `gateways` in `domain` be renamed to `repositories` (interfaces) to match standard DDD terminology, or kept as `gateways` but clearly defined? (ADR 003 mentions "Repository Interfaces" in Domain and "Gateway Interfaces" in Application).
</open_questions>

<standards_compliance>
- `app/docs/adr/013_modular_monolith_clean_architecture.md`
- `app/docs/adr/003_backend_clean_architecture.md`
</standards_compliance>

<handoff_notes>
- This PRD generates task specs for moving files.
- Attention to `index.ts` barrel files is critical to check after moves.
</handoff_notes>
