# Task 011: Backend Feature - Inventory Domain

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_backend_feature_catalog.md` (Works)
- Depends on: `app/docs/bussines/story_03_unit.md` (Units)
</dependent_tasks>

<context>
Implement Inventory to track physical copies of works.
</context>

<scope>
**Backend**:
1.  **Entities**: `WorkCopy`, `Maintenance`.
2.  **Database**: TypeORM entities and migrations.
3.  **UseCases**:
    -   `RegisterCopy` (Add copy to a Unit).
    -   `ListCopies` (By Work or By Unit).
    -   `UpdateCopyStatus` (Available, Maintenance).
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Can register a physical copy for a Work at a specific Unit.
- [ ] Status tracking works.
</acceptance_criteria>
