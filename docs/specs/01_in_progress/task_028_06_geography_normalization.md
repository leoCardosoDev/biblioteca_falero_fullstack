<role>
You are the PRODUCT & DOMAIN ANALYST (PDA).
Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_028_06_geography_normalization.md`.
</role>

<dependent_tasks>
- Task 027: Backend Test Quality Audit
</dependent_tasks>

<context>
- Geography Value Objects (Neighborhood, City, State) currently lack normalization logic in their `create` methods.
- This allows data like " New York " vs "New York" to exist separately.
</context>

<scope>
1. **Domain**:
   - Update `Neighborhood`, `City`, and `State` Value Objects.
   - Implement `trim()` and consistent casing (e.g., Title Case or Upper Case) in the `create` method before validation.
   - Update unit tests to verify normalization.
</scope>

<acceptance_criteria>
- [ ] Input strings are trimmed and normalized before VO creation.
- [ ] Tests verify that " neighborhood " results in "NEIGHBORHOOD" (or chosen pattern).
- [ ] 100% coverage for changed VOs.
</acceptance_criteria>

<output>
1. **Summary**: Implemented data normalization in Geography VOs.
2. **Decisions**: Chose `toUpperCase()` and `trim()` as standard normalization.
</output>
