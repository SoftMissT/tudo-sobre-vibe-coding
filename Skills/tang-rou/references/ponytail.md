# Ponytail — a solução mais preguiçosa que realmente funciona

Preguiçosa quer dizer eficiente, não descuidada. O melhor código é o que nunca precisou ser escrito: cada linha a mais é uma linha para manter, depurar e quebrar num world de outra pessoa. Esta é a lente da TANG-ROU na fase **Desenhar**: ela decide *quanto* código escrever, e as regras do `SKILL.md` §5 decidem *como* ele fica.

Fonte: adaptação da skill `ponytail` (MIT) para Foundry VTT.

## Níveis

Padrão: **full**. Troque com "ponytail lite|full|ultra" ou "modo preguiça". Persiste até o operador mandar sair ("normal mode", "pare o ponytail") ou a sessão acabar.

| Nível | O que muda |
|---|---|
| **lite** | Constrói o que foi pedido e cita a alternativa mais simples em uma linha. O operador escolhe. |
| **full** | A escada abaixo é obrigatória. Menor diff, menor explicação. |
| **ultra** | Deleção antes de adição. Entrega o one-liner e questiona o resto do requisito na mesma resposta. Aqui (e só aqui) vale "código primeiro, no máximo três linhas depois". |

Nos níveis lite e full o **formato de entrega do `SKILL.md` §7 continua valendo** — ele existe para o operador saber o que foi feito e validado.

## A escada (pare no primeiro degrau que segura)

1. **Precisa existir?** Necessidade especulativa: não faça, e diga em uma linha. (YAGNI)
2. **Já existe neste projeto?** Helper, util, macro ou padrão que mora poucos arquivos adiante. Procure antes de escrever; reimplementar o que está ao lado é o desperdício mais comum.
3. **A linguagem ou o core do Foundry resolvem?** `foundry.utils` (`mergeObject`, `getProperty`, `randomID`), `Array`/`Set`/`Map`, `structuredClone`, `fromUuid`.
4. **Um recurso nativo cobre?** Active Effect em vez de macro que reaplica bônus; `flags` e `settings` em vez de variável global; `CONFIG`/hook oficial em vez de monkey-patch; CSS em vez de JS; constraint de data model em vez de validação espalhada.
5. **Um módulo já instalado resolve?** Midi-QOL, DAE, Sequencer, Warp Gate: use, mas só depois de confirmar que estão ativos e na versão certa (SKILL §2). Nunca adicione dependência nova para o que poucas linhas fazem.
6. **Cabe em uma linha?** Uma linha.
7. **Só então:** o mínimo de código que funciona.

A escada é reflexo, não projeto de pesquisa, e roda **depois** de entender o problema: leia a tarefa e o código que ela toca, trace o fluxo real, então suba. Dois degraus servem: fique com o mais alto e siga.

## Bug: causa raiz, não sintoma

O relato nomeia um sintoma. Antes de editar, procure todos os chamadores da função que vai mexer (`references/impacto.md`). A correção preguiçosa É a correção da causa raiz: um guard na função compartilhada é diff menor que um guard em cada chamador, e remendar só o caminho do ticket deixa os irmãos quebrados.

## Regras

- Sem abstração que ninguém pediu: interface com uma implementação, fábrica de um produto, config para valor que nunca muda.
- Sem andaime "para depois". O depois monta o próprio andaime.
- Deleção antes de adição. Chato antes de esperto: esperto é o que alguém decifra às 3 da manhã.
- Poucos arquivos. Diff curto vence, mas só depois de entender o problema: a menor mudança no lugar errado é um segundo bug.
- Pedido complexo: entregue a versão preguiçosa e questione na mesma resposta ("Fiz X; Y já cobre. Quer o X completo? Diga."). Nunca trave numa pergunta que dá para ter padrão.
- Duas opções do mesmo tamanho: a que acerta os casos de borda. Preguiça é escrever menos, não escolher o algoritmo mais frágil.
- Atalho deliberado com teto conhecido leva um comentário `// ponytail:` com o teto e o caminho de upgrade (`// ponytail: varre todos os tokens da cena; indexar por actor se passar de ~200`).

## Quando NÃO ser preguiçosa

Nunca corte: validação em fronteira de confiança (entrada do usuário, dados de socket), tratamento de erro que evita perda de dados, permissões de GM/jogador, segurança, o que o operador pediu explicitamente. Operador insiste na versão completa: construa, sem rediscutir.

Nunca seja preguiçosa para **entender**. A escada encurta a solução, nunca a leitura. Preguiça que pula a compreensão para entregar diff pequeno é a perigosa: parece eficiência e entrega correção errada com confiança.

Preguiça sem verificação é trabalho inacabado. Lógica não trivial (ramo, laço, parser, caminho de dados ou permissão) deixa **uma** verificação rodável: um `assert` no fim da macro, um teste pequeno se o projeto já tem runner, ou um roteiro de três linhas para o Foundry. Sem framework novo, sem fixture. One-liner trivial não precisa.

## Exemplo

Pedido: "cache das respostas de busca de itens por nome."

- lite: "Feito, cache criado. Aviso: `Map` com a chave do nome cobre isso em três linhas, se preferir não manter uma classe."
- full: "`Map` por nome, limpo no hook `updateItem`. Pulei classe de cache; adiciono quando a medição mostrar que o `Map` não basta."
- ultra: "Sem cache até medir. Quando medir: `Map`. Classe de TTL à mão é fábrica de bug com taxa de acerto."
