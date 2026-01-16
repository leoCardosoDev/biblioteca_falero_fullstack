# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA).
# Your output MUST be a valid Markdown file named `app/docs/specs/task_025_04_frontend_decoupling_composition.md`.
# </role>

<dependent_tasks>
- [Task 025_03: Frontend Pattern Application](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/specs/task_025_03_frontend_pattern_application.md)
</dependent_tasks>

<scope>
1. **Infra Adapters**:
   - [ ] Move API/Client logic from `presentation` or `services` to `src/infra/http`.
   - [ ] Implement `HttpUserRepository` and `HttpLoginRepository`.
2. **Composition Root**:
   - [ ] Update all `src/main/factories` to inject `HttpRepositories` (where backend is ready) or `MockRepositories` (from `infra/mocks`).
   - [ ] Ensure `App.tsx` only contains the main entry point and top-level providers.
3. **Mock Cleanup**:
   - [ ] Final check on all `// TODO` headers as per **Mock Replacement Policy** (ADR_011).
</scope>

<acceptance_criteria>
- [ ] User management page fetches data from the real backend.
- [ ] Catalog and Circulation pages keep working with Mocks through the `MockRepository` interface.
- [ ] No `axios` or specific `fetch` libraries imported outside `infra/`.
</acceptance_criteria>
