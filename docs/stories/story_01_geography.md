# User Story (STORY_01)

## Title
Geography Constraints (Shared Kernel)

## Persona
System Administrator

## Story
As a **System Administrator**,
I want **to enforce a valid structure of States, Cities, and Neighborhoods**,
So that **all physical addresses in the system are standardized and valid.**

## Business Value
- Prevents data inconsistency in User and Unit addresses.
- Ensures logistical accuracy for potential future features (shipping, analysis).
- Establishes the "Truth" for location data across the system.

## Acceptance Criteria
- [ ] **State Structure**: System must validate States with Name and 2-char UF.
- [ ] **City Hierarchy**: Cities must belong to a valid State.
- [ ] **Neighborhood Hierarchy**: Neighborhoods must belong to a valid City.
- [ ] **Uniqueness**: State UF must be unique.
- [ ] **Constraint**: Users or Units cannot register addresses with non-existent cities/neighborhoods.

## Out of Scope
- Integration with external maps APIs (Google Maps) for now.
- Auto-complete of addresses via CEP (initially).

## Assumptions
- Data will be seeded from IBGE or standard lists initially.

## Open Questions
- Should we allow dynamic creation of neighborhoods by users during registration? (Decision: No, curated list or admin only initially).
