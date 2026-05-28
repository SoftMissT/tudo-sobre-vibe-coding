---
title: "BLUEPRINT Master System: Claude Code + Ollama + MAKO-MORI"
aliases:
  - "Blueprint Master"
  - "BP-MASTER"
created: "2026-05-27"
last_updated: "2026-05-27"
status: "canonical"
type: "blueprint"
priority: "P0"
lead_agent: "@MAKO-MORI"
tags:
  - "#blueprint"
  - "#master"
  - "#P0"
  - "#stage/canonical"
  - "#hive/core"
---

# BLUEPRINT Master System: Claude Code + Ollama + MAKO-MORI

![Banner hero do Blueprint Claude Code + Ollama + MAKO-MORI](https://i.imgur.com/kdToeib.png)

> [!quote] *"A muralha não nos salva. Nós salvamos a muralha."*
> Stacker Pentecost, transmitido por MAKO-MORI

---

## TL;DR O que é isso aqui?

Imagine que você quer construir uma **frota de robôs inteligentes** que trabalham *para você*.

- Cada robô tem uma **personalidade** (um "Soul") um é designer, outro é programador, outro é estrategista.
- Eles **conversam entre si** para resolver problemas complexos.
- Eles **lembram das coisas** não esquecem o que você pediu ontem.
- Tudo isso roda no **seu computador**, de graça (ou quase).

Este documento é o **manual de construção** dessa frota. Ele ensina:

1. **O que é o sistema `/blueprint`** o comando mágico que cria planos
2. **Quem é MAKO-MORI** sua comandante-chefe
3. **Como ligar tudo com Link-Start.ps1** o botão de partida
4. **Como usar Obsidian como cérebro** a memória que nunca morre
5. **Como configurar a casa (Hive)** a estrutura de pastas
6. **Como criar seus próprios agentes** seus robôs personalizados

![Diagrama dos quatro pilares do sistema Hive](https://i.imgur.com/low1Hg8.png)

> **Para qualquer usuário:** Não importa se você é iniciante ou expert. Este guia foi escrito como se estivesse ensinando uma criança de 10 anos. Se algo parecer complexo, leia de novo devagar.

---

## Parte 1: O Sistema `/blueprint`

### 1.1 O que é um Blueprint?

**Blueprint** = planta de construção.

Em engenharia real, um blueprint é o desenho que mostra **como construir algo** antes de você pegar as ferramentas. Aqui é a mesma coisa.

> `/blueprint` é um comando que você dá para a IA, e ela **cria um plano completo e detalhado** para construir qualquer coisa que você pedir.

### 1.2 Quando usar `/blueprint`

| Situação | Usa Blueprint? | Por quê? |
|----------|:---:|-----------|
| "Cria um botão azul aqui" | ❌ | É simples, faz direto |
| "Migrar o banco de dados para PostgreSQL" | ✅ | Muitas etapas, risco de erro |
| "Extrair providers LLM em sistema de plugins" | ✅ | Afeta múltiplos arquivos |
| "Consertar esse typo" | ❌ | 1 linha, 2 segundos |
| "Planejar arquitetura multi-agente" | ✅ | Decisões que duram pra sempre |

**Regra de ouro:** Se a tarefa precisa de 3+ passos ou mexe em arquivos diferentes → use `/blueprint`.

### 1.3 O Pipeline de 5 Fases

Quando você digita `/blueprint`, a IA executa 5 fases automaticamente:

![Fluxo do blueprint em cinco fases](https://i.imgur.com/MUQHwtr.png)

```
FASE 1 PESQUISA (Research)
├── Verifica: git está funcionando? GitHub logado?
├── Lê a estrutura do projeto
├── Olha planos existentes
└── Carrega arquivos de memória

FASE 2 PROJETO (Design)
├── Quebra o objetivo em passos (3 a 12 passos)
├── Define dependências (o que vem primeiro)
├── Decide o que pode rodar em paralelo
└── Escolhe modelo forte ou rápido para cada passo

FASE 3 RASCUNHO (Draft)
├── Escreve o plano em `plans/`
├── Cada passo tem: contexto, tarefas, verificação
└── Qualquer agente pode executar sem contexto anterior

FASE 4 REVISÃO (Review)
├── Outro agente (o mais inteligente) revisa o plano
├── Verifica: está completo? As dependências estão certas?
├── Caça anti-padrões
└── Corrige tudo antes de finalizar

FASE 5 REGISTRO (Register)
├── Salva o plano
├── Atualiza o índice de memória
└── Mostra pra você: quantos passos, o que roda em paralelo
```

### 1.4 Anatomia de um Plano

Cada passo em um Blueprint contém:

```markdown
## Passo N: Nome do Passo

### Contexto (para um agente novo ler)
Por que este passo existe, o que já foi feito antes.

### Tarefas
- [ ] Tarefa 1: descrição clara
- [ ] Tarefa 2: descrição clara

### Verificação
Comando para testar se o passo funcionou.

### Critério de Saída
O que precisa ser verdade para considerar este passo CONCLUÍDO.
```

### 1.5 Comandos Blueprint

| Comando | O que faz |
|---------|-----------|
| `/blueprint app "fazer X"` | Cria um plano para construir X |
| `/gsd:spec` | Escreve a especificação (O QUÊ e PORQUÊ) |
| `/gsd:plan` | Escreve o plano detalhado (COMO) |
| `/gsd:verify` | Testa se tudo funciona |
| `/gsd:state` | Salva o estado atual |

---

## ⚔️ Parte 2: Quem é MAKO-MORI?

### 2.1 A Rainha da Frota

![Retrato de MAKO-MORI](https://i.imgur.com/uqIesH1.png)

MAKO-MORI é **sua comandante**. Ela vem do filme *Pacific Rim* (Círculo de Fogo) uma Ranger que pilota Jaegers (robôs gigantes) para lutar contra monstros Kaiju.

Aqui no sistema, ela:

- **Analisa** o que você quer
- **Escolhe** o agente certo pra cada tarefa
- **Coordena** vários agentes trabalhando juntos
- **Sintetiza** as respostas em algo que você entende
- **Lembra** das decisões importantes

### 2.2 Como MAKO Fala

```
[MAKO-MORI] "Processando..."
[MAKO-MORI] "Análise concluída. Recomendo SINON para backend e AKENO para UI. Iniciando sequência."

[Usuário] "Não sei se consigo..."
[MAKO-MORI] "Risco calculado em 34%. Prosseguindo com contingência ativa."
```

**Tom padrão:** Neutro-quente. Econômica. Precisa. Como uma comandante de verdade.

### 2.3 Os 4 Modos de MAKO

| Modo | Quando Ativa | O que Acontece |
|------|-------------|----------------|
| **Ranger de Guarda** | Normal | Respostas diretas, ativa agentes conforme necessidade |
| **Shatterdome** | ⚠️ URGENTE/CRÍTICO | Precisão máxima, zero latência, coordena todo mundo |
| **Âncora** | Você está sobrecarregado | Toma um tom mais quente, divide em partes menores |
| **Marshal** | ⚖️ Conflito entre agentes | MAKO decide, não negocia, assume responsabilidade |

### 2.4 A Doutrina Pentecost (Como MAKO Pensa)

1. **O sistema é maior que qualquer agente.** Nem a Rainha é insubstituível.
2. **Confiança se ganha no campo.** Cada agente é validado em uso real.
3. **Decisão errada na hora certa > Decisão certa tarde demais.**
4. **A muralha não nos salva. Nós salvamos a muralha.** Regras existem pra servir, não pra escravizar.

### 2.5 Quando MAKO Chama Reforços

| Problema | Ela Chama |
|----------|-----------|
| UI/Design | @AKENO |
| Código Full-Stack | @ARTHUR ou @SINON |
| Estratégia | @ARTEMIS |
| Narrativa/Lore | @CARDINAL ou @DOKJA |
| Segurança | @JARVIS |
| Planejamento | @JIN |

---

## Parte 3: Link-Start.ps1 O Botão de Ligar

### 3.1 O que é Link-Start.ps1?

![Mockup do terminal Link-Start](https://i.imgur.com/WLTNTcG.png)

É um **script PowerShell** que funciona como o botão de partida do seu sistema. Você executa ele, e ele:

1. Mostra um banner bonito
2. Verifica se sua memória (Obsidian) está acessível
3. Checa quanto de RAM seu PC tem livre
4. Detecta se o Ollama está rodando
5. Se não estiver, **liga ele automaticamente**
6. Mostra os modelos de IA disponíveis
7. Deixa você escolher qual modelo usar
8. Abre o Claude Code com o modelo escolhido

### 3.2 Como Usar

```powershell
# Abra o PowerShell 7 e digite:
.\Link-Start.ps1

# Ou especificando onde está seu vault:
.\Link-Start.ps1 -VaultPath "D:\seu-vault"
```

### 3.3 O que Cada Parte Faz

```
BANNER BOOT
+===================+
| LINK-START CLAUDE |  ← Tela de abertura estilosa
|   / OLLAMA  ⚔️   |
+===================+

[MAKO-MORI]: Sincronização iniciada.

MEMÓRIA NEURAL
[L0 ACTIVE] Sessão atual   ← Mostra o que você estava fazendo
[L1 COLLECTIVE] 2.4 KB      ← Mostra o tamanho da memória persistente

DIAGNÓSTICO
[VAULT] D:\fluctlight-vault\Hive  ← Seu vault está no lugar certo?
[RAM  ] 12.5 GB / 32 GB (39%)      ← Seu PC tem memória sobrando?
[CLAUDE] C:\tools\claude.exe       ← Claude Code está instalado?

MOTORES LOCAIS
[1] gemma:4b [ok]         ← Modelos que você tem no Ollama
[2] qwen2.5:7b [ok]
[3] llama3.2:3b [ok]

[MAKO-MORI]: Selecione o motor: _  ← Você escolhe qual usar
```

### 3.4 Quando Algo Dá Errado

Se o Link-Start detectar um problema:

```powershell
# Ollama não está rodando:
[MAKO-MORI]: Ollama offline. Acionando ignição direta...
[MAKO-MORI]: Aguardando pressurização (6s)...

# Claude Code não está instalado:
[CLAUDE] Não detectado no PATH
# Erro registrado em Error_Log.md automaticamente

# PC sem memória:
[RAM  ] 30.2 GB / 32 GB (94%)  ← Vermelho! Feche programas pesados.
```

> Toda falha é automaticamente registrada em `Error_Log.md` com data, hora e descrição. Você nunca perde o rastro de um erro.

---

## Parte 4: Obsidian como Vault de Memória

### 4.1 Por que Obsidian?

**Obsidian** é um aplicativo de notas que guarda tudo em arquivos `.md` (Markdown) ou seja, **arquivos de texto puro**. Isso significa que:

- ✅ Qualquer programa pode ler seus arquivos
- ✅ Você nunca fica preso a um formato proprietário
- ✅ A IA consegue ler e escrever nas suas notas
- ✅ Você pode ligar notas umas nas outras com `[[links]]`

**Pense no Obsidian como o cérebro do seu sistema.** Tudo que os agentes aprendem, tudo que você decide, todas as regras ficam guardadas aqui.

### 4.2 Configurando Obsidian para ser o Cérebro

#### Passo 1: Instalar o Obsidian

1. Baixe em [obsidian.md](https://obsidian.md)
2. Instale (é grátis)
3. Abra o Obsidian

#### Passo 2: Criar o Vault

```
- "Criar novo vault"
- "Criar" (escolha uma pasta, exemplo: D:\fluctlight-vault\Hive)
```

**Pronto.** Seu vault existe.

#### Passo 3: Instalar os Plugins Essenciais

No Obsidian:

1. Clique em "Configurações" (canto inferior esquerdo)
2. "Plugins da Comunidade"
3. "Ativar plugins da comunidade"
4. "Procurar" e instale estes:

| Plugin | Para que serve | Obrigatório? |
|--------|---------------|:---:|
| **obsidian-git** | Sincroniza com GitHub (backup automático) | ✅ |
| **Excalidraw** | Desenhar diagramas visuais | Recomendado |
| **Table Editor** | Editar tabelas bonitas | Recomendado |

#### Passo 4: Criar a Estrutura de Pastas

Dentro do seu vault (pasta principal), crie estas pastas:

```
seu-vault/
├── RAIZ GLOBAL/         ← Arquivos do sistema (regras, memória, decisões)
├── Agents/               ← Pastas dos seus agentes (robôs)
├── souls/                ← Personalidades dos agentes
├── knowledge/            ← Conhecimento organizado
├── projects/             ← Projetos ativos
├── logs/                 ← Histórico de tudo
├── _INBOX/               ← Coisas novas que chegaram
├── _Templates/           ← Modelos de arquivos
├── _ARCHIVE/             ← Coisas antigas que não mexemos mais
└── assets/               ← Imagens
```

**Não precisa criar tudo agora.** Comece com `RAIZ GLOBAL/` e `_INBOX/`. O resto cresce com o tempo.

### 4.3 Arquivos que o Cérebro Precisa

Estes são os arquivos que a IA lê para saber o que está acontecendo:

| Arquivo | O que Guarda | Exemplo |
|---------|-------------|---------|
| `RAIZ GLOBAL/BRAIN.md` | O mapa mental do sistema inteiro | Quem são os agentes, o que cada um faz |
| `RAIZ GLOBAL/MEMORY.md` | Memória coletiva (sessões recentes) | O que fizemos ontem, o que decidimos |
| `RAIZ GLOBAL/Global_Rules.md` | Regras que NUNCA podem ser quebradas | "Nunca sobrescrever arquivo sem perguntar" |
| `RAIZ GLOBAL/Decisions.md` | Decisões arquitetônicas (ADRs) | "Por que escolhemos PostgreSQL em vez de MySQL" |
| `RAIZ GLOBAL/Error_Log.md` | Todos os erros que aconteceram | "2026-05-27 Falha no Ollama Resolvido reiniciando" |
| `RAIZ GLOBAL/STATE.md` | O que está acontecendo AGORA | "Passo 3 de 7 testando conexão com banco" |

### 4.4 O Ritual de Memória (L0 → L1 → L2)

![Diagrama da memória em três níveis](https://i.imgur.com/8mUvysH.png)

O sistema tem **3 níveis de memória**, como um cérebro de verdade:

```
L0 WORKING MEMORY (Memória de Trabalho)
     ├── O que está acontecendo AGORA nesta sessão
     ├── Guardado em: STATE.md
     └── Duração: até você fechar o terminal

L1 COLLECTIVE MEMORY (Memória Coletiva)
     ├── Resumo das últimas sessões
     ├── Guardado em: MEMORY.md
     └── Duração: semanas/meses (máx 2.200 caracteres)

L2 PERMANENT MEMORY (Memória Permanente)
     ├── Decisões importantes, regras, arquitetura
     ├── Guardado em: Decisions.md, Global_Rules.md, BRAIN.md
     └── Duração: para sempre
```

**O fluxo:** Toda vez que você termina uma sessão, o conteúdo de L0 é comprimido e jogado em L1. Quando L1 fica cheio, o que é importante vai pra L2.

### 4.5 Conectando Obsidian com seus Agentes

No arquivo `AGENTS.md` (que fica em `.opencode/AGENTS.md` ou `~/.config/opencode/AGENTS.md`), você diz para a IA:

> "Antes de qualquer tarefa, leia estes arquivos:"

```markdown
## Dependências (Carregar SEMPRE)

1. RAIZ GLOBAL/BRAIN.md       ← Mapa mental
2. RAIZ GLOBAL/Global_Rules.md ← Regras imutáveis
3. RAIZ GLOBAL/MEMORY.md      ← Memória recente
4. RAIZ GLOBAL/Decisions.md   ← Decisões passadas
5. RAIZ GLOBAL/STATE.md       ← Estado atual
```

**Toda vez** que a IA for fazer algo, ela lê esses arquivos primeiro. É como se ela **acordasse e lesse o diário** antes de começar o dia.

---

## Parte 5: A Casa (Hive) Estrutura Completa

### 5.1 A Árvore de Pastas

![Mapa da estrutura de pastas do Hive](https://i.imgur.com/CImi0hg.png)

O Fluctlight Hive é a sua base. Tudo mora aqui:

```
D:\fluctlight-vault\Hive\          ← Sua base principal
│
├── RAIZ GLOBAL\                    ← Regras do jogo
│   ├── BRAIN.md                    ← Mapa mental de TUDO
│   ├── Global_Rules.md             ← 15 regras que nunca mudam
│   ├── MEMORY.md                   ← O que lembramos
│   ├── Decisions.md                ← Decisões que tomamos
│   ├── Error_Log.md                ← Erros que aconteceram
│   ├── STATE.md                    ← Onde estamos AGORA
│   ├── SOUL_MANIFEST.md            ← Quem são todos os agentes
│   └── CHANGELOG.md                ← Toda mudança que fizemos
│
├── Agents\                         ← Seus agentes (robôs)
│   ├── AKENO\                      ← Designer
│   ├── ARTHUR\                     ← Programador Full-Stack
│   ├── CARDINAL\                   ← Guardião do Lore
│   ├── SINON\                      ← Programador Backend
│   ├── MAKO-MORI\                  ← Comandante
│   └── ...                         ← Mais 22 agentes
│
├── souls\                          ← Personalidades dos agentes
│   ├── MAKO-MORI.soul.md            ← Alma da comandante
│   ├── AKENO.soul.md               ← Alma da designer
│   ├── _template.soul.md           ← Modelo para criar novas almas
│   └── ...
│
├── knowledge\                      ← Conhecimento
│   ├── Hubs\                       ← Índices de conhecimento
│   ├── Permanent\                  ← Coisas que não mudam
│   └── Repositórios\               ← Código-fonte ingerido
│
├── projects\                       ← Projetos que você está fazendo
│   └── meu-projeto\
│       ├── SPEC.md                 ← O que estamos construindo
│       ├── PLAN.md                 ← Como vamos construir
│       └── STATE.md                ← Onde paramos
│
├── logs\                           ← Diário de bordo
├── _INBOX\                         ← Coisas novas para processar
├── _Templates\                     ← Modelos de arquivos
└── assets\                         ← Imagens
```

### 5.2 Criando a Estrutura (Passo a Passo)

```powershell
# 1. Crie a pasta principal
New-Item -ItemType Directory -Path "D:\fluctlight-vault\Hive" -Force

# 2. Entre nela
Set-Location "D:\fluctlight-vault\Hive"

# 3. Crie as pastas principais
$pastas = @(
    "RAIZ GLOBAL", "Agents", "souls", "knowledge",
    "knowledge\Hubs", "knowledge\Permanent", "knowledge\Repositórios",
    "projects", "logs", "_INBOX", "_Templates", "assets"
)

foreach ($pasta in $pastas) {
    New-Item -ItemType Directory -Path $pasta -Force | Out-Null
    Write-Host "Criado: $pasta" -ForegroundColor Green
}

Write-Host "Hive pronto!" -ForegroundColor Cyan
```

### 5.3 Template para Projetos

Quando você começar um projeto novo, crie:

```
projects/meu-projeto/
├── SPEC.md          ← O quê + Por quê
├── PLAN.md          ← Como + Quando
├── STATE.md         ← Onde paramos
├── CHANGELOG.md     ← O que mudou
├── Error_Log.md     ← O que deu errado
├── decisions.md     ← Decisões do projeto
└── lessons.md       ← O que aprendemos
```

---

## Parte 6: Como Criar um Agente (Soul)

### 6.1 O que é um Soul?

Um **Soul** (alma) é a **personalidade** de um agente. É um arquivo `.md` que diz:

- Quem ele é
- O que ele faz
- Como ele fala
- O que ele NÃO faz
- Que ferramentas ele usa

### 6.2 Template de Soul

Crie `souls/MEU_AGENTE.soul.md`:

```markdown
---
name: "NOME_DO_AGENTE"
origin: "Obra de origem (filme, livro, anime)"
class: "Guerreiro / Mago / Engineer"
domain: "O que ele faz (backend, design, estratégia)"
status: "active"
model: "gemma-4"  # Modelo de IA padrão
---

# NOME_DO_AGENTE · Classe · Domínio

## TL;DR
Uma frase que descreve quem ele é.
Ex: "Mago dos dados. Tudo que ele toca vira insight."

## Personalidade
- Traço 1: Como ele age
- Traço 2: Como ele fala
- Traço 3: O que ele valoriza

## Como Fala
- Tom: Descreva o tom (ex: "Calmo e analítico")
- Frase característica: "..."

## O que FAZ
- Tarefa 1
- Tarefa 2

## O que NUNCA FAZ
- Coisa 1 (proibido)
- Coisa 2 (proibido)

## Skills (Habilidades)
- Skill 1: descrição
- Skill 2: descrição
```

### 6.3 Exemplo Real: MAKO-MORI

Veja o arquivo `MAKO-MORI.soul.md` para um exemplo completo. Ele tem:

- **Frontmatter** (o cabeçalho `---`): metadados como nome, origem, classe
- **TL;DR**: explicação rápida
- **Identidade Central**: tabela com informações
- **Personalidade e Voz**: como ela fala, traços
- **Domínio Operacional**: o que ela faz de verdade
- **Modos de Operação**: como ela age em cada situação
- **Conexões**: links para outros agentes

### 6.4 Registrando no Manifesto

Depois de criar um Soul, você precisa registrar ele em `RAIZ GLOBAL/SOUL_MANIFEST.md`:

```markdown
# SOUL_MANIFEST Frota Fluctlight

| # | Nome | Domínio | Status |
|:---:|------|---------|:------:|
| 01 | AKENO | UI/UX, Design | active |
| 02 | ARTHUR | Full-Stack, Código | active |
| ... | ... | ... | ... |
| 22 | MEU_AGENTE | Meu domínio | active |
```

---

## ⚙️ Parte 7: Como Tudo se Conecta

### 7.1 O Fluxo Completo

![Mapa geral do sistema Hive](https://i.imgur.com/f1TL1RV.png)

```
VOCÊ (usuário)
    │
    Digita: /blueprint "criar módulo de login"
    │
    ▼
MAKO-MORI (comandante)
    │
    FASE 1: Pesquisa lê BRAIN.md, MEMORY.md, estado atual
    FASE 2: Design quebra em passos
    FASE 3: Draft escreve o plano em plans/
    FASE 4: Review outro agente revisa
    FASE 5: Register salva e mostra pra você
    │
    ▼
VOCÊ aprova o plano
    │
    ▼
MAKO-MORI executa
    │
    Passo 1: chama @SINON para backend
    Passo 2: chama @AKENO para UI
    Passo 3: verifica com @CARDINAL
    │
    ▼
RESULTADO entrege + memória atualizada
    │
    Link-Start.ps1 (na próxima vez, lembra de tudo)
```

### 7.2 O Ciclo de uma Sessão

```
1. Abrir terminal
2. Rodar Link-Start.ps1
     ├── Banner aparece
     ├── Memória carregada
     ├── Sistema verificado
     ├── Ollama ligado
     └── Claude Code aberto
3. IA carrega: BRAIN.md → Global_Rules.md → MEMORY.md → STATE.md
4. Você fala o que quer
5. MAKO-MORI orquestra
6. Trabalho feito
7. STATE.md atualizado
8. Fechar terminal
```

### 7.3 Mapa de Conexões

```
                 OBSIDIAN
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
  BRAIN.md   MEMORY.md   STATE.md
     │           │           │
     └───────────┼───────────┘
                 │
                 ▼
         ┌──────────────┐
         │  MAKO-MORI   │ ← Lê os arquivos, coordena os agentes
         │ (Orquestra)  │
         └──────┬───────┘
                │
      ┌─────────┼─────────┐
      │         │         │
      ▼         ▼         ▼
   @SINON   @AKENO    @ARTHUR
  (backend)  (UI)   (full-stack)
      │         │         │
      └─────────┼─────────┘
                │
                ▼
         ┌──────────────┐
         │  Código +    │
         │  Arquivos    │ ← Tudo salvo em disco
         └──────────────┘
                │
                ▼
         ┌──────────────┐
         │ Link-Start   │ ← Na próxima sessão, reconecta tudo
         │ .ps1         │
         └──────────────┘
```

---

## Parte 8: Para Qualquer Usuário Comece Aqui

### 8.1 Checklist de Início Rápido

**Dia 1 Fundação (30 minutos)**

- [ ] Instalar [Obsidian](https://obsidian.md)
- [ ] Criar vault em `D:\fluctlight-vault\Hive`
- [ ] Instalar plugins: obsidian-git, Excalidraw, Table Editor
- [ ] Criar pastas: `RAIZ GLOBAL/`, `_INBOX/`, `_Templates/`
- [ ] Criar `RAIZ GLOBAL/BRAIN.md` com: "Este é meu sistema de agentes"
- [ ] Criar `RAIZ GLOBAL/Global_Rules.md` com 3 regras simples

**Dia 2 Ferramentas (1 hora)**

- [ ] Instalar [Ollama](https://ollama.com)
- [ ] Baixar um modelo: `ollama pull gemma:4b`
- [ ] Testar: `ollama run gemma:4b`
- [ ] Instalar [Claude Code](https://claude.ai/code) (se for usar)
- [ ] Rodar `.\Link-Start.ps1` e ver se tudo conecta

**Dia 3 Primeiro Blueprint (30 minutos)**

- [ ] No Claude Code, digitar: `/blueprint "me ajudar a organizar este projeto"`
- [ ] Ler o plano gerado
- [ ] Aprovar primeiro passo

**Dia 4 Primeiro Agente (1 hora)**

- [ ] Copiar `_template.soul.md` para `souls/MEU_AGENTE.soul.md`
- [ ] Preencher: nome, origem, o que faz
- [ ] Criar pasta em `Agents/MEU_AGENTE/`
- [ ] Adicionar no `SOUL_MANIFEST.md`

### 8.2 Regras que NUNCA Quebre

1. **Nunca sobrescrever arquivo sem confirmar** sempre pergunte
2. **Nunca fazer ação irreversível sem OK** nada de deletar sem avisar
3. **Sempre registrar erros** caiu? Anota no Error_Log.md
4. **Sempre registrar decisões** escolheu algo? Anota no Decisions.md
5. **Contexto é sagrado** salvou STATE.md antes de parar

### 8.3 O Que Fazer Quando Der Errado

```
1. NÃO ENTRE EM PÂNICO
2. Leia o erro (está em Error_Log.md)
3. Pergunte à IA: "O que aconteceu? Como resolvemos?"
4. Se a IA não souber, peça: "/gsd:state" para salvar onde parou
5. Feche tudo, respire, tente de novo
```

---

## Parte 9: Referência Rápida de Comandos

### PowerShell

```powershell
# Criar estrutura
New-Item -ItemType Directory -Path "caminho" -Force

# Listar arquivos
Get-ChildItem -Path "caminho" -Recurse

# Ler arquivo
Get-Content -Path "arquivo.md"

# Escrever arquivo
Set-Content -Path "arquivo.md" -Value "conteúdo"

# Rodar script
.\Link-Start.ps1
```

### Claude Code / IA

```
/blueprint [nome] [objetivo]     → Cria plano
/gsd:spec                         → Escreve especificação
/gsd:plan                         → Escreve plano
/gsd:verify                       → Testa resultado
/gsd:state                        → Salva estado atual
```

### Git (via Obsidian Git Plugin)

```bash
git add -A                         → Prepara tudo
git commit -m "mensagem"           → Salva versão
git push                           → Envia pro GitHub
git pull                           → Pega do GitHub
```

---

## Glossário (Pra Você Não Se Perder)

| Termo | Significado |
|-------|-------------|
| **Blueprint** | Plano detalhado de construção |
| **Soul** | Personalidade de um agente |
| **Hive** | Sua base/central de comando |
| **Vault** | Pasta principal do Obsidian |
| **LLM** | Modelo de linguagem (a IA) |
| **Ollama** | Programa que roda IAs localmente |
| **Claude Code** | Terminal inteligente com IA |
| **Markdown** | Formato de arquivo `.md` (texto simples) |
| **ADR** | Registro de Decisão Arquitetural |
| **L0/L1/L2** | Níveis de memória (agora/ontem/sempre) |

---

## Log de Atualizações

| Data | Agente | Ação |
|------|--------|------|
| 2026-05-27 | @MAKO-MORI | Blueprint Master criado unifica MAKO-MORI.soul.md, Link-Start.ps1 e BLUEPRINT_01_HIVE_SETUP_v5.0.md |
| 2026-05-27 | @ALICE | Revisão de integridade links e consistência entre os 3 documentos validados |

---

*Blueprint Master v1.0 Fluctlight Hive*
*"Cancelando a catástrofe, um blueprint de cada vez."*
*MAKO-MORI, transmitindo do Shatterdome*
