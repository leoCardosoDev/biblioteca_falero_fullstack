# Frontend Refactoring: Extract Magic Strings

<role>
Refactoring Architect specializing in Clean Code.
</role>

<dependent_tasks>
- None
</dependent_tasks>

<context>
The `useAuth` hook (to be renamed `useLoginViewModel`) contains hardcoded error messages strings:
- "Erro inesperado: Falha no login"
- "Erro inesperado. Tente novamente mais tarde."

This violates "No Magic Strings" rule. It forces the UI logic to be coupled to specific text content and makes internationalization (i18n) difficult.
</context>

<scope>
1.  **Frontend**:
    - Create a centralized constants file or simple i18n object (e.g., `presentation/constants/messages.ts`).
    - Extract strings from loops/hooks into this constant file.
    - Replace strings in `useAuth` with references.
</scope>

<requirements>
- **Stack**: React, TypeScript
- **Negative Constraints**: Do not use a heavy i18n library if not already present. Simple object mapping is sufficient for now.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<api_specification>
N/A
</api_specification>

<acceptance_criteria>
- [ ] No hardcoded user-facing strings in `useAuth` / `useLoginViewModel`.
- [ ] Strings are centrally managed.
- [ ] Tests pass.
</acceptance_criteria>

<output>
1.  **Summary**: Externalized magic strings.
2.  **Decisions**: Improved maintainability and i18n readiness.
3.  **Manual Test Guide**: Verify error messages still appear in UI.
</output>
