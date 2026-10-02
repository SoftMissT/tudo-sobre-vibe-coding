![Banner principal](./assets/img/banner-header.webp)

# Tudo Sobre Vibe Coding

[![Stars](https://img.shields.io/github/stars/SoftMissT/tudo-sobre-vibe-coding?style=flat-square&color=D01452)](https://github.com/SoftMissT/tudo-sobre-vibe-coding/stargazers)
[![Forks](https://img.shields.io/github/forks/SoftMissT/tudo-sobre-vibe-coding?style=flat-square&color=5E80A0)](https://github.com/SoftMissT/tudo-sobre-vibe-coding/network/members)
[![Issues](https://img.shields.io/github/issues/SoftMissT/tudo-sobre-vibe-coding?style=flat-square&color=00D4F5)](https://github.com/SoftMissT/tudo-sobre-vibe-coding/issues)
[![Last commit](https://img.shields.io/github/last-commit/SoftMissT/tudo-sobre-vibe-coding?style=flat-square&color=C8A84B)](https://github.com/SoftMissT/tudo-sobre-vibe-coding/commits/main)
[![Website](https://img.shields.io/badge/site-GitHub%20Pages-D01452?style=flat-square)](https://softmisst.github.io/tudo-sobre-vibe-coding/)
[![License: MIT + CC BY 4.0](https://img.shields.io/badge/license-MIT%20%2B%20CC%20BY%204.0-46D369?style=flat-square)](./LICENSE)

**Um hub de conhecimento sobre programação guiada por IA, orquestração de agentes e engenharia de contexto.**

> 🌐 **Site ao vivo:** [softmisst.github.io/tudo-sobre-vibe-coding](https://softmisst.github.io/tudo-sobre-vibe-coding/), este README servido como página estática (GitHub Pages).

Este repositório reúne guias, configurações e experimentos focados em workflows de desenvolvimento onde a IA não é apenas uma ferramenta, mas uma parceira colaborativa. Exploramos conceitos como memória persistente para agentes, desenvolvimento orientado por especificações (Spec-Driven) e orquestração multi-agente.

**Nesta página:**

- [🧠 A Filosofia: O que é "Vibe Coding"?](#a-filosofia-o-que-é-vibe-coding)
- [🏛️ Os Pilares do Vibe Coding](#os-pilares-do-vibe-coding)
  - [1. GSD (Get Shit Done)](#1-gsd-get-shit-done-o-framework-de-execução)
  - [2. Memória Persistente](#2-memória-persistente-o-cérebro-do-agente)
  - [3. Orquestração de Agentes](#3-orquestração-de-agentes-o-workflow-colaborativo)
- [🗺️ Mapa por Empresa e por Assunto](#mapa-por-empresa-e-por-assunto)
- [🛠️ Ecossistema de Ferramentas e Recursos](#ecossistema-de-ferramentas-e-recursos)
- [🔗 Repositórios de Apoio](#repositórios-de-apoio)
- [🤖 Meus GPTs](#meus-gpts)
- [⚡ Claude Skills](#claude-skills)
- [🎲 Foundry VTT](#foundry-vtt)
- [🚀 Como Começar](#como-começar)
- [🤝 Comunidade e Licença](#comunidade-e-licença)

---

## 🧠 A Filosofia: O que é "Vibe Coding"?

![Banner Filosofia](./assets/img/banner-06-filosofia.webp)

> **Vibe Coding** é um paradigma onde o desenvolvedor define a "vibe" a visão, as especificações e as regras do projeto e uma orquestra de agentes de IA executa as tarefas, mantendo o contexto e aprendendo continuamente. O objetivo é elevar o papel do desenvolvedor de "codificador" para **arquiteto de sistemas cognitivos**.

Os três pilares deste ecossistema são:

| Pilar | O que garante |
| :--- | :--- |
| **GSD (Get Shit Done)** | Que a coisa certa seja construída. |
| **Memória Persistente** | Que o contexto nunca seja perdido. |
| **Orquestração de Agentes** | Que a colaboração humano-IA tenha um fluxo claro. |

---

## 🏛️ Os Pilares do Vibe Coding

### 1. GSD (Get Shit Done): O Framework de Execução

Inspirado no [open-gsd/gsd-pi](https://github.com/open-gsd/gsd-pi) (continuação oficial do GSD 2; o GSD clássico vive em [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core)), o GSD é uma abordagem de **desenvolvimento orientado por especificações (Spec-Driven Development)**.

* **Filosofia:** Nenhuma linha de código é escrita sem uma especificação (`SPEC.md`) clara e aprovada. O foco é construir a coisa certa, em vez de construir rápido.
* **Processo:** O trabalho é dividido em fases, cada uma com seu próprio plano, execução e verificação, garantindo que os resultados sejam validados empiricamente contra os critérios de aceite.
* **Função:** Serve como o "sistema operacional" para os agentes, guiando-os através de tarefas complexas sem perder a visão geral do projeto.

### 2. Memória Persistente: O Cérebro do Agente

Para que um agente de IA seja um verdadeiro colaborador, ele precisa de memória. Implementamos um sistema de **memória persistente local** usando três arquivos simples, conforme detalhado em `Claude Code/Configuração de Memória Persistente.md`:

| Arquivo | Função | Propósito |
| :--- | :--- | :--- |
| **`primer.md`** | **Estado Atual** | Sabe exatamente onde o trabalho parou. |
| **`.claude-memory.md`** | **Histórico de Commits** | Registra o histórico de mudanças. |
| **`tasks/lessons.md`** | **Autoaprendizado** | Aprende com as correções e não repete erros. |

> Este sistema garante que, a cada sessão, a IA tenha contexto total sobre o estado do projeto, as decisões tomadas e as lições aprendidas.

### 3. Orquestração de Agentes: O Workflow Colaborativo

Baseado nos princípios de `Claude Code/Claude.md`, este é o fluxo de trabalho que rege a interação homem-máquina:

* **Planejamento Primeiro:** Toda tarefa não trivial começa com um plano em `tasks/todo.md`.
* **Delegação Inteligente:** Tarefas complexas ou paralelas são delegadas a sub-agentes para manter o contexto principal limpo.
* **Loop de Autoaperfeiçoamento:** Após qualquer correção, uma nova "lição" é adicionada a `tasks/lessons.md`.
* **Verificação Empírica:** Nada é considerado "concluído" sem uma prova funcional.

---

## 🗺️ Mapa por Empresa e por Assunto

![Banner Mapa do Repositório](./assets/img/banner-07-mapa.webp)

Duas leituras do mesmo repositório: escolha a que te interessa agora.

### Por empresa

| Empresa | Guia local | O quê |
| :--- | :--- | :--- |
| **Anthropic** | [Claude Code/](./Claude%20Code/) | Harness do Claude, CLAUDE.md, memória persistente, plugins e JEV. |
| **Anthropic** | [Claude Code/Claude Skills/](./Claude%20Code/Claude%20Skills/) | Skills prontas: Arthur, Blueprint, Mozart, Prompt Optimizer, entre outras. |
| **OpenAI** | [Codex/](./Codex/) | Codex CLI no terminal: `/init`, AGENTS.md, skills e plugins. |
| **OpenAI** | [Dots/](./Dots/) | Agentes always-on (DevDay 29/09/2026) e a aposentadoria dos GPTs. |
| **OpenAI** | [Meus GPTS/](./Meus%20GPTS/) | Perfis dos GPTs e guia de migração GPTs → plugins (11/12/2026). |
| **DeepSeek** | [DeepSeek Harness/](./DeepSeek%20Harness/) | `dsh`: Web UI local e arquitetura "everything is a plugin". |
| **Meta / Comunidade** | [Ollama/](./Ollama/) | Runtime local de LLMs + benchmark `check_local_llm.py`. |
| **Fantasy Grounds / VTT** | [Foundry/](./Foundry/) | Guias de Foundry VTT, ngrok e os 9 módulos próprios. |

### Por assunto

| Assunto | Guia local | O quê |
| :--- | :--- | :--- |
| **Filosofia e execução** | [GSD 2/](./GSD%202/) | Spec-driven development: nenhuma linha sem `SPEC.md`. |
| **Memória persistente** | [Claude Code/Configuração de Memória Persistente.md](./Claude%20Code/Configura%C3%A7%C3%A3o%20de%20Mem%C3%B3ria%20Persistente.md) | `primer.md`, histórico e autoaprendizado. |
| **Skills portáteis** | [Skills/](./Skills/) | 15 skills (`SKILL.md`) para harnesses e agentes: design, subagentes, Obsidian, TypeSafe e a skill autoral TANG-ROU. |
| **Conectores e ferramentas** | [MCP/](./MCP/) | Model Context Protocol do conceito ao primeiro servidor, com configs por cliente. |
| **Distribuição de capacidade** | [Plugins/](./Plugins/) | Comparativo dos 5 sistemas de plugin e a migração dos GPTs. |
| **Treinar modelos** | [Fine-tuning/](./Fine-tuning/) | Quando fine-tunar x RAG x prompt, com pipeline local até o Ollama. |
| **Mídia com IA** | [Geração de imagens/](./Gera%C3%A7%C3%A3o%20de%20imagens/) | Prompts de banner, personagem e direção de arte. |

---

## 🛠️ Ecossistema de Ferramentas e Recursos

![Banner Gits](./assets/img/banner-gits.webp)

A lista de repositórios abaixo não é aleatória. Eles representam componentes e exemplos que se encaixam na filosofia "Vibe Coding".

### Frameworks e Sistemas Core

| Repositório | O quê |
| :--- | :--- |
| [open-gsd/gsd-pi](https://github.com/open-gsd/gsd-pi) | **Casa atual do GSD**: meta-prompting, context engineering e spec-driven development para agentes autônomos ([guia local](./GSD%202/)). |
| [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) | Evolução do GSD clássico (64k+ ⭐): comandos e workflows para Claude Code. |

### Harnesses e Execução Local

| Guia local | O quê |
| :--- | :--- |
| [Codex/](./Codex/) | **Codex CLI** da OpenAI: instalação, `/init` cria o `AGENTS.md`, skills em `.codex/skills/`, plugins via `codex /plugins`, automação com `codex exec`. |
| [DeepSeek Harness/](./DeepSeek%20Harness/) | **`dsh`**: harness "everything is a plugin" da DeepSeek com Web UI local (`npx @deepseek-ai/dsh web`); developer preview, cuidado com o repo homônimo de terceiros. |
| [Ollama/](./Ollama/) | **Runtime local de LLMs** + benchmark `check_local_llm.py` que diz quais modelos o seu PC roda: **sem baixar nada**. |

### Conectores, Plugins e Treinamento

| Guia local | O quê |
| :--- | :--- |
| [MCP/](./MCP/) | **Model Context Protocol**: o "USB-C da IA": arquitetura, configs verificadas para Claude Code/Desktop, Codex e Gemini CLI, primeiro servidor em Python ou TypeScript e segurança. |
| [Plugins/](./Plugins/) | **Os 5 sistemas de plugin** (Claude Code, Codex, GPTs→plugins, dsh, Gemini extensions), tabela comparativa e o único formato portátil: a skill `SKILL.md`. |
| [Fine-tuning/](./Fine-tuning/) | **Treinar seu próprio modelo**: árvore de decisão fine-tuning x RAG x prompt, pipeline Unsloth → GGUF → Ollama e o calendário de deprecação do fine-tuning da OpenAI. |

### Desenvolvimento de Agentes e Skills

| Repositório | O quê |
| :--- | :--- |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Framework para construção de agentes de IA. |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Coleção de "skills" para o Claude extensibilidade de agentes. |
| [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | Inspiração para conectar skills a uma base de conhecimento. |
| [uphiago/recon-skills](https://github.com/uphiago/recon-skills) | Skills de recon e pentest: CORS, XSS, SQLi, SSRF, RCE, WordPress, MCP, cloud. Testado em campo, MIT. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | Otimização de harness de agente: skills, instintos, memória e segurança para Claude Code, Codex, OpenCode e Cursor (antes `everything-claude-code`). |

### Engenharia de Contexto e RAG (Retrieval-Augmented Generation)

| Repositório | O quê |
| :--- | :--- |
| [upstash/context7](https://github.com/upstash/context7) | Documentação de código atualizada e específica de versão, injetada direto nos prompts de LLMs. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Framework para construir pipelines de RAG. |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | Memória de longo prazo para CLIs de agente, com handoff entre fornecedores de IA (Rust). |
| [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) | Plugin Claude Code que substitui o resumo de compactação por decisões pontuadas: descarta o obsoleto, mantém verbatim o que importa. |
| [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) | Motor de memória e contexto para a era da IA: rápida, escalável e rodando 100% local. |
| [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec) | Índice vetorial em Rust com bindings Python (sobre TurboQuant): busca semântica rápida. |

### Design e Mídia com Agentes

| Repositório | O quê |
| :--- | :--- |
| [nexu-io/open-design](https://github.com/nexu-io/open-design) | App desktop local-first que transforma seu agente de código em motor de design: protótipos, landing pages, dashboards, slides, imagens e vídeo com export HTML/PDF/PPTX/MP4. |

### Automação e Bots

| Repositório | O quê |
| :--- | :--- |
| [NamVr/DiscordBot-Template](https://github.com/NamVr/DiscordBot-Template) | Boilerplate discord.js v14 com command handler, error handler e cobertura completa da API. |
| [Mini-Kraken/Bot-Template](https://github.com/Mini-Kraken/Bot-Template) | Template enxuto para Discord bots em Discord.js. |

### Implementações e Exemplos Práticos

* **[Guia de Prompt: Pôster de Personagem](./Geração%20de%20imagens/Open%20Ai/Revista%20de%20anime.md):** engenharia de prompt para geração de imagens guia estruturado com prompt otimizado, instruções claras e referências visuais para resultados consistentes.
* [pablodelucca/pixel-agents](https://github.com/pablodelucca/pixel-agents): Demonstração de agentes autônomos em um ambiente visual.
* [ThaddaeusSandidge/BorisChernyClaudeMarkdown](https://github.com/ThaddaeusSandidge/BorisChernyClaudeMarkdown): Template `CLAUDE.md` com Agentic Context Engineering (ACE).

### Recursos Gerais de LLMs

| Repositório | O quê |
| :--- | :--- |
| [jtig37/free-llm-api-resources](https://github.com/jtig37/free-llm-api-resources) | Lista de APIs de LLM gratuitas (sucessora do antigo `cheahjs/free-llm-api-resources`, que saiu do ar). |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | 100+ agentes, skills e apps de RAG open source. |
| [akitaonrails/llm-coding-benchmark](https://github.com/akitaonrails/llm-coding-benchmark) | Benchmark dos LLMs de código mais populares, com automação via OpenCode (Python). |

### Segurança, Monitoramento e Ambientes

![Banner Segurança, Monitoramento e Ambientes](./assets/img/banner-02-seguranca.webp)

| Repositório | O quê |
| :--- | :--- |
| [akitaonrails/ai-jail](https://github.com/akitaonrails/ai-jail) | Sandbox multiplataforma para rodar agentes de IA com restrições mais firmes (Rust). |
| [akitaonrails/ai-usagebar](https://github.com/akitaonrails/ai-usagebar) | Widget waybar (Rust) para monitorar créditos e planos de Claude, GPT, GLM e OpenRouter. |
| [akitaonrails/distrobox-gaming](https://github.com/akitaonrails/distrobox-gaming) | Script de Distrobox focada em gaming, com emuladores pré-configurados (Shell). |

---

## 🔗 Repositórios de Apoio

![Banner Repositórios de Apoio](./assets/img/banner-03-apoio.webp)

Estes repositórios complementam o ecossistema com visualização, navegação de código, memória persistente e integração com Obsidian.

| Repositório | O quê |
| :--- | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Qualquer codebase vira um grafo de conhecimento consultável skill para Claude Code, Cursor, Codex e Gemini CLI. |
| [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus) | Motor de inteligência de código local, sem servidor. |
| [MemPalace/mempalace](https://github.com/MemPalace/mempalace) | Sistema de memória para IA, com rankings e recuperação de contexto. |
| [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | Skills de agente para Obsidian (Markdown, Bases, JSON Canvas). |
| [eugeniughelbur/obsidian-second-brain](https://github.com/eugeniughelbur/obsidian-second-brain) | Memória persistente para Claude Code e outros 6 CLIs como Markdown no seu vault Obsidian: 45 comandos de busca semântica, notas auto-reativas e agentes agendados. |

---

## 🤖 Meus GPTs

![Meus GPTS](./assets/img/banner-gpts.webp)

A pasta [Meus GPTS](./Meus%20GPTS/) reúne perfis e instruções de GPTs personalizados para tarefas criativas e técnicas.

> ⚠️ **Prazo: os GPTs customizados são aposentados em 11/12/2026** (migração para plugins, [guia completo](./Meus%20GPTS/README.md#guia-de-migração-gpts--plugins-11122026)). Quer entender os novos agentes always-on da OpenAI? Veja o guia dos [Dots](./Dots/README.md) (DevDay 29/09/2026).

* [ÁRTEMIS](./Meus%20GPTS/%C3%81RTEMIS.md): Prompt architect e companion visual direção de arte e engenharia de prompt para geração de imagens.
* [ARTHUR LEYWIN](./Meus%20GPTS/ARTHUR.md): King of Architecture narrativa, worldbuilding, RPG, automação e Foundry VTT.
* [MAKO-MORI](./Meus%20GPTS/MAKO-MORI.md): Comandante da frota Fluctlight comando e orquestração de agentes.
* [POWER](./Meus%20GPTS/POWER.md): Creative Entity Supreme música, roteiro, VFX e produção audiovisual.
* **Guia da pasta:** [Meus GPTS/README.md](./Meus%20GPTS/README.md)

---

## ⚡ Claude Skills

![Claude Skills](./assets/img/banner-skills.webp)

A pasta [Claude Code/Claude Skills](./Claude%20Code/Claude%20Skills/) reúne skills prontas para estender o Claude Code com fluxos especializados de arquitetura, escrita, programação, música, planejamento e otimização de prompts.

| Skill | Foco |
| :--- | :--- |
| [Arthur](./Claude%20Code/Claude%20Skills/arthur/arthur/SKILL.md) | Arquitetura de sistemas, narrativa, RPG, worldbuilding, Quenya/Tengwar e documentação de intenção. |
| [Blueprint](./Claude%20Code/Claude%20Skills/blueprint/blueprint/SKILL.md) | Planos de construção para tarefas grandes, multi-sessão e multi-agente. |
| [Mozart](./Claude%20Code/Claude%20Skills/mozart/mozart/SKILL.md) | Criação musical, letras, prompts para Suno AI e direção de produção. |
| [Programação](./Claude%20Code/Claude%20Skills/programacao/programacao/SKILL.md) | Full stack, automação, Foundry VTT, APIs, bancos e agentes de IA. |
| [Prompt Optimizer](./Claude%20Code/Claude%20Skills/prompt-optimizer/prompt-optimizer/SKILL.md) | Análise e melhoria de prompts, prontos para copiar. |
| [Writing Clearly and Concisely](./Claude%20Code/Claude%20Skills/writing-clearly-and-concisely/writing-clearly-and-concisely/SKILL.md) | Escrita clara para documentação, mensagens e textos técnicos. |

**Guia da pasta:** [Claude Code/Claude Skills/README.md](./Claude%20Code/Claude%20Skills/README.md)

---

## 🎲 Foundry VTT

![Banner Foundry VTT](./assets/img/banner-04-foundry-vtt.webp)

* **Guia da pasta:** [Foundry/README.md](./Foundry/README.md): mapa dos guias e por onde começar.
* **[Guia: Hospedar Foundry VTT Online com ngrok](./Foundry/Como%20instalar%20o%20ngrok.md):** expor o Foundry VTT pela internet sem abrir portas, sem IP fixo, 100% gratuito.
* **[dice-roller/rpg-dice-roller](https://github.com/dice-roller/rpg-dice-roller):** rolagem de dados avançada em JS: todos os tipos de dado, modificadores e equações matemáticas.

### Módulos próprios

Módulos desenvolvidos para Foundry VTT, mantidos no GitHub [SoftMissT](https://github.com/SoftMissT):

| Módulo | O quê |
| :--- | :--- |
| [Connection Guard: Abyss Link](https://github.com/SoftMissT/foundry-vtt-connection-guard) | Monitora latência, detecta degradação preditiva, reconecta automaticamente e configura a rota de conexão escolhida pelo mestre. |
| [Batata Ou Não](https://github.com/SoftMissT/FoundryVTT-BatataOuN-o-V2) | Detecta se o computador do jogador é uma batata e configura os gráficos automaticamente. |
| [Lumenn Frame](https://github.com/SoftMissT/Lumenn-Frame) | Editor de grafo cinemático: cenas, áudio e notas com fluxo narrativo direcional. |
| [Lumenn Notify](https://github.com/SoftMissT/lumenn-notify) | Mensagens narrativas, perfis e canais (Sistema e Constelações) para Foundry v14+. |
| [Lumenn Phone Hub](https://github.com/SoftMissT/Lumenn-phone-hub) | Celular diegético: mensagens, redes sociais, banco e notícias independente de sistema (v13–v14). |
| [Lumenn Lightweight](https://github.com/SoftMissT/lumenn-lightweight) | Otimiza imagens para WebP com modo lote e hook de upload automático. |
| [Lumenn Roll Relay](https://github.com/SoftMissT/lumenn-roll-relay) | Retransmite rolagens para o Discord, com leaderboard. |
| [Night Assassins CSB Automation](https://github.com/SoftMissT/night-assassins-csb-automation) | Automação de rolagens, dano, atributos e Habilidades Especiais para Foundry + Custom System Builder. |
| [Night Assassins System](https://github.com/SoftMissT/night-assassins-system) | Sistema completo para Foundry v14: fichas, progressão, combate e Respirações com DataModels próprios. |

---

## 🚀 Como Começar

![Banner Como Começar](./assets/img/banner-05-como-comecar.webp)

1. **Estude a Filosofia:** leia os guias de [Claude Code](./Claude%20Code/README.md) e [GSD 2](./GSD%202/README.md) para internalizar os conceitos.
2. **Configure a Memória:** siga o [guia de memória persistente](./Claude%20Code/Configura%C3%A7%C3%A3o%20de%20Mem%C3%B3ria%20Persistente.md) para criar a estrutura de memória no seu projeto.
3. **Adote o Workflow:** comece a usar o ciclo **Planejar ➔ Executar ➔ Verificar** em suas tarefas, documentando os planos em `tasks/todo.md` e as lições em `tasks/lessons.md`.
4. **Explore os guias de cada pasta:** cada pasta da raiz tem um `README.md` que explica o que é e como usar (Agents, Claude Skills, Foundry, Geração de imagens, Meus GPTS, Codex, DeepSeek Harness, Ollama, Dots, GSD 2...).

---

## 🤝 Comunidade e Licença

| | |
| :--- | :--- |
| **Contribuir** | [CONTRIBUTING.md](./CONTRIBUTING.md) · abrir issues e PRs |
| **Conduta** | [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) |
| **Segurança** | [SECURITY.md](./SECURITY.md): reporte vulnerabilidades em privado |
| **Forks** | [FORKS.md](./FORKS.md): política permissiva com checklist |
| **Changelog** | [CHANGELOG.md](./CHANGELOG.md) |

**Licença dual:** código sob [MIT](./LICENSE), conteúdo sob [CC BY 4.0](./LICENSE-CC-BY-4.0.txt).
