# <role>
# You are the TECHNICAL LEAD & ARCHITECT.
# </role>

<context>
The system is currently a horizontal Layered Monolith. We are refactoring it into a **Modular Monolith** based on DDD Bounded Contexts defined in `app/docs/sql/falero.sql`.
This document serves as the **Master Phase Guide**. It does not contain implementation details but orchestrates the execution order of the granular specs located in `specs/`.
</context>

<scope>
The refactor is divided into strictly sequential phases. **Each phase MUST be completed and verified before moving to the next.**

### Phase 1: Foundation
1.  **[01_config.md](01_config.md)**: Configuration of Typescript paths and Module Aliases to support `@/modules` and `@/shared`.
2.  **[02_linting.md](02_linting.md)**: Configuration of `eslint-plugin-boundaries` to strictly enforce the new architecture rules.

### Phase 2: Shared Kernel
3.  **[03_shared_kernel.md](03_shared_kernel.md)**: Extraction of the Shared Kernel (Domain, Application, Infra) to `src/shared`.

### Phase 3: Bounded Contexts
4.  **[04_module_geography.md](04_module_geography.md)**: Migration of the **Geography** Context (`City`, `State`, `Neighborhood`).
5.  **[05_module_identity.md](05_module_identity.md)**: Migration of the **Identity** Context (`User`, `Login`, `Role`, `Permission`, `Auth`).

### Phase 4: Main Integration
6.  **[06_main_composition.md](06_main_composition.md)**: Refactoring of the Composition Root (`src/main`) to wire the new Modules.

### Phase 5: Verification
7.  **[07_tests_refactor.md](07_tests_refactor.md)**: Comprehensive update of all tests (Unit, Integration) to align with the new structure and ensure 100% pass rate.
</scope>

<requirements>
- **Strict Granularity**: Do not combine tasks. Follow the specs exactly.
- **Verification**: `npm run lint` must pass after every spec.
- **Notification**: Notify user in pt-BR upon completion of each spec.
</requirements>

<acceptance_criteria>
- [x] Spec 01 (Config) Completed.
- [x] Spec 02 (Linting) Completed.
- [x] Spec 03 (Shared Kernel) Completed.
- [x] Spec 04 (Geography) Completed.
- [x] Spec 05 (Identity) Completed.
- [x] Spec 06 (Main) Completed.
- [x] Spec 07 (Tests) Completed.
</acceptance_criteria>

<output>
1.  **Status**: All granular specs executed.
2.  **Result**: A fully functioning Modular Monolith with passing lint and tests.
</output>
