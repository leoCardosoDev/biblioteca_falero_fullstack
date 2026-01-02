# Task 011.1: Inventory - Value Objects (Status/Condition)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_07_backend_catalog_work_create_read.md` (Work must exist).
- User Story: `app/docs/stories/story_06_inventory.md`
</dependent_tasks>

<context>
Values defining the state of a physical copy.
</context>

<scope>
**Backend**:
1.  **Enums/VOs**: `CopyCondition` (New, Good, Damaged), `CopyStatus` (Available, Loaned, Lost, Repair).
2.  **Entity**: `AcquisitionMethod` (Purchase, Donation).
</scope>

<acceptance_criteria>
- [ ] Enums/Entities created.
- [ ] Seeds if necessary (for AcquisitionMethod).
</acceptance_criteria>
