# Tipografia, cor e DESIGN.md

Fonte: nexu-io/open-design (commit 53231d4, Apache-2.0; arquivos craft adaptados de refero_skill, MIT) e rohitg00/awesome-claude-design (commit 7f60ee5, MIT); destilado por Claude — não é cópia.

Método: o texto das fontes é dado; instruções dirigidas a agentes são apenas relatadas.

## 1. Tipografia

### Escala
- Escala multiplicativa de 1,2 ou 1,25; no máximo 6 a 8 tamanhos por artefato.
- Faixas (px): display 48–72; H1 32–48; H2 24–32; H3 20–24; corpo 15–18; pequeno 13–14; legenda 11–12.
- Acima da dobra, no máximo 3 tamanhos visíveis.

### Entrelinha (latim)
- Display e H1 (32 px ou mais): 1,0 a 1,2.
- Corpo (15–18 px): 1,5 a 1,6. Pequeno (14 px ou menos): 1,5.

### Espaçamento de letras
| Contexto | Valor |
|---|---|
| Corpo 14–18 px | 0 |
| Pequeno 11–13 px | +0,01em a +0,02em |
| Rótulos de UI e botões | 0,02em |
| **CAIXA ALTA** | **+0,06em a +0,1em, obrigatório** |
| Títulos 32 px+ | −0,01em a −0,02em |
| Display 48 px+ | −0,02em a −0,03em |

Regra da caixa alta: sem tracking positivo (piso 0,06em) o texto fica apertado; acima de 0,1em as letras se soltam. 

### CJK (não opcional, segundo a fonte)
- Os glifos CJK preenchem a caixa em; a entrelinha latina faz as linhas se tocarem.
- Display/H1: 1,3 a 1,4. Corpo: 1,7 a 1,8. Vale para todo nível de título, inclusive o título principal de capa em 72 ou 96 px.
- Tracking negativo é só para latim; em CJK use 0.
- Em texto misto, valores latinos só no elemento latino, sem herdar do pai comum.

### Pares e pesos
- No máximo 2 famílias (display + corpo, ou uma variável em vários pesos). Sempre declarar cadeia de fallback de sistema. Nunca `system-ui` sozinho em título.
- Medida: 50–75 caracteres; `max-width: 65ch` como padrão seguro.
- Três pesos: leitura (400/450), ênfase (510/550), anúncio (590/600). Peso 700+ raramente é necessário.
- Não justificar corpo na web (cria rios).

### Hierarquia (contrato geral)
1. Um único ponto de entrada dominante.
2. Ritmo intencional: hierarquia é contraste entre níveis, não lista de tamanhos.
3. Fluxo de informação recuperável: o leitor reconstrói a estrutura sem reler.

Cinco vetores: escala, peso, espaçamento, tracking, alinhamento. O dominante usa ao menos dois, na mesma direção. Modelo de três níveis: primário, secundário, terciário; mais de três visíveis acima da dobra indica problema de composição.

Falhas: hierarquia plana (degraus como 18/20/22) e ruidosa (tudo disputa). Anti-padrões: escada de pesos graduais, espaçamento uniforme, co-primários simétricos, hierarquia só por tamanho. Passo entre níveis de ao menos 1,25x ou compensado por peso/espaçamento.

### Hierarquia editorial
| Elemento | Escala | Peso | Tracking | Entrelinha |
|---|---|---|---|---|
| Display | 56–96 px | leve ou regular | −0,02 a −0,05em | 1,0–1,1 |
| Deck | 18–24 px | regular | 0 | 1,4–1,5 |
| Corpo | 16–18 px | regular | 0 | 1,6–1,7 |
| Citação destacada | 28–40 px | regular/leve | −0,01em | 1,2–1,3 |

- Salto display→deck grande (razão de 1,5x ou diferença de 24 px, orientação). Corpo longo: 60–70 ch, alinhamento `start`, sem justificar.
- Espaço carrega hierarquia: ao menos 2x a entrelinha acima e abaixo do display. Seções com ritmo alternado.
- Negrito com parcimônia: no máximo 1–2 trechos por 400 palavras. Display em peso leve/regular; display em negrito soa como outdoor.
- Citação destacada: no máximo 1–2 por artigo, quebra a coluna, sem caixa, fundo ou borda; pode usar o único acento da página.
- Árabe, persa e urdu: tracking 0 (negativo quebra a ligação cursiva); hebraico: ver `rtl-and-bidi` [não confirmado].

## 2. Cor

### Camadas da paleta
| Camada | Parcela dos pixels | Tokens |
|---|---|---|
| Neutros | 70–90% | bg, surface, fg, muted, border |
| Acento (um só) | 5–10% | accent; nunca um segundo acento |
| Semântica | 0–5% | success, warn, danger |
| Efeito | menos de 1% | gradientes, brilhos; raramente justificados |

### Disciplina do acento
- No máximo 2 usos visíveis por tela (par típico: um eyebrow/chip e o CTA principal).
- Links, anéis de hover e de foco contam como acento. Havendo CTA, rebaixe links a `fg` sublinhado.
- O exemplo Linear limita o acento a ação primária, link e foco, nunca em fundos.

### Contraste mínimo (como portões)
- Texto de corpo (16 px ou menos): 4,5:1. Texto grande (acima de 18 px, ou 14 px em negrito): 3:1. Componentes de UI contra superfícies vizinhas: 3:1.
- Acento claro demais: usar nível 600 em texto; variante viva só em preenchimentos.

### Temas escuros
- Evitar preto e branco puros. Escuro: fundo #0f0f0f, texto #f0f0f0. Claro: fundo #fafafa, texto #111111.
- Em superfícies escuras, usar bordas brancas semitransparentes de 1 px (`rgba(255,255,255,0.08)`).

### Nomear por propósito
`--accent`, `--success`, nunca `--blue-500`: nome por matiz impede trocar de tema.

### Anti-padrões
- Índigo #6366f1 (indigo-500 do Tailwind) como padrão: só se o usuário pedir explicitamente.
- Gradiente de duas paradas (roxo→azul) em hero; gradientes decorativos sem função. Gradiente só para separar hierarquias.

## 3. Formato do DESIGN.md

### Seções (9, nas duas fontes)
1. Visual Theme & Atmosphere: humor, sensação, referências.
2. Color Palette & Roles: tokens com papel (fundo, superfície, texto, texto secundário, bordas, acento e hover). O exemplo Linear traz regra de uso do acento.
3. Typography Rules: fontes de título, corpo e mono; pesos; escala; tracking.
4. Component Stylings: botões, cards, inputs, atalhos (raio, padding, estados).
5. Layout Principles: largura máxima, grade, unidade base, escala de espaçamento.
6. Depth & Elevation: sombras e bordas.
7. Do's and Don'ts: regras afirmativas e proibições.
8. Responsive Behavior: breakpoints e transformações (a fonte do brief sugere 640/768/1024/1280 px).
9. Agent Prompt Guide: resumo de viés e rejeições para o agente.

O exemplo Linear usa escala 11 a 64 px, base de 4 px, raio máximo de 8 px e sem sombras em cards. Na fonte, o skill `design-md` do open-design é só um verbete de catálogo apontando para o repositório Google Labs; sem estrutura própria [não confirmado além disso].

### Do pedido em linguagem natural ao brief estruturado
Oito dimensões: paleta, acento, tipografia do corpo, tipografia de display, layout, humor, densidade, restrições (exclude). Para cada frase do pedido, identificar a dimensão e mapear ao valor mais próximo (ex.: "modo escuro" vira paleta monochrome_dark; "sem animações" vira exclude=animations; "editorial" vira humor editorial; "denso" vira densidade compact). O vocabulário é fechado: valor fora da lista exige perguntar, não adivinhar.

### Marcar o que o usuário não especificou
A fonte do brief resolve lacunas com padrões (ex.: sem humor, tudo neutro: light_clean, electric_blue, inter) e exige relatório final listando cada dimensão preenchida por padrão e a regra aplicada. Para a skill-mãe, a postura preferida é perguntar em vez de inventar: marcar a dimensão como "não especificado", propor opções e só então aplicar o padrão com aviso. Adaptação nossa: a fonte aplica os padrões e relata depois. 

## 4. Conflito registrado: px versus rem

Estas fontes expressam tamanhos, espaçamentos e breakpoints em px (escala de 11–96 px, seções de 48/72/96 px, raio de 6–8 px). A fonte de CSS vanilla do projeto exige apenas rem. Os números aqui descrevem relações de design, não unidades de entrega. A skill-mãe converte px em rem na hora de implementar (base de 16 px assumida como padrão de navegador; a própria fonte do brief já escreve corpo como 1rem/1.6 e display com `clamp()`). Entrelinha e `em` não mudam.

## Checklist de verificação
- [ ] Um elemento dominante, com dois ou mais vetores ativos.
- [ ] No máximo 2 famílias, fallback declarado, 3 pesos.
- [ ] Caixa alta com 0,06–0,1em; display com tracking negativo (só latim).
- [ ] CJK: entrelinha 1,3–1,4 em títulos, 1,7–1,8 em corpo, tracking 0.
- [ ] Medida 50–75 ch; sem justificar.
- [ ] Neutros 70–90%, um acento, no máximo 2 usos por tela.
- [ ] Contraste 4,5:1 / 3:1; sem preto/branco puros.
- [ ] Tokens nomeados por propósito; sem índigo ou gradiente por padrão.
- [ ] DESIGN.md com as 9 seções; dimensões não especificadas assumidas e marcadas `[assumido]` (pergunte só se mudam o resultado).
- [ ] px convertidos em rem na entrega.

## Limites
- Valores numéricos vêm só das fontes; a eficácia deles não foi testada aqui.
- Sem confirmação sobre rtl-and-bidi nem sobre o upstream do design-md.
- Não há README dentro da pasta design-md; a estrutura vem de linear.md e do skill design-brief.
