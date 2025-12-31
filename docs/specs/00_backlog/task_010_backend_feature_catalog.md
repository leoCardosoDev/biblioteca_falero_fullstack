# Task 010: Backend Feature - Catalog Domain

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_007_backend_refactor_domain.md`
</dependent_tasks>

<context>
Implement the Catalog domain to manage bibliographic data (Books, Authors, Publishers).
</context>

<scope>
**Backend**:
1.  **Entities**: `Work`, `Author`, `Publisher`, `Genre`, `Language`, `WorkType`, `Location`.
2.  **Database**: TypeORM entities and migrations.
3.  **UseCases**:
    -   `AddWork`, `ListWorks`, `GetWork`.
    -   `AddAuthor`, `ListAuthors`.
    -   `AddPublisher`, `ListPublishers`.
4.  **Controllers**: REST endpoints for Catalog management.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM.
- **Constraint**: Apply DDD patterns.
</requirements>

<acceptance_criteria>
- [ ] CRUD for Works, Authors, Publishers working.
- [ ] Relations (e.g., Work -> Author) correctly saved/retrieved.
</acceptance_criteria>
