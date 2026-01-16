# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
You are an Senior Backend Engineer specializing in DDD.
</role>

<dependent_tasks>
- Task 10.1 (Indirectly, for future caching, but logically independent for DB work)
</dependent_tasks>

<context>
We are establishing the **Geography Bounded Context**. Currently, the `State`, `City`, and `Neighborhood` entities exist but lack the necessary Repositories and Services to be used effectively by other contexts (like User or Supplier).
</context>

<scope>
### 1. Repositories (Data Layer)
- **StateRepository**:
    - `loadByUf(uf: string): Promise<StateModel>`
- **CityRepository**:
    - `loadByNameAndState(name: string, stateId: string): Promise<CityModel>`
    - `add(name: string, stateId: string): Promise<CityModel>`
- **NeighborhoodRepository**:
    - `loadByNameAndCity(name: string, cityId: string): Promise<NeighborhoodModel>`
    - `add(name: string, cityId: string): Promise<NeighborhoodModel>`

### 2. Domain Service (The "GeoFactory")
- **Service**: `src/domain/services/geo/get-or-create-geo-entity-service.ts`
- **Goal**: Provide a single entry point for any Bounded Context to resolve Address strings into IDs.
- **Method**: `perform(dto: AddressDTO): Promise<GeoIdsDTO>`
    - Logic:
        1. Find State by UF (Error if missing - States are static).
        2. Find City. If missing -> Add City.
        3. Find Neighborhood. If missing -> Add Neighborhood.
        4. Return `{ stateId, cityId, neighborhoodId }`.
</scope>

<requirements>
- **Normalization**: All lookups should be Case Insensitive (or normalized to UpperCase).
- **Idempotency**: Concurrent requests for the same new City should not fail (handle unique constraint violation gracefully or use atomic upsert if possible).
</requirements>

<acceptance_criteria>
- [ ] Repositories implemented with TypeORM.
- [ ] `GetOrCreateGeoEntityService` unit tested with mocks.
- [ ] Integration test: Call service with new City -> Persisted in DB. Call again -> Return existing ID.
</acceptance_criteria>
