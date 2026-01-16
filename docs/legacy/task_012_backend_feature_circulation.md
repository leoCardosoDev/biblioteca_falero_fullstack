# Task 012: Backend Feature - Circulation Domain

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_011_backend_feature_inventory.md`
- Depends on: `task_008_backend_refactor_auth.md` (User Identity)
</dependent_tasks>

<context>
Implement Circulation (Loans and Reservations).
</context>

<scope>
**Backend**:
1.  **Entities**: `Loan`, `LoanItem`, `Reservation`.
2.  **Database**: TypeORM entities.
3.  **UseCases**:
    -   `PerformLoan`: Checkout a copy to a user. Validates copy availability.
    -   `ReturnLoan`: Checkin a copy. Updates status.
    -   `ReserveCopy`: Hold a copy.
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Loan decreases inventory availability.
- [ ] Return restores availability.
- [ ] Reservations prevent other loans.
</acceptance_criteria>
