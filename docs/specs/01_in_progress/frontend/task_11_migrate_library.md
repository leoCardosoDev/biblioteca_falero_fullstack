# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<role>
You are a Senior Frontend Engineer responsible for migrating the Library/Catalog features.
</role>

<dependent_tasks>
- `app/docs/specs/02_done/task_08_main_entry_migration.md`
</dependent_tasks>

<context>
Legacy code for managing Books, Authors, Loans, and Reservations is scattered in `src/domain`, `src/application`, etc.
This represents the core domain of the "Software House" (Library System) which needs to be consolidated.
</context>

<scope>
Create a new `Library` module (`src/modules/library`) and migrate all related logic.

1.  **Scaffold**: Create directory structure for the `library` module (`domain`, `infra`, `application`, `presentation`, `public`).
2.  **Domain Layer** (`src/modules/library/domain`):
    - Move `Book`, `Author`, `Loan`, `Reservation` entities.
    - Define clear Aggregates and Value Objects.

3.  **Infra Layer** (`src/modules/library/infra`):
    - Create `HttpLibraryRepository` (or split into `BookRepository`, `LoanRepository` if complex).
    - **Mocking**: Maintain existing mocks or implement temporary mocks in the Repository if the backend endpoint is not ready, to ensure the UI remains testable and viewable.
    - Implement methods for fetching books, loans, etc., using the `AxiosAdapter`.

4.  **Application Layer** (`src/modules/library/application`):
    - Create Hooks: `useBooks`, `useBookDetails`, `useLoans`, `useCreateLoan`.
    - Use TanStack Query for all data operations.

5.  **Presentation Layer** (`src/modules/library/presentation`):
    - Move `BookListPage`, `BookDetailsPage`, `LoanHistoryPage`.
    - Update Routing (create `libraryRoute.tsx`) to expose these pages.

6.  **Tests**:
    - Move and refactor tests to `tests/frontend/library/`.
</scope>

<requirements>
- **Stack**: React, TypeScript, TanStack Query.
- **Complexity**: This is a large module. Ensure proper separation of concerns.
- **Negative Constraints**:
    - NO usage of legacy Context API for data.
</requirements>

<architectural_guidance>
> **Refactoring Engine**: Apply detailed patterns from `app/docs/prompts/refactor.md` and `.agent/standards/STANDARD_REFACTORING.md`.

### 1. Complex Domain Logic
- **State Pattern**: If `Loan` has complex state transitions (Active -> Overdue -> Returned -> Lost), do not use large `switch` statements. Consider implementing the **State Pattern** or distinct checks within the Domain Entity.
- **Domain Services**: For operations involving multiple aggregates (e.g., `CheckoutService` checking `User` limits and `Book` availability), **EXTRACT CLASS** into a Domain Service, do not overload the Controller/Hook.

### 2. Handling Collections
- **Iterator/Mapper**: When processing lists of books for display, ensure transformation logic resides in `BookMapper`, not in the React Component.
- Avoid passing raw JSON to components. Components should receive specialized Read Models or Domain Entities.
</architectural_guidance>

<standards_compliance>
- `app/docs/adr/014_frontend_modular_monolith.md`
- `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Codebase: `src/modules/library` created and populated.
- [ ] Codebase: Legacy book/loan files deleted.
- [ ] Feature: Can browse books and see details.
- [ ] Feature: Can view loans.
- [ ] Test: All Library tests pass.
</acceptance_criteria>
