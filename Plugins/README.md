# Ecossistema de Plugins de agentes

[← Tudo Sobre Vibe Coding](../README.md)

> Todo mundo agora distribui capacidade como plugin. Compare os cinco sistemas que existem hoje, saiba o que migra dos GPTs (e o que não migra) e descubra o único formato que é realmente portável.

## O que é um plugin (e o que não é)

Uma **skill** é um `SKILL.md` com instruções que o agente carrega quando precisa. Um **plugin** é o pacote ao redor: skills + comandos + subagentes + hooks + conexões MCP, com manifest próprio e canal de distribuição. Cada plataforma inventou seu manifest; não existe conversão oficial entre eles.

## Tabela comparativa (10/2026)

| | Manifesto | Unidade | Distribuição | Invocação |
|---|---|---|---|---|
| **Claude Code** (Anthropic) | `.claude-plugin/plugin.json` | plugin (bundle) | marketplace em git/HTTPS/npm | `/plugin:skill`, `/plugin:cmd` |
| **Codex** (OpenAI) | `.codex-plugin/plugin.json` | skill (`SKILL.md`) ou plugin | plugin browser + `codex plugin marketplace add` | `$skill`, `@plugin` |
| **GPTs → OpenAI** | plugin (sucessor do GPT) | plugin privado → submissão pública | migração assistida no produto | `@` ou automático |
| **DeepSeek dsh** | `package.json` + `cordis.patch.yml` | plugin Cordis (JS/TS) | npm, topic `dsh-plugin` | config/profile |
| **Gemini CLI** (Google) | `gemini-extension.json` | extension | `gemini extensions install <url>` | `/cmd`, skills, MCP |

**Portabilidade:** o único formato transversal hoje é a **skill `SKILL.md`** ([agentskills.io](https://agentskills.io), suportado por Claude Code, Codex, Cursor, Gemini CLI e OpenCode). O manifest de plugin é proprietário em cada plataforma.

## Claude Code: instalar e criar

```bash
/plugin marketplace add anthropics/claude-plugins-community   # ou owner/repo ou ./caminho
/plugin install <nome>@claude-community                      # escolhe o escopo no painel

claude plugin init meu-plugin --with skills hooks             # scaffolding oficial
claude --plugin-dir ./meu-plugin                              # teste local
```

Estrutura mínima: `meu-plugin/.claude-plugin/plugin.json` (`{"name":"meu-plugin","version":"1.0.0"}`) + `meu-plugin/skills/minha-skill/SKILL.md` com frontmatter `name` e `description`. Só o `plugin.json` entra dentro de `.claude-plugin/`. Instalação copia para `~/.claude/plugins/cache`; escopos: user, project, local. Comunidade: `anthropics/claude-plugins-community` (pinado por SHA).

## Codex: skill local x plugin

- **Skill local**: crie `.agents/skills/minha-skill/SKILL.md` com frontmatter `name` + `description`; detectado automaticamente (reinicie se não aparecer). Descoberta: `$CWD/.agents/skills` (e pais), `$HOME/.agents/skills`, `/etc/codex/skills`.
- **Plugin**: `my-plugin/.codex-plugin/plugin.json` com `name`, `version`, `description`, `skills`, `mcpServers`, `apps`, `hooks`; marketplace via `codex plugin marketplace add owner/repo`; enable/disable em `~/.codex/config.toml` (`[plugins."gmail@openai-curated"] enabled = false`).
- Plugins Codex são universais: funcionam no ChatGPT (web/desktop/mobile) e no Codex (desktop/CLI) com o mesmo pacote.

> Verificação pendente: docs atuais citam `.agents/skills` como escopo do repositório; `~/.codex/skills` aparece em instaladores antigos e no repo openai/codex. Confirme no seu ambiente.

## OpenAI: migração dos GPTs para plugins (até 11/12/2026)

| | |
|---|---|
| **Prazo** | GPTs customizados aposentados em **11/12/2026** (Enterprise com deferral aprovado: 11/02/2027; criação de novos GPTs Enterprise congela 26/10/2026) |
| **Migra** | instruções → skill do plugin; arquivos de conhecimento → reference files; apps conectados → apps do plugin |
| **Não migra** | modelo escolhido do GPT, conversas existentes, **custom actions** (exigem novo MCP server manual), settings de compartilhamento |
| **Depois da migração** | o GPT original vira read-only e só existe até a aposentadoria; usa a última versão *publicada* (rascunhos não migram) |

Passo a passo oficial: [help.openai.com/en/articles/20001519](https://help.openai.com/en/articles/20001519) e [learn.chatgpt.com/docs/migrate-custom-gpts](https://learn.chatgpt.com/docs/migrate-custom-gpts). Guia local: [Meus GPTS](../Meus%20GPTS/README.md#guia-de-migração-gpts--plugins-11122026).

## DeepSeek dsh: "everything is a plugin"

No harness `dsh`, **tudo** é plugin Cordis: adaptador de modelo, registry de tools, log de sessão, o próprio agent loop, UI, sandbox, storage e skills. O kernel Cordis só monta e desmonta plugins; não existe core privilegiado. Composição em camadas: profiles (web, headless, sdk) → bundles (`dsh.profile`/`dsh.bundle` no `package.json`) → `cordis.patch.yml` → overlays `--patch`.

```bash
npx @deepseek-ai/dsh web   # Web UI em 127.0.0.1:3080
```

Developer preview com breaking changes; pacote MIT (`@deepseek-ai/dsh`). Guia local: [DeepSeek Harness](../DeepSeek%20Harness/README.md).

## Gemini CLI: extensions

Diretório com `gemini-extension.json` em `~/.gemini/extensions/`; empacota prompts, MCP servers, comandos, temas, hooks e skills (`skills/<nome>/SKILL.md`).

```bash
gemini extensions install <github-url|path>   # instalar
gemini extensions link <path>                 # desenvolvimento local
```

> Atenção: o Google anunciou a substituição do Gemini CLI por **Antigravity CLI** para contas free/Google One desde 18/06/2026 [verificar escopo da migração].

## Cursor

Sem "plugin system" documentado equivalente; extensibilidade via MCP, `.cursor/rules` e comandos [verificar em docs.cursor.com antes de seguir qualquer tutorial].

## Decisão rápida

| Você quer | Faça |
|---|---|
| Uma instrução/receita reutilizável em qualquer CLI | **Skill `SKILL.md`** (formato aberto) |
| Distribuir um bundle para a sua equipe no Claude Code | **Plugin + marketplace** |
| Substituir um GPT antes de 11/12/2026 | **Migração oficial GPTs → plugin** |
| Estudar arquitetura onde tudo é plugin | **dsh** |
| Extensão para o Gemini CLI | **extension** |

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| `README.md` | Este guia |

## Ver também

- Docs: [Claude Code plugins](https://code.claude.com/docs/en/plugins/create) · [Codex plugins](https://developers.openai.com/codex/plugins) · [Codex skills](https://developers.openai.com/codex/skills) · [Gemini extensions](https://geminicli.com/docs/extensions/reference)
- Guias locais: [Codex](../Codex/README.md) · [Dots](../Dots/README.md) · [DeepSeek Harness](../DeepSeek%20Harness/README.md) · [MCP na prática](../MCP/README.md) · [Claude Code](../Claude%20Code/README.md)
- Seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.

> Pesquisa e fontes verificadas em 01/10/2026. Itens marcados com `[verificar]` não puderam ser confirmados na fonte primária.
