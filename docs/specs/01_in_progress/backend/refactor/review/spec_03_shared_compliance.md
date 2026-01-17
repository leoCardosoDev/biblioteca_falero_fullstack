# <role>
# PRODUCT & DOMAIN ANALYST (PDA)
# </role>

<dependent_tasks>
- PRD: app/docs/prd/PRD_Architecture_Compliance.md
</dependent_tasks>

<context>
- Current Status: `src/shared` and other modules need verification to ensure `gateways`, `errors`, and `protocols` adhere to ADR 003.
- Goal: Enforce strict layering consistency beyond just `usecases`.
</context>

<scope>
Detailed list of what needs to be implemented.
1. **Backend**:
   - Audit `src/shared` for compliance (Domain vs Application vs Infra).
   - Ensure `Gateway` Interfaces are in Domain (or Application if application-specific) and implementations in Infra.
   - Ensure `Protocols` (e.g., Cryptography, Hash) are in Application (if ports) or Shared Kernel.
   - Move misaligned files.
   - Update imports.
2. **Frontend**: N/A
</scope>

<requirements>
- **Stack**: Node.js, TypeScript
- **Negative Constraints**: No logical changes.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<database_schema>
```sql
-- No Schema Changes
```
</database_schema>

<api_specification>
#### No API Changes
</api_specification>

<acceptance_criteria>
- [ ] All `Gateway` interfaces are in `domain/gateways` or `application/gateways`.
- [ ] All `Gateway` implementations are in `infra/gateways`.
- [ ] `src/shared` adheres to Clean Architecture layers.
- [ ] Tests pass.
</acceptance_criteria>

<output>
1. **Summary**: Verified and corrected Shared/General compliance.
2. **Decisions**: Enforced strict ADR 003 placement for support classes.
3. **Manual Test Guide**: Review directory structure and run tests.
</output>
