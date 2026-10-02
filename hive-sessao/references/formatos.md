# Formatos de gravação

Regra geral: **leia o arquivo-alvo antes de escrever e siga a convenção que ele já usa.** Os modelos abaixo são o padrão quando o arquivo é novo ou não tem convenção visível. Fontes: BRAIN.md v7.1 e o documento "Hive, MAKO-MORI e os sistemas de memória" (2026-10-02). Detalhes não vistos nesses arquivos estão marcados como *a confirmar*.

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

```markdown
## [YYYY-MM-DD] [sessão] | <título curto>
Projeto: <slug> · Cliente: <cliente> · Agentes: <lista>
Feito: <1-2 linhas>. Skills: <lista>. Pendências: <1 linha>.
```

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
