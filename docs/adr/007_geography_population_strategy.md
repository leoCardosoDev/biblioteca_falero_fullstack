# ADR 007: Geography Population Strategy (Shared Kernel)

## Status
Accepted

## Context
The **Shared Kernel** module regarding Geography (`state`, `city`, `neighborhood`) is currently unpopulated or relies on manual entry, which becomes an operational bottleneck.
- **Problem**: Manual registration by admins is error-prone, slow, and unscalable.
- **Goal**: Populate geography data with consistency, speed, and auditability, without admin manual intervention.
- **DDD Principle**: Shared Kernel should be immutable (or rarely mutable) and not belong to a specific aggregate.

## Decision
We will adopt a hybrid strategy for populating geography data:

### 1. State (Unidades Federativas) - Static Seed
Attributes: `name`, `uf`.
- **Strategy**: Seed via SQL Script.
- ** Source**: IBGE (27 records).
- **Reason**: States never change. Zero maintenance.

### 2. City (Municípios) - Automated Seed
Attributes: `state_id`, `name`.
- **Strategy**: Automated Script (Backend) consuming official IBGE data (CSV/JSON).
- **Source**: IBGE List of Municipalities.
- **Flow**: Import Data -> Resolve `state_id` -> Insert.
- **Reason**: Too many records for manual SQL; requires automation but is relatively static.

### 3. Neighborhood (Bairros) - Semi-Dynamic (On-Demand)
Attributes: `city_id`, `name`.
- **Strategy**: Created On-Demand via API.
- **Reason**: Neighborhoods are not strictly defined by IBGE in a clean way for all cities, and they change more often. Loading all neighborhoods of Brazil is unnecessary overhead.
- **Flow**: User/System requests a neighborhood. If it exists in the city, return ID. If not, create and return ID.

## Consequences
### Positive
- **Operational Efficiency**: Admin does not need to register geography data.
- **Data Integrity**: States and Cities are consistent with official national data (IBGE).
- **Scalability**: Neighborhoods grow as needed, not bloating the DB with unused data.

### Negative
- **Complexity**: Requires implementing a seed script and "find-or-create" logic for neighborhoods.
- **Dependency**: Initial system setup requires running the seed scripts.

## Governance
- **DELETE**: Not allowed for any geography entity (to maintain referential integrity).
- **UPDATE**: Only allowed by Admin (restricted).
- **Version Control**: Seed scripts must be versioned (migrations).
