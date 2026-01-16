# Task 010.2: Backend - Domain & Value Objects

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<context>
The `UserRole` Value Object currently contains "patches" to map legacy values (e.g. `PROFESSOR` -> `MEMBER`). With the DB updated as the source of truth, we must clean the Domain code to be strict and 1:1 with the defined hierarchy.
</context>

<objectives>
1.  Refactor Domain VOs to remove legacy mappings.
2.  Ensure Code Enums match DB Canonical Roles.
</objectives>

<scope>
## 1. Value Objects
- [ ] Update `UserRole` (value-objects/user-role.ts):
    - Enum: `ADMIN`, `LIBRARIAN`, `PROFESSOR`, `STUDENT`.
    - Remove: `mapping` logic (Anti-Corruption Layer).
    - Validation: Strict check against the Enum.

- [ ] Update `UserStatus` (value-objects/user-status.ts):
    - Ensure it matches strictly (Active, Inactive, Blocked).
    - Remove legacy patches if safe (or keep minimal ACL if external integration requires it, but for internal DB consistency, strict is better).
</scope>
