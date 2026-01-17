# <role>
# You are the DEVOPS & BACKEND ENGINEER.
# </role>

<context>
The current system uses a flat `@` alias mapping to `dist`.
To support the Modular Monolith structure, we need explicit path mappings for the new high-level directories: `modules` and `shared`.
</context>

<scope>
1.  **Directories**: Create `src/modules` and `src/shared`.
2.  **TypeScript**: Update `app/backend/tsconfig.json` paths to include:
    -   `@/modules/*`: `["src/modules/*"]`
    -   `@/shared/*`: `["src/shared/*"]`
3.  **Runtime Aliases**: Update `app/backend/package.json` `_moduleAliases` to include:
    -   `@/modules`: `dist/modules`
    -   `@/shared`: `dist/shared`
4.  **Tests Config**: Ensure `tsconfig.json` (or specific test tsconfigs) also recognizes these paths so tests don't break.
</scope>

<requirements>
- **Stack**: Node.js, TypeScript, module-alias.
- **Constraint**: Do NOT remove the existing `@` alias yet.
- **Critical**: Ensure `npm run build` works immediately after this change.
</requirements>

<impact_analysis>
- **Infra**: Build configuration.
</impact_analysis>

<acceptance_criteria>
- [x] Directory `src/modules` exists.
- [x] Directory `src/shared` exists.
- [x] `tsconfig.json` has new paths.
- [x] `package.json` has new aliases.
- [x] `npm run build` passes.
</acceptance_criteria>
