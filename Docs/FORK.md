# Fork — checklist (uma vez por projeto)

Ordem fixa. Apague o que não usar. **Simples sempre vence** — delete rules/docs mortos antes de adicionar novos (passos 4–7).

| # | Ação |
|---|------|
| 1 | GitHub → **Use this template** → nome do projeto |
| 2 | Clone + abrir no Cursor |
| 3 | Ler `.cursor/rules/default.mdc` |
| 4 | **Não** for Next/front? Apagar ou editar `template-onboarding.mdc` |
| 5 | **Sem** Convex? Apagar `convex-module-deploy.mdc` |
| 6 | **Com** UI pesada? `SKILLS_SOURCE=... ./scripts/install-optional-skills.sh ui-ux-pro-max shadcn-ui` |
| 7 | **Blueprint?** Copiar `Docs/reference/04-optional-rules/module-versioning.mdc.example` → `.cursor/rules/` |
| 8 | Criar `app/` (Next) **ou** app simples Easypanel — ver abaixo |
| 9 | Primeiro commit: `./scripts/commit-push.sh "chore: init from template-simple-v3"` |
| 10 | **App simples no ar?** `./scripts/scaffold-easypanel-simple.sh meu-app` → `Docs/reference/03-easypanel/` → volume `/app/data` no Easypanel |
| 11 | **Raio-x do repo:** invocar skill `repo-audit` — após init ou periodicamente (prune rules/skills/docs mortos) |

## Paths deste template

- Design: `Design-System/` (não `design-system/`)
- Aprendizados: `Docs/Aprendizados do Projeto/`
- Índice docs: `Docs/README.md`
- Git/release: `Docs/reference/01-github/`
- Deploy simples (Easypanel): `Docs/reference/03-easypanel/`
- Prompts: `Docs/Prompts/`

## Não levar para o fork

- Histórico de `.cursor/plans/` (ignorado no template; não copiar de outros repos)
