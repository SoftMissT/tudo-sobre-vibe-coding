# Instalação por plataforma

A skill é uma pasta `tang-rou/` no formato aberto Agent Skills (`SKILL.md` + `references/`). A Soul (`references/TANG-ROU.soul.md`) viaja dentro dela e é carregada sempre.

| Plataforma | Como instalar |
|---|---|
| **Claude Code** | Copie a pasta para `~/.claude/skills/tang-rou/` (global) ou `.claude/skills/tang-rou/` (projeto). Subagentes opcionais: copie `platforms/claude-code/.claude/agents/` para `.claude/agents/` do projeto e reinicie o Claude Code se a pasta for nova. |
| **Claude (claude.ai, Desktop)** | Settings → Capabilities → Skills → envie o `tang-rou.skill` ou o zip da pasta. |
| **Codex** | Copie para `~/.agents/skills/tang-rou/` (global) ou `.agents/skills/tang-rou/` na raiz do repositório. Reinicie se não aparecer. |
| **opencode** | Funciona com `.opencode/skills/`, `~/.config/opencode/skills/`, `.claude/skills/` ou `.agents/skills/`. Instale em **um** desses lugares: o nome da skill precisa ser único entre todos eles. |
| **Manus** | Skills → **+ Add** → **Upload a skill** → envie o `tang-rou.skill`, o zip ou a pasta. Alternativa sem skill: cole `platforms/manus/profile-instruction.md` nas instruções do perfil e anexe `references/TANG-ROU.soul.md`. |
| **ChatGPT** | Se a sua conta tiver **Skills**, envie o zip da pasta. Se não tiver, crie um GPT ou Projeto: cole `platforms/chatgpt/instructions.md` em *Instructions* (cabe no limite de 8.000 caracteres) e envie `references/TANG-ROU.soul.md`, `antipatterns.md`, `foundry-api.md` e `templates.md` como arquivos de conhecimento. |

## Scripts de instalação

- Windows: `.\scripts\install.ps1 [-Targets claude,agents,opencode] [-Project] [-Hooks claude,codex,opencode]`
- Linux/macOS: `./scripts/install.sh [claude,agents,opencode] [--project] [--hooks claude,codex,opencode]`

Padrão: `claude` + `agents`. Aviso: o opencode lê `~/.claude/skills` **e** `~/.agents/skills`. Se usar opencode, escolha um único destino para evitar nome duplicado.

## Hooks: persona + memória persistente + lições

Os hooks mantêm a voz da TANG-ROU, injetam a memória no início de cada sessão (STATE e lições) e registram o fim da sessão. Eles só existem em agentes que têm hooks; nas outras plataformas a skill segue as mesmas regras por instrução.

| Agente | Mecanismo | Onde grava |
|---|---|---|
| **Claude Code** | `hooks` em `settings.json` (SessionStart, UserPromptSubmit, SessionEnd) | `~/.claude/settings.json` (ou `$CLAUDE_CONFIG_DIR`); com `--project`, `./.claude/settings.json` |
| **Codex** | mesmo formato, em `hooks.json` | `~/.codex/hooks.json` (ou `$CODEX_HOME`). Na primeira execução, aceite os hooks novos no TUI ("Trust all and continue") |
| **OpenCode** | plugin TypeScript carregado ao iniciar | `~/.config/opencode/plugins/tang-rou.ts`. Reinicie o OpenCode |

Instalar só os hooks, depois de a skill estar copiada:

- Linux/macOS: `scripts/install-hooks.sh [claude,codex,opencode] [--project]`
- Windows: `scripts\install-hooks.ps1 [-Targets claude,codex,opencode] [-Project]`

O instalador: pergunta uma vez se você usa Obsidian (e o caminho do vault); **faz backup** da configuração existente (`.bak-<data>`); mescla sem apagar hooks de terceiros e é idempotente (rodar de novo não duplica); e, sem `python3` nem `node`, imprime o trecho para colar. Nenhum caminho da máquina de quem escreveu a skill: tudo é calculado na sua máquina.

Desligar: `TANG_ROU_HOOKS=off` em `~/.tang-rou/config.env`, ou remova as entradas `tang-hook` da configuração do agente (e `tang-rou.ts` no OpenCode).

## Memória

- Sem Obsidian: `.tang-rou/` no projeto (STATE, lições) e `~/.tang-rou/` global (`$TANG_ROU_HOME` muda o caminho; no Windows, `%USERPROFILE%\.tang-rou`).
- Com Obsidian: informe o vault na primeira configuração; STATE e SDD vão para `<vault>/TANG-ROU/`.
- Detalhes: `references/memoria.md`.

## Opcionais

- **ai-memory** ([akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory)): memória de longo prazo entre agentes e máquinas. Se estiver instalado, o instalador de hooks avisa; para integrar, `ai-memory install-hooks --agent <claude-code|codex|opencode> --apply`. Coexiste com os hooks da TANG-ROU. Não é instalado automaticamente.
- **ai-usagebar** ([akitaonrails/ai-usagebar](https://github.com/akitaonrails/ai-usagebar)): painel/widget de desktop (Waybar, GNOME, KDE, bandeja) que mostra o consumo dos planos de IA. Não faz parte da skill; é uma ferramenta separada, instalada na sua máquina, se você quiser acompanhar uso.
- **fast-jev-compaction** ([tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction)): plugin do Claude Code que troca o resumo da compactação por poda de chamadas e resultados de ferramenta obsoletos (o texto fica literal). Só Claude Code 2.1.274+ (recurso experimental), exige chave da API TypeSafe e envia a conversa à TypeSafe: leia `references/compactacao.md` antes. Não é instalado automaticamente.
- **Context7**: servidor MCP que cada plataforma configura por conta própria. A skill funciona sem ele (cai para documentação oficial) e declara a lacuna.
- **GitNexus**: análise de impacto por grafo. Sem ele, a skill busca chamadores, hooks e flags no código.

## Pontos de atenção

- **ChatGPT recupera conhecimento por busca**, então não há garantia de que leia a Soul inteira a cada resposta; por isso o resumo da Soul também está dentro das instruções.
- **Teste dos hooks:** os scripts `sh` e o plugin TypeScript foram exercitados com payloads simulados. O `tang-hook.ps1` e o `install-hooks.ps1` (Windows) foram escritos para espelhar o `sh`, mas ainda não foram executados em Windows. Rode `install-hooks` e abra uma sessão para confirmar.
- Os hooks nunca bloqueiam o agente (qualquer falha termina em sucesso silencioso) e só escrevem em `.tang-rou/` e na pasta de memória global.
