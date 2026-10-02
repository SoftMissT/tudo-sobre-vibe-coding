---
type: requirements
status: draft
created: {{date}}
updated: {{date}}
tags: [sdd, requirements, product-requirements]
---

# Requirements: {{title}}

> [!info] Geração do conteúdo
> O corpo deste documento (introdução, metas, user stories, não-objetivos, métricas) deve ser produzido seguindo `references/prd.md`. Esta página é o **envelope Obsidian**: aplica frontmatter, requisitos em EARS e os wikilinks de rastreabilidade. Declara conformidade com a [[Constitution-{{title}}]].

## Clarifications
> [!question] Perguntas respondidas no passo de Clarify
> Registre aqui cada ambiguidade resolvida com o usuário, para não perder contexto.
- [ ] [Pergunta] → [Resposta acordada]

## 1. Introdução e Visão Geral
> [!abstract] Resumo Executivo
> Breve descrição da feature/projeto, o problema que resolve e o valor que entrega. Fonte primária de verdade para o "o quê".

### 1.1. Problema
Problema de negócio ou necessidade do usuário a ser resolvido.

### 1.2. Visão
Visão de longo prazo para esta feature/projeto.

## 2. Metas e Objetivos
Metas SMART (Specific, Measurable, Achievable, Relevant, Time-bound).

- **Meta 1**: [ex.: Aumentar engajamento em 15% em 3 meses.]
- **Meta 2**: [ex.: Reduzir tempo de processamento da transação X para < 2s.]

## 3. User Stories
Formato "Como [persona], eu quero [ação] para que [benefício]", com critérios de aceitação verificáveis.

### US-001: [Título]
**Descrição**: Como [persona], eu quero [ação] para que [benefício].

**Critérios de Aceitação**:
- [ ] Critério verificável 1.
- [ ] Critério verificável 2.

## 4. Requisitos Funcionais (notação EARS)
> [!note] Use EARS para todo requisito funcional
> Padrões: Ubiquitous · Event-Driven (`When`) · State-Driven (`While`) · Unwanted Behavior (`If/then`) · Optional Feature (`Where`). Ver `references/sdd/ears-notation.md`.

### Ubiquitous
- **RF-001**: The system shall [propriedade sempre verdadeira].

### Event-Driven
- **RF-002**: When [gatilho], the system shall [resposta].

### Unwanted Behavior
- **RF-003**: If [condição indesejada], then the system shall [resposta].

## 5. Requisitos Não Funcionais

| ID | Descrição | Categoria | Prioridade |
| :--- | :--- | :--- | :--- |
| RNF-001 | The system shall responder a requisições em < 500ms. | Performance | Alta |
| RNF-002 | Todos os dados sensíveis DEVEM ser criptografados em repouso e em trânsito. | Segurança | Crítica |

## 6. Não-Objetivos (Out of Scope)
O que esta feature/projeto explicitamente NÃO incluirá.

- Não será implementado: [ex.: Suporte a múltiplos idiomas na v1.]

## 7. Glossário
- **Termo A**: Definição.

## 8. Perguntas Abertas
- [ ] [Pergunta]?

---
**Conformidade**: este documento adere à [[Constitution-{{title}}]].

**Documentos Relacionados**:
- [[Constitution-{{title}}]]
- [[PDR-{{title}}]]
- [[Blueprint-{{title}}]]
- [[Specs-{{title}}]]
