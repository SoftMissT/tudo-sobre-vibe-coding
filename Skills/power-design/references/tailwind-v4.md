# Tailwind CSS v4: design system e tokens

Fonte: repositório wshobson/agents, commit 156b7a5e7a8b93642628a339ee4039c925b34c7f, licença MIT (Seth Hobson), skill `tailwind-design-system`; destilado por Claude — não é cópia.

## O que mudou do v3 para o v4

| v3 | v4 |
|---|---|
| `tailwind.config.ts` | bloco `@theme` no CSS |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `darkMode: "class"` | `@custom-variant dark (...)` |
| `theme.extend.colors` | variáveis `--color-*` dentro de `@theme` |
| plugin `tailwindcss-animate` | `@keyframes` em `@theme` + `@starting-style` |
| `h-10 w-10` | `size-10` |
| plugins JS próprios | diretiva `@utility` |

A fonte indica que a skill mira o v4 (descrito como de 2024 em diante). Projetos v3 devem seguir o guia oficial de upgrade.

## Configuração CSS-first

- Um único arquivo CSS importa o Tailwind e declara o tema com `@theme`.
- Tokens de cor usam OKLCH (a fonte alega melhor percepção e uniformidade que HSL).
- Pares semânticos: `background/foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `card`, `border`, `ring`, cada um com seu `-foreground` quando aplicável.
- Raios (`--radius-*`) e animações (`--animate-*`) também são tokens. Um `@keyframes` dentro de `@theme` só é emitido se alguma variável `--animate-*` o referenciar.
- Estilos base via `@layer base`: borda padrão com a cor `border`, corpo com `bg-background text-foreground`.

Esqueleto (reescrito):

```css
@import "tailwindcss";
@theme {
  --color-primary: oklch(45% 0.2 260);
  --radius-md: 0.375rem;
  --animate-fade-in: fade-in 0.2s ease-out;
  @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
}
```

Modificadores de tema:
- `@theme inline`: quando o valor referencia outra variável CSS.
- `@theme static`: gera as variáveis mesmo sem uso (também via `@import "tailwindcss" theme(static)`).
- Limpar namespace: `--color-*: initial` apaga a paleta padrão.
- Variantes semitransparentes com `color-mix(in oklab, ...)`.
- Container queries: tokens `--container-*`.
- `@utility` cria utilitários reutilizáveis (ex.: gradiente de texto).

## Hierarquia de tokens

Marca (valores abstratos) → semântico (propósito) → componente (uso específico). Cadeia exemplificada: um valor OKLCH vira `--color-primary`, que vira a classe `bg-primary`. A fonte recomenda `bg-primary` em vez de `bg-blue-500` e proíbe cor fixa no componente.

## Arquitetura de componente com variantes

Ordem proposta: base → variantes → tamanhos → estados → overrides.

- **CVA** (class-variance-authority) declara `variants` (ex.: default, destructive, outline, secondary, ghost, link), `size` (default, sm, lg, icon) e `defaultVariants`. `VariantProps` tipa as props.
- **`cn()`** = `twMerge(clsx(...))`, aplicado para o `className` externo vencer conflitos.
- **`asChild`** com `Slot` do Radix para renderizar outro elemento (ex.: link com aparência de botão).
- Ref como prop comum (React 19), sem `forwardRef`.
- Componentes compostos (Card, CardHeader, CardTitle, CardContent, CardFooter), cada um uma função pequena com classes base.
- Formulários: `Input` com prop `error`, `aria-invalid`, `aria-describedby` apontando para a mensagem e `role="alert"` nela; `Label` associado por `htmlFor`.
- Grid e Container também via CVA (colunas responsivas por breakpoint, gaps nomeados, larguras máximas).
- Utilitários compartilhados: anel de foco (`focus-visible` com anel e offset) e estado desabilitado (sem eventos de ponteiro, opacidade reduzida).

## Modo escuro

- `@custom-variant dark (&:where(.dark, .dark *))` habilita o variante por classe.
- Tokens são redefinidos em `.dark`, mantendo os mesmos nomes; os componentes não mudam.
- A fonte propõe um `ThemeProvider` (temas dark/light/system) que: lê `localStorage`, usa `prefers-color-scheme` para "system", alterna a classe no `<html>` e atualiza `meta theme-color`. Há um botão de alternância com rótulo `sr-only`.
- Regra da fonte: testar os dois temas.

## Animações e entrada

- Animações por token `--animate-*` e classes como `animate-fade-in`; diálogo Radix usa `data-[state=open]` e `data-[state=closed]` para entrada e saída.
- Entrada nativa: `@starting-style` com `transition` incluindo `display ... allow-discrete`, aplicada a `[popover]` e `:popover-open`.
- Substitui `tailwindcss-animate`.

## Migração v3 → v4 (checklist da fonte)

1. Trocar a config JS por `@theme`.
2. Trocar as diretivas `@tailwind` por `@import "tailwindcss"`.
3. Mover cores para `--color-*`.
4. Trocar `darkMode: "class"` por `@custom-variant dark`.
5. Mover `@keyframes` para dentro de `@theme`.
6. Substituir `tailwindcss-animate` por CSS nativo.
7. `h-N w-N` vira `size-N`.
8. Remover `forwardRef` (se React 19).
9. Considerar OKLCH.
10. Plugins próprios viram `@utility`.

## Acessibilidade citada

Atributos ARIA, estados de foco visíveis (`focus-visible`), `aria-invalid`/`aria-describedby`/`role="alert"` em erros, `sr-only` em botões só com ícone, estado desabilitado explícito. A fonte não cita contraste numérico nem WCAG.

## Quando Tailwind e quando CSS vanilla

DECISÃO da skill-mãe, não da fonte:
1. Respeitar a stack que o projeto JÁ usa (Tailwind ou CSS próprio).
2. Projeto novo sem preferência declarada: **use CSS vanilla e diga**; pergunte só se o brief citar Tailwind.
3. Nunca misturar os dois no mesmo componente.

Em projeto vanilla, a ideia de tokens em camadas (marca → semântico → componente) continua aplicável via variáveis CSS; isso é adaptação da skill-mãe, [não confirmado] pela fonte.

## Checklist de verificação

- [ ] Há `@import "tailwindcss"` e nenhuma diretiva `@tailwind` antiga.
- [ ] Cores e raios vêm de tokens em `@theme`, sem cor fixa nos componentes.
- [ ] Tokens semânticos têm valor equivalente em `.dark`.
- [ ] `@custom-variant dark` presente se o escuro for por classe.
- [ ] Todo `@keyframes` usado está referenciado por `--animate-*`.
- [ ] Variantes via CVA com `defaultVariants`; `cn()` no `className`.
- [ ] Foco visível, `aria-*` e `sr-only` conferidos.
- [ ] Os dois temas foram testados.
- [ ] Nenhum valor arbitrário onde um token em `@theme` serviria.
- [ ] Nenhum componente mistura Tailwind e CSS vanilla.

## Limites

- A fonte não cobre: números de versão exatos do v4 (apenas "2024+"), requisitos de Node/navegador, ferramentas de build (Vite, PostCSS), uso do codemod oficial, compatibilidade de navegadores com `@starting-style`/OKLCH/`color-mix`, testes automatizados, contraste WCAG. Tudo isso: [não confirmado].
- Exemplos assumem React, Radix, CVA, clsx, tailwind-merge e (alguns) React 19; fora dessa stack, adaptar.
- Nenhum texto da fonte dirigido a agentes pedindo ações foi encontrado.
