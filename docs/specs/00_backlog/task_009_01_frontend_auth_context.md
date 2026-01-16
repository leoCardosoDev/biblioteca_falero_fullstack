# Task 009.1: Frontend - Auth Context Refactor

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_008_backend_refactor_auth.md` (Done).
- User Story: `app/docs/stories/story_04_access_control.md`
- User Story: `app/docs/stories/story_02_user.md`
</dependent_tasks>

<context>
The Backend changed the Login response. The Frontend Store must adapt.
</context>

<scope>
**Frontend**:
1.  **Context**: Update `AuthContext` to handle `accessToken` and `user` payload correctly.
2.  **Types**: Update TypeScript interfaces for `LoginResponse`.
3.  **Storage**: Ensure token is stored securely (localStorage/cookies).
</scope>

<standards_compliance>
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `useAuth` hook works with new backend.
- [ ] User session persists on refresh.
</acceptance_criteria>
