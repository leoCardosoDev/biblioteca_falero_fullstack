# ADR 012: Hierarchical Access Control

## Status
Accepted

## Context
Standard RBAC (Can Read, Can Write) is insufficient for ensuring operational hierarchy.
A **Librarian** needs to block a **Member** (operational action) but must NOT be able to block an **Admin** (security risk).

## Decision
We will implement **Hierarchical Scope Validation** (Power Levels) on top of RBAC.

### The Hierarchy
1.  **ADMIN** (Level 100): Full System Access.
2.  **LIBRARIAN** (Level 50): Operational Management (Book + Member).
3.  **MEMBER** (Level 10): Consumer (Self Only).

### The Rules
1.  **Downward Management**: An actor can only modify subjects with a *lower* Power Level.
    - `Actor(Admin)` modifies `Target(Librarian)` -> ✅
    - `Actor(Librarian)` modifies `Target(Member)` -> ✅
    - `Actor(Librarian)` modifies `Target(Admin)` -> ❌ (Forbidden)
    - `Actor(Librarian)` modifies `Target(Librarian)` -> ❌ (Forbidden - Peer protection)

2.  **Scope Segregation**:
    - **Librarians** specifically manage the "Circulation" and "Member Discipline" domains.

## Consequences
- Requires an explicit check of `Target.Role` before executing actions.
- Security becomes robust against internal privilege escalation.
