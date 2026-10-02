# Sessão longa e compactação de contexto (opcional)

Quando a sessão encosta no limite de contexto, o Claude Code compacta o histórico. O padrão dele resume turnos antigos com um LLM, e resumo perde coisa: caminho de arquivo, erro exato, restrição, comando. Esta referência cobre como a TANG-ROU atravessa uma compactação sem perder o que importa, e o plugin opcional `fast-jev-compaction`, que troca o resumo por poda.

Fonte: README e `hooks/README.md` do repositório [tamaratran/fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction), lidos, **não executados** por esta skill. Confirme na versão que você instalar.

## O que sobrevive à compactação (independe do plugin)

1. **Persona e memória:** o hook de início de sessão reinjeta a Soul, o `STATE.md` e as lições. Se a plataforma disparar o início de sessão também depois de compactar (no Claude Code, o `SessionStart` tem origem `compact`, a confirmar na sua versão), a TANG-ROU volta sozinha. Se não disparar, releia a Soul (`SKILL.md` §0) e o `STATE.md` assim que notar que o histórico foi compactado.
2. **Estado em arquivo, não na conversa:** antes de uma tarefa longa, grave no `STATE.md` o próximo passo exato, as decisões e as versões-alvo. O que está em arquivo não depende de a compactação preservar o histórico.
3. **Compactação manual com foco:** em vez de esperar o automático, compacte no fim de uma fase, depois de gravar o `STATE.md`.

## O plugin `fast-jev-compaction` (opcional)

**O que faz.** Em vez de reescrever o histórico num resumo, ele só **apaga chamadas de ferramenta e resultados** que o modelo Jev (TypeSafe) julga que não são mais necessários. Texto do usuário e do assistente fica literal e na ordem; as mensagens mais novas e a primeira nunca são tocadas. Um resultado dispensável vira os primeiros ~300 caracteres mais uma nota. Se o Jev falhar, a resposta vier malformada ou a redução for pequena (padrão: menos de 25%), ele cai para a compactação nativa do Claude Code.

**Para a TANG-ROU, o ganho é grande porque** sessões de Foundry acumulam saída de busca, leitura de arquivo e testes que ficam obsoletas, enquanto o que importa (a decisão, o erro exato, a restrição) está no texto, que não é tocado.

**Requisitos e limites (do README dele):**
- Só **Claude Code**, versão **2.1.274 ou mais nova**, com o recurso experimental de *function hooks* ligado (`CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1`). O recurso é de acesso antecipado e pode mudar entre versões.
- Precisa de uma **chave da API TypeSafe** (`TYPESAFE_API_KEY`). Pode ter custo e exige conta lá.
- **Privacidade:** a conversa inteira (o texto, as entradas das ferramentas; os resultados vão resumidos a uma nota) é enviada ao endpoint da TypeSafe a cada compactação. Se o projeto tem código ou dados sensíveis do operador, **diga isso antes** de sugerir o uso.
- A decisão é uma probabilidade, não uma prova: o assistente pode sempre rodar a ferramenta de novo.
- Não funciona em Codex, OpenCode, ChatGPT, Manus nem no claude.ai.

**Instalação (só com o OK do operador; nunca por conta própria):**

```sh
# em ~/.claude/settings.json
{ "env": { "CLAUDE_CODE_ENABLE_FUNCTION_HOOKS": "1", "TYPESAFE_API_KEY": "<sua chave>" } }

claude plugin marketplace add tamaratran/fast-jev-compaction
claude plugin install fast-jev-compaction@fast-jev-compaction
```

Reinicie o Claude Code ou rode `/reload-plugins`. Depois, `/compact` e a compactação automática passam por ele; o aviso na tela diz `kept N/M messages, no summary` ou `fallback to built-in summary`.

**Regras ao lidar com isso:**
- A chave é segredo: nunca a escreva em arquivo do projeto, em `.tang-rou/`, em log ou no chat. O operador a coloca no ambiente dele.
- O plugin é terceiro e a skill não o executou: não afirme que ele funciona na versão do operador sem ter visto o aviso de compactação aparecer.
- Os hooks da TANG-ROU e o plugin coexistem (são hooks diferentes), mas teste uma compactação e confirme que a persona e o `STATE.md` continuam presentes depois dela.
- Se o operador não usa Claude Code, ou não quer enviar a conversa a terceiros, fique só com a seção "O que sobrevive à compactação".
