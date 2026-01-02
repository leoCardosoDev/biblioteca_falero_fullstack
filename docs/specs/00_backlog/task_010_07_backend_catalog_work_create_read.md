# Task 010.7: Catalog - Work Aggregate (Create/Read)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_05_backend_catalog_author.md`
- Depends on: `task_010_06_backend_catalog_publisher.md`
- Depends on: `task_010_02_backend_catalog_genre.md`
- Depends on: `task_010_03_backend_catalog_work_type.md`
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
The Aggregate Root of the Catalog context. Represents the intellectual work (The Book itself, not the physical copy).
</context>

<scope>
**Backend**:
1.  **Entity**: `Work` (Aggregate Root).
    - Relations: `Author` (N:N), `Publisher` (N:1), `Genre` (N:N), `WorkType` (N:1).
    - Attributes: `title`, `subtitle`, `isbn`, `publicationYear`.
2.  **Infrastructure**: TypeORM Entity with Relations.
3.  **UseCases**:
    - `CreateWork`: Must validate existence of all related IDs.
    - `GetWork`: Retrieve with all relations populated.
    - `ListWorks`: Filter by Title, Author, Genre.
</scope>

<requirements>
- **Constraint**: Transactional consistency when saving relations.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Work Aggregate implemented.
- [ ] `CreateWork` validates dependencies correctly.
- [ ] `GetWork` returns full object graph.
- [ ] No Update/Delete implementation yet.
</acceptance_criteria>
