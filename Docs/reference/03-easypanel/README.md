# Easypanel — preset projetos simples

Deploy de apps **HTML/JS + Express + SQLite** na VPS via [Easypanel](https://easypanel.io/) (Nixpacks).

## Quando usar

| Use este preset | Não use (use outro fluxo) |
|-----------------|---------------------------|
| App simples: `public/` + API Node na raiz | Banco gerenciado externo |
| SQLite local persistente em `data/` | Deploy serverless puro |
| Deploy via GitHub → Easypanel (Build Path `/`) | — |
| Next em `app/` no Easypanel (Build Path `/app`) | — |
| Next + Convex (Vercel ou Easypanel) | — |

## Início rápido

```bash
./scripts/scaffold-easypanel-simple.sh meu-projeto
./scripts/dev-simple.sh
# editar public/ e server.js
./scripts/commit-push.sh "feat: init app simples"
```

Depois: [easypanel-panel.md](easypanel-panel.md) — conectar repo, volume `/app/data`, deploy.

## Documentação

| Arquivo | Conteúdo |
|---------|----------|
| [simple-node.md](simple-node.md) | Estrutura, `server.js`, SQLite, fallback de porta |
| [easypanel-panel.md](easypanel-panel.md) | Checklist no painel Easypanel |
| [scaffold/](scaffold/) | Arquivos fonte copiados pelo script |

## Scaffold

O template **não** commita app runnable na raiz. O script copia `Docs/reference/03-easypanel/scaffold/` para a raiz do fork.
