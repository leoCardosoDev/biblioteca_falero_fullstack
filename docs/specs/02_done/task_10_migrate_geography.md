# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<role>
You are a Senior Frontend Engineer responsible for migrating the Geography Refactoring.
</role>

<dependent_tasks>
- `app/docs/specs/02_done/task_07_geography_module_skeleton.md` (Skeleton created)
</dependent_tasks>

<context>
The `Geography` module skeleton exists at `src/modules/geography`.
Legacy geography logic (Address, City, State) resides in:
- `src/domain/geography` (or shared kernel in legacy)
- `src/infra/geography` (API calls)
- Components using Address.
</context>

<scope>
Migrate all Geography-related code (Address, City, State, Neighborhood) to `src/modules/geography` and refactor.

1.  **Domain Layer** (`src/modules/geography/domain`):
    - Move `Address`, `City`, `State`, `Neighborhood` entities/VOs.
    - Ensure strict isolation.

2.  **Infra Layer** (`src/modules/geography/infra`):
    - Create `HttpGeographyRepository`.
    - **Mocking**: Maintain existing mocks or implement temporary mocks in the Repository if the backend endpoint is not ready, to ensure the UI remains testable and viewable.
    - Implement caching for States/Cities using TanStack Query's `staleTime` configuration (as these rarely change).

3.  **Application Layer** (`src/modules/geography/application`):
    - Create `useStates`, `useCities`, `useNeighborhoods` hooks using TanStack Query.
    - Remove any ad-hoc `axios` calls for these resources.

4.  **Presentation Layer** (`src/modules/geography/presentation`):
    - Move `AddressForm` or similar components.
    - Ensure they are reusable (exported via `public/`).

5.  **Tests**:
    - Move all related tests to `tests/frontend/geography/`.
    - Ensure they pass.
</scope>

<requirements>
- **Stack**: React, TypeScript, TanStack Query.
- **Performance**: High cache hit rate for States/Cities.
- **Negative Constraints**:
    - NO mixed domains (Geography should not depend on User).
    - NO usage of unnecessary global state for geography data (use Query Cache).
</requirements>

<architectural_guidance>
> **Refactoring Engine**: Apply detailed patterns from `app/docs/prompts/refactor.md` and `.agent/standards/STANDARD_REFACTORING.md`.

### 1. Domain Object Design
- **Value Objects**: `Address` MUST be a Value Object. It should be immutable and self-validating.
  - *Refactor*: If you see `validateAddress(street, city, zip)`, **MOVE METHOD** to `Address.create()` factory.
- **Data Clumps**: If you see `street, number, city, zip` passed together in methods, **PARAMETER OBJECT** -> refactor to pass `Address` object.

### 2. Caching Strategy (Refactoring for Performance)
- Use **Stale-While-Revalidate** pattern via TanStack Query for `useStates` and `useCities`.
- Treat these as "Reference Data" (Infinite Stale Time recommended unless explicit refresh).
</architectural_guidance>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`
- `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Codebase: Logic moved to `src/modules/geography`.
- [ ] Codebase: Legacy geography files deleted.
- [ ] Feature: Address selection (State -> City -> Neighborhood) works with new hooks.
- [ ] Test: All Geography tests pass.
- [ ] Lint: No boundary violations.
</acceptance_criteria>
