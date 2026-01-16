# Task 012.4: Circulation - Checkin (Return)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_012_03_backend_circulation_loan.md`
- User Story: `app/docs/stories/story_07_circulation.md`
</dependent_tasks>

<context>
Returning a book. The complex part is Fines and Status updates.
</context>

<scope>
**Backend**:
1.  **UseCases**: `Checkin`.
2.  **Logic**:
    - Identify Loan by Copy Barcode.
    - Calculate Fine (if today > dueDate).
    - Create `Fine` entity if needed.
    - Update Loan status to `Returned`.
    - Update Copy status to `Available` (or `Reserved` if queue exists!).
</scope>

<acceptance_criteria>
- [ ] Checkin successfully closes loan.
- [ ] Fines calculated correctly.
- [ ] Copy status updated.
</acceptance_criteria>
