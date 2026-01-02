# User Story (STORY_07)

## Title
Circulation: Loans & Reservations

## Persona
Librarian

## Story
As a **Librarian**,
I want **to checkout (Loan) and checkin (Return) items to Users**,
So that **materials can be borrowed and tracked efficiently.**

## Business Value
- The core service value of a library.
- Enforces due dates and availability rules.
- Prevents loss of assets by linking them to responsible Users.

## Acceptance Criteria
- [ ] **Validation**: Cannot loan a book if it is NOT 'AVAILABLE'.
- [ ] **Reservation Check**: Cannot loan a book if it is reserved by *another* user.
- [ ] **Explicit Status**: Loans transition between `OPEN`, `CLOSED`, and `OVERDUE`.
- [ ] **Auditability**: All loan records use **Soft Delete** and **Optimistic Locking** for integrity.
- [ ] **Status Updates**:
    - Checkout -> Copy status becomes 'BORROWED'.
    - Return -> Copy status becomes 'AVAILABLE'.
- [ ] **Traceability**: Loan record stores User, Unit, Copy, and Date.
- [ ] **Reservations**: Users can place holds on items, preventing others from borrowing them.

## Out of Scope
- Fines and late fees calculation (Phase 2).
- Renewal logic options (Phase 1.5).

## Assumptions
- Loan policies (max books, duration) are configured globally or per user role.

## Open Questions
- None.
