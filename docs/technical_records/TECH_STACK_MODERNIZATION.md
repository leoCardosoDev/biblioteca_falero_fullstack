# Technical Record: Frontend Modernization Stack Analysis

> **Date:** 2026-01-17
> **Status:** Draft / Proposal
> **Context:** Frontend Refactor to Modular Monolith

## 1. Context & Motivation
The current frontend uses a standard React SPA stack (Vite, React Router DOM, React Hook Form). While functional, the move to a **Modular Monolith** architecture creates an opportunity to adopt tools that enforce stricter boundaries, better type safety, and improved developer experience, aligning with the backend's DDD approach.

## 2. Methodology
We analyzed the following technologies against our core principles:
1.  **Type Safety**: End-to-end type safety is non-negotiable.
2.  **Performance**: Tools must favor zero-runtime or efficient runtime costs.
3.  **DX**: Developer Experience must encourage best practices by default.
4.  **Ecosystem**: Tools must be mature and well-maintained.

## 3. Technology Analysis

### 3.1. Routing: React Router DOM vs TanStack Router

| Feature | React Router DOM (v6/v7) | TanStack Router |
| :--- | :--- | :--- |
| **Type Safety** | Partial (via generics) | **100% Generated Types** (Routes, Params, Search) |
| **Search Params** | String-based | **Schema Validation (Zod)** + Typed |
| **Data Loading** | Loaders (remix-style) | **Built-in SWR Caching** + Stale-while-revalidate |
| **DX** | Manual definitions | File-system based (optional) + Code-based |

**Recommendation:** **Migrate to TanStack Router.**
**Rationale:** The Modular Monolith benefits immensely from type-safe boundaries. TanStack Router allows defining routes per module with strict contract enforcement for navigation, preventing broken links and invalid params at compile time.

### 3.2. Server State: Custom Hooks vs TanStack Query

| Feature | Custom Hooks (useEffect) | TanStack Query |
| :--- | :--- | :--- |
| **Boilerplate** | High (loading, error, data states) | **Zero** |
| **Caching** | Manual implementation | **Automatic** & Configurable |
| **Deduping** | Manual | **Automatic** |
| **Suspense** | Hard to orchestrate | **First-class support** |

**Recommendation:** **Adopt TanStack Query.**
**Rationale:** Removing side-effects from components is a core rule of our architecture. TanStack Query handles the "Infra" concerns of data fetching, caching, and synchronization efficiently, allowing the "Application" layer to focus on orchestration.

### 3.3. Client State: Context API vs Zustand

| Feature | Context API | Zustand |
| :--- | :--- | :--- |
| **Performance** | Re-renders all consumers on any change | **Atomic Selectors** (Render only what changes) |
| **Boilerplate** | Provider Hell + Hooks | Minimal (Create store + usage) |
| **Scope** | Tree-based | Global (independent of tree) |

**Recommendation:** **Adopt Zustand.**
**Rationale:** For cross-module communication and global UI state (e.g., Theme, User Session, Notifications), Zustand provides a simpler, more performant model than Context without the overhead of Redux. Context should remain for dependency injection (DI).

### 3.4. UI Components: Tailwind vs Headless (Radix/Base UI)

**Recommendation:** **Hybrid Approach.**
- **Styling:** Continue with **Tailwind CSS** (v4 if stable, or v3.4).
- **Behavior:** Adopt **Radix UI** or **Base UI** for complex interactive primitives (Dialogs, Popovers, Tabs).
- **Rationale:** We should not reinvent generic UI accessible behaviors. Using "Headless" libraries ensures a11y compliance while allowing full styling control via Tailwind.

### 3.5. Testing: Vitest + Playwright

**Recommendation:** **Standardize.**
- **Unit/Integration:** **Vitest** (already in place). Fast, efficient.
- **E2E:** **Playwright**. Best-in-class for reliable browser automated testing.

### 3.6. Architecture: Local-First / Offline-First

**Status:** **Monitor / Future Phase.**
- While trends like ElectricSQL satisfy "Local First", they introduce significant architectural complexity (sync engines, conflict resolution).
- **Decision:** Postpone until the Modular Monolith structure is stable. Focus on **Optimistic Updates** via TanStack Query for immediate "offline-like" feedback first.

## 4. Proposed Stack

| Category | Technology |
| :--- | :--- |
| **Build** | Vite |
| **Language** | TypeScript |
| **Routing** | TanStack Router |
| **Async State** | TanStack Query |
| **Client State** | Zustand |
| **Styling** | Tailwind CSS + Radix/Headless |
| **Forms** | React Hook Form + Zod |
| **Testing** | Vitest + Playwright |
