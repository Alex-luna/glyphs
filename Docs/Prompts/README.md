# Prompts

Prompts salvos para reutilizar no Cursor.

## Onde salvar

| Local | Uso |
|-------|-----|
| `Docs/Prompts/` | Prompt com conteúdo |
| `Docs/Prompts/inbox/` | Rascunho (opcional) |

## Numeração

Prefixos `01_`, `02_`… aplicados no commit (`normalize-prompts.sh`):

- **01** = mais antigo
- **Número maior** = mais recente

Não renumerar manualmente.

## Frontmatter

Mínimo (script adiciona só se o arquivo não tiver `---`):

```yaml
---
type: prompt
title: Nome Do Prompt
created: 2026-06-12
---
```

Campos extras (`slug`, `status`, etc.) são opcionais — você adiciona se quiser.

## O que o commit faz (light)

1. Frontmatter só em arquivo **sem** `---`
2. Renumera prefixos por `created` (ou data do arquivo)
3. **Não edita** corpo de prompts existentes

Modo legado (slug, inbox): `./scripts/normalize-prompts.sh --full`

## Agent

Não alterar corpo de prompts salvos. Ver rule `prompts.mdc`.
