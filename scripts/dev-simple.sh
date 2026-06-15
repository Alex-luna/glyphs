#!/usr/bin/env bash
# dev-simple.sh — Dev local do preset Easypanel (Express + SQLite)
# Uso: ./scripts/dev-simple.sh
#      PORT=4000 ./scripts/dev-simple.sh

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [ ! -f "server.js" ]; then
  echo "[dev-simple] Erro: server.js não encontrado na raiz"
  echo "[dev-simple] Rode: ./scripts/scaffold-easypanel-simple.sh meu-projeto"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "[dev-simple] node_modules ausente — npm install..."
  npm install
fi

echo "[dev-simple] Iniciando server.js (PORT=${PORT:-3000}, fallback automático se ocupada)"
node server.js
