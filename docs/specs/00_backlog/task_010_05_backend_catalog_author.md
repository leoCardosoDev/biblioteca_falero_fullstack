# Task 010.5: Catalog - Author Entity

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_01_backend_catalog_language.md` (Phase 1 complete).
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Core entity. The creator of the Work.
</context>

<scope>
**Backend**:
1.  **Entity**: `Author` (Domain).
    - Attributes: `name`, `birthDate`, `deathDate`, `biography`, `nationality`.
2.  **Infrastructure**: TypeORM.
3.  **UseCases**: `CreateAuthor`, `GetAuthor`, `ListAuthors`, `UpdateAuthor`.
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Author CRUD complete.
- [ ] Validations (Birth date < Death date).
- [ ] Tests covering all cases.
</acceptance_criteria>
