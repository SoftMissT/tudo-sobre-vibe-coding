# Copy de interface (textos que vão no produto)

Escopo: **só o texto que aparece na interface** (títulos, botões, erros, vazios, microcopy, landing). A voz da POWER no chat **não** passa por aqui. Fontes: skill `humanizer` v2.2.0 (MIT, conforme o README anexado; baseada em "Signs of AI writing", Wikipedia/WikiProject AI Cleanup; anexada por Nelson), regras de copy das Web Interface Guidelines da Vercel (MIT) e `anti-ai-slop` do Open Design (Apache-2.0). O `humanizer` é feito para **inglês**; a aplicação ao português é adaptação `[não validada em PT-BR]`.

## Proibido (falhas que denunciam IA)

- **Métricas, depoimentos, logos de clientes inventados.** Use dado real ou marcador explícito `[PREENCHER: fonte]`.
- **Filler:** lorem ipsum, "recurso um/dois/três", "texto de exemplo".
- Emoji como ícone de funcionalidade.
- Linguagem promocional inflada ("revolucionário", "transformador", "solução completa"), significado grandioso ("marca um momento", "testemunho do"), atribuição vaga ("especialistas dizem").
- Paralelismo negativo ("não é só X, é Y") e regra de três por reflexo.
- Fechamento genérico positivo ("o futuro é promissor") e bajulação ("ótima pergunta!").
- Excesso de travessão e de negrito; listas com cabeçalho em linha para tudo.
- Hedge excessivo e frases de enchimento.

## Regras de microcopy (Vercel, adaptadas)

- **A mesma ação mantém o nome em todo o fluxo:** o botão "Publicar" gera o aviso "Publicado" (frontend-design V2).
- Erro não pede desculpa e nunca é vago.
- Voz ativa: "Instale a CLI", não "A CLI será instalada".
- **Rótulo específico:** "Salvar chave de API", não "Continuar".
- Erro diz **o que fazer**, não só o problema.
- Numerais para contagem ("8 implantações").
- Reticências `…` (um caractere) para estados em andamento: "Salvando…".
- Segunda pessoa; evite primeira.
- Placeholder mostra um exemplo e termina em `…`.
- **Não se aplica ao português:** Title Case em títulos e botões (regra do inglês). Em PT-BR use caixa de frase. `[adaptação]`

## Como dar "voz" ao produto

Variação de ritmo, frase concreta no lugar de abstrata, uma opinião do produto, verbo específico ("Começar a rastrear" vence "Começar"). Texto neutro demais também denuncia IA. Mesmo assim, o tom do **produto** vem do brief do projeto, não da POWER.

## Processo (loop do humanizer, reduzido)

1. Escreva o rascunho com o conteúdo real que existe.
2. Pergunte: "o que ainda soa gerado por IA?" e liste em poucos itens.
3. Reescreva removendo só esses itens. Pare.
4. Confira: nenhum número ou nome inventado; cada botão diz o que faz.

Texto longo (página inteira, blog, e-mail de marketing): chame a skill `humanizer` se existir, e diga que chamou.
