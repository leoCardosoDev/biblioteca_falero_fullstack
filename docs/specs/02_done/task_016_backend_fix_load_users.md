# Task 016: Fix Backend Load Users Inconsistency (TD002)

<role>
You are the BACKEND DEVELOPER (BACKEND-DEV).
</role>

<dependent_tasks>
- Related to: `app/docs/specs/technical_debt/TD002_backend_load_users_inconsistency.md`
- Compliance: `app/docs/adr/002_user_login_separation.md` (ADR 002)
- Compliance: `app/docs/bussines/story_04_access_control.md`
</dependent_tasks>

<context>
Currently, the `GET /users` endpoint returns a list of users without their associated login information (Role, Status). This inconsistency, identified in TD002, prevents the frontend `UserList` from displaying critical access information. 
While ADR 002 enforces separation of User and Login, the "User List" view (Administrative context) requires a joined "Read Model" or DTO that presents both Identity (User) and Access (Login) data.
</context>

<scope>
**Backend**:
1.  **Infrastructure (`UserTypeOrmRepository`)**: 
    -   Update `loadAll()` method.
    -   Implement a `LEFT JOIN` with the `login` table.
    -   Map the result to include `login` relation data (specifically `role` and `active` status) into the domain model.
2.  **Domain (`UserModel`)**:
    -   Add an optional `login` field to the `UserModel`.
    -   *Note*: This serves as a "hydration" point for Read operations. Ensure writing/saving logic does not inadvertently cascade invalid states if strict separation is required.
3.  **Presentation (`LoadUsersController`)**:
    -   Update the View Model/Response Serializer to include `login` details in the JSON response of `GET /users`.
    -   Ensure consistent structure with `GET /users/:id`.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, TypeORM.
- **Performance**: Ensure the JOIN does not create N+1 query issues.
- **Constraints**: 
    -   Do not break existing User creation/editing flows.
    -   Respect ADR 002: Login depends on User, not vice-versa, but `loadAll` is a query projection that traverses this link.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<database_schema>
```sql
-- No schema changes. Operations are read-only JOINs on existing tables:
-- users (alias u) LEFT JOIN logins (alias l) ON u.id = l.user_id
```
</database_schema>

<api_specification>
#### GET /users
**Response**:
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "login": {  // <--- New Field
      "id": "uuid",
      "role": "admin",
      "active": true
    }
  }
]
```
</api_specification>

<acceptance_criteria>
- [ ] `UserTypeOrmRepository.loadAll` performs a defined JOIN with `login`.
- [ ] `GET /users` returns `login` object for users that have one.
- [ ] `GET /users` returns `null` or compatible structure for users without login (if applicable).
- [ ] Unit/Integration tests for `LoadUsersController` verify the presence of the `login` field.
</acceptance_criteria>

<output>
1.  Updated `UserTypeOrmRepository`.
2.  Updated `UserModel`.
3.  Updated `LoadUsersController`.
</output>
