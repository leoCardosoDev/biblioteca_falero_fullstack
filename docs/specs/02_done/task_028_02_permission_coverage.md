<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_02_permission_coverage.md`.
</role>

<dependent_tasks>
- Task 027: Backend Test Quality Audit
</dependent_tasks>

<context>
- `UserGovernanceController` (and its variations `UpdateUserStatusController`, `UpdateUserRoleController`) correctly handles `AccessDeniedError` by returning `forbidden(403)`.
- However, the current test suite `user-governance-controller.spec.ts` lacks a specific test case to verify this behavior.
</context>

<scope>
1. **Testing**:
   - Update `user-governance-controller.spec.ts`.
   - Add test cases for both `UpdateUserStatusController` and `UpdateUserRoleController`.
   - Mock the use case to return `left(new AccessDeniedError())`.
   - Verify that the controller returns `403 Forbidden`.
</scope>

<acceptance_criteria>
- [ ] New test cases added to `user-governance-controller.spec.ts`.
- [ ] 100% test coverage for error handling branches in these controllers.
</acceptance_criteria>

<output>
1. **Summary**: Added missing 403 Forbidden test cases.
2. **Decisions**: Focused on improving negative test coverage as identified in the audit.
3. **Manual Test Guide**: Run `npm run test:unit user-governance-controller.spec.ts`.
</output>
