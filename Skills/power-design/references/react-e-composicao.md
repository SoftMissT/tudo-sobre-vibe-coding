# React e composição: referência destilada

Fonte: repositório vercel-labs/agent-skills, commit 063bee94c3f4df8453406c830b0a7df0f2860278, licença MIT (os arquivos declaram `license: MIT`); destilado por Claude — não é cópia.

Skills de origem: `react-best-practices` (otimização de desempenho React/Next.js) e `composition-patterns` (padrões de composição de componentes).

## 1. Prioridades das 8 categorias (desempenho)

| # | Categoria | Impacto | Prefixo |
|---|-----------|---------|---------|
| 1 | Eliminar cascatas (waterfalls) | CRÍTICO | `async-` |
| 2 | Tamanho do bundle | CRÍTICO | `bundle-` |
| 3 | Desempenho no servidor | ALTO | `server-` |
| 4 | Busca de dados no cliente | MÉDIO-ALTO | `client-` |
| 5 | Re-renderizações | MÉDIO | `rerender-` |
| 6 | Desempenho de renderização | MÉDIO | `rendering-` |
| 7 | JavaScript puro | BAIXO-MÉDIO | `js-` |
| 8 | Padrões avançados | BAIXO | `advanced-` |

Observação: o impacto declarado dentro de cada arquivo de regra nem sempre coincide com o da categoria (ex.: `bundle-defer-third-party` e `bundle-preload` aparecem como MÉDIO; `server-auth-actions`, `server-parallel-fetching` e `server-parallel-nested-fetching` como CRÍTICO). Abaixo uso o impacto do arquivo da regra.

## 2. Regras de impacto CRÍTICO e ALTO

### Cascatas (async-)

- **async-parallel** (CRÍTICO): operações independentes rodam juntas com `Promise.all`. Errado: três `await` em sequência → certo: um `await Promise.all([...])`.
- **async-dependencies** (CRÍTICO): quando há dependência parcial, dispare cada tarefa no primeiro momento possível. Errado: esperar `user` e `config` juntos para só então buscar `profile` → certo: encadear `profile` a partir da promise de `user` (a fonte sugere a biblioteca `better-all` ou promises criadas antes do `Promise.all`).
- **async-api-routes** (CRÍTICO): em rotas de API e Server Actions, inicie as promises independentes cedo e dê `await` tarde. Errado: `await auth()` e depois `await fetchConfig()` → certo: guardar as promises e aguardá-las depois.
- **async-defer-await** (ALTO): leve o `await` para o ramo que usa o valor. Errado: buscar dados antes de um `return` antecipado que não os usa → certo: buscar só depois da checagem.
- **async-cheap-condition-before-await** (ALTO): avalie a condição síncrona barata antes de aguardar uma flag remota. Errado: `await getFlag()` seguido de `flag && cond` → certo: `if (cond)` e só então aguardar a flag. Exceção citada: manter a ordem se a condição for cara, depender da flag ou houver efeitos colaterais ordenados.
- **async-suspense-boundaries** (ALTO): não bloqueie o layout inteiro com `await` no topo da página. Errado: `await` no componente de página → certo: `<Suspense>` ao redor do componente que busca os dados, para o resto aparecer logo.

### Bundle (bundle-)

- **bundle-barrel-imports** (CRÍTICO): arquivos barrel (reexportam centenas ou milhares de módulos) elevam o custo de importação. Errado: `import { Check } from 'lucide-react'` sem otimização → certo: no Next.js 13.5+, `experimental.optimizePackageImports`; fora do Next, import direto do caminho do módulo. A fonte avisa que alguns pacotes não trazem tipos para caminhos profundos.
- **bundle-dynamic-imports** (CRÍTICO): componentes pesados fora do primeiro render usam `next/dynamic`. Errado: importar um editor grande no topo → certo: `dynamic(() => import(...), { ssr: false })`.
- **bundle-analyzable-paths** (ALTO): prefira caminhos que o bundler consiga analisar. Errado: `import(MAP[nome])` com strings → certo: mapa de funções `() => import('./x')`; em caminhos de arquivo, literais em cada ponto de uso.
- **bundle-conditional** (ALTO): carregue módulos ou dados grandes só quando a funcionalidade for ativada (import dinâmico dentro de efeito condicionado).

### Servidor (server-)

- **server-auth-actions** (CRÍTICO): Server Actions são endpoints públicos. Errado: ação `"use server"` que apaga sem checar nada → certo: verificar sessão e autorização dentro de cada ação.
- **server-parallel-fetching** (CRÍTICO): componentes de servidor rodam em sequência na árvore. Errado: página faz `await` e só então renderiza o filho que também busca → certo: separar em componentes irmãos que buscam cada um o seu dado.
- **server-parallel-nested-fetching** (CRÍTICO): encadeie a busca dependente dentro da promise de cada item. Errado: `Promise.all` de chats e depois `Promise.all` de autores → certo: `getChat(id).then(c => getUser(c.author))` por item.
- **server-cache-lru** (ALTO): `React.cache()` só vale numa requisição; para reuso entre requisições seguidas use cache LRU. Em serverless tradicional, a fonte sugere considerar Redis.
- **server-hoist-static-io** (ALTO): leitura de fontes, logos e configs estáticos sobe para o escopo de módulo, em vez de repetir a cada requisição.
- **server-no-shared-module-state** (ALTO): não guarde dados de requisição em variáveis mutáveis de módulo no servidor; renders concorrentes vazam dados entre usuários. Passe por props ou contexto da árvore.
- **server-serialization** (ALTO): minimize o que cruza a fronteira servidor/cliente. Errado: passar o objeto de 50 campos → certo: passar só o campo usado.

## 3. Demais regras (só nomes)

- **Cliente (MÉDIO-ALTO):** `client-swr-dedup`, `client-event-listeners`, `client-passive-event-listeners`, `client-localstorage-schema`.
- **Re-render (MÉDIO):** `rerender-defer-reads`, `rerender-memo`, `rerender-memo-with-default-value`, `rerender-dependencies`, `rerender-derived-state`, `rerender-derived-state-no-effect`, `rerender-functional-setstate`, `rerender-lazy-state-init`, `rerender-simple-expression-in-memo`, `rerender-split-combined-hooks`, `rerender-move-effect-to-event`, `rerender-transitions`, `rerender-use-deferred-value`, `rerender-use-ref-transient-values`, `rerender-no-inline-components`.
- **Renderização (MÉDIO):** `rendering-animate-svg-wrapper`, `rendering-content-visibility`, `rendering-hoist-jsx`, `rendering-svg-precision`, `rendering-hydration-no-flicker`, `rendering-hydration-suppress-warning`, `rendering-activity`, `rendering-conditional-render`, `rendering-usetransition-loading`, `rendering-resource-hints`, `rendering-script-defer-async`.
- **JavaScript (BAIXO-MÉDIO):** `js-batch-dom-css`, `js-index-maps`, `js-cache-property-access`, `js-cache-function-results`, `js-cache-storage`, `js-combine-iterations`, `js-length-check-first`, `js-early-exit`, `js-hoist-regexp`, `js-min-max-loop`, `js-set-map-lookups`, `js-tosorted-immutable`, `js-flatmap-filter`, `js-request-idle-callback`.
- **Avançados (BAIXO):** `advanced-effect-event-deps`, `advanced-event-handler-refs`, `advanced-init-once`, `advanced-use-latest`.
- **Bundle e servidor de impacto menor (arquivo da regra):** `bundle-defer-third-party` (carregar analytics após hidratação), `bundle-preload` (pré-carregar em hover/foco), `server-cache-react` (deduplicar por requisição; evitar objetos inline como argumento), `server-after-nonblocking` (`after()` para trabalho pós-resposta), `server-dedup-props` (evitar serialização duplicada de props RSC).

## 4. Padrões de composição

Categorias da skill: arquitetura (ALTO), gerenciamento de estado (MÉDIO), padrões de implementação (MÉDIO), APIs do React 19 (MÉDIO).

- **Evitar props booleanas** (`architecture-avoid-boolean-props`): cada booleano dobra os estados possíveis e gera condicionais aninhadas. Prefira composição. O arquivo da regra declara CRÍTICO, a tabela da skill põe a categoria como ALTO.
- **Compound components** (`architecture-compound-components`): componente complexo vira um conjunto de peças (Frame, Input, Footer...) que leem estado de um contexto compartilhado; o consumidor monta só o que precisa.
- **Estado no provider** (`state-lift-state`): estado sobe para um provider, para que irmãos fora do componente principal (botões de diálogo, pré-visualização) o acessem sem prop drilling nem `useEffect` de sincronização.
- **Provider isolado** (`state-decouple-implementation`): só o provider sabe como o estado é gerido (useState, Zustand, sincronização com servidor); a UI conhece apenas a interface.
- **Interface genérica** (`state-context-interface`): contexto com três partes, `state`, `actions` e `meta`, funcionando como contrato; a mesma UI roda com implementações diferentes de estado.
- **Variantes explícitas** (`patterns-explicit-variants`): em vez de `<Composer isThread isEditing={false} />`, componentes como `ThreadComposer` e `EditMessageComposer`, cada um compondo as peças compartilhadas.
- **Children em vez de render props** (`patterns-children-over-render-props`): evite props `renderHeader`/`renderFooter`; use `children`.
- **React 19** (`react19-no-forwardref`): `ref` vira prop comum (sem `forwardRef`) e `use(Contexto)` substitui `useContext`; `use()` pode ser chamado condicionalmente. **Ressalva da própria fonte: vale apenas para React 19 ou superior; em React 18 ou anterior, ignore esta seção.**

## 5. Como aplicar em revisão

Ordem de ataque, do maior para o menor retorno (segue a ordem de prioridade da fonte):

1. Cascatas: `await` sequenciais independentes, fetches encadeados em componentes de servidor, falta de `Suspense`, `await` antes de retornos antecipados.
2. Bundle: imports de barrel, componentes pesados sem import dinâmico, caminhos dinâmicos opacos.
3. Servidor: autenticação em Server Actions (também segurança), serialização excessiva, estado mutável de módulo, I/O estático repetido.
4. Cliente e re-renders: deduplicação de requisições, dependências de efeitos, estado derivado, componentes definidos dentro de componentes.
5. Renderização, JS puro e avançados por último: microotimizações só depois dos itens acima, e só onde houver medição ou laço quente [a exigência de medir não está nas fontes; é recomendação do destilador, não confirmada].

Para estrutura de componentes: se aparecem várias props booleanas ou `renderX`, aplicar a seção 4 antes de otimizar desempenho.

## 6. Limites

- As regras de desempenho são para **React e Next.js**. Várias dependem de APIs específicas (`next/dynamic`, `after()`, Server Actions, RSC, `optimizePackageImports`) e não se aplicam a JavaScript vanilla, Vue, Svelte ou outros frameworks. As regras `js-` são JavaScript genérico, mas a skill as enquadra no contexto React [aplicabilidade fora disso não confirmada].
- Regras de servidor pressupõem Server Components/App Router; em projetos só cliente (SPA) não se aplicam.
- A seção React 19 só vale para React 19+.
- Os padrões de composição usam React (exemplos com React Native, ex.: `TextInput`); em outro framework o princípio pode servir, mas isso [não está confirmado] nas fontes.
- Números de ganho (por exemplo, "2-10×") vêm das fontes e não foram verificados aqui.
- A contagem varia: a skill diz 70 regras; a pasta `rules/` tem 72 arquivos (inclui `_sections.md` e `_template.md`).
