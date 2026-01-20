# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md`
</dependent_tasks>

<context>
The `Reports` module generates PDF/CSV export data.
Logic validates date ranges, filters, and permissions.
</context>

<scope>
1. **Domain/Application Tests**:
   - `GenerateReport` UseCase: Test date range validation (start < end), required filters.
   - `ReportType` Value Object: Validation of supported types.

2. **Infra Tests**:
   - `ReportRepository`: Test download trigger (mocking `window.open` or Blob handling).
</scope>

<requirements>
- **Stack**: Vitest.
- **Negative Constraints**:
    - Do NOT test the actual binary content of the PDF. Test the *request* to generate it.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `tests/modules/reports` populated.
- [ ] Validation logic covered (Date ranges).
</acceptance_criteria>

<output>
1. **Summary**: Tests for Reports generation logic.
2. **Decisions**: Verified parameters, mocked file download.
3. **Manual Test Guide**: `npm run test:unit`.
</output>

<technical_constraints>
- **Browser API Mocking**:
    - Implementation likely uses `window.URL.createObjectURL` and `<a>` tag clicks.
    - **MUST** stub these globals in tests:
        - `vi.stubGlobal('URL', { createObjectURL: vi.fn(), revokeObjectURL: vi.fn() })`
        - Mock `HTMLAnchorElement.prototype.click`.
- **Determinism**:
    - Use `vi.useFakeTimers()` when testing date-range defaults (e.g. "Last 30 days").
    - Ensure tests do not fail when the month changes.
</technical_constraints>
