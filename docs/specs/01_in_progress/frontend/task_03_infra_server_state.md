# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_03_infra_server_state.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_01_init_structure_lint.md`
</dependent_tasks>

<context>
- We are replacing ad-hoc `fetch`/`useEffect` with a **centralized, cache-first** strategy.
- **Server State** (API Data) belongs to TanStack Query.
- **HTTP Transport** belongs to a dedicated Adapter (Axios/Fetch Wrapper) to handle global concerns like Auth Tokens and Error Logging.
</context>

<scope>
Detailed Infrastructure implementation.

1. **HTTP Client Adapter**:
    - Install `axios` (Standard Industry Choice for Interceptors).
    - Create `src/shared/infra/http/axios-adapter.ts` (or `api-client.ts`).
    - **Requirements**:
        - Configure `baseURL` from Environment Variable (`VITE_API_URL`).
        - Add **Request Interceptor**: Auto-attach `Authorization: Bearer <token>` if token exists (read from LocalStorage or Store - define interface for this).
        - Add **Response Interceptor**: Global Error Handling (e.g., if 401, redirect to login).
    - Export a singleton or factory, e.g., `apiClient`.

2. **Query Client Configuration**:
    - Install `@tanstack/react-query` and `@tanstack/react-query-devtools`.
    - Create `src/shared/infra/query/query-client.ts`.
    - **Configuration**:
        - `staleTime`: Default to 1-5 minutes (Context: "Read-heavy" app).
        - `retry`: 1 or 2 (don't spam backend).
        - `refetchOnWindowFocus`: `false` (in dev), `true` (in prod) - or Architect preference. Suggest `false` to reduce noise.

3. **Global Providers**:
    - This task might just define the logic, while `task_08` mounts them. However, creating the `QueryProvider` component wrapper in `src/shared/infra/query/QueryProvider.tsx` is good practice here.

</scope>

<requirements>
- **Stack**: TanStack Query v5, Axios, TypeScript.
- **Negative Constraints**:
    - Do NOT write specific API calls (e.g., `getUser`). Write generic methods if wrapping (`get<T>`, `post<T>`).
- **Files**:
    - `src/shared/infra/http/*`
    - `src/shared/infra/query/*`
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `apiClient` instance is configured with BaseURL.
- [ ] Global interceptors are in place (Console log them for now is fine to verify).
- [ ] `queryClient` is exported with defined default options (staleTime verified).
- [ ] `QueryProvider` wrapper component exists.
</acceptance_criteria>

<output>
1. **Summary**: Implemented the backbone for Communication (Http) and Caching (Query).
2. **Decisions**: Separated Http (Axios) from State (Query) to allow swapping transport layer if needed (DIP).
3. **Manual Test Guide**: Import `apiClient` and inspect `defaults.baseURL`.
</output>
