# BANNER 05 — COMO COMEÇAR

> **Destino no repo:** seção "🚀 Como Começar" do README (atualmente sem arte)
> **Engine:** GPT Image 2.5 — tier **Sunburst**
> **Aspect ratio:** **16:9 nativo**
> **Modo:** HERO COVER + ROTA NARRATIVA (ORV)
> **Accent color:** verde terminal (base grafite-preto)
> **EXACT TEXT:** `COMO COMEÇAR` / `ESTUDAR · CONFIGURAR · ADOTAR · EXPERIMENTAR`

---

## Direção de Arte

Hero Cover com rota narrativa — operadora de bob-curto escuro sobe uma escada de 4 plataformas-holograma (numeradas 1–4) em diagonal inferior-esquerda → superior-direita, mão alcançando o cubo-terminal do 4º degrau. Os 4 ícones espelham os 4 passos do README: livro (estudar), engrenagem (configurar), ciclo de setas (adotar), faísca (experimentar).

## Assumido pela Ártemis

1. **estilo** — manhwa cover premium (REDICE + TBATE), anime key-visual readability, 2D ilustrado, zero photoreal/CGI;
2. **iluminação** — brilho verde do cubo-terminal como key (rim no perfil e na mão que alcança), fill frio da escada, safe zone em parede escura calma;
3. **enquadramento** — 16:9, title-left / hero-right com diagonal ascendente, 45mm lateral 3/4;
4. **paleta** — preto-grafite + slate frio + accent verde-terminal, micro-accent âmbar na emblema de asas;
5. **nível de detalhe** — alto em rosto/título/mão, médio em plataformas/ícones, baixo no templo-servidor;
6. **atmosfera** — templo de servidores abstrato, névoa no chão, motes de dados subindo.

## Referências Encontradas (style bible real do repo)

1. **Link-Start/Gits:** heroína com emblema de asas no macacão, HUDs em caixas com labels em português, safe zone à esquerda.
2. **Meus GPTs:** operadora bob-cut interagindo com holograma, painéis-lista flutuantes.
3. **Claude Skills:** ambiente escuro com estrutura vertical, brilho de accent quente/frio direcionando o olhar.
4. **Convenção transversal:** 1 título display + subtítulo, UM accent por peça, thumbnail-safe.

---

## PROMPT PRINCIPAL

```
FORM
Create a strict 16:9 PREMIUM FULL-COLOR KOREAN MANHWA PROMOTIONAL BANNER for the "COMO COMEÇAR" (getting started) section. Use HERO COVER + narrative route: a confident female operator with short dark bob hair (blue-violet strands), dark techwear jacket with a small winged emblem, climbs a luminous staircase of four floating holographic step-platforms ascending from lower-left to upper-right; her hand reaches toward the fourth platform where a small glowing terminal cube waits. Each platform carries a minimal icon: book, gear, arrows-cycle, spark. The narrative: four steps to start vibe coding.

MATERIAL
Platforms = clean graphic slabs with edge light and engraved numerals 1–4; jacket = matte fabric, broad folds, graphic shadow; hair = grouped sharp masses; terminal cube = simple hexahedron with green screen glow; background server-temple = large planes. No PBR.

LIGHTING
GRAPHIC FIRST. Green terminal glow from upper-right platform as key, rimming the operator's profile and reaching hand; cool ambient from the step-ladder path; title-safe zone left 30% kept as calm dark gradient wall with faint grid. Highest contrast at operator face, hand and title.

STYLES
MANHWA COVER COMPOSITION (title-left / hero-right diagonal route); REDICE strong ascending silhouette, black anchors, 3–5 value families; TBATE elegant anatomy, graceful fabric, breathing room along the staircase; ORV staging — the world reacting along her path: faint data leaves lifting from each step, consequence of progress; ANIME KEY-VISUAL readability.

CAMERA
16:9 native. 45mm equivalent, side three-quarter tracking view of the ascent, no distortion.

FRAME LAYOUT
PRIMARY FOCAL = operator mid-frame right, hand toward top platform. TITLE SAFE ZONE = left 30% dark wall + faint grid. SECONDARY NARRATIVE = the four numbered platforms along the diagonal + small terminal cube. ATMOSPHERIC EXTENSION = ascending data motes to upper-right, fading haze lower-left.

RENDER QUALITY
8K illustrated precision; HIGH = face/title/hand; MEDIUM = platforms/icons; LOW = background temple. Crisp numerals, clean icon shapes, sharp title.

ENVIRONMENT
Abstract server-temple: tall dark rack-columns with green status lines, thin fog floor, the staircase cutting a clear diagonal route through it. Minimal HUD labels: "PASSO 1/4" ... "PASSO 4/4" on platforms, "STATUS: READY" small at right.

COLOR
Primary base: graphite black. Secondary: cool slate. Accent: TERMINAL GREEN concentrated on step edges, terminal cube, status lines, title glow. Micro-accent: pale amber on the winged emblem only.

DETAILS
PRIMARY TITLE: "COMO COMEÇAR" (angular display type, green inner glow, stacked at left axis). SECONDARY: "ESTUDAR · CONFIGURAR · ADOTAR · EXPERIMENTAR" (one line, smaller, wide tracking, ivory). No tertiary. EXACT TEXT preserved verbatim.

CONSTRAINTS
HARD BANNER LOCK: promotional cover, not wallpaper/screenshot. HARD TITLE LOCK: left safe zone, no figure/hand/VFX over text. HARD EXACT-TEXT LOCK: reproduce both text lines exactly, no translation/paraphrase. HARD REDICE LOCK: ascending silhouette readable with VFX removed. HARD ORV LOCK: route = narrative, no system windows. HARD COLOR LOCK: terminal green + graphite only, amber micro-accent only on emblem. HARD 2D LOCK: manhwa illustration, no CGI/PBR/photoreal. HARD READABILITY LOCK: secondary line legible at 50%, title readable at 10% scale.
```

---

## NEGATIVE PROMPT

```
generic wallpaper, scene screenshot, anime screencap, webtoon panel screenshot, title pasted over finished illustration, weak title hierarchy, off-center typography, title touching borders, unreadable typography, distorted characters, gibberish text, excessive typography, five equal focal points, background dominating hero, environment detail behind title, VFX covering title, VFX covering face, random particles everywhere, generic magic circles, overdesigned HUD, purple aura everywhere, excessive bloom, rainbow palette, uncontrolled saturation, muddy values, weak silhouette, generic anime-only cel shading, Western movie poster, AAA game key art, photorealism, live action, CGI, 3D, PBR, Unreal Engine, realistic skin pores, flat empty banner, cheap mobile-game ad, watermark, signature, malformed logo, misspelled title, garbled numerals, extra limbs, extra fingers
```

## Parâmetros

- **Resolução alvo:** 8K illustrated precision (thumbnail-safe a 10%)
- **Passe 1 (regra #149):** silhueta ascendente + título + safe zone
- **Passe 2:** 4 plataformas com numerais/ícones, HUD PASSO x/4, motes de dados

## Variações

- **A:** como está (diagonal inferior-esquerda → superior-direita).
- **B:** espelhado (rota da esquerda para a direita invertida) — só se o README pedir ritmo alternado.
- **C:** sem escada física — só plataformas flutuando (mais limpo, menos "game UI").
