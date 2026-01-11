# Task: Backend City/State Caching

<role>
Product & Domain Analyst (PDA) / System Architect
</role>

<dependent_tasks>
- [ ] task_009_05_frontend_user_update (Requires this for displaying City/State names in Edit mode)
</dependent_tasks>

<context>
- The frontend `UserForm` receives `initialData` with `address.cityId`, `address.stateId`, `address.neighborhoodId`.
- To display user-friendly names (e.g., "São Paulo", "SP") in the readonly fields during edit mode, we need endpoints that resolve these UUIDs to names.
- Since geographic data is static and accessed frequently (every user edit), we must cache it to prompt performance and spare the DB.
</context>

<scope>
1. **Backend**:
    - Implement `LoadCityById` and `LoadStateById` use cases.
    - Implement `CacheStateRepository` and `CacheCityRepository` decorators/proxies.
    - Use **Redis** via `ioredis` for caching.
    - Expose endpoints `GET /cities/:id` and `GET /states/:id` (or similar).
</scope>

<requirements>
- **Stack**: Node.js, Fastify, TypeORM, Redis.
- **Performance**: < 20ms response time for cached items.
- **Constraints**:
    - Do NOT use `SELECT * FROM`. Use explicit column selection or ORM `findOne`.
    - Use Cache-Aside pattern (Try Redis -> if miss, Try DB -> Set Redis).
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<architecture_decision>
- **Why Redis?**: O(1) read performance for high-frequency, low-volatility data.
- **Pattern**: Decorator over Repository (e.g. `DbLoadCity` wrapped by `CacheLoadCity` or Repository Decorator).
</architecture_decision>

<api_specification>
#### GET /api/cities/:id
**Response**:
```json
{
  "id": "uuid",
  "name": "São Paulo",
  "stateId": "uuid"
}
```

#### GET /api/states/:id
**Response**:
```json
{
  "id": "uuid",
  "name": "São Paulo",
  "uf": "SP"
}
```
</api_specification>

<acceptance_criteria>
- [ ] Backend: `GET /cities/:id` invokes Redis first.
- [ ] Backend: `GET /states/:id` invokes Redis first.
- [ ] Backend: Cache miss correctly fetches from DB and populates Redis.
- [ ] Backend: TTL is set (e.g. 30 days) or indefinite.
- [ ] Backend: Unit tests for Cache logic (mocking Redis).
</acceptance_criteria>
