const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const BASE_PORT = parseInt(process.env.PORT, 10) || 3000;
const MAX_PORT_OFFSET = 50;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erro ao abrir SQLite:', err.message);
  else console.log('SQLite pronto em:', dbPath);
});

db.run(`CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/items', (_req, res) => {
  db.all('SELECT * FROM items ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/items', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title obrigatório' });
  db.run('INSERT INTO items (title) VALUES (?)', [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title });
  });
});

function listenWithFallback(basePort, maxPort, onListening) {
  const tryPort = (port) => {
    if (port > maxPort) {
      console.error(`Nenhuma porta livre entre ${basePort} e ${maxPort}`);
      process.exit(1);
    }
    const server = app.listen(port, () => onListening(port));
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Porta ${port} ocupada — tentando ${port + 1}`);
        tryPort(port + 1);
      } else {
        throw err;
      }
    });
  };
  tryPort(basePort);
}

listenWithFallback(BASE_PORT, BASE_PORT + MAX_PORT_OFFSET, (port) => {
  console.log(`Servidor em http://localhost:${port}`);
});
