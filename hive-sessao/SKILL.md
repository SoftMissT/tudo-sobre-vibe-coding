---
name: hive-sessao
description: Abre e fecha sessões de trabalho na Fluctlight Hive de Nelson/SoftMissT e cataloga tudo (skills usadas, decisões, estado, próximos passos) na memória da Hive. Use SEMPRE que Nelson disser "abrir sessão", "iniciar sessão", "link start", "bom dia Hive", "fechar sessão", "encerrar sessão", "terminamos por hoje", "salvar sessão", "session close", "catalogar sessão", "handoff", ou pedir para registrar/salvar as skills usadas, mesmo sem citar a palavra "Hive". Funciona em qualquer cliente (Claude Code, Codex, OpenCode, Antigravity, Claude Desktop) e nunca commita sozinha.
---

# hive-sessao

Dois modos: **ABRIR** (boot e abertura do registro da sessão) e **FECHAR** (catalogar e salvar tudo, inclusive as skills usadas). Escolha o modo pelo pedido de Nelson; se estiver ambíguo, pergunte.

A Hive guarda memória em camadas (L0 volátil, STATE, STATUS, wings, projeto, catálogo). O problema que esta skill resolve: as skills usadas numa sessão se perdiam porque nenhum fluxo as registrava. Por isso o registro de skills é aberto no início e **gravado à força** no fim.

## Premissas (leia antes de agir)

- **Raiz da Hive:** `D:\fluctlight-vault\Hive`. Se o caminho não existir (outro SO, mount diferente), procure a variável `HIVE_ROOT` ou pergunte a Nelson. Não invente caminho.
- **Sem acesso ao vault** (sessão cloud, sem o disco): não finja que gravou. Gere os blocos `.md` prontos, com o caminho de destino de cada um, e diga explicitamente que nada foi gravado.
- **Fonte da verdade é o Markdown.** MemPalace, open-mem e ai-memory são índices derivados; não os trate como substitutos.
- **Nunca commite, nunca sobrescreva, nunca apague.** `Global_Rules.md` proíbe ação irreversível sem confirmação. Edite por acréscimo (append) e preserve o conteúdo existente.
- **Segredos:** não grave chaves, senhas, tokens, dados de saúde ou de clientes em nenhum arquivo.
- **Projeto novo** não é criado aqui: use `new-project.ps1` e só depois volte.

## Registro de skills usadas

Mantenha, durante toda a sessão, a lista de skills usadas. Cada item tem **skill**, **para quê** e **origem**:

- `observada`: você viu a skill ser carregada/invocada nesta conversa (chamada da ferramenta Skill, comando `/nome`, ou instrução explícita de uma skill que você seguiu).
- `informada`: Nelson disse que usou, ou o cliente não expõe o histórico.
- `inferida`: palpite por indícios. Marque como tal; nunca promova a observada.

Esta skill (`hive-sessao`) e `hive-mako-mori` entram na lista quando usadas. No fechamento, releia a conversa inteira para completar a lista antes de gravar, porque skills carregadas no meio da sessão são as mais esquecidas. Se o cliente não permite ver o histórico, pergunte a Nelson em uma linha: "Usou alguma skill que eu não vi?".

---

## Modo ABRIR

1. **Boot canônico**, nesta ordem (ler, não modificar): `BRAIN.md` → `system/HIVE.md` → `system/Global_Rules.md` → `000-index.md` → `Memory/shared/STATUS.md` → `system/STATE.md` → `souls/MAKO-MORI.soul.md`. Se um arquivo faltar, registre a falta e siga com o que existe.
2. **Resolver o projeto.** Se Nelson nomeou um projeto ou o diretório atual bate com um dos rastreados no BRAIN (seção Projetos), use-o. Se não, pergunte qual. Não carregue memória de vários projetos.
3. **Carregar memória do projeto:** `knowledge/projects/<slug>/system/MEMORY.md`, `STATE.md`, `tasks/lessons.md`, `tasks/todo.md`. Leia as lições antes de começar para não repetir erro já registrado.
4. **Abrir o registro da sessão:** crie (ou retome) a seção da sessão em `Memory/shared/L0_working_memory.md` com data, cliente, projeto e a lista de skills usadas (começando com `hive-sessao`). Acrescente; não apague o L0 existente sem Nelson confirmar.
5. **Devolver um briefing curto** (máx. ~10 linhas): projeto e fase, último estado, gates pendentes, riscos, próximo passo sugerido, e o que faltou no boot. Termine perguntando o objetivo da sessão se ele ainda não foi dito.

## Modo FECHAR

Antes de gravar, monte o resumo em memória: objetivo, o que foi feito, decisões (com motivo), erros e correções (formato Erro / Causa / Correção / Regra preventiva), pendências, próximo passo e **lista final de skills usadas**. Mostre o resumo em poucas linhas e grave em seguida (Nelson autorizou salvar tudo sem perguntar; só pergunte se algo estiver ambíguo, como qual é o projeto).

Grave **todos** os destinos abaixo. Os formatos exatos estão em `references/formatos.md`; leia o arquivo-alvo antes e copie a convenção que ele já usa.

| # | Destino | O que entra |
|---|---|---|
| 1 | `Memory/shared/L0_working_memory.md` + arquivo em `Memory/archive/<ano>/<mês>/` | Registro completo da sessão. Preserve o L0 salvo se Nelson pedir `-ClearL0`. |
| 2 | `knowledge/projects/<slug>/system/STATE.md` | Estado atual do projeto. |
| 3 | `knowledge/projects/<slug>/tasks/lessons.md` e `todo.md` | Lições novas e pendências. |
| 4 | `Memory/wings/<agente>/diary.md` e `projects/<slug>/diary.md` | Diário da sessão do(s) agente(s) que atuaram, com as skills usadas. |
| 5 | `Memory/shared/STATUS.md` | Uma linha: data, projeto, resultado, gates pendentes. |
| 6 | `000-log.md` | `## [YYYY-MM-DD] [sessão] \| <título>` (append-only). |
| 7 | **`Memory/shared/SKILLS-USADAS.md`** | Catálogo acumulado de skills (ver abaixo). |
| 8 | `system/MEMORY.md` | Só se houver contexto permanente de alto valor. Limite ~2.200 caracteres: resuma, não acumule. |
| 9 | `system/Decisions.md` | Só se surgiu uma decisão arquitetural (ADR). |

Se o `session-close.ps1` estiver disponível e fizer parte do que já está nos itens 1, 2 e 6, rode-o **sem** `-Commit` em vez de duplicar o trabalho, e complete à mão o que ele não cobre (itens 3, 4, 5, 7). Se não puder rodar scripts, escreva os arquivos diretamente.

### Catálogo `SKILLS-USADAS.md` (item 7)

É a peça nova. Duas partes:

- **Tabela acumulada**, uma linha por skill: nome, nº de sessões, última vez usada, projetos em que apareceu, para-quê típico. Ao fechar, some +1 às skills desta sessão e atualize a data. Skill nova ganha linha nova.
- **Registro por sessão**, append-only no fim: `## [data] <projeto> | <cliente>` com a lista de skills e a origem (observada/informada/inferida) de cada uma.

Se o arquivo não existir, crie com o frontmatter padrão do vault (veja `references/formatos.md`).

### Depois de gravar

1. **Validar:** rode a skill `integrity-vault` se existir (frontmatter e wikilinks) nos `.md` tocados; senão, confira à mão que o frontmatter está íntegro e os links `[[...]]` apontam para arquivos reais.
2. **Relatório final** com, para cada destino, uma destas marcas: `gravado`, `não gravado (motivo)` ou `pulado (não se aplica)`. Inclua a lista final de skills com a origem de cada uma. Não diga "salvo" para o que não foi gravado.
3. **Lembrar, sem agir:** "Nada foi commitado. Para versionar: `vault: sessão <data> <projeto>`." O commit é decisão de Nelson.

## Quando algo dá errado

- Arquivo-alvo ausente: crie só se for um destino novo desta skill (`SKILLS-USADAS.md`); para os demais, avise e use o template de `references/formatos.md` apenas com autorização.
- Escrita falhou ou sem permissão: continue com os outros destinos e liste a falha no relatório; não interrompa o fechamento inteiro.
- Dúvida sobre fato da sessão (o que foi decidido, qual projeto): diga "Não sei" e pergunte; não preencha por palpite, porque a memória errada contamina as próximas sessões.
