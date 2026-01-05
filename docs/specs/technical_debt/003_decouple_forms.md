
<role>
Technical Architect
</role>

<dependent_tasks>
- c:\Users\leosi\.gemini\antigravity\brain\66dea5cd-1a7a-4498-9853-cd8d218b0877\dependency_analysis.md
</dependent_tasks>

<context>
Forms are currently implemented using `react-hook-form` and `zod` directly in components (e.g., `UserForm.tsx`). This creates high coupling.
Changing the form library or validation library would require rewriting all form components.
</context>

<scope>
1. **Frontend**:
   - **Strategy**: Implement the "Form Adapter" pattern using a Custom Hook and Composition.
   - Create `presentation/protocols/form-protocol.ts`: Define interfaces for `useForm`, `Field`, `FormState`.
   - Create `infra/forms/react-hook-form-adapter.ts`: Implement the protocol using `react-hook-form`.
   - Create `presentation/components/ui/form/`:
     - `Form.tsx`: Wrapper for the form context/provider.
     - `Field.tsx`: Wrapper for input registration.
     - `useCustomForm.ts`: The hook that prevents components from importing `useForm` directly.
   - Refactor `UserForm.tsx` to use `useCustomForm` and the new components.
   - Ensure `zodResolver` is passed via the adapter, not imported in the View.
</scope>

<requirements>
- **Stack**: React, React Hook Form, Zod
- **Negative Constraints**: Do not expose `register` method from RHF directly if possible; use controlled components or a unified Field API.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `UserForm.tsx` does NOT import `react-hook-form` or `@hookform/resolvers`.
- [ ] `UserForm` works exactly as before (validation, submission, error handling).
- [ ] New Form Abstractions are reusable for other forms.
</acceptance_criteria>

<output>
1. **Summary**: Created Form Abstraction Layer.
2. **Decisions**: Used Adapter pattern with Custom Hook to hide RHF implementation details.
3. **Manual Test Guide**: Create and Edit a user using the refactored form. Verify validation errors display correctly.
</output>
