# <role>
# You are the BACKEND DEVELOPER.
# </role>

<context>
Generic domain objects, error classes, and infrastructure setup are currently mixed with feature code.
See `app/docs/sql/falero.sql` "SHARED KERNEL".
</context>

<scope>
1.  **Shared Domain**:
    -   Move generic Value Objects (e.g., `EntityID`, `UniqueEntityID`) to `src/shared/domain`.
    -   Move base `Entity` classes.
2.  **Shared Application**:
    -   Move generic `AppError`, `Either`, `Result` to `src/shared/application`.
3.  **Shared Infra**:
    -   Move generic Database connection/config (TypeORM/Redis) to `src/shared/infra`.
    -   Move generic `Logger` adapters.
    -   *Crucial*: If `City`, `State`, `Neighborhood` were purely generic, they would go here. However, `falero.sql` defines them as a context. We will stick to the plan of making them a Module (`modules/geography`) but verify they are accessible (see Spec 04).
4.  **Refactor Imports**: Update all references in the codebase to point to the new `@/shared/*` paths.
</scope>

<requirements>
- **Stack**: TypeScript.
- **Constraint**: Must NOT break the build. Legacy code must import from `shared`.
</requirements>

<impact_analysis>
- **Domain**: Moves foundational classes.
- **Main**: Server wiring of DB.
</impact_analysis>

<acceptance_criteria>
- [x] Files moved to `src/shared`.
- [x] `npm run test:ci` passes.
</acceptance_criteria>
