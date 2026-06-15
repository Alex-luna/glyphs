# Easypanel — checklist no painel

## TL;DR (~2 min)

1. **Pré-voo:** `package-lock.json` commitado; SQLite em `data/` (app simples); push no GitHub
2. **App** → GitHub → branch `main`
3. **Build Path:** `/` (Express na raiz) ou `/app` (Next em subpasta) → **Save**
4. **Nixpacks** — Install / Build / Start **vazios**
5. **Storage** → volume em `/app/data` (obrigatório se usar SQLite)
6. **Environment** → vars do seu app (ex.: `NEXT_PUBLIC_*`, tokens de API)
7. **Deploy** → conferir logs → abrir URL

Checklist detalhado abaixo.

---

## Pré-voo (Git)

- `package-lock.json` presente e commitado — Nixpacks usa `npm ci`; sem lockfile o build falha
- App simples: SQLite referencia `data/` (scaffold já faz isso)
- Push feito (`./scripts/commit-push.sh`)
- Easypanel instalado na VPS

## Build Path

| Estrutura do repo | Build Path no Easypanel |
|-------------------|-------------------------|
| `server.js` + `public/` na raiz | `/` |
| Next.js em `app/` | `/app` |

Salve a aba Source antes de mudar para Storage ou Environment.

## 1. Criar app

1. Easypanel → **Create** → **App**
2. Fonte: **GitHub** → selecionar o repositório
3. Branch: `main` (ou a que você usa)
4. **Build Path** conforme tabela acima

## 2. Build (Nixpacks)

Nixpacks detecta Node via `package.json`.

| Campo | Valor |
|-------|-------|
| Install | *(vazio — Nixpacks usa `npm install` ou `npm ci`)* |
| Build | *(vazio)* |
| Start | *(vazio — usa `npm start` ou script detectado)* |

Next em `/app`: Nixpacks roda build/start dentro dessa pasta.

## 3. Storage — obrigatório para SQLite

Antes do primeiro deploy (ou logo após criar o app):

1. Aba **Storage**
2. **Add Volume**
3. **Mount Path:** `/app/data`

Sem isso o SQLite some a cada redeploy. Next puro sem SQLite local na raiz: volume opcional.

## 4. Environment

1. Aba **Environment**
2. Adicione as variáveis do seu app (secrets, `NEXT_PUBLIC_*`, URLs de backend, etc.)
3. **Save**

Não commitar secrets no repo — só no painel.

## 5. Deploy

1. **Deploy** (ou push no GitHub se auto-deploy ligado)
2. Ver logs:
   - App simples: `SQLite pronto` e `Servidor em http://localhost:PORT`
   - Next: build concluído sem erro
3. Abrir domínio gerado pelo Easypanel

## 6. Domínio (opcional)

1. Aba **Domains**
2. Adicionar domínio custom ou usar subdomínio Easypanel
3. HTTPS costuma ser automático (Let's Encrypt)

## Produção vs local

| | Local | Easypanel |
|---|-------|-----------|
| Porta | Fallback 3000→3001… | `PORT` injetado pelo painel |
| SQLite | `data/database.sqlite` | Mesmo path, volume em `/app/data` |
| Deploy | `./scripts/dev-simple.sh` | Push GitHub → rebuild |

## Troubleshooting

| Problema | Verificar |
|----------|-----------|
| Build falha no install | `package-lock.json` commitado? |
| App não sobe | Logs: `npm install` / `node server.js` erros |
| Dados somem | Volume `/app/data` configurado? |
| 502 / timeout | App escutando `process.env.PORT`? |
| Site estático sem API | `server.js` na raiz? Nixpacks rodando `npm start`? |
| Next não builda | Build Path `/app`? `package.json` dentro de `app/`? |
