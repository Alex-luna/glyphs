#!/usr/bin/env bash
# scaffold-easypanel-simple.sh — Copia preset Easypanel para a raiz do repo
# Uso: ./scripts/scaffold-easypanel-simple.sh [nome-do-projeto] [--skip-install]

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
SCAFFOLD_DIR="$REPO_ROOT/Docs/reference/03-easypanel/scaffold"
PROJECT_NAME="${1:-my-app}"
SKIP_INSTALL=0

for arg in "$@"; do
  [ "$arg" = "--skip-install" ] && SKIP_INSTALL=1
done

if [ "$PROJECT_NAME" = "--skip-install" ]; then
  PROJECT_NAME="my-app"
fi

if [ ! -d "$SCAFFOLD_DIR" ]; then
  echo "[scaffold] Erro: $SCAFFOLD_DIR não encontrado"
  exit 1
fi

if [ -f "$REPO_ROOT/server.js" ]; then
  echo "[scaffold] Aviso: server.js já existe na raiz — abortando (idempotente)"
  exit 1
fi

echo "[scaffold] Copiando preset Easypanel para raiz (projeto: $PROJECT_NAME)"

cp -R "$SCAFFOLD_DIR/public" "$REPO_ROOT/"
cp -R "$SCAFFOLD_DIR/data" "$REPO_ROOT/"
cp "$SCAFFOLD_DIR/server.js" "$REPO_ROOT/"
cp "$SCAFFOLD_DIR/package.json" "$REPO_ROOT/"

sed -i '' "s/{project-name}/$PROJECT_NAME/g" "$REPO_ROOT/package.json" 2>/dev/null \
  || sed -i "s/{project-name}/$PROJECT_NAME/g" "$REPO_ROOT/package.json"

GITIGNORE="$REPO_ROOT/.gitignore"
for line in "data/*.sqlite" "data/*.db"; do
  if ! grep -qxF "$line" "$GITIGNORE" 2>/dev/null; then
    echo "$line" >> "$GITIGNORE"
    echo "[scaffold] .gitignore += $line"
  fi
done

echo "[scaffold] OK — public/, data/, server.js, package.json na raiz"

if [ "$SKIP_INSTALL" -eq 0 ]; then
  echo "[scaffold] Rodando npm install (gera package-lock.json)..."
  (cd "$REPO_ROOT" && npm install)
  echo "[scaffold] Commitar package-lock.json antes do deploy no Easypanel"
else
  echo "[scaffold] --skip-install: rode npm install e commite package-lock.json antes do deploy"
fi

echo "[scaffold] Próximo: ./scripts/dev-simple.sh"
