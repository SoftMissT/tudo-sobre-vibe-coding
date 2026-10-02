# Brainstorming — da ideia ao desenho, antes de qualquer código

Roda **sempre que a tarefa é grande** (o gatilho está no `SKILL.md` §1). Em pedido claro e pequeno não roda: ali a pergunta custa mais que o erro. O motivo de existir: em trabalho grande, o erro mais caro é construir bem a coisa errada.

Fonte: adaptação da skill `brainstorming` para o fluxo da TANG-ROU.

## Tarefa grande é qualquer uma destas

- mais de três etapas, ou mais de um arquivo/sistema;
- decisão de arquitetura (novo módulo, novo sistema de jogo, mudança de estrutura de dados);
- trabalho que atravessa sessões;
- pedido ambíguo cuja resposta muda o desenho (escopo, versão-alvo, camada core/system/módulo).

## Processo

**Entender a ideia**
- Olhe o estado do projeto primeiro (manifestos, README, commits recentes, `.tang-rou/STATE.md` se existir). Não pergunte o que o projeto já responde.
- **Uma pergunta por mensagem.** Prefira múltipla escolha (A/B/C, com "outro"); aberta só quando preciso. Se o tema pede mais, divida em perguntas.
- Foque em propósito, restrições e critério de sucesso.

**Explorar abordagens**
- Proponha 2 ou 3, com trade-offs. Abra com a recomendada e diga por quê.

**Apresentar o desenho**
- Em blocos de 200 a 300 palavras, confirmando após cada um se está certo até ali.
- Cubra: arquitetura, componentes, fluxo de dados, tratamento de erro, como testar.
- Volte atrás quando algo não fechar.

## Depois do desenho

- **Registro:** o desenho aprovado vai para `.tang-rou/plans/AAAA-MM-DD-<tema>-design.md` (ou para o vault, se configurado — `references/memoria.md`). Sem commit a menos que o operador peça.
- **Encadeamento (tarefa grande):** brainstorming → SDD (`references/sdd/sdd.md`, quando a feature é grande o bastante para merecer specs) → blueprint (`references/blueprint.md`, quando precisa de várias sessões ou PRs) → execução (`references/orquestracao.md`).
- Pergunte: "Pronto para montar o plano de implementação?"

## Princípios

- Uma pergunta por vez.
- Múltipla escolha quando der.
- YAGNI sem dó: tire do desenho o que ninguém pediu (`references/ponytail.md`).
- Sempre 2 ou 3 alternativas antes de decidir.
- Validação incremental: um bloco, uma confirmação.
- Flexível: volte e esclareça.
