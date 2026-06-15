# Node simples — public + Express + SQLite

Preset para projetos leves: front estático em `public/`, API em `server.js`, dados em `data/`.

## Estrutura na raiz (após scaffold)

```text
├── public/
│   └── index.html
├── data/
│   └── .gitkeep          # database.sqlite criado em runtime
├── package.json
├── server.js
└── ...
```

## Gerar scaffold

```bash
./scripts/scaffold-easypanel-simple.sh {project-name}
# npm install roda por padrão (gera package-lock.json); --skip-install para pular
```

## Desenvolvimento local

```bash
./scripts/dev-simple.sh
# ou: PORT=4000 ./scripts/dev-simple.sh
```

### Fallback de porta

`server.js` tenta `process.env.PORT` ou **3000**. Se ocupada (`EADDRINUSE`), tenta 3001, 3002… até `basePort + 50`.

- Log: `Porta 3000 ocupada — tentando 3001`
- Sucesso: `Servidor em http://localhost:3001`

Conveniência para dev local. Em produção o Easypanel injeta `PORT` no container isolado — primeira tentativa costuma bastar.

## package.json

Nixpacks lê `package.json` e roda `npm start` → `node server.js`. Comandos custom no painel podem ficar vazios.

## server.js — responsabilidades

1. Servir estáticos de `public/`
2. SQLite em `data/database.sqlite`
3. Rotas de API (exemplo: `/api/health`, `/api/items`)
4. `listenWithFallback` para porta local

## SQLite

- Arquivo: `data/database.sqlite` (criado automaticamente)
- **Não commitar** `.sqlite` — `.gitignore` já ignora `data/*.sqlite` e `data/*.db`
- Em produção: volume Easypanel em `/app/data` (ver [easypanel-panel.md](easypanel-panel.md))

## .gitignore

```text
data/*.sqlite
data/*.db
```

## Customizar

1. Editar `public/` (HTML, CSS, JS)
2. Adicionar rotas em `server.js`
3. Ajustar schema SQLite nas queries `CREATE TABLE` / `db.run`

O scaffold inclui CRUD stub em `/api/items` — substitua pelo domínio do seu app.
