# Infrastructure Refactoring: Extract UserMapper

<role>
Refactoring Architect specializing in Clean Architecture and Single Responsibility Principle.
</role>

<dependent_tasks>
- None (Preferably after UserLogin VO)
</dependent_tasks>

<context>
The `UserTypeOrmRepository` violates the Single Responsibility Principle. It handles:
1.  Database operations (CRUD).
2.  Object Mapping (`toUserModel` method acts as a mapper).

The `toUserModel` method is 40+ lines long, handling `Address` restoration and `Login` restoration logic. This coupling makes the Repository harder to read and the mapping logic impossible to reuse or test in isolation.
</context>

<scope>
1.  **Backend**:
    - Create `UserMapper` class in `infra/db/typeorm/mappers/user-mapper.ts`.
    - Move `toUserModel` logic to `UserMapper.toDomain`.
    - Inject or use `UserMapper` in `UserTypeOrmRepository`.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript
- **Negative Constraints**: Do not leave mapping logic in Repository.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A
</api_specification>

<acceptance_criteria>
- [ ] `UserMapper` class exists and is testable.
- [ ] `UserTypeOrmRepository` delegates mapping to `UserMapper`.
- [ ] Repository code is significantly reduced in complexity.
- [ ] All tests pass.
</acceptance_criteria>

<output>
1.  **Summary**: Extracted `UserMapper`.
2.  **Decisions**: Enforced SRP on Repository.
3.  **Manual Test Guide**: Run `npm test`.
</output>
