# Geography Module Contract

## Responsibility
Manages geographic reference data: States, Cities, and Neighborhoods.
This is a **reference data module** — it does NOT contain complex business logic.
Does NOT own user addresses (those belong to Identity module).

---

## Public API (Allowed Imports)
Other modules MAY import ONLY:

### Use Cases / Services (Interfaces)
- `GetOrCreateGeoEntityService`
- `AddressResolutionPolicy`

### Gateways (Abstractions)
- `FindCityByNameGateway`
- `FindCityByIdGateway`
- `FindStateByNameGateway`
- `FindNeighborhoodGateway`

### Value Objects
- `GeoId` (if exists)

---

## Forbidden Access (STRICT)
No external module may import:

- `City` (Entity)
- `State` (Entity)
- `Neighborhood` (Entity)
- Any ORM entities from `infra/db/entities/`
- Any Mappers
- Any Repository implementations

---

## Domain Concepts

### Aggregate Root
- None — this module has no aggregate, only simple entities

### Entities
- `City` — city with name and state reference
- `State` — state with name and abbreviation
- `Neighborhood` — neighborhood with name and city reference

### Value Objects
- None exposed publicly

---

## Events Emitted
- None — reference data module

---

## Events Consumed
- None

---

## Persistence
- **Tables**: `states`, `cities`, `neighborhoods`
- **Ownership**: This module is the exclusive owner of these tables
- **Note**: Other modules reference these via foreign keys but do NOT modify them
