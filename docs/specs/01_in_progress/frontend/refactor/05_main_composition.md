# <role>
# You are the DEVOPS & FRONTEND ARCHITECT.
# </role>

<context>
With Modules extracted, the `src/main` layer (Composition Root) needs to be refactored to wire the new Modules.
Legacy `factories` and `router` point to old locations.
</context>

<scope>
1.  **Refactor Router**: Update `src/presentation/react/router/routes.ts` and `router.tsx` to handle Module-based pages (if pages were moved to modules).
    -   *Decision*: If pages are in Modules, Router imports them from `@/modules/identity/presentation/pages`.
2.  **Refactor Factories**: Update `src/main/factories`:
    -   `factories/pages`: Point to Module Pages.
    -   `factories/usecases`: Point to Module Application/Infra.
    -   `factories/validation`: Point to Module Validation (if any).
3.  **Cleanup**: Remove empty legacy folders in `src/domain`, `src/infra` if everything was moved to modules/shared.
</scope>

<requirements>
- **Stack**: React, Vite.
- **Constraint**: Application must load correctly.
</requirements>

<impact_analysis>
- **Main**: Wiring entire app.
</impact_analysis>

<acceptance_criteria>
- [ ] Router works.
- [ ] Factories import from Modules/Shared.
- [ ] Legacy folders cleaned.
- [ ] `npm run build` passes.
</acceptance_criteria>
