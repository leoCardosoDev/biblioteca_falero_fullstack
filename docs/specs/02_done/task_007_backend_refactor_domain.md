# Task 007: Backend Domain Refactoring (Core)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `../../adr/006_architectural_foundations.md` (ADR 006)
</dependent_tasks>

<context>
The current backend has mixed naming conventions and a `User` model that confounds Identity and Access. We need to implement the new "Shared Kernel" and strict "User" (Identity) entity as defined in the new SQL schema and business backlog.
</context>

<scope>
**Backend**:
1.  **Shared Kernel**: Implement `Address` Value Object (Street, Number, Complement, ZipCode, NeighborhoodId, CityId).
    -   *Note*: Geography tables (State, City, Neighborhood) need Repositories (Read-Only for now).
2.  **User Entity**: Refactor `User` to match `story_02_user.md`.
    -   Fields: `full_name`, `rg`, `cpf`, `gender`, `email`, `phone`, `Address` (embedded).
    -   Remove: `birthDate` (if present), `password`, `role`.
3.  **Naming**: Rename `Usuario` classes/files to `User` if any exist. Ensure strictly English domain.
4.  **Database**: Create/Update TypeORM entities to reflect the new schema (`user` table, `state`, `city`, `neighborhood`).
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM.
- **Constraint**: Do NOT implement Login/Auth logic here. Just the Identity aspect.
- **Constraint**: Use English for all table names and columns.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `Address` Value Object implemented and tested.
- [ ] `User` entity refactored to use `Address` and new fields.
- [ ] TypeORM migrations generated for `user` and geography tables.
- [ ] Unit tests for `User` entity updated.
</acceptance_criteria>

<output>
1.  Refactored `User` domain.
2.  New `Geography` domain (Shared Kernel).
3.  Clean `Address` implementation.
</output>
