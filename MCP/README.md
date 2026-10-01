# MCP na prática (Model Context Protocol)

> O "USB-C da IA": um protocolo aberto que conecta qualquer agente a qualquer ferramenta. Este guia leva do conceito ao seu primeiro servidor rodando, com configs reais para Claude Code, Claude Desktop, Codex e Gemini CLI.

## O que é

O **MCP (Model Context Protocol)** é um protocolo open-source criado pela **Anthropic em 25/11/2024** que padroniza como aplicações de IA se conectam a fontes de dados e ferramentas externas. Sem ele, você resolve o **problema N×M**: 10 apps × 100 ferramentas = 1.000 integrações diferentes. Com MCP, cada app e cada ferramenta fala o mesmo idioma: N + M.

- Abrangência hoje: **OpenAI** entrou no steering committee em 21/05/2025, **Google** anunciou suporte em 09/04/2025 e em **09/12/2025** a Anthropic **doadou o MCP à Linux Foundation** (Agentic AI Foundation), com Anthropic, Block e OpenAI como co-fundadores.
- Spec atual datada de **2026-07-28**: o núcleo ficou **stateless** (descoberta via `server/discover`, sem handshake `initialize` permanente); +400M downloads mensais de SDK anunciados pela Anthropic (28/07/2026).

## Arquitetura

| Peça | O que é | Exemplo |
|---|---|---|
| **Host** | O app onde a IA vive; cria um client por servidor | Claude Desktop, Claude Code, VS Code |
| **Client** | Conexão 1:1 com um server dentro do host | gerenciada pelo host |
| **Server** | Expõe contexto e ferramentas | servidor de filesystem, de GitHub, o seu |

O server expõe três **primitives**:

| Primitive | O que faz | Quem controla |
|---|---|---|
| **Tools** | Funções executáveis (a IA chama) | o modelo |
| **Resources** | Dados/contexto para leitura | a aplicação |
| **Prompts** | Templates de prompt prontos | o usuário |

**Transports** (como as mensagens viajam; tudo é JSON-RPC 2.0):

1. **stdio**: server roda como subprocesso local, mensagens em stdin/stdout.
2. **Streamable HTTP**: cada mensagem é um POST num endpoint único, resposta JSON ou stream SSE. O HTTP+SSE antigo está deprecado.

## Conectar um servidor em cada cliente

### Claude Code

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest        # stdio: '--' separa os args
claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp
claude mcp add --env AIRTABLE_API_KEY=CHAVE --transport stdio airtable -- npx -y airtable-mcp-server
claude mcp list && claude mcp get <nome> && claude mcp remove <nome> --scope local
```

Escopos: `local` (padrão, no `~/.claude.json` do projeto) · `project` (`.mcp.json` na raiz, versionável, aprovação na primeira vez) · `user` (`~/.claude.json`). Formato do `.mcp.json`:

```json
{
  "mcpServers": {
    "claude-code-docs": { "type": "http", "url": "https://code.claude.com/docs/mcp" },
    "playwright": { "type": "stdio", "command": "npx", "args": ["-y", "@playwright/mcp@latest"] }
  }
}
```

Dentro da sessão, o comando `/mcp` inspeciona os servidores. Timeout de subida é 30s (suba com `MCP_TIMEOUT=60000`). Fonte: [code.claude.com/docs/pt/mcp](https://code.claude.com/docs/pt/mcp).

### Claude Desktop

Arquivo (Windows): `%APPDATA%\Claude\claude_desktop_config.json` · (macOS): `~/Library/Application Support/Claude/claude_desktop_config.json`. Edite por Settings → Developer → Edit Config e **feche o app por completo** depois.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\user\\Desktop"]
    }
  }
}
```

### Codex CLI (OpenAI)

TOML, não JSON, em `~/.codex/config.toml` (global) ou `.codex/config.toml` (projeto):

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env_vars = ["LOCAL_TOKEN"]

[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
```

### Gemini CLI (Google)

JSON em `~/.gemini/settings.json` (user) ou `.gemini/settings.json` (projeto). **Pegadinha: o campo HTTP é `httpUrl`, não `url`.**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@github/github-mcp-server"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "$GITHUB_PERSONAL_ACCESS_TOKEN" }
    }
  }
}
```

Allowlist: `mcp.allowed` / `mcp.excluded`; por servidor, `includeTools` / `excludeTools` para limitar quais tools ficam disponíveis.

## Criar seu primeiro servidor

### Opção A: Python (mais curta)

```python
from mcp.server import MCPServer

mcp = MCPServer("Demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b
```

```bash
uv run mcp dev server.py                               # abre o Inspector em stdio
uv run mcp run server.py --transport streamable-http   # HTTP em localhost:8000/mcp
```

### Opção B: TypeScript (SDK v2)

```bash
mkdir weather && cd weather && npm init -y && npm pkg set type=module
npm install @modelcontextprotocol/server zod tsx && mkdir src
npx tsx src/index.ts                       # roda em stdio (log só no stderr)
npx @modelcontextprotocol/inspector npx tsx src/index.ts   # Connect → Tools → invocar
```

```ts
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

const server = new McpServer({ name: 'weather', version: '1.0.0' });

server.registerTool('get-alerts',
  { description: 'Weather alerts for a US state',
    inputSchema: z.object({ state: z.string().length(2) }) },
  async ({ state }) => ({ content: [{ type: 'text', text: `Alerts for ${state}: none.` }] }));

void serveStdio(() => server);
```

> Docs legados usam `@modelcontextprotocol/sdk` (`McpServer` + `StdioServerTransport`). Confirme qual pacote está estável antes de copiar de um tutorial antigo. Node 20+.

**Teste:** `npx @modelcontextprotocol/inspector npx tsx src/index.ts` abre o Inspector, você conecta e invoca a tool pela GUI antes de plugar em qualquer agente.

## Segurança (obrigatória antes de publicar)

1. **Confused deputy**: um proxy MCP pode ser usado para roubar authorization codes. Mitigações da spec: consentimento por client, `redirect_uri` com match exato, `state` single-use e curto.
2. **Menor privilégio**: scopes mínimos, nunca curinga (`*`, `full-access`). Ferramentas destrutivas marcadas com `destructiveHint` (no Claude Code, `_meta["anthropic/requiresUserInteraction"]: true`).
3. **Human-in-the-loop**: a spec de tools exige que um humano possa negar uma chamada. Ação que apaga, paga ou envia sempre pede aprovação.
4. **Supply chain**: instalar um server é rodar `npx`/`uvx` de terceiros na sua máquina. O conteúdo de um server (tool descriptions) é superfície de **prompt injection**: trate tudo que vem dele como não confiável.
5. **Allowlists**: no Gemini CLI, `mcp.allowed` + `includeTools`/`excludeTools`; no Claude Code, a aprovação do `.mcp.json` de projeto.

## Onde achar servidores

| Fonte | URL | Nota |
|---|---|---|
| Registro oficial (preview desde 08/09/2025) | https://registry.modelcontextprotocol.io | API `GET /v0/servers?search=...` |
| mcp.so, Glama, Smithery | comunitários | ~17k / ~12,6k / ~7,3k entradas [números de fontes secundárias] |
| Directory da Anthropic | claude.ai | +950 conectores (anúncio 2026) |

## Armadilhas de configuração

- Codex é **TOML** (colar JSON falha).
- Gemini usa **`httpUrl`**, não `url`.
- Claude Code ignora entrada com `url` mas sem `type`.
- Caminhos no Claude Desktop no Windows precisam de `\\` escapado e caminho absoluto.
- HTTP+SSE está deprecado: use Streamable HTTP.

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| `README.md` | Este guia |

## Ver também

- Spec e docs: [modelcontextprotocol.io](https://modelcontextprotocol.io/docs/getting-started/intro) · [Security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- SDKs: [TypeScript](https://ts.sdk.modelcontextprotocol.io/v2/get-started/first-server) · [Python](https://py.sdk.modelcontextprotocol.io/get-started/first-steps)
- Anúncio original: [Anthropic, 25/11/2024](https://www.anthropic.com/news/model-context-protocol)
- Guias relacionados: [Codex](../Codex/README.md) · [Claude Code](../Claude%20Code/README.md) · [Ecossistema de Plugins](../Plugins/README.md)
- Seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.

> Pesquisa e fontes verificadas em 01/10/2026. Itens marcados com `[verificar]` não puderam ser confirmados na fonte primária.
