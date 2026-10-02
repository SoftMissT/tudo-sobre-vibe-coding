# Frontend design — interfaces com identidade, sem cara de IA genérica

Carregue **só quando o operador pedir interface ou estilo**: ficha, diálogo, HUD, painel, página, componente, "deixa bonito". O `SKILL.md` §5 proíbe mexer em CSS/Handlebars sem pedido; este pedido explícito é a autorização, e vale só para o que foi pedido.

Fonte: adaptação da skill `frontend-design`.

## Antes de codar: escolha uma direção e execute com precisão

- **Propósito:** que problema a interface resolve, e quem usa (mestre no meio do combate? jogador na ficha?). No Foundry, legibilidade em jogo vence enfeite.
- **Tom:** escolha um extremo e comprometa-se (minimalismo brutal, editorial, retrofuturista, orgânico, art déco, industrial, suave…). Intenção importa mais que intensidade: maximalismo e minimalismo funcionam, se executados com rigor.
- **Restrições:** framework, versão do Foundry (ApplicationV2 vs V1: `references/templates.md`), desempenho, acessibilidade, temas claro/escuro do Foundry.
- **Diferencial:** a única coisa que alguém vai lembrar.

Depois implemente código real, funcional e coeso, refinado nos detalhes.

## Diretrizes estéticas

- **Tipografia:** fontes com caráter, par de display + corpo. Evite o genérico (Arial, Inter, Roboto, fonte do sistema) e não convirja sempre na mesma "fonte da moda". Em módulo Foundry, confirme na documentação da versão-alvo como empacotar e registrar fontes.
- **Cor e tema:** paleta coesa com variáveis CSS; cor dominante com acentos fortes vence paleta tímida e uniforme. Respeite o contraste.
- **Movimento:** animações para momentos de alto impacto (uma entrada orquestrada vale mais que microinterações espalhadas). CSS puro quando der. Nada que atrapalhe a mesa: respeite `prefers-reduced-motion`.
- **Composição:** layouts inesperados, assimetria, sobreposição, respiro generoso OU densidade controlada.
- **Fundo e detalhe:** atmosfera e profundidade em vez de cor chapada: texturas, gradientes, sombras, bordas decorativas, coerentes com o tom.

**Evite** estética genérica de IA: fontes saturadas, gradiente roxo sobre branco, layout previsível, componentes de manual, cara de template sem contexto. Varie entre claro e escuro, fontes e estéticas entre trabalhos.

Complexidade de implementação acompanha a visão: maximalista pede código elaborado; refinado pede contenção, espaçamento e tipografia precisos.

## No Foundry

- Escope todo CSS com uma classe do módulo/sistema para não vazar para o resto do Foundry.
- Use variáveis CSS para tema; não sobrescreva estilos do core globalmente.
- Mantenha a estrutura de Handlebars/ApplicationV2 da versão-alvo (`references/templates.md`); mude só o que o pedido pede.
- Teste com mais de um tema/escala de fonte e com conteúdo longo; sem runtime Foundry, entregue o roteiro de teste visual.
- Para partir de uma imagem de referência, use `references/image-to-code.md`.
