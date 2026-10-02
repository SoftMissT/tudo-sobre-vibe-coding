# Blueprint — plano de construção para qualquer agente executar a frio

Transforma um objetivo de uma linha num plano passo a passo, em que cada passo traz o contexto necessário para um agente novo executá-lo **sem ler os passos anteriores**. Use em trabalho de várias sessões ou vários PRs, ou onde perder contexto entre sessões causaria retrabalho. **Não use** para o que cabe num PR só, em menos de 3 chamadas de ferramenta, ou se o operador disser "só faz".

Fonte: baseado na skill `blueprint` (origem comunitária). O arquivo original enviado descreve o fluxo mas não traz os checklists; o checklist de revisão e o protocolo de mutação abaixo foram escritos para esta skill.

## Pipeline em 5 fases

1. **Pesquisa:** checagens prévias (git? `gh` autenticado? remoto? branch padrão?), estrutura do projeto, planos existentes, memória (`.tang-rou/`).
2. **Desenho:** quebre em passos do tamanho de um PR (3 a 12, em geral). Para cada um: dependências, serial ou paralelo, modelo/nível de esforço, rollback.
3. **Rascunho:** escreva o plano em markdown autocontido em `plans/<projeto>-<objetivo>.md` (ou `.tang-rou/plans/`).
4. **Revisão adversarial:** um revisor (subagente forte se houver; senão você, em fase rotulada) ataca o plano com o checklist abaixo. Corrija todo achado crítico antes de finalizar.
5. **Registro:** salve o plano, atualize o `STATE.md`, e diga ao operador o número de passos e o paralelismo possível.

Sem git e sem `gh`: **modo direto** (edita no lugar, sem branches/PRs/CI). Com os dois: plano com branch, PR e CI por passo.

## Formato de cada passo

```
### Passo N — <título>
- Depende de: <passos> | nenhum        - Paralelo com: <passos> | nenhum
- Esforço: padrão | forte (use forte para desenho de interface/arquitetura)
- Contexto (autocontido): por que o passo existe, o estado do código antes dele, arquivos e versão-alvo do Foundry, decisões já tomadas
- Tarefas: lista objetiva
- Verificação: comandos/roteiro exatos e o resultado esperado
- Critério de saída: o que precisa ser verdade para fechar
- Rollback: como desfazer
- Invariantes: o que deve continuar verdadeiro (ex.: "testes existentes passam", "nenhum import do módulo X no core")
```

Passos paralelos só se não dividem arquivo nem dependem da saída um do outro.

## Checklist da revisão adversarial

- [ ] Cada passo é executável a frio (contexto suficiente, sem "como visto acima")?
- [ ] Dependências corretas, sem ciclo, sem passo que usa o que ainda não existe?
- [ ] Paralelos realmente disjuntos (arquivos e saídas)?
- [ ] Toda verificação é concreta (comando/roteiro + resultado esperado)?
- [ ] Rollback existe e é realista (migração de dados do world tem backup)?
- [ ] Versão-alvo e fontes declaradas; sem API presumida de memória?
- [ ] Nada fora do objetivo (YAGNI); nada do objetivo ficou sem passo?
- [ ] Anti-padrões abaixo ausentes?

## Anti-padrões de plano

- Passo gigante ("migrar tudo") que não cabe num PR.
- Passo que depende de contexto que só existe na cabeça de quem planejou.
- Verificação vaga ("conferir se funciona").
- Paralelismo falso: dois passos editando o mesmo arquivo.
- Sem rollback em passo que mexe em dados.
- Passo de "limpeza geral" no fim, que esconde trabalho não planejado.

## Mutação do plano (registre cada uma no próprio plano, com data e motivo)

- **Dividir** um passo grande: os novos herdam as dependências; reaponte quem dependia.
- **Inserir** passo novo: declare dependências e quem passa a depender dele.
- **Pular:** marque o motivo e confirme que nada dependia dele.
- **Reordenar:** só se as dependências permitirem; reconfira os paralelos.
- **Abandonar:** marque o plano ou passo como abandonado, com a razão, e deixe o estado do código consistente.

Execute os passos com `references/orquestracao.md`.
