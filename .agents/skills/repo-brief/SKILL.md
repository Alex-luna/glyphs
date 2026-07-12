---
name: repo-brief
description: >
  Scan repo and write a concise technical brief (business rules, stack, or both).
  Saves to Docs/Briefs/. Use when user asks for /brief, project summary, business
  rules map, repo context for another agent, or understanding how the app works.
argument-hint: "[rules|stack|both] [slug]"
disable-model-invocation: true
---

# Repo brief

Mapa funcional do **repo inteiro** — não da sessão. Complementa `handoff` (estado da conversa) e `repo-audit` (higiene).

## Invocação

```
/brief [rules|stack|both] [slug]
```

| Lente | Default | Conteúdo |
|-------|---------|----------|
| `rules` | **sim** | Entidades, fluxos, validações, invariantes |
| `stack` | | Runtime, deps, entry points, deploy |
| `both` | | Stack ≤8 bullets + rules completo |

Lente ambígua → AskQuestion uma vez; senão `rules`.

## Onde salvar

```
Docs/Briefs/brief-{dd-MM-aa-HH-mm}-{lens}-{slug}.md
```

- **slug:** kebab-case do módulo/foco; omitido → `geral`
- Colisão no mesmo minuto: `-2`, `-3` …
- Criar `Docs/Briefs/` se não existir

## Pipeline

### 1. Detectar tipo

- `server.js` → Express + SQLite + `public/js/*`
- `app/` → Next + Tailwind + Convex opcional
- Template puro → `.cursor/rules`, scripts, Docs — **não inventar produto**

### 2. Scan dirigido

**rules:** `server.js` (rotas, validações, SQL), `public/js/*`, schema inline ou `app/convex/schema.ts`, `README.md` / `Manifesto.md` (só fatos)

**stack:** `package.json`, `Docs/reference/`, rules condicionais, entry points

**Ignorar leitura profunda:** `Docs/Layout/`, changelogs históricos, `.cursor/plans/` (só link), handoffs (referenciar). **Redact** secrets — nunca `.env`.

### 3. Escrever brief

**Teto:** ~120 linhas / ~800 palavras. Ultrapassou → cortar bullets.

```markdown
# Brief — {título curto}

**Data:** {dd-MM-aa HH:mm}
**Lente:** rules | stack | both
**Repo:** {nome}

## TL;DR
3–5 bullets.

## Domínio / módulos
Módulo | Responsabilidade | Paths

## Regras de negócio          <!-- rules ou both -->
- Entidade → regra → consequência
- Validações, hierarquias, cascatas
- Fora de escopo explícito

## Fluxos principais           <!-- rules ou both -->
1. trigger → passos → resultado

## Stack                        <!-- stack ou both -->
- Runtime, DB, deploy, env vars públicas (sem valores)

## Gaps e riscos               <!-- rules ou both; 3–5 bullets max -->
Factual — hipóteses de melhoria ou buracos

## Artefatos
Paths — não colar corpo

## Não repetir aqui
Handoffs, plans, release notes
```

**Tom:** presente, direto. Sem histórico de commits salvo se irrelevante para *como funciona hoje*.

### 4. Pós-gravação

`./scripts/commit-push.sh "docs: repo brief {lens}-{slug}"`

## Chat

Path + 3 bullets TL;DR — **não** colar brief inteiro.
