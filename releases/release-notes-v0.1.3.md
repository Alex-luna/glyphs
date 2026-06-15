## De onde viemos

[v0.1.2](https://github.com/Alex-luna/template-simple-v3/releases/tag/v0.1.2) — caveman always-on; nota Easypanel solta em `easypanel.md`.

## Onde estamos

- **Preset Easypanel** completo para apps simples: `public/` + Express + SQLite
- **`Docs/easypanel/`** — README, guias Node e painel, pasta `scaffold/`
- **Scripts** — `scaffold-easypanel-simple.sh`, `dev-simple.sh`
- **`server.js`** — fallback automático de porta (3000 → 3001… se ocupada)
- **Rule `easypanel-simple.mdc`** — agent segue preset quando `server.js` existe na raiz
- **FORK + README** — passo 10 e seção deploy simples; `.gitignore` para SQLite

## Para onde vamos

- Fork → scaffold → dev local → push → Easypanel com volume `/app/data`
- Next/Convex continuam fluxo separado (`app/` + `template-onboarding`)
