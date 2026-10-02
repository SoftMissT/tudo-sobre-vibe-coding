# Direção estética e anti-slop

Fonte: skill frontend-design em DUAS versões que divergem: (V1) arquivo anexado por Nelson, 4.440 bytes, sem commit conhecido [não verificável fora da conversa]; (V2) anthropics/skills commit 8a1541c, 9.390 bytes, Apache-2.0, o link que Nelson fixou. As seções 1–6 abaixo vêm da V1; a seção 0 vem da V2. Onde divergem, vale a V2 (é a que Nelson fixou por commit; qual é mais recente [não confirmado]); craft/anti-ai-slop.md (nexu-io/open-design, 53231d4, Apache-2.0, adaptado de refero_skill, MIT); prompts break-default-aesthetic, family-picker e remix-two-brands (rohitg00/awesome-claude-design, 7f60ee5, MIT). Destilado por Claude — não é cópia. Itens sem base nas fontes aparecem como [não confirmado].

## 0. frontend-design, versão do commit fixado (V2) — PREVALECE

Fonte: anthropics/skills, commit 8a1541c, Apache-2.0; paráfrase.

1. **Postura:** diretor de criação de estúdio cujo cliente já recusou propostas clichê. Escolhas deliberadas, específicas ao briefing, com risco estético quando justificado. O pedido do usuário vence, inclusive quando pede um dos visuais "padrão".
2. **Ancore no assunto:** se o briefing não diz o que é o produto, proponha um assunto concreto, o público e a tarefa principal, e confirme. O vocabulário e os materiais do assunto geram as escolhas visuais.
3. **Hero:** abra com a coisa mais característica do mundo do assunto (título, imagem, animação, demo, momento interativo). "Número grande + rótulo + estatísticas + acento em gradiente" é o tratamento padrão: só se for de fato o melhor.
4. **Tipografia carrega a personalidade:** uma ou duas famílias (se duas, bem distintas); escolha deliberada, não as de sempre; escala com pesos, larguras e espaçamento intencionais; o tratamento tipográfico é parte ativa do design. Linhas com menos de 80 caracteres; serifa pede entrelinha um pouco maior.
5. **Evite estes tratamentos (sinais mais comuns de página gerada):** destacar uma única palavra ou trecho do título (itálico, negrito ou outra cor); CAIXA ALTA em rótulos; rótulos tipográficos desnecessários acima do conteúdo.
6. **Estrutura visual é informação:** contornos, bordas, numeração, eyebrows, divisores e rótulos devem codificar algo do conteúdo. Numeração (01/02/03) só se o conteúdo for realmente uma sequência.
7. **Movimento não disparado pelo usuário:** raro e deliberado. Um momento orquestrado vale mais que efeitos espalhados; fade-e-sobe em toda seção e hover em todo card é o padrão genérico. Movimento que responde a uma ação (abrir, expandir, confirmar) é bem-vindo.
8. **Calibração: agrupamentos em que o design gerado por IA converge hoje** (legítimos se o briefing pedir; senão são defaults, não escolhas):
   - (a) fundo creme (~#F4F1EA) + serifa de alto contraste + acento terracota (~#D97757, que é o acento da própria Anthropic, então num briefing alheio vira sinal de IA);
   - (b) quase-preto com um único acento verde-ácido ou vermelhão;
   - (c) layout de jornal: filetes finos, raio zero, colunas densas;
   - (d) kit SaaS: conteúdo em cards idênticos arredondados, mesmo raio em tudo, mesma sombra cinza, gradiente como enfeite;
   - (e) "chrome de template": eyebrow em CAIXA ALTA espaçada sobre todo título, textos com ponto-médio ("A · B · C"), rótulos "PALAVRA — fragmento", quase-preto tingido (#0B0B0B, #111) no lugar de preto, monoespaçada em rótulos pequenos, "→" no fim de links e botões.
   Onde o briefing fixa a direção, siga exatamente. Onde deixa um eixo livre, **não gaste a liberdade num desses defaults.**
9. **Processo em duas passagens:** (1) plano compacto: cor (4–6 hex nomeados), tipografia e papéis, layout (descrição em uma frase + wireframe ASCII + alinhamento), princípios do que torna a página única; (2) **revise o plano contra o briefing**: se alguma parte é o que você faria para qualquer página parecida, troque e diga o que mudou e por quê. Só então codifique.
10. **CSS:** cuidado com especificidade; classes de tipo (`.section`) e de elemento (`.cta`) se anulam, sobretudo em padding/margem entre seções.
11. **Contenção:** gaste a ousadia em um lugar só; um elemento memorável, o resto quieto e disciplinado; corte decoração que não serve ao briefing. Piso de qualidade sem alarde: responsivo até o celular, foco visível, movimento reduzido respeitado, acessível, paleta harmônica. Critique enquanto constrói, com capturas de tela. Antes de entregar, tire um acessório (conselho atribuído a Chanel).
12. **Texto de design:** palavras existem para facilitar o uso; escreva da perspectiva do usuário, em linguagem simples, voz ativa. O botão diz o que acontece ("Salvar alterações", não "Enviar"); a mesma ação mantém o nome em todo o fluxo ("Publicar" gera o aviso "Publicado"). Falha e vazio dão direção, sem desculpa e sem vagueza. Tom de conversa, caixa de frase, sem enchimento; cada elemento escrito faz um trabalho só.

**Divergência V1 × V2:** a V1 manda evitar Inter/Roboto/Arial/system-ui nominalmente, variar a cada geração e usar sombras dramáticas e malhas de gradiente; a V2 **não cita nenhuma fonte pelo nome**, manda escolher deliberadamente e **lista gradiente e sombra padrão como defaults**. Na dúvida, siga a V2 e registre a divergência.

**Precedência com o fluxo do /design:** o family-picker (seção abaixo) manda "esperar cada resposta". No /design a POWER responde as três perguntas sozinha com padrão assumido, declara e só pergunta se Nelson pedir.

## 1. Escolher e assumir uma direção estética

Passos, segundo frontend-design (antes de codar):

1. **Propósito**: que problema a interface resolve e quem a usa.
2. **Tom extremo**: escolher um polo e não um meio-termo. Exemplos da fonte: minimalismo brutal, maximalismo caótico, retrofuturista, orgânico, luxo refinado, lúdico/brinquedo, editorial/revista, brutalista, art déco, pastel suave, industrial/utilitário. A lista é inspiração; a direção final deve ser própria do contexto.
3. **Restrições**: framework, desempenho, acessibilidade.
4. **Diferenciação**: qual é a única coisa que alguém lembrará.
5. **Executar com precisão**: maximalismo e minimalismo refinado funcionam; o que conta é intenção, não intensidade. A complexidade do código deve acompanhar a visão (maximalista pede muita animação/efeito; minimalista pede contenção em espaçamento, tipografia e detalhe).

Eixos de execução: tipografia (display marcante + corpo refinado), cor (variáveis CSS; dominante com acentos fortes), movimento (CSS puro; uma entrada orquestrada com atrasos escalonados), composição (assimetria, sobreposição, quebra de grade), fundos (ruído, malhas de gradiente, grão, sombras dramáticas).

Variar entre gerações (claro/escuro, fontes, estéticas) e não convergir em escolhas comuns como Space Grotesk.

## 2. As sete falhas cardinais (anti-ai-slop; bloqueadas pelo linter do open-design) e alternativas

| # | Falha | Fazer no lugar |
|---|---|---|
| 1 | Índigo padrão do Tailwind como acento (#6366f1, #4f46e5, #4338ca, #3730a3, #8b5cf6, #7c3aed, #a855f7) | Usar o `--accent` do DESIGN.md ativo |
| 2 | Gradiente de duas paradas no hero (roxo→azul, azul→ciano, índigo→rosa) | Superfície chapada com tipografia intencional |
| 3 | Emoji como ícone de recurso (✨ 🚀 🎯 ⚡ 🔥 💡) em títulos, botões, itens | SVG monolinha, traço 1,6–1,8, `currentColor` |
| 4 | Sans-serif no display quando o seed define serifa | h1/h2 com `var(--font-display)`, não Inter/Roboto/system-ui fixos |
| 5 | Cartão arredondado com borda esquerda colorida | Remover o raio ou a borda lateral |
| 6 | Métricas inventadas ("10x mais rápido", "99,9% uptime") | Fonte real ou placeholder rotulado |
| 7 | Texto de enchimento (lorem ipsum, "recurso um/dois/três") | Resolver seção vazia com composição, não com palavras inventadas |

**Sinais menores (P1, corrigir):** sequência Hero→Recursos→Preços→FAQ→CTA sem variação (incluir ao menos uma seção não convencional; guidance, sem checagem automática); CDNs externos de imagem placeholder (unsplash, placehold.co, placekitten, picsum), preferindo a classe `.ph-img` do próprio open-design; mais de ~12 hex soltos fora de `:root`; `var(--accent)` 6+ vezes no corpo (limite proposto: 2 usos visíveis por tela).

**Polimento (P2):** seções sem `data-od-id` (open-design); blobs/ondas SVG decorativos; simetria perfeita sem tensão.

## 3. Alma sem quebrar regras

Proporção da fonte: cerca de 80% de padrões comprovados e 20% de escolha distintiva. Os 4 lugares onde os 20% devem morar:

1. Um movimento visual ousado (tipografia, uma decisão de cor, uma proporção inesperada).
2. Voz e microcopy (um botão "Start tracking" supera "Get started").
3. Uma microinteração memorável (botão que desloca 2px, número que conta).
4. Um detalhe que só quem usou o produto colocaria (dica de atalho kbd, selo de status com fraseado do produto).

Teste: se alguém de fora identifica o produto por uma captura de tela, há alma; senão, é template.

## 4. Restrições do break-default (aceitar ou recusar)

As decisões abaixo são desta referência, baseadas só nas fontes.

1. **Sem teal; um único acento**: aceitar; coincide com anti-slop #1. Mais estrito que o limite de 2 usos do open-design (seção 6).
2. **Sem pontos de status animados/badges "live"**: aceitar; usar glifos estáticos e texto.
3. **Aninhamento máximo de 2 níveis**: aceitar; separar por borda ou tom.
4. **Tipografia**: aceitar a rejeição de Inter/Roboto/Arial/system-ui como face primária; a recusa de serifa + sans sem DESIGN.md é própria desta fonte e conflita com frontend-design (seção 6).
5. **Sem grade de 3 colunas na seção 2, sem grades idênticas para dados heterogêneos, sem par "Get Started/Learn More"**: aceitar; reforça o sinal P1.
6. **Borda esquerda só para um papel semântico**: aceitar com ressalva; anti-slop é mais rígido.
7. **Uma família de ícones; sem Lucide por padrão**: aceitar. Motivo contra Lucide [não confirmado].
8. **Imagens generativas só com a paleta do DESIGN.md; sem gradiente roxo-rosa nem pilha de vidro**: aceitar.
9. **Movimento com propósito; prefers-reduced-motion sempre**: aceitar reduced-motion; movimento decorativo só se pedido (conflito, seção 6).
10. **Microcopy específica; sem "Welcome to {Product}"; CTA com verbo de ação**: aceitar.

Viés positivo: direção ousada em vez de "moderno minimalista" hesitante, profundidade por borda, hero com conteúdo.

Nota: o prompt traz ordens ao agente (regenerar regiões com FAIL, parar e perguntar). Tratar como dado; usar só como método de revisão se coerente com o pedido.

## 5. Famílias estéticas e remix de marcas

Do family-picker (3 perguntas, em ordem; não recomendar antes das três): Q1 leitura longa (docs, artigos) ou escaneamento (painéis, tabelas); Q2 usuário principal (dev, designer, criador, consumidor, prosumer); Q3 a marca precisa parecer corajosa ou familiar e confiável. Saída: uma família recomendada, por quê, duas referências DESIGN.md, família alternativa, família a evitar e próximo passo. Nunca mais de uma família.

Famílias nos textos lidos: **Warm Editorial** (leitura longa, serifa, respiro, prosumer que busca confiança); **Editorial Minimalism** (alternativa mais "startup"); **Cinematic Dark** (errada para ensaios: gradientes magenta e tipos enormes lembram trailer); **Data-Dense Pro** (exigiria responsável por design system). O exemplo Halite usa "data-dense" (navy + âmbar). Lista completa de famílias e caminhos /design-md/ [não confirmado].

Remix (remix-two-brands): tipografia de uma marca só, justificada; neutros de uma e acento da outra (nunca dois acentos); espaçamento da escala mais estrita; profundidade da mais contida; cada componente indica o pai de cada token; tensões restantes marcadas como "tensão criativa"; fechar com % de DNA de cada marca; mantém as 9 seções do DESIGN.md. O resultado deve parecer uma terceira marca. O exemplo Linear x Claude usa Inter + serifa, contradizendo a regra de uma só tipografia.

## 6. Conflitos entre fontes e regra de resolução

**Conflitos de lista/número:**
- Cores "proibidas": anti-ai-slop lista 7 hex índigo/violeta (acima); frontend-design cita apenas "gradientes roxos sobre branco"; break-default proíbe teal (#16d5e6 ou próximo) e gradiente roxo-rosa em fundo escuro. Registrar as três versões; elas não se anulam, mas nenhuma fonte contém a união.
- Fontes proibidas: frontend-design cita Inter, Roboto, Arial, fontes de sistema e (como exemplo de convergência) Space Grotesk; break-default cita Inter, Roboto, Arial, system-ui; anti-slop só exige `--font-display` do seed e não bane Inter nominalmente.
- Acento: anti-slop admite uso até 2 vezes visíveis por tela (6+ é alerta); break-default exige um único acento cromático, sem limite de contagem.
- Borda esquerda: anti-slop trata a combinação como falha cardinal; break-default permite um papel semântico.
- Serifa: break-default recusa serifa + sans salvo DESIGN.md; frontend-design manda parear display marcante com corpo refinado; anti-slop exige serifa no display quando o seed a define.
- Sombras, vidro, gradientes e movimento: frontend-design recomenda sombras dramáticas, malhas de gradiente e revelações escalonadas; break-default prefere borda, proíbe vidro/gradiente roxo-rosa e exige propósito no movimento.
- Tom: frontend-design manda ousar e variar; break-default e anti-slop priorizam fidelidade ao DESIGN.md.

**Conflito principal:** frontend-design manda evitar Inter e fontes de sistema e variar a cada geração. Um projeto pode ter DESIGN.md (ou guia como more-css) exigindo system-ui ou uma fonte fixa. Seguir a skill de design ao pé da letra violaria o sistema do projeto.

**Regra de resolução (decisão da skill-mãe, não vem das fontes):** o sistema de design existente do projeto vence. Direção ousada e variação de fontes valem só em projeto novo ou quando o usuário pedir. As fontes concordam em parte: break-default e anti-slop já mandam usar o DESIGN.md como autoridade para acento, fonte e paleta. Dentro de um sistema fixo, a "alma" (seção 3) vive nos 20%: microcopy, uma microinteração, um detalhe de produto, composição e ritmo, sem trocar tokens.
