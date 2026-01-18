# ADR 015: Frontend Modernization Stack

## Status
Accepted

## Context
The legacy frontend stack utilizes React Router DOM (v6), Context API for global state, and useEffect for data fetching. This has led to:
1.  **Runtime Errors**: Broken links and missing params due to string-based routing.
2.  **Boilerplate**: Excessive manual loading/error states in components.
3.  **Performance Issues**: Unnecessary re-renders caused by Context API usage for high-frequency updates.
4.  **Race Conditions**: Manual `useEffect` data fetching is prone to subtle bugs.

## Decision
We will modernize the frontend stack with the following technologies, aligning with the Modular Monolith architecture:

### 1. Routing: TanStack Router
*   **Why**: Provides 100% type-safe routing (links, params, search params).
*   **Usage**: Each Module defines its own route subtree. `src/main` composes them.
*   **Migration**: Staged migration from React Router DOM.

### 2. Server State: TanStack Query (React Query)
*   **Why**: Eliminates manual `isLoading`/`isError` state. enhancing cache management, deduping, and optimistic updates.
*   **Usage**: All server-side data fetching MUST go through Query hooks. `useEffect` for data fetching is **FORBIDDEN**.

### 3. Client State: Zustand
*   **Why**: Simple, unopinionated, transient-update friendly (atomic, no re-render of whole tree).
*   **Usage**: Global UI state (Theme, User Session, Sidebar toggles).
*   **Rule**: Do NOT put server state in Zustand. Use TanStack Query.

### 4. UI Components: Tailwind CSS + Radix UI
*   **Why**: "Headless" components (Radix) ensure accessibility (a11y) while Tailwind provides best-in-class styling DX.
*   **Usage**: Build a design system in `src/shared/ui` wrapping these primitives.

## Consequences

### Positive
*   **Type Safety**: significantly reduced runtime crashes (404s, undefined params).
*   **Code Quality**: Declarative data fetching reduces "spaghetti code" in `useEffect`.
*   **Performance**: Better caching and atomic state updates.

### Negative
*   **Learning Curve**: Team must adapt to "Loader" patterns and Query concepts.
*   **Migration Cost**: Significant effort to rewrite existing Routes and Contexts.

## Compliance
*   **CI**: Type check MUST validate all routes.
*   **Lint**: Ban `useEffect` for data fetching (via ESLint).
