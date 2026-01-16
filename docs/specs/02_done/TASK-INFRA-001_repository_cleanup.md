# TASK-INFRA-001: Infrastructure - Repository Clean Up

**Role**: Principal Software Architect / Staff Engineer

## 🧩 Task ID
**TASK-INFRA-001**

## ❗ Problem (Current State)
The `UserTypeOrmRepository` (`src/infra/db/typeorm/user-repository.ts`) performs redundant domain validation during object reconstruction.
-   **Why it is wrong**: The `toUserModel` method calls `Name.create`, `Email.create`, etc., which run validation logic. If rules change or DB data is slightly off (legacy), the repository returns `null` effectively "losing" data. The Infra layer should assume persisted data is valid or at least loadable.
-   **Where**: `src/infra/db/typeorm/user-repository.ts`.
-   **Violation**: Separation of Concerns. Persistence layer shouldn't enforce business rules on *read*.

## 🎯 Objective
Make `toUserModel` a dumb mapper that blindly constructs functionality (or DTOs) from DB data, or uses a special "reconstitute" method on the Domain Entity that bypasses validation.

## 🔧 What Needs to Be Done
1.  **Add Reconstitution**: Add a static `restore()` or `reconstitute()` method to `User` (and VOs) that accepts raw data and bypasses validation (trusted source).
2.  **Update Mapper**: Change `toUserModel` to use these restoration methods.
3.  **Remove Enum dependence**: Ensure `UserStatus` (VO) and `UserStatusEnum` (DB) are mapped explicitly without relying on shared values if they might diverge.

## 🔄 Impact Analysis
-   **Used by**: All User loading operations.
-   **Risk**: Low to Medium. Ensure that `restore` still ensures basic structural integrity but doesn't throw "Invalid Email" for an email that was valid 2 years ago but maybe not today (though email format rarely changes, other rules might).

## 🧭 Safe Migration Strategy (NON-NEGOTIABLE)
1.  **Add Methods First**: Add `restore` methods to VOs and Entities.
2.  **Update Repos**: Switch to using `restore` in `toUserModel`.
3.  **Verify**: Load existing users to ensure no regression.

## ✅ Acceptance Criteria
-   [ ] Repository loading does NOT fail if a business rule (like name length) changes in the future.
-   [ ] `toUserModel` complexity is reduced.
