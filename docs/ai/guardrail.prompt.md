# AI Guardrail — Enforcement Prompt

> **Purpose**: This prompt MUST be internalized before any code generation, refactoring, or review.
> It acts as the **final authority** on architectural decisions and coding standards.

---

## MANDATORY DOCUMENTS

You MUST read and obey the following documents before any implementation:

### Constants (The "Constituion")
- `modular-ddd-clean-arch.md` (The Unified Architectural Contract)

### Standards (Authority on *how* to code)
- `.agent/standards/STANDARD_GENERAL.md`
- `.agent/standards/STANDARD_BACKEND.md`
- `.agent/standards/STANDARD_FRONTEND.md`
- `.agent/standards/STANDARD_GITFLOW.md`

### ADRs (Authority on *why* decisions were made)
- `app/docs/adr/*.md` — All Architecture Decision Records

### Module Contracts (Authority on *boundaries*)
- `app/docs/modules/*.module.md` — Module public APIs and forbidden access

### Domain Rules (Authority on *invariants*)
- `app/docs/domain/*.rules.md` — Aggregate and entity business rules

---

## FORBIDDEN ACTIONS

You MUST NOT:

1. **Invent patterns** — Use only patterns documented in standards
2. **Bypass layers** — Respect Clean Architecture dependency rules strictly
3. **Change public contracts** — Module contracts are immutable without explicit approval
4. **Create new abstractions** — Unless explicitly required by spec
5. **Skip tests** — TDD is mandatory; no production code without failing test first
6. **Use `any` type** — Use `unknown` and narrow explicitly
7. **Add comments** — Code must be self-documenting via naming
8. **Commit to main/develop** — Feature branches only
9. **Import internal module files** — Use barrel exports only
10. **Assume behavior** — If information is missing, ASK

---

## REQUIRED BEHAVIORS

You MUST:

1. **Follow Clean Architecture** — Domain → Application → Infra → Presentation
2. **Respect module boundaries** — Only import from Public API sections
3. **Preserve invariants** — Follow `*.rules.md` documents strictly
4. **Use Value Objects** — Every primitive with business meaning is a VO
5. **Keep dependency direction valid** — Inner layers never know outer layers
6. **Use `@/` aliases** — Absolute imports with module aliases only
7. **Use barrel pattern** — Every folder exposes `index.ts`
8. **Write tests first** — Red → Green → Refactor
9. **Produce reports** — DEV Report for implementations, TIR for reviews

---

## PRE-IMPLEMENTATION CHECKLIST

Before writing ANY code:

- [ ] Am I on a feature branch?
- [ ] Did I read `modular-ddd-clean-arch.md` and verify "The Golden Triangle" compliance?
- [ ] Did I read the relevant spec in `app/docs/specs/`?
- [ ] Did I read the module contract for affected modules?
- [ ] Did I read the domain rules for affected entities?
- [ ] Did I identify all inputs, outputs, and error scenarios?
- [ ] Did I re-read `STANDARD_BACKEND.md` or `STANDARD_FRONTEND.md`?

If ANY item is unclear → **STOP and ASK**.

---

## ESCALATION RULES

When information is missing:

1. **Check ADRs first** — Decision may already be documented
2. **Check module contracts** — Boundary may already be defined
3. **Check domain rules** — Invariant may already be specified
4. **If still unclear** — Ask for the specific document or clarification
5. **NEVER assume behavior** — Wrong assumptions cause rework

---

## CONFLICT RESOLUTION

When rules conflict:

1. **Most restrictive rule wins**
2. **Standards override convention**
3. **ADRs override assumptions**
4. **Domain rules override convenience**
5. **Module contracts override "quick fixes"**

---

## NON-COMPLIANCE

Any code that violates this guardrail is considered **DEFECTIVE**.

- Code review MUST reject non-compliant code
- CI/CD SHOULD fail on lint/architecture violations
- Shortcuts are NEVER acceptable

---

## FINAL DIRECTIVE

> **If the code works but violates standards, it is WRONG.**
> **Correctness without clarity is a failure.**
> **There are no exceptions.**
