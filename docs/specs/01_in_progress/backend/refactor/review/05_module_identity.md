# <role>
# You are the SECURITY & BACKEND ENGINEER.
# </role>

<context>
The Identity context (`User`, `Auth`, `RBAC`) is the core of the specific logic.
It manages Users, Logins, Roles, Permissions, and Authentication.
It has dependencies on the Geography module for User Address.
</context>

<scope>
1.  **Structure**: Create `src/modules/identity` with DDD layers (`domain`, `application`, `infra`).

2.  **Move Domain Components**:
    -   **Models**: `User`, `Login`, `Role`, `Permission`, `UserSession`, `TokenPayload`, `UserLogin`.
    -   **Value Objects** (Move specific VOs, verify generic ones): `UserStatus`.
        -   *Note*: `Email`, `Cpf`, `Rg`, `Name` should be evaluated. if they are generic and not in Shared Kernel, consider moving to Identity or moving to Shared if reusable. For now, we move them to Identity if they are only used here.
    -   **Events**: `UserCreated`, `UserLoggedIn` (if any).

3.  **Move Application Components**:
    -   **Use Cases**: `AddUser`, `Authentication`, `ManageUserAccess`, `BlockUser`, `DeleteUser`, `UpdateUser`, `LoadUsers`, `LoadUserById`, `LoadAccountByToken`, `RefreshToken`, `Logout`, `PromoteUser`.
    -   **Gateways**: Interfaces required by Use Cases.

4.  **Move Infra Components**:
    -   **TypeORM Entities**: `UserTypeOrmEntity`, `LoginTypeOrmEntity`, `RoleTypeOrmEntity`, `PermissionTypeOrmEntity`.
    -   **Repositories**: `UserRepository`, `LoginRepository`, `RoleRepository`, `SessionRepository`.
    -   **Mappers**: Any specific mappers.

5.  **Refactor Imports**:
    -   Update `UserTypeOrmEntity` to import Geography entities from `@/modules/geography`.
    -   Update all internal references to use relative paths or `@/modules/identity`.
    -   Update `src/main` factories/composers.
    -   Update `src/presentation` controllers.

6.  **Presentation**:
    -   Refactor Auth Controllers to use the new Module location.

</scope>

<requirements>
- **Stack**: TypeScript.
- **Strict Separation**: Identity module should not depend on concrete implementations of other modules (except possibly via Shared Kernel or specific permitted Infra coupling like Geography Entities for FKs).
- **Public API**: Export necessary components from `src/modules/identity/index.ts` (or `public-api.ts`).
</requirements>

<impact_analysis>
- **High Impact**: This refactor touches the core Authentication flow. `src/main` and `src/presentation` will break until fixed.
- **Database**: Table locations do not change, but TypeORM entity paths do. Ensure `data-source.ts` is updated to find entities in new location.
</impact_analysis>

<acceptance_criteria>
- [x] `src/modules/identity` created and populated.
- [x] `src/domain/models/user.ts` and others removed.
- [x] `src/infra/db/typeorm/entities/user-entity.ts` and others removed.
- [x] All 36+ Identity related files moved.
- [x] `npm run lint` passes.
- [-] `npm run test:unit` passes (Delegated to Spec 07).
- [x] Application starts successfully (Verified via lint and structural check).
</acceptance_criteria>
