# Task 024: Backend API Documentation (Swagger/OpenAPI)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_008_backend_refactor_auth.md`, `task_026_manage_user_governance.md`.
- Reference: `app/backend/manual-api-test-commit.md` (Source of Truth for Contracts).
</dependent_tasks>

<context>
The API has been refactored and new features (Governance) added. The Swagger documentation (`/docs`) is currently empty or outdated. We need to ensure every active endpoint is fully documented so the Frontend team can consume it.
</context>

<scope>
**Backend**:
1.  **Swagger Configuration**:
    - Ensure `main/config/swagger.ts` is correctly set up.
2.  **Route Documentation**:
    - Add Fastify Schema definitions to all Route files:
        - `login-routes.ts`
        - `user-routes.ts` (Create/List)
        - `create-user-login-routes.ts` (Add Login to User)
        - `user-governance-routes.ts` (Block/Promote)
        - Shared Kernel routes (Neighborhood/City/State) if active.
3.  **Schema Consistency**:
    - Ensure Request/Response schemas match `manual-api-test-commit.md`.
    - Define reusable schemas in a shared helper if possible (e.g. `ErrorSchema`, `UserSchema`).
</scope>

<acceptance_criteria>
- [ ] `GET /docs` returns a complete Swagger UI.
- [ ] **Auth**: Login endpoint is documented with Request/Response.
- [ ] **Users**: Create, List, FindById (if exists), Update, Delete are documented.
- [ ] **Governance**: Block and Promote endpoints are documented.
- [ ] **Security**: Bearer Auth is correctly applied in Swagger UI (Lock icon).
- [ ] **Verification**: Manual audit of Swagger UI vs Manual Test file.
</acceptance_criteria>
