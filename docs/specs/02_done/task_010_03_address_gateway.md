# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
You are an Senior Backend Engineer specializing in Integrations.
</role>

<dependent_tasks>
- Task 10.1 (Cache Repository)
- Task 10.2 (Geography Domain - Optional, can be done in parallel)
</dependent_tasks>

<context>
The **Geography Context** needs an Anti-Corruption Layer to fetch address data from external providers (ViaCEP) without polluting the domain with external DTO formats.
</context>

<scope>
### 1. Domain Protocol
- **Interface**: `AddressGateway`
    - `getByZipCode(zipCode: string): Promise<AddressDTO | null>`

### 2. Infrastructure (ViaCEP)
- **Implementation**: `ViaCepAdapter` implements `AddressGateway`.
    - Uses `axios`.
    - Maps ViaCEP JSON to Domain `AddressDTO`.

### 3. Caching (Decorator Pattern)
- **Implementation**: `CachedAddressGateway` implements `AddressGateway`.
    - Constructor: `(private readonly decoratee: AddressGateway, private readonly cache: CacheRepository)`
    - Logic:
        1. Key = `cep:{zipCode}`
        2. `cache.get(key)` -> Return if hit.
        3. `decoratee.getByZipCode(zipCode)` -> `cache.set(key, result, 7 days)` -> Return.
</scope>

<requirements>
- **Error Handling**: If ViaCEP is down, the Adapter should throw a specific error or return null.
- **Independence**: The Decorator is generic to the Interface, not coupled to ViaCEP implementation.
</requirements>

<acceptance_criteria>
- [ ] `ViaCepAdapter` fetches real data.
- [ ] `CachedAddressGateway` caches the result using the Adapter from Task 10.1.
- [ ] Unit Tests for the Decorator logic.
</acceptance_criteria>
