# Site → DESIGN.md e trabalho com o Open Design

Neutro e técnico. Lido e testado em 2026-10-02. Nada instalado; as ferramentas daqui foram escritas e testadas **nesta sessão**.

## 1. O fluxo EXTRAIR (você passa uma URL, sai o DESIGN.md)

1. **A URL que o usuário entrega é a autorização para abrir aquele site, e só ele.** Diga em 1 linha o que vai acontecer: o site será aberto em navegador isolado (sem login, sem cookies), o JavaScript dele **será executado** (necessário para medir) e nada será clicado, preenchido nem baixado. Se o site exige login, está atrás de bloqueio anti-robô ou é área privada: **pare** e peça arquivo HTML salvo ou capturas; não contorne.
2. **Medir:** `node scripts/extrair-design.mjs <url> <pasta> [--nome "Nome"] [--slug s]`. Mede estilos calculados em 1440, 768 e 390 px, hover e foco por teclado, tema escuro, CSS e `@font-face`. Gera `<pasta>/<slug>/` com `DESIGN.md` (rascunho de 9 seções), `tokens.css`, `manifest.json`, `USAGE.md`, `source/evidence.md`, `source/tokens.source.json` e capturas.
3. **Olhar as capturas** (`source/screenshots/*.png`) e completar as seções **1 (atmosfera)** e **7 (Do's and Don'ts)** do `DESIGN.md`, os trechos `[AGENTE: …]`. Regra: **nenhum valor novo** (hex, px, nome de fonte) que não esteja em `source/tokens.source.json`; julgamento é prosa, número é medição.
4. **Revisar o que está `[estimado]`** e os avisos (contraste do site, foco sem indicador, fonte de CDN).
5. **Validar:** `node --experimental-strip-types --no-warnings scripts/validar-open-design.mjs <pasta/slug>` (Node ≥ 22.6). Aprova só sem `[AGENTE]` pendente.
6. **Entregar** o caminho, o resumo (acento, fontes, raio, espaçamento), o que foi `[estimado]` e o rótulo de direitos (abaixo).

### O que o extrator mede e não mede (testado)

- **Testado em 2 gabaritos:** (a) uma página minha com CSS conhecido: container 1248 px, margens 96/31/16 px, corpo 17 px e movimentos 120/200 ms bateram depois de corrigir **5 erros** que a comparação expôs; (b) uma página do Open Design com tokens do Stripe escritos por outros: **6 de 6 tokens de identidade exatos** (fundo, superfície, texto, apoio, borda, acento), mais raio, espaçamento de seção, movimento e pilha de fontes. Divergiu em tamanho-base (14 × 16 px), entrelinha de título e contêiner.
- **Teste cego (1 agente, só a URL de uma página em localhost, sem ver o código):** gerou a pasta, completou as seções 1 e 7 olhando as capturas, e **todo hex e todo número dessas seções existia nas medições** (conferi por script). O teste achou 5 defeitos do extrator, 4 corrigidos (`--muted` medido em seção escura e aplicado ao fundo claro; captura no meio da rolagem por `scroll-behavior: smooth`; resumo com `?px` e fonte truncada; raio de uma só ocorrência). O quinto (texto `[PREENCHER]` do site lido como botão) é conteúdo do próprio site e foi mantido.
- **Regra de leitura:** ele mede **o que a página USA**, que pode diferir do token de **intenção** do autor. Páginas densas dão base menor; um site sem contêiner centralizado dá `--container-max` [estimado].
- **Não testado em site público real:** o proxy desta sessão bloqueia os sites que tentei. Sites com anti-robô, SPA pesada, fontes em canvas ou estilos em Shadow DOM podem dar resultado pobre; diga isso.
- **Limites do método:** fundo efetivo ignora gradiente e imagem; CSS de outra origem pode não ser legível (as custom properties vêm também do CSS baixado); só mede hover e foco; margem lateral é a posição até o contêiner/texto, não o `gap` do CSS.
- **Segurança do extrator:** contexto isolado, downloads e permissões bloqueados, requisições a localhost/redes privadas bloqueadas (`--permitir-local` só para páginas do próprio usuário), URL com usuário/senha recusada. Não protege contra DNS rebinding `[limite]`.

### Direitos (diga ao usuário)

O `DESIGN.md` descreve linguagem visual. **Não copie logotipo, nome, textos, ilustrações nem fotos do site de origem**, e não use identidade de terceiros como se fosse sua. Extrair de **site do próprio usuário** ou para **estudo** é o uso seguro; produto que imita marca alheia é risco jurídico `[não é aconselhamento legal]`. Nunca use para reproduzir login ou pagamento de marca real.

## 2. Trabalhar com o Open Design

O Open Design (nexu-io/open-design, 53231d4, Apache-2.0) tem o mesmo formato de pasta: `design-systems/<slug>/` com `manifest.json`, `DESIGN.md`, `tokens.css`, `USAGE.md` e `source/`. O contrato de tokens exige **26 tokens "A1"** (identidade e estrutura) e o manifest tem esquema próprio. A skill traz **cópia dos contratos oficiais** em `scripts/od-contracts/` e o validador usa o código deles; por isso uma pasta aprovada aqui satisfaz a validação mecânica do Open Design `[a guarda completa do repositório, com testes de qualidade, não foi rodada]`.

**Caminhos de integração (todos opcionais, o último só com OK):**
1. **Catálogo embutido:** compare o resultado com `data/open-design-systems/` (`grep -i`) para achar o sistema mais próximo e herdar o que faltar.
2. **Entregar no formato do Open Design:** a pasta gerada já é `design-systems/<slug>/`. Para o app, o README deles diz: para adicionar uma marca própria, ponha o `DESIGN.md` em `design-systems/<marca>/` `[onde o app instalado lê pastas do usuário: não confirmado]`. Copiar para dentro de um clone do repositório e abrir PR é decisão do usuário.
3. **`brand-extract` do Open Design** (skill deles, extrai um Brand Kit dirigindo o navegador do app com `agent-browser` e escrevendo `brand.json`): alternativa quando o app está instalado. Não foi rodada aqui.
4. **OpenDesign Web Clipper** (extensão MV3 em `clipper/` do repositório, "clip the web into your design Library"): permissões `scripting`, `storage`, `contextMenus`, `tabs`, `downloads` e acesso a todos os sites. Instalação manual ("carregar sem compactação") **só com OK**, lendo o código antes.
5. **App/daemon do Open Design:** ver `integracoes.md` (telemetria de produto ligada por padrão, `curl | sh`; risco médio). Com o app, o Open Design usa o `DESIGN.md` e o `tokens.css` como sistema ativo ao gerar protótipos; aplique também o `craft/` já destilado nas referências.

## 3. A extensão "DESIGN.md Style Extractor" e o typeui.sh (avaliação)

**Limite desta avaliação:** `typeui.sh` e a Chrome Web Store estão **bloqueados pelo proxy da sessão**. O que segue vem do código do repositório `bergside/typeui` (commit 2a977f1, lido) e de **resumos de terceiros na busca** `[não verificado]`.

- **TypeUI CLI** (npm `typeui.sh` 0.7.1): MIT, gratuito. Gera/atualiza `SKILL.md` ou `DESIGN.md` por perguntas e baixa itens de um registro (`pull`, `list`). Faz GET em `https://www.typeui.sh` e em `raw.githubusercontent.com/bergside/awesome-design-skills`. **Não é extrator de site.** O repositório também traz plugins e um MCP **hospedado** (o que você pergunta passa pelo servidor deles `[não verificado]`).
- **Extensão "DESIGN.md Style Extractor"** (pelo TypeUI): extrai estilos da página aberta e gera `DESIGN.md`/`SKILL.md`. Resumos de terceiros dizem gratuita e sem coleta de dados `[não verificado; não li a política de privacidade nem as permissões]`. Há **produtos com nome parecido** (ex.: "Design Extractor", de outro autor, com créditos pagos): confira o identificador na URL da loja (`ogpdnchdjiibhobphelbbkemnnemkfma` é o da sua) antes de instalar.
- **Preço do typeui.sh: NÃO CONFIRMADO.** A busca devolveu valores que se contradizem (planos mensais de US$ 30 e US$ 50 e, na mesma frase, "acesso vitalício sem assinatura"). A página oficial não abriu. Leia você a seção `#pricing` antes de pagar.
- **Instalar a extensão:** só você, pela página da loja (não consigo instalar extensão no seu Chrome). Antes: ver as permissões que o Chrome mostra (extensões desse tipo pedem acesso ao conteúdo das páginas), usar só em páginas públicas e **não** com abas logadas (banco, e-mail).
- **Vale usar a extensão em vez do extrator da skill?** A extensão roda no seu navegador, com sua sessão, e é prática para uma página; o extrator da skill é auditável (código aqui), isolado, mede 3 viewports e já sai no formato do Open Design com validação. Os dois se complementam; não comparei a qualidade do `DESIGN.md` da extensão com o do extrator `[não testado]`.

## 4. Formato final do `DESIGN.md` (9 seções)

Mesmo formato do catálogo: 1 Visual Theme & Atmosphere, 2 Color Palette & Roles, 3 Typography Rules, 4 Component Stylings, 5 Layout Principles, 6 Depth & Elevation, 7 Do's and Don'ts, 8 Responsive Behavior, 9 Agent Prompt Guide (`tipografia-cor-e-design-md.md`).
