# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as ARCHITECT.
# </role>

<role>
Refactoring Specialist focusing on SRP (Single Responsibility Principle) and Clean Architecture.
</role>

<dependent_tasks>
- Depends on: Codebase Review Findings (codebase_review.md)
</dependent_tasks>

<context>
Currently, `DbAddUser` (Application Service) contains complex logic for resolving addresses (lines 91-154), including interacting with `GetOrCreateGeoEntityService` and manually constructing `Address` Value Objects. This violates SRP and makes testing difficult.
- **Affected File**: `src/application/usecases/db-add-user.ts`
- **Affected Test**: `tests/application/usecases/db-add-user.spec.ts`
</context>

<scope>
Extract the address resolution logic into a dedicated Application Service or Domain Service (depending on dependency depth). Given it uses `GetOrCreateGeoEntityService` (Domain Service), it fits well as an Application Service `ResolveAddressService` or strictly a composite Domain Service if we treat it as pure domain orchestration.
Let's make it an **Application Service**: `src/application/services/address/address-resolution-service.ts` to keep `DbAddUser` clean.

1. **Backend**:
    - Create `AddressResolutionService` implementing a new interface.
    - Move `resolveAddress` logic from `DbAddUser` to this new service.
    - Inject `AddressResolutionService` into `DbAddUser`.
    - Update `DbAddUser` to delegate address resolution.
    - Refactor `db-add-user.spec.ts` to mock the new service instead of testing address logic directly.
    - Create `address-resolution-service.spec.ts` to test the extracted logic.

2. **Frontend**:
    - None.
</scope>

<requirements>
- **Stack**: TypeScript, Node.js, Clean Architecture.
- **Negative Constraints**: Do not change the public API of `DbAddUser.add` method (signature must remain the same to avoid breaking controllers).
- **Performance**: No significant impact.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Gitflow**: `workflow/standards/STANDARD_GITFLOW.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A - Internal Refactoring.
</api_specification>

<acceptance_criteria>
- [ ] Backend: `AddressResolutionService` created and unit tested.
- [ ] Backend: `DbAddUser` no longer depends on `GetOrCreateGeoEntityService` directly.
- [ ] Backend: `DbAddUser` delegates to `AddressResolutionService`.
- [ ] Backend: All tests pass.
</acceptance_criteria>

<output>
1. **Summary**: Extracted address resolution from `DbAddUser`.
2. **Decisions**: Created an Application Service to handle the orchestration of geo-entity lookup and Address VO creation.
3. **Manual Test Guide**: Run `npm test` to ensure no regressions.
</output>
