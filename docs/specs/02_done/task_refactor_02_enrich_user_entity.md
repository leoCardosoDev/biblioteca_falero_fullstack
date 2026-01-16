# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as ARCHITECT.
# </role>

<role>
Refactoring Specialist focusing on DDD and Rich Domain Models.
</role>

<dependent_tasks>
- Depends on: Codebase Review Findings (codebase_review.md)
</dependent_tasks>

<context>
The `User` entity (`src/domain/models/user.ts`) is currently an "Anemic Domain Model", acting primarily as a data container with public properties and no business methods. Logic that modifies user state (like updating an address) is likely handled imperatively in Use Cases.
- **Affected File**: `src/domain/models/user.ts`
- **Affected Test**: `tests/domain/models/user.spec.ts` (needs creation/update)
</context>

<scope>
Introduce behavioral methods to the `User` entity to encapsulate state changes.

1. **Backend**:
    - Add `updateAddress(address: Address): void` method to `User` class.
    - Add `updateName(name: Name): void` method.
    - Add `updateEmail(email: Email): void` method.
    - Ensure these methods update the internal state and optionally update `updatedAt` or version.
    - Refactor `DbUpdateUser` (if exists) or upcoming update logic to use these methods instead of direct property assignment (though `User` properties are `readonly`, so currently they can't be assigned essentially meaning the entity is immutable - checking this is key. If it's immutable, we might need methods that return a new instance or change the design to allow mutation for tracking changes).
    *Correction*: The current `User` entity uses `readonly` properties. The "Anemic" critique suggests we should potentially allow controlled mutation OR better copy-methods. Given DDD often prefers immutability for VOs but Entities can be mutable, let's stick to the current immutability pattern but add `cloneWith` style methods or decide if we want to switch to mutable entities.
    *Architectural Decision*: For this refactor, let's keep it simple. If it's immutable, `updateAddress` should return a NEW User instance with the updated address. `user.updateAddress(newAddr) -> User`.

    *Wait*, the prompts says "Point out concrete issues". The review said "Logic for updating user state... is likely scattered".
    Let's define the task as: **Add behavioral methods that return new instances (Immutability preservation)**.

    - Implement `changeAddress(address: Address): User`
    - Implement `changeName(name: Name): User`
    - Create unit tests for these behaviors.

2. **Frontend**:
    - None.
</scope>

<requirements>
- **Stack**: TypeScript, DDD.
- **Negative Constraints**: Do not remove `readonly` modifiers from public properties. Keep the entity immutable if that's the established pattern (checking `user.ts` again... yes, `readonly`).
- **Performance**: N/A.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A
</api_specification>

<acceptance_criteria>
- [ ] Backend: `User` entity has `changeAddress` method.
- [ ] Backend: `User` entity has `changeName` method.
- [ ] Backend: Unit tests verify that calling these methods returns a NEW User instance with updated data and bumped version (if applicable).
</acceptance_criteria>

<output>
1. **Summary**: Enriched `User` entity with behavioral methods.
2. **Decisions**: Maintained immutability by returning new instances.
3. **Manual Test Guide**: Run unit tests.
</output>
