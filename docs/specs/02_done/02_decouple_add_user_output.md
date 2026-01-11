# strict Clean Architecture: Decouple DbAddUser Output

<role>
Refactoring Architect specializing in Domain-Driven Design and Clean Architecture.
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `DbAddUser` use case currently returns `Promise<User | Error>`.
Returning the `User` Domain Entity to the Presentation Layer (Controller) violates the strict boundary rule of Clean Architecture. The Domain Entities should not leak to the outer layers.
The Presentation Layer should consume a DTO (Data Transfer Object) or a Response Model.
</context>

<scope>
1.  **Backend**:
    - Create `AddUserOutput` DTO.
    - Create `UserMapper` to map `User` entity to `AddUserOutput`.
    - Modify `DbAddUser.add` signature to return `Promise<AddUserOutput | Error>`.
    - Update `AddUserController` to use the DTO properties.
    - Update `DbAddUser` tests.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript
- **Negative Constraints**: Do not expose `User` entity methods or behavior in the DTO.
- **Performance**: Negligible impact.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A - Internal Refactoring
</api_specification>

<acceptance_criteria>
- [ ] `AddUserOutput` DTO exists.
- [ ] `DbAddUser` does not return `User` entity.
- [ ] `AddUserController` compiles and works with new DTO.
- [ ] All tests pass.
</acceptance_criteria>

<output>
1.  **Summary**: Decoupled Domain from Presentation by introducing DTO.
2.  **Decisions**: Enforce strict boundary.
3.  **Manual Test Guide**: Run `npm test`.
</output>
