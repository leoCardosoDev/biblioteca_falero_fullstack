# Task 026.3: Governance API (Endpoints)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_026_02_backend_governance_logic.md` (Logic).
- User Story: `app/docs/stories/story_09_user_governance.md`
</dependent_tasks>

<context>
The logic is ready. Now we need to expose these capabilities to the Frontend via REST endpoints.
</context>

<scope>
**Backend**:
1.  **Routes**:
    - `PATCH /users/:id/status` -> Updates UserStatus.
    - `PATCH /users/:id/role` -> Updates UserRole.
2.  **Controller**:
    - `UserGovernanceController`.
    - Validate Payload (`AddUserValidation` or specific `GovernanceValidation`).
    - Call the UseCases from Task 026.2.
3.  **Security**:
    - Ensure Routes are protected (`VerifyToken`, `VerifyRole` if needed, though the Service handles finer checks).
</scope>

<technical_contracts>
- **Block User**:
  - `PATCH /api/users/:id/status`
  - Body: `{ "status": "BLOCKED" }`
  - Returns: 204
- **Promote User**:
  - `PATCH /api/users/:id/role`
  - Body: `{ "roleId": "uuid..." }`
  - Returns: 204
</technical_contracts>

<acceptance_criteria>
- [ ] **E2E**: Admin can block a user via API.
- [ ] **E2E**: API returns 403 if Librarian tries to block Admin.
- [ ] **E2E**: API returns 400 for invalid status/role.
</acceptance_criteria>
