# Como Criar Letras para o Suno AI — Guia Completo

> Guia de referência para criação de músicas no Suno AI: estrutura, style tags, letras e boas práticas.

---

## O que é o Suno AI e como ele funciona

O Suno AI é um gerador de música por inteligência artificial que cria faixas completas (vocais + instrumentação) a partir de dois inputs principais:

- **Style prompt** — descreve o estilo sonoro, gênero, instrumentos, vocais e energia
- **Letras** — o texto que será cantado, estruturado em seções marcadas

O modelo interpreta os dois campos como um _brief criativo_ e gera áudio gerado por IA. Ele não compõe nota a nota — ele prevê padrões sonoros baseados nos descritores que você fornece.

---

## Modos de Criação

### Modo Simples (Simple Mode)

- Você descreve o que quer em linguagem natural
- O Suno gera letras e estilo automaticamente
- Bom para testar ideias rapidamente
- Pouco controle sobre o resultado final

### Modo Customizado (Custom Mode) ⭐ Recomendado

- Você escreve as letras completas com `[seções]`
- Você preenche o campo **Style** manualmente com tags
- Controle total sobre estrutura, tema e sonoridade
- Resultados muito mais consistentes e intencionais

---

## O Campo Style — Como Funciona

O campo Style aceita **descritores separados por vírgula**. Cada termo puxa o modelo em uma direção sonora. O Suno lê isso como um conjunto de pesos: o primeiro termo tem mais influência.

### Estrutura Ideal de Style Prompt

```
[SUBGÊNERO PRINCIPAL], [ENERGIA/MOOD], [INSTRUMENTOS], [TIPO DE VOCAL], [PRODUÇÃO]
```

**Exemplo:**

```
nu metal, emotional and aggressive, distorted guitars, heavy drums, rap verses with melodic clean chorus, male vocals, modern production
```

### Quantidade Ideal de Tags

- **Mínimo:** 3 tags (resultado genérico)
- **Ideal:** 4 a 7 tags (equilíbrio e clareza)
- **Máximo recomendado:** 8 tags (acima disso o modelo pode se confundir)

---

## Estrutura de Letras com [Seções]

O Suno usa marcadores de seção entre colchetes para entender a estrutura da música. Coloque-os **na própria linha, sem texto na mesma linha**.

### Seções Disponíveis

|Seção|Uso|
|---|---|
|`[Intro]`|Abertura instrumental ou vocal suave|
|`[Verse]` / `[Verse 1]`|Estrofes narrativas|
|`[Pre-Chorus]`|Ponte de tensão antes do refrão|
|`[Chorus]`|Refrão — deve ser o gancho mais forte|
|`[Bridge]`|Quebra de padrão, contraste emocional|
|`[Breakdown]`|Para metal/metalcore — queda de tempo pesada|
|`[Outro]`|Encerramento ou fade out|
|`[Hook]`|Frase de gancho repetida|
|`[Rap Verse]`|Especifica um verso em flow de rap|
|`[Instrumental]`|Seção sem vocal|
|`[Solo]`|Solo instrumental|

### Exemplo de Estrutura Completa

```
[Intro]
(instrumental 4 compassos)

[Verse 1]
Correndo contra o vento, sem parar
Cada cicatriz me ensina a levantar
Carrego o peso do mundo nas costas
Mas meus passos nunca vão recuar

[Pre-Chorus]
A escuridão não vai me calar

[Chorus]
Eu sou a chama que não apaga
Mesmo que a tempestade me ameace
Sou a voz que grita quando ninguém fala
O guerreiro que nunca se cansa

[Verse 2]
...

[Bridge]
(musical shift, mais suave ou mais intenso)

[Chorus]
...

[Outro]
(resolução ou fade)
```

---

## Limite de Caracteres

- **Campo Style:** aproximadamente 120 caracteres — seja direto e evite frases longas
- **Campo Letras:** aproximadamente 3.000 caracteres por geração
- Músicas geradas têm em média 2 a 4 minutos
- Estruture para **2 versos + 2 refrões + bridge** como base segura

---

## Tags de Vocal — Como Especificar

O Suno responde bem a descritores específicos de voz:

|Descritor|Resultado|
|---|---|
|`male vocals`|Voz masculina genérica|
|`female vocals`|Voz feminina genérica|
|`clean male vocals`|Voz masculina limpa, melódica|
|`screamed vocals`|Grito (metalcore/punk)|
|`harsh growl`|Gutural (death metal)|
|`rap flow`|Flow de rap falado|
|`melodic rap`|Rap com melodia|
|`falsetto`|Voz em falsete agudo|
|`deep baritone`|Voz grave e profunda|
|`whispered vocals`|Sussurros|

---

## Tags de Produção — Controle de Qualidade

|Tag|Efeito|
|---|---|
|`modern production`|Som contemporâneo, limpo|
|`lo-fi`|Textura vintage, crua|
|`studio quality`|Mixagem profissional|
|`raw energy`|Captação crua, intensa|
|`cinematic`|Sonoridade épica e orquestral|
|`wall of sound`|Camadas densas de instrumentos|
|`layered mix`|Múltiplas camadas vocais/instrumentais|

---

## Erros Comuns a Evitar

1. **Usar apenas "rock" ou "metal" sem subgênero** → o modelo escolhe o resultado mais seguro e genérico
2. **Colocar nomes de artistas no campo Style** (ex: "Linkin Park") → bloqueado por direitos autorais. Descreva o estilo em vez disso
3. **Mais de 10 tags no Style** → o modelo fica sobrecarregado e ignora parte das instruções
4. **Letras sem marcadores de seção** → o modelo não sabe onde colocar refrão, verso ou bridge
5. **Termos contraditórios** (ex: "soft acoustic, heavy distortion") → o modelo oscila entre os dois sem comprometer com nenhum
6. **Seções muito longas** → cada seção deve ter entre 4 e 8 linhas para funcionar bem
7. **Não especificar o tipo de vocal** → o Suno escolhe algo neutro, geralmente suave demais para estilos pesados

---

## Dicas Avançadas

- **Idioma das letras:** escreva as letras no idioma que você quer que a música seja cantada. O Suno respeita isso.
- **Coloque o gênero principal sempre primeiro** no campo Style
- **Regenere sem medo:** o mesmo prompt pode gerar resultados muito diferentes — experimente 3 a 5 vezes antes de descartar um prompt
- **Use `[Chorus]` duas ou três vezes** — o modelo reforça o refrão a cada repetição do marcador
- **Descreva a energia da seção dentro dos colchetes** (ex: `[Chorus - building intensity]`) para sugestões mais precisas
- **Para rap em português:** escreva as letras em PT-BR e descreva o estilo em inglês no campo Style

---

## Modelo de Prompt Completo

**Style:**

```
nu metal, emotional, distorted guitars, heavy drums, rap verses, clean melodic chorus, male vocals, modern production, dark atmosphere
```

**Letras:**

```
[Intro]
(guitar riff)

[Verse 1]
Fui criado entre o silêncio e a dor
Aprendi que o mundo não tem cor
Cada palavra que disseram foi um golpe
Mas eu aprendi a usar o impacto como motor

[Pre-Chorus]
Não me importa o que vão dizer

[Chorus]
Eu ainda estou de pé
Mesmo que tudo desmorone
A escuridão virou meu combustível
E o caos virou meu nome

[Verse 2]
Cada noite foi uma batalha interna
Cada cicatriz uma lição eterna
Carrego o peso do que me tornei
Mas não vou dobrar, não vou me render

[Bridge]
Eu já fui embaixo
Eu já toquei o fundo
Mas cada queda me fez mais profundo

[Chorus]
Eu ainda estou de pé
Mesmo que tudo desmorone
A escuridão virou meu combustível
E o caos virou meu nome

[Outro]
(fade instrumental)
```