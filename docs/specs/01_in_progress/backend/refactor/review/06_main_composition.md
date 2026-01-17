# <role>
# You are the DEVOPS & ARCHITECT.
# </role>

<context>
With Modules extracted, the `src/main` layer (Composition Root) needs to be verified.
Legacy root directories (`src/domain`, `src/application`, `src/infra`) must be removed.
</context>

<scope>
1.  **Cleanup**: Delete legacy root directories.
2.  **Dependencies**: Verify `src/main` imports from `modules` or `shared` only.
3.  **Entry Point**: Verify `src/main/server.ts`.
4.  **Factories**: Update all Factories in `src/main/factories` to import UseCases/Repos from their new Module locations.
5.  **Docker**: Rebuild and health check.
</scope>

<requirements>
- **Stack**: Docker, Node.js.
- **Constraint**: Application must start seamlessly.
</requirements>

<impact_analysis>
- **Main**: Factory composition.
</impact_analysis>

<acceptance_criteria>
- [x] Legacy folders removed.
- [x] `npm run build` passes.
- [x] `docker-compose up` starts the backend.
</acceptance_criteria>
