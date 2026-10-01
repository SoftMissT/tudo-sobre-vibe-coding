# Codex

> O agente de código da OpenAI rodando no seu terminal: instalação, `AGENTS.md`, skills e plugins.

## O que é

**Codex CLI** é o agente de código open-source da OpenAI (Apache-2.0) que roda local: lê/edita arquivos, roda comandos e faz commit. Ele existe em 4 surfaces: **CLI** (terminal), **IDE** (VS Code/Cursor/Windsurf), **app desktop** (`codex app`) e **Codex Web** (nuvem, `chatgpt.com/codex`).

## Comece aqui (guia em 4 passos)

1. **Instale** (uma destas):

   ```bash
   # macOS / Linux
   curl -fsSL https://chatgpt.com/codex/install.sh | sh

   # Windows (PowerShell)
   powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"

   # ou via package manager
   npm install -g @openai/codex     # brew install --cask codex
   ```

2. **Entre:** rode `codex` → **Sign in with ChatGPT** (planos Plus/Pro/Business: inclui uso do Codex) ou configure uma API key.
3. **Projeto:** dentro da pasta do repo, rode `codex` e use **`/init`** → ele gera o `AGENTS.md` do projeto (memória/instruções que o Codex lê sempre).
4. **Trabalhe:** descreva a tarefa; aproveita o `AGENTS.md` + arquivos `.md` do repo como contexto.

## Estados atuais do Codex (out/2026)

- **`AGENTS.md`** é a memória padrão (padrão aberto, lido por vários agentes). `codex` lê o do projeto e sobe pelos diretórios-pai.
- **Skills:** `./.codex/skills/` (projeto) e `~/.codex/skills/` (global): pasta com `SKILL.md`, mesma estrutura do Claude Code. Dá pra instalar de repositórios com `npm i -g skillmds` + `skillmd add <owner>/<repo> -a codex`.
- **Plugins:** `codex /plugins` (milhares de pacotes com comandos/skills/MCP).
- **Automação:** `codex exec "tarefa"` roda não-interativo (CI/script); modos de aprovação controlam o quanto ele age sozinho.
- **MCP:** conecta servidores MCP pra puxar contexto externo.

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| `README.md` | Este guia |

## Como encaixa no fluxo GSD

- `AGENTS.md` do repo = onde o protocolo do [GSD](../GSD%202/README.md) e as regras da casa ficam para o Codex.
- Skills de [`Claude Skills/`](../Claude%20Code/Claude%20Skills/) são compatíveis em formato (`SKILL.md`): copie para `.codex/skills/`.

## Ver também

- Docs: <https://developers.openai.com/codex> · Repo: <https://github.com/openai/codex>
- Ecosistema: seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.
