---
name: hive-sessao
description: Abre e fecha sessões de trabalho na Fluctlight Hive de Nelson/SoftMissT e cataloga tudo (skills usadas, decisões, estado, próximos passos) na memória da Hive. Use SEMPRE que Nelson disser "abrir sessão", "iniciar sessão", "link start", "bom dia Hive", "fechar sessão", "encerrar sessão", "terminamos por hoje", "salvar sessão", "session close", "catalogar sessão", "handoff", ou pedir para registrar/salvar as skills usadas, mesmo sem citar a palavra "Hive". Funciona em qualquer cliente (Claude Code, Codex, OpenCode, Antigravity, Claude Desktop) e nunca commita sozinha. Não use para a sessão de jogo de RPG no Foundry (tunel, "iniciar/fechar aventura"); isso é Iniciar-Aventura/Fechar-Aventura, e em caso de dúvida pergunte qual das duas Nelson quer.
---

# hive-sessao

Dois modos: **ABRIR** (boot e abertura do registro da sessão) e **FECHAR** (catalogar e salvar tudo, inclusive as skills usadas). Escolha pelo pedido de Nelson; se estiver ambíguo, pergunte.

Por que existe: o fechamento da Hive quase não é feito (em ago–set só 3 arquivos de sessão, todos de um projeto), e as skills usadas não ficam registradas em lugar nenhum, o que a regra 17 do `Skill_Registry` chama de skill órfã. Esta skill abre um registro de skills no início e o **grava à força** no fim.

## Premissas (leia antes de agir)

- **Raiz da Hive:** `D:\fluctlight-vault\Hive`. Se não existir (outro SO, mount diferente), procure `HIVE_ROOT` ou pergunte. Não invente caminho.
- **Sem acesso ao vault** (sessão cloud): não finja que gravou. Gere os blocos `.md` prontos, com o caminho de cada um, e diga que nada foi gravado.
- **Fonte da verdade é o Markdown.** MemPalace, open-mem e ai-memory são derivados. O open-mem está inerte desde 2026-08-26 e seu export não deve ser rodado; se o `ai-memory` gerar um handoff, cite o id no registro, mas não crie um.
- **Nunca commite, sobrescreva ou apague.** Edite por acréscimo e preserve o existente. Respeite `agents_allowed` no frontmatter do arquivo-alvo (o diário da MAKO-MORI só aceita ela; o da TANG-ROU aceita as duas).
- **Segredos e dados sensíveis** (chaves, senhas, saúde, clientes): não grave em nenhum arquivo. Não leia `Memory/shared/USER.md` sem necessidade.
- **Scripts** ficam em `<HIVE_ROOT>\scripts\` e exigem **PowerShell 7** (`pwsh`). Sem `pwsh`, escreva os arquivos direto.
- **Projetos moram em dois lugares:**
  - *Canônicos*, `knowledge\projects\<Nome>\`: 13 projetos de `new-project.ps1`, com `PRIMER.md`, `system\STATE.md`, `tasks\lessons.md`. Só estes funcionam com `session-close.ps1`. Passe o nome exatamente como a pasta (tem espaços e acentos: `Batata-Ou-Não`), entre aspas.
  - *Anteriores*, `wiki\projects\`: SSFU, `lumenn-moovies`, `MACRO-NA-FOUNDRY`, `Ficha_CdS_planilha`, e `tudo-sobre-vibe-coding.md` (nota única, sem STATE). O `session-close.ps1` **falha** neles; não o rode.
  - *Achar o STATE:* `knowledge\projects\<Nome>\system\STATE.md` → `wiki\projects\<Nome>\system\STATE.md` ou `STATE.md` da raiz → `Memory\wings\<agente>\projects\<slug>\STATE.md`. Não crie projeto canônico sozinha: ofereça `new-project.ps1`.
- **Wings** (`Memory\wings\`): só `mako-mori`, `sinon`, `tang-rou`; só as duas primeiras têm `projects\<slug>\`. Cada agente tem 3 papéis de arquivo:
  - `<agente>\STATE.md` = **roteador** (frontmatter `active_project`, `project_memory`, `last_updated`; só roteamento).
  - `<agente>\diary.md` = **índice** por projeto (tabela Projeto | Entradas | Entrada mais recente | Memória). Sessão nova **não** vai aqui, e sim no diário do projeto (o `diary.md` da TANG-ROU tem uma entrada solta no fim, de 2026-09-09, que é o exemplo do que evitar).
  - `<agente>\projects\<slug>\STATE.md` e `diary.md` = estado e diário do projeto.
  - O `<slug>` é minúsculo e sem acento, mas inconsistente (`batata-ou-nao` e `batata-ou-nao-v2`): use a pasta que já existe para o projeto; só crie com a regra do `new-project.ps1` se não houver. Sem projeto, `projects\_cross-project\`. Agente sem wing: registre na da MAKO-MORI e cite o agente.
- **Conversas** são arquivadas por outro mecanismo (hooks → `conversation-archive.ps1` → `src/conversations/` e `wiki/conversations/transcripts/`), depois do fechamento. Está falhando muito: 69 envelopes parados em `Memory/conversations/queue/`, e o ledger tem só 12 capturas (Claude Code: 2, de 1 e 3 mensagens). Causas vistas nos logs: o hook entrega `transcript_path` vazio (52 envelopes, que `-Recover` **nunca** resolve), o hook do Claude dispara em sessões do Codex e o normalizador não acha mensagens (17), e o Claude Code é "ignorado sem transcrição materializada" (15 só em 2026-10-01). Portanto não conte com a transcrição como prova, não rode o arquivamento por conta própria, e na abertura avise Nelson se a fila tiver `*.json`. Em sessão cloud não há hook; diga isso no relatório.

## Registro de skills usadas

Mantenha durante a sessão a lista de skills usadas: **skill**, **para quê**, **origem**.

- `observada`: você viu a skill ser carregada nesta conversa (ferramenta Skill, `/nome`, ou instrução de skill que você seguiu, inclusive lida pelo sistema de arquivos).
- `informada`: Nelson disse, ou o cliente não expõe o histórico.
- `inferida`: palpite por indícios. Marque como tal; nunca promova a observada.

`hive-sessao` e `hive-mako-mori` entram quando usadas. No fechamento, releia a conversa inteira antes de gravar: skills carregadas no meio são as mais esquecidas. Se o cliente não mostra o histórico, pergunte em uma linha: "Usou alguma skill que eu não vi?". Não use transcrições arquivadas para conferir (ver Conversas acima).

---

## Modo ABRIR

1. **Boot** (ler, não modificar): `BRAIN.md` → `system/HIVE.md` → `system/Global_Rules.md` → `000-index.md` → `Memory/shared/STATUS.md` → `system/STATE.md` → `souls/MAKO-MORI.soul.md`. Faltou arquivo: registre e siga. Com `pwsh`, `scripts\hive-status.ps1` (leitura) dá snapshot de projetos, último log e CLIs. No `STATUS.md` e no L0, **leia o começo e o fim** (~40 e ~30 linhas): as entradas mais novas ficam em qualquer das pontas; ordene pela data, não pela posição.
2. **Resolver o projeto:** o que Nelson nomeou ou o diretório atual (projetos rastreados no BRAIN). Na dúvida, pergunte. Não carregue memória de vários projetos.
3. **Carregar a memória do projeto** (achar o STATE pela ordem das Premissas): `PRIMER.md`, `system/MEMORY.md`, `system/STATE.md`, `tasks/lessons.md`, `tasks/todo.md`; na wing do agente, `<agente>\STATE.md` (roteador) e as últimas linhas do diário do projeto. Se o repositório de código tiver `.specs/STATE*` ou `.planning/`, leia e avise se divergir do STATE da Hive (não reconcilie sozinha). Leia as lições antes de começar.
4. **Abrir o registro:** acrescente ao fim do L0 um bloco `## AAAA-MM-DD — <Projeto> — sessão aberta` (formato em `references/formatos.md`) com cliente, baseline conhecida e a lista de skills, começando por `hive-sessao`. Não apague o L0 existente.
5. **Briefing curto** (~10 linhas): projeto e fase, último estado, gates pendentes, riscos, próximo passo, o que faltou no boot e, se houver, a fila de conversas parada. Pergunte o objetivo se ainda não foi dito.

## Modo FECHAR

Monte antes o resumo: objetivo, feito, decisões (com motivo), erros (Erro / Causa / Correção / Regra preventiva), pendências, próximo passo e a **lista final de skills**. Mostre em poucas linhas e grave (Nelson autorizou salvar tudo sem perguntar; só pergunte se algo for ambíguo, como o projeto). Afirme só o que foi verificado: gate runtime não rodado entra como **Aberto/Pendência**, nunca como validado. Os formatos estão em `references/formatos.md`; leia o arquivo-alvo e copie a convenção dele.

| # | Destino | O que entra |
|---|---|---|
| 1 | `Memory/shared/L0_working_memory.md` e arquivo da sessão em `Memory/archive/<ano>/<mês>/` | Bloco `sessão encerrada` no fim do L0 (com skills e, se houver, id do handoff ai-memory); o arquivo da sessão copia o L0. |
| 2 | STATE do projeto (ordem das Premissas) | Fase, marco, gates, próximo passo e `last_updated`. |
| 3 | `knowledge/projects/<Nome>/tasks/lessons.md` e `todo.md` | Só em projeto canônico. |
| 4 | Wing: **(a)** `projects/<slug>/diary.md` e/ou `STATE.md` do projeto, **(b)** linha do projeto no índice `<agente>/diary.md` (Entradas +1, Entrada mais recente), **(c)** roteador `<agente>/STATE.md` (`active_project`, `project_memory`, `last_updated`, linha Sessão) | Faça (a), (b) e (c). Entrada de sessão só em (a). |
| 5 | `Memory/shared/STATUS.md` | Bloco da sessão logo abaixo do título `# 00_STATUS.md`, e `last_updated`. |
| 6 | `000-log.md` | `## [AAAA-MM-DD] session \| <Nome> encerrado`, `- Hora:`, `- Resumo:` (formato do `session-close.ps1`). |
| 7 | `system/Skill_Registry.md` | **Obrigatório** (regra 17): linha para toda skill usada que ainda não esteja lá. |
| 8 | `Memory/shared/SKILLS-USADAS.md` | Catálogo de **uso** (contagem e histórico), separado do inventário. |
| 9 | `system/MEMORY.md` (global) | Só contexto permanente, em `## Log de Atualizações`; ~2.200 caracteres; **não toque** em `## Sessões Recentes (open-mem)`. |
| 10 | `system/Decisions.md` | Só se houve decisão arquitetural. |
| 11 | `Memory/shared/CHANGELOG.md` | Só se a sessão mudou código ou sistema; entrada no topo. |

**Ordem por causa do `session-close.ps1`.** Ele só arquiva o L0 inteiro, troca `last_updated:` no STATE (se a chave existir) e acrescenta ao `000-log`; não toca nos demais destinos. Como copia o L0 no instante em que roda (e `-ClearL0` o esvazia), escreva antes, à mão, o bloco de encerramento no L0 e os itens 2 a 5, 7 e 8. Depois: `pwsh <HIVE_ROOT>\scripts\session-close.ps1 -Projeto "<Nome>" -Resumo "<uma frase>"`, **sem** `-Commit` (`-WhatIf` simula; `-ClearL0` só se Nelson pedir). Rode só para projeto de `knowledge\projects`. Sem `pwsh`, com projeto de `wiki\projects` ou sem projeto, faça você mesma os itens 1 e 6 (arquivo da sessão com o mesmo nome e frontmatter do script). Este segundo caso é o comum.

### Skill_Registry (item 7)

O registro é um inventário de 3 colunas (skill, path físico, propósito), agrupado por seção de missão. Para cada skill usada sem linha: acrescente `| \`nome\` | \`path físico\` | propósito |` sob uma seção da missão atual (crie `## Skills de <tema> (missão <nome> — AAAA-MM-DD)` se não houver) e atualize `last_updated`. Não mude linhas existentes. Ache o path real (`~/.claude/skills`, `~/.opencode/skills`, `~/.agents/skills`); **nunca invente**: sem achar, escreva `(path não verificado)`. Hoje há lacunas: o registro tem 8 skills de design, e `ponytail-audit` e `web-performance-optimization`, citadas no STATE de `tudo-sobre-vibe-coding`, não estão nele.

### SKILLS-USADAS (item 8)

Tabela acumulada (skill, sessões, última vez, projetos, para quê) mais registro por sessão em append-only (`## [data] <projeto> | <cliente>`, com a origem de cada skill). Some +1 às desta sessão. Crie o arquivo com o frontmatter padrão se não existir e ponha um link para `system/Skill_Registry`.

### Depois de gravar

1. Valide os `.md` tocados (skill `integrity-vault` se existir; senão confira frontmatter e `[[links]]`).
2. **Relatório:** para cada destino, `gravado`, `não gravado (motivo)` ou `pulado`. Inclua a lista de skills com a origem e quais entraram no Registry. Não diga "salvo" para o que não gravou.
3. Diga o que acontece depois: a transcrição só é arquivada se este cliente tiver hook funcionando (ver Conversas).
4. Lembre, sem agir: "Nada foi commitado. Para versionar: `vault: sessão <data> <projeto>`."

## Quando algo dá errado

- Destino ausente: crie só os que são desta skill (`SKILLS-USADAS.md`); nos demais avise.
- Escrita falhou: siga com os outros destinos e liste a falha; não aborte o fechamento.
- Dúvida sobre fato da sessão (o que foi decidido, qual projeto): diga "Não sei" e pergunte. Memória errada contamina as próximas sessões.
