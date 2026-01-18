# <role>
# You are the FRONTEND DEVELOPER.
# </role>

<context>
The `src/presentation/react/components/ui` directory contains atomic, reusable components (Button, Input, etc.).
Generic hooks and infrastructural adapters (HTTP) also exist in the codebase but are mixed with feature code.
</context>

<scope>
1.  **Shared UI**: move `src/presentation/react/components/ui/*` to `src/shared/components/ui/*`.
2.  **Shared Hooks**: move generic hooks (e.g., `useToast`, `useForm` wrappers if generic) to `src/shared/hooks/*`.
3.  **Shared Domain**: move `BaseEntity`, `Either`, or generic Types to `src/shared/domain/*`.
4.  **Shared Infra**: move `HttpClient` interfaces and adapters to `src/shared/infra/*`.
5.  **Refactor**: Update imports in the codebase to use `@/shared/...`.
</scope>

<requirements>
- **Stack**: React, TypeScript.
- **Constraint**: Pure refactor, no logic changes.
- **Strictness**: Atomic components MUST NOT import application logic.
</requirements>

<impact_analysis>
- **Presentation**: All components using UI Kit.
- **Infra**: All usage of HttpClient.
</impact_analysis>

<acceptance_criteria>
- [ ] `src/shared/components/ui` populated.
- [ ] `src/shared/hooks` populated.
- [ ] Imports updated.
- [ ] `npm run lint` passes.
- [ ] App runs without UI regression (smoke test).
</acceptance_criteria>
