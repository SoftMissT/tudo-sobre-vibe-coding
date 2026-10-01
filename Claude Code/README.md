# Claude Code

> O que é o Claude Code, como configurá-lo e como trabalhar com ele: do zero ao workflow da Hive.

## O que é

**Claude Code** é o agente de código da Anthropic que roda no terminal (e no IDE): lê e edita arquivos, roda comandos, faz commits e navega o repositório seguindo instruções persistidas em arquivos de memória.

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| [`Claude.md`](./Claude.md) | **Workflow GSD completo**: 4 fases (Spec → Plan → Execute → Verify), comando "Pare e Pense", regras de subagentes |
| [`Configuração de Memória Persistente.md`](./Configura%C3%A7%C3%A3o%20de%20Mem%C3%B3ria%20Persistente.md) | Duas camadas de memória: 3 arquivos manuais (primer/.claude-memory/lessons) + memória nativa (`/memory`, `#`, `CLAUDE.md`, `.claude/rules/`) |
| [`Blueprints/`](./Blueprints/) | Blueprint "Seu Exército de IAs": Claude Code + Ollama + MAKO-MORI |
| [`Claude Skills/`](./Claude%20Skills/) | 7 skills prontas (arthur, mozart, blueprint, programacao, prompt-optimizer, writing-clearly) |

## Comece aqui (guia em 4 passos)

1. **Instale:** `npm install -g @anthropic-ai/claude-code` e rode `claude` na pasta do projeto.
2. **Memória:** crie o `CLAUDE.md` do projeto e siga o [guia de memória](./Configura%C3%A7%C3%A3o%20de%20Mem%C3%B3ria%20Persistente.md) (20 minutos resolvem).
3. **Workflow:** adote o protocolo do [`Claude.md`](./Claude.md): spec antes de código, prova antes de marcar `[x]`.
4. **Skills:** copie as skills de [`Claude Skills/`](./Claude%20Skills/) para `~/.claude/skills/` (ou `.claude/skills/` do projeto).

## Estados atuais do Claude Code (out/2026)

- **`CLAUDE.md` e `AGENTS.md`** são carregados nativamente (padrão: um ou outro; existe modo para os dois).
- **Slash commands e skills foram unificados**: skill = pasta com `SKILL.md` (frontmatter `name` + `description`).
- **Regras fatiadas** em `.claude/rules/*.md` com glob por arquivo.
- **Plugins** empacotam `commands/`, `agents/`, `skills/`, `hooks/` + `.claude-plugin/plugin.json`.

## Plugins

- **JEV: [`tamaratran/fast-jev-compaction`](https://github.com/tamaratran/fast-jev-compaction)** (~7 mil ⭐): substitui o resumo padrão da **compactação** de contexto por "Jev decisions"; cada tool call e resultado é **pontuado num request rápido**, o obsoleto é descartado/truncado e o que importa fica verbatim. Resultado: sessões longas sem perder o fio. Instale como plugin e use nos maratonas do workflow GSD (o `[x]` de tarefa grande depende do contexto sobreviver).

## Ver também

- Docs oficiais: <https://claude.com/docs/claude-code>
- Ecosistema: seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.
