# Meus GPTS

[← Tudo Sobre Vibe Coding](../README.md)

![Meus GPTS](../assets/img/banner-gpts.webp)

Esta pasta concentra os GPTs personalizados do projeto, com foco em produtividade criativa, direção técnica e consistência de estilo.

> ⚠️ **AVISO URGENTE: os GPTs vão ser aposentados em 11/12/2026.** A OpenAI está migrando custom GPTs para **plugins**. Veja o [guia de migração](#guia-de-migração-gpts--plugins-11122026) abaixo: os 4 GPTs desta pasta estão no alvo. A boa notícia: os `.md` locais são exatamente a fonte da verdade que a migração usa.

## Guia de migração (GPTs → plugins)

**O que está acontecendo:** anúncio de 11/09/2026 (release notes do ChatGPT): a OpenAI vai **aposentar os custom GPTs em 11/12/2026** e oferece fluxo de migração para plugins (instructions reutilizáveis + arquivos de referência + apps conectados). Criação de GPTs novos já está bloqueada em algumas contas ("Create Plugin Instead").

**O que migra / o que não migra:**

| Migra para o plugin | Não migra |
|---|---|
| Instruções (o system prompt do `.md`) | **A escolha de modelo** do GPT |
| Arquivos de referência | O link público antigo (`chatgpt.com/g/g-...`): a página fica inacessível na aposentadoria |
| Apps conectores (MCP) | |

**Passo a passo:**

1. **Exporte a verdade:** cada GPT desta pasta já tem o `.md` local (`ÁRTEMIS.md`, `ARTHUR.md`, `POWER.md`, `MAKO-MORI.md`): ele é a instrução que você vai colar no plugin.
2. **Migre pela sua conta:** quando a migração liberar na sua conta, use o fluxo do ChatGPT (GUIA: [Moving your custom GPT workflows to plugins](https://learn.chatgpt.com/docs/migrate-custom-gpts)). Depois de migrar, **o GPT original fica read-only**; até a aposentadoria ele continua funcionando.
3. **Conectores:** plugins podem levar connectors (MCP): se o GPT usava ações (actions), elas viram MCP server.
4. **Teste de novo:** re-rodar os testes de uso após cada mudança (recomendação oficial).
5. **Atualize links:** qualquer lugar que aponte para `chatgpt.com/g/g-...` (site, README, QR) deve apontar para o plugin/assistente novo **antes de 11/12/2026**.

**Oficial:** [Custom GPT retirement and migration FAQ](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq) · [Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins) (skill = instrução reutilizável; plugin = pacote instalável com skills + connectors).

> Nosso plano: usar os `.md` desta pasta como base e publicar as versões plugin aqui quando o fluxo abrir. Enquanto isso, os GPTs públicos seguem no ar até 11/12/2026.

## GPTs disponíveis

### Artemis

![GPT Artemis](https://i.imgur.com/p7ShO8e.png)

- GPT público: [ÁRTEMIS](https://chatgpt.com/g/g-6a0e4304c1348191a47b966d9db09536-artemis)
- Arquivo local: [ÁRTEMIS.md](./ÁRTEMIS.md)
- Especialidade: prompts de imagem, direção de arte e adaptação por plataforma.
- Uso ideal: Midjourney, Niji, OpenAI ImageGen/GPT, FLUX e workflows visuais.

### Arthur Leywin

![GPT Arthur](https://i.imgur.com/NDcwzhJ.png)

- GPT público: [Arthur Leywin](https://chatgpt.com/g/g-6a164ae791f88191bcef62945889d6fd-arthur-leywin)
- Arquivo local: [ARTHUR.md](./ARTHUR.md)
- Especialidade: narrativa, worldbuilding, RPG, fichas e Foundry VTT.
- Uso ideal: campanhas, criação de personagens, sistemas e automação com `/macro`.

### Power

![GPT Power](https://i.imgur.com/13sMjaz.png)

- GPT público: [POWER](https://chatgpt.com/g/g-6a180e196b8881918b5faac7f98e4be6-power)
- Arquivo local: [POWER.md](./POWER.md)
- Especialidade: impacto visual, presença, VFX, energia criativa e direção sensorial.

### MAKO-MORI

![GPT MAKO-MORI](https://i.imgur.com/bviEblx.png)

- GPT público: [Mako-Mori](https://chatgpt.com/g/g-6a1823f2f4d08191b902c42d9772d9b4-mako-mori)
- Arquivo local: [MAKO-MORI.md](./MAKO-MORI.md)
- Especialidade: orquestração, coordenação de agentes, síntese e comando da Hive.

## Como usar

1. Escolha o GPT pelo objetivo da tarefa.
2. Abra o `.md` correspondente e use as instruções como base do prompt de sistema.
3. Mantenha o histórico das versões para evoluir cada persona com consistência.

## Convenções da pasta

- Um arquivo por GPT.
- Nome de arquivo igual ao nome público do GPT quando isso facilitar identificação.
- Conteúdo em Markdown objetivo, com comandos, prioridades e formato de saída.
