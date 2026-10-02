---
type: state
status: active
created: {{date}}
updated: {{date}}
feature: "{{title}}"
fase_atual: constitution
ultimo_gate_aprovado: nenhum
proximo_passo: "Criar Constitution-{{title}} e submeter ao gate"
bloqueios: []
tags: [sdd, state, memory]
spo:
  - ["STATE-{{title}}", "belongs-to", "L1"]
  - ["STATE-{{title}}", "tracks", "{{title}}"]
---

# STATE: {{title}}

> [!abstract] Memória da feature — escrita para o futuro-Claude
> Este arquivo é a fonte de retomada. Formato AI-first: denso, verbatim, com recência. Ao retomar a feature, leia SOMENTE este arquivo + [[Constitution-{{title}}]] + o documento da fase ativa. **Nada mais.**

## Painel (atualizar a cada gate)

| Campo | Valor |
| :--- | :--- |
| **Fase atual** | constitution |
| **Último gate aprovado** | — |
| **Próximo passo exato** | Criar a Constitution e submeter ao gate |
| **Bloqueios ativos** | nenhum |
| **Última sessão** | {{date}} |

## Gates Cruzados
Registro append-only. Nunca reescrever histórico.

| Data | Fase aprovada | Decisões do gate |
| :--- | :--- | :--- |
| — | — | — |

## Decisões Relevantes
Uma linha por decisão, com justificativa. Decisões grandes viram ADR no artefato da fase; aqui fica o ponteiro.

- [{{date}}] [Decisão] — [justificativa em 1 linha] → ver [[<artefato>#<seção>]]

## Bloqueios
- [ ] [Bloqueio] — descoberto em [data] — desbloqueio depende de: [condição]

## Lições (loop de autoaperfeiçoamento)
> [!tip] Após QUALQUER correção do usuário, registre a lição aqui. Revise esta seção ao retomar a feature. Não repita o erro.

- [{{date}}] [Lição aprendida]

## Log de Sessões
| Data | O que avançou | Próximo passo deixado |
| :--- | :--- | :--- |
| {{date}} | Bootstrap da feature | Criar Constitution |

---
**Documentos Relacionados**:
- [[Constitution-{{title}}]]
- [[Requirements-{{title}}]]
- [[PDR-{{title}}]]
- [[Research-{{title}}]]
- [[Blueprint-{{title}}]]
- [[Specs-{{title}}]]
