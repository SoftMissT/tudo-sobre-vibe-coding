# Anti-Padrões Foundry VTT — TANG-ROU

> *"Funciona em 200ms. Pode funcionar em 20ms."* É caracterização da Soul, não medição. Só cite tempos que você mediu.

Cada item traz o diagnóstico e a condição em que ele se aplica. Quando a documentação da versão-alvo ou o contexto do código conflitar com uma regra daqui, vale a documentação.

## Sumário
1. Performance
2. Arquitetura
3. Código JavaScript
4. Checklist pré-entrega

## 1. Performance

| Anti-padrão | Diagnóstico | Solução |
|---|---|---|
| Loop sequencial com `await` por token quando as operações são independentes | "N calls à API para N tokens. Reescrevendo." | `updateEmbeddedDocuments()` em lote (ver `templates.md` §2 para tokens não vinculados) |
| `setTimeout` onde `Promise`/`await` resolve | "Race condition esperando acontecer." | `await` na operação que precisa terminar antes |
| Lookup de item por ID hardcoded | Quebra em qualquer outro world | `items.getName()` ou `fromUuid()` |
| Função de 200 linhas que faz tudo | "Isso não é uma função. São cinco." | Funções com responsabilidade única |
| `console.log` de depuração em produção | Rastro desnecessário | Remover, ou condicionar a uma flag `DEBUG` |
| Afirmar "ficou rápido" sem medir | "Como você sabe que é rápido se não mediu?" | `performance.now()` quando performance é o objetivo e dá para medir; senão, não cite tempo |
| Abstração, config ou dependência nova para o que poucas linhas resolvem | "Isso é fábrica de bug." Ponytail: `references/ponytail.md` |
| Macro que pergunta algo que pode inferir | "O token está selecionado. Por que perguntamos?" | Inferir do contexto: token controlado, personagem do usuário |

## 2. Arquitetura

| Anti-padrão | Diagnóstico |
|---|---|
| Hardcode de IDs de atores, itens ou cenas | Quebra em outro Foundry. Usar `getName()`, `fromUuid()` ou configuração |
| Estado global em variáveis soltas | Encapsular em objeto, classe ou settings |
| Macro que assume canvas pronto | Guard `canvas.ready` quando a operação usa canvas |
| Macro que assume ator selecionado | Null-check: `canvas.tokens.controlled[0]?.actor ?? game.user.character` |
| Alterar design sem ser pedido | Não tocar em CSS, Handlebars ou layout sem pedido explícito |
| Registrar hook em `ready` para coisa que precisa de `init` | Respeitar o ciclo de vida do Foundry |
| Tratar API de system ou módulo como se fosse do core | Separar as três camadas e confirmar dependências instaladas |
| Usar API privada ou deprecada como contrato estável | Conferir a documentação da versão-alvo |

## 3. Código JavaScript

```javascript
// ❌ N awaits sequenciais em operações independentes
for (const token of tokens) {
  await token.update({ "flags.meu-modulo.estado": "ativo" });
}

// ✅ Lote: uma chamada
const updates = tokens.map(t => ({ _id: t.id, "flags.meu-modulo.estado": "ativo" }));
await canvas.scene.updateEmbeddedDocuments("Token", updates);

// ❌ Frágil: ID hardcoded
const item = actor.items.get("AbCd1234XyZ");

// ✅ Lookup dinâmico
const item = actor.items.getName("Espada Longa");
// ou por UUID, seguro entre worlds
const item2 = await fromUuid(uuid);

// ❌ Race condition
setTimeout(() => doSomethingWithActor(actor), 1000);

// ✅ Determinístico
await actor.update({ /* ... */ });
doSomethingWithActor(actor);

// ❌ Explode sem token selecionado
const actor1 = canvas.tokens.controlled[0].actor;

// ✅ Com guard
const actor2 = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor2) return ui.notifications.warn("Selecione um token ou configure seu personagem.");
```

Quando NÃO usar lote: etapas que dependem do resultado da anterior, hooks que precisam disparar em ordem, permissões diferentes por documento.

## 4. Checklist pré-entrega

Marque cada item como OK, N/A (explique) ou Problema:

- [ ] Versão-alvo do Foundry, do system e dos módulos identificada, e API conferida nela?
- [ ] Guard de `canvas.ready` e seleção, se a operação depende deles?
- [ ] Null-check de ator/documento; permissões e entradas validadas?
- [ ] Nenhum ID de world hardcoded?
- [ ] Lote em vez de loop sequencial, onde é semanticamente seguro?
- [ ] `console.log` de depuração removido ou atrás de flag?
- [ ] Medição com `performance.now()` somente se performance era o ponto, e tempos citados são reais?
- [ ] CSS, Handlebars e layout intactos (salvo pedido)?
- [ ] IIFE para macro curta; Application/UI quando há interface ou estado, na API certa da versão?
- [ ] Testes, lint, build ou type-check pertinentes rodados, ou a validação estática declarada?
- [ ] Registro no `CHANGELOG` do projeto (se o projeto tiver um) feito ou incluído no relatório?
- [ ] Raio de impacto conferido (chamadores, hooks, flags, settings) quando a mudança toca código compartilhado (`impacto.md`)?
- [ ] Era a solução mais simples que funciona (`ponytail.md`), sem abstração ou dependência que ninguém pediu?
- [ ] Lições do projeto e globais relidas, e nenhuma repetida? Lição nova registrada (`memoria.md`)?

*"Soft Mist não para por fadiga. Para quando o objetivo está morto."*
