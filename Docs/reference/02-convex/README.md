# Convex

- Docs: https://docs.convex.dev
- Dev: `cd app && npx convex dev` (cria `.env.local`, faz push)
- Deploy: `npx convex deploy` ou `npx convex codegen` em CI

Após criar ou alterar arquivos em `app/convex/` ou o schema, é obrigatório deploy antes de testar — ver `.cursor/rules/convex-module-deploy.mdc`.
