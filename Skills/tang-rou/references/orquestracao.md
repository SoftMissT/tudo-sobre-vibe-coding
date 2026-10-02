# Orquestração — paralelo para investigar, um por vez para editar

Junta duas práticas: despachar agentes em paralelo para problemas independentes, e executar um plano com um agente novo por tarefa e revisão em duas etapas. Complementa `references/roles.md` (pesquisador, coder, auditor). Sem subagentes na plataforma, faça tudo em sequência, com fases rotuladas, e **não diga que delegou**.

Fontes: adaptação de `dispatching-parallel-agents` e `subagent-driven-development`.

## Escolha o modo

| Situação | Modo |
|---|---|
| 2+ falhas ou pesquisas em domínios independentes, sem estado compartilhado | **Paralelo**: um agente por domínio |
| Falhas relacionadas (corrigir uma pode corrigir outras), contexto de sistema inteiro necessário, depuração exploratória | **Um agente investiga tudo** |
| Plano com tarefas independentes, para executar nesta sessão | **Uma tarefa por agente novo + revisão em duas etapas** |
| Tarefas acopladas, ou dois agentes tocariam o mesmo arquivo | **Sequencial** |

Regra que não muda: **dois agentes nunca editam o mesmo arquivo ao mesmo tempo, e nunca há dois implementadores em paralelo.** Paralelo vale para pesquisa, leitura e auditoria, ou para edição em arquivos disjuntos. O motivo: conflito de edição custa mais do que o paralelismo economiza.

## Paralelo: como despachar

1. **Agrupe por domínio** (ex.: macro de combate, ficha, migração de dados). Cada um precisa ser entendido sem o contexto dos outros.
2. **Dê a cada agente:** escopo único (um arquivo ou subsistema); objetivo claro; restrições ("não mexa em outro código"); saída esperada (causa raiz e o que mudou).
3. **Prompt autocontido:** cole os erros, os nomes dos testes, a versão-alvo do Foundry. O agente não vê esta conversa.
4. **Integre:** leia cada resumo, confira conflitos, rode a suíte completa, faça verificação por amostragem (agentes erram de forma sistemática).

Prompt ruim: "arrume tudo" (agente se perde), "arrume a race condition" (sem onde), sem restrição (refatora o mundo), "arrume" (você não sabe o que mudou). Bom: "Corrija os 3 testes de `x.test.js`: [erros]. Ache a causa raiz — não aumente timeout. Não altere código de produção além do necessário. Devolva causa raiz e mudanças."

## Execução de plano: um agente novo por tarefa

Controlador (você) lê o plano uma vez, extrai todas as tarefas com texto completo e contexto, e cria a lista de acompanhamento. Por tarefa:

1. **Implementador** (agente novo, texto completo da tarefa, sem ler o plano). Pode perguntar antes de começar: responda por completo. Implementa, testa, faz autorrevisão.
2. **Revisor de especificação:** o código cumpre o pedido, sem faltar nem sobrar? Se achar problema, o mesmo implementador corrige e o revisor repete.
3. **Só depois,** revisor de qualidade: código bem feito, convenções do projeto, sem dívida desnecessária. Mesma regra de repetir.
4. Marque a tarefa concluída. Próxima.

No fim, uma revisão final do conjunto. No Claude Code, o auditor read-only de `platforms/claude-code/.claude/agents/foundry-auditor.md` faz esse papel.

**Nunca:** pular revisão; seguir com problema aberto; começar a revisão de qualidade antes da de especificação estar aprovada; deixar a autorrevisão substituir a revisão; aceitar "quase" em conformidade com a especificação; corrigir à mão o que um subagente falhou (polui o contexto: despache um agente de correção com instruções específicas).

Custo: mais invocações e preparo do controlador. Compensa porque pega o problema cedo, quando ainda é barato.

## No Foundry

- Domínios naturalmente independentes: hooks de combate, ficha/UI, migração de compêndio, empacotamento. Domínios acoplados: um hook e a flag que ele lê.
- Pesquisador e auditor são read-only. Só o coder edita.
- Sem runtime Foundry, a verificação final é estática mais roteiro de teste (SKILL §3, fase Validar).
