# 👤 User Context (Person / Identity)

## 📝 Description
This context represents the **Identity** of a person within the system. It is distinct from authentication (Access Control). It acts as an **Aggregate Root**.

## 🏛️ Entities

### `User` (Aggregate Root)
Represents a person registered in the library system.
*   **full_name**: string(80) - Complete name of the user.
*   **rg**: string(10) - General Registration number.
*   **cpf**: char(11) - Natural Persons Register (Unique).
*   **gender**: enum('M', 'F') - Gender.
*   **email**: string(80) - Contact email (Unique).
*   **phone**: string(20) - Contact phone number.

### `Address` (Value Object)
Embedded within the `User` table.
*   **address_street**: string(100)
*   **address_number**: string(10)
*   **address_complement**: string(50)
*   **address_zip_code**: char(8)
*   **neighborhood_id**: Reference to `Geography.Neighborhood`.
*   **city_id**: Reference to `Geography.City`.

## 🔗 Relationships
*   Uses **Geography** (Neighborhood, City) for address validation.
*   Referenced by **Access Control.Login** (1:1 or 1:N depending on design, typically 1 Login -> 1 User).
*   Referenced by **Circulation.Loan** and **Reservation**.

## 📏 Business Rules
*   **Identity**: `cpf` must be unique.
*   **Contact**: `email` must be unique.
*   **Completeness**: Address fields are optional but recommended for active loans.
*   **Separation of Concerns**: This entity does NOT store passwords or roles; that belongs to Access Control.
