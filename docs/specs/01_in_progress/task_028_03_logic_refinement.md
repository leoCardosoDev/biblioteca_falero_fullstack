<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_03_logic_refinement.md`.
</role>

<dependent_tasks>
- Task 027: Backend Test Quality Audit
</dependent_tasks>

<context>
- `CreateUserLoginController` currently hardcodes `UserRole.create('MEMBER')` and `UserStatus.create('ACTIVE')`.
- This is a leaky abstraction where domain defaults are decided in the presentation layer.
</context>

<scope>
1. **Backend**:
   - Refactor `CreateUserLoginController` to remove hardcoded values.
   - Option A: Pass role and status from the request body if present (with defaults in a factory or use case).
   - Option B: Move default role/status assignment to the `AddUserLogin` use case or a domain service.
   - Preferred: Allow request to specify role/status, but ensure validation handles them.
   - Update `CreateUserLogin` use case interface if necessary.
</scope>

<requirements>
- **Stack**: TypeScript.
- **Standards**: No hardcoded strings for domain entities in controllers.
</requirements>

<acceptance_criteria>
- [ ] Hardcoded constants removed from `CreateUserLoginController`.
- [ ] Domain logic (defaults) is centralized in the proper layer (Application or Domain).
- [ ] Existing tests updated and passing.
</acceptance_criteria>

<output>
1. **Summary**: Refactored logic to remove hardcoded defaults in controller.
2. **Decisions**: Centralized default behavior to avoid logic leakage.
3. **Manual Test Guide**: Verify `CreateUserLoginController` unit tests.
</output>
