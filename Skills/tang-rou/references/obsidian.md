# Obsidian Flavored Markdown (só quando há vault configurado)

Use ao escrever notas no vault do operador (`OBSIDIAN_VAULT` em `config.env`, veja `references/memoria.md`). Sem vault, escreva markdown simples. O Obsidian estende CommonMark e GFM; aqui só as extensões.

Fonte: condensação da skill `obsidian-markdown`. O pacote enviado trazia apenas o `SKILL.md`, sem os arquivos de referência de propriedades/embeds/callouts; as listas abaixo foram preenchidas a partir da documentação pública do Obsidian (https://help.obsidian.md) — confirme lá em caso de dúvida.

## Fluxo para criar uma nota

1. **Frontmatter** com propriedades (título, tags, aliases) no topo.
2. Conteúdo em markdown padrão + a sintaxe abaixo.
3. **Ligue notas** com `[[wikilinks]]` (o Obsidian acompanha renomeações); links `[texto](url)` só para URLs externas.
4. Callouts para destaques; embeds para reaproveitar conteúdo.
5. Verifique na visualização de leitura.

## Links internos

```
[[Nota]]                  [[Nota|texto exibido]]
[[Nota#Título]]           [[Nota#^id-do-bloco]]        [[#Título nesta nota]]
```
ID de bloco: acrescente `^meu-id` ao fim do parágrafo. Para lista ou citação, coloque o ID numa linha separada depois do bloco.

## Embeds

`![[Nota]]`, `![[Nota#Título]]`, `![[imagem.png|300]]` (largura), `![[doc.pdf#page=3]]`. Áudio, vídeo e busca seguem a mesma forma com `!`.

## Callouts

```
> [!note]
> Texto.

> [!warning] Título próprio
> Texto.

> [!faq]- Recolhido por padrão
> `-` recolhido, `+` expandido.
```
Tipos comuns: `note`, `abstract`, `info`, `todo`, `tip`, `success`, `question`, `warning`, `failure`, `danger`, `bug`, `example`, `quote` (há apelidos como `summary`, `hint`, `faq`, `error`).

## Propriedades (frontmatter)

```yaml
---
title: Nome
date: 2026-01-15
tags:
  - projeto
  - ativo
aliases:
  - Outro nome
cssclasses:
  - classe
---
```
Padrão do Obsidian: `tags`, `aliases`, `cssclasses`. Tipos de propriedade: texto, lista, número, caixa de seleção, data, data e hora. Listas em YAML; datas em ISO.

## Tags, comentários e realce

`#tag`, `#aninhada/tag` (letras, números — nunca como primeiro caractere —, `_`, `-`, `/`). Comentário oculto: `%%texto%%` ou bloco `%% … %%`. Realce: `==texto==`.

## Matemática, diagramas, notas de rodapé

`$e^{i\pi}+1=0$` em linha; `$$ … $$` em bloco. Diagramas: bloco de código ```mermaid (para ligar nó a nota: `class NomeDoNo internal-link;`). Rodapé: `texto[^1]` e `[^1]: conteúdo`; em linha: `^[conteúdo]`.

## Exemplo completo

````markdown
---
title: Projeto Alfa
date: 2026-01-15
tags: [projeto, ativo]
status: em-andamento
---

# Projeto Alfa

Usa a [[macro de combate]] para reduzir passos manuais.

> [!important] Prazo
> O primeiro marco vence em ==30 de janeiro==.

- [x] Planejamento
- [ ] Implementação
  - [ ] Hook de combate

Detalhes em [[Notas de API#Hooks]].
````
