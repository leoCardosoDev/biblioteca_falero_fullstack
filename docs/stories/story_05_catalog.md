# User Story (STORY_05)

## Title
Library Catalog Management (Bibliographic)

## Persona
Librarian

## Story
As a **Librarian**,
I want **to manage the Bibliographic Catalog (Works, Authors, Publishers)**,
So that **the library collection is organized, standardized, and searchable.**

## Business Value
- Defines the "Product" the library allows access to.
- Enables discovery of materials by users.
- Standardizes metadata (ISBN, Publishers) for reporting.

## Acceptance Criteria
- [ ] **Abstraction**: Managing a "Work" does NOT imply managing physical copies (see Inventory).
- [ ] **Metadata**: Supports Title, ISBN, Year, Edition, Pages, etc.
- [ ] **Relationships**: Works must link to Authors and Publishers.
- [ ] **Uniqueness**: ISBN should be unique in the catalog.
- [ ] **Taxonomy**: Support for Genres and Work Types (Book, DVD, etc).

## Out of Scope
- Integration with Google Books API for auto-fill (Phase 2).
- stock management (handled in Inventory).

## Assumptions
- A Work can exist without any physical copies (e.g., on order).

## Open Questions
- None.
