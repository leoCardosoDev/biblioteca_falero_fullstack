# Task 011.2: Inventory - WorkCopy Entity

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_011_01_backend_inventory_values.md`
- User Story: `app/docs/stories/story_06_inventory.md`
</dependent_tasks>

<context>
The physical instance of a Work.
</context>

<scope>
**Backend**:
1.  **Entity**: `WorkCopy` (Aggregate Root).
    - Relations: `Work` (N:1), `Location` (N:1).
    - Attributes: `barcode`, `rfid`, `condition`, `status`.
2.  **UseCases**: `AddCopy`, `ListCopies`, `GetCopy`.
</scope>

<acceptance_criteria>
- [ ] WorkCopy CRUD.
- [ ] Barcode uniqueness check.
</acceptance_criteria>
