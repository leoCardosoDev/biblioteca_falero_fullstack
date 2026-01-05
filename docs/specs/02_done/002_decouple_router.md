
<role>
Technical Architect
</role>

<dependent_tasks>
- c:\Users\leosi\.gemini\antigravity\brain\66dea5cd-1a7a-4498-9853-cd8d218b0877\dependency_analysis.md
</dependent_tasks>

<context>
The `react-router-dom` library is partially decoupled via `infra/router/react-router-adapter.ts`, which covers imperative navigation (`useNavigate`).
However, declarative routing (`<Routes>`, `<Route>`, `<Link>`) is still coupled directly in `App.tsx` and various components.
</context>

<scope>
1. **Frontend**:
   - Create `presentation/components/ui/link.tsx` (or `router-link.tsx`) to wrap `react-router-dom`'s `Link`.
   - Create `infra/router/router-provider.tsx` or similar to abstract the Router configuration if feasible, OR accept that `App.tsx` is the composition root and thus allowed to know about the Router (Strategy decision usually favours the latter, but `Link` should be wrapped).
   - Update `useReactRouterAdapter` to ensure it fully meets `RouterProtocol`.
   - Replace all direct `import { Link } from 'react-router-dom'` with the new component.
</scope>

<requirements>
- **Stack**: React, React Router v7
- **Performance**: No overhead introduction.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] All direct imports of `Link` from `react-router-dom` are replaced by `@/presentation/components/ui/link`.
- [ ] Navigation works as before.
- [ ] `App.tsx` remains as Composition Root (exception for `BrowserRouter` provider usage).
</acceptance_criteria>

<output>
1. **Summary**: Decoupled Link component.
2. **Decisions**: Decided to wrap `Link` but keep `RouterProvider` in `App.tsx` as it's the entry point.
3. **Manual Test Guide**: Navigate between pages using sidebar links and inline links.
</output>
