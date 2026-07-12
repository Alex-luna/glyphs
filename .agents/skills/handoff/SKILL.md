---
name: handoff
description: >
  Compact the current conversation into a handoff document for another agent.
  Saves to Docs/Handoffs/ in the repo vault. Use when user asks for handoff,
  session transfer, or passing context to a fresh agent.
argument-hint: "What will the next session be used for?"
---

# Handoff

Resume conversa → doc no **vault (repo atual)** — não OS temp.

## Onde salvar

```
Docs/Handoffs/handoff-{dd-MM-aa-HH-mm}-{slug}.md
```

Ex.: `handoff-21-06-26-14-30-easypanel-deploy.md`

- **slug:** 2–4 palavras kebab-case do foco (ex.: `easypanel-deploy`, `auth-refactor`)
- **Colisão no mesmo minuto:** `-2`, `-3` …
- Criar `Docs/Handoffs/` se não existir

## Estrutura do doc

```markdown
# Handoff — {título curto}

**Data:** {dd-MM-aa HH:mm}
**Próxima sessão:** {argument-hint do user ou inferido}

## Contexto
O que foi feito e por quê (3–8 bullets).

## Estado atual
- Branch / commits relevantes
- Arquivos tocados (paths)
- Bloqueios ou decisões pendentes

## Próximos passos
1. …
2. …

## Artefatos (referenciar, não duplicar)
- PRD, plans, ADRs, issues, commits, diffs → path ou URL

## Skills sugeridas
- `skill-name` — por quê

## Não repetir aqui
Conteúdo já em outro arquivo neste repo.
```

## Regras

- **Redact** API keys, passwords, PII — nunca colar `.env`
- **Não duplicar** corpo de PRDs, plans, raio-x, aprendizados — só link
- User passou args → foco da próxima sessão = args
- Após gravar: `./scripts/commit-push.sh "docs: handoff {slug}"` (template exige push)

## Chat

Resposta curta: path do arquivo + 2–3 bullets do que o próximo agent precisa saber.
