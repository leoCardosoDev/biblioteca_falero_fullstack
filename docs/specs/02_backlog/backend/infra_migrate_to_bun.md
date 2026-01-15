# <role>
# You are the DEVOPS ENGINEER & BACKEND DEVELOPER.
# Your output MUST be a valid Markdown file named `app/docs/specs/02_backlog/backend/infra_migrate_to_bun.md`.
# </role>

<role>
You are the Infrastructure Specialist. You execute the migration to Bun with strict adherence to enterprise performance standards and immutability.
</role>

<dependent_tasks>
- **Prerequisite**: `app/docs/specs/01_in_progress/backend/refactor/spec.md`.
</dependent_tasks>

<context>
-   **Current State**: Node.js v20, npm, `ts-node`.
-   **Goal**: Eliminate Node.js runtime entirely. Establish Bun as the single runtime for Development, Testing, and Production.
</context>

<scope>
Execute the following strictly sequential steps.

1.  **Package Management**:
    -   Execute `rd /s /q node_modules` (Windows) or `rm -rf node_modules` (WSL).
    -   Delete `package-lock.json`.
    -   Run `bun install`.
    -   Update `package.json` > `engines` to `{ "bun": ">=1.0.0" }`.

2.  **Runtime Configuration**:
    -   **Uninstall**: `npm remove ts-node ts-node-dev nodemon module-alias rimraf`.
    -   **Configure `tsconfig.json`**:
        -   Set `moduleResolution` to `bundler`.
        -   Set `paths` explicitly. Bun reads this natively.
    -   **Script Updates** (package.json):
        -   `dev`: `bun run --watch src/main/server.ts`
        -   `start`: `bun run dist/server.js` (Production runs compiled code).
        -   `build`: `bun build ./src/main/server.ts --outdir ./dist --target bun --sourcemap=none --minify` (Enforce build verification).

3.  **Codebase Migration**:
    -   **Path Resolution**: Remove `import 'module-alias/register'` from `src/main/server.ts`.
    -   **Env Loading**: Remove `dotenv`. Bun loads `.env` natively at startup.

4.  **Testing Strategy (`bun:test`)**:
    -   **Uninstall**: `npm remove jest ts-jest @types/jest`.
    -   **Install**: `bun add -d @types/bun`.
    -   **Refactor Tests**:
        -   Replace `import { describe, it, expect } from 'jest'` with `import { describe, it, expect } from 'bun:test'`.
        -   Replace `jest.fn()` with `import { mock } from 'bun:test'`.
        -   Replace `beforeAll/afterAll` imports from `bun:test`.
    -   **Script**: `test:ci`: `bun test` (Must pass with 0 failures).

5.  **Infrastructure (Docker)**:
    -   **Dockerfile.dev**:
        -   FROM `oven/bun:1`.
        -   WORKDIR `/usr/src/app`.
        -   CMD `["bun", "run", "dev"]`.
    -   **Dockerfile.prod** (if exists):
        -   Multi-stage build.
        -   Stage 1: `bun install --frozen-lockfile` & `bun run build`.
        -   Stage 2: Copy `dist/` and `bun.lockb`.
        -   CMD `["bun", "run", "dist/server.js"]`.

</scope>

<requirements>
-   **Environment**: WSL2 (Development), Linux Container (Production).
-   **Constraint**: Zero dependency on `node` binary.
-   **Constraint**: `bun build` must succeed before deployment.
-   **Standard**: Use built-in Bun APIs (`Bun.serve`, `Bun.env`) where applicable instead of Node polyfills.
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
-   **Backend**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] **Lockfile**: `bun.lockb` is the single source of truth.
- [ ] **Build**: `npm run build` generates a minified `dist/server.js`.
- [ ] **Tests**: 100% of test suite migrates to `bun:test` syntax and passes.
- [ ] **Docker**: `docker-compose up backend` starts successfully using `oven/bun` image.
</acceptance_criteria>

<output>
1.  **Summary**: Implementation report confirming removal of Node.js dependencies.
2.  **Manual Test Guide**:
    -   `bun run build`
    -   `bun run start` (Verify production artifact runs)
</output>
