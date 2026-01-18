# <role>
# You are the QUALITY ASSURANCE ENGINEER.
# </role>

<context>
We need to enforce strict architectural boundaries to prevent coupling between Bounded Contexts.
`eslint-plugin-boundaries` is installed but not fully configured for the new structure.
</context>

<scope>
1.  **Configuration**: Update ESLint configuration to define elements:
    -   `shared`: `src/shared`
    -   `modules`: `src/modules/*`
2.  **Rules**: Enforce the following:
    -   **No Cross-Context Internals**: A module cannot import another module's internal files. It must use `index.ts`.
    -   **Shared Access**: All modules can import from `shared`.
    -   **Allowed Dependency**: `identity` IS ALLOWED to import from `geography`.
    -   **Forbidden Dependency**: `geography` MUST NOT import from `identity` (Cycle Prevention).
3.  **Strictness**:
    -   Modules must NOT import `src/main` (Architecture violation).
    -   Legacy `src/domain` etc. imports should be flagged as errors once migration starts.
</scope>

<requirements>
- **Stack**: ESLint, eslint-plugin-boundaries.
- **Constraint**: Zero lint errors on existing code. 
- **Critical**: Explicitly configure the `identity` -> `geography` rule.
</requirements>

<impact_analysis>
- **Infra**: Build/Lint tooling.
</impact_analysis>

<acceptance_criteria>
- [x] ESLint defines settings for `boundaries/elements`.
- [x] Rule `boundaries/element-types` is active and configures `identity -> geography`.
- [x] `npm run lint` passes.
</acceptance_criteria>
