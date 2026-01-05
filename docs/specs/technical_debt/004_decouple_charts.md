
<role>
Technical Architect
</role>

<dependent_tasks>
- c:\Users\leosi\.gemini\antigravity\brain\66dea5cd-1a7a-4498-9853-cd8d218b0877\dependency_analysis.md
</dependent_tasks>

<context>
`Dashboard.tsx` imports `recharts` components (`AreaChart`, `XAxis`, etc.) directly.
This couples the Dashboard domain logic to the visualization library.
</context>

<scope>
1. **Frontend**:
   - Create `presentation/components/ui/charts/`:
     - `AreaChart.tsx`
     - `BarChart.tsx` (if needed)
     - `PieChart.tsx` (if needed)
   - These components should accept generic data props (e.g., `data: T[], xKey: keyof T, yKey: keyof T`) and configuration (colors, etc.).
   - Implement the adapter logic inside these components using `recharts`.
   - Refactor `Dashboard.tsx` to import from `@/presentation/components/ui/charts`.
</scope>

<requirements>
- **Stack**: React, Recharts
- **Performance**: Charts must remain responsive.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
</standards_compliance>

<acceptance_criteria>
- [ ] `Dashboard.tsx` does NOT import `recharts`.
- [ ] Dashboard charts render exactly as before.
- [ ] Chart components are generic enough to be used in `Reports.tsx`.
</acceptance_criteria>

<output>
1. **Summary**: Created Chart Component Library.
2. **Decisions**: Wrapped Recharts in domain-agnostic UI components.
3. **Manual Test Guide**: Check Dashboard charts for rendering and tooltips.
</output>
