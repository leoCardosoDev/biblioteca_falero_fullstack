# Task 012.1: Circulation - Policies

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_011_02_backend_inventory_work_copy.md`
- User Story: `app/docs/stories/story_07_circulation.md`
</dependent_tasks>

<context>
Rules for loans (how many days, fines).
</context>

<scope>
**Backend**:
1.  **Entity**: `LoanPolicy`.
    - Attributes: `maxDays`, `dailyFineValue`, `grading` (User/WorkType based).
2.  **Seed**: Default policies.
</scope>

<acceptance_criteria>
- [ ] Policy Entity & Seed.
</acceptance_criteria>
