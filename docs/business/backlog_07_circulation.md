# 🔄 Circulation Context (Loans & Reservations)

## 📝 Description
Manages the flow of materials to users (Borrowing, Returning, Reserving). This is the operational heart of the library.

## 🏛️ Entities

### `Loan`
Represents a checkout event.
*   **user_id**: Reference to `User.User`.
*   **unit_id**: Reference to `Unit.Unit` (Where the loan occurred).
*   **loan_date**: datetime.

### `LoanItem`
Represents a specific book included in a loan.
*   **loan_id**: Reference to `Loan`.
*   **work_copy_id**: Reference to `Inventory.WorkCopy`.
*   **return_date**: datetime (Null if not returned).

### `Reservation`
Represents a hold placed on a book.
*   **user_id**: Reference to `User.User`.
*   **work_copy_id**: Reference to `Inventory.WorkCopy`.
*   **reservation_date**: datetime.
*   **status**: enum('ACTIVE', 'CANCELLED', 'FULFILLED').

## 🔗 Relationships
*   **Loan** involves a **User** and a **Unit**.
*   **LoanItem** links a **Loan** to a specific **WorkCopy**.
*   **Reservation** links a **User** to a **WorkCopy**.

## 📏 Business Rules
*   **Consistency**: A `WorkCopy` cannot be loaned if its status is not 'AVAILABLE' or reserved by another user.
*   **Status Update**: Creating a LoanItem should trigger a status change in `WorkCopy` to 'BORROWED'. Returning it updates it to 'AVAILABLE'.
*   **Deadlines**: Loans presumably have due dates (though not explicitly in this SQL, typically a business rule derived from policy).
