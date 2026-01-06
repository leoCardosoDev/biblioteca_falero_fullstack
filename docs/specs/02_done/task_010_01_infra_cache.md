# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
You are an Senior DevOps & Backend Engineer.
</role>

<dependent_tasks>
- N/A
</dependent_tasks>

<context>
The application lacks a distributed caching mechanism. To support the new Address module (and future features like Session caching, Rate Limiting), we need to establish a robust infrastructure layer.
This task focuses strictly on the **Shared Kernel / Infrastructure** bounded context.
</context>

<scope>
### 1. Infrastructure (Docker)
- **Redis Service**: Add `redis:alpine` to `docker-compose.dev.yml` and `docker-compose.prod.yml`.
    - Port: 6379
    - Volume: `redis_data:/data` (Persistence)
    - Healthcheck: `redis-cli ping`

### 2. Configuration
- **Environment**: Update `src/main/config/env.ts` and `.env` example.
    - `REDIS_URL=redis://localhost:6379`

### 3. Data Protocols (Shared Kernel)
- **Interface**: Create `src/data/protocols/cache/cache-repository.ts`.
    ```typescript
    export interface CacheRepository {
      get: (key: string) => Promise<any>
      set: (key: string, value: any, ttl?: number) => Promise<void>
    }
    ```

### 4. Infrastructure Implementation
- **Adapter**: Create `src/infra/cache/redis-cache-adapter.ts`.
    - Dependencies: `ioredis`.
    - Pattern: Singleton or connection managed properly.
    - Logic:
        - `set`: serialize value to JSON. Support TTL (EX).
        - `get`: deserialize JSON to Object. Return null if missing.
</scope>

<requirements>
- **Strict Separation**: This adapter should be generic. DO NOT put any business logic here.
- **Resilience**: Handle connection failures gracefully (log error, do not crash app on startup if possible, though Redis is usually critical).
</requirements>

<acceptance_criteria>
- [ ] Redis container operational.
- [ ] `RedisCacheAdapter` implements `CacheRepository`.
- [ ] Integration Test: `RedisCacheAdapter.spec.ts` verifies Set/Get/Expire behavior.
</acceptance_criteria>
