# <role>
# You are the DOMAIN EXPERT & BACKEND DEV.
# </role>

<context>
The Geography domain (`City`, `State`, `Neighborhood`) is a standalone support subdomain.
It provides location data to the Identity context.
**Critical Analysis**: `UserTypeOrmEntity` in Identity has a HARD dependency on `City`, `State`, `Neighborhood` TypeORM entities (`@ManyToOne`).
</context>

<scope>
1.  **Structure**: Create `src/modules/geography` with `domain`, `application`, `infra`.
2.  **Move Domain**:
    -   `City`, `State`, `Neighborhood` entities.
3.  **Move Application**:
    -   UseCases: `LoadCity`, `LoadState`, `LoadNeighborhood`, `ResolveAddress`.
4.  **Move Infra**:
    -   Repositories associated with Geography tables.
    -   **TypeORM Entities**: `City`, `State`, `Neighborhood` schemas.
5.  **Public API**:
    -   Create `src/modules/geography/index.ts`.
    -   **CRITICAL**: Export the TypeORM Entities via a specific path (e.g. `src/modules/geography/infra/db/entities`) or just make them public so Identity can import them.
    -   Export facades or Service interfaces needed by Identity.
6.  **Refactor**: Update imports in Identity context to use the Public API.
</scope>

<requirements>
- **Stack**: TypeScript.
- **Constraint**: Ensure `Identity` context can access Geography TypeORM entities for relations.
- **Constraint**: Do NOT create a cyclical dependency. Geography must NOT import Identity.
</requirements>

<impact_analysis>
- **Domain**: Moves Geography entities.
- **Infra**: Context Repositories.
</impact_analysis>

<acceptance_criteria>
- [x] Geography module created.
- [x] Files moved.
- [x] Imports updated.
- [x] `npm run lint` passes (Boundaries check allows this specific export).
</acceptance_criteria>
