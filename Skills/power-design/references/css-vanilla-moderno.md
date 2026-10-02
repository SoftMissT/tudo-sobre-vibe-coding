# CSS vanilla moderno: arquitetura, convenções e recursos

Fonte: repositório mikemai2awesome/agent-skills, commit b225980138789535683bf4cf17b6871f10c188ce, licença MIT (Mike Mai); destilado por Claude — não é cópia. Arquivos-base: skills more-css (SKILL, architecture, modern-css) e frontend-conventions.

Observação sobre as fontes: `architecture.md` e `modern-css.md` são, na prática, listas comentadas de links (MDN, CSS-Tricks, Every Layout etc.) com uma frase de orientação cada. O conteúdo normativo está nos dois SKILL.md.

## 1. Princípios

1. Tokens primeiro: cada valor é definido uma vez como custom property e referenciado depois.
2. Tudo em camadas (`@layer`), para que a especificidade seja previsível.
3. Nomes comunicam intenção, não decoram.
4. Ferramentas (bundler) dividem e importam arquivos, mas não substituem uma arquitetura clara.
5. Composição em vez de herança: componentes nascem de tokens e utilitários, não de outros componentes.
6. Unidades relativas em tudo, exceto `border-width` e `outline-width`.

## 2. Arquitetura

### Camadas
Declare a ordem logo no início:

```css
@layer config, resets, components, utilities, overrides;
```

- config: só tokens (custom properties), sem seletores de elemento.
- resets: normalização e padrões de elementos (tipografia, links, formulários).
- components: peças de UI autocontidas.
- utilities: auxiliares de função única.
- overrides: ajustes de contexto e correções sobre código de terceiros.

### Arquivos
A árvore espelha as camadas: `config/` (color, spacing, typography, index), `resets.css`, `components/` (um arquivo por componente), `utilities.css` e um `main.css` que importa tudo.

## 3. Tokens

Padrão de nome: `--[categoria]-[variante]-[modificador]`. Para cor, a variante é só `text`, `bg` ou `border` (ex.: `--color-bg-primary-hover`). Categorias vistas na fonte: color, space (escala 1, 2, 3, 4, 6, 8, 12, 16 em rem), font-family, font-size, font-weight, line-height, border-radius, border-width, shadow, duration, easing.

### OKLCH
Defina cores em OKLCH: gamut maior que sRGB, luminosidade perceptualmente uniforme e variantes previsíveis (hover = ajustar só o L). A fonte exemplifica um primário com L 50% e hover com L 43%, mesmo croma e matiz.

### Tema claro/escuro
Declare `color-scheme: light dark` em `:root` e use `light-dark(claro, escuro)` em cada token sensível a tema. Para alternância manual, basta trocar `color-scheme` em `[data-theme="light"]` e `[data-theme="dark"]`, sem repetir valores. Ao inverter o tema, a ideia é inverter a luminosidade e manter croma e matiz.

```css
@layer config {
  :root { color-scheme: light dark;
    --color-bg-default: light-dark(oklch(98% 0 0), oklch(15% 0 0)); }
  [data-theme="dark"] { color-scheme: dark; }
}
```

## 4. Unidades e layout fluido

- Tamanhos de fonte sempre em `rem` (respeita preferência do usuário). Nunca `px` em componentes, **exceto `border-width`, `outline-width`** (e valores de sombra; a fonte trata sombra como relativa). Exemplos em px nas referências são equivalentes ilustrativos.
- Tipografia fluida: `clamp(mínimo em rem, valor em cqi, máximo em rem)`. O `cqi` (1% da largura inline do contêiner) exige `container-type: inline-size` no ancestral. O mínimo fica em rem para o zoom continuar funcionando. Use `vb` apenas se não houver contêiner e a escala depender do viewport.
- Unidades preferidas no layout: `%`, `fr`, `vi`/`vb`/`dvi`/`dvb` (lógicas, em vez de `vw`/`vh`), `ch` (larguras mínimas por legibilidade), `min()`/`max()`/`clamp()` e `rem`.
- `px` só em `border-width` e `outline-width`; sombras, espaçamentos e raios usam unidades relativas.
- Preferir dimensionamento intrínseco a media queries.

### Grid auto-fit
```css
.c-grid {
  --c-grid-col-min: 20ch;
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(var(--c-grid-col-min), 1fr));
}
```
Colunas expandem e quebram sem media query. `auto-fill` serve quando colunas vazias devem manter o espaço. O mínimo em `ch` e a propriedade escopada permitem ajuste por instância.

### Flex "pancake desconstruído"
Contêiner `flex-wrap: wrap` com `gap`; filhos com `flex: 1 1 <mínimo>` (ex.: 20ch). Cada item quebra de forma independente e aceita `ch`, diferente do truque `calc()` do "flex albatross".

## 5. Convenções de nome

- Prefixos: `c-` componente, `u-` utilitário, `js-` gancho de JavaScript (nunca estilizado).
- Componentes em BEM: `.c-card`, `.c-card__header`, `.c-card--featured`, `.c-card__header--compact`.
- Estado: preferir seletores ARIA (`[aria-expanded="true"]`, `[aria-disabled="true"]`); se não houver, `is-` / `has-`.
- Namespace de projeto: tokens globais `--ns-categoria-...`, propriedades de componente `--c-ns-bloco-propriedade`; elementos custom `<ns-nome>`, atributos `data-ns-...`.
- Caixa: atributos HTML e valores em dash-case; custom properties `--dash-case`; variáveis/funções JS em camelCase; classes JS em PascalCase; arquivos em `dash-case.ext`.
- Abreviações permitidas (somente estas): img, bg, min, max, cta, col, colspan, rowspan.
- API de modificadores padronizada: tamanhos `2xs, xs, sm, md, lg, xl, 2xl`; tons `xxlight` a `xxdark` (sete passos); hierarquia `primary, secondary, tertiary`; responsivo `comportamento@from-bp` (a partir do breakpoint) e `@until-bp` (abaixo dele).
- Formatação: 2 espaços, sem espaços finais, linha final em branco; aspas duplas em HTML e JSON, simples em CSS e JS.

### Ordem das propriedades (uma linha por grupo)
- Conteúdo: `content` primeiro.
- Display: display, grid, flex, justify/align/place, order, box-sizing, appearance, visibility, opacity.
- Position: position, inset (lógicos), float, clear, transform, z-index.
- Size: inline-size/block-size com min/max, depois overflow.
- Space: margin e padding, formas lógicas.
- Typography: font*, line-height, list-style, color, text-*, letter-spacing, vertical-align, cursor, pointer-events, user-select.
- Border: border*, radius, box-shadow, outline.
- Background: background*, backdrop-filter.
- Advanced: filter, will-change, transition, animation.

### Estrutura interna de um componente
Dentro de `@layer components`: (1) bloco base, agrupado por layout, tipografia, visual e interação; (2) estados (`:hover`, `:focus-visible`, desabilitado); (3) modificadores. Componentes só referenciam tokens; se faltar um valor, crie o token antes. Isso inclui a cor do foco. Use `:focus-visible`, não `:focus`.

## 6. Recursos modernos cobertos pela fonte

A fonte trata estes itens sobretudo como indicação de leitura:

- Cascade layers (`@layer`): ordem, camadas anônimas e import.
- OKLCH: cor perceptualmente uniforme com gamut amplo.
- Propriedades lógicas: usar no lugar de left/right/top/bottom.
- Container query units (`cqi`) com `container-type: inline-size`, usadas em tipografia fluida.
- `@property`: registrar custom property com tipo, herança e valor inicial; útil para tokens animáveis.
- Preferências do usuário (media queries): `prefers-reduced-motion` (desligar animações), `prefers-reduced-transparency` (desligar vidro/blur), `prefers-color-scheme` (com `color-scheme`), `forced-colors` (modo de alto contraste do Windows, manter UI visível).
- Tipografia: `text-wrap: balance` em títulos e `pretty` em parágrafos; `font-feature-settings` com `"ss06"` citado para melhorar a fonte San Francisco.

Não confirmado na fonte: `:has()`, regras `@container` com consulta nomeada, `@scope`, nesting e tabelas de suporte de navegador. A fonte não os explica; não atribua a ela detalhes sobre eles.

## 7. Erros comuns (apontados ou implicados pela fonte)

- Usar hex para cores e tentar "adivinhar" o hover; preferir OKLCH.
- Definir tamanho de fonte em `px` (ignora preferência do usuário).
- Fixar `px` em espaçamento, raio ou sombra.
- Misturar valores crus em componentes em vez de tokens.
- Estilizar classes `js-`.
- Usar `:focus` em vez de `:focus-visible`; cor de foco hardcoded.
- Inventar prefixos, abreviações ou nomes de modificador fora da lista.
- Breakpoints arbitrários em pixels em vez de `ch` + `auto-fit`/`flex-basis`.
- Importar framework utilitário em vez de construir a camada de utilitários.

## Checklist de verificação

- [ ] Existe uma linha `@layer config, resets, components, utilities, overrides;` antes de qualquer regra.
- [ ] `config` contém só custom properties, sem seletores de classe.
- [ ] Cores definidas em `oklch()`; nenhum hex/rgb fora de exceções justificadas.
- [ ] `color-scheme` declarado; tokens de tema usam `light-dark()`.
- [ ] Busca por `px` retorna apenas `border-width` e `outline-width` (e tokens equivalentes).
- [ ] `font-size` sempre via token em rem; `clamp()` com mínimo em rem.
- [ ] Todo `cqi` tem um ancestral com `container-type`.
- [ ] Grids usam `auto-fit`/`auto-fill` com `minmax()` em `ch`; wraps flex usam `flex: 1 1 <min>`.
- [ ] Classes seguem `c-`/`u-`/`js-`; BEM com `__` e `--`; `js-` sem regras CSS.
- [ ] Estados via ARIA antes de `is-`/`has-`; foco com `:focus-visible` e cor de token.
- [ ] Propriedades lógicas (`inline-size`, `padding-inline`, `inset-block`) em vez de width/left.
- [ ] Propriedades na ordem de grupos da seção 5; aspas simples em CSS; 2 espaços.
- [ ] Animações e blur condicionados a `prefers-reduced-motion` / `prefers-reduced-transparency`; `forced-colors` considerado.

## Conflitos e limites

- A fonte proíbe Tailwind, UnoCSS, Bootstrap e qualquer framework CSS, e manda construir a camada de utilitários própria. Essa é uma regra da fonte; a skill-mãe decide pela stack real do projeto (se o projeto já usa um framework, a skill-mãe prevalece e estas regras valem só para o CSS próprio).
- Inconsistência interna: `architecture.md` menciona uma camada `patterns`, que não consta na ordem declarada no SKILL. Tratar a ordem do SKILL como a canônica.
- Os arquivos de referência são listas de links; detalhes de `:has`, container queries nomeadas e suporte de navegador não estão nela [não confirmado]. Consulte a documentação oficial quando precisar deles.
- O prefixo `mmn` e exemplos como `--mmn-color-bg-primary` são do namespace do autor; substitua pelo namespace do projeto.
