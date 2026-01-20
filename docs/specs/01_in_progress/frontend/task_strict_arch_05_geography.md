# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_01_shared.md`
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_02_identity.md`
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_03_library.md`
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_04_reports.md`
</dependent_tasks>

<context>
`Geography` module (Cities, States) is a simple CRUD/Lookup module but must follow the same strict rules.

**Summary of Previous Work:**
1. **Task 1 (Shared)**: Strictly layered foundation; `react-router-dom` replaced by `TanStack Router`; `shared/application` purified.
2. **Task 2 (Identity)**: Strictly decoupled module; Application layer purified (no `zustand`/`react-query`); state and hooks moved to `infra`.
3. **Task 3 (Library)**: Strictly layered module; Application layer purified (pure UseCases); Query Adapters in Infra; Presentation wired.
4. **Task 4 (Reports)**: Decoupled module; Application layer purified (pure UseCases/Protocols); HttpReportsRepository and Query Adapters in Infra; Presentation wired.
</context>

<scope>
1.  **Application Layer Refactoring** (`src/modules/geography/application`):
    *   **Protocols**: `GeographyRepository`.
    *   **UseCases**: `GetCitiesUseCase`, `GetStatesUseCase`.

2.  **Infra Layer Implementations** (`src/modules/geography/infra`):
    *   **Repository Impl**: `HttpGeographyRepository`.
    *   **Adapters**: `useCitiesQuery`, `useStatesQuery`.

3.  **Presentation Updates**:
    *   Dropdowns/Selectors use the Infra Adapters.

4.  **Routing**:
    *   Likely minimal, but verify no legacy router usage.
</scope>

<requirements>
- **Stack**: TypeScript, React.
- **Negative Constraints**:
    *   Application layer: NO `react-query`, `axios`.

<technical_constraints>
1.  **Interface Naming**: Interfaces in `application/protocols` MUST NOT use the `I` prefix (e.g., `GeographyRepository`).
2.  **Value Objects**: Cities and States should likely be treated as Value Objects if they are immutable reference data.
3.  **Caching**: Geography data is highly static; Infra implementation should leverage aggressively caching strategies (e.g., `staleTime: Infinity` in QueryAdapter).
</technical_constraints>
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] Architecture: `geography/application` pure TS.
- [ ] Implementation: Lookup logic abstracted.
</acceptance_criteria>

<output>
1. **Summary**: Geography module strict compliance.
2. **Decisions**: Standardized Adapter pattern.
3. **Manual Test Guide**: Verify City/State selectors (e.g. in User/Library forms).
</output>
