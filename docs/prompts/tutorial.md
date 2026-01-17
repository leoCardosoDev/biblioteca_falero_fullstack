# Tutorial: Fluxo de Desenvolvimento com AI

Este tutorial ensina como usar o fluxo de prompts para garantir código consistente e reduzir retrabalho.

---

## 📚 Pré-requisitos

Antes de começar, familiarize-se com estes documentos:

| Documento | Localização | O que contém |
|-----------|-------------|--------------|
| Guardrail | `app/docs/ai/guardrail.prompt.md` | Regras que a AI deve seguir |
| Standards | `.agent/standards/` | Padrões de código obrigatórios |
| ADRs | `app/docs/adr/` | Decisões arquiteturais do projeto |
| Refactoring | `.agent/standards/STANDARD_REFACTORING.md` | Regras de refactoring e patterns |

---

## 🚀 Fluxo Passo a Passo

### Fase 0: Inicialização (OBRIGATÓRIA)

**Quando:** Início de TODA sessão de trabalho

**Como usar:**
1. Abra `app/docs/prompts/start.md`
2. Copie o conteúdo e cole na AI
3. Aguarde confirmação: `✅ Guardrail loaded`

**Por quê:** Garante que a AI leu todas as regras antes de começar.

---

### Fase 1: Análise

**Quando:** Você tem uma feature nova ou precisa refatorar

**O que fazer:**
- **Feature nova:** Documente requisitos, identifique módulos afetados
- **Refactoring:** Analise o código existente em `app/backend/` ou `app/frontend/`

**Dica:** Consulte os contratos de módulo em `app/docs/modules/` para entender fronteiras.

---

### Fase 2: PRD + ADR

**Quando:** Após a análise, antes de criar tasks

**Como usar:**
1. Verifique se existe ADR relevante em `app/docs/adr/`
2. Se não existir, crie uma nova ADR
3. Abra `app/docs/prompts/prd.md`
4. Copie e cole na AI
5. Revise o PRD gerado em `app/docs/prd/`

**Resultado:** PRD aprovado que documenta O QUE mudar e POR QUÊ.

---

### Fase 3: Tasks

**Quando:** Após PRD aprovado

**Como usar:**
1. Abra `app/docs/prompts/task.md`
2. Copie e cole na AI
3. Revise as tasks geradas em `app/docs/specs/01_in_progress/`

**Dica:** Tasks devem ser granulares — uma responsabilidade por task.

---

### Fase 4: Implementation Plan

**Quando:** Antes de implementar cada task/spec

**Como usar:**
1. Abra `app/docs/prompts/plan-backend.md`
2. Altere o caminho da spec: `[CHANGE_ME]` → caminho real
3. Copie e cole na AI
4. Revise o plano gerado

**Importante:** O plano referencia automaticamente:
- Guardrail
- Standards
- Module Contracts
- Domain Rules

---

### Fase 5: Implementação

**Quando:** Após plan aprovado

**O que acontece:**
1. AI implementa seguindo TDD (Red → Green → Refactor)
2. Testes são escritos ANTES do código
3. Lint e testes devem passar
4. Code Review automático valida compliance

---

### Fase 6: Refactoring (Opcional)

**Quando:** Código existente precisa ser melhorado sem mudar comportamento

**Como usar:**
1. Abra `app/docs/prompts/refactor.md`
2. Aponte o código a ser refatorado
3. AI analisa e detecta code smells
4. Revise o Transform Map gerado

**Regras de Refactoring:**

| Code Smell Detectado | Pattern/Técnica Aplicada |
|---------------------|--------------------------|
| Conditional seleciona comportamento | Strategy Pattern |
| Lógica duplicada | Extract Method |
| Classe com > 3 responsabilidades | Extract Class |
| Função com > 4 parâmetros | Introduce Parameter Object |
| Método usa mais dados de outro objeto | Move Method |
| Hierarquia de objetos similar | Template Method |
| Criação complexa de objetos | Builder / Factory |

**Transform Map esperado:**
```
✔ Findings:
  - Long Method (linha X-Y)
  - Conditional selecting behavior (linha Z)

✔ Applied:
  1. Extract Method
  2. Strategy Pattern

✔ Justification:
  - Refactoring Rule aplicada
  - Complexidade ciclomática reduzida

✔ Result:
  - Código refatorado
  - Testes preservados
```

---

## 🔄 Resumo Visual

```
┌──────────────────────────────────────────────────────────────┐
│                    FLUXO DE PROMPTS                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   start.md ──▶ (análise) ──▶ prd.md ──▶ task.md             │
│                                             │                │
│                                             ▼                │
│                                    plan-backend.md           │
│                                             │                │
│                                             ▼                │
│                                      IMPLEMENTAÇÃO           │
│                                             │                │
│                              ┌──────────────┴──────────────┐ │
│                              ▼                             ▼ │
│                         (concluído)              refactor.md │
│                                                    (loop)    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ❌ Erros Comuns a Evitar

| Erro | Consequência | Como Evitar |
|------|--------------|-------------|
| Pular `start.md` | AI ignora guardrail | SEMPRE começar com start.md |
| Implementar sem PRD | Retrabalho por falta de alinhamento | Seguir o fluxo na ordem |
| Tasks muito grandes | Difícil revisar e testar | Uma responsabilidade por task |
| Ignorar module contracts | AI acessa coisas internas | Ler `*.module.md` antes |
| Refatorar sem Transform Map | Mudanças não justificadas | Usar prompt de refactoring |
| Aplicar pattern sem necessidade | Over-engineering | Só aplicar quando há smell |

---

## 💡 Dicas Avançadas

### 1. Sessões longas
Se a sessão ficar muito longa, rode `start.md` novamente para "refrescar" o contexto.

### 2. Novos módulos
Ao criar um módulo novo:
1. Copie `.agent/templates/TEMPLATE_MODULE_CONTRACT.md`
2. Salve em `app/docs/modules/<nome>.module.md`
3. Copie `.agent/templates/TEMPLATE_DOMAIN_RULES.md`
4. Salve em `app/docs/domain/<aggregate>.rules.md`

### 3. Debug de problemas
Se a AI está "inventando" padrões:
1. Verifique se o guardrail foi carregado
2. Aponte explicitamente o documento que está sendo violado
3. Peça para a AI citar a regra antes de implementar

### 4. Refactoring guiado
Ao refatorar, peça sempre:
1. **Checklist de smells** — O que está errado?
2. **Transform Map** — O que será feito?
3. **Justificativa** — Qual regra está sendo aplicada?
4. **Validação** — Testes continuam passando?

---

## 📁 Estrutura de Arquivos

```
app/docs/
├── ai/
│   ├── guardrail.prompt.md      # Regras de enforcement
│   └── refactor-patterns.prompt.md  # Prompt para refactoring
├── adr/
│   └── *.md                     # Decisões arquiteturais
├── domain/
│   └── *.rules.md               # Regras de domínio
├── modules/
│   └── *.module.md              # Contratos de módulo
├── prd/
│   └── *.md                     # PRDs gerados
├── prompts/
│   ├── start.md                 # Fase 0 - Inicialização
│   ├── prd.md                   # Fase 2 - Criar PRD
│   ├── task.md                  # Fase 3 - Criar Tasks
│   ├── plan-backend.md          # Fase 4 - Criar Plan
│   ├── refactor.md              # Fase 6 - Refactoring
│   ├── workflow.md              # Visão geral do fluxo
│   └── tutorial.md              # Este arquivo
└── specs/
    └── 01_in_progress/          # Tasks em progresso

.agent/
├── standards/
│   ├── STANDARD_GENERAL.md      # Padrões gerais
│   ├── STANDARD_BACKEND.md      # Padrões backend
│   ├── STANDARD_FRONTEND.md     # Padrões frontend
│   ├── STANDARD_GITFLOW.md      # Padrões git
│   └── STANDARD_REFACTORING.md  # Regras de refactoring
├── templates/
│   └── *.md                     # Templates reutilizáveis
└── agents/
    └── *.md                     # Personas da AI
```

---

## ✅ Checklist de Sessão

Use este checklist em toda sessão:

```
□ Rodei start.md e recebi confirmação
□ Identifiquei os módulos afetados
□ Li os module contracts relevantes
□ Li as domain rules relevantes
□ Segui o fluxo na ordem correta
□ Revisei os artefatos gerados antes de aprovar
□ [Se refactoring] Recebi Transform Map com justificativas
```

---

## 🔧 Refactoring: Quando Aplicar Patterns

Use esta tabela como referência rápida:

| Contexto Observado | Design Pattern Recomendado |
|--------------------|---------------------------|
| Seleção de comportamento via if/switch | Strategy / State |
| Criação complexa de objetos | Builder / Factory |
| Hierarquia de objetos similar | Template Method |
| Operações em estrutura sem mudar estrutura | Visitor |
| Objetos pesados | Flyweight |
| Composição dinâmica | Decorator |
| Controle de instância única | Singleton |

**Regra de ouro:** Só aplique um pattern se houver um smell identificado. Pattern sem necessidade = over-engineering.

---

> **Lembre-se:** O objetivo do fluxo é **previsibilidade**. 
> Siga as fases na ordem e você terá código consistente com menos retrabalho.
