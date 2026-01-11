# Task: Enable Neighborhood Lookup by ID

<role>
Product & Domain Analyst
</role>

<dependent_tasks>
- Depends on: task_009_08_backend_city_state_cache.md (for established address patterns)
</dependent_tasks>

<context>
The frontend needs to pre-fill address forms when editing a user. Currently, it receives `neighborhoodId`, `cityId`, and `stateId`. While City and State have lookup endpoints, the Neighborhood entity only has a creation endpoint (`POST /neighborhoods`) and a search by ZIP code. There is no way to retrieve a specific neighborhood by its ID to display its name in the form.
</context>

<scope>
Implement a new endpoint to retrieve a Neighborhood by its ID.

1.  **Backend**:
    - [ ] Create `db-load-neighborhood-by-id.ts`
- [ ] Make `LoadUserById` return `stateId` in the address object (Critical for frontend edit form)
- [ ] Create `load-neighborhood-by-id-controller.ts`e.
    -   Implement `DbLoadNeighborhoodById` data use case.
    -   Implement `NeighborhoodRepository.loadById`.
    -   Ensure authentication/authorization rules (e.g., authenticated users can read).

2.  **Frontend**:
    -   (Handled in separate task: Frontend Address Lookup)
</scope>

<requirements>
-   **Stack**: Node.js, Fastify, TypeORM, Clean Architecture.
-   **Performance**: Optimize for fast lookup (primary key).
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
-   **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
#### GET /api/neighborhoods/{id}
**Request**:
- Path Param: `id` (UUID)

**Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "Neighborhood Name",
  "cityId": "uuid"
}
```

**Response (404 Not Found)**:
```json
{
  "error": "Neighborhood not found"
}
```
</api_specification>

<acceptance_criteria>
- [ ] Backend: Endpoint `GET /api/neighborhoods/{id}` returns correct data for valid ID.
- [ ] Backend: Endpoint returns 404 for invalid ID.
- [ ] Backend: Endpoint requires authentication (bearer token).
- [ ] Integration: Verified with Swagger/Postman.
</acceptance_criteria>

<output>
-   New endpoint `GET /api/neighborhoods/{id}` available.
</output>
