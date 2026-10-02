# Image-to-code — gerar a referência visual primeiro, depois construir igual

Para trabalho em que a **qualidade visual é o ponto** (landing page, site de campanha, redesenho de ficha ou HUD, "faz bonito"): primeiro gera a imagem de referência, analisa a fundo, e só então implementa. A imagem é a fonte de verdade visual; o código é a tradução. Para trabalho técnico (bug, estrutura, design system já definido), não use: vá direto ao código.

Fonte: condensação da skill `image-to-code` (original muito repetitivo: aqui só as regras que mudam o resultado).

## Pré-requisito: ferramenta de geração de imagem

Só vale se a plataforma tiver geração de imagem. **Sem ela, diga em uma linha** e substitua a fase 1 por uma especificação escrita (wireframe em texto + tokens de design) que o operador aprova, depois siga as fases 2 e 3 sobre essa especificação. Não finja ter gerado imagem.

## Ordem obrigatória

1. **Gerar** a imagem (ou as imagens) de referência.
2. **Analisar** a fundo.
3. **Implementar** igual à imagem.

Não comece escrevendo código livre quando o problema é visual.

## Gerar bem

- **Uma imagem grande por seção** (hero, features, preços…), não um painel único comprimido em que o texto fica ilegível. Pedido de 4 seções → 4 imagens.
- Seção ainda ilegível: gere um **novo render isolado** dela (texto maior, espaçamento claro), na mesma linguagem visual. **Não recorte** pedaços de uma imagem maior: o recorte destrói proporção, espaçamento e tipografia.
- Detalhe pequeno (botões, cards, navbar) sem clareza: gere uma imagem de detalhe.
- Várias imagens do mesmo site mantêm o mesmo mundo: tipografia, espaçamento, botões, ícones, tratamento de imagem, paleta.
- Escolha **uma** combinação coerente e mantenha: tema (claro, escuro, sólido, neutro), tipografia, arquitetura do hero, sistema de seções, 4 componentes de assinatura, 2 sensações de movimento.
- Padrões para pedir 4 seções: hero, features, prova social, CTA. Para 8: hero, barra de confiança, features, produto, benefícios, depoimentos, preços, CTA.

## Regras de composição

- **Hero limpo:** um ponto focal; título de 1 a 3 linhas (se passar, corte palavras); apoio conciso; CTA visível; legível num laptop pequeno; sem pílulas, selos, estatísticas falsas ou "marcadores de sistema" decorativos.
- **Sem caixa dentro de caixa:** evite cards em cards em cards e envelopes arredondados gigantes ao redor de tudo; use caixa só com propósito; prefira layout aberto, alinhamento e espaço.
- **Sem microlixo de UI:** pílulas, rótulos pseudotécnicos, status falsos. Tipografia forte no lugar.
- **Ritmo:** varie densidade, escala e proporção imagem/texto entre seções, sem quebrar a coerência. A página respira.
- **Imagens em molduras de proporção fixa** e consistentes.
- **Anti-clichê:** nada de gradiente roxo/azul de IA, brilho em toda borda, blobs, vidro empilhado, texto de enchimento ("revolucione", "perfeito", "sem costura"), marcas falsas (Acme, Nexus).

## Análise antes de codar (trate a imagem como especificação)

Extraia, por seção: o texto legível (título, subtítulo, CTAs, rótulos); tipografia (escala, peso, linhas, entrelinha, contraste display/corpo); espaçamento (entre título e subtítulo, entre texto e botão, gutters, padding, ritmo entre seções); botões (forma, raio, preenchido/contorno, hierarquia); cards e divisores; cores (fundo, painéis, acentos, hierarquia do texto, sombras); grade e ordem das seções. Algo ilegível ou ambíguo: **gere outra imagem antes de codar**, não chute.

## Implementação fiel

Construa **copiando**: mesma estrutura, ritmo de espaço, ordem, tipografia, componentes. Não troque por template genérico, não comprima o espaço generoso, não reintroduza as caixas aninhadas que a análise removeu. Ambiguidade: preserve a linguagem visual, depois a lógica de layout, depois a família de componentes; gere detalhe extra se preciso; só então escolha a versão mais implementável e fiel.

## No Foundry

Seção vira aba, painel ou parte da ficha; implemente com Handlebars/ApplicationV2 da versão-alvo (`references/templates.md`), escopo de CSS próprio e variáveis para tema (`references/frontend-design.md`). Confirme com o operador que ele quer o redesenho visual antes de tocar em ficha existente.

## Verificação final

A imagem foi gerada antes do código? Todo texto legível foi extraído e usado? Houve imagens extras onde faltava clareza? Nenhum recorte foi usado? O hero está limpo? Tipografia, espaço, botões e cores foram analisados? O resultado ainda parece o mesmo site das imagens?
