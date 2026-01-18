# <role>
# You are the DOMAIN EXPERT & FRONTEND DEV.
# </role>

<context>
The Geography context (`City`, `State`, `Neighborhood`) supports Identity.
Currently, address form logic is likely embedded in `UserForm` or in `forms/parts`.
</context>

<scope>
1.  **Structure**: Create `src/modules/geography`.
    -   `domain`, `application`, `infra`, `presentation` (or just `components` if keeping simple, but stick to standard: `presentation/components`).
2.  **Move Domain**: `City`, `State`, `Neighborhood` models from `src/domain/models` to `src/modules/geography/domain`.
3.  **Move Application**: `LoadCity`, `LoadState` usecases to `src/modules/geography/application`.
4.  **Move UI**:
    -   Identify address-related parts in `src/presentation/react/components/forms/parts` (e.g. `AddressFields` or similar).
    -   Move them to `src/modules/geography/presentation/components`.
5.  **Public API**: Export `AddressForm` (or the equivalent component) so Identity can use it.
</scope>

<requirements>
- **Stack**: React.
- **Constraint**: Must export components for `UserForm` to use.
- **Boundary**: Geography must NOT import from Identity.
</requirements>

<impact_analysis>
- **Presentation**: `UserForm` import path changes.
</impact_analysis>

<acceptance_criteria>
- [ ] Mapped Geography files moved.
- [ ] `Address` related components moved.
- [ ] `UserForm` works with new imports.
</acceptance_criteria>
