# Task 009: Frontend Auth Refactoring

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_008_backend_refactor_auth.md`
</dependent_tasks>

<context>
The Backend refactoring (Tasks 007 & 008) changed the API contract. User data is no longer returned directly with Login, or strict RBAC roles are now enforced.
</context>

<scope>
**Frontend**:
1.  **Auth Store**: Update `useAuth` / `AuthContext` to handle the new `Login` response payload (which might contain `user_id` and `role` but maybe not full profile).
2.  **Login Page**: Ensure login works with new backend endpoint.
3.  **User Management**: Update "Add User" screen to handle the 2-step process (if enforced) or update the payload to match new User fields (Gender, Phone, Address).
</scope>

<requirements>
- **Stack**: React, TailwindCSS.
- **Constraint**: Maintain "Clean Architecture" pattern in frontend.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Login works with new backend.
- [ ] User profile can be viewed/edited with new fields (Address, Gender, etc.).
</acceptance_criteria>
