# BANNER 01 — HIVE · A FROTA DE AGENTES

> **Destino no repo:** `assets/img/hive/banner_hive.png` (link quebrado no README — seção 🌐 Agents)
> **Engine:** GPT Image 2.5 — tier **Sunburst** (detalhado; Flare só para teste rápido)
> **Aspect ratio:** **16:9 nativo** (formato dos 4 banners já existentes)
> **Modo:** HERO + NARRATIVE PORTRAITS
> **Accent color:** magenta-violeta (base grafite-preto)
> **EXACT TEXT:** `HIVE` / `A FROTA DE AGENTES` / `MAKO-MORI · AKENO · ARTHUR · SINON · CARDINAL`

---

## Direção de Arte

Hero + Narrative Portraits — MAKO-MORI dominante à direita, retratos-entidade dos 4 agentes (AKENO, ARTHUR, SINON, CARDINAL) enquadram o fundo como forças narrativas, nunca como protagonistas iguais. Núcleo do enxame hexagonal (swarm-core) como fonte de luz.

## Assumido pela Ártemis

1. **estilo** — manhwa cover premium (REDICE value structure + TBATE refinement), anime key-visual readability, 2D ilustrado, zero photoreal/CGI;
2. **iluminação** — luz holográfica emitida pelo HUD como fonte principal, rim light magenta-violeta na silhueta, dark anchors profundos;
3. **enquadramento** — 16:9, hero à direita / title-safe zone à esquerda, HUD em caixas flutuantes com texto curto;
4. **paleta** — preto-grafite + slate azul-violeta + accent magenta-violeta;
5. **nível de detalhe** — alto em rosto/título, médio em HUD/retratos, baixo nas bordas;
6. **atmosfera** — hangar/cockpit noturno, névoa sutil, partículas de dados direcionais.

## Referências Encontradas (style bible real do repo)

1. **Link-Start (azul ciano):** heroína de macacão de piloto, perfil 3/4, hand-touch em holograma neural, HUDs em caixas com labels em português, título display com glow.
2. **Meus GPTs (verde):** operadora bob-cut, mesa-holográfica, painéis flutuantes com listas, ícone central orbitado por anel de luz.
3. **Claude Skills (âmbar):** mesma arquitetura em paleta quente, teclado holográfico, janelas de código em transparência.
4. **Convenção transversal:** 1 título display + subtítulo + linha terciária, UM accent por peça, silhueta dominante de um lado, safe zone do título do outro.

---

## PROMPT PRINCIPAL

```
FORM
Create a strict 16:9 PREMIUM FULL-COLOR KOREAN MANHWA PROMOTIONAL BANNER for the "HIVE" agent fleet section of a vibe-coding knowledge hub. The primary visual subject is MAKO-MORI, a female commander in a black-futuristic pilot bodysuit with short dark bob hair and blue-violet strands, standing three-quarter view, one hand raised toward a glowing hexagonal swarm-core hologram. Use HERO + NARRATIVE PORTRAITS composition: MAKO-MORI occupies the right-center focal zone at roughly 60% frame height; four large translucent entity portraits (AKENO, ARTHUR, SINON, CARDINAL) frame the left and upper background at 40% reduced contrast as narrative forces, not equal protagonists. The banner must communicate: one commander coordinating a fleet of specialized AI agents.

MATERIAL
Illustrated local color + graphic shadow + controlled gradient. Bodysuit in matte black synthetic with subtle violet piping highlights; skin illustrated with soft local tone and selective cheek/eye highlight; hair in grouped masses with sharp strand shapes. Swarm-core hologram uses clean hexagonal graphic geometry before emission; entity portraits are semi-transparent line-and-fill constructions, no photoreal glass. Architecture behind is dark hangar/mother-ship structure in large readable planes. No PBR microtexture.

LIGHTING
LOCAL COLOR → LARGE GRAPHIC SHADOW MASS → VALUE HIERARCHY → CONTROLLED GRADIENT → SELECTIVE HARD HIGHLIGHT → ATMOSPHERIC LIGHT → VFX → COMPOSITING. Main light originates from the magenta-violet swarm-core hologram at center-left, carving a strong rim along MAKO-MORI's jaw, shoulder and arm. Protect the left title-safe zone from chaotic high-frequency lighting. Highest contrast at MAKO-MORI's face and the title block only.

STYLES
MANHWA COVER COMPOSITION primary; REDICE strong silhouette, 3–5 value families, deep black anchors, sharp focal contrast; CLASSIC TBATE elegant face, clean anatomy, refined hair and fabric folds, breathing room; ORV/SLEEPY-C narrative staging — the swarm-core reacting, portraits converging toward the commander, world-reaction through drifting hex-particles; ANIME KEY-VISUAL readability at thumbnail.

CAMERA
16:9 native. 50mm equivalent, half-body environmental framing, slight low angle for authority, no fisheye.

FRAME LAYOUT
PRIMARY FOCAL ZONE = MAKO-MORI right-center. TITLE SAFE ZONE = left 30% of width, low-detail dark hangar wall with faint grid. SECONDARY NARRATIVE ZONE = four agent portraits in upper-left arc. ATMOSPHERIC EXTENSION = hexagonal data particles flowing from core toward edges.

RENDER QUALITY
Pipeline: CONCEPT → TITLE SAFE ZONE → HERO SILHOUETTE → PORTRAIT MASSES → HANGAR STRUCTURE → LINE/VALUE SYSTEM → LOCAL COLORS → GRAPHIC SHADOWS → TBATE REFINEMENT → TYPOGRAPHY → SELECTIVE VFX → COMPOSITING. 8K = crisp face, clean hair shapes, precise suit edges, sharp title, readable HUD text. Detail HIGH on face/title, MEDIUM on HUD/portraits, LOW at edges.

ENVIRONMENT
Dark orbital hangar / command deck: hex-panel walls, faint holographic swarm lattice, distant ship silhouettes. Environment reinforces "fleet under one commander". No Japanese/Korean signage; all environmental text is minimal Portuguese HUD labels (e.g. FROTA ONLINE, SYNC: OK).

COLOR
Primary base: deep graphite black-navy. Secondary family: cool slate blue-violet. High-saturation accent: MAGENTA-VIOLET concentrated on swarm-core, eye reflection, suit piping, title glow. Micro-accent: pale cyan on HUD text only.

DETAILS
PRIMARY TITLE: "HIVE" (large angular display type, letter-spaced, magenta-violet inner glow, exact text). SECONDARY TITLE: "A FROTA DE AGENTES" (smaller, wide tracking, cool white). TERTIARY: "MAKO-MORI · AKENO · ARTHUR · SINON · CARDINAL" (smallest, legible, subordinate), positioned as one centered stacked block on the left axis. HUD boxes upper-left/right with short labels: "AGENTES ATIVOS: 5", "SOULS SYNC: OK". EXACT TEXT preserved verbatim.

CONSTRAINTS
HARD BANNER LOCK: promotional cover, not wallpaper/screenshot. HARD TITLE LOCK: art composed around left safe zone, no face/hand/VFX over text. HARD EXACT-TEXT LOCK: reproduce the three text lines exactly, no translation/paraphrase. HARD REDICE LOCK: value structure before glow. HARD ORV LOCK: portraits as narrative forces, no system windows. HARD COLOR LOCK: one accent family only. HARD 2D LOCK: manhwa illustration, no CGI/PBR/photoreal. HARD READABILITY LOCK: title readable at 10% scale.
```

---

## NEGATIVE PROMPT

```
generic wallpaper, scene screenshot, anime screencap, webtoon panel screenshot, title pasted over finished illustration, weak title hierarchy, off-center typography, title touching borders, unreadable typography, distorted characters, gibberish text, excessive typography, five equal focal points, character lineup with equal dominance, background dominating hero, environment detail behind title, VFX covering title, VFX covering face, random particles everywhere, generic magic circles, overdesigned HUD, purple aura everywhere, excessive bloom, rainbow palette, uncontrolled saturation, muddy values, weak silhouette, generic anime-only cel shading, Western movie poster, Hollywood movie poster collage, AAA game key art, photorealism, live action, CGI, 3D, PBR, Unreal Engine, realistic skin pores, flat empty banner, cheap mobile-game ad, watermark, signature, malformed logo, misspelled title
```

## Parâmetros

- **Resolução alvo:** 8K illustrated precision (thumbnail-safe a 10%)
- **Passe 1 (validação, regra #149):** silhueta + título + safe zone — conferir hierarquia antes de add HUD/particles
- **Passe 2:** retratos dos agentes, HUD boxes, partículas hexagonais

## Variações

- **A:** como está (hero direita / título esquerda) — padrão do repo.
- **B:** espelhado (hero esquerda / título direita) — só se o README pedir ritmo alternado com os banners azuis.
- **C:** sem retratos laterais (só MAKO-MORI + core) — versão "limpa" caso os retratos fiquem ruidosos em thumbnail.
