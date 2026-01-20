# Frontend Architect & Test Analysis Report

**Date:** 2026-01-20
**Scope:** `app/frontend/tests` vs `app/frontend/src`

## 1. Executive Summary

The current testing architecture is **structurally immature and demonstrably incomplete**. While the high-level directory structure attempts to mirror `src`, the internal implementation has massive gaps.

- **Total Test Files:** 32 (All `.spec.ts`)
- **Integration Tests:** 0 (No `.test.ts`)
- **E2E Tests:** 0 (Playwright installed but no tests found)
- **Missing Modules in Tests:** `geography`, `reports`, `dashboard`
- **Coverage Strategy:** The current "100%" threshold in Vitest is likely masking massive gaps via exclusions or simply testing a small subset of the codebase.

---

## 2. Structural Analysis (Src vs Tests)

The goal is a 1:1 mirror. We are currently far from this.

### 2.1 Top-Level Directory
| Directory      | Src Status | Tests Status | Discrepancy |
| :---           | :---       | :---         | :---        |
| `application`  | ✅ Exists   | ✅ Exists     | - |
| `domain`       | ✅ Exists   | ✅ Exists     | - |
| `infra`        | ✅ Exists   | ✅ Exists     | - |
| `main`         | ✅ Exists   | ✅ Exists     | - |
| `modules`      | ✅ Exists   | ⚠️ **Partial**| Missing 3/5 modules |
| `presentation` | ✅ Exists   | ✅ Exists     | - |
| `shared`       | ✅ Exists   | ⚠️ **Partial**| Invalid structure (`store` folder exists in tests but not src) |

### 2.2 Deep Dive: Modules
The `modules` directory is the most critical area of concern.

| Module | Src | Tests | Status |
| :--- | :--- | :--- | :--- |
| `identity` | ✅ | ✅ | **Partial Coverage** (Only contains `application` tests) |
| `library` | ✅ | ✅ | **Partial Coverage** |
| `geography` | ✅ | ❌ | **MISSING** (0 tests) |
| `reports` | ✅ | ❌ | **MISSING** (0 tests) |
| `dashboard` | ✅ | ❌ | **MISSING** (0 tests) |

### 2.3 Deep Dive: Shared
- **Src:** `application`, `domain`, `infra`, `presentation`
- **Tests:** `infra`, `store`
- **Issue:** `store` in `tests/shared` does not exist in `src/shared`. It likely tests `hooks` or `global state` that was refactored or moved. `domain` and `presentation` logic in shared is **untested**.

---

## 3. Test Type Analysis

The requirement is to separate tests by type. Currently, everything is mixed or mislabeled.

- **Unit Tests (`.spec.ts`)**:
    - **Current:** 32 files.
    - **Status:** These seem to cover strict unit logic.
- **Integration Tests (`.test.ts`)**:
    - **Current:** 0 files.
    - **Requirement:** Need to create these for testing interactions between layers (e.g., Application interactor calling a real (mocked-adapter) Repo).
- **E2E Tests**:
    - **Current:** 0 files.
    - **Requirement:** Setup Playwright structure in `tests/e2e`.

---

## 4. Configuration Review

### `vitest.config.ts`
- **Includes:** `**/*.spec.{ts,tsx}`
- **Excludes:** `tests/**`, `src/**/index.ts`, and **Entire Page Directories** (`src/presentation/react/pages/**`).
- **Risk:** By excluding pages/factories from coverage, you are blinded to the lack of tests in the Presentation Layer. While UI tests are hard, excluding them entirely from coverage reports can be misleading.

---

## 5. Action Plan & Recommendations

To achieve the goal of **100% Coverage** and **Mirrored Architecture**, the following steps are mandatory:

### Step 1: Structural Refactor (The "Skeleton")
1.  **Create missing directories** in `tests/modules` (`geography`, `reports`, `dashboard`).
2.  **Fix `tests/shared`**: Remove/Move `store` to match `src` (likely `infra` or `application`).
3.  **Strict Mirroring**: Ensure every file in `src/path/to/file.ts` has a corresponding `tests/path/to/file.spec.ts` (unit) or `.test.ts` (integration).

### Step 2: Test Type Separation
1.  **Rename/move** any existing tests that involve multiple real layers to `.test.ts`.
2.  **Configure Vitest** to distinguish these runs if necessary (or keep running them together but with clear naming).
3.  **Initialize Playwright** in `tests/e2e` for critical user flows (Login, Dashboard Load, Book Loan).

### Step 3: Coverage Filling (The "Meat")
1.  **Presentation Layer**: Add component tests (using `@on-testing-library/react`) for `presentation` components.
2.  **Infrastructure Layer**: unit test all adapters using spy/mocks.
3.  **Modules**: Systematically add tests for the missing modules (`geography` first as it is simple).

### Step 4: Strict Enforcement
1.  **Update `vitest.config.ts`** to remove broad exclusions of pages once component tests are added.
2.  **CI Gate**: Ensure CI fails if coverage drops or if `tests` folder structure deviates from `src` (this can be enforced via a custom script or lint rule).
