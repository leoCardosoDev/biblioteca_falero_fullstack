# <role>
# You are the SECURITY & FRONTEND ENGINEER.
# </role>

<context>
The Identity context (`User`, `Account`, `Auth`) is the core of the application.
Currently, it is scattered across `src/presentation`, `src/domain`, `src/infra`.
</context>

<scope>
1.  **Structure**: Create `src/modules/identity`.
2.  **Move Domain**: `User`, `Account`, `Login` models to `src/modules/identity/domain`.
3.  **Move Application**: `Authentication`, `AddUser`, `LoadUser` usecases to `src/modules/identity/application`.
4.  **Move Infra**: `HttpRemoteAuthentication` etc. to `src/modules/identity/infra` (if they are specific. If generic `HttpClient` is used, then just the specific Adapters).
5.  **Move UI**:
    -   `LoginForm` -> `src/modules/identity/presentation/components/login-form`.
    -   `UserForm` -> `src/modules/identity/presentation/components/user-form`.
    -   `CredentialModal`, `ProfileDisplay`, `LoginHeader` -> `src/modules/identity/presentation/components/*`.
6.  **Refactor**:
    -   Update `UserForm` to import `UserAddress` from `@/modules/geography`.
</scope>

<requirements>
- **Stack**: React.
- **Constraint**: Move all Identity related features.
</requirements>

<impact_analysis>
- **Main**: Factories will break.
- **Router**: Pages will break imports.
</impact_analysis>

<acceptance_criteria>
- [ ] Identity module created.
- [ ] Files moved.
- [ ] `UserForm` works (imports Geography).
- [ ] Lint passes.
</acceptance_criteria>
