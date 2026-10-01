# TANG-ROU — Foundry VTT para Claude Code e Manus

Este pacote reconcilia a Soul e o fluxo principal do `tang-rou.rar` com seus três papéis: `foundry-researcher`, `foundry-coder` e `foundry-auditor`.

## Claude Code

Copie a pasta `.claude/agents/` para a raiz do repositório. O coordenador chama os três subagentes quando disponíveis; tarefas pequenas podem ser tratadas diretamente. Context7 é habilitado pelo MCP server `context7`. Esse servidor precisa estar configurado no Claude Code; o arquivo não cria a conexão. Se a pasta `.claude/agents/` for criada pela primeira vez durante uma sessão, reinicie Claude Code para que o watcher a detecte.

- `tang-rou-foundry.md`: coordenador e aplicação da Soul.
- `foundry-researcher.md`: read-only; contexto + pesquisa versionada/Context7.
- `foundry-coder.md`: implementa mudanças delimitadas e valida.
- `foundry-auditor.md`: read-only; audita diff, versão, riscos e testes.

## Manus

`manus/tang-rou-profile-instruction.md` contém a instrução pronta para configurar um perfil único, que executa pesquisador → coder → auditor como fases explícitas; ela não finge que são três agentes separados. A criação direta do perfil na conta **não foi concluída**: o CLI desta sessão retornou “agent operations are unavailable in this session”. O Context7 já está habilitado nesta tarefa, mas o vínculo precisa ser selecionado ao criar o perfil no ambiente Manus habilitado para essa operação.

## Decisões de compatibilidade

- A versão-alvo do Foundry é descoberta no projeto; exemplos de v12/v13/v14 não são misturados.
- O contexto Hive e logs são opcionais e só são lidos/escritos se realmente estiverem disponíveis e se o projeto usar esse fluxo; caminhos absolutos da máquina do autor não são presumidos.
- Batch, canvas guards, IIFE/Application e medições são aplicados conforme a API e o caso, não mecanicamente.
- As estimativas numéricas da Soul são personalidade, não benchmarks. Nada de inventar tempos, testes ou uso de ferramentas.

## Integridade da origem

`foundry-researcher.md` e `foundry-auditor.md` foram extraídos do RAR. O membro `references/foundry-coder.md` falhou na extração por corrupção do arquivo; o coder incluído foi reconstruído a partir da skill TANG-ROU, do checklist, das referências de API e dos outros papéis, sem alegar que seja o original recuperado.
