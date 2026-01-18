# Unified Rich Domain Model Strategy

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Unified Rich Domain Model Strategy
- **Owner**: Backend Architecture Team
- **Status**: draft
- **Version**: 1.0
- **Created At**: 2026-01-17
- **Last Updated**: 2026-01-17
</meta>

<related_specs>
- None
</related_specs>

<context>
The current `app/backend` codebase exhibits inconsistent architectural patterns regarding Domain Entities.
- **Geography Module**: Splits concepts into `domain/entities` (logic) and `domain/models` (anemic interfaces).
- **Identity Module**: Places rich entities (classes with behavior) inside `domain/models`, creating semantic confusion.
- **Shared Kernel**: Contains `domain/models` which are likely Value Objects or DTOs.

This inconsistency contradicts **ADR 013 (Modular Monolith with Clean Architecture)**, which advocates for a clean separation of concerns and Rich Domain Models (DDD).
</context>

<problem>
The existence of `domain/models` alongside `domain/entities` creates ambiguity and encourages "Anemic Domain Models" (Anti-Pattern).
- Developers are unsure where to place business logic.
- Data definitions (`models`) become disconnected from their invariants and behaviors (`entities`).
- `Identity` module violates convention by hiding Entities inside a `models` directory.
- `Geography` module violates cohesion by separating state definition from behavior.

This fragmentation harms maintainability, readability, and the enforcement of business rules.
</problem>

<objectives>
- **Primary Objective**: Standardize all modules to use `domain/entities` for Rich Domain Models, strictly following ADR 013.
- **Secondary Objective**: Eliminate the `domain/models` directory from the Domain Layer entirely.
</objectives>

<success_metrics>
- **North Star Metric**: 100% of Domain Logic resides in `domain/entities`.
- **Supporting Metrics**:
    - Zero files remaining in `domain/models` across all modules.
    - All existing "Data Interfaces" in `models` are merged into their corresponding "Entity Classes".
- **Baseline**: `Identity` has 0 entities in `entities` folder. `Geography` has split implementation.
- **Target**: `Identity` and `Geography` (and future modules) have only `domain/entities`.
</success_metrics>

<users>
- **Backend Developers**: Primary consumers of the architecture.
- **Architects**: Responsible for enforcing the pattern.
</users>

<scope>
### In Scope
- Refactoring `src/modules/geography` to merge `models` into `entities`.
- Refactoring `src/modules/identity` to rename/move `models` to `entities`.
- Updating all imports references in `application`, `infra`, `presentation`, and `tests`.
- Removing `domain/models` directory from all modules.

### Out of Scope
- Changing database schemas (Infra layer).
- Refactoring `infra/db/typeorm/entities` (these are ORM specific and should remain in Infra, though naming collision is a known minor trade-off).
</scope>

<functional_requirements>
1. The system must not have `domain/models` directories.
2. The user (developer) must define all business invariants within the Entity class in `domain/entities`.
3. The system must prevent accessing raw data structures without passing through Domain Entity behaviors (where applicable).
</functional_requirements>

<non_functional_requirements>
- **Maintainability**: Clearer directory structure reduces cognitive load.
- **Consistency**: All modules look and feel the same.
- **Compliance**: Adherence to DDD and Clean Architecture (ADR 013).
</non_functional_requirements>

<user_flows>
N/A - Architectural Refactor
</user_flows>

<ux_guidelines>
N/A
</ux_guidelines>

<dependencies>
- **Codebase**: `app/backend/src`
- **ADR 013**: Modular Monolith
</dependencies>

<risks>
- **High Risk**: Breaking Changes in Imports. Moving these files will require updating imports in potentially hundreds of files (Use Cases, Repositories, Tests).
- **Mitigation**: Use automated refactoring tools (IDE or scripts) and run the full test suite (`npm run test`) after every move.
</risks>

<assumptions>
- The existing interfaces in `models` (Geography) are 1:1 mappable to the `entities`.
- `Identity` "models" are already complying with Entity rules and just need moving.
</assumptions>

<acceptance_criteria>
- Given the `geography` module, When I look at `domain`, Then I see `entities` containing `City`, `State`, etc., and NO `models` folder.
- Given the `identity` module, When I look at `domain`, Then I see `entities` containing `User`, `Login`, etc., and NO `models` folder.
- Given the entire project, When I run `npm run test`, Then all tests pass.
- Given the codebase, When I search for `from '.../domain/models'`, Then I find 0 results (except potentially Shared Kernel types if decided to stay, but preferably moved to `types` or `value-objects`).
</acceptance_criteria>

<open_questions>
- Should `Shared Kernel` also follow this? (Assumption: Yes, strict standardization).
</open_questions>

<standards_compliance>
- `workflow/standards/STANDARD_GENERAL.md`
- `app/docs/adr/013_modular_monolith_clean_architecture.md`
</standards_compliance>

<handoff_notes>
- **Task Specs**:
    1. Refactor Geography Module (Merge Models -> Entities)
    2. Refactor Identity Module (Move Models -> Entities)
    3. Update Shared Kernel (Review/Move)
    4. Global Import Fix & Verify
</handoff_notes>
