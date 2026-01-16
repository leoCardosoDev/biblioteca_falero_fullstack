<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_05_reconstitution_alignment.md`.
</role>

<dependent_tasks>
- Task 027: Backend Test Quality Audit
</dependent_tasks>

<context>
- `UserRepository` uses `toUserModel` which re-validates all fields using VOs and returns `null` (fail-fast) if any field is corrupt.
- `LoginRepository` manually assigns some fields and recovers from others, which could lead to inconsistent domain states.
</context>

<scope>
1. **Infrastructure**:
   - Refactor `LoginRepository.toDomain` to follow the "Domain Shielding" pattern used in `UserRepository`.
   - Ensure that if critical data is missing or invalid in the database, the reconstitution returns `null` or throws a clear infrastructure error instead of a "limping" object.
   - Update tests to verify this fail-fast behavior.
</scope>

<acceptance_criteria>
- [ ] `LoginRepository` uses same validation strategy as `UserRepository` for reconstitution.
- [ ] Tests added to verify rejection of corrupt database records.
</acceptance_criteria>

<output>
1. **Summary**: Aligned repository reconstitution strategies.
2. **Decisions**: Standardized on "Fail-Fast" to protect domain integrity.
</output>
