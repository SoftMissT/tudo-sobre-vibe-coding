# Claude Skills

![Claude Skills](https://i.imgur.com/iFWZsEC.png)

Esta pasta reúne skills para ampliar o Claude Code com comportamentos especializados. Cada skill fica em sua própria pasta e possui um `SKILL.md` com gatilhos, regras de uso e referências.

## Skills disponíveis

| Skill | Caminho | Uso principal |
|---|---|---|
| Arthur | [SKILL.md](./arthur/arthur/SKILL.md) | Arquitetura, narrativa, RPG, worldbuilding, Quenya/Tengwar e documentação de intenção. |
| Blueprint | [SKILL.md](./blueprint/blueprint/SKILL.md) | Planejamento de tarefas grandes em etapas executáveis por agentes. |
| Mozart | [SKILL.md](./mozart/mozart/SKILL.md) | Letras, composição, direção musical e prompts para Suno AI. |
| Programação | [SKILL.md](./programacao/programacao/SKILL.md) | Código full stack, automação, Foundry VTT, APIs, bancos de dados e agentes de IA. |
| Prompt Optimizer | [SKILL.md](./prompt-optimizer/prompt-optimizer/SKILL.md) | Revisão e otimização de prompts sem executar a tarefa final. |
| Writing Clearly and Concisely | [SKILL.md](./writing-clearly-and-concisely/writing-clearly-and-concisely/SKILL.md) | Escrita clara para documentação, mensagens, relatórios e explicações. |

## Como usar

1. Abra a skill que combina com a tarefa.
2. Leia o `description` no frontmatter para entender quando ela deve ser ativada.
3. Use os arquivos em `references/` apenas quando a skill pedir ou quando a tarefa exigir mais contexto.

## Convenções

- Cada skill deve ter um `SKILL.md`.
- Referências longas ficam em `references/`.
- O frontmatter deve explicar claramente quando usar e quando não usar a skill.
- Skills devem ser específicas o bastante para guiar comportamento sem virar documentação genérica.

## Mapa rápido

- Para planejar: `blueprint`.
- Para programar: `programacao`.
- Para escrever melhor: `writing-clearly-and-concisely`.
- Para melhorar prompts: `prompt-optimizer`.
- Para música: `mozart`.
- Para narrativa, RPG e arquitetura de mundo: `arthur`.
