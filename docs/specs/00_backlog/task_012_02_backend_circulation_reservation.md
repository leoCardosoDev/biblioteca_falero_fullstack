# Task 012.2: Circulation - Reservation

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_012_01_backend_circulation_policies.md`
- User Story: `app/docs/stories/story_07_circulation.md`
</dependent_tasks>

<context>
User reserves a work that might be currently loaned out.
</context>

<scope>
**Backend**:
1.  **Entity**: `Reservation`.
    - Relations: `User`, `Work` (Not Copyl! We reserve the abstract Work usually, or specific copy). *Decision: Reserve Work, assign first available Copy.*
    - Attributes: `reservationDate`, `status` (Pending, Fulfilled, Cancelled).
2.  **UseCases**: `CreateReservation`, `CancelReservation`.
</scope>

<acceptance_criteria>
- [ ] Reservation created.
- [ ] Logic to check if user can reserve (limits).
</acceptance_criteria>
