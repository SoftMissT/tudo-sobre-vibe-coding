# GSD: Get Shit Done

[← Tudo Sobre Vibe Coding](../README.md)

> Spec-driven development: nenhuma linha de código sem `SPEC.md` aprovada. Aqui você entende o GSD **de hoje** e começa a usá-lo em 3 comandos.

## O que é

GSD é um sistema de **meta-prompting, context engineering e spec-driven development** que permite que agentes de IA trabalhem autonomamente por longos períodos sem perder a visão geral do projeto. O ciclo é sempre:

**`spec` (o quê/porquê) → `plan` (como) → `execute` → `verify` (prova empírica)**

## O estado atual (out/2026): onde está o GSD

O GSD mudou de casa duas vezes. Este é o mapa:

| Repositório | O que é | Status |
|---|---|---|
| [open-gsd/gsd-pi](https://github.com/open-gsd/gsd-pi) | **Casa atual do GSD 2** (continuação) | ✅ Ativo, commits diários |
| [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) | **GSD Core**: evolução do GSD clássico (v1) | ✅ Casa do GSD legado |
| [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) | GSD v1 (64,5k ⭐) | 📦 Arquivado → gsd-core |
| [gsd-build/gsd-2](https://github.com/gsd-build/gsd-2) | GSD 2 original (7,8k ⭐) | ⚠️ Movido → gsd-pi |

> ⚠️ **Não comece por `gsd-build/gsd-2`**: o README de lá diz "GSD 2 Has Moved". Use `open-gsd/gsd-pi`.

## Como começar (guia rápido)

```bash
# 1. instalar a versão atual
npm install -g gsd-pi@latest

# 2. conferir a versão
gsd --version

# 3. dentro do seu projeto, inicializar o GSD
#    (a partir daí use os comandos /gsd ...)
```

Comandos úteis (padrão `/gsd ...`: rode `/gsd help` no projeto para a lista real):

| Comando | Serve para |
|---|---|
| `/gsd spec` | Escrever/aprovar a especificação (`SPEC.md`) |
| `/gsd plan` | Quebrar a spec em plano (`PLAN.md` / `.plans/`) |
| `/gsd update` | Atualizar um projeto GSD antigo |
| `/gsd forensics` | Diagnóstico quando algo trava |
| `/gsd verdict` | Recuperação de milestone (v3.0.0+) |

## O workflow em 4 fases

1. **Spec**: defina *o quê* e *porquê* antes do *como*. Critérios de aceite objetivos.
2. **Plan**: tarefas marcáveis, ordem, dependências. Se algo der errado: **PARAR e replanejar**.
3. **Execute**: delegue tarefas complexas a subagentes; mantenha o contexto principal limpo.
4. **Verify**: nada vira `[x]` sem prova: teste, log ou diff. "Um engenheiro sênior aprovaria?"

O protocolo completo de orquestração (com o comando "Pare e Pense") está em [`../Claude Code/Claude.md`](../Claude%20Code/Claude.md).

## Referências oficiais

- **Código e releases atuais:** [open-gsd/gsd-pi](https://github.com/open-gsd/gsd-pi)
- **Discord da comunidade:** <https://discord.com/invite/nKXTsAcmbT>
- **Docs do repositório antigo (arquivo de referência):** [gsd-build/gsd-2/docs](https://github.com/gsd-build/gsd-2/tree/main/docs)

## nesta pasta

- [`README.md`](./README.md): este guia (estado atual + como começar)
- O histórico em `GSD_2.md` foi **removido**: era um snapshot de mar/2026 com estatísticas e issues que não existem mais.
