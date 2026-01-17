# Identity Module Contract

## Responsibility
Manages user identity, authentication, authorization, and access control.
Does NOT manage business domain entities outside of identity concerns.

---

## Public API (Allowed Imports)
Other modules MAY import ONLY:

### Use Cases (Interfaces)
- `AddUser`
- `Authentication`
- `CreateUserLogin`
- `LoadUserById`
- `LoadUsers`
- `UpdateUser`
- `DeleteUser`
- `BlockUser`
- `PromoteUser`
- `Logout`
- `RefreshToken`
- `LoadAccountByToken`

### Value Objects
- `Email`
- `Name`
- `Cpf`
- `Rg`
- `Address`
- `UserStatus`
- `UserRole`
- `Password`

### Errors (for handling in Presentation)
- `EmailInUseError`
- `InvalidCredentialsError`
- `UserNotFoundError`
- `InvalidPasswordError`

---

## Forbidden Access (STRICT)
No external module may import:

- `User` (Entity)
- `Login` (Entity)
- `Role` (Entity)
- `Permission` (Entity)
- `UserSession` (Entity)
- Any ORM entities from `infra/db/entities/`
- Any Mappers
- Any Repository implementations
- `DbAddUser`, `DbAuthentication`, etc. (use case implementations)

---

## Domain Concepts

### Aggregate Root
- `User` — central identity aggregate

### Entities
- `Login` — authentication credentials linked to User + Role
- `Role` — named permission group
- `Permission` — granular access right

### Value Objects
- `Email` — validated email format
- `Password` — hashed password with strength validation
- `Cpf` — Brazilian tax ID with checksum validation
- `Rg` — Brazilian ID document
- `Name` — non-empty name with length constraints
- `Address` — composite address with geo reference
- `UserStatus` — enum (ACTIVE, BLOCKED, PENDING)
- `UserRole` — enum (ADMIN, USER, MANAGER)
- `UserLogin` — login identifier VO
- `ExpirationDate` — token expiration

---

## Events Emitted
- `UserCreated` → dispatched when `User.create()` is called

---

## Events Consumed
- None

---

## Persistence
- **Tables**: `users`, `logins`, `roles`, `permissions`, `role_permissions`
- **Ownership**: This module is the exclusive owner of these tables
