# Anti-Padrões Foundry VTT — TANG-ROU

> *"Funciona em 200ms. Pode funcionar em 20ms."*

---

## Anti-Padrões de Performance

| Anti-Padrão | Diagnóstico | Solução |
|-------------|-------------|---------|
| Loop sequencial com `await` em cada token | "N calls à API para N tokens. Reescrevendo." | `updateEmbeddedDocuments()` em batch |
| `setTimeout` onde `Promise`/`await` resolve | "Race condition esperando acontecer." | Promises/await corretos |
| Lookup de item por ID hardcoded | "SINON já explicou isso. Lookup dinâmico." | `items.getName()` ou `fromUuid()` |
| Função de 200 linhas que faz tudo | "Isso não é uma função. São cinco." | Decompor em funções com responsabilidade única |
| `console.log` em produção | "Rastro desnecessário. Remove." | Remover ou usar flag de debug |
| Não medir tempo de execução | "Como você sabe que é rápido se não mediu?" | `performance.now()` início e fim |
| Macro que pergunta algo que pode inferir | "O token está selecionado. Por que perguntamos?" | Inferir do contexto: token controlado, ator do usuário |
| "Funciona, não precisa otimizar" | "Funciona em 200ms. Pode funcionar em 20ms." | Perfilar, identificar gargalo, otimizar |

---

## Anti-Padrões de Arquitetura

| Anti-Padrão | Diagnóstico |
|-------------|-------------|
| Hardcode de IDs de atores/itens/cenas | Quebra em qualquer outro Foundry. Usar `getName()` ou `fromUuid()` |
| Estado global em variáveis soltas | Encapsular em objeto ou classe |
| Macro que assume canvas pronto | Guard obrigatório: `if (!canvas.ready)` |
| Macro que assume ator selecionado | Null-check: `const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character` |
| Alterar design sem ser pedido | TANG-ROU não toca em CSS/Handlebars a menos que o operador peça explicitamente |
| Módulo que registra hooks em `ready` para coisa que precisa de `init` | Entender o ciclo de vida do Foundry |

---

## Anti-Padrões de Código JavaScript

```javascript
// ❌ LENTO — N awaits sequenciais
for (const token of tokens) {
  await token.update({ "flags.meu-modulo.estado": "ativo" });
}

// ✅ RÁPIDO — batch update
const updates = tokens.map(t => ({ _id: t.id, "flags.meu-modulo.estado": "ativo" }));
await canvas.scene.updateEmbeddedDocuments("Token", updates);

// ❌ FRÁGIL — hardcode
const item = actor.items.get("AbCd1234XyZ");

// ✅ ROBUSTO — lookup dinâmico
const item = actor.items.getName("Espada Longa");
// ou via UUID (mais seguro entre worlds)
const item = await fromUuid("Item.AbCd1234XyZ");

// ❌ RACE CONDITION
setTimeout(() => {
  doSomethingWithActor(actor);
}, 1000);

// ✅ DETERMINÍSTICO
await actor.update({...});
doSomethingWithActor(actor); // garantido após update

// ❌ SEM GUARD
const actor = canvas.tokens.controlled[0].actor; // explode se nenhum token selecionado

// ✅ COM GUARD
const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) {
  ui.notifications.warn("Selecione um token ou configure seu personagem.");
  return;
}
```

---

## Checklist Pré-Entrega

Antes de entregar qualquer macro ou script:

- [ ] Guard de `canvas.ready` presente?
- [ ] Null-check de `actor` presente?
- [ ] `performance.now()` medindo a execução?
- [ ] Nenhum ID hardcoded?
- [ ] Batch update em vez de loop sequencial?
- [ ] `console.log` removido ou condicionado a flag de debug?
- [ ] Log no CHANGELOG registrado?
- [ ] Versão IIFE se < 50 linhas, Application se > 50 linhas?

---

*"Soft Mist não para por fadiga. Para quando o objetivo está morto."*
