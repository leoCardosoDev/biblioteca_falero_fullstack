## **Task / Spec Creation**

> Based **exclusively** on the **approved PRD**, derive the implementation tasks.
>
> For each decision defined in the PRD:
>
> * Create **granular task specs**
> * Organize them by dependency impact
> * Define a safe execution order
> * Identify potential **breaking change** risks
> * **Constraint**: Verify that your task breakdown respects `modular-ddd-clean-arch.md`. Do not group incompatible layers (e.g. Domain + Infra) in atomic steps if it risks pollution.
>
> Each task must:
>
> * Address a single, clear responsibility
> * Explicitly state affected layers (**domain, application, infra, presentation, main**)
> * Include objective acceptance criteria
>
> Use the template:
> `.agent/templates/TEMPLATE_TASK_SPEC.md`
> Generate and save the file in:`app/docs/specs/01_in_progress/backend/`
> **Do not change or reinterpret PRD decisions.**
> The goal is to define *how* to implement what has already been decided.
