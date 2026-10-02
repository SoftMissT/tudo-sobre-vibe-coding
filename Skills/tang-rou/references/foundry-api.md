# Foundry VTT API — Cheatsheet TANG-ROU

> APIs mais usadas em macros e módulos. Consultar para velocidade de implementação.
> Ponto de partida para v13+. Confirme cada assinatura na versão-alvo (Context7 ou docs oficiais); APIs de system e módulos mudam entre versões.
> Notas de versão: `Roll#evaluate()` já é assíncrono (não passe `{ async: true }`); `ActiveEffect` usa `name` e `img` (não `label`/`icon`); `Dialog` V1 é legado a partir da v13 (use `DialogV2`).

---

## Atores & Tokens

```javascript
// Token controlado atual
const token = canvas.tokens.controlled[0];
const actor = token?.actor ?? game.user.character;

// Todos os tokens controlados
const tokens = canvas.tokens.controlled;
const actors = tokens.map(t => t.actor);

// Buscar ator por nome
const actor = game.actors.getName("Nome do Ator");

// Atualizar ator
await actor.update({ "system.hp.value": 20 });

// Atualizar múltiplos atores do world em batch
// (token NÃO vinculado: o Actor é sintético, atualize via "delta." no TokenDocument; ver templates.md §2)
const updates = actors.map(a => ({ _id: a.id, "system.hp.value": 10 }));
await Actor.updateDocuments(updates);
```

---

## Itens

```javascript
// Item do ator por nome
const item = actor.items.getName("Espada Longa");

// Item por UUID (cross-world seguro)
const item = await fromUuid("Actor.xpto.Item.abc");

// Adicionar item ao ator
await actor.createEmbeddedDocuments("Item", [itemData]);

// Remover item
await actor.deleteEmbeddedDocuments("Item", [item.id]);

// Usar item (dnd5e): a assinatura de item.use() varia entre versões do system; confirmar na versão instalada
await item.use({}, { event: new MouseEvent("click") });
```

---

## Tokens

```javascript
// Atualizar token único
await token.document.update({ "width": 2, "height": 2 });

// Batch update de tokens na cena
const updates = canvas.tokens.controlled.map(t => ({
  _id: t.id,
  "texture.tint": "#FF0000"
}));
await canvas.scene.updateEmbeddedDocuments("Token", updates);

// Mover token
await token.document.update({ x: 100, y: 200 });

// Spawn via Warp Gate (se módulo ativo)
await warpgate.spawn("Nome do Ator", {});
```

---

## Active Effects (DAE)

```javascript
// Adicionar efeito ao ator
const effectData = {
  name: "Envenenado",
  img: "icons/svg/poison.svg",
  duration: { rounds: 3 },
  changes: [
    { key: "system.attributes.spd.value", mode: 2, value: -2 }
  ]
};
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

// Remover efeito por nome
const effect = actor.effects.find(e => e.name === "Envenenado");
if (effect) await effect.delete();
```

---

## ChatMessage

```javascript
// Mensagem simples
await ChatMessage.create({
  content: "<b>Ataque!</b> Resultado: 15",
  speaker: ChatMessage.getSpeaker({ actor })
});

// Mensagem com roll
const roll = await new Roll("1d20 + 5").evaluate();
await roll.toMessage({
  flavor: "Teste de Ataque",
  speaker: ChatMessage.getSpeaker({ actor })
});

// Whisper para GM
await ChatMessage.create({
  content: "Mensagem secreta",
  whisper: game.users.filter(u => u.isGM).map(u => u.id)
});
```

---

## Dialogs

```javascript
// v13+: DialogV2
const ok = await foundry.applications.api.DialogV2.confirm({
  window: { title: "Confirmar" },
  content: "<p>Aplicar efeito?</p>"
});

const valor = await foundry.applications.api.DialogV2.prompt({
  window: { title: "Valor" },
  content: `<input type="number" name="valor" value="10" autofocus>`,
  ok: { label: "OK", callback: (event, button) => button.form.elements.valor.valueAsNumber }
});

// v12 e anteriores: Dialog (V1), que usa jQuery
const ok12 = await Dialog.confirm({
  title: "Confirmar",
  content: "Aplicar efeito?"
});
```

---

## Rolls

```javascript
// Roll simples
const roll = await new Roll("2d6 + 3").evaluate();
console.log(roll.total);

// Roll com dados do ator
const mod = actor.system.attributes.str.mod;
const roll = await new Roll(`1d20 + ${mod}`).evaluate();
```

---

## Cenas & Canvas

```javascript
// Cena ativa
const scene = game.scenes.active;

// Criar luz
await scene.createEmbeddedDocuments("AmbientLight", [{
  x: 100, y: 100,
  config: { bright: 10, dim: 20, color: "#FF8800" }
}]);

// Sequencer (se ativo)
await new Sequence()
  .effect()
    .file("modules/jb2a/assets/fire.webm")
    .atLocation(token)
    .scale(0.5)
  .play();
```

---

## Hooks comuns (módulos)

```javascript
// Registro de settings
Hooks.on("init", () => {
  game.settings.register("meu-modulo", "opcao", {
    name: "Minha Opção",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
});

// Interceptar roll de ataque (Midi-QOL)
Hooks.on("midi-qol.preAttackRoll", (workflow) => {
  // workflow.actor, workflow.item, workflow.targets
});

// Após aplicar dano
Hooks.on("midi-qol.postActiveEffects", (workflow) => {
  // lógica pós-dano
});
```

---

## Performance — Medição

Use só quando performance é o ponto e dá para medir. Não cite tempos que não foram medidos. Template completo de IIFE em `templates.md` §1.

```javascript
// Medição pontual (remova ou condicione a DEBUG antes de entregar)
(async () => {
  const t0 = performance.now();

  // Guard
  if (!canvas.ready) { ui.notifications.warn("Canvas não pronto."); return; }
  const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
  if (!actor) { ui.notifications.warn("Nenhum ator."); return; }

  // ... lógica ...

  const t1 = performance.now();
  console.log(`[TANG-ROU] ${(t1 - t0).toFixed(2)}ms`); // somente em depuração
})();
```

---

*Atualizar quando APIs mudarem entre versões do Foundry.*  
*Versão base: Foundry VTT v13+ (não verificada contra a documentação nesta revisão; confirmar via Context7).*
