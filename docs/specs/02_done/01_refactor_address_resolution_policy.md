# Domain Refactoring: Extract Address Resolution Policy

<role>
Refactoring Architect specializing in Domain-Driven Design and Clean Architecture.
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `AddressResolutionService` currently contains implicit domain rules determines when to look up geo-entities (City, State, Neighborhood) versus performing an external lookup (ViaCEP/Gateway).

These rules (`shouldLookUpGeoEntities`, `shouldLookUpExternalAddress`) are **Domain Policies** that define the strategy for address resolution. Currently, they are hidden as private methods in an Application Service. This violates the separation of Domain and Application layers.
</context>

<scope>
1.  **Backend**:
    - Extract policy logic from `AddressResolutionService` into a new Domain Service: `AddressResolutionPolicy`.
    - Define clear interface for the policy strategies.
    - Inject the policy into `AddressResolutionService`.
    - Ensure `AddressResolutionService` becomes a pure orchestrator.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, Clean Architecture
- **Negative Constraints**: Do not change the external behavior of the resolving logic.
- **Performance**: No impact.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A - Internal Refactoring
</api_specification>

<acceptance_criteria>
- [ ] `AddressResolutionPolicy` exists in `domain/services/address`.
- [ ] `AddressResolutionService` delegates protocol decisions to `AddressResolutionPolicy`.
- [ ] All `DbAddUser` and `AddressResolutionService` tests pass.
- [ ] No private "business logic" methods remain in `AddressResolutionService`.
</acceptance_criteria>

<output>
1.  **Summary**: Extracted domain policy.
2.  **Decisions**: Moved logic to Domain Layer to prevent Anemia and Leaking.
3.  **Manual Test Guide**: Run `npm test` for `AddressResolutionService`.
</output>
