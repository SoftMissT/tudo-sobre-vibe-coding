# Geração de imagens

> Biblioteca de prompts de imagem prontos para copiar e colar: banners, personagens e referências visuais.

## O que é

Prompts testados para gerar imagens com IA (Midjourney, DALL-E, Stable Diffusion, etc.), organizados por finalidade. Cada arquivo traz o prompt completo + dicas de variação.

## Mapa desta pasta

### Prompts Banners (para o repositório/site)

| Arquivo | Gera |
|---|---|
| [`banner-01-hive.md`](./Prompts%20Banners/banner-01-hive.md) | Banner da Hive |
| [`banner-02-seguranca.md`](./Prompts%20Banners/banner-02-seguranca.md) | Banner de segurança |
| [`banner-03-repositorios-apoio.md`](./Prompts%20Banners/banner-03-repositorios-apoio.md) | Banner de repositórios/apoio |
| [`banner-04-foundry-vtt.md`](./Prompts%20Banners/banner-04-foundry-vtt.md) | Banner do Foundry VTT |
| [`banner-05-como-comecar.md`](./Prompts%20Banners/banner-05-como-comecar.md) | Banner "como começar" |

> As imagens já geradas ficam em [`../assets/img/`](../assets/img/) (`.webp`, 1672×941): é lá que o site as usa.

### Open AI

| Arquivo | Gera |
|---|---|
| [`Open Ai/Prompts de Geração de Imagem · Personagem Tático Urbano.md`](./Open%20Ai/Prompts%20de%20Gera%C3%A7%C3%A3o%20de%20Imagem%20%C2%B7%20Personagem%20T%C3%A1tico%20Urbano.md) | Personagem tático urbano |
| [`Open Ai/Revista de anime.md`](./Open%20Ai/Revista%20de%20anime.md) | Capa de revista de anime |

## Como usar (guia)

1. **Escolha o prompt** pela finalidade (banner do site, personagem, capa).
2. **Copie o prompt inteiro** e cole no gerador (Midjourney → `/imagine`; DALL-E/GPT → chat direto).
3. **Varie sem quebrar:** troque apenas cores/tema, mantendo a estrutura de estilo e composição.
4. **Para banners do site:** gere em 1672×941, converta para `.webp` (qualidade ~82) e salve em `assets/img/` com nome `banner-XX-*.webp`.

## Convenções

- Um `.md` por prompt; nome diz a finalidade.
- Prompt = **estilo + composição + iluminação + restrições** (texto, artefatos).
- Resultado final versionado em `assets/img/` como `.webp` leve.
