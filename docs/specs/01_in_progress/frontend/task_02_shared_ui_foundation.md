# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) acting as AGENT ARCHITECT.
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/frontend/task_02_shared_ui_foundation.md`.
# </role>

<role>
SOFTWARE ARCHITECT & PDA
</role>

<dependent_tasks>
- `task_01_init_structure_lint.md`
</dependent_tasks>

<context>
- We need a professional, accessible, and theme-able UI foundation.
- Per ADR-015, we are using a **Hybrid** approach:
    - **Tailwind CSS** for low-level styling and layout.
    - **Radix UI** (Headless) for complex accessible primitives (Dialog, Popover, etc.).
    - **Design System** located in `src/shared/ui`.
</context>

<scope>
Establish the design system kernel.

1. **Styling Engine**:
    - Install `tailwindcss`, `postcss`, `autoprefixer`.
    - Configure `tailwind.config.ts` to map to `src/**/*.{ts,tsx}`.
    - Define core "Semantic Aliases" in `tailwind.config.ts` if known (e.g. `bg-primary`, `text-muted`), or start with standard colors and refine later.
    - Create `src/index.css` with `@tailwind` directives.

2. **Utility Foundation**:
    - Install `clsx` and `tailwind-merge`.
    - Create `src/shared/ui/lib/utils.ts`.
    - Implement and export `cn(...)` function to safely merge Tailwind classes (critical for overrides).

3. **Primitive Components (Proof of Concept)**:
    - Install `@radix-ui/react-slot` (for `asChild` pattern).
    - Create a `Button` component in `src/shared/ui/button.tsx`.
        - Must support variants (default, destructive, outline, ghost) using `class-variance-authority` (CVA) OR standard switch/maps. *Decision: Use CVA if familiar, otherwise standard props. Recommended: Use `class-variance-authority` for scalability.*
    - Export `Button` from `src/shared/ui/index.ts` (or `public.ts` if using public-only pattern for shared).

</scope>

<requirements>
- **Stack**: React, Tailwind CSS (v3.4+), Radix UI, CVA (optional but recommended), TypeScript.
- **Components**: Do NOT build the whole library. Build `Button` + `utils.ts` only.
- **Folder**: All UI code goes into `src/shared/ui`.
</requirements>

<standards_compliance>
- **General**: `.agent/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `.agent/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `cn` utility is implemented and strictly typesafe.
- [ ] `Button` component accepts `className` override and merges it using `cn`.
- [ ] `import { Button } from '@/shared/ui'` works.
- [ ] Tailwind Intellisense is working (by verifying config presence).
- [ ] Build includes unified CSS file.
</acceptance_criteria>

<output>
1. **Summary**: Configured Styling Engine (Tailwind) and UI Primitives Kernel (Radix + Utils).
2. **Decisions**: Using `clsx` + `tailwind-merge` (`cn`) to handle class conflicts, allowing flexible component usage.
3. **Manual Test Guide**: Render `<Button className="bg-red-500">` and verify it overrides default blue (if strictly configured) or merges correctly.
</output>
