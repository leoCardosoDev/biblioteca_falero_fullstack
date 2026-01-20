# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_monolith_01_enforcement.md` (Enforcement tools ready)
</dependent_tasks>

<prior_task_summary task="task_monolith_01_enforcement">
## Summary of Task 01: Enforcement

### What Was Implemented
1. **dependency-cruiser** installed and configured in `.dependency-cruiser.cjs` with 5 strict rules:
   - `no-modules-to-legacy-root`: `src/modules/*` → `src/(domain|application|infra|presentation)/` **FORBIDDEN (ERROR)**
   - `no-shared-to-modules`: `src/shared/` → `src/modules/` **FORBIDDEN (ERROR)**
   - `no-domain-to-outer-layers`: Domain → App/Infra/Presentation **FORBIDDEN (ERROR)**
   - `no-application-to-outer-layers`: Application → Infra/Presentation **FORBIDDEN (ERROR)**
   - `no-cross-module-internals`: Modules cannot import other modules' internals **FORBIDDEN (ERROR)**

2. **Scripts Added** to `package.json`:
   - `npm run depcruise` — enforces rules (with `--ignore-known` for baseline)
   - `npm run depcruise:graph` — generates SVG visualization

3. **Husky Integration**: `pre-push` hook runs `npm run depcruise` before pushing.

4. **Dependency Graph**: Generated at `app/docs/artifacts/dep_graph_initial.svg`.

---

### Technical Debt Created (MUST BE FIXED)

#### 1. **16 Known Violations (Baseline)**
File: `.dependency-cruiser-known-violations.json`

These are **pre-existing imports** where new modules (`src/modules/*`) import from legacy `src/presentation/*`. They are whitelisted to allow the build to pass but **MUST be fixed** by migrating UI components to `src/shared/presentation` or the module's own `presentation` layer.

| Module | Legacy Import |
|--------|---------------|
| `dashboard` | `src/presentation/react/components/ui/*` (6 files) |
| `identity` | `src/presentation/react/components/ui/*`, `src/presentation/dtos/*` (4 files) |
| `library` | `src/presentation/react/components/ui/*` (3 files) |
| `reports` | `src/presentation/react/components/ui/*`, `charts/*` (2 files) |

**Resolution**: Move shared UI components (`Button`, `Card`, `Table`, `Charts`) to `src/shared/presentation/` and update all imports.

#### 2. **ESLint Boundaries Changed from ERROR to WARN**
File: `eslint.config.js` — `boundaries/element-types` rule

**Reason**: ESLint `eslint-plugin-boundaries` does not support a baseline mechanism like dependency-cruiser. The same 16+ violations would fail ESLint, blocking the build.

**Current State**: Violations show as **warnings** (not errors), so `npm run lint` passes.

**Resolution**: Once all baseline violations are fixed, change `'warn'` back to `'error'` in `eslint.config.js`:
```diff
- 'boundaries/element-types': ['warn', { ... }]
+ 'boundaries/element-types': ['error', { ... }]
```

---

### Verification Commands
```bash
# Check depcruise passes (ignores baseline)
npm run depcruise

# See all violations including baseline
npm run depcruise -- --no-ignore-known

# Check ESLint (should pass with warnings)
npm run lint
```
</prior_task_summary>

<context>
The `src/shared` module is critical for the Modular Monolith but currently may not strictly follow the Clean Architecture internal layering (Domain, Application, Infra, Presentation). It needs to be the "model citizen" module before we migrate others to depend on it.
</context>

<scope>
1. **Shared Structure**:
   - Ensure the following directories exist: `src/shared/domain`, `src/shared/application`, `src/shared/infra`, `src/shared/presentation`.
   - **Move/Refactor**:
     - `Generic Value Objects` (UUID, Date) -> `src/shared/domain`.
     - `Generic DTOs`, `AppError`, `Result` -> `src/shared/application`.
     - `HttpClient` (Axios wrapper), `Logger`, `DateProvider` -> `src/shared/infra`.
     - `UI Components` (Button, Modal), `Hooks` (UI-only) -> `src/shared/presentation`.
   - **Cleanup**: Remove any loose files in `src/shared` root that belong in a layer.

2. **Validation**:
   - Verify `dependency-cruiser` rules for `shared` internal integrity (e.g., Domain cannot import Presentation).

3. **Wrapper Implementation (Crucial)**:
   - Identify DIRECT usage of 3rd party libs (e.g., `axios`, `date-fns`) in Domain/Application.
   - Refactor them behind an interface in `shared/application` and implementation in `shared/infra`.
</scope>

<technical_constraints>
- **Purity**: `src/shared/domain` and `src/shared/application` MUST NOT contain any React code (`.tsx`, hooks, context).
- **Wrappers**: Per `STANDARD_FRONTEND.md` section 10, *EVERY* external library that provides infrastructure logic (Http, Storage, Analytics) must be wrapped.
  - *Exception*: Utility libraries like `lodash` *might* be allowed in App/Domain if they are pure functions, but prefer native JS or `shared/utils`. UI libraries (Radix, Framer) are allowed ONLY in `presentation`.
- **Testing**: Shared components must be tested.
  - Domain/App: Unit tests (Vitest).
  - Presentation: Component tests (Testing Library).
</technical_constraints>

<requirements>
- **Stack**: TypeScript, React.
- **Breaking Changes**: Moving shared components will break imports throughout the app.
  - *Mitigation*: Update imports immediately using global find/replace or refactoring tools. verify with `tsc`.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Codebase: `src/shared` clearly has `domain`, `application`, `infra`, `presentation` folders.
- [x] Codebase: NO loose files in `src/shared` root (except `index.ts` if used as public api, but preferred per-layer).
- [x] Architecture: `src/shared/domain` contains NO React code.
- [x] Architecture: `axios` is NOT imported directly in any Domain/App layer; ensuring `HttpClient` interface usage.
- [x] Lint: `dependency-cruiser` reports no internal circular dependencies or layer violations within `shared`.
</acceptance_criteria>

<output>
1. **Summary**: Restructured Shared Kernel to follow Clean Architecture principles, ensuring strict layer boundaries.
2. **Implementation Details**:
   - **Internal Reorganization**: Created `domain/`, `application/`, `infra/`, and `presentation/` directories within `src/shared`.
   - **Component Migration**: Moved atomic UI components to `src/shared/presentation/ui`.
   - **Utility Migration**: Moved generic patterns (Either/Result) to `src/shared/application/common`.
   - **Infrastructure Migration**: Moved state management (Zustand slices) to `src/shared/infra/store`.
   - **Import Refactoring**: Globally updated import paths to reflect the new structure.
   - **Barrel Export**: Updated `src/shared/index.ts` to maintain a clean public API for the shared kernel.
3. **Verification**:
   - `dependency-cruiser` confirmed zero circular dependencies or layer violations within `shared`.
   - `npm run lint` and `tsc --noEmit` passed with no new errors.
4. **Manual Test Guide**: Verify `src/shared` directory structure and check if UI components render correctly in the application.
</output>
