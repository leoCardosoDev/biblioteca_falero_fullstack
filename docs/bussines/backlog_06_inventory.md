# 📦 Inventory Context (Physical Copies)

## 📝 Description
Manages the physical assets (copies) of the Works defined in the Catalog. This context tracks the specific item that can be held, borrowed, or repaired.

## 🏛️ Entities

### `WorkCopy` (Aggregate Root)
Represents a specific physical copy of a Work.
*   **work_id**: Reference to `Catalog.Work`.
*   **unit_id**: Reference to `Unit.Unit` (Where this copy is located).
*   **acquisition_date**: date.
*   **notes**: string(150).
*   **status**: enum('AVAILABLE', 'BORROWED', 'MAINTENANCE').

### `Maintenance`
Represents a repair or maintenance event for a copy.
*   **work_copy_id**: Reference to `WorkCopy`.
*   **maintenance_date**: datetime.
*   **reason**: string(100).

## 🔗 Relationships
*   **WorkCopy** belongs to a **Catalog.Work**.
*   **WorkCopy** belongs to a **Unit.Unit**.
*   **WorkCopy** has many **Maintenance** records.

## 📏 Business Rules
*   **State Management**: The `status` field is the source of truth for availability.
    *   AVAILABLE: On shelf.
    *   BORROWED: With a user (managed by Circulation).
    *   MAINTENANCE: Being repaired.
