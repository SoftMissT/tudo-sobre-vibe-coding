# SDD — Spec-Driven Development

Na SDD a **especificação é o artefato e o código é o resultado da compilação**. Em tarefa grande, isso troca "vibe coding" por uma cadeia de documentos em que cada um restringe e valida o próximo. Roda depois do brainstorming (`references/brainstorming.md`) quando a feature merece specs; não use para correção pequena.

Esta é a versão portátil da skill `sdd-obsidian`: ela funciona com ou sem Obsidian, e não depende de outras skills instaladas. Os templates ficam em `references/sdd/templates/` (constitution, requirements, pdr, research, blueprint, specs, state). A notação EARS está em `references/sdd/ears-notation.md`: **leia antes de escrever requisitos funcionais**.

## Onde os arquivos ficam

| Config da memória | Pasta da feature | Formato |
|---|---|---|
| `OBSIDIAN_VAULT` definido | `<vault>/TANG-ROU/SDD/<feature>/` | Obsidian (frontmatter, wikilinks, callouts; veja `references/obsidian.md`) |
| Sem Obsidian, com projeto | `<projeto>/.tang-rou/sdd/<feature>/` | Markdown simples; troque `[[Nota]]` por links relativos `[Nota](Nota.md)` e `> [!tipo]` por `> **Tipo:**` |

Nomes: `STATE-<feature>.md`, `Constitution-<feature>.md`, `Requirements-<feature>.md`, `PDR-<feature>.md`, `Research-<feature>.md`, `Blueprint-<feature>.md`, `Specs-<feature>.md`. Substitua `{{title}}` e `{{date}}` dos templates. Sem pasta de memória configurada ainda: siga `references/memoria.md` (pergunta de Obsidian) antes de criar arquivos.

## Pipeline com gates

```
Constitution → Requirements → PDR → Research → Blueprint → Specs → Analyze
     ✋            ✋          ✋       ✋          ✋         ✋       ✋
              (STATE atualizado a cada gate cruzado)
```

**Gate: nunca atravesse sem aprovação explícita do operador.** Antes de cada fase e antes de avançar, pare e confirme. O motivo: spec errada aprovada sem olhar vira código errado em escala.

### Clarify (antes de cada artefato)
Varredura de ambiguidade; no máximo **5 perguntas**, uma de cada vez ou em bloco com opções letradas (`1A, 2C`). Cubra escopo, modelo de domínio, fluxo de uso, não-funcionais, integrações, bordas, restrições, terminologia e sinal de pronto. Grave as respostas em `## Clarifications` do próprio documento. Separe fato de inferência; incerteza é dita.

### Constitution (princípios inegociáveis)
5 a 9 artigos, cada um uma regra verificável. Requirements, Blueprint e Specs declaram conformidade. Para Foundry, típico:
- versão-alvo do Foundry, do game system e dos módulos (e a política de compatibilidade);
- camadas (core, system, módulo) e o que cada uma pode tocar;
- sem IDs de world hardcoded; permissões respeitadas; sem CSS/Handlebars sem pedido;
- como se testa (testes que existem, roteiro de teste no Foundry quando não há runtime);
- convenções de nome, flags e namespaces.

### Requirements (o quê e para quem)
Conteúdo conforme `references/prd.md` (metas, user stories com critérios de aceitação, não-objetivos, métricas). **Requisitos funcionais em EARS.**

### PDR — Product Design Record (como é o produto/UX)
Personas, jornada, fluxos de interação, requisitos de UI. Cada decisão em ADR-lite: Contexto → Alternativas → Decisão → Implicações.

### Research (documentação atual antes de decidir)
Conhecimento de treino envelhece, e spec em cima de API antiga gera código quebrado. Antes do Blueprint e das Specs: liste as bibliotecas/APIs tocadas; busque a documentação **atual** (Context7: resolver ID, uma consulta por conceito; senão, docs oficiais por busca); grave em `Research-<feature>.md`: versão verificada, data da consulta, fonte e o trecho relevante **literal**. Blueprint e Specs citam o Research ao justificar escolha técnica. O que não foi verificado é dito como inferência ("com base no conhecimento de treino, sujeito a confirmação").

### Blueprint (como é a construção)
Conteúdo conforme `references/blueprint.md`, mais: diagrama Mermaid da arquitetura (sem Obsidian, deixe o bloco `mermaid`; ele renderiza em GitHub e em visualizadores comuns) e vínculo de cada componente aos Requirements que ele atende.

### Specs (o manual de construção)
APIs (entrada/saída), modelo de dados, lógica detalhada, casos de teste, segurança/performance, débito técnico, e a **matriz de rastreabilidade**:

| Requisito | Componente (Blueprint) | Spec | Caso de Teste |
|---|---|---|---|
| RF-001 | Blueprint#componente | §2.1 | CT-001 |

Requisito sem componente é lacuna de implementação. Componente sem requisito é escopo não pedido. Sinalize os dois.

### Analyze (validar consistência, só leitura)
Cruza Constitution, Requirements, Blueprint e Specs: duplicação, ambiguidade, subespecificação, violação da constituição, lacunas de cobertura. Reporta por severidade; **não edita sem aprovação**. Rode antes de declarar as specs prontas para implementar.

## Comandos

- **Iniciar feature:** pipeline completo da Constitution em diante, gate por gate. Cria o `STATE` no primeiro gate.
- **Retomar feature** ("continuar a feature X"): leia **só** `STATE`, depois `Constitution`, depois o documento da fase ativa que o STATE aponta. Pare aí. Anuncie fase atual, último gate aprovado e próximo passo, e confirme antes de seguir. Sentiu falta de contexto? O defeito está no STATE: corrija o STATE.
- **Atualizar artefato:** refine e **propague**: se um Requirement muda, sinalize o que revisar no Blueprint e nas Specs; registre no STATE.

## STATE (memória da feature)

Atualize em: gate cruzado (fase, data, decisões), decisão relevante (uma linha com porquê), bloqueio (com próximo passo exato), correção do operador (em `## Lições`; releia ao retomar), fim de sessão (`proximo_passo` sempre preenchido). Camadas de carga: STATE e Constitution sempre ao retomar; fase ativa sob demanda; artefatos de fases já aprovadas e Research só por busca.

## Depois das specs

A implementação segue o pipeline normal do `SKILL.md` §4, uma tarefa por vez, com `references/orquestracao.md` quando houver tarefas independentes. Sem verificação contra as Specs, a feature não está pronta.
