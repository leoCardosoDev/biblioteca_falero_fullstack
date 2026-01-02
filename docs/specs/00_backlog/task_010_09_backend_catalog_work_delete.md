# Task 010.9: Catalog - Work Aggregate (Delete)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_08_backend_catalog_work_update.md`
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Deletion logic for Works. Must use Soft Delete (Task 021 standard).
</context>

<scope>
**Backend**:
1.  **UseCases**:
    - `DeleteWork`.
2.  **Constraint**: Cannot delete if `WorkCopies` exist (Dependency check - might wait for Inventory, or just be a check).
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Soft Delete implemented for Work.
- [ ] Prevents hard delete.
</acceptance_criteria>
