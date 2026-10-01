---
title: "TANG-ROU — Memória isolada por projeto"
created: 2026-08-26
status: active
maturity: permanent
type: sistema
tags: [hive/memory, tang-rou, projeto]
agents_allowed: ["TANG-ROU", "MAKO-MORI"]
---

# Memória da TANG-ROU por projeto

## Resolver o projeto ativo

Determinar o projeto nesta ordem:

1. projeto ou caminho nomeado explicitamente pelo operador;
2. repositório ou diretório de trabalho ativo;
3. `system/STATE.md`;
4. `Memory/shared/STATUS.md`.

Se as fontes discordarem e a escolha mudar o contexto, perguntar ao operador. Normalizar o nome para slug em minúsculas, sem acentos e separado por hífens. Preservar aliases já registrados no índice global.

## Ler memória

1. Ler `Memory/wings/tang-rou/diary.md`, que contém somente o índice global.
2. Ler `Memory/wings/tang-rou/projects/<slug>/STATE.md`.
3. Ler as entradas recentes de `Memory/wings/tang-rou/projects/<slug>/diary.md`; ampliar para o histórico completo somente quando necessário.
4. Ler `PATTERNS.md` e `PERF_LOG.md` globais por tema, sem importar decisões de outro projeto como se fossem locais.

Nunca carregar o diário de outro projeto por padrão.

## Criar memória de projeto

Se o projeto ainda não estiver registrado, criar:

```text
Memory/wings/tang-rou/projects/<slug>/
├── STATE.md
└── diary.md
```

Adicionar o projeto ao índice global `Memory/wings/tang-rou/diary.md`. Usar pelo menos dois wikilinks em cada nota e preservar frontmatter YAML.

## Escrever e encerrar

- Acrescentar a sessão somente ao `diary.md` do projeto ativo.
- Atualizar somente o `STATE.md` do projeto ativo.
- Atualizar o `STATE.md` global com `active_project`, caminho da memória e próximo passo resumido.
- Não duplicar a entrada completa no diário global.
- Para tarefa genuinamente transversal, usar o slug `_cross-project` e listar todos os projetos afetados.

## Integridade

- Não mover uma entrada histórica sem evidência textual do projeto.
- Encaminhar entradas ambíguas para `_unclassified`.
- Preservar o arquivo legado em `Memory/archive/` durante migrações.
- Validar contagem e hash antes/depois de qualquer migração.

## Conexões

- [[Memory/wings/tang-rou/diary|Índice global TANG-ROU]]
- [[souls/TANG-ROU.soul|Soul TANG-ROU]]
- [[system/HIVE|Protocolo da Hive]]
