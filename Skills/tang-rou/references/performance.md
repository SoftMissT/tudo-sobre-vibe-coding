# Performance — meça, ache o gargalo, corte, meça de novo

Use quando o operador reclamar de lentidão, travada, carregamento pesado, ou pedir otimização. Princípio herdado do `SKILL.md` §5: **só escreva número que você mediu.** Sem medição, "ficou mais rápido" não é resultado, é palpite.

Fonte: adaptação de `web-performance-optimization` para Foundry VTT (core Web Vitals só importam em páginas web fora do Foundry; veja o fim).

## Método (cinco passos)

1. **Medir a linha de base.** `performance.now()` em volta do trecho suspeito; aba *Performance* e *Memory* do DevTools do navegador (o Foundry roda no navegador); tamanho dos arquivos servidos. Registre o antes.
2. **Achar o gargalo.** Não otimize no escuro. Perfil primeiro: o que domina o tempo, as tarefas longas na thread principal, as chamadas repetidas.
3. **Priorizar** pelo maior ganho: o que roda a cada quadro/atualização vem antes do que roda uma vez.
4. **Implementar** a menor mudança que ataca o gargalo (`references/ponytail.md`).
5. **Verificar:** mesma medição, mesmas condições. Compare antes e depois e reporte os dois números. Sem ambiente para medir, diga "não medido" e entregue o roteiro de medição.

## Onde o Foundry costuma perder tempo

| Sintoma | Causa provável | Corte |
|---|---|---|
| Lag em combate ou ao mover tokens | Hook de alta frequência (`updateToken`, `refreshToken`, `renderApplication`) com trabalho pesado | Filtre cedo (`if (!changes.x) return`), mova o trabalho para fora do caminho quente, debounce |
| Macro lenta com muitos tokens/itens | N chamadas à API em laço com `await` por item | `updateEmbeddedDocuments`/`createEmbeddedDocuments` em lote (antipatterns §1) |
| Ficha lenta ao abrir | Re-render em cascata, `getData` fazendo trabalho caro a cada render | Calcule uma vez, guarde; evite `render(true)` em laço |
| Varredura repetida | `game.actors.find(...)`/`items.filter(...)` dentro de laço | Monte um `Map` uma vez; `getName`/`fromUuid` |
| Hook que dispara em loop | Atualização dentro de um hook que reage à mesma atualização | Guard de origem; confira se o valor realmente mudou |
| Carga inicial pesada do módulo | Tudo importado de uma vez | `import()` dinâmico para código raro; remova dependência grande por função pequena |
| Assets pesados (mapas, tokens, retratos) | Imagens enormes ou em formato ineficiente | WebP/AVIF, dimensões compatíveis com o uso, sem arquivo de vários MB para ícone |
| Efeito visual caro | Muitos Sequencer/partículas simultâneos | Limite quantidade, reuse, desligue fora da vista |

`Promise.all` acelera etapas **independentes**; com dependência, ordem de hooks ou efeitos colaterais, force o sequencial. Paralelizar o que depende do resultado anterior troca lentidão por bug.

## Bundle e assets (módulos que publicam JS/CSS/imagens)

- Remova dependência inteira usada por uma função (data, utilitários): troque por API nativa ou import pontual.
- Tree-shaking e `sideEffects: false` se houver build.
- Minifique o que é distribuído; comprima imagens; dimensione conforme o uso real.
- Lazy load do que não é necessário na inicialização.
- Cache: assets versionados; não invente cabeçalhos de servidor que o Foundry/hospedagem não controla.

## Checklist

- [ ] Linha de base medida (ou declarada como não medível)
- [ ] Gargalo identificado por perfil, não por palpite
- [ ] Hooks quentes filtram cedo e não fazem trabalho pesado
- [ ] Operações em lote onde seguro; sem N+1 de API
- [ ] Sem varredura dentro de laço; lookup por `Map`/ID
- [ ] Assets e bundle no tamanho necessário
- [ ] Depois medido com as mesmas condições, ou "não medido" dito

## Páginas web fora do Foundry (site de campanha, wiki, dashboard)

Aí valem as métricas de página: LCP (alvo comum < 2,5 s), CLS (< 0,1) e INP, que substituiu o FID; ferramentas: Lighthouse, PageSpeed Insights, DevTools, `webpack-bundle-analyzer`. Imagens com `width`/`height`, `loading="lazy"` abaixo da dobra, `fetchpriority="high"` na imagem principal, scripts de terceiros com `defer`/`async`. Confirme os limiares na documentação atual (web.dev) antes de citá-los como meta.
