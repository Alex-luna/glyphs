---
name: reset
description: >
  Limpa .cursor/plans/*.plan.md e zera entradas de changelogs.md (só título).
  Use when user invokes /reset, "reset", "limpar plans", "zerar changelog",
  or "fresh start".
---

# Reset — plans + changelog

Operação destrutiva intencional — invocar `/reset` já é confirmação.

## Quick start

```bash
./.agents/skills/reset/scripts/reset.sh
```

## Workflow (agent)

1. Rodar script da raiz do repo
2. Resposta curta: quantos plans apagados + changelog resetado
3. Se user não disse "não commite" → `./scripts/commit-push.sh "reset: limpar plans e changelog"`

## O que faz

| Alvo | Ação |
|------|------|
| `.cursor/plans/*.plan.md` | `rm` todos |
| `changelogs.md` | só `# Changelogs` |

## Fora de escopo

- `Docs/Handoffs/`, prompts, aprendizados
- Plans de outros repos
