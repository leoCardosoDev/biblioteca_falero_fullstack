# <role>
# You are the DEVOPS ENGINEER & FRONTEND DEVELOPER.
# Your output MUST be a valid Markdown file named `app/docs/specs/02_backlog/frontend/infra_migrate_to_bun.md`.
# </role>

<role>
You are the Frontend Infrastructure Specialist. You enforce the use of the Bun runtime to optimize the React/Vite development lifecycle.
</role>

<dependent_tasks>
- **Prerequisite**: `app/docs/specs/01_in_progress/frontend/refactor/spec.md`.
</dependent_tasks>

<context>
-   **Current State**: npm, Node.js, Vite.
-   **Goal**: Replace npm with Bun. Force Vite to run on Bun runtime.
</context>

<scope>
Execute the following strictly sequential steps.

1.  **Package Management**:
    -   Execute `rm -rf node_modules package-lock.json`.
    -   Run `bun install`.
    -   Update `package.json` > `engines` to `{ "bun": ">=1.0.0" }`.

2.  **Pipeline Optimization**:
    -   **Update Scripts** (`package.json`):
        -   `dev`: `bunx --bun vite` (Forces Vite to run on Bun's JavaScriptCore, not V8).
        -   `build`: `bunx --bun vite build`.
        -   `preview`: `bunx --bun vite preview`.
        -   `lint`: `bunx eslint .`.
    -   **CI/CD**:
        -   Verify `bun.lockb` in CI.
        -   Use `bun install --frozen-lockfile`.

3.  **Testing Strategy**:
    -   **Tool**: Retain **Vitest**. (Vitest is strictly superior for React Component testing).
    -   **Configuration**:
        -   Update `test` script: `bunx --bun vitest run` (Leverage Bun performance).
        -   Ensure `vitest.config.ts` uses `environment: 'jsdom'` (install `jsdom` via bun if missing, Bun supports it).
    -   **Constraint**: Do NOT migrate to `bun:test` for Frontend (lacks full DOM API maturity for React Testing Library).

4.  **Infrastructure (Docker)**:
    -   **Dockerfile.dev**:
        -   FROM `oven/bun:1`.
        -   WORKDIR `/app`.
        -   ENV `CHOKIDAR_USEPOLLING=true` (Required for WSL2/Windows mount compatibility).
        -   CMD `["bun", "run", "dev"]`.

</scope>

<requirements>
-   **Stack**: React, Vite, vitest, Bun.
-   **Constraint**: No use of `npm` or `yarn` commands.
-   **Constraint**: `bunx --bun` flag is MANDATORY for all Vite commands to ensure runtime substitution.
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
-   **Frontend**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] **Lockfile**: `bun.lockb` exists.
- [ ] **Runtime**: `bun run dev` output indicates Vite v6+ running on Bun.
- [ ] **Tests**: `bun run test` executes Vitest suite successfully.
- [ ] **Docker**: `docker-compose up frontend` establishes connection to Backend.
</acceptance_criteria>

<output>
1.  **Summary**: Benchmarks comparing `npm run dev` vs `bun run dev` startup times.
2.  **Manual Test Guide**:
    -   `bun run build`
    -   `bun run preview`
</output>
