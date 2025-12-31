# 🏫 Unit Context (Library / School)

## 📝 Description
Represents a physical location (Library branch or School unit) where books are stored and loans occur. It is an **Aggregate Root**.

## 🏛️ Entities

### `Unit` (Aggregate Root)
*   **name**: string(180) - Name of the unit.
*   **phone**: string(20) - Contact phone.

### `Address` (Value Object)
Embedded within the `Unit` table. Essential for physical logistics.
*   **address_street**: string(100)
*   **address_number**: string(10)
*   **address_complement**: string(50)
*   **address_zip_code**: char(8)
*   **neighborhood_id**: Reference to `Geography.Neighborhood` (Required).
*   **city_id**: Reference to `Geography.City` (Required).

## 🔗 Relationships
*   Uses **Geography** (Neighborhood, City).
*   Has many **Inventory.WorkCopy** items.
*   Is the origin of **Circulation.Loan**.

## 📏 Business Rules
*   **Location Required**: Unlike users, a Unit MUST have a fully valid address including Neighborhood and City.
