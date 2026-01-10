
# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as ARCHITECT.
# </role>

<role>
Refactoring Specialist focusing on Service Orchestration and System Integration.
</role>

<dependent_tasks>
- Depends on: task_refactor_01_extract_address_service.md (Partial implementation)
- Depends on: task_refactor_03_strict_types_db_add_user.md (Strict types)
</dependent_tasks>

<context>
The `AddressResolutionService` was introduced to centralize address logic, but it currently only handles local GeoEntity creation (`GetOrCreateGeoEntityService`).
The legacy external lookup logic (ViaCEP + Redis Cache) exists in `CachedAddressGateway` but was disconnected during refactoring, leaving commented-out code in `load-address-by-zip-code-controller-factory.ts` and `as any` casts.
The system currently fails to look up new addresses from external API, relying solely on user input or existing db data.
</context>

<scope>
Complete the implementation of `AddressResolutionService` to be the single source of truth for address resolution, integrating external lookups and caching.

1.  **Backend**:
    -   **Update `AddressResolutionService`**:
        -   Inject `AddressGateway` (which will be the `CachedAddressGateway`).
        -   Update `resolve` logic:
            1.  If all IDs (`cityId`, `neighborhoodId`, `stateId`) are provided -> Use them (Local DB check implicit via ForeignKeys or explicit check if needed).
            2.  If IDs are missing but `zipCode` is provided -> **Call `this.addressGateway.getByZipCode(zipCode)`**.
            3.  If external gateway returns an address -> Use `GetOrCreateGeoEntityService` to persist/retrieve IDs for the returned City/Neighborhood/State.
            4.  Return the fully constructed `Address` Value Object.
    -   **Update Factory**: `src/main/factories/controllers/address/load-address-by-zip-code-controller-factory.ts`
        -   Uncomment and instantiate `AxiosHttpClient`, `ViaCepAdapter`, `RedisCacheAdapter`.
        -   Instantiate `CachedAddressGateway`.
        -   Inject `CachedAddressGateway` into `AddressResolutionService`.
        -   Remove `as any` cast.
    -   **Update Factory**: `src/main/factories/add-user-controller-factory.ts`
        -   Ensure `AddressResolutionService` is instantiated with the Gateway (or a Null/Mock gateway if external lookup is not desired for *adding* users, but ideally consistent behavior is better). *Decision: Use the same full stack.*
    -   **Tests**:
        -   Update `address-resolution-service.spec.ts` to mock `AddressGateway` and test the external lookup flow.

2.  **Frontend**:
    -   None.
</scope>

<requirements>
-   **Stack**: TypeScript, Clean Architecture.
-   **Negative Constraints**: Do not duplicate the `ViaCep` logic inside the Service; strictly delegate to the Gateway.
-   **Performance**: External calls must be cached (handled by `CachedAddressGateway`).
</requirements>

<standards_compliance>
-   **General**: `workflow/standards/STANDARD_GENERAL.md`
-   **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A - Internal Refactoring.
</api_specification>

<acceptance_criteria>
-   [ ] Backend: `AddressResolutionService` accepts `AddressGateway` in constructor.
-   [ ] Backend: `AddressResolutionService` calls Gateway when IDs are missing.
-   [ ] Backend: `load-address-by-zip-code-controller-factory.ts` has NO `as any` and NO commented out legacy code.
-   [ ] Backend: `add-user-controller-factory.ts` correctly instantiates the full service stack.
-   [ ] Backend: Tests updated and passing.
</acceptance_criteria>

<output>
1.  **Summary**: Completed strict address resolution with external fallback.
2.  **Decisions**: Reused existing `CachedAddressGateway` to maintain caching behavior.
3.  **Manual Test Guide**: Call `GET /addresses/cep/:zipcode` with a new valid Logradouro CEP and verify it returns data.
</output>
