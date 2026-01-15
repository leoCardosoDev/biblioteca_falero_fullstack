# <role>
# You are the SOFTWARE ARCHITECT (ARC) & LEAD DEVELOPER.
# Your output is a valid Markdown file named `app/docs/specs/01_in_progress/frontend/refactor/spec.md`.
# </role>

<role>
You are the Technical Lead responsible for modernizing the frontend architecture. You prioritize Domain-Driven Design (DDD) to match the Backend Bounded Contexts defined in `app/docs/sql/falero.sql`.
</role>

<context>
The current system is a Layered Architecture (`src/presentation`, `src/domain`).
-   **Goal**: Refactor into a **Modular Monolith** that mirrors the Backend DDD Bounded Contexts.
-   **Reference**: `app/docs/sql/falero.sql`.
-   **Infrastructure**: Dockerized environment (`app/docker-compose.dev.yml`).
</context>

<scope>
Refactoring of `app/frontend` into a DDD Modular Architecture.

### Phase 1: Preparation & Configuration
1.  **Branch**: Create `refactor/frontend-ddd` from `develop`.
2.  **Config**: Update `vite.config.ts` and `tsconfig.json` to alias `@/modules` and `@/shared`.

### Phase 2: Shared Kernel (`src/shared`)
Reflects technical and generic domain concerns.
1.  **UI Kit (`src/shared/components/ui`)**: Atomic components (`Button`, `Input`, `Modal`).
2.  **Domain Kernel (`src/shared/domain`)**: Base `Model` interfaces (e.g., `BaseEntity`).
3.  **Infra Kernel (`src/shared/infra`)**: `HttpClient`, `AxiosAdapter`.
4.  **Hooks (`src/shared/hooks`)**: Generic hooks (`useToast`).

### Phase 3: Bounded Context Migration
Mirroring the Backend DDD Modules.

1.  **Identity Context (`src/modules/identity`)**:
    -   *Matches Backend Identity*.
    -   **Domain**: `User`, `Account` models.
    -   **Components**: `LoginForm`, `UserList`, `RegisterForm`.
    -   **Pages**: `LoginPage`, `UserManagementPage`.
    -   **Services**: `HttpUserRepository`, `AuthService`.
2.  **Geography Context (`src/modules/geography`)**:
    -   *Matches Backend Geography*.
    -   **Domain**: `City`, `State`, `Neighborhood` models.
    -   **Components**: `AddressForm`, `CitySelect`.
3.  **Catalog Context (`src/modules/catalog`)** *(If Book code exists)*:
    -   *Matches Backend Catalog*.
    -   **Domain**: `Book` model.
    -   **Components**: Book lists/forms.

### Phase 4: Verification & Docker Validation
1.  **Static Analysis**:
    -   Run `npm run lint`
    -   *Constraint*: Zero violations.
2.  **Tests**:
    -   Run `npm run test:ci`
    -   *Constraint*: 100% Pass rate.
3.  **Build**:
    -   Run `npm run build` behavior check.
4.  **Docker**:
    -   Run `docker-compose -f app/docker-compose.dev.yml build frontend; docker-compose -f app/docker-compose.dev.yml up -d frontend`
    -   Verify Hot Reloading: Change a file in `src/modules` and check browser.
5.  **Manual Check**:
    -   Verify standard usage flows (Login -> User List).

---

### ⚠️ Future Tasks
1.  **Task: Unify User Status UI**:
    -   Once Backend unifies Status, Frontend must update `UserList` and `UserForms` to reflect the change.
</scope>

<requirements>
-   **Stack**: React, Vite, Docker.
-   **Pattern**: DDD Modular Monolith.
-   **Constraint**: No new UI features.
-   **Platform**: Windows PowerShell (Use `;` for separating commands).
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
-   **Frontend**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] **Git**: Branch `refactor/frontend-ddd` merged to `develop`.
- [ ] **DDD**: Modules match Backend (`identity`, `geography`).
- [ ] **Docker**: Container `frontend` builds and runs; hot reload works.
- [ ] **Quality**: `npm run lint` and `npm run test:ci` pass.
</acceptance_criteria>

<output>
1.  **Summary**: Frontend aligned with DDD Bounded Contexts.
2.  **Manual Test Guide**:
    -   `npm run dev`
    -   `docker-compose up frontend`
</output>
