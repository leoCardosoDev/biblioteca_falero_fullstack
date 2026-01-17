# Geography Domain Rules

## Overview
Geography is a **reference data module** with simple entities.
No aggregate root; entities are independent but hierarchically related.

---

## Invariants (MUST HOLD)

1. **State is top-level** — State has no parent within this module
2. **City belongs to State** — City must have a valid stateId
3. **Neighborhood belongs to City** — Neighborhood must have a valid cityId
4. **Names are unique within parent** — No duplicate city names within same state
5. **Reference data is read-heavy** — Optimized for queries, not writes

---

## Lifecycle

### Creation Rules
- Entities are created via static `create()` methods
- ID is required for all entities
- Parent reference (stateId, cityId) is required where applicable

### State Transitions
- No state transitions — reference data is mostly immutable
- Updates happen only via administrative operations

### Forbidden States
- City without stateId
- Neighborhood without cityId
- Duplicate names within same parent

---

## Entities

### State
- **Responsibility**: Represents a federal state/province
- **Fields**: id, name, abbreviation
- **Rules**: Abbreviation must be unique

### City
- **Responsibility**: Represents a city within a state
- **Fields**: id, name, stateId
- **Rules**: Name unique within state

### Neighborhood
- **Responsibility**: Represents a neighborhood within a city
- **Fields**: id, name, cityId
- **Rules**: Name unique within city

---

## Value Objects
- None exposed publicly

---

## Domain Events
- None — reference data module
