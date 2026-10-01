# Configuração de Memória Persistente

> Sessões de IA começam do zero. Este guia mostra como fazer o agente **lembrar** do projeto entre sessões: em duas camadas: a memória manual deste repositório e a memória nativa do Claude Code.

## Por que importa

Sem memória, a cada sessão você paga de novo o custo de explicar arquitetura, decisões e erros já resolvidos. Memória persistente = menos tokens gastos, decisões que não precisam ser refeitas, continuidade entre agentes/sessões.

---

## Camada 1: Memória manual deste projeto (3 arquivos)

O sistema adotado pela Hive usa três arquivos simples. Coloque-os na raiz do projeto (ou em `.claude/`):

| Arquivo | Função | Quando escrever |
|---|---|---|
| `primer.md` | **O que é o projeto**: visão geral, convenções, arquitetura, comandos úteis | Mudou a estrutura/regras do projeto |
| `.claude-memory.md` | **O que aconteceu**: decisões, estado atual, pendências | Fim de cada sessão / virada de página |
| `tasks/lessons.md` | **O que aprendemos**: erros, armadilhas, o que não repetir | Descobriu um pitfall? Anote na hora |

### Passo a passo de implantação

```bash
mkdir -p tasks
touch primer.md .claude-memory.md tasks/lessons.md
```

1. **`primer.md`**: escreva em 10–30 linhas: o que o projeto é, stack, convenções de commit, comandos (`npm test`, etc.), pastas importantes.
2. **`.claude-memory.md`**: estruture por sessão: `## 2026-10-01: <tema>` + 3 bullets (o que fez / estado / próximo passo).
3. **`tasks/lessons.md`**: uma linha por lição: `- <bug> → <causa> → <correção>`.

### Ciclo de uso

- **Início de sessão:** peça ao agente para ler `primer.md` e o fim de `.claude-memory.md`.
- **Durante:** decisões relevantes vão para `.claude-memory.md`.
- **Fim de sessão:** atualizar `.claude-memory.md` + `tasks/lessons.md`. Use um handoff se outro agente for continuar.

---

## Camada 2: Memória nativa do Claude Code

O Claude Code já carrega memória sozinho. Use as duas camadas juntas: o CLAUDE.md manda *regras permanentes*, os arquivos manuais guardam *estado e história*.

### Onde a memória mora (níveis)

| Nível | Arquivo | Escopo |
|---|---|---|
| **User** | `~/.claude/CLAUDE.md` | Sua máquina, todo projeto (preferências pessoais) |
| **Project** | `./CLAUDE.md` (ou `AGENTS.md`) | O repositório, versionado, todo mundo que contribui |
| **Local** | arquivo local de memória | Só a sua máquina: não versionar |
| **Managed** | imposta pela organização/MDM | Tem precedência máxima |

### Como escrever memória

- **`/memory`**: abre o editor de arquivos de memória (escolhe qual nível editar).
- **`#` no início do prompt**: atalho para adicionar uma lembrança rápida na memória do projeto.
- **`@caminho/arquivo.md`**: importa outro arquivo dentro do CLAUDE.md (imports fora do diretório pedem aprovação). Aceita aninhado.

### Organização com regras

- Regras separadas em **`.claude/rules/*.md`**: cada arquivo com glob de escopo no frontmatter (ex.: `src/**/*.ts`). É a forma recomendada de não engordar o CLAUDE.md.
- **`AGENTS.md`** é carregado nativamente (modo padrão: carrega `CLAUDE.md` *ou* `AGENTS.md`; se existirem os dois, há modo para os dois). Compatível com outros agentes que também leem AGENTS.md.
- **Comandos** ficam em `.claude/commands/<nome>.md` → viram `/nome`.
- **Skills** também: `skill/SKILL.md` com frontmatter `name` + `description` (slash commands e skills foram unificados no Claude Code atual).

### Boas práticas

- **Curto e verdadeiro:** memória grande = contexto caro. Regra: se não muda o comportamento, não entra.
- **Nunca** em memória: senhas, tokens, chaves de API (o CLAUDE.md fica no Git).
- Separe **regra** (CLAUDE.md/rules) de **estado** (`.claude-memory.md`) de **lição** (`tasks/lessons.md`).
- Revise a memória do projeto de tempos em tempos: o que virou obsoleto sai.

---

## Checklist rápido

- [ ] `primer.md` com visão + stack + comandos
- [ ] `.claude-memory.md` com a última sessão
- [ ] `tasks/lessons.md` com pelo menos a primeira lição
- [ ] `CLAUDE.md` do projeto enxuto, com `@imports` e `.claude/rules/` se crescer
- [ ] `/memory` e `#` conhecidos do time
- [ ] Sem segredos versionados

**Referência oficial:** [claude.com/docs/claude-code/memory](https://claude.com/docs/claude-code/memory)
