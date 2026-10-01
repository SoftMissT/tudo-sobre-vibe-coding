# Ollama

> O que é o Ollama, se o seu PC aguenta rodar modelos locais e como usá-lo no fluxo de código.

## O que é

**Ollama** é o runtime local de LLMs mais popular: baixa modelos (quantização q4), serve numa API local (`localhost:11434`) e roda **na sua GPU/RAM**: sem nuvem, sem conta, sem custo por token.

## O seu PC aguenta? (sem baixar nada)

Rode o benchmark de requisitos desta pasta:

```bash
python check_local_llm.py          # só lê hardware, NÃO baixa modelo nenhum
python check_local_llm.py --self-test
```

Ele detecta CPU/RAM/VRAM/disco, lista o que você **já tem local** (`ollama list`) e diz quais modelos cabem: separado por **100% GPU (rápido)** vs **só CPU (lento)**.

**Requisitos do script:** Python 3.8+, stdlib apenas (zero dependências). `nvidia-smi` opcional (para VRAM NVIDIA); em Mac Apple Silicon a RAM unificada é usada como VRAM.

Regra de bolos (q4, com reserva p/ sistema): até 4 GB → nada útil · 8 GB → até 3B · 16 GB → até 7–8B · 32 GB → até 14B (32B em CPU) · VRAM 12 GB → 14B na GPU · 24 GB → 32B.

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| [`check_local_llm.py`](./check_local_llm.py) | Benchmark de requisitos: roda onde você está, sem download |

## Comece aqui (guia em 4 passos)

1. **Instale:** <https://ollama.com/download> (Windows/macOS/Linux; no Ubuntu o pacote vem com GPU pronta).
2. **Verifique:** `python check_local_llm.py` → leia o veredicto.
3. **Baixe 1 modelo:** `ollama run llama3.1:8b` (só o que você escolher).
4. **Integrez no fluxo:** aponte seu agente para a API local (modelo `llama3.1:8b`, base `http://localhost:11434/v1`) ou use `ollama run` no terminal.

## Comandos essenciais

```bash
ollama run <tag>        # baixa (1x) e conversa
ollama list             # modelos já baixados
ollama ps               # o que está carregado agora (GPU/CPU split)
ollama pull <tag>       # baixa sem abrir conversa
ollama rm <tag>         # remove
```

## Mapa de modelos (q4, tamanhos aprox.)

| Tag | TAM | Para quê |
|---|---|---|
| `qwen2.5:0.5b` / `llama3.2:1b` | 0,5–1 GB | testar o runtime |
| `llama3.2:3b` | 2 GB | uso geral leve |
| `llama3.1:8b` / `qwen2.5-coder:7b` | ~4,7 GB | **coding geral** (padrão) |
| `qwen2.5:14b` | ~9 GB | coding intermediário |
| `qwen2.5:32b` | ~20 GB | coding avançado |
| `llama3.1:70b` | ~42 GB | próximo do frontier |

Tags `:cloud` (ex.: `deepseek-v4-flash:cloud`) **não rodam local**: são servidas pela nuvem.

## Ver também

- Site: <https://ollama.com> · Modelos: <https://ollama.com/library>
- Ecosistema: seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.
