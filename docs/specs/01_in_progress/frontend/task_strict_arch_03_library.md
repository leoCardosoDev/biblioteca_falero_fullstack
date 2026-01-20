# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_01_shared.md`
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_02_identity.md`
</dependent_tasks>

<context>
The `Library` module needs to adhere to strict architecture. Currently likely mixing Query logic with Application business logic.

**Summary of Previous Work:**
1. **Task 1 (Shared)**: Strictly layered foundation; `react-router-dom` removed (replaced by `TanStack Router`); `shared/application` is pure.
2. **Task 2 (Identity)**: Strictly decoupled module; Application layer is now pure (no `zustand` or `react-query`); state and hooks moved to `infra` adapters and stores.
</context>

<scope>
1.  **Application Layer Refactoring** (`src/modules/library/application`):
    *   **Define Protocols**: `LibraryRepository` (getBooks, getLoans, createLoan).
    *   **Pure UseCases**: `GetBooksUseCase`, `CreateLoanUseCase`, etc.
    *   **Remove Libs**: Strip `react-query` and `axios`.

2.  **Infra Layer Implementations** (`src/modules/library/infra`):
    *   **Repository Impl**: `HttpLibraryRepository`.
    *   **Query Adapters**: `useGetBooksQuery` (wraps `useQuery` + `GetBooksUseCase`), `useCreateLoanMutation`.
    *   **Mappers**: Ensure DTO <-> Entity mappers are pure.

3.  **Presentation Layer Updates**:
    *   `BookListPage`, `BookDetailsPage` use the Infra Adapters (e.g., `useGetBooksQuery`) instead of calling `useQuery` directly or importing `api`.

4.  **Routing**:
    *   `TanStack Router` ONLY.
</scope>

<requirements>
- **Stack**: TypeScript, React.
- **Negative Constraints**:
    *   Application layer: NO `react-query`, `axios`, `react-router-dom`.

<technical_constraints>
1.  **Interface Naming**: Interfaces in `application/protocols` MUST NOT use the `I` prefix (e.g., `LibraryRepository`).
2.  **Domain Integrity**: Entities must enforce business rules (e.g., Book availability) within the Domain Model, not in the UI.
3.  **Strict Serialization**: Ensure API responses are mapped to Domain Entities in the Infra layer before reaching Application.
</technical_constraints>
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] Architecture: `library/application` contains NO infrastructure imports.
- [x] Implementation: `useGetBooks` is composed of `GetBooksUseCase` (App) and `QueryAdapter` (Infra).
- [x] Tests: `GetBooksUseCase` unit tested in isolation.
</acceptance_criteria>

<output>
1. **Summary**: Library module strict architecture enforcement completed.
2. **Decisions**: Query logic moved to Infra Adapters via factory pattern; Wired hooks provided in Presentation.
3. **Manual Test Guide**: View Book List, Book Details, Create Loan.
</output>
