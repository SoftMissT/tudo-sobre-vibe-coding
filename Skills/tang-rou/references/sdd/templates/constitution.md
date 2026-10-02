---
type: constitution
status: draft
created: {{date}}
updated: {{date}}
tags: [sdd, constitution, principles]
---

# Constitution: {{title}}

> [!abstract] Propósito
> Princípios **inegociáveis** deste projeto. Todo artefato seguinte (Requirements, PDR, Blueprint, Specs) e toda implementação DEVEM declarar conformidade com esta constituição. É o que impede deriva, over-engineering e decisões fora do combinado.

> [!warning] Como usar
> Cada artigo é uma **regra verificável**, não um desejo. Mantenha entre 5 e 9 artigos. Se uma regra não pode ser checada objetivamente, reescreva-a até que possa.

## Artigos

### Artigo I — Stack e Ferramentas
- **Obrigatório**: [ex.: pnpm como gerenciador de pacotes; Next.js 16 + React 19]
- **Proibido**: [ex.: npm e yarn; qualquer dependência sem licença permissiva]

### Artigo II — Qualidade e Testes
- [ex.: Todo código novo DEVE ter teste antes de ser considerado pronto.]
- [ex.: Typecheck e lint DEVEM passar antes de qualquer merge.]

### Artigo III — Arquitetura
- [ex.: Uma responsabilidade por módulo. Sem lógica de negócio no componente de UI.]
- [ex.: Segredos NUNCA entram no repositório — sempre via variável de ambiente.]

### Artigo IV — Segurança
- [ex.: Toda entrada de usuário DEVE ser validada no servidor.]
- [ex.: Dados sensíveis DEVEM ser criptografados em repouso e em trânsito.]

### Artigo V — Convenções
- [ex.: Nomes de arquivo em kebab-case. Documentos do vault em Obsidian-Flavored Markdown.]
- [ex.: Saída de documentos em Markdown `.md`.]

## Processo de Emenda
Mudar a constituição exige aprovação explícita do usuário e propagação para os artefatos afetados. Registre a data e o motivo de cada emenda.

| Data | Artigo | Mudança | Motivo |
| :--- | :--- | :--- | :--- |
| {{date}} | — | Criação | Bootstrap do projeto |

---
**Documentos Relacionados**:
- [[Requirements-{{title}}]]
- [[PDR-{{title}}]]
- [[Blueprint-{{title}}]]
- [[Specs-{{title}}]]
