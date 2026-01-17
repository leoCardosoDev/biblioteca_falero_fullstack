# User Domain Rules

## Aggregate Root
- `User`

---

## Invariants (MUST HOLD)

1. **ID is required** — User cannot exist without a valid ID
2. **Email is immutable** — Once set, email cannot be changed (no `changeEmail` method)
3. **CPF is unique** — No two users may share the same CPF
4. **Status transitions are controlled** — Only allowed via specific use cases
5. **Name changes return new instance** — User is immutable; `changeName()` returns new User
6. **Address changes return new instance** — `changeAddress()` returns new User

---

## Lifecycle

### Creation Rules
- Created via `User.create(props)` (dispatches `UserCreated` event)
- Restored via `User.restore(props, id)` (no event dispatch)
- ID MUST be provided in props; throws if missing

### State Transitions
| From | To | Allowed |
|------|-----|---------|
| PENDING | ACTIVE | ✅ |
| ACTIVE | BLOCKED | ✅ |
| BLOCKED | ACTIVE | ✅ |
| Any | PENDING | ❌ |

### Forbidden States
- User without ID
- User without Email
- User without CPF
- User with status ACTIVE but no verified email (if email verification enabled)

---

## Entities
### Login
- Separate entity, linked to User via `userId`
- See `login.rules.md` for Login-specific rules

---

## Value Objects

### Email
- **Validations**: Must match email regex pattern
- **Immutability**: Fully immutable via private constructor

### Cpf
- **Validations**: Must pass Brazilian CPF checksum algorithm
- **Immutability**: Fully immutable

### Name
- **Validations**: Non-empty, reasonable length
- **Immutability**: Fully immutable

### Rg
- **Validations**: Non-empty, valid format
- **Immutability**: Fully immutable

### Address
- **Validations**: Composite VO with street, number, neighborhood, city, state
- **Immutability**: Fully immutable

### UserStatus
- **Validations**: Enum with ACTIVE, BLOCKED, PENDING
- **Immutability**: Fully immutable

### UserLogin
- **Validations**: Reference to login identifier
- **Immutability**: Fully immutable

---

## Domain Events
- `UserCreated` → dispatched when `User.create()` is called
