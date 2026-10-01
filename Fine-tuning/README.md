# Fine-tuning de LLMs na prática

> Quando (e quando NÃO) treinar seu próprio modelo, mais o pipeline local completo: Unsloth no Colab → GGUF → Ollama, com hiperparâmetros padrão e avaliação séria.

## Antes de tudo: você precisa de fine-tuning?

Fine-tuning muda **comportamento** (tom, formato, raciocínio estreito). Ele **não** injeta conhecimento novo de forma confiável: dado que muda toda semana é problema de RAG. Ordem barata → cara: **prompt → RAG → fine-tuning**.

| Sintoma | Ferramenta | Exemplo |
|---|---|---|
| Resposta errada ou formatada mal, custo zero | **Prompting/few-shot** com 2–3 exemplos | "responda como revisor sênior, bullets com severidade" |
| Modelo não conhece seus dados / dado de ontem | **RAG** ou context engineering | catálogo, docs internos, preços de hoje |
| Tom/formato/JSON precisam ser consistentes em 10k requisições | **Fine-tuning** | voz da marca, transcrição médica, JSON proprietário |
| Modelo grande caro e lento em alto volume | **Distillation** | teacher na API → student local |
| Jargão de domínio sem dados rotulados | **Continued pretraining** | corpus de textos legais bruto |
| Latência é crítica e os dados são estáveis | **Fine-tuning** | roteamento de intenções (sem etapa de retrieval, −200–500ms) |
| Conhecimento muda semanalmente | **RAG, nunca FT** | cotações, catálogo diário |

~75% dos casos resolvem com prompting e workflow simples. Híbrido (FT de comportamento + RAG de fatos) vence qualquer um dos dois isolados.

## Pipeline local: do treino ao Ollama

### 1. Setup

```bash
pip install --upgrade unsloth
```

### 2. Treino (notebook/Colab oficial do Unsloth)

```python
from unsloth import FastModel

model, tokenizer = FastModel.from_pretrained(
    model_name="unsloth/Qwen3-8B", max_seq_length=2048,
    load_in_4bit=True, full_finetuning=False)

model = FastModel.get_peft_model(
    model, r=16, lora_alpha=16, lora_dropout=0,
    target_modules=["q_proj","k_proj","v_proj","o_proj","gate_proj","up_proj","down_proj"],
    use_gradient_checkpointing="unsloth", random_state=3407)

# SFTConfig: learning_rate=2e-4, num_train_epochs=1..3, optim="adamw_8bit",
#            per_device_train_batch_size=2, gradient_accumulation_steps=4
```

### 3. Exportar para GGUF

```python
model.save_pretrained_gguf("modelo_ft", tokenizer, quantization_method="q4_k_m")
# alternativa manual:
# model.save_pretrained_merged("merged", tokenizer, save_method="merged_16bit")
# python llama.cpp/convert_hf_to_gguf.py merged --outfile m-F16.gguf --outtype f16
```

### 4. Importar no Ollama

```bash
ollama create meu-modelo -f ./Modelfile   # o Unsloth gera o Modelfile com template e stops
ollama show --modelfile meu-modelo        # confira o template
ollama run meu-modelo
```

### 5. Avaliar (base x fine-tuned, mesmo hardware e batch)

```bash
pip install lm-evaluation-harness
lm_eval --model hf --model_args pretrained=/caminho/checkpoint,dtype=bfloat16 \
  --tasks mmlu --num_fewshot 5 --batch_size auto --output_path ./results/ft
# LoRA sem merge: adicione ,peft=/caminho/do/adapter em model_args
```

## Hiperparâmetros que funcionam (defaults do Unsloth, 04/03/2026)

| Parâmetro | Valor | Observação |
|---|---|---|
| `learning_rate` | **2e-4** (LoRA/QLoRA) · 5e-6 (RL/DPO/GRPO) | |
| `num_train_epochs` | **1 a 3** | acima de 3, overfitting |
| `r` (rank) | **16** (testado: 8, 16, 32, 64, 128) | maior = mais capacidade, mais overfitting |
| `lora_alpha` | igual a `r` ou `2r` | manter alpha/r ≥ 1 |
| `lora_dropout` | 0 | |
| `optim` | `adamw_8bit` | |
| batch | 2 × grad_accum 4 | |
| loss saudável | **0,5 a 1,0** | loss → 0 = overfitting |

**VRAM mínima (QLoRA 4-bit):** 3B ≈ 3,5GB · 7B ≈ 5GB · 8B ≈ 6GB · 70B ≈ 41GB. Qwen3-14B cabe em Colab T4 16GB; Qwen3-30B-A3B (MoE) em 17,5GB.

**Dataset:** mínimo prático ~500–2.000 exemplos; para estilo, LoRA pode render com ~100. Qualidade > quantidade em todas as fontes.

## Armadilhas

1. **Chat template errado** → saída looping/giberrish no Ollama: use o MESMO template do treino (o Modelfile automático resolve).
2. **`num_ctx` do Ollama é 2048 por padrão** → Qwen3 fica em looping: suba para 32k (`PARAMETER num_ctx 32768`).
3. **Overfitting**: sintoma é MMLU caindo 2 a 4 pontos (esquecimento catastrófico). Correção: menos epochs, `lr` menor, `weight_decay` 0,01–0,1, misturar dados gerais.
4. **Contaminação de eval**: questões do MMLU dentro do seu dataset inflam o score; dedup por n-gram você mesmo, o harness não detecta.
5. **Comparar incomparáveis**: MMLU 5-shot x 0-shot; instruct com `--apply_chat_template`, base sem ele.
6. **Export GGUF queima RAM** (2× o tamanho do modelo): exporte só 1 quantização por vez.
7. **MoE**: não treine o router; use `FastModel` (não `FastLanguageModel`).

## Fine-tuning na nuvem (estado em 10/2026)

| Plataforma | Status | Preço de treino |
|---|---|---|
| **OpenAI** | **Encerrando a plataforma**: avisos 07/05/2026; novos orgs não criam jobs; jobs até **06/01/2027**; `ft-gpt-3.5-turbo`/`ft-gpt-4`/`ft-o4-mini` desligam **23/10/2026** | o4-mini $100/h; inferência: gpt-4.1 $3/$12 por 1M tokens |
| **Google (Gemini)** | Ativo: supervised tuning + distillation | cobrança = tokens do dataset × épocas; Gemini 2.0 Flash $0,003/1M, Flash-Lite $0,001/1M |
| **Local (Unsloth/Ollama)** | Ativo, sem custo por token | custo = GPU/electricidade |

A tendência de 2026: QLoRA em GPU consumer de 8GB, RL pós-treino (GRPO/DPO), distillation para modelos pequenos e export GGUF/MLX. Unsloth suporta Qwen3, Gemma 4, gpt-oss 20B/120B, Llama 3.1/3.2 e DeepSeek-V4.

## Mapa desta pasta

| Arquivo | O que te guia |
|---|---|
| `README.md` | Este guia |

## Ver também

- [Ollama](../Ollama/README.md) e o benchmark `check_local_llm.py` (descubra se seu PC aguenta o treino antes de começar)
- Unsloth: [guia de hiperparâmetros LoRA](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide/lora-hyperparameters-guide) · [salvar no Ollama](https://unsloth.ai/docs/basics/inference-and-deployment/saving-to-ollama)
- [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)
- [Deprecations da OpenAI](https://developers.openai.com/api/docs/deprecations) (calendário do fine-tuning)
- RAG x FT: [Databricks](https://www.databricks.com/blog/rag-vs-fine-tuning) · [IBM](https://www.ibm.com/think/topics/rag-vs-fine-tuning-vs-prompt-engineering)
- Seção [Ecossistema IA](../README.md#ecossistema-de-ferramentas-e-recursos) do README raiz.

> Pesquisa e fontes verificadas em 01/10/2026. Itens marcados com `[verificar]` não puderam ser confirmados na fonte primária.
