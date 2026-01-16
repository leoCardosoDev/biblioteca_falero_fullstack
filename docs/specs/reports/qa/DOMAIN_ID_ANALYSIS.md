<thinking>
The user flagged a violation of the "Id as Value Object" rule.
I analyzed the `Address` Value Object and confirmed it uses `string` for `neighborhoodId` and `cityId` instead of the `Id` Value Object.
The `User` entity correctly uses `Id` for its own identifier, but holds an `Address` which contains primitives.

**Violation Found**:
File: `src/domain/value-objects/address.ts`
Properties: `neighborhoodId: string`, `cityId: string`
Expected: `neighborhoodId: Id`, `cityId: Id`
</thinking>

# [REPORT] Domain Primitive Obsession Analysis

<audit_result>
## Violation Detected
The Domain Layer rules state that IDs must be **Value Objects**, not primitives.
My analysis found strict violations in the `Address` Value Object.

## Location
**File**: `src/domain/value-objects/address.ts`

**Current Code (Violation):**
```typescript
export class Address {
  readonly neighborhoodId: string // <--- Primitive
  readonly cityId: string         // <--- Primitive
  // ...
}
```

**Expected Code (Compliance):**
```typescript
import { Id } from '@/domain/value-objects/id'

export class Address {
  readonly neighborhoodId: Id     // <--- Value Object
  readonly cityId: Id             // <--- Value Object
  // ...
}
```

## Impact
- **Type Safety**: The compiler cannot distinguish between a proper UUID and any random string.
- **Validation**: `Id.create()` validation logic is bypassed for these fields.
- **Consistency**: Inconsistent with `User.id` which correctly uses the `Id` class.

## Action Plan
1.  **Refactor `AddressProps`**: Change types from `string` to `Id`.
2.  **Refactor `Address`**: Update properties and constructor.
3.  **Update `DbAddUser`**: Ensure `resolveAddress` creates `Id` instances before creating `Address`.
4.  **Update `GetOrCreateGeoEntityService`**: Return `Id` objects instead of strings in `GeoIdsDTO`.
</audit_result>
