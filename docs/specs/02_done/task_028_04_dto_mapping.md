<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_04_dto_mapping.md`.
</role>

<dependent_tasks>
- Task 027: Backend Test Quality Audit
</dependent_tasks>

<context>
- Controllers currently manually map domain models to JSON objects (e.g., `return ok({ id: user.id.getValue(), ... })`).
- This is error-prone and leads to duplication across `AddUserController`, `UpdateUserController`, etc.
</context>

<scope>
1. **Backend**:
   - Create a `UserMapper` or similar utility to handle domain -> DTO conversion.
   - Implement a standardized `UserDTO` interface.
   - Refactor all User-related controllers to use this mapper.
   - Ensure sensitive fields (none identified yet but good practice) are excluded.
</scope>

<acceptance_criteria>
- [ ] Single source of truth for User JSON representation.
- [ ] Removed manual property mapping in at least 3 controllers.
</acceptance_criteria>

<output>
1. **Summary**: Automated DTO mapping for User entity.
2. **Decisions**: Implementation of Mapper pattern to reduce duplication.
</output>
