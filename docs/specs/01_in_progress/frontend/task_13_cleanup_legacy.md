# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<role>
You are a Senior Frontend Engineer responsible for the final cleanup and verification of the Frontend Refactor.
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_09_migrate_identity.md`
- `app/docs/specs/01_in_progress/frontend/task_10_migrate_geography.md`
- `app/docs/specs/01_in_progress/frontend/task_11_migrate_library.md`
- `app/docs/specs/01_in_progress/frontend/task_12_migrate_dashboard_reports.md`
</dependent_tasks>

<context>
All features should have been migrated to `src/modules/`.
The legacy folders `src/domain`, `src/application`, `src/infra`, and `src/presentation` should now be empty or contain only deprecated/unused files.
</context>

<scope>
Final verification and deletion of the legacy Strict Layered Architecture folders.

1.  **Verification**:
    - Check if any files remain in `src/domain`, `src/application`, `src/infra`, `src/presentation`.
    - If files remain, investigate if they were missed during migration (and create a fix-it list if needed).

2.  **Deletion**:
    - Delete `src/domain`
    - Delete `src/application`
    - Delete `src/infra` (Verify `shared` infra is separate: `src/shared/infra`).
    - Delete `src/presentation`

3.  **Audit**:
    - Run `npm run lint` strict check.
    - Run `tsc` (Type check).
    - Run `npm run test` (All tests).
    - Search for any remaining direct occurrences of `axios` outside of `AxiosAdapter`.

4.  **Documentation**:
    - Update `README.md` to reflect the new Modular Monolith structure.
</scope>

<requirements>
- **Stack**: Bash (for deletion), npm scripts.
- **Critical**: Ensure the application still builds and runs after deletion.
</requirements>

<architectural_guidance>
> **Refactoring Engine**: Apply detailed patterns from `app/docs/prompts/refactor.md` and `.agent/standards/STANDARD_REFACTORING.md`.

### 1. The Clean Sweep
- **Dead Code Elimination**: This is the ultimate "Delete" refactor. Any code not reachable from `src/main.tsx` (via Main Entry -> Modules) MUST be deleted.
- **Component Anatomy**: Verify all remaining components in `modules/` follow the Single Responsibility Principle. If a migrated component was simply copied and pasted with smells, flag it for a follow-up "Optimization" task (or fix it if trivial).

### 2. Structural Integrity
- **Dependency Rule**: Ensure `src/modules/X` NEVER imports from `src/modules/Y` directly (except via Public API/Shared Kernel). Use `eslint-plugin-boundaries` to enforce this.
</architectural_guidance>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`
- `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Codebase: `src/domain`, `src/application`, `src/infra` (root), `src/presentation` folders are GONE.
- [ ] Codebase: Root `src` only contains `modules`, `shared`, `main`, and entry files (`App.tsx`, `main.tsx`, `vite-env.d.ts`).
- [ ] Test: Full test suite passes.
- [ ] Build: `npm run build` succeeds.
</acceptance_criteria>
