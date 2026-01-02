# Task 010.6: Catalog - Publisher Entity

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_010_01_backend_catalog_language.md` (Phase 1 complete).
- User Story: `app/docs/stories/story_05_catalog.md`
</dependent_tasks>

<context>
Core entity. The publisher organizations.
</context>

<scope>
**Backend**:
1.  **Entity**: `Publisher` (Domain).
    - Attributes: `name`, `code`, `city` (Shared Kernel City?), `website`.
2.  **Infrastructure**: TypeORM.
3.  **UseCases**: `CreatePublisher`, `ListPublishers`.
</scope>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Publisher Entity implemented.
- [ ] Relationship with `City` (if applicable) or simple string. *Recommendation: Use String for now unless strictly needed.*
- [ ] API endpoints active.
</acceptance_criteria>
