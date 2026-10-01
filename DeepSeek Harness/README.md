# DeepSeek Harness

> O `dsh`: agente harness open-source da DeepSeek com arquitetura "everything is a plugin".

## O que é

**DeepSeek Harness (`dsh`)** é o framework de agentes open-source (MIT) da DeepSeek AI, lançado em ago/2026. Tudo nele é plugin (arquitetura [Cordis](https://github.com/cordiverse/cordis)) — ferramentas, hooks e integrações se plugam sem mexer no núcleo. Vem com **Web UI própria** em `http://127.0.0.1:3080`.

> ⚠️ **Developer preview**: em evolução rápida, **com mudanças que quebram compatibilidade**. Leia o [aviso de segurança](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md) antes de rodar.

## Comece aqui (guia em 3 passos)

1. **Instale o Node.js** (v22.19+ ou v24) — é a única pré-requisição.
2. **Rode** (sem instalar nada global):

   ```bash
   npx @deepseek-ai/dsh web
   ```

   A Web UI abre em `http://127.0.0.1:3080` (use `--no-open` para não abrir o browser; em SSH ele só imprime a URL).

3. **Sessão de código:** use a UI local para dar tarefas ao agente; plugins vão por repositórios com o tópico GitHub [`dsh-plugin`](https://github.com/topics/dsh-plugin).

### Rodar a partir do código-fonte

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

## Cuidado com a confusão de nomes

Existem **dois** projetos chamados "deepseek-harness":

| Projeto | O que é |
|---|---|
| [`deepseek-ai/deepseek-harness`](https://github.com/deepseek-ai/deepseek-harness) | **O oficial** (Node, `npx @deepseek-ai/dsh`) — este guia |
| `deepseek-harness-cli` (PyPI) | Projeto **de terceiros**, não-oficial |

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| `README.md` | Este guia |

## Ver também

- Docs: <https://deepseek-harness.github.io/deepseek-harness/> · Repo: <https://github.com/deepseek-ai/deepseek-harness>
- Ecosistema: seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.
