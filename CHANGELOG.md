# Changelog

Todas as mudanças notáveis deste repositório.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [1.2.0] - 2026-10-01

### Adicionado

- `Ollama/check_local_llm.py`: benchmark de requisitos em Python (stdlib, **sem download**) — CPU/RAM/VRAM/disco → modelos Ollama que o PC roda (GPU vs CPU) + `--self-test`
- Guias `Ollama/README.md`, `Codex/README.md` e `DeepSeek Harness/README.md` (instalação, comandos, encaixe no fluxo)
- `Dots/README.md`: guia dos agentes always-on da OpenAI (DevDay 29/09/2026, GPT-6 Astra) com riscos e comparativo Dots x GPTs x Plugins x Codex
- `Meus GPTS/README.md`: guia de migração GPTs → plugins (aposentadoria 11/12/2026; modelo não migra, original fica read-only)
- `Claude Code/README.md`: seção Plugins com o JEV (compactação por pontuação de tool calls)
- README raiz: subseção "Harnesses e Execução Local" + aviso de migração na seção dos GPTs

### Atualizado

- "Como começar" cita os novos guias de pasta (Codex, DeepSeek Harness, Ollama, Dots)

## [1.1.0] - 2026-10-01

### Adicionado

- Guia `GSD 2/README.md` com o estado atual do GSD (`open-gsd/gsd-pi`, `gsd-core`, comandos e workflow)
- `Claude Code/Configuração de Memória Persistente.md` — guia das duas camadas de memória (3 arquivos manuais + `/memory`, `#`, `CLAUDE.md`, `.claude/rules/`)
- READMEs-guia explicando e orientando em `Claude Code/`, `Foundry/` e `Geração de imagens/`
- 11 repositórios novos no ecossistema: `open-gsd/gsd-pi`, `open-gsd/gsd-core`, `affaan-m/ECC`, `tamaratran/fast-jev-compaction`, `supermemoryai/supermemory`, `RyanCodrai/turbovec`, `nexu-io/open-design`, `eugeniughelbur/obsidian-second-brain`, `NamVr/DiscordBot-Template`, `Mini-Kraken/Bot-Template`, `dice-roller/rpg-dice-roller`
- Seções **Design e Mídia com Agentes** e **Automação e Bots** no README

### Atualizado

- Frota de 5 → **21 agentes** no README e na landing page (lista completa, stats e grid em 2 colunas)
- Links do GSD → `open-gsd/gsd-pi` (o antigo `gsd-build/gsd-2` foi movido)
- `safishamsi/graphify` → `Graphify-Labs/graphify` e `everything-claude-code` → `ECC` (renomeações oficiais)
- `Claude Code/Claude.md` com o Claude Code atual: `AGENTS.md`, `.claude/rules/`, skills = slash commands
- Banners da Hive e dos GPTs nos READMEs das pastas agora usam imagens locais (`assets/img/`)

### Removido

- `GSD 2/GSD_2.md` — snapshot obsoleto (estatísticas antigas + resíduo de transcrição de LLM)

## [1.0.0] - 2026-10-01

### Adicionado

- Landing page estática (`index.html` + `styles.css`, HTML/CSS puro) publicada no GitHub Pages
- `assets/img/` com todos os banners locais (header, Gits, GPTs, Skills + banners 02–05 da ÁRTEMIS) e favicon
- Prompts dos 5 banners em `Geração de imagens/Prompts Banners/`
- Seção **Foundry VTT** no README com tabela dos 9 módulos próprios (github.com/SoftMissT)
- Badges, TOC com âncoras e tabelas no README
- Arquivos de comunidade: `LICENSE`, `LICENSE-CC-BY-4.0.txt`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `FORKS.md`

### Corrigido

- Banner da Hive quebrado → arte real `assets/img/hive/banner_hive.webp`
- Links quebrados dos GPTs ÁRTEMIS/ARTHUR; MAKO-MORI e POWER adicionados
- `jtig37/free-llm-api-resources` substituindo o repositório fora do ar `cheahjs/...`
- `.nojekyll` desativa o Jekyll (Liquid quebrava o build do Pages)
- `.gitignore` reescrito (segredos, SO, editores, artefatos)

### Mudado

- Dependência do imgur eliminada imagens servidas do próprio repositório
- Listas longas do README viraram tabelas

## [0.9.0] - 2026-06-08

### Adicionado

- Seção Foundry VTT com guia de hospedagem online via ngrok

## [0.8.0] - 2026-05-28

### Adicionado

- GPTs POWER e MAKO-MORI em `Meus GPTS/`

### Corrigido

- Imagens do repositório

## [0.7.0] - 2026-05-27

### Adicionado

- Atualizações da frota Hive (agentes `.soul.md`)

## [0.6.0] - 2026-05-06

### Adicionado

- Guia de prompt "Revista de anime" (pôster de personagem)

## [0.5.0] - 2026-03-20

### Adicionado

- Estruturação inicial da documentação do Vibe Coding
- Commit inicial
