# Foundry VTT API — Cheatsheet TANG-ROU

> APIs mais usadas em macros e módulos. Consultar para velocidade de implementação.
> Para v12/v13+ — checar PRIMER.md do projeto se houver breaking changes.

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

// Atualizar múltiplos atores em batch
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

// Usar item (dnd5e)
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
  label: "Envenenado",
  icon: "icons/svg/poison.svg",
  duration: { rounds: 3 },
  changes: [
    { key: "system.attributes.spd.value", mode: 2, value: -2 }
  ]
};
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

// Remover efeito por label
const effect = actor.effects.find(e => e.label === "Envenenado");
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
const roll = await new Roll("1d20 + 5").evaluate({ async: true });
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
// Dialog simples
const result = await Dialog.confirm({
  title: "Confirmar",
  content: "Aplicar efeito?",
  yes: () => true,
  no: () => false
});

// Dialog com input
const result = await new Promise(resolve => {
  new Dialog({
    title: "Valor",
    content: `<input type="number" id="valor" value="10">`,
    buttons: {
      ok: {
        label: "OK",
        callback: html => resolve(parseInt(html.find("#valor").val()))
      }
    }
  }).render(true);
});
```

---

## Rolls

```javascript
// Roll simples
const roll = await new Roll("2d6 + 3").evaluate({ async: true });
console.log(roll.total);

// Roll com dados do ator
const mod = actor.system.attributes.str.mod;
const roll = await new Roll(`1d20 + ${mod}`).evaluate({ async: true });
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

## Performance — Medição Padrão

```javascript
// Template padrão TANG-ROU
(async () => {
  const t0 = performance.now();

  // Guard
  if (!canvas.ready) { ui.notifications.warn("Canvas não pronto."); return; }
  const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
  if (!actor) { ui.notifications.warn("Nenhum ator."); return; }

  // ... lógica ...

  const t1 = performance.now();
  console.log(`[TANG-ROU] ${(t1 - t0).toFixed(2)}ms`);
})();
```

---

*Atualizar quando APIs mudarem entre versões do Foundry.*  
*Versão base: Foundry VTT v13+*
