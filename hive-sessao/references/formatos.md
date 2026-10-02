# Formatos de gravação

Regra geral: **leia o arquivo-alvo e copie a convenção que ele já usa.** Os modelos abaixo vêm de arquivos reais da Hive (`Memory.rar`, `Skill_Registry.md`, `STATUS.md` e scripts, lidos em 2026-10-01) e valem como padrão. A Hive tem drift de formato entre agentes; na dúvida, siga o arquivo.

## Frontmatter de nota nova

```yaml
---
title: "<título>"
created: "<AAAA-MM-DD>"
last_updated: "<AAAA-MM-DD>"
status: active
maturity: permanent
type: sistema
tags: [hive/memory, <agente>, <projeto>]
agents_allowed: ["ALL"]
---
```

Termine notas novas com `## Conexões` e wikilinks para arquivos que existem.

## L0 — `Memory/shared/L0_working_memory.md`

Blocos H2 em português; as sessões mais novas foram **acrescentadas no fim** (as do começo do arquivo são mais antigas). Acrescente no fim.

```markdown
## AAAA-MM-DD — <Projeto> <versão> — <tema> — sessão aberta
- Cliente: <claude|codex|opencode|antigravity>. Baseline: <commit/tag se souber>.
- Skills: hive-sessao (observada)

## AAAA-MM-DD — <Projeto> <versão> — <tema> — sessão encerrada
- Release/entrega: ...
- Decisão: ... (motivo)
- Gate: <o que rodou e resultado>. Foundry/runtime pendente quando não rodou.
- Skills: <skill> (origem), ...
- ai-memory handoff: <id, se existir>
- Próximo gate: ...
```

Os marcadores `[SESSION START|END]` eram do `open-mem-to-hive.ps1`, inerte desde 2026-08-26; não use.

## STATUS — `Memory/shared/STATUS.md`

Sem ordem única: blocos novos foram inseridos no topo (abaixo do `# 00_STATUS.md`) **e** outros acrescentados no fim. Escolha desta skill: inserir no topo, mais novo primeiro, e atualizar `last_updated` do frontmatter. Formato recente:

```markdown
## AAAA-MM-DD — <Projeto> <versão> (<tema>) — sessão encerrada

- **Souls:** @MAKO-MORI (coordenação) + @TANG-ROU (execução Foundry).
- **Projeto:** `<slug>` — <uma linha>.
- **Baseline:** `<tag>`, commit `<hash>`; release/`/latest` verificado (só se verificou).
- **Entrega:** ...
- **Gate:** <resultado>.
- **Aberto:** QA runtime no Foundry com o operador; não declarado como validado.
- **Próximo:** ...
```

## `000-log.md` (formato do `session-close.ps1`)

```markdown
## [AAAA-MM-DD] session | <Nome> encerrado
- Hora: HH:mm
- Resumo: <uma frase>
```

O `hive-status.ps1` lê a última linha que casa `^\s*## \[`. Se você escrever à mão, acrescente `- Skills: <lista>`.

## Arquivo da sessão (gerado pelo `session-close.ps1`)

`Memory/archive/<AAAA>/<MM>/<yyyyMMdd-HHmmss>-<nome-minúsculo>-session.md`. Frontmatter: `type: session-archive`, `project`, `created`, `status: archived`, `tags: [session, archive, hive]`. Corpo: `# Sessão: <Nome> <data> <hora>`, `- **Resumo:**`, `- **Projeto:** [[knowledge/projects/<Nome>/_index]]`, `- **Estado coletivo:** [[Memory/shared/STATUS]]`, `---` e o L0 inteiro.

## `last_updated` do STATE

O script só troca a linha `last_updated: "..."` (e só se existir). Mantenha essa chave no frontmatter.

## Wings

**Roteador `Memory/wings/<agente>/STATE.md`**: só roteamento. Atualize no frontmatter `active_project`, `project_memory` (`Memory/wings/<agente>/projects/<slug>/`), `last_updated`, e em `## Roteamento atual` a linha `- Sessão: <data> — <resumo e próximo passo>`. Não coloque histórico aqui.

**Índice `Memory/wings/<agente>/diary.md`**: uma linha por projeto na tabela. Atualize a do projeto, sem criar sessão nova no corpo:

```markdown
| `<slug>` | <Entradas +1> | [AAAA-MM-DD] <título curto> — <versão ou resultado> | [[Memory/wings/<agente>/projects/<slug>/diary|diário]] |
```

(Na MAKO-MORI alguns projetos apontam o link para `STATE` em vez de `diary`; mantenha o que já está.)

**Diário do projeto, MAKO-MORI** (`projects/<slug>/diary.md`): tabela `| Data | Entrada |`; acrescente uma linha antes de `## Conexões`:

```markdown
| [AAAA-MM-DD] | <Título> — <o que foi feito, decisão, próximo gate; skills usadas> |
```

**Diário do projeto, TANG-ROU**: blocos narrativos com voz própria:

```markdown
## [AAAA-MM-DD] — <título>

**O que foi feito:**
- ...

**Pendências:**
- ...

**Observações:**
- ...

*"<frase de encerramento da persona>"*
```

**STATE do projeto na wing** (`projects/<slug>/STATE.md`): bullets de estado (`**Baseline publicada:**`, gates, riscos). Atualize só o que mudou e `last_updated`.

## `system/Skill_Registry.md`

```markdown
## Skills de <tema> (missão <nome> — AAAA-MM-DD)

| Skill | Path físico | Propósito |
|---|---|---|
| `<skill>` | `C:\Users\monge\.opencode\skills\<skill>\SKILL.md` | <uma linha> |

Missão: <o que, em qual projeto>. Projeto Hive: `<slug>`.
```

Locais já usados no registro: `C:\Users\monge\.opencode\skills\` e `C:\Users\monge\.agents\skills\`. Para a própria `hive-sessao`, o path depende de onde Nelson a instalar; escreva `(path não verificado)` até confirmar.

## `Memory/shared/SKILLS-USADAS.md`

```markdown
# Skills usadas na Hive

Inventário: [[system/Skill_Registry]].

## Acumulado
| Skill | Sessões | Última vez | Projetos | Para quê |
|---|---:|---|---|---|

## Registro por sessão (append-only)
## [AAAA-MM-DD] <projeto> | <cliente>
- <skill> (observada|informada|inferida): <para quê>
```

## `Memory/shared/CHANGELOG.md` (entrada no topo)

```markdown
## [AAAA-MM-DD] <AGENTE> — <Projeto> <versão> · <tema>

**Tipo:** feature | correção | ...
**Projeto:** `<slug>`
**Mudança:** ...
**Validação:** <o que rodou>; QA runtime pendente quando for o caso.
```

## `system/MEMORY.md` global (L1)

Seções: `## Sessões Recentes (open-mem)` (regravada pelo script, não toque) e `## Log de Atualizações` (onde acrescentar). ~2.200 caracteres.

## Registro de erro (para `lessons.md`)

```markdown
- **Erro:** ...
- **Causa:** ...
- **Correção:** ...
- **Regra preventiva:** ...
```

## Conversas arquivadas (não escreva aqui)

Bruta: `src/conversations/<cliente>/<AAAA>/<MM>/`. Normalizada: `wiki/conversations/transcripts/<AAAA>/<MM>/<data>-<cliente>-<workspace>-<hash12>.md`. Controle: `Memory/conversations/` (`queue/`, `logs/archive.jsonl`, `archive-ledger.jsonl`, `graphify-pending.json`).
