# <role>
# You are the TECHNICAL LEAD & ARCHITECT.
# </role>

<context>
The frontend is currently a Layered Architecture (`src/presentation`, `src/domain`).
We are refactoring it into a **Modular Monolith** to mirror the Backend's DDD Bounded Contexts.
This ensures "Screaming Architecture" where the folder structure indicates business capabilities.
</context>

<scope>
The refactor is divided into strictly sequential phases. **Each phase MUST be completed and verified before moving to the next.**

### Phase 1: Foundation
1.  **[01_config.md](01_config.md)**: Configuration of Vite/TS paths (`@/modules`, `@/shared`) and Linting rules for strict boundaries.

### Phase 2: Shared Kernel
2.  **[02_shared_kernel.md](02_shared_kernel.md)**: Extraction of the generic UI Kit, Hooks, and Domain Kernel to `src/shared`.

### Phase 3: Bounded Contexts
3.  **[03_module_geography.md](03_module_geography.md)**: Migration of the **Geography** Context (Address components, City/State services).
4.  **[04_module_identity.md](04_module_identity.md)**: Migration of the **Identity** Context (Login, User Management).

### Phase 4: Main Integration
5.  **[05_main_composition.md](05_main_composition.md)**: Refactoring of the Composition Root (`src/main`) and Routes to wire the new Modules.

### Phase 5: Verification
6.  **[06_tests_refactor.md](06_tests_refactor.md)**: Comprehensive update of all tests to align with the new structure.
</scope>

<requirements>
- **Strict Granularity**: Do not combine tasks.
- **Verification**: `npm run lint` must pass after every spec.
- **Notification**: Notify user in pt-BR upon completion of each spec.
</requirements>

<acceptance_criteria>
- [ ] Spec 01 (Config) Completed.
- [ ] Spec 02 (Shared Kernel) Completed.
- [ ] Spec 03 (Geography) Completed.
- [ ] Spec 04 (Identity) Completed.
- [ ] Spec 05 (Main) Completed.
- [ ] Spec 06 (Tests) Completed.
</acceptance_criteria>

<output>
1.  **Status**: All granular specs executed.
2.  **Result**: A fully functioning Frontend Modular Monolith.
</output>
