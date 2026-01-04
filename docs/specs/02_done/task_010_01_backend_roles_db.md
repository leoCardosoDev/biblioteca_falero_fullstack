# Task 010.1: Backend - Database & Seeds (Source of Truth)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<context>
The current roles are hardcoded or implicit. We need to establish the Database as the Single Source of Truth for Roles and Power Levels to support the hierarchy: Admin(100), Librarian(50), Professor(10), Student(0).
</context>

<objectives>
1.  Establish Canonical Roles in the Database.
2.  Ensure existing users are safely migrated to a valid role.
</objectives>

<scope>
## 1. Seeds (The Truth)
- [ ] Create `seeds/roles-seed.ts`.
    - Define: `ADMIN` (100), `LIBRARIAN` (50), `PROFESSOR` (10), `STUDENT` (0).
    - Logic: Upsert (Update if exists, Create if not).
- [ ] Update `seeds/users-seed.ts`.
    - Use the new roles.
    - Change any generic `Member` user to `Student` or `Professor` as appropriate for dev data.

## 2. Migration / Data Integrity
- [ ] Create a migration script (or use seed logic) to:
    - Identify users with legacy role `MEMBER`.
    - Update them to `STUDENT` (default safe).
    - Ensure `roles` table has correct Power Levels.
</scope>
