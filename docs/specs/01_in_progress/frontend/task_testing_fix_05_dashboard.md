# <role>
# System Architect
# </role>

<dependent_tasks>
- `app/docs/specs/01_in_progress/frontend/task_testing_fix_01_foundation.md`
</dependent_tasks>

<context>
The `Dashboard` module aggregates data for the home screen.
It likely involves complex data compilation or purely presentation logic.
</context>

<scope>
1. **Application Tests**:
   - `LoadDashboardMetrics` UseCase: Test aggregation logic, zero states, error states.
   
2. **Infra Tests**:
   - `DashboardRepository`: Test DTO mapping from API response to Domain entities.

3. **Presentation**:
   - `DashboardLayout` or `Widget` components: Test they render correctly with mocked data (Integration test).
</scope>

<requirements>
- **Stack**: Vitest, React Testing Library.
- **Negative Constraints**:
    - Do NOT test actual charts rendering pixel-perfect (use snapshot or basic existence check).
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `tests/modules/dashboard` populated.
- [ ] Correctly handles empty dashboard state.
</acceptance_criteria>

<output>
1. **Summary**: Tests for Dashboard aggregation logic.
2. **Decisions**: Focused on data correctness over visual charting accuracy.
3. **Manual Test Guide**: `npm run test:unit`.
</output>

<technical_constraints>
- **Performance / Scale**:
    - Tests for aggregation logic should include cases with "empty", "normal", and "high volume" data samples to ensure linear verification.
- **DTO Mapping**:
    - `DashboardRepository` tests must verifying strict mapping from Raw API JSON -> Domain Entity.
    - Ensure missing optional fields in API response are handled gracefully (defaults or nullable types in Domain).
- **Presentation**:
    - Do not test Canvas/SVG rendering details of charts.
    - Test that the *Component* receives the correct props (data points) from the hook/presenter.
</technical_constraints>
