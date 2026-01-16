<role>
You are the QA SPECIALIST & DEVELOPER.
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/bugfix/task_bugfix_03_app_flow.md`
- `app/docs/specs/reports/qa/IMPACT_ANALYSIS_ADDRESS_V2.md`
</dependent_tasks>

<context>
The code refactoring is complete, but Tests will be heavily broken due to Mocks returning old string formats.
This task is dedicated to fixing the Test Suite and ensuring Controllers interact correctly.
</context>

<scope>
1. **Backend (Tests & Presentation)**:
   - Fix `db-add-user.spec.ts`: Update mocks for GeoService to return `Id` objects.
   - Fix `add-user-controller.spec.ts`: Update mocks.
   - Fix Integration Tests: Ensure `UserTypeOrmRepository` tests run with valid dependencies (State/City must exist).
   - Verify `AddUserController` validation logic.
</scope>

<requirements>
- **Stack**: Jest, Supertest.
- **Goal**: `npm test` must pass 100%.
</requirements>

<standards_compliance>
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Backend: All Unit Tests pass.
- [ ] Backend: All Integration Tests pass.
- [ ] Backend: No regression in coverage.
</acceptance_criteria>

<output>
1. **Summary**: Full system stability restored. All tests passing.
</output>
