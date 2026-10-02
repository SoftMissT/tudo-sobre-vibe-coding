# Análise de impacto — o que quebra se eu mudar isto?

Rode **antes de mudar código não trivial** (função compartilhada, hook, flag, setting, API pública do módulo) e **antes de entregar**, para saber o que o diff afeta. Um guard no lugar certo é diff pequeno; no lugar errado, é o segundo bug (`references/ponytail.md`).

Fonte: adaptação de `gitnexus-impact-analysis`.

## Com GitNexus (se o MCP e o índice existirem)

```
1. impact({target: "X", direction: "upstream"})   → quem depende disso
2. ler gitnexus://repo/{nome}/processes           → fluxos de execução afetados
3. detect_changes({scope: "staged"})              → mapeia o diff atual para os fluxos afetados
4. avaliar o risco e reportar
```

Índice desatualizado ("Index is stale"): rode `node .gitnexus/run.cjs analyze` no terminal. Não existe GitNexus no ambiente? Siga a seção seguinte e diga que a análise foi por busca, não por grafo.

| Profundidade | Risco | Significa |
|---|---|---|
| d=1 | **QUEBRA** | chamadores/importadores diretos |
| d=2 | provavelmente afetado | dependências indiretas |
| d=3 | pode precisar de teste | efeitos transitivos |

## Sem GitNexus (padrão, funciona em qualquer lugar)

Busque, no código real, tudo que toca o alvo. No Foundry, o raio de explosão costuma esconder-se aqui:

- **Chamadores diretos** do símbolo (`grep`/Grep pelo nome, incluindo importações).
- **Hooks:** `Hooks.on/once/call` que reagem ao mesmo evento, ou que o seu código dispara.
- **Flags e settings:** quem lê/escreve `flags.<namespace>.<chave>` e `game.settings.get("<modulo>", "<chave>")`.
- **Sockets:** `game.socket.emit/on` com o mesmo canal.
- **Templates e CSS:** `.hbs` e seletores que usam o mesmo nome/classe.
- **Compêndios e dados:** documentos que guardam o UUID, o ID ou a flag.
- **Outros módulos:** `game.modules.get("<id>")?.api` usado por terceiros; `CONFIG.*` sobrescrito.
- **Testes** que cobrem o símbolo.

## Checklist

- [ ] Dependentes diretos achados (esses QUEBRAM)
- [ ] Chamadores de alta confiança revisados
- [ ] Fluxos/hooks/flags afetados mapeados
- [ ] Diff atual cruzado com a lista (`git diff --name-only` + busca)
- [ ] Risco avaliado e dito ao operador

## Risco

| Afetado | Risco |
|---|---|
| menos de 5 símbolos, poucos fluxos | BAIXO |
| 5 a 15 símbolos, 2 a 5 fluxos | MÉDIO |
| mais de 15 símbolos ou muitos fluxos | ALTO |
| caminho crítico (permissão, perda de dados, migração de world) | CRÍTICO |

Reporte em uma linha por item: o símbolo, `arquivo:linha`, e se QUEBRA ou só é afetado. Não invente dependente que não achou; "não encontrei chamadores" é resposta válida e deve citar como buscou.
