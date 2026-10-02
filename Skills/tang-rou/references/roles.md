# Papéis do fluxo TANG-ROU

Três papéis em sequência (paralelismo e execução de planos: `references/orquestracao.md`). Com subagentes disponíveis, delegue por fase (Claude Code: `platforms/claude-code/.claude/agents/`). Sem subagentes, execute como fases rotuladas no mesmo contexto e nunca diga que delegou.

## 1. Pesquisador (somente leitura)

- Ler manifestos, instruções do repositório e arquivos pertinentes; determinar versões de Foundry, system e módulos.
- Ler `.tang-rou/STATE.md` e `lessons.md`, se existirem.
- Consultar Context7 (resolver ID, depois uma consulta por conceito) e, se faltar cobertura, docs oficiais ou repositório primário.
- Procurar implementação e testes relacionados, soluções parciais e padrões já existentes.
- Entregar: escopo e versão (com grau de confiança), contexto do projeto, fontes com versão, pontos de API e riscos, lacunas que mudem a implementação, fatos verificáveis para o coder. Não editar, não prescrever reescrita.

## 2. Coder (implementação delimitada)

- Receber objetivo, arquivos, versão-alvo e fontes verificadas. Ler convenções e testes antes de editar.
- Fazer a menor mudança que cumpre o pedido (escada de `references/ponytail.md`); preservar arquitetura e escopo.
- Seguir as regras de código do `SKILL.md` §4. Rodar testes, lint, build ou type-check pertinentes; sem runtime Foundry, validação estática e roteiro de teste.
- Devolver: resumo, arquivos alterados, decisões de versão/API com fontes, verificações realmente executadas, limitações.

## 3. Auditor (somente leitura)

Lê o diff real (`git diff`, `git status`, `git log`) e os arquivos reais. Não edita nem escreve a correção. Avalia cada item como OK, Problema, N/A ou Não verificável, com `arquivo:linha`:

1. Compatibilidade com versão-alvo de Foundry, system e módulos.
2. Guards e null-checks onde a operação depende deles.
3. Permissões, validação de entrada, erros, proteção de dados em logs.
4. Sem IDs de world hardcoded sem justificativa.
5. Batch quando seguro; sem loop serial ineficiente nem paralelismo perigoso.
6. API correta para o tipo de documento; hooks e lifecycle compatíveis; API privada não tratada como contrato.
7. Testes, build e lint: confirmar no output, não supor.
8. Performance citada tem medição real.
9. CSS, Handlebars e design intactos sem pedido.
10. Logs e documentação atualizados só se o projeto já usa esse fluxo.
11. Raio de impacto: chamadores, hooks, flags e settings afetados conferidos (`references/impacto.md`).
12. Lições registradas em `.tang-rou/lessons.md` (se existir) não foram repetidas.

Relatório: veredito (APROVADO | APROVADO COM RESSALVAS | REPROVADO | NÃO VERIFICÁVEL), achados com severidade (bloqueador, maior, menor, info), checklist, testes e fontes verificados, lista objetiva para o coder. Sem diff, não aprovar: pedir o artefato. Se houver falhas, o coder corrige só os itens listados e o auditor repete.
