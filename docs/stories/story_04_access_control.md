# User Story (STORY_04)

## Title
Access Control & Permissions (RBAC)

## Persona
Security Administrator

## Story
As a **Security Administrator**,
I want **to manage Logins, Roles, and Permissions**,
So that **authentication is secure and users can only perform authorized actions.**

## Business Value
- Protects sensitive data (GDPR/LGPD).
- Enforces operational hierarchy (Student vs Librarian vs Admin).
- Secures system entry points.

## Acceptance Criteria
- [ ] **Encryption**: Passwords must be hashed (never plain text).
- [ ] **RBAC Model**: Access is granted via Roles which aggregate Permissions.
    - **Admin** (System Management)
    - **Librarian** (Library Management)
    - **Professor** (Student Management)
    - **Student** (Reader)
- [ ] **Separation**: Login entity is separate from User entity.
- [ ] **Linking**: A Login must be linked to a valid User.
- [ ] **Lifecycle**: Logins support **Soft Delete** and **Explicit Status** for auditability and quick revocation.

## Out of Scope
- SSO / OAuth (Google/Facebook login).
- 2FA (Two-Factor Authentication).

## Assumptions
- Standard JWT or Session based auth mechanism.

## Open Questions
- Default roles? **Answered: Admin, Librarian, Professor, Student.**
