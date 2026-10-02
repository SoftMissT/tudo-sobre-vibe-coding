# Formatos de gravação

Regra geral: **leia o arquivo-alvo antes de escrever e siga a convenção que ele já usa.** Os modelos abaixo são o padrão quando o arquivo é novo ou não tem convenção visível. Fontes: BRAIN.md v7.1, o documento "Hive, MAKO-MORI e os sistemas de memória" (2026-10-02) e os scripts `session-close.ps1`, `new-project.ps1`, `link-start.ps1`, `hive-status.ps1`, `conversation-archive.ps1` e `conversation-index.ps1`. Detalhes que nenhuma dessas fontes mostra (STATUS.md, diários das wings) estão marcados como *a confirmar*.

## Frontmatter padrão de nota nova

```yaml
---
title: "<título>"
created: "<YYYY-MM-DD>"
updated: "<YYYY-MM-DD>"
status: "active"
maturity: "reference"
type: "registro de sessão"
tags:
  - "#hive"
  - "#sessao"
  - "#skills"
agents_allowed: ["ALL"]
---
```

Termine notas novas com a seção `## Conexões` e wikilinks reais (ex.: `[[BRAIN]]`, `[[Memory/shared/STATUS]]`).

## `Memory/shared/SKILLS-USADAS.md` (caminho escolhido por esta skill; *a confirmar com Nelson*)

```markdown
# Skills usadas na Hive

## Acumulado
| Skill | Sessões | Última vez | Projetos | Para quê |
|---|---:|---|---|---|
| hive-sessao | 1 | 2026-10-02 | tudo-sobre-vibe-coding | abrir/fechar sessão |

## Registro por sessão (append-only)
## [2026-10-02] tudo-sobre-vibe-coding | claude-code
- hive-sessao (observada): abertura e fechamento
- skill-creator (observada): criação da skill
- <skill> (informada): <motivo>
```

## Linha de `000-log.md`

Formato real do `session-close.ps1` (confirmado no script). O `hive-status.ps1` lê a última linha que casa `^\s*## \[`, então mantenha esse prefixo:

```markdown
## [YYYY-MM-DD] session | <Nome> encerrado
- Hora: HH:mm
- Resumo: <uma frase>
```

Se você mesma escrever a entrada (sem o script), acrescente uma linha `- Skills: <lista>` ao final. Outros tipos em uso: `feat` (criação de projeto, via `new-project.ps1`).

## Arquivo de sessão (gerado pelo `session-close.ps1`, para referência)

Caminho: `Memory/archive/<yyyy>/<MM>/<yyyyMMdd-HHmmss>-<nome-minúsculo>-session.md`. Frontmatter: `type: session-archive`, `project`, `created`, `status: archived`, `tags: [session, archive, hive]`; corpo: Resumo, link `[[knowledge/projects/<Nome>/_index]]`, link `[[Memory/shared/STATUS]]`, e o L0 inteiro.

## `last_updated` do STATE

O script só troca a linha `last_updated: "..."` do frontmatter (e só se ela existir). Mantenha essa chave no formato `last_updated: "YYYY-MM-DD"`, que também é o que o `hive-status.ps1` lê.

## Diário de wing (`Memory/wings/<agente>/diary.md`)

```markdown
### [YYYY-MM-DD] <projeto> | <título>
- Feito: ...
- Decisões: ... (motivo)
- Skills usadas: <skill> (origem), ...
- Próximo passo: ...
```

Use o mesmo bloco em `projects/<slug>/diary.md`, com mais detalhe. Se a sessão foi só coordenação, o agente é `mako-mori`; execução Foundry/macros, `tang-rou`. *Nome exato das pastas a confirmar lendo `Memory/wings/`.*

## Linha de `Memory/shared/STATUS.md`

Uma linha por sessão: `YYYY-MM-DD · <projeto> · <resultado> · gates pendentes: <lista ou nenhum>`. *Se o arquivo tiver tabela ou seções, insira na estrutura existente.*

## Registro de erro (para `tasks/lessons.md`)

```markdown
- **Erro:** ...
- **Causa:** ...
- **Correção:** ...
- **Regra preventiva:** ...
```

## `STATE.md` do projeto

Atualize só os campos que mudaram (fase, último marco, gates, riscos, próximo passo). Não reescreva o arquivo inteiro.
