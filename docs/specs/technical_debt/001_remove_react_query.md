
<role>
Technical Architect
</role>

<dependent_tasks>
- c:\Users\leosi\.gemini\antigravity\brain\66dea5cd-1a7a-4498-9853-cd8d218b0877\dependency_analysis.md
</dependent_tasks>

<context>
The `app/frontend/package.json` includes `@tanstack/react-query`, but a codebase search revealed no usage of `useQuery`, `useMutation`, or `QueryClient`.
This indicates it is dead code adding unnecessary weight to the bundle.
</context>

<scope>
1. **Frontend**:
   - Uninstall `@tanstack/react-query`.
   - Verify `package.json` update.
   - Run build and tests to ensure no hidden implicit dependencies break.
</scope>

<requirements>
- **Stack**: React, Vite
- **Negative Constraints**: Do not remove if actually used (double check `node_modules` or deep imports, though unlikely).
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `@tanstack/react-query` is removed from `dependencies`.
- [ ] `npm run build` passes.
- [ ] `npm run test` passes.
- [ ] Application loads without runtime crash (sanity check).
</acceptance_criteria>

<output>
1. **Summary**: Removed unused library.
2. **Decisions**: N/A
3. **Manual Test Guide**: Run the app and check console for missing dependency errors.
</output>
