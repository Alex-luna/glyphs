# Template-simple-v3

Kit Cursor Luna Labs para iniciar projetos — **não** inclui app runnable.

## Princípio

**Simples sempre vence.** Duas opções resolvem → a mais simples ganha.

- **Fork:** apague antes de adicionar — [`Docs/FORK.md`](Docs/FORK.md)
- **Código:** YAGNI → rule `ponytail.mdc`
- **Repo:** raio-x periódico → skill `repo-audit`

## O que é / o que não é

| É | Não é |
|---|--------|
| Rules, skills base, scripts Git, Docs | `app/`, deploy, produto no ar |
| Skills: `caveman`, `writing-prds`, `repo-audit`, `write-a-skill`, `handoff` | `ui-ux-pro-max` / `shadcn-ui` no clone (~800KB) |
| Notas de design em `Design-System/` | `design-system/` (path antigo v2) |

Repo template: https://github.com/Alex-luna/template-simple-v3 (privado)

## Cursor — rules

| Rule | Papel |
|------|--------|
| `default.mdc` | Princípio + git + apps |
| `caveman.mdc` | Comunicação tersa sempre on |
| `ponytail.mdc` | YAGNI / lazy senior |
| `template-onboarding.mdc` | Stack **se existir `app/`** |
| `github-workflow.mdc` | Changelog, commit-push, release |
| `convex-module-deploy.mdc` | Deploy após alterar `app/convex/` |
| `aprendizados-projeto.mdc` | Lições em `Docs/Aprendizados do Projeto/` |
| `easypanel-simple.mdc` | Deploy **se `server.js` na raiz** |
| `prompts.mdc` | Prompts em `Docs/Prompts/` — não editar corpo |
| `O Conselho.mdc` | Persona opt-in |

**Commit + push obrigatório** ao fim de batch com alterações (`default.mdc` + `github-workflow.mdc`).

## Skills

Bundled: `caveman`, `writing-prds`, `repo-audit`, `write-a-skill`, `handoff`

| Skill | Uso |
|-------|-----|
| `handoff` | Compacta conversa → doc para próximo agent (OS temp dir; redact secrets) |

**UI (opcional):**

```bash
export SKILLS_SOURCE="$HOME/Documents/Luna-Labs-Cursor/skills-bundle"
./scripts/install-optional-skills.sh ui-ux-pro-max shadcn-ui
```

## Scripts

| Script | Uso |
|--------|-----|
| `commit-push.sh "msg"` | Commit + push |
| `release.sh vX.Y.Z --notes-file releases/...` | Release GitHub |
| `install-optional-skills.sh` | Copia skills UI de `SKILLS_SOURCE` |
| `scaffold-easypanel-simple.sh [nome]` | Preset Node/Easypanel na raiz (+ lockfile) |
| `dev-simple.sh` | Dev local (`server.js` + fallback de porta) |
| `dev-v2.sh` | Dev Next+Convex em `app/` (porta 3015) |

## Escolha a stack

| Caminho | Quando | Doc |
|---------|--------|-----|
| Easypanel — `server.js` na raiz | app leve VPS + SQLite | [03-easypanel/](Docs/reference/03-easypanel/README.md) |
| Next — pasta `app/` | front + Convex opcional | `template-onboarding.mdc` |

Easypanel quick start:

```bash
./scripts/scaffold-easypanel-simple.sh meu-app
./scripts/dev-simple.sh
```

Checklist deploy: [easypanel-panel.md](Docs/reference/03-easypanel/easypanel-panel.md) — Build Path `/` (simples) ou `/app` (Next).

## Variáveis de ambiente

Template na raiz: [`.exemple_env`](.exemple_env) — copie para `.env` no fork e preencha (`.env*` no gitignore; nunca commitar secrets).

```bash
cp .exemple_env .env
# editar .env localmente
```

## Mais

- Índice docs: [Docs/README.md](Docs/README.md)
- Blueprint opcional: `Docs/reference/04-optional-rules/module-versioning.mdc.example` → `.cursor/rules/`
- Release: [release-notes-template.md](Docs/reference/01-github/release-notes-template.md)
