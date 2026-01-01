# User Story (STORY_06)

## Title
Physical Inventory Management

## Persona
Librarian

## Story
As a **Librarian**,
I want **to manage Physical Copies (WorkCopies)**,
So that **we can track the location and status of every tangible asset.**

## Business Value
- Tracks the actual assets (Value $$).
- Enables circulation (you loan a Copy, not a Work).
- Manages asset lifecycle (Acquisition -> Maintenance -> Disposal).

## Acceptance Criteria
- [ ] **Linkage**: Every Copy must be linked to a Catalog Work and a Physical Unit (Location).
- [ ] **Status Lifecycle**: Support statuses like AVAILABLE, BORROWED, MAINTENANCE, LOST.
- [ ] **Maintenance Tracking**: Ability to log repairs/maintenance events for a copy.
- [ ] **Acquisition Date**: Track when the item entered the collection.

## Out of Scope
- RFID integration.
- Barcode generation/printing (Phase 2).

## Assumptions
- A physical copy resides in exactly one Unit at a time (unless in transit/loan).

## Open Questions
- Do we need "In Transit" status for inter-library loans? (Decision: Not for MVP).
