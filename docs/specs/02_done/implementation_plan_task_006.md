# Implementation Plan - Task 006: Backend Refactoring (User/Login Separation)

## Goal Description
Separate the monolithic `User` concept into `User` (Identity) and `Login` (Access) entities to adhere to ADR 002. This ensures strict logical separation between personal civil data and system access credentials.

## User Review Required
> [!IMPORTANT]
> This is a breaking change for the Database Schema.
> `users` table will drop: `role`, `status`.
> `logins` table will be created.
> Data migration is NOT handled in this plan (assuming Dev environment reset).

## Proposed Changes

### Domain Layer
#### [MODIFY] [user.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/domain/models/user.ts)
- Remove `role`, `status`.

#### [NEW] [login.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/domain/models/login.ts)
- Define `LoginModel` with `id`, `userId`, `password`, `role`, `status`.

#### [MODIFY] [add-user.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/domain/usecases/add-user.ts)
- Update params to exclude role/status.

#### [NEW] [add-user-login.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/domain/usecases/add-user-login.ts)
- Define interface for creating logins.

### Infrastructure Layer (Persistence)
#### [MODIFY] [user-entity.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/infra/db/typeorm/entities/user-entity.ts)
- Remove columns: `role`, `status`.

#### [NEW] [login-entity.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/infra/db/typeorm/entities/login-entity.ts)
- Create Entity for `login` table.

#### [MODIFY] [user-repository.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/infra/db/typeorm/user-repository.ts)
- Remove `AddUserRepository` logic related to role/status.
- Update `LoadUsersRepository` to performing LEFT JOIN with `login` table to populate the virtual `login` field in the return DTO if needed, OR just return User data and let a higher level service compose it.
- **Decision**: `LoadUsersController` will likely need this data. `UserRepository`'s `loadAll` can return an extended DTO or we keep `User` pure and create a specific Query Service.
- **Simpler approach**: `UserTypeOrmRepository` `loadAll` joins with Login and returns `UserWithLogin` DTO? Or we keep `UserModel` pure and having an optional `login` field?
- *Refined*: `UserModel` in Domain will have `login?: LoginModel` optional property to support this conveyance without strict coupling, OR we create a `UserDto` for the controller.
- Let's update `UserModel` to have optional `login?` property to ease the transition? No, better separation.
- **Plan**: `LoadUsersController` calls `LoadUsers` usecase. `LoadUsers` usecase calls `UserRepository.loadAll()`.
- We will modify `loadAll` to left join login and map it.

#### [NEW] [login-repository.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/infra/db/typeorm/login-repository.ts)
- Implement `AddLoginRepository`, `LoadLoginByUserId`.

### Application Layer
#### [MODIFY] [db-add-user.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/application/usecases/db-add-user.ts)
- Remove encryption/role logic. Just save User.

#### [NEW] [db-add-user-login.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/application/usecases/db-add-user-login.ts)
- Handle password hashing and saving Login.

### Presentation Layer
#### [MODIFY] [user-routes.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/main/routes/user-routes.ts)
- Update `POST /users` schema.
- Add `POST /users/:id/login`.
- Update `GET /users` schema to include nested `login`.

#### [MODIFY] [load-users-controller.ts](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/backend/src/presentation/controllers/user/load-users-controller.ts)
- Map the new structure.

## Verification Plan
### Automated Tests
- Run `npm test` to ensure 100% coverage.
- Create new tests for `db-add-user-login.spec.ts`.

### Manual Verification
- Start DB container.
- Run `npm run dev`.
- Call `POST /users` -> Check DB `usuario`.
- Call `POST /users/:id/login` -> Check DB `login`.
- Call `GET /users` -> Check JSON structure.
