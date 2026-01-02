# Task 010.1: Catalog - Language Entity

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_007_backend_refactor_domain.md`
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Foundation entity for the Catalog. Books/Works must have a language.
</context>

<scope>
**Backend**:
1.  **Entity**: `Language` (Domain).
    - Attributes: `id` (UUID), `code` (ISO 639-1), `name` (English), `createdAt`, `updatedAt`.
2.  **Infrastructure**: TypeORM Entity, Repository, Migration.
3.  **UseCases**:
    - `AddLanguage`
    - `ListLanguages`
4.  **Controller**: `LanguageRoutes`.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM.
- **Constraint**: DDD.
- **Testing**: 100% Coverage.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Language Entity implementing `BaseEntity`.
- [ ] Migration generated and run.
- [ ] API `POST /catalog/languages` working.
- [ ] API `GET /catalog/languages` working.
</acceptance_criteria>
