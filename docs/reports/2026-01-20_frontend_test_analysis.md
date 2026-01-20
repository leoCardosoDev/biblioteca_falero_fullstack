# Frontend Test Coverage & Gap Analysis Report
**Date:** 2026-01-20
**Status:** CRITICAL

## 1. Executive Summary
The frontend testing suite is currently in a **broken state** with significant coverage gaps. 
- **Execution Status**: `npm run test:unit` fails with exit code 1.
- **Failure Count**: 33 failed tests, 4 passed, 3 skipped (placeholders).
- **Primary Blockers**: 
  1.  **Environment Misconfiguration**: Unit tests running in `node` environment are attempting to render React components (requiring `jsdom`).
  2.  **Implementation Divergence**: Tests expect methods/properties that do not match the current source code (e.g., `isAvailable` property vs function, missing repository methods).
  3.  **Missing Coverage**: Major modules (`dashboard`, `geography`, `reports`, `identity`) have near-zero coverage.

## 2. Test Failure Analysis

### 2.1 Environment Configuration Error
**Error**: `ReferenceError: document is not defined`
**Affected Tests**: 
- `tests/main/router/root-route.spec.tsx`
- `tests/main/router/router.spec.ts`
**Root Cause**: 
`vitest.unit.config.ts` is configured with `environment: 'node'`, but these tests use `@testing-library/react` (`render`).
**Recommendation**: 
- Move component tests to `test:integration` OR
- Update unit config to use `jsdom` for specific files OR
- Mock the DOM interactions if these are strictly unit logic tests.

### 2.2 Broken Logic / API Mismatch (Library Module)
**Error**: `AssertionError: expected [Function isAvailable] to be true`
**Affected Tests**: `tests/modules/library/domain/entities/book.entity.spec.ts`, `loan.entity.spec.ts`
**Root Cause**: 
Tests access `entity.isAvailable` as a property, but in the implementation it is likely a method (or vice versa, or the property is a function reference).
**Recommendation**: Update tests to call the function `entity.isAvailable()` or fix the entity to expose a getter.

**Error**: `TypeError: this.repository.getBooks is not a function`
**Affected Tests**: `tests/modules/library/application/usecases/load-books.usecase.spec.ts`
**Root Cause**: 
The usage of the repository in the usecase (`this.repository.getBooks()`) does not match the mock or the interface provided in the test setup.
**Recommendation**: Align the repository mock with the actual `ILibraryRepository` interface.

## 3. Coverage Gap Map (Src vs Tests)

We observed a major stricture parity issue. The `tests/` folder attempts to mirror `src/`, but falls short in key areas.

| Module | Src Layer Status | Test Layer Status | Gap Severity |
| :--- | :--- | :--- | :--- |
| **Dashboard** | Full (`app`, `domain`, `infra`, `ui`) | **EMPTY** (Shell only) | 🔴 CRITICAL |
| **Geography** | Full (`app`, `domain`, `infra`, `ui`) | **EMPTY** (Shell only) | 🔴 CRITICAL |
| **Reports** | Full (`app`, `domain`, `infra`, `ui`) | **EMPTY** (Shell only) | 🔴 CRITICAL |
| **Identity** | Huge (~40 files) | **Minimal** (1 usecase) | 🔴 CRITICAL |
| **Library** | Full | **Partial & Broken** | 🟠 HIGH |
| **Shared** | `infra/http`, `store`, `ui` | **Partial** (`http`, `store`) | 🟡 MEDIUM |
| **Main** | `factories`, `router` | `factories`: **MISSING**<br>`router`: **Found** (Failing) | 🟡 MEDIUM |

### Key Missing Areas
1.  **Presentation Logic**: Almost no tests for `presentation/hooks`, `view-models`, or complicated components in `modules/*/presentation`.
2.  **Infrastructure**: `src/modules/*/infra` repositories have little to no coverage.
3.  **Factories**: `src/main/factories` contain critical wiring logic but have zero tests.

## 4. Roadmap to 100% Coverage

To achieve stability and 100% coverage, we must execute the following phases:

### Phase 1: Fix the Foundation (Immediate)
1.  **Fix Environment**: Update `vitest.unit.config.ts` to support DOM for component tests OR strictly separate logic tests (Node) from Component tests (JSDOM).
2.  **Repair Library Tests**: Fix the assertion errors in `Book` and `Loan` entities.
3.  **Repair Usecase Mocks**: Fix the repository mocking in Library usecases.
**Goal**: Green build on existing tests.

### Phase 2: Backfill Core Modules (Short Term)
1.  **Identity Module**: This is a security-critical module. Must implement unit tests for:
    - `domain/entities`
    - `application/usecases` (Login, Register, etc.)
2.  **Shared Kernel**: Ensure `shared/infra/http` and `shared/domain` (base classes) are rock solid.

### Phase 3: Module Parity (Medium Term)
Implement tests for the shells created in Task 03:
1.  **Geography**: Test `GetCity`, `GetState` usecases.
2.  **Dashboard**: Test dashboard data aggregation logic.
3.  **Reports**: Test report generation constraints.

### Phase 4: Integration & E2E (Long Term)
1.  **Flow Testing**: Connect multiple modules (e.g., Borrow a Book flow).
2.  **E2E**: Critical user journeys via Playwright.

## 5. Conclusion
The current state is fragile. We have "test shells" but no substance for 3 modules, and the 1 module that has tests (Library) is failing. **Immediate priority is Phase 1**: getting the current suite green by fixing configuration and assertion errors.
