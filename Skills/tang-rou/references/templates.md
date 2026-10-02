# Templates TANG-ROU

Pontos de partida, não verdade absoluta: confirme assinaturas na versão-alvo (Context7 ou docs oficiais) antes de entregar. Caminhos de dados como `system.attributes.hp.value` são do dnd5e; troque pelo caminho do system do projeto.

## Sumário
1. IIFE de hotbar
2. Batch de atualização (tokens vinculados e não vinculados)
3. Input rápido em macro (DialogV2, v13+)
4. Application com UI própria (ApplicationV2, v13+)
5. Application legado (v12 e anteriores)

## 1. IIFE de hotbar

Para macro curta, sem interface própria.

```javascript
(async () => {
  const DEBUG = false;            // medir só quando performance é o ponto
  const t0 = performance.now();

  if (!canvas.ready) return ui.notifications.warn("Canvas não pronto.");
  const tokens = canvas.tokens.controlled;
  if (!tokens.length) return ui.notifications.warn("Selecione um token.");

  // lógica aqui

  if (DEBUG) console.log(`[TANG-ROU] ${(performance.now() - t0).toFixed(2)}ms`);
})();
```

Se o operador pode ter um personagem padrão em vez de seleção: `canvas.tokens.controlled[0]?.actor ?? game.user.character`, com null-check depois.

## 2. Batch de atualização

Um loop com `await` por token faz N chamadas. Atualize em lote, mas respeite a diferença entre token vinculado e não vinculado: o Actor de um token não vinculado é sintético, e `Actor.updateDocuments` com o id dele altera o Actor do world, não o token.

```javascript
const tokens = canvas.tokens.controlled;
const linked = tokens.filter(t => t.document.actorLink);
const unlinked = tokens.filter(t => !t.document.actorLink);

if (linked.length) {
  await Actor.updateDocuments(
    linked.map(t => ({ _id: t.actor.id, "system.attributes.hp.value": 0 }))
  );
}
if (unlinked.length) {
  await canvas.scene.updateEmbeddedDocuments(
    "Token",
    unlinked.map(t => ({ _id: t.id, "delta.system.attributes.hp.value": 0 }))
  );
}
```

Quando as etapas dependem umas das outras, ou há hooks que precisam rodar em ordem, não faça batch: use `await` sequencial.

## 3. Input rápido em macro (DialogV2, v13+)

`Dialog` (V1) é legado a partir da v13. Para pedir um valor ou confirmar:

```javascript
const ok = await foundry.applications.api.DialogV2.confirm({
  window: { title: "Confirmar" },
  content: "<p>Aplicar efeito?</p>"
});

const valor = await foundry.applications.api.DialogV2.prompt({
  window: { title: "Valor" },
  content: `<input type="number" name="valor" value="10" autofocus>`,
  ok: { label: "OK", callback: (event, button) => button.form.elements.valor.valueAsNumber }
});
```

## 4. Application com UI própria (ApplicationV2, v13+)

Use quando houver interface persistente ou estado. Requer um template `.hbs` que viva num módulo ou system (macros soltas não carregam templates próprios; para macro, prefira DialogV2).

```javascript
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class SoftMistDialog extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "soft-mist-dialog",
    tag: "div",
    window: { title: "Automação" },
    position: { width: 400 },
    actions: { execute: SoftMistDialog.#onExecute }
  };

  static PARTS = {
    main: { template: "modules/meu-modulo/templates/soft-mist.hbs" }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.tokens = canvas.tokens.controlled.map(t => ({ id: t.id, name: t.name }));
    return context;
  }

  static async #onExecute(event, target) {
    // `this` é a instância da Application
    // lógica aqui
    await this.close();
  }
}

new SoftMistDialog().render({ force: true });
```

No template, os botões usam `data-action="execute"`:

```handlebars
<button type="button" data-action="execute">Executar</button>
```

## 5. Application legado (v12 e anteriores)

`Application` V1 usa `static get defaultOptions()` (com `foundry.utils.mergeObject(super.defaultOptions, {...})`), `getData()` e `activateListeners(html)` com jQuery (`html.find(...)`). Em v13 ela está deprecada, e em ApplicationV2 não há jQuery. Para projeto que ainda mira v12, siga o padrão V1 já existente no código e não misture os dois estilos.
