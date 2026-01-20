# Implementation Plan - Task Monolith 01: Enforcement

## Goal Description
Establish automated architectural enforcement for the frontend transition from "Legacy Clean Architecture" to "Modular Monolith". This task involves installing `dependency-cruiser`, configuring strict boundary rules to prevent regression (New Modules MUST NOT import Legacy Root), and integrating these checks into the development workflow (Husky/CI).

## User Review Required
> [!IMPORTANT]
> **Dependency Cruiser Baseline**: If the current codebase has many violations, we will generate a baseline (`.dependency-cruiser-baseline.js`) to allow valid current state but strictly forbid *new* violations.
> **Strict Rules**: The build WILL FAIL if `src/modules/*` imports from `src/domain` or `src/application`. This is a hard constraint to force the migration direction.

## Proposed Changes

### Frontend Infrastructure

#### [MODIFY] [package.json](file:///home/leoca/projects/SoftwareHouse/app/frontend/package.json)
- Add `dependency-cruiser` to `devDependencies`.
- Add `depcruise` script: `depcruise src --config .dependency-cruiser.js`.
- Add `depcruise:graph` script (optional) for visualization.

#### [NEW] [file:///home/leoca/projects/SoftwareHouse/app/frontend/.dependency-cruiser.js]
- Create configuration file for `dependency-cruiser`.
- **Rule 1 (Strict)**: `src/modules/*` cannot import `src/domain`, `src/application`, `src/infra`, `src/presentation` (Legacy Roots).
- **Rule 2 (Strict)**: `src/shared` cannot import `src/modules/*`.
- **Rule 3 (Strict)**: `src/shared` internal Clean Architecture (Domain -> App -> Infra -> Presentation).
- **Rule 4 (Strict)**: Enforce Barrel Pattern (no internal imports from other modules).

#### [MODIFY] [eslint.config.js](file:///home/leoca/projects/SoftwareHouse/app/frontend/eslint.config.js) (or equivalent)
- Update `eslint-plugin-boundaries` settings.
- Define "Module" elements (`src/modules/*`).
- Define "Legacy" elements (`src/domain`, etc.).
- Configure rules to WARN on Legacy usage but ERROR on New Module violations.

### CI/CD & Workflow

#### [MODIFY] [.husky/pre-push](file:///home/leoca/projects/SoftwareHouse/app/frontend/.husky/pre-push)
- Add `npm run depcruise` to ensure no architectural violations are pushed.

## Verification Plan

### Automated Tests
- Run `npm run depcruise` -> Should pass (or fail with known violations handled by baseline).
- **Negative Test**:
    1. Create a temp file `src/modules/geography/test_violation.ts`.
    2. Import `src/domain/entities/User.ts` (or similar legacy file).
    3. Run `npm run depcruise`.
    4. Expect **FAILURE**.
    5. Delete temp file.

### Manual Verification
1. Inspect the generated dependency graph (if generated).
2. Verify that `husky` blocks a bad push (can simulate with a local branch).

## Final Delivery Checklist
- [ ] `dependency-cruiser` installed in `app/frontend/package.json`
- [ ] `.dependency-cruiser.js` created with all 3 strict rules
- [ ] `npm run depcruise` script added and working
- [ ] Husky `pre-push` hook configured
- [ ] ESLint boundaries updated for Hybrid state
- [ ] Baseline generated (if needed) to allow existing state
- [ ] **Verification**: "Negative Test" confirmed that violations break the build
