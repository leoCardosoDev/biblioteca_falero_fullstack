<role>
You are the BACKEND DEVELOPER specializing in Application Logic.
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/bugfix/task_bugfix_02_infra_migration.md`
- `app/docs/specs/reports/qa/ARCH_ADDRESS_FULL_FLOW.md`
</dependent_tasks>

<context>
Domain and Database are ready. Now the Application Layer must orchestrate the flow.
`DbAddUser` needs to correctly resolve Addresses before creating the User.
`AddressResolutionService` needs to implement the lookup flow (Redis -> ViaCEP -> DB).
</context>

<scope>
1. **Backend (Application Layer)**:
   - Refactor `DbAddUser.resolveAddress` to instantiation `Id` VOs and use the new `Address` constructor.
   - Refactor `AddressResolutionService` to implement the Full Lookup Flow (check Cache, then ViaCEP + GetOrCreateGeoEntity).
   - Implement "Resolved Address" Caching in `AddressResolutionService` using key `address:resolved:{zipCode}` to store the full DTO with IDs (ARCH_ADDRESS_FULL_FLOW).
</scope>

<requirements>
- **Stack**: Node.js, TypeScript.
- **Negative Constraints**: Do not bypass Domain Validations.
</requirements>

<standards_compliance>
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Backend: `DbAddUser` successfully creates users with valid Addresses.
- [ ] Backend: `AddressResolutionService` returns IDs + Strings.
- [ ] Backend: Data flow matches `ARCH_ADDRESS_FULL_FLOW.md`.

## Pending Fixes / Next Steps
1. **Verify integration between `AddressResolutionService` and `DbAddUser`**: Ensure that the `Id` Value Objects returned by the resolution service are correctly passed to the User creation flow without type mismatches.
2. **Validate `GetOrCreateGeoEntity` usage**: Confirm that `AddressResolutionService` calls this service and that it correctly returns valid `Id`s (persisted or found) to strictly satisfy the new Foreign Key constraints.
3. **Check Frontend Compatibility**: Ensure `AddressResolutionService` returns the exact JSON structure the frontend expects (likely strings for IDs in the DTO, but domain entities inside).
3. **Check Frontend Compatibility**: Ensure `AddressResolutionService` returns the exact JSON structure the frontend expects.
4. **Redis Serialization**: Ensure `AddressResolutionService` correctly serializes the `ResolvedAddress` (including IDs) to JSON for the new cache key `address:resolved:{zipCode}`, decoupled from the raw ViaCEP cache.
</acceptance_criteria>

<output>
1. **Summary**: Application logic aligned with new Address Architecture.
</output>
