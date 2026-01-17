# ADR 010: Rate Limit Strategy

## Status
Accepted

## Context
Protection against Brute Force attacks is a non-functional requirement. It must not pollute Domain or Application layers.

## Decision
We enforce **Rate Limiting** as an Infrastructure Concern.

### 1. Location
*   **Layer**: `src/main/adapters/` or `src/main/middlewares/`.
*   **Mechanism**: Fastify/Express Middleware.

### 2. Strategy
*   **Driver**: In-Memory (Phase 1) -> Redis (Phase 2).
*   **Scope**:
    *   **Strict**: `/login`, `/signup` (5 req / min).
    *   **Loose**: Public API (100 req / min).

### 3. Dependency Rule
*   Controllers **MUST NOT** contain rate limit logic.
*   Use Cases **MUST NOT** contain rate limit logic.
*   The `Main` layer composition root applies the middleware to the routes.

## Consequences
*   **Cleanliness**: Business logic remains pure.
*   **Switchability**: Switching to Redis is a config change in `src/main`.

## Compliance
Any reference to "Rate Limit" inside `src/modules` is **FORBIDDEN**.
