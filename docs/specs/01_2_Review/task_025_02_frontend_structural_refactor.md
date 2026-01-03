# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/task_025_02_frontend_structural_refactor.md`.
# </role>

<dependent_tasks>
- [Task 025_01: Frontend Infra Audit](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/specs/task_025_01_frontend_infra_audit.md)
</dependent_tasks>

<context>
All `.tsx` files are currently under `src/presentation/{components,pages,contexts,hooks}` mixed with generic TS helpers.
</context>

<scope>
1. **Framework Isolation**:
   - [ ] Move all components, pages, and React-specific hooks/contexts to `src/presentation/react/*`.
   - [ ] Fix all relative imports resulting from the move.
2. **Domain Shielding**:
   - [ ] Move shared types from `src/types.ts` to `src/domain/models/*`.
   - [ ] Create `index.ts` files for layer-level exports as per `STANDARD_GENERAL.md`.
3. **Logic Extraction**:
   - [ ] Identify business logic in `presentation/react/hooks` and move to `application/hooks` if it doesn't depend on React lifecycle/state.
</scope>

<requirements>
- **Standards**: `STANDARD_FRONTEND.md` (Clean Architecture), `STANDARD_GENERAL.md` (Naming/Imports).
</requirements>

<acceptance_criteria>
- [x] All `.tsx` files are located within `src/presentation/react`.
- [x] Imports use the `@/` alias and are consolidated at layer level.
- [x] No build errors after reorganization.
</acceptance_criteria>

<output>
- **Reorganized Source Tree**: Compliant with ADR_011.
</output>
