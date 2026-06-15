## De onde viemos

[v0.1.3](https://github.com/Alex-luna/template-simple-v3/releases/tag/v0.1.3) — preset Easypanel; `normalize-prompts` agressivo reescrevia conteúdo; Docs sem índice.

## Onde estamos

- **Prompts light** — commit só adiciona frontmatter se ausente e renumera; corpo nunca tocado; `01_` = mais antigo
- **Rule `prompts.mdc`** — agent não edita corpo de prompts salvos
- **`Docs/README.md`** — índice: seu conteúdo vs `reference/`
- **`Docs/reference/`** — `01-github`, `02-convex`, `03-easypanel`, `04-optional-rules`
- **`renumber-plans.sh`** — ordenação por `created` ou mtime (não birth time)

## Para onde vamos

- Salvar prompts em `Docs/Prompts/` sem medo do commit alterar texto
- Consultar `Docs/README.md` para achar doc certa
- Legado: `./scripts/normalize-prompts.sh --full` se precisar slug/inbox
