# ✉️ Communication Context (Contact / Support)

## 📝 Description
Manages messaging and contact requests from the public or users to the library administration.

## 🏛️ Entities

### `ContactMessage`
Represents a message sent to the system.
*   **sender_name**: string(60).
*   **sender_email**: string(60).
*   **message**: string(255).
*   **received_at**: timestamp.
*   **replied**: boolean.
*   **reply_date**: timestamp.
*   **reply**: text.

## 🔗 Relationships
*   Isolated context. Does not strictly require a `User` entity (public form).

## 📏 Business Rules
*   **Audit**: Must match replies to original messages.
*   **Timeliness**: Track received_at and reply_date.
