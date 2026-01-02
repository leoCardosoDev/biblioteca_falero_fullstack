# Task 027: Backend Test Quality Audit

<role>
You are the QA Specialist (QA).
Your output MUST be a valid Markdown file named `app/docs/specs/00_backlog/task_027_test_quality_audit.md`.
</role>

<role>
Audit all backend unit tests to ensure they are verifying real business rules, not just achieving code coverage.
</role>

<dependent_tasks>
- Depends on: All implemented features (Tasks 007 - 026).
- User Story: `app/docs/stories/story_10_test_quality_audit.md`
</dependent_tasks>

<context>
- The backend has achieved 100% code coverage in many areas.
- However, recent bugs (e.g., Access Denied logic) suggest that tests might be passing without strictly enforcing the hierarchical power level rules.
- Existing tests are located in `app/backend/tests`.
</context>

<scope>
1. **Audit Phase**:
    - Review all files in `app/backend/tests/application/usecases`.
    - Review all files in `app/backend/tests/infra/db/typeorm`.
    - Cross-reference test code with Story/ADR requirements.
2. **Analysis**:
    - For each test file, answer: **"Does this assertion fail if the business rule is subtly broken?"**
    - Identify "Mock traps" where stubs are set up in a way that makes the test always pass.
3. **Reporting**:
    - Create a Technical Improvement Record (TIR) for each weak test suite.
    - Propose specific assertion changes.
</scope>

<requirements>
- **Stack**: Jest, TypeScript.
- **Negative Constraints**: Do NOT just add more tests to increase coverage; focus on assertion quality.
- **Standard**: `workflow/standards/STANDARD_BACKEND.md`
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Audit Report (Walkthrough) listing every audited use case.
- [ ] At least one "Failing Proof of Concept" for a weak test (if found), showing a business rule change that doesn't break the test.
- [ ] Implementation of improved assertions where gaps are found.
- [ ] Final confirmation: "Every test asserts the SOUL of the business rule."
</acceptance_criteria>

<output>
1. **Summary**: Comprehensive quality report of the test suite.
2. **Decisions**: Criteria used to judge "Test Quality."
3. **Manual Test Guide**: How to verify that a test is "Effective" (e.g., Mutation testing concepts).
</output>
