# Login Domain Rules

## Entity
- `Login` (not an aggregate root; belongs to User context)

---

## Invariants (MUST HOLD)

1. **ID is required** — Login cannot exist without a valid ID
2. **userId is required** — Login must be linked to a User
3. **roleId is required** — Login must have an assigned Role
4. **Email is required** — Login must have associated email
5. **Password hash is never exposed** — No getter returns raw hash outside domain
6. **One Login per User+Role combination** — User cannot have duplicate logins for same role
7. **isActive defaults to true** — New logins are active unless explicitly set

---

## Lifecycle

### Creation Rules
- Created via `Login.create(props)`
- ID MUST be provided in props; throws if missing
- `isActive` defaults to `true` if not specified

### State Transitions
| From | To | Allowed |
|------|-----|---------|
| Active | Inactive | ✅ (blocked/suspended) |
| Inactive | Active | ✅ (reactivation) |

### Forbidden States
- Login without userId
- Login without roleId
- Login without email
- Login without passwordHash

---

## Value Objects

### Email
- Same as User's Email VO
- **Immutability**: Fully immutable

---

## Domain Events
- None directly from Login entity
- Login events are triggered at Application layer (use cases)
