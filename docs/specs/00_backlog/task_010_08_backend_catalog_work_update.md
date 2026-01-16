# Task 010.8: Catalog - Work Aggregate (Update)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_07_backend_catalog_work_create_read.md`
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Updating the complex Aggregate.
</context>

<scope>
**Backend**:
1.  **UseCases**:
    - `UpdateWork`: Partial updates.
    - `AddAuthorToWork`: Specific relation update.
    - `RemoveAuthorFromWork`.
2.  **Infrastructure**: Handle Relation updates in TypeORM (Cascade or manual).
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `UpdateWork` works for scalar fields.
- [ ] Relations can be modified (Authors, Genres).
- [ ] Consistency maintained.
</acceptance_criteria>
