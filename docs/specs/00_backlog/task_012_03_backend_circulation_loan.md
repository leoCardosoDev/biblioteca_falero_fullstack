# Task 012.3: Circulation - Loan (Checkout)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_012_01_backend_circulation_policies.md`
- User Story: `app/docs/stories/story_07_circulation.md`
</dependent_tasks>

<context>
The act of lending a Copy to a User.
</context>

<scope>
**Backend**:
1.  **Entity**: `Loan`.
    - Relations: `User`, `WorkCopy`.
    - Attributes: `loanDate`, `dueDate`, `returnDate` (nullable), `status`.
2.  **UseCases**: `Checkout`.
    - Validate User (no fines, no overdue loans).
    - Validate Copy (is Available?).
    - Calculate DueDate based on Policy.
</scope>

<acceptance_criteria>
- [ ] Checkout creates Loan record.
- [ ] Updates Copy status to `Loaned`.
</acceptance_criteria>
