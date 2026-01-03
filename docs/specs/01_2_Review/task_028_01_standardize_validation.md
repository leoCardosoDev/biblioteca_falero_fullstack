<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_01_standardize_validation.md`.
</role>

<dependent_tasks>
- Task 027: Backend Test Quality Audit
</dependent_tasks>

<context>
- `UpdateUserController` currently implements manual inline validation for all fields (Name, Email, CPF, RG, Address).
- Other controllers (e.g., `AddUserController`, `CreateUserLoginController`) use a `Validation` protocol and a `ValidationComposite` factory.
- This results in duplicated validation logic and inconsistent controller structure.
</context>

<scope>
1. **Backend**:
   - Create `UpdateUserValidationFactory` in `src/main/factories`.
   - Implement matching `ValidationComposite` for all fields in `UpdateUserController`.
   - Refactor `UpdateUserController` to receive `Validation` in constructor.
   - Remove manual Value Object instantiation for validation purposes from `UpdateUserController.handle`.
   - Update tests to inject the validation mock and verify its usage.
</scope>

<requirements>
- **Stack**: TypeScript, Clean Architecture pattern.
- **Negative Constraints**: Do not change the `UpdateUser` Use Case logic.
- **Standards**: Must achieve 100% coverage on the new factory and refactored controller.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `UpdateUserController` uses `validation.validate()` for initial input check.
- [ ] Manual VO creation is only performed for data transformation, not for parameter Presence/Format checking.
- [ ] 100% test coverage for `UpdateUserController` and `UpdateUserValidationFactory`.
</acceptance_criteria>

<output>
1. **Summary**: Standardized validation for UpdateUser flow.
2. **Decisions**: Used `ValidationComposite` to maintain parity with other controllers.
3. **Manual Test Guide**: Run `npm run test:unit update-user-controller.spec.ts`.
</output>
