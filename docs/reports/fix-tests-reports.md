# Test Correction Report - Reports Module & Global Fixes

**Date:** 2026-01-20
**Status:** Analysis Concluded

## 1. Overview
The global test execution (`npm run test:all`) in `app/frontend` revealed significant failures, primarily in the presentation layer:

- **Total Test Files**: 68
- **Failing Files**: 28
- **Passing Files**: 38
- **Skipped Files**: 2

## 2. Test Details

### 2.1. Failing Tests (Critical)
The majority of failures (28 files) occur in the `presentation` layer due to recurring module resolution errors (Import Alias).

**Typical Error:**
`Error: Failed to resolve import "@/presentation/..."`

**Affected Files (Sample):**
- `tests/presentation/react/hooks/use-user-management.spec.ts`
- `tests/presentation/react/helpers/user-serializers.spec.tsx`
- `tests/presentation/react/components/credential-modal/credential-modal.spec.tsx`
- `tests/presentation/react/pages/user-list/user-list-controller.spec.tsx`
- `tests/presentation/react/pages/user-list/user-list-view.spec.tsx`
- ... and 23 others.

**Root Cause:**
Tests are importing from `@/presentation/...` (mapped to `src/presentation`), but the source code has been moved to `src/shared/presentation`. The `src/presentation` directory no longer exists.

### 2.2. Passing Tests
38 files are passing, involving most Domain and Infrastructure tests that do not depend on the broken presentation aliases.

### 2.3. Skipped/Pending Tests
- `tests/modules/reports/reports-structure.spec.ts`: Marked as `todo`. Placeholder for structure verification.

## 3. Discrepancies with Specification
The specification `task_testing_fix_06_reports.md` requires the following, which are **missing** from the codebase:
- **UseCase**: `GenerateReport`
- **Validation**: Date range validation logic associated with report generation.

## 4. Implementation Plan

To achieve a 100% pass rate and fulfill the specification, the following actions will be taken:

### 4.1. Fix Legacy Presentation Tests (Global Fix)
**Objective**: Fix the 28 failing tests by correcting their location and import paths.

1.  **Move Directories**:
    - Move `app/frontend/tests/presentation/` -> `app/frontend/tests/shared/presentation/`.
    - Delete the empty `app/frontend/tests/presentation/` directory.

2.  **Update Imports**:
    - Perform a bulk find-and-replace in the moved test files:
        - **Find**: `@/presentation/`
        - **Replace**: `@/shared/presentation/`

### 4.2. Complete Reports Module
**Objective**: Implement missing features and fix skipped tests.

1.  **Enable Structure Test**:
    - Update `reports-structure.spec.ts` to strictly verify the Public API exports.

2.  **Implement `GenerateReport` UseCase**:
    - **Create**: `src/modules/reports/application/use-cases/generate-report.use-case.ts`.
    - **Logic**: Validate that `startDate < endDate`.
    - **Repository**: Update `ReportsRepository` protocol and `HttpReportsRepository` to support `generateReport`.
    - **Test**: Create `tests/modules/reports/application/use-cases/generate-report.use-case.spec.ts` with unit tests covering success and validation failure scenarios.

## 5. Next Steps
Proceed immediately with **4.1** to resolve the bulk of the errors, then execute **4.2**.
