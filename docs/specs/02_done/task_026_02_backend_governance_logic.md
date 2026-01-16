# Task 026.2: Governance Logic (The Guard)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<standards>
- `workflow/standards/STANDARD_GITFLOW.md`
- `workflow/standards/STANDARD_GENERAL.md`
- `workflow/standards/STANDARD_BACKEND.md`
</standards>

<dependent_tasks>
- Depends on: `task_026_01_backend_governance_infra.md` (Power Levels).
- User Story: `app/docs/stories/story_09_user_governance.md`
- Context: `app/docs/adr/012_hierarchical_access_control.md`
</dependent_tasks>

<context>
With `power_level` in place, we need the "Guard" logic to enforce the hierarchy rules defined in ADR 012.
</context>

<scope>
**Backend**:
1.  **Governance Service/UseCases**:
    - `BlockUserUseCase(actorId, targetId)`
    - `PromoteUserUseCase(actorId, targetId, newRoleId)`
2.  **The Guard Logic**:
    - Retrieve `Actor` and `Target` (with their Roles).
    - **Rule**: `Actor.powerLevel` MUST be > `Target.powerLevel`.
    - **Rule**: `Actor.powerLevel` MUST be > `NewRole.powerLevel` (for promotion).
    - Throw `ForbiddenError` if rules are violated.
3.  **Status/Role Updates**:
    - Perform the actual state change (Status -> BLOCKED/ACTIVE, Role -> NEW_ID) if Guard passes.
</scope>

<acceptance_criteria>
- [ ] **Logic**: Admin (100) CAN block Librarian (50).
- [ ] **Logic**: Librarian (50) CAN block Member (10).
- [ ] **Logic**: Librarian (50) CANNOT block Admin (100).
- [ ] **Logic**: Librarian (50) CANNOT block Librarian (50).
- [ ] **Logic**: Librarian (50) CANNOT promote Member to Admin.
- [ ] **Tests**: Unit tests covering the Permission Matrix.
</acceptance_criteria>
