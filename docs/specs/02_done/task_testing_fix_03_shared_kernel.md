# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md` (COMPLETED)
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_02_identity.md` (COMPLETED)
</dependent_tasks>

<completed>
- **Task 01 (Foundation)**:
    - Fixed Vitest unit configuration (`restoreMocks`, `setupFiles`).
    - Standardized `jsdom` environment for `.tsx` files.
    - Repaired `Library` module unit tests (Entities, Use Cases) ensuring architectural alignment.
- **Task 02 (Identity)**:
    - Implemented comprehensive unit tests for `Identity` module.
    - **Domain**: `User` entity (state, transitions, immutability) and 6 Value Objects (`Email`, `Cpf`, `Name`, `UserRole`, `UserStatus`, `Address`).
    - **Application**: Unit tests for `Login`, `LoadUsers`, `LoadUserById`, and `Logout` use cases.
    - **Verification**: 90 unit tests added and passing in `tests/modules/identity`.
- **Task 03 (Shared Kernel)** ✅:
    - Created `tests/shared/application/common/either.spec.ts` (12 tests for Either pattern).
    - Created `tests/shared/infra/http/axios-http-client.spec.ts` (7 tests for HTTP adapter).
    - Created `tests/shared/infra/cache/local-storage-adapter.spec.ts` (6 tests for cache adapter).
    - **Verification**: 32 unit tests passing in `tests/shared`.
</completed>

<context>
The `Shared` kernel provides base classes and critical infrastructure (HTTP, Stores).
Failures here cascade everywhere. We need to verify the reusable building blocks.
</context>

<scope>
1. **Infra Tests**:
   - `HttpClient`: Test headers, error handling, interceptors.
   - `LocalStorageAdapter`: Test set/get/remove.

2. **Domain Tests**:
   - `Entity` (Base Class): If it has logic (e.g., ID generation).
   - `ValueObject` (Base Class): Equality checks.
   - `Result` / `Either` pattern: Test success/failure wrapping.

3. **Presentation**:
   - `useToast` or similar global hooks: Test logic hooks via `renderHook`.
</scope>

<requirements>
- **Stack**: Vitest.
- **Negative Constraints**:
    - Do NOT test implementation details of third-party libraries (e.g., don't test that Axios works, test that YOUR adapter calls Axios correctly).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] `tests/shared/infra/http` passed.
- [x] `tests/shared/application/common` (Either pattern) passed.
- [x] `tests/shared/infra/cache` passed.
</acceptance_criteria>

<output>
1. **Summary**: Hardened Shared Kernel with tests.
2. **Decisions**: Tested only custom logic wrappers, not libraries.
3. **Manual Test Guide**: Run `npm run test:unit`.
</output>

<technical_constraints>
- **Infrastructure Testing**:
    - `HttpClient` tests must use **MSW** (Mock Service Worker) or a low-level network mock to verify header injection and error transformations.
    - **Do NOT** verify that Axios works (it does). Verify that *your adapter* handles 401/403/500 responses correctly by mapping them to Domain Errors.
- **Domain Primitives**:
    - `Result` class tests must be exhaustive:
        - `isSuccess()` vs `isFailure()` exclusivity.
        - Unwrapping values (ensure `getValue()` throws on failure).
- **Presentation Hooks**:
    - Must use `renderHook` from `@testing-library/react`.
    - Ensure `act()` is used for state updates within hooks.
</technical_constraints>
