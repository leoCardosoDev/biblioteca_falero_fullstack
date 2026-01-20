## Workflow — Development Execution Flow

Este documento define o **fluxo de execução completo** para desenvolvimento neste projeto.

---

### Visão Geral do Fluxo

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   START     │───▶│   ANÁLISE   │───▶│  PRD + ADR  │───▶│    TASK     │───▶│    PLAN     │
│  (Fase 0)   │    │  (Fase 1)   │    │  (Fase 2)   │    │  (Fase 3)   │    │  (Fase 4)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                                    │
                   ┌────────────────────────────────────────────────────────────────┘
                   ▼
           ┌─────────────┐
           │ IMPLEMENTAR │
           │  (Fase 5)   │
           └─────────────┘
```

---

### Fases Detalhadas

| Fase | Nome | Prompt | Quando Usar |
|------|------|--------|-------------|
| **0** | Start | `prompts/start.md` | **SEMPRE** — início de qualquer sessão |
| **1** | Análise | (manual) | Feature nova ou refactoring |
| **2** | PRD + ADR | `prompts/prd.md` | Após análise, antes de criar tasks |
| **3** | Task | `prompts/task.md` | Após PRD aprovado |
| **4** | Plan | `prompts/plan-backend.md` | Antes de implementar cada spec |
| **5** | Implementar | Via agents | Após plan aprovado |

---

### Documentos de Referência

| Tipo | Localização | Propósito |
|------|-------------|-----------|
| **Architectural Contract** | `modular-ddd-clean-arch.md` | **IMMUTABLE LAW** |
| **Guardrail** | `app/docs/ai/guardrail.prompt.md` | Regras de enforcement |
| **Standards** | `.agent/standards/*.md` | Padrões de código |
| **ADRs** | `app/docs/adr/*.md` | Decisões arquiteturais |
| **Module Contracts** | `app/docs/modules/*.module.md` | Fronteiras de módulo |
| **Domain Rules** | `app/docs/domain/*.rules.md` | Invariantes de domínio |
| **Templates** | `.agent/templates/*.md` | Templates reutilizáveis |

---

### Checklist Rápido

```
□ Fase 0: Rodar start.md
□ Fase 1: Análise concluída
□ Fase 2: ADR verificada/criada + PRD criado
□ Fase 3: Tasks criadas
□ Fase 4: Implementation Plan aprovado
□ Fase 5: Código implementado + testes passando
```
