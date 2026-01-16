# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/task_025_01_frontend_infra_audit.md`.
# </role>

<dependent_tasks>
- [STORY_025: Frontend Refactor](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/stories/story_025_frontend_refactor.md)
</dependent_tasks>

<context>
The frontend makes direct use of mock data in `src/services/mock-data.ts`. Some backend endpoints (Users, Login) already exist, while others (Catalog, Circulation) are in the backlog.
</context>

<scope>
1. **Frontend Project Audit**:
   - [ ] Audit all imports in `src/presentation` and `src/hooks` to identify direct `mock-data` or `axios` usage.
   - [ ] Map existing backend endpoints: `/users` (User list, CRUD), `/login` (Auth).
2. **Infrastructure Provisioning**:
   - [ ] Create `src/infra/mocks` and move `mock-data.ts` there.
   - [ ] Create new folder structure: `src/presentation/react/{components,pages,contexts,hooks}`.
3. **Draft TODOs**:
   - [ ] Identify files that will keep mocks (Books, Loans) and add the header: `// TODO: Replace with HttpRepository when Backend Task X is complete`.
</scope>

<requirements>
- **Stack**: React, TypeScript.
- **Standards**: `STANDARD_FRONTEND.md`, `ADR_011`.
</requirements>

<acceptance_criteria>
- [ ] Folder `src/presentation/react` exists.
- [ ] Mocks moved to `src/infra/mocks`.
- [ ] List of all files requiring `// TODO` headers is generated.
</acceptance_criteria>

<output>
- **Audit Report**: Updated [refactor_analysis.md](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/reports/dev/frontend/refactor_analysis.md).
- **Directory Structure**: Provisioned for Phase 2.
</output>
