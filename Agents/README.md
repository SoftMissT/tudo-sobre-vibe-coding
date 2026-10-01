# Agents

Estrutura da pasta:

```
Agents/
├── almas/                    # 20 almas (.soul.md) + _template — personas, NÃO são skills
├── agentes/                  # fichas de skill da frota (status) — em construção
├── tang-rou-foundry-agent/   # pacote completo da TANG-ROU: SKILL.md, soul, papéis .claude/agents/
└── README.md
```

**Alma ≠ skill.** Uma alma é uma persona em `.soul.md`: voz, domínio e limites, útil como base de prompts e experimentos. Uma skill da frota executa de verdade: definição própria, pipeline e status de prontidão.

![Banner Hive](../assets/img/hive/banner_hive.webp)

## Skills da frota

| Skill | Status | Ficha | Pacote |
|---|---|---|---|
| TANG-ROU | pronta | [agentes/TANG-ROU.md](./agentes/TANG-ROU.md) | [`tang-rou-foundry-agent/`](./tang-rou-foundry-agent/) |
| MAKO-MORI | em progresso | [agentes/MAKO-MORI.md](./agentes/MAKO-MORI.md) | `hive-mako-mori` (opencode) |
| ARTEMIS | em progresso | [agentes/ARTEMIS.md](./agentes/ARTEMIS.md) | `artemis` (opencode) |
| SAGA | em progresso | [agentes/SAGA.md](./agentes/SAGA.md) | `saga` (opencode) |

## Almas disponíveis

| Alma | Arquivo | Papel |
|---|---|---|
| AKENO | [almas/AKENO.soul.md](./almas/AKENO.soul.md) | Design, UI, direção visual e experiência. |
| ALICE | [almas/ALICE.soul.md](./almas/ALICE.soul.md) | Análise, organização e suporte conceitual. |
| ARTEMIS | [almas/ARTEMIS.soul.md](./almas/ARTEMIS.soul.md) | Estratégia, prompts visuais e direção criativa. |
| ARTHUR | [almas/ARTHUR.soul.md](./almas/ARTHUR.soul.md) | Arquitetura, narrativa, RPG e sistemas. |
| ASUNA | [almas/ASUNA.soul.md](./almas/ASUNA.soul.md) | Execução cuidadosa, suporte e clareza operacional. |
| CARDINAL | [almas/CARDINAL.soul.md](./almas/CARDINAL.soul.md) | Lore, regras, continuidade e consistência. |
| DOKJA | [almas/DOKJA.soul.md](./almas/DOKJA.soul.md) | Narrativa, leitura de sistemas e metacognição. |
| GANDALF | [almas/GANDALF.soul.md](./almas/GANDALF.soul.md) | Mentoria, decisões difíceis e sabedoria estratégica. |
| JIN | [almas/JIN.soul.md](./almas/JIN.soul.md) | Planejamento, decomposição de tarefas e execução. |
| KIRITO | [almas/KIRITO.soul.md](./almas/KIRITO.soul.md) | Execução técnica, foco e combate a bloqueios. |
| MAKO-MORI | [almas/MAKO-MORI.soul.md](./almas/MAKO-MORI.soul.md) | Orquestração, comando e síntese da frota. |
| POWER | [almas/POWER.soul.md](./almas/POWER.soul.md) | Impacto visual, presença e energia criativa. |
| SAGA | [almas/SAGA.soul.md](./almas/SAGA.soul.md) | Estratégia, estrutura e leitura de longo prazo. |
| SHAKA | [almas/SHAKA.soul.md](./almas/SHAKA.soul.md) | Crítica, precisão e julgamento rigoroso. |
| SINON | [almas/SINON.soul.md](./almas/SINON.soul.md) | Código, backend, precisão e solução técnica. |
| SYLVIE | [almas/SYLVIE.soul.md](./almas/SYLVIE.soul.md) | Memória, restauração de contexto e continuidade. |
| TESSIA | [almas/TESSIA.soul.md](./almas/TESSIA.soul.md) | Validação de intenção, integridade e alinhamento. |
| XENOVIA | [almas/XENOVIA.soul.md](./almas/XENOVIA.soul.md) | Força operacional, segurança e decisão. |
| YUI | [almas/YUI.soul.md](./almas/YUI.soul.md) | Cuidado, UX emocional e suporte discreto. |
| YUNA | [almas/YUNA.soul.md](./almas/YUNA.soul.md) | QA, observabilidade, bugs e experiência do usuário. |

## Como usar

1. Precisa que algo execute? Comece pelas [skills da frota](./agentes/) — confira o status.
2. Quer só uma persona? Escolha uma alma pelo papel e use o `.soul.md` como base de prompt.
3. Para criar uma alma nova, copie [`almas/_template.soul.md`](./almas/_template.soul.md) e preencha identidade, domínio, voz, limites e habilidades.

## Convenções

- Alma vira `almas/NOME.soul.md`; skill da frota vira `agentes/NOME.md` + skill correspondente.
- Mantenha domínio, voz, limites e gatilhos claros.
- Evite duplicar almas com o mesmo papel sem explicar a diferença.
