# ADR 004: Validation Strategy

## Status
Accepted

## Context
Validation logic often leaks into Controllers, causing code duplication and Single Responsibility Principle violations.
We must distinguish between **Structural Validation** (HTTP Layer) and **Semantic Validation** (Domain Layer).

## Decision
We enforce a strict **Two-Tier Validation Strategy**.

### 1. Presentation Layer: Structural Validation
**Pattern**: Validation Composite.
*   **Responsibility**: Ensure the input *shape* is correct (Required fields, types, basic format).
*   **Location**: `src/modules/<module>/presentation/validation/`
*   **Mandatory Class**: `ValidationComposite`.
    *   Iterates over a list of `Validation` implementations.
    *   Returns the first error found or null.
*   **Forbidden**: Business logic checks (e.g., "User exists") are forbidden here.

### 2. Domain Layer: Semantic Validation
**Pattern**: Value Objects & Entities.
*   **Responsibility**: Ensure the data *integrity* and business rules.
*   **Location**: `src/modules/<module>/domain/value-objects/`
*   **Mechanism**: Instantiation Logic.
    *   `Email.create('invalid')` -> throws `InvalidEmailError` or returns `Left(InvalidEmailError)`.
    *   Entities validate their state invariants.

### 3. Interaction
Controllers **MUST** inject a `Validation` instance.
1.  Controller calls `this.validation.validate(httpRequest.body)`.
2.  If error -> Return `400 Bad Request`.
3.  If success -> Call `UseCase`.
4.  `UseCase` instantiates Domain Objects.
5.  If Domain Object creation fails -> Return `400 Bad Request` (mapped).

## Consequences

### Positive
*   **SRP**: Controllers are clean.
*   **Safety**: Impossible to instantiate a Domain Object with invalid state.

### Negative
*   **Boilerplate**: Requires defining validation classes.

## Compliance
New endpoints **MUST** implement `ValidationComposite`.
Direct `if (!body.email)` checks in Controllers are **FORBIDDEN**.
