# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
You are an Senior Backend Engineer specializing in API Design.
</role>

<dependent_tasks>
- Task 10.1, 10.2, 10.3
</dependent_tasks>

<context>
The **User Context** and the Application layer (API) need to consume the Geographic services built in previous tasks to solve the "Invalid Address" UX issue.
</context>

<scope>
### 1. Application Service (Facade)
- **Service**: `AddressResolutionService`
    - Dependencies: `AddressGateway` (Task 10.3), `GetOrCreateGeoEntityService` (Task 10.2).
    - Logic:
        1. `gateway.getByZipCode` -> DTO.
        2. `geoService.perform(DTO)` -> IDs.
        3. Merge DTO + IDs -> Return Composite Object.

### 2. API Endpoint
- **New Route**: `GET /addresses/cep/:zipCode`
    - Controller: `LoadAddressByZipCodeController`.
    - Returns: JSON with Address + IDs.

### 3. User Creation (Refactoring)
- **UseCase**: `DbAddUser`.
    - Update logic: If `address` payload has no IDs but has Names/Zip, call `GetOrCreateGeoEntityService` internally to resolve the IDs before saving.
    - **Note**: The frontend can now either (A) Call `/addresses/cep` and send IDs, or (B) Send raw text and let backend resolve. Providing both enhances resilience.

</scope>

<requirements>
- **UX**: The endpoint response must map cleanly to the Frontend Form fields.
- **Performance**: The Facade combines Cache + DB Lookup efficiently.
</requirements>

<acceptance_criteria>
- [ ] `GET /addresses/cep/:zipCode` returns full address with IDs.
- [ ] `POST /users` accepts payload without `cityId` (using names) and successfully creates the user.
</acceptance_criteria>
