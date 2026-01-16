# User Story (STORY_02)

## Title
User Identity Management

## Persona
Librarian / Administrator

## Story
As a **Librarian**,
I want **to register and manage User identities**,
So that **we can track who is interacting with the library services.**

## Business Value
- Essential for assigning loans and managing library patrons.
- Provides a single source of truth for person data (Contact, ID).
- Separates "Identity" from "Access" (Login), allowing flexible data retention.

## Acceptance Criteria
- [ ] **Unique Identity**: Users must have unique CPF.
- [ ] **Unique Contact**: Users must have unique Email.
- [ ] **Mandatory Data**: Full Name, RG, CPF, Gender.
- [ ] **Address Linking**: User address must be linked to valid Geography entities.
- [ ] **Explicit Status**: User must have a status (`ACTIVE`, `INACTIVE`, `BLOCKED`).
- [ ] **Data Persistence**: Use **Soft Delete** (`deleted_at`) for auditing; natural person data is preserved even if access is revoked.
- [ ] **Concurrency Control**: Updates use **Optimistic Locking** (`version`) to prevent data loss.
- [ ] **No Login Data**: This story does NOT cover password creation (see Access Control).

## Out of Scope
- Profile picture upload (Phase 2).
- Biometric authentication.

## Assumptions
- Users are human beings (Natural Persons).
- A User might exist without a Login (e.g., pre-registered student).

## Open Questions
- Do we need to store parents' names for minors? (Decision: Not for MVP).
