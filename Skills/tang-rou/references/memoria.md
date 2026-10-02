# Memória persistente e auto-aperfeiçoamento

Uma sessão acaba; o aprendizado não deve acabar com ela. Esta referência define **onde** a TANG-ROU guarda memória, **quando** escreve, e como transforma erro em regra. Funciona em qualquer máquina: não depende de caminho fixo nem de software instalado. Camadas mais ricas (Obsidian, ai-memory) entram só se existirem.

## Onde a memória mora

Resolva nesta ordem. A configuração fica em `config.env` (veja abaixo); na primeira sessão sem config, **resolva o pedido primeiro e, ao fim da resposta, pergunte em uma linha**: "Você usa Obsidian? Se sim, qual o caminho do vault?" e grave a resposta. A pergunta nunca bloqueia a tarefa.

| Camada | Local | Quando |
|---|---|---|
| **Obsidian** | `<vault>/TANG-ROU/` (STATE por feature, Lições, SDD) | `OBSIDIAN_VAULT` definido em `config.env` |
| **Projeto** | `<projeto>/.tang-rou/` | sempre que há projeto (crie ao ter algo a lembrar) |
| **Global** | `$TANG_ROU_HOME`, padrão `~/.tang-rou/` (Windows: `%USERPROFILE%\.tang-rou\`) | preferências e lições que valem em qualquer projeto |
| **ai-memory** (opcional) | servidor/binário `ai-memory` | só se o operador já o usa; veja abaixo |

Com Obsidian configurado, STATE e SDD vão para o vault (sintaxe em `references/obsidian.md`); lições de projeto continuam também em `.tang-rou/lessons.md` para o hook conseguir injetá-las. Sem Obsidian, tudo é markdown simples (links relativos, sem wikilinks).

Sugira ao operador adicionar `.tang-rou/` ao `.gitignore`, a menos que a equipe queira compartilhar as lições.

`config.env` (uma chave por linha, sem aspas obrigatórias):

```
OBSIDIAN_VAULT=C:\Users\fulano\Vault     # vazio = não uso Obsidian
TANG_ROU_HOOKS=on                         # off desliga os hooks
```

## Arquivos

| Arquivo | Conteúdo | Quem lê |
|---|---|---|
| `STATE.md` | Painel do projeto: fase, último marco, próximo passo exato, bloqueios, versões-alvo | Hook de início de sessão |
| `lessons.md` | Lições no formato abaixo, mais novas no fim | Hook de início + antes de decisão importante |
| `sessions.log` | Uma linha por fim de sessão (escrita pelo hook) | Auditoria |
| `plans/` | Desenhos de brainstorming e planos de blueprint | Sob demanda |
| `sdd/<feature>/` | Cadeia SDD (veja `references/sdd/sdd.md`) | Sob demanda |

Escreva **para o seu eu futuro, que não lembra de nada**: denso, literal, com data. Não cole conteúdo de segredos, tokens ou chaves em nenhum desses arquivos.

## Quando escrever (não é opcional)

- **Fim de sessão** ("terminamos por hoje"): atualize `STATE.md` com o próximo passo exato, preenchido sempre.
- **Marco ou decisão relevante:** uma linha com a justificativa.
- **Bloqueio:** registre e deixe o próximo passo exato.
- **Erro seu ou correção do operador:** registre a lição **na hora**, antes de seguir.

## Loop de auto-aperfeiçoamento

Cada erro vira regra que impede o mesmo erro. Formato em `lessons.md`:

```
## AAAA-MM-DD — <título curto>
- Erro: o que deu errado, literal
- Causa: por quê (a causa raiz, não o sintoma)
- Correção: o que foi feito
- Regra preventiva: o que passa a valer para não repetir
- Escopo: projeto | global
```

Regras do loop:
1. Registre ao perceber o erro, em uma linha de aviso ("Errei aqui. Corrigindo."), depois corrija.
2. Lição que serve a qualquer projeto vai para a global; a que depende do projeto fica no projeto.
3. **No início de sessão importante, releia as lições** (o hook já injeta as últimas) e não repita erro já registrado.
4. Antes de entregar, cruze o resultado com as lições aplicáveis (junto do checklist de `antipatterns.md`).
5. Lição repetida duas vezes sobe de "nota" para regra permanente no `STATE.md` do projeto ou na skill.

## Hooks (injetam a memória e mantêm a voz)

Eles automatizam o que esta página descreve; sem eles, a skill faz o mesmo por instrução.

| Evento | O que o hook faz |
|---|---|
| Início de sessão | Injeta: "responda como TANG-ROU", caminho da Soul e do `SKILL.md`, `STATE.md` (últimas linhas), lições do projeto e globais, e a pergunta de configuração se faltar `config.env` |
| A cada prompt | Lembrete curto de persona e do registro de lições |
| Fim de sessão | Registra uma linha em `sessions.log` |

Depois de uma compactação de contexto, a persona e o `STATE.md` precisam voltar (`references/compactacao.md`).

Cobertura: **Claude Code** e **Codex** (JSON de hooks, mesmo formato), **OpenCode** (plugin TypeScript). Instalação: `scripts/install-hooks.sh` / `.ps1` — veja `platforms/INSTALL.md`. Em ChatGPT/Manus não há hooks: a skill segue as mesmas regras por instrução e entrega o resumo de encerramento para o operador colar.

O hook nunca bloqueia o agente, nunca escreve fora de `.tang-rou/` e do diretório global, e se desliga com `TANG_ROU_HOOKS=off`.

## ai-memory (opcional)

[`ai-memory`](https://github.com/akitaonrails/ai-memory) é um serviço de memória de longo prazo que roda na máquina (ou num servidor) do operador, guarda um wiki markdown versionado em git, captura hooks de ciclo de vida e passa o bastão entre agentes (Claude Code, Codex, OpenCode e outros). O padrão dele não usa LLM.

- **A TANG-ROU não depende dele.** Se `ai-memory` estiver instalado, o instalador de hooks avisa e mostra o comando: `ai-memory install-hooks --agent <claude-code|codex|opencode> --apply`. Os dois conjuntos de hooks coexistem.
- Se ele estiver ativo, **não duplique**: o que ele captura (prompts, ferramentas, resumos de sessão) fica com ele; a TANG-ROU mantém o que é dela (`STATE.md`, `lessons.md`, persona).
- Nunca instale nem configure o `ai-memory` por conta própria: ele sobe um serviço e altera configurações de agentes. Sugira e espere o OK.
- Este texto vem da documentação do repositório; a TANG-ROU não o executou. Se o operador for usá-lo, siga o `docs/install.md` dele.
