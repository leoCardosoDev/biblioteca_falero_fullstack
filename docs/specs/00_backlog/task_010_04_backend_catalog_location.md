# Task 010.4: Catalog - Location Entity

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_007_backend_refactor_domain.md`
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Physical location in the library (Aisle, Shelf, Floor).
</context>

<scope>
**Backend**:
1.  **Entity**: `Location` (Domain).
    - Attributes: `name`, `aisle`, `shelf`, `floor`.
2.  **Infrastructure**: TypeORM.
3.  **UseCases**: `AddLocation`, `ListLocations`.
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Location Entity implementation.
- [ ] Migration and DB updates.
- [ ] API endpoints verified.
</acceptance_criteria>
