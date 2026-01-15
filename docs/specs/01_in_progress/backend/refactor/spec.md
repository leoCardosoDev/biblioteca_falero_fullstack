# <role>
# You are the SOFTWARE ARCHITECT (ARC) & LEAD DEVELOPER.
# Your output is a valid Markdown file named `app/docs/specs/01_in_progress/backend/refactor/spec.md`.
# </role>

<role>
You are the Technical Lead responsible for modernizing the backend architecture. You prioritize Domain-Driven Design (DDD), strategic decoupling, and strictly enforce the Bounded Contexts defined in `app/docs/sql/falero.sql`.
</role>

<context>
The current system is a horizontal Layered Monolith.
-   **Reference Schema**: `app/docs/sql/falero.sql` defines the target Domain boundaries.
-   **Goal**: Refactor into a **Modular Monolith** based on DDD Bounded Contexts.
-   **Constraint**: Use existing code ONLY. No new features.
-   **Infrastructure**: Dockerized environment (`app/docker-compose.dev.yml`).
</context>

<scope>
Refactoring of `app/backend` into a DDD Modular Architecture.

### Phase 1: Preparation & Configuration
1.  **Branch**: Create `refactor/backend-ddd` from `develop`.
2.  **Config**: Update `tsconfig.json` paths (`@/modules`, `@/shared`).
3.  **Linting**: Configure `eslint-plugin-boundaries` to enforce:
    -   **Context Sovereignty**: Context A cannot import Context B's internals.
    -   **Context Interface**: Context A can ONLY import Context B's `public/index.ts`.
    -   **Kernel Access**: All Contexts can import `@/shared`.

### Phase 2: Shared Kernel (`src/shared`)
Reflects the "SHARED KERNEL" section of the SQL schema + Technical concerns.
1.  **Domain Kernel (`src/shared/domain`)**: Base `Entity`, `ValueObject` (e.g. `Address` VO logic), `UseCase`.
2.  **Infra Kernel (`src/shared/infra`)**: `Logger`, `Database` (TypeORM Source).
3.  **App Kernel (`src/shared/application`)**: `AppError`, generic DTOs.

### Phase 3: Bounded Context Migration
Migrate existing code into specific Modules based on `falero.sql`.

1.  **Identity Context (`src/modules/identity`)**:
    -   *Corresponds to SQL: IDENTITY — USER / ACCESS CONTROL*.
    -   **Entities**: `User`, `Login`, `Role`, `Permission`, `UserSession`.
    -   **Internals**: Move all related UseCases, Repositories, Mappers.
    -   **Public API**: Export `UserService` for other modules (if needed).
2.  **Geography Context (`src/modules/geography`)**:
    -   *Corresponds to SQL: SHARED KERNEL — GEOGRAPHY*.
    -   **Entities**: `City`, `State`, `Neighborhood`.
    -   **Public API**: Export `CityService` to be used by Identity (for Address validation).
3.  **Catalog Context (`src/modules/catalog`)** *(If code exists)*:
    -   *Corresponds to SQL: CATALOG*.
    -   **Entities**: `Book` (if exists).
4.  **Main Layer (`src/main`)**:
    -   Composition Root. Wires Controllers to Routes.
    -   **Docker Check**: Verify `server.ts` entry point remains compatible with `npm run dev`.

### Phase 4: Verification & Docker Validation
1.  **Static Analysis**:
    -   Run `npm run lint`
    -   *Constraint*: Zero violations, especially boundary rules.
2.  **Tests**:
    -   Run `npm run test:ci`
    -   *Constraint*: 100% Pass rate.
3.  **Docker**:
    -   Run `docker-compose -f app/docker-compose.dev.yml build backend; docker-compose -f app/docker-compose.dev.yml up -d backend`
    -   Verify logs: `docker-compose logs -f backend`
    -   *Constraint*: Server must start successfully inside Docker.
4.  **Cleanup**: Delete `src/domain`, `src/application`, `src/infra` (legacy roots).

---

### ⚠️ Future Tasks (Not in this Scope)
The following tasks MUST be created after this refactor is verified:
1.  **Task: Unify User Status**:
    -   *Context*: Currently `Login` has `active` and `User` has separate status logic.
    -   *Goal*: Centralize Status in `User` entity as per DDD best practices.
</scope>

<requirements>
-   **Stack**: Node.js, Fastify, TypeORM, Docker.
-   **Pattern**: DDD Modular Monolith.
-   **Constraint**: No new Features. No DB changes.
-   **Platform**: Windows PowerShell (Use `;` for separating commands).
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
-   **Backend**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] **Git**: Branch `refactor/backend-ddd` merged to `develop`.
- [ ] **DDD**: Folder structure matches `falero.sql` contexts (`identity`, `geography`).
- [ ] **Docker**: Container `api` builds and starts without errors.
- [ ] **Quality**: `npm run lint` and `npm run test:ci` pass.
</acceptance_criteria>

<output>
1.  **Summary**: Backend aligned with DDD Bounded Contexts and verified in Docker.
2.  **Manual Test Guide**:
    -   `npm run dev`
    -   `docker-compose up backend`
</output>
