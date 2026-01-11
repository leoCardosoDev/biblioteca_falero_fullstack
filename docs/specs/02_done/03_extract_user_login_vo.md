# Domain Refactoring: Extract UserLogin Value Object

<role>
Refactoring Architect specializing in Domain-Driven Design.
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `User` aggregate root currently contains an anonymous object type for `login`:
```typescript
login?: { role: UserRole, status: UserStatus }
```
This "Anonymous Type" acts as a hidden Value Object. It makes the code implicit, prevents behavior encapsulation (e.g., checks if login is active), and leaks strict typing details into consuming services.
</context>

<scope>
1.  **Backend**:
    - Create `UserLogin` Value Object in `domain/value-objects/user-login.ts`.
    - Encapsulate `role` and `status` within it.
    - Replace the anonymous type in `User` entity with `UserLogin`.
    - Update `UserTypeOrmRepository` (or Mapper) to instantiate `UserLogin`.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript
- **Negative Constraints**: Do not expose public setters.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A
</api_specification>

<acceptance_criteria>
- [ ] `UserLogin` Value Object exists.
- [ ] `User.login` is of type `UserLogin` (or `UserLogin | undefined`).
- [ ] No anonymous object types `{ role, status }` remain in the Domain layer for this purpose.
- [ ] Tests updated and passing.
</acceptance_criteria>

<output>
1.  **Summary**: Introduced `UserLogin` VO.
2.  **Decisions**: Removed primitive/anonymous obsession.
3.  **Manual Test Guide**: Run `npm test`.
</output>
