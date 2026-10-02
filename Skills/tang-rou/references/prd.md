# PRD — Documento de Requisitos de Produto

Use para planejar uma feature ou projeto antes de implementar ("crie um PRD", "especifique", "requisitos de"). **Não implemente: só gere o PRD.** Dentro da SDD, este é o conteúdo da fase Requirements (`references/sdd/sdd.md`).

Fonte: adaptação da skill `prd`.

## O trabalho

1. Receba a descrição da feature.
2. Faça 3 a 5 perguntas essenciais, com opções letradas.
3. Gere o PRD estruturado a partir das respostas.
4. Salve em `tasks/prd-<feature>.md` (kebab-case), ou na pasta da feature da SDD.

## Perguntas

Pergunte só o que a descrição deixa ambíguo: problema/meta, funcionalidade central, escopo (o que NÃO fazer), critério de pronto. Formato que o operador responde em "1A, 2C":

```
1. Qual a meta principal?
   A. Automatizar uma ação manual da mesa
   B. Corrigir comportamento quebrado
   C. Nova interface (ficha, diálogo, HUD)
   D. Outro: [especifique]

2. Qual a versão-alvo do Foundry e do sistema de jogo?
   A. v13 + dnd5e
   B. v12
   C. Outro: [especifique]
```

## Estrutura do PRD

1. **Introdução/Visão geral:** o que é e que problema resolve.
2. **Metas:** objetivos específicos e mensuráveis.
3. **User stories** (cada uma cabe em uma sessão focada):
   ```
   ### US-001: <título>
   **Descrição:** Como <usuário>, quero <recurso> para <benefício>.
   **Critérios de aceitação:**
   - [ ] critério específico e verificável
   - [ ] lint/typecheck/testes passam (se o projeto tem)
   - [ ] **[stories de UI]** verificado no Foundry (roteiro curto de teste manual)
   ```
   Critério vago ("funciona direito") é ruim; "o botão abre um diálogo de confirmação antes de apagar" é bom.
4. **Requisitos funcionais:** numerados, explícitos (`RF-1: O sistema deve…`). Na SDD, em EARS.
5. **Não-objetivos:** o que não entra. Controla escopo.
6. **Considerações de design** (opcional): UI/UX, componentes reaproveitáveis.
7. **Considerações técnicas** (opcional): versão e camada (core/system/módulo), dependências, performance, pontos de integração.
8. **Métricas de sucesso:** como saber que deu certo.
9. **Perguntas em aberto.**

## Escreva para um júnior ou para um agente

Explícito e sem ambiguidade; sem jargão (ou explique); detalhe suficiente para entender propósito e lógica central; requisitos numerados; exemplos concretos.

## Checklist antes de salvar

- [ ] Perguntas com opções letradas feitas e respostas incorporadas
- [ ] User stories pequenas e específicas
- [ ] Requisitos funcionais numerados e sem ambiguidade
- [ ] Não-objetivos definem fronteira
- [ ] Salvo no caminho certo
