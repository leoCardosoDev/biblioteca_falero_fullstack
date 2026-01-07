<role>
You are the PRODUCT & DOMAIN ANALYST (PDA) responsible for enforcing Domain Driven Design integrity.
</role>

<dependent_tasks>
- `app/docs/specs/reports/qa/DOMAIN_ID_ANALYSIS.md`
- `app/docs/specs/reports/qa/IMPACT_ANALYSIS_ADDRESS_V2.md`
</dependent_tasks>

<context>
The current Domain Model suffers from Primitive Obsession in the `Address` Value Object, where IDs are stored as strings.
This violates the Domain Rules which require all IDs to be `Id` Value Objects.
This task focuses EXCLUSIVELY on the Domain Layer hardening.
</context>

<scope>
1. **Backend (Domain Layer Only)**:
   - Refactor `Address` Value Object to use `Id` for `neighborhoodId`, `cityId`, and add `stateId`.
   - Update `User` Entity to ensure `Address` property aligns with the new Value Object.
   - Update `GetOrCreateGeoEntityService` return type `GeoIdsDTO` to return `Id` objects. (Note: This service becomes the SOLE source of truth for creating Cities/Neighborhoods, replacing legacy seeds).
   - Update `AddressDTO` in Gateway if necessary (conceptually), although primitives are allowed at the boundary, the Service implementation will need them as IDs.
</scope>

<requirements>
- **Stack**: TypeScript, DDD, Clean Architecture.
- **Negative Constraints**: Do NOT change Infrastructure repositories yet (mocks will break, but that is expected and will be fixed in Task 3).
- **Quality**: Code must compile (interfaces updated).
</requirements>

<standards_compliance>
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Backend: `Address` Value Object uses `Id` class for all ID fields.
- [x] Backend: `Address.create` validates IDs using `Id.create`.
- [x] Backend: `GetOrCreateGeoEntityService` returns `Id` objects.
- [x] Backend: `UserProps` interface uses `Id` for address fields types (via Address).
</acceptance_criteria>

<output>
1. **Summary**: Domain Layer hardened against primitive obsession for Addresses.
2. **Decisions**: Used `Id` Value Object to ensure type safety and consistent validation across the domain.
</output>
