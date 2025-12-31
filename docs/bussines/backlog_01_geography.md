# 🌍 Geography Context (Shared Kernel)

## 📝 Description
This context manages the geographical structure used throughout the system. It serves as a **Shared Kernel**, meaning it is consumed by other aggregates (like User and Unit) but exists independently.

## 🏛️ Entities

### `State`
Represents a federal state (UF).
*   **name**: string(50) - Name of the state.
*   **uf**: char(2) - Unique abbreviation (e.g., 'SP', 'RJ').

### `City`
Represents a municipality within a state.
*   **state_id**: Reference to `State`.
*   **name**: string(50) - Name of the city.

### `Neighborhood`
Represents a neighborhood or district within a city.
*   **city_id**: Reference to `City`.
*   **name**: string(50) - Name of the neighborhood.

## 🔗 Relationships
*   A **State** has many **Cities**.
*   A **City** has many **Neighborhoods**.

## 📏 Business Rules
*   **Uniqueness**: `uf` must be unique across states.
*   **Hierarchy**: A neighborhood must belong to a city, and a city must belong to a state.

## 📦 Usage
Used by **User** and **Unit** via the `Address` Value Object to validate location data.
