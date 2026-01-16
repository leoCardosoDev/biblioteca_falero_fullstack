# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as ARCHITECT.
# </role>

<role>
Refactoring Specialist focusing on Type Safety and Clean Code.
</role>

<dependent_tasks>
- Depends on: Codebase Review Findings (codebase_review.md)
</dependent_tasks>

<context>
`DbAddUser` currently uses `as unknown as Id` (lines 139-141) to force types when handling address IDs. This bypasses TypeScript's safety mechanisms and suggests a design flow where the upstream types don't match the expected downstream types, or the logic for handling "optional vs required" IDs is flawed.
- **Affected File**: `src/application/usecases/db-add-user.ts`
</context>

<scope>
Refactor `DbAddUser` to remove the need for `as unknown as Id`.

1. **Backend**:
    - Analyze the flow to understand why the cast was introduced (likely dealing with `string | undefined` vs `Id`).
    - Change the logic to ensure that if `Id.create` returns an ID, it is properly typed.
    - If `Address.create` expects `Id` but we are passing `string` or `undefined` (and relying on Domain validation to catch it), we should strictly type the invalid state or, better, fail earlier / use a factory that accepts raw values if validation is intended there.
    - *Wait*, `Address.create` likely calls `new Address` which expects `Id`. If we pass something else via `as unknown`, we are crashing at runtime inside Address if it doesn't check.
    - **Goal**: Ensure that what is passed to `Address.create` matches its signature WITHOUT casting. If `Address.create` requires `Id`, then we must populate it with `Id`. If the ID is missing, we should either pass `undefined` (if allowed) or handle the error *before* calling `Address.create`.
    - If the intention is to let `Address` validate, then `Address.create` should potentially accept `string | Id` or we should use a DTO that allows checking.
    - **Action**: Fix the implementation `resolveAddress` to guarantee strict types.

2. **Frontend**:
    - None.
</scope>

<requirements>
- **Stack**: TypeScript.
- **Negative Constraints**: Do not use `as unknown` or `as any`.
- **Performance**: N/A.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
</standards_compliance>

<api_specification>
N/A
</api_specification>

<acceptance_criteria>
- [ ] Backend: `DbAddUser` contains NO `as unknown` casts.
- [ ] Backend: `npm test` passes.
- [ ] Backend: Type checking (`npm run type-check` or similar) passes.
</acceptance_criteria>

<output>
1. **Summary**: Fixed type safety in `DbAddUser`.
2. **Decisions**: Removed unsafe casting by aligning types.
3. **Manual Test Guide**: Run lint/type check.
</output>
