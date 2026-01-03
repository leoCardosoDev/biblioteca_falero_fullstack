# User Story (STORY_025)

## Title
Refactor Frontend Architecture for Scalability and Standard Compliance

## Persona
System Administrator / Librarian / Developer

## Story
As a Developer,
I want the frontend to strictly follow Clean Architecture and IDS Standards,
So that I can maintain, test, and scale the application without technical debt or logic leakage.

## Business Value
- **Maintainability**: Faster bug fixes and feature additions.
- **Reliability**: Decoupling business logic from UI reduces the risk of visual changes breaking core functions.
- **Onboarding**: New developers can understand the project structure instantly by following the standard.

## Acceptance Criteria
- [ ] UI components must NOT contain business rules or direct API/Mock calls.
- [ ] Folder structure must strictly mirror `STANDARD_FRONTEND.md` and include a `presentation/react` isolation for framework-specific code.
- [ ] Common logic (Auth, Notifications) must be moved to the `application` layer as use cases or hooks-controllers.
- [ ] Existing backend endpoints (Users, Login) must be consumed, while others keep Mocks with TODOs.

## Out of Scope
- Re-designing the UI (Visual overhaul).
- Backend refactoring (out of this specific story).

## Assumptions
- The current backend APIs (or mocks) will remain compatible after the internal structure change.

## Open Questions
- Should we implement i18n now or keep hardcoded Portuguese strings for the labels?
