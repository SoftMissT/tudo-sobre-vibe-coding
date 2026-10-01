# Segurança

## Escopo

- Este repositório (todo o conteúdo versionado)
- O site publicado em `https://softmisst.github.io/tudo-sobre-vibe-coding/` (landing page estática)

## O que reportar

- **Credenciais/chaves** commitadas (API keys, tokens, senhas, `.env`)
- **Dados pessoais** expostos (CPF, e-mail, telefone, endereço de terceiros)
- **XSS / injecção** na landing page (é HTML/CSS puro não deveria existir; se existir, é bug)
- **Links maliciosos** ou repositórios comprometidos listados no README

## Como reportar (privado)

Use **GitHub Security Advisory**:

> Repo → aba **Security** → **Report a vulnerability** → privado

Se a aba não estiver disponível, envie mensagem privada ao mantenedor [@SoftMissT](https://github.com/SoftMissT) **não** abra issue pública para vulnerabilidade real.

## O que esperar

- **Resposta:** melhor esforço, alvo de 7 dias
- **Credito:** quem reporta e for confirmado é creditado no `CHANGELOG.md` (se quiser)
- **Correção:** segredos/PII detectados são removidos do HEAD imediatamente; histórico é avaliado caso a caso (rewrites só com dano real)

## O que NÃO é vulnerabilidade

- Heurísticas de prompt ou "jailbreak" de skills conteúdo educacional
- Uso comercial do conteúdo (é permitido pela CC BY 4.0 com atribuição)

## Status

Última auditoria: **2026-10-01** sem segredos, sem PII, histórico git limpo.
