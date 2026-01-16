# Task 010.2: Catalog - Genre Entity

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_01_backend_catalog_language.md` (Soft dependency, just ordering).
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Foundation entity for the Catalog. Works have genres (Fantasy, Sci-Fi).
</context>

<scope>
**Backend**:
1.  **Entity**: `Genre` (Domain).
    - Attributes: `id`, `name`, `normalizedName` (slug), `createAt`, `updateAt`.
2.  **Infrastructure**: TypeORM Entity, Repository, Migration.
3.  **UseCases**: `AddGenre`, `ListGenres`.
4.  **Controller**: `GenreRoutes`.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM.
- **Constraint**: DDD.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Genre Entity implemented.
- [ ] Migration executed.
- [ ] Endpoints `POST /genres` and `GET /genres` working.
</acceptance_criteria>
