# Task 026.1: Governance Infrastructure (Power Levels)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Depends on: `task_008_backend_refactor_auth.md` (Existing Role Entity).
- User Story: `app/docs/stories/story_04_access_control.md`
- Context: `app/docs/adr/012_hierarchical_access_control.md`
</dependent_tasks>

<context>
To implement Hierarchical Access Control (HAC), we first need to quantify the "power" of each role in the database. Currently, `Role` only has `slug` and `description`. We cannot programmatically determine if Admin > Librarian without hardcoding slugs.
</context>

<scope>
**Backend**:
1.  **Schema Change**:
    - Add `power_level` (integer) column to `roles` table.
    - Constraint: NOT NULL, Default 0 (or appropriate safe default).
2.  **Domain Model**:
    - Update `Role` entity (Domain & TypeORM) to include `powerLevel`.
3.  **Data Migration (Seed)**:
    - Update existing roles with correct levels:
        - `ADMIN`: **100**
        - `LIBRARIAN`: **50**
        - `MEMBER`: **10**
4.  **Verification**:
    - Ensure tests pass with the new field.
</scope>

<acceptance_criteria>
- [ ] **DB Schema**: `roles` table has `power_level` column.
- [ ] **Entity**: `Role` class has `powerLevel` property.
- [ ] **Data**: Database seeds/migrations ensure `ADMIN=100`, `LIBRARIAN=50`, `MEMBER=10`.
- [ ] **Tests**: `Role` unit tests verify the new property.
</acceptance_criteria>
