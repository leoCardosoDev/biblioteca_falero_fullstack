# <role>
# You are the DEVOPS & FRONTEND ARCHITECT.
# </role>

<context>
The current system uses a flat `@` alias mapping to `src`.
To support the Modular Monolith structure, we need explicit path mappings for the new high-level directories: `modules` and `shared`.
We also need strict linting to prevent `presentation` from importing `infra` directly, and to enforce module boundaries.
</context>

<scope>
1.  **Directories**: Create `src/modules` and `src/shared`.
2.  **Vite Config**: Update `app/frontend/vite.config.ts`:
    -   Add alias `@/modules` -> `src/modules`.
    -   Add alias `@/shared` -> `src/shared`.
3.  **TypeScript**: Update `app/frontend/tsconfig.json` paths:
    -   `@/modules/*`: `["src/modules/*"]`
    -   `@/shared/*`: `["src/shared/*"]`
4.  **Linting**: Configure `eslint-plugin-boundaries` in `eslint.config.js`:
    -   **Context Sovereignty**: `modules` can import `shared`.
    -   **Cross-Module**: `identity` CAN import `geography` (public API).
    -   **Layer Strictness**: `presentation` components CANNOT import `@/infra` directly. They must use `@/application` interfaces (Hooks) or `@/modules` facades.
</scope>

<requirements>
- **Stack**: Vite, TypeScript, ESLint.
- **Constraint**: Do NOT remove the existing `@` alias yet.
- **Critical**: `npm run build` must pass.
</requirements>

<impact_analysis>
- **Infra**: Build/Lint tooling.
</impact_analysis>

<acceptance_criteria>
- [ ] Directory `src/modules`, `src/shared` exist.
- [ ] `vite.config.ts` has new aliases.
- [ ] `tsconfig.json` has new paths.
- [ ] ESLint enforces boundaries (verify with a deliberate fail test if possible, or just config check).
- [ ] `plugin:boundaries` is active.
</acceptance_criteria>
