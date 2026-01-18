# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_01_init_structure_lint.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- None (First task in the sequence)
</dependent_tasks>

<context>
- Current frontend is a Layered Architecture.
- We are moving to a **Modular Monolith** structure to match the backend.
- We need to establish the physical directory structure and **strict architectural boundaries** before writing any feature code.
- Dependencies must be strictly controlled via Linting to prevent "Spaghetti Code".
</context>

<scope>
Detailed architectural setup requirements.

1. **Physical Structure Initialization**:
    - Clean `src/` (or prepare `src/` if strictly additive). Enforce the following High-Level directories:
        - `src/modules/` (Bounded Contexts)
        - `src/shared/` (Shared Kernel: UI, Libs, Infra wrappers)
        - `src/main/` (Composition Root: App, Router, Providers)
        - `src/infra/` (Global Infra - typically empty in favor of `shared/infra`, but keep for root concerns if needed)

2. **Dependency Management & Configuration**:
    - **Vite & TSConfig**:
        - Update `vite.config.ts` and `tsconfig.json` to support Path Aliases:
            - `@/modules/*` -> `src/modules/*`
            - `@/shared/*` -> `src/shared/*`
            - `@/main/*` -> `src/main/*`
    - **Linting (The Law)**:
        - Install `eslint-plugin-boundaries`.
        - Configure strict elements in `.eslintrc.cjs` (or `eslint.config.js` if flat config):
            - `type: 'module'` (matches `src/modules/*`)
            - `type: 'shared'` (matches `src/shared/*`)
            - `type: 'main'` (matches `src/main/*`)
        - **Enforce Rules**:
            - `module` can depend on `shared`.
            - `module` can depend on `module` **ONLY** via `public` (e.g., `src/modules/*/public/index.ts`). **CRITICAL**: Ban import of `src/modules/*/domain|infra|application|presentation`.
            - `shared` can **NOT** depend on `module` or `main`.
            - `main` can depend on everything (to compose).
</scope>

<requirements>
- **Stack**: React, TypeScript, Vite, ESLint
- **Negative Constraints**:
    - Do NOT migrate any existing legacy code yet.
    - Do NOT create any feature logic yet.
- **Technical constraints**:
    - Use `eslint-plugin-boundaries` for architectural enforcement.
    - Ensure VSCode `settings.json` (if present) respects the new lint rules.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Gitflow**: `.agent/standards/STANDARD_GITFLOW.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Directory structure `src/modules`, `src/shared`, `src/main` exists.
- [x] Path Aliases (`@/modules`, `@/shared`) work in a test file.
- [x] `npm run lint` **FAILS** if a file in `src/modules/A` imports `src/modules/B/domain/entity.ts` (Private access violation).
- [x] `npm run lint` **PASSES** if a file in `src/modules/A` imports `src/modules/B/public/index.ts` (Public API access).
- [x] `npm run lint` **FAILS** if `src/shared` imports `src/modules/A` (Dependency Inversion violation).
</acceptance_criteria>

<output>
1. **Summary**: Established the Modular Monolith skeleton and configured the Linting "Police".
2. **Decisions**: Adopted `eslint-plugin-boundaries` to automate architectural review.
3. **Manual Test Guide**: Create temporary files violating the rules and confirm Lint failure.
</output>
