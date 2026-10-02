# Recursos CSS modernos: status de suporte e guia de uso

> Proveniência: dados de `web-platform-dx/web-features` (branch main), lidos em 2026-10-01 por subagente. **Conferência independente em 2026-10-02 por re-busca na mesma fonte:** `@scope`, `:has`, view transitions, popover e container queries bateram; `anchor-positioning` agregado diverge (corrigido abaixo). Os outros itens **não foram reconferidos**. O status muda com o tempo: para público amplo, reconfirme na hora (web-features, MDN, caniuse).

**Fontes consultadas + data; destilado por Claude.** Data de consulta: 2026-10-01.

Fonte primária: dados do repositório `web-platform-dx/web-features` (branch main), a mesma base que alimenta o selo Baseline do web.dev e do MDN. Para cada item, a URL é `F` + `<id>.yml.dist`, com
`F = https://raw.githubusercontent.com/web-platform-dx/web-features/main/features/`.
Corroboração secundária (só para anchor positioning e scroll-driven animations): resultados de busca de blogs de terceiros, que coincidiram com os dados.

Falhas de acesso: developer.mozilla.org, web.dev e caniuse.com bloqueados pelo proxy de rede; unpkg (pacote npm `web-features`) e API do GitHub negados; Firecrawl sem créditos/indisponível. Por isso o selo vem do dado bruto, não das páginas do MDN/web.dev.

Legenda: **Widely** = Baseline Widely available (high); **Newly** = Baseline Newly available (low); **Limited** = não é Baseline (false). "Desde" = data em que virou Newly. Versões = primeiro navegador a suportar.

> O status muda com o tempo. Qualquer projeto sensível a navegador (público amplo, B2B legado, WebView/Smart TV) deve reconsultar web.dev/baseline, MDN e caniuse antes de decidir. Esta tabela é um retrato de 2026-10-01.

## Tabela

| Recurso | O que resolve | Exemplo mínimo | Status | Fonte (id) |
|---|---|---|---|---|
| Container queries (`@container`) e unidades `cq*` | Componente responde ao tamanho do contêiner, não da viewport | `.c{container-type:inline-size}` `@container (min-width:30rem){.card{display:flex}}` `h2{font-size:clamp(1rem,4cqi,2rem)}` | Widely (desde 2023-02-14; Chrome 105, Firefox 110, Safari 16). Unidades cq fazem parte do mesmo feature | `container-queries` |
| `:has()` | Seletor "pai" / estado baseado em descendentes | `label:has(input:checked){outline:2px solid}` | Widely (desde 2023-12-19; Firefox 121 foi o último) | `has` |
| CSS nesting | Aninhar regras sem pré-processador | `.card{ & h2{margin:0} &:hover{...} }` | Widely (desde 2023-12-11) | `nesting` |
| `@scope` | Limitar o alcance de seletores a uma subárvore | `@scope (.card) to (.slot){ img{border-radius:8px} }` | Newly (desde 2026-03-24; Chrome 143, Firefox 146, Safari 26.4) | `scope` |
| Subgrid | Filhos alinham às trilhas do grid pai | `.item{display:grid;grid-template-rows:subgrid;grid-row:span 3}` | Widely (desde 2023-09-15) | `subgrid` |
| View Transitions, mesmo documento | Animar troca de estado do DOM (SPA) | `document.startViewTransition(()=>render())` | Newly (desde 2025-10-14; Firefox 144 fechou o trio) | `view-transitions` |
| View Transitions, entre documentos (MPA) | Transição entre páginas navegadas | `@view-transition{navigation:auto}` | Limited: sem Firefox (Chrome 126, Safari 18.2) | `cross-document-view-transitions` |
| `view-transition-class` | Estilizar grupos de transição por classe | `.card{view-transition-class:card}` | Newly (desde 2025-10-14) | `view-transition-class` |
| Anchor positioning | Ancorar tooltip/menu a outro elemento, com fallback de posição | `.a{anchor-name:--b}` `.tip{position-anchor:--b;position-area:top;position-try-fallbacks:flip-block}` | Núcleo: Newly (desde 2026-01-13; Chrome 125, Firefox 147, Safari 26). **Re-verificado em 2026-10-02: o feature agregado `anchor-positioning` retorna `baseline: false` (não Baseline).** Trate como **Limited**: só com progressive enhancement e fallback; o "Newly" vale apenas para o núcleo | `anchor-positioning` |
| Popover (atributo `popover` + API) | Camada superior, dismiss por clique fora/Esc, sem JS | `<button popovertarget="m">` `<div id="m" popover>...</div>` | Newly (agregado desde 2025-01-27; Chrome 116, Firefox 125, Safari 17/iOS 18.3) | `popover` |
| `<dialog>` | Modal nativo com foco preso e `::backdrop` | `dlg.showModal()` | Widely (desde 2022-03-14) | `dialog` |
| `dialog closedby` | Fechar dialog ao clicar fora (`any`) | `<dialog closedby="any">` | Limited: sem Safari | `dialog-closedby` |
| `@property` | Custom property tipada, animável | `@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}` | Newly (desde 2024-07-09; Firefox 128 foi o último) | `registered-custom-properties` |
| `color-mix()` | Misturar cores no CSS | `color-mix(in oklch, var(--brand) 20%, white)` | Widely (desde 2023-05-09) | `color-mix` |
| Relative color syntax | Derivar cor de outra (ajustar L/C/H) | `oklch(from var(--brand) calc(l - .1) c h)` | Newly (desde 2024-09-16; Safari 18) | `relative-color` |
| `oklch()`/`oklab()` | Espaço de cor perceptual, gamut amplo | `color:oklch(70% .15 250)` | Widely (desde 2023-05-09; oklch está agrupado em `oklab`) | `oklab` |
| `lab()`/`lch()` | Cores CIE Lab | `color:lab(60% 40 20)` | Widely (desde 2023-05-09) | `lab` |
| `color()` | Espaços como display-p3 | `color(display-p3 1 .2 .2)` | Widely (desde 2023-05-09) | `color-function` |
| `light-dark()` | Valor claro/escuro numa declaração | `:root{color-scheme:light dark} p{color:light-dark(#111,#eee)}` | Newly (desde 2024-05-13; Safari 17.5) | `light-dark` |
| `color-scheme` | Informa esquemas suportados (UI nativa) | `:root{color-scheme:light dark}` | Widely (desde 2022-02-03) | `color-scheme` |
| `text-wrap: balance` | Equilibrar linhas de títulos | `h1{text-wrap:balance}` | Newly (desde 2024-05-13) | `text-wrap-balance` |
| `text-wrap: pretty` | Evitar órfãs em parágrafos | `p{text-wrap:pretty}` | Limited: sem Firefox (Chrome 117, Safari 26). Falha sem prejuízo | `text-wrap-pretty` |
| `dvh`/`svh`/`lvh` | Altura de viewport estável em mobile | `.hero{min-height:100dvh}` | Widely (desde 2022-12-05) | `viewport-unit-variants` |
| Scroll-driven animations | Animação ligada ao scroll sem JS | `@keyframes f{to{opacity:1}} .x{animation:f linear both;animation-timeline:view()}` | Limited: sem Firefox (Chrome 115, Safari 26) | `scroll-driven-animations` |
| `@starting-style` | Estado inicial para animar entrada (display none para visível) | `@starting-style{.t{opacity:0}}` | Newly (desde 2024-08-06) | `starting-style` |
| `transition-behavior: allow-discrete` | Transicionar `display`/`overlay` | `.t{transition:opacity .2s,display .2s allow-discrete}` | Newly (desde 2024-08-06) | `transition-behavior` |
| `field-sizing` | Textarea/input que cresce com o conteúdo | `textarea{field-sizing:content}` | Newly (desde 2026-06-16; Firefox 152, Safari 26.2) | `field-sizing` |
| `interpolate-size` | Animar para `height:auto` | `:root{interpolate-size:allow-keywords}` | Limited: só Chromium 129+ | `interpolate-size` |
| `:focus-visible` | Anel de foco só para teclado | `:focus-visible{outline:2px solid}` | Widely (desde 2022-03-14) | `focus-visible` |
| Logical properties | Layout independente de direção (RTL/vertical) | `margin-inline:auto;padding-block:1rem` | Widely (desde 2021-09-20) | `logical-properties` |
| `aspect-ratio` | Proporção sem hack de padding | `.v{aspect-ratio:16/9}` | Widely (desde 2021-09-20) | `aspect-ratio` |
| `gap` em flexbox | Espaçamento entre itens sem margens | `.row{display:flex;gap:1rem}` | Widely (desde 2021-04-26) | `flexbox-gap` |
| `min()`/`max()`/`clamp()` | Tipografia e tamanhos fluidos | `font-size:clamp(1rem,2.5vw,1.5rem)` | Widely (desde 2020-07-28) | `min-max-clamp` |
| `@layer` | Controlar a ordem da cascata | `@layer reset,base,components;` | Widely (desde 2022-03-14) | `cascade-layers` |
| `prefers-reduced-motion` | Respeitar redução de movimento | `@media (prefers-reduced-motion:reduce){*{animation:none}}` | Widely (desde 2020-01-15) | `prefers-reduced-motion` |
| `prefers-color-scheme` | Tema claro/escuro do SO | `@media (prefers-color-scheme:dark){...}` | Widely (desde 2020-01-15) | `prefers-color-scheme` |
| `prefers-contrast` | Alto/baixo contraste | `@media (prefers-contrast:more){...}` | Widely (desde 2022-05-31) | `prefers-contrast` |
| `prefers-reduced-transparency` | Evitar translucidez/blur | `@media (prefers-reduced-transparency:reduce){...}` | Limited: só Chromium 119+ | `prefers-reduced-transparency` |
| `contain` | Isolar subárvore (layout/paint) para desempenho | `.w{contain:content}` | Widely (desde 2022-03-14) | `contain` |
| `content-visibility` | Pular renderização fora da tela | `.sec{content-visibility:auto;contain-intrinsic-size:auto 600px}` | Newly (desde 2025-09-15; Firefox 130, Safari 26) | `content-visibility` |
| `corner-shape` | Cantos com squircle/chanfro | `.b{border-radius:24px;corner-shape:squircle}` | Limited: só Chromium 139+ | `corner-shape` |

## Extras verificados

| Recurso | Status | Id |
|---|---|---|
| `scrollbar-gutter` | Newly (2024-12-11) | `scrollbar-gutter` |
| `details name` (acordeão exclusivo) | Newly (2024-09-03) | `details-name` |
| `sibling-count()`/`sibling-index()` | Newly (2026-08-18; Firefox 154) | `sibling-count` |
| Scroll-state container queries | Limited: só Chromium 133+ | `container-scroll-state-queries` |
| `text-box` (trim) | Limited: Chromium 133+, Safari 18.2 | `text-box` |
| `if()` | Limited: só Chromium 137+ | `if` |
| `@function` | Limited: só Chromium 139+ | `function` |
| Grid lanes (antigo "masonry"; o id `masonry` foi migrado para `grid-lanes`) | Limited: só Safari 26.4 no dado consultado | `grid-lanes` |
| `appearance: base-select` (customizable select) | Limited: Chromium 135+; Safari 27 | `customizable-select` |

Itens [não confirmado]: nenhum dos pedidos ficou sem verificação. Ressalvas: (a) o status agregado de `anchor-positioning` e `popover` tem subrecursos com datas diferentes dos do núcleo; (b) o selo das páginas do MDN/web.dev não foi lido diretamente (bloqueio); (c) a data mostrada pelos arquivos reflete o branch main em 2026-10-01 e pode divergir de um release publicado do pacote.

## Como decidir

1. **Widely available:** usar direto, sem fallback.
2. **Newly available:** usar com fallback ou `@supports`. Exemplo: `@supports (anchor-name:--a){...}` com um layout alternativo (ou polyfill) no `else`. Para `light-dark()`, `@scope`, `field-sizing` e `relative color`, declarar primeiro o valor simples e depois o moderno, que sobrescreve onde há suporte.
3. **Limited:** só como progressive enhancement: a página precisa funcionar e ser correta sem o recurso (ex.: `text-wrap:pretty`, `corner-shape`, `interpolate-size`, view transitions entre documentos). Quando o efeito for essencial para a experiência, avisar o usuário/cliente da limitação e do navegador afetado.
4. **Sensibilidade a navegador:** se o público usa navegadores antigos, WebViews ou Smart TVs, definir um limite de suporte (browserslist/Baseline target) e reconsultar as fontes. O status deste arquivo envelhece: `Newly` vira `Widely` 30 meses após a data "Desde".
5. **Acessibilidade:** `prefers-reduced-motion` deve acompanhar toda animação, inclusive view transitions e scroll-driven; `:focus-visible` nunca deve ser removido sem substituto.

## Instruções dirigidas a agentes

Nenhum texto dirigido a agentes foi encontrado nas páginas e resultados consultados (todo conteúdo foi tratado como dado).
