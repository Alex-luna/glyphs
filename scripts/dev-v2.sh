#!/usr/bin/env bash
# dev-v2.sh — Inicia o app com Convex + Next.js (bind em todas as interfaces)
# Uso: ./scripts/dev-v2.sh
# Faz: push Convex + next dev com -H 0.0.0.0 (Node resolve sempre; acesso via localhost + IP LAN)
#      Se `hostname`.local não resolver no Node, next dev quebra com ENOTFOUND — por isso o default é 0.0.0.0.
#
# Customizar bind: DEV_NETWORK_HOST=192.168.1.100 ./scripts/dev-v2.sh
# Ou mDNS (se resolver no teu Mac): DEV_NETWORK_HOST="$(hostname).local" ./scripts/dev-v2.sh
# Porta fixa (override: PORT=4000 ./scripts/dev-v2.sh)
LINHA_MESTRA_PORT=3015

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
APP_DIR="$REPO_ROOT/app"
cd "$APP_DIR"

# hostname.local para mensagens (mDNS); bind padrão 0.0.0.0 evita ENOTFOUND no next dev
_H="$(hostname)"
[[ "$_H" == *.local ]] || _H="${_H}.local"
BIND_HOST="${DEV_NETWORK_HOST:-0.0.0.0}"
PORT="${PORT:-$LINHA_MESTRA_PORT}"
_LAN="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

echo "[dev-v2] Sincronizando Convex..."
npx convex dev --once

echo "[dev-v2] Iniciando Next.js (bind ${BIND_HOST}:${PORT})"
echo "[dev-v2] local: http://localhost:${PORT}"
if [[ -n "$_LAN" ]]; then
  echo "[dev-v2] rede (LAN): http://${_LAN}:${PORT}"
fi
echo "[dev-v2] (mDNS neste Mac, se o cliente resolver: http://${_H}:${PORT})"
npm run dev -- -H "$BIND_HOST" -p "$PORT"
