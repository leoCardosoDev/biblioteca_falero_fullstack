# 📚 Catalog Context (Bibliographic Domain)

## 📝 Description
Manages the bibliographic metadata of the library's collection. This creates the "Abstract" definition of the books/works, separate from the physical copies (Inventory).

## 🏛️ Entities

### `Work` (Aggregate Root)
Represents a title/work (e.g., "Harry Potter and the Sorcerer's Stone").
*   **title**: string(150) - Title of the work.
*   **isbn**: string(17) - Unique identifier (International Standard Book Number).
*   **publication_year**: year.
*   **edition**: int.
*   **pages**: int.
*   **collection**: string(60).
*   **description**: text.
*   **genre_id**: Reference to `Genre`.
*   **language_id**: Reference to `Language`.
*   **work_type_id**: Reference to `WorkType`.
*   **publisher_id**: Reference to `Publisher`.
*   **location_id**: Reference to `Location`.

### `Author`
*   **name**: string(80).

### `Genre`
*   **description**: string(50) (e.g., 'Fantasy', 'Sci-Fi').

### `Language`
*   **description**: string(50) (e.g., 'Portuguese', 'English').

### `WorkType`
*   **description**: string(30) (e.g., 'Book', 'Magazine', 'DVD').

### `Publisher`
*   **name**: string(150).
*   **address**: string(100).
*   **phone**: string(20).
*   **website**: string(150).
*   **email**: string(100).

### `Location`
*   **shelf**: string(10) - Shelf identifier.

### `WorkAuthor`
Many-to-Many association between Work and Author.

## 🔗 Relationships
*   **Work** has many **Authors**.
*   **Work** belongs to **Genre**, **Language**, **WorkType**, **Publisher**, **Location**.

## 📏 Business Rules
*   **Uniqueness**: `isbn` should be unique.
*   **Abstraction**: This context does NOT track if a book is "available" or "borrowed". That is the job of **Inventory**. This determines *what* the book is.
