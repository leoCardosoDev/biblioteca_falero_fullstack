# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/prd/PRD_Monolith_Consolidation.md`.
# This PRD is the source of truth for all downstream technical specs.
# </role>

<role>
PRODUCT & DOMAIN ANALYST (PDA)
</role>

<meta>
- **PRD Name**: Monolith Consolidation (Frontend)
- **Owner**: Architect Team
- **Status**: approved
- **Version**: 1.0
- **Created At**: 2026-01-19
- **Last Updated**: 2026-01-19
</meta>

<related_specs>
- `app/docs/specs/01_in_progress/frontend/task_refactor_monolith_consolidation.md` (To be created)
</related_specs>

<context>
The Frontend application has adopted a **Modular Monolith** architecture (defined in `ADR 014`). However, the codebase is currently in a "Hybrid" state. While new feature modules (`src/modules/*`) follow the new pattern, a significant portion of the core domain logic (User, Geography) remains in specific legacy root directories (`src/domain`, `src/application`), which adheres to an older, non-modular "Root Clean Architecture" style.
</context>

<problem>
This hybrid state creates several critical issues:
1.  **Architecture Violation**: The root `src/domain` is accessible by all modules effectively acting as a global bucket, violating the "Module First" encapsulation principle.
2.  **Inconsistent Patterns**: Developers must navigate two conflicting directory structures (Root-based vs Module-based).
3.  **Missing Enforcement**: There is no automated tooling (Dependency Cruiser) to prevent new code from being added to the legacy root structures, leading to further technical debt accumulation.
4.  **Clean Architecture Violation**: The legacy `src/domain` currently contains Use Cases (e.g., `load-users.ts`), which technically belong in an Application layer, blurring the separation of concerns.
</problem>

<objectives>
- **Primary Objective**: Eliminate the "Hybrid" state by fully migrating all legacy root code into their respective feature modules (`identity`, `geography`) or the `shared` kernel.
- **Secondary Objective**: Implement strict, automated architectural enforcement using `dependency-cruiser` to prevent regression and ensure strict module boundaries as per ADR 014.
</objectives>

<shared_module_strategy>
The `shared` module is not a dumping ground for utilities. It must be treated as a Core Module that strictly adheres to **Clean Architecture** layers. This ensures that shared code (logic or UI) remains decoupled and follows the same dependency rules as feature modules.

### Structure
- **`src/shared/domain`**: Base building blocks for the domain.
    - *Content*: Generic `ValueObject` (e.g., UUID, DateVO), `Entity` base class, `DomainError`, `Result` pattern types.
    - *Rule*: Pure TypeScript, no dependencies on frameworks or UI.
- **`src/shared/application`**: Base application patterns and interfaces.
    - *Content*: `UseCase` interface, `AppError`, generic DTOs, `PaginatedResult` types.
    - *Rule*: Depends only on `shared/domain`.
- **`src/shared/infra`**: Reusable infrastructure adapters and technical services.
    - *Content*: `HttpClient` wrapper (Axios), `LocalStorage` adapter, `LoggerService`, `DateProvider`.
    - *Rule*: Depends on `shared/application` (interfaces) and `shared/domain`.
- **`src/shared/presentation`**: The Design System (UI Kit) and generic View logic.
    - *Content*: Atomic components (`Button`, `Input`, `Modal`), generic Layouts, shared Hooks (`useToast`, `useForm`), React Contexts (Theme).
    - *Rule*: Depends on `shared/application` and `shared/domain`.

### Dependency Rules for Shared
1. **Internal Integity**: The layers within `shared` must respect the dependency rule (e.g., `shared/domain` cannot import `shared/presentation`).
2. **External Isolation**: `shared` **CANNOT** import from `src/modules/*`. It must be completely agnostic of the application features. All Modules can import from `shared`.
</shared_module_strategy>

<success_metrics>
- **North Star Metric**: 100% of Domain and Application logic resides within `src/modules/*` or `src/shared`.
- **Supporting Metrics**:
    - `src/domain` (root) file count: 0 (Folder deleted).
    - `src/application` (root) file count: 0 (Folder deleted).
    - `dependency-cruiser` violation count: 0.
- **Baseline**: Mixed Root and Module logic.
- **Target**: Pure Modular Monolith (Root contains only `main`, `shared`, `modules`).
</success_metrics>

<users>
- **Developers**: Primary beneficiaries. They get clear, predictable boundaries and standard patterns.
</users>

<scope>
### In Scope
- Migration of `src/domain/models/user.ts` (and related authentication logic) to `src/modules/identity`.
- Migration of `src/domain/models/{city,state,neighborhood}.ts` to `src/modules/geography`.
- Migration of all Use Cases from `src/domain/usecases` to the `application` layer of their respective modules.
- Deletion of root `src/domain`, `src/application`, `src/infra`, `src/presentation` folders.
- Installation and strict configuration of `dependency-cruiser`.
- Update of `eslint-plugin-boundaries` to stop recognizing root layers as valid elements.
- Restructuring of `src/shared` to enforce the Clean Architecture internal layers (`domain`, `application`, `infra`, `presentation`).

### Out of Scope
- Adding new features.
- Refactoring the internal logic of the migrated code (unless necessary for the move).
- UI Redesign.
</scope>

<functional_requirements>
1. The application behavior must remain **unchanged** from the user's perspective.
2. The `Identity` module must encapsulate all User and Auth logic.
3. The `Geography` module must encapsulate all Location logic.
4. The Build system (CI) must fail if architectural rules are violated.
</functional_requirements>

<non_functional_requirements>
- **Maintainability**: Code structure must strictly mirror ADR 014.
- **Observability**: Architecture violations must be visible via `npm run lint` or `npx depcruise`.
</non_functional_requirements>

<user_flows>
- **No changes to user flows**. This is a pure structural refactor.
</user_flows>

<dependencies>
- **Internal**: `npm` packages for tooling.
</dependencies>

<risks>
- **Breaking Changes**: Moving files will break imports across the application.
    - *Mitigation*: Use VSCode's refactoring tools or careful manual path updates. Verify with `tsc` frequently.
- **Circular Dependencies**: Moving shared domain logic into modules might reveal hidden circular dependencies between modules.
    - *Mitigation*: Identify these early with `dependency-cruiser` and resolve by moving truly shared code to `src/shared` or using events.
</risks>

<assumptions>
- All code in `src/domain` belongs to either `Identity` or `Geography`.
</assumptions>

<acceptance_criteria>
- Given the project is built, When I run imports check, Then no file should import from `src/domain`, `src/application` (root paths).
- Given the file structure, When I look at `src`, Then I should NOT see `domain`, `application`, `infra`, `presentation` folders.
- Given `dependency-cruiser` config, When I check "Module A imports Module B private", Then it should report an error.
</acceptance_criteria>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`: STRICT compliance required.
- `.agent/standards/STANDARD_FRONTEND.md`: Clean Architecture layers must be respected within modules.
</standards_compliance>

<handoff_notes>
- **Architecture First**: Configure `dependency-cruiser` BEFORE moving code to help visualize the mess, or AFTER to lock it in. Recommendation: Config basic rules first to guide the move.
- **Verify Often**: Run the app after moving each "Concept" (e.g. all City stuff) to ensure no runtime breakages.
</handoff_notes>
