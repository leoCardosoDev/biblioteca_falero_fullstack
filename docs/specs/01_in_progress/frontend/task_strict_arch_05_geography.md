# <role>
# Product & Domain Analyst (PDA)
# </role>

<role>
Senior Frontend Engineer
</role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_strict_arch_01_shared.md`
</dependent_tasks>

<context>
`Geography` module (Cities, States) is a simple CRUD/Lookup module but must follow the same strict rules.
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
