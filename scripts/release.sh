#!/usr/bin/env bash
# release.sh — Cria release no GitHub via gh CLI
# Uso:
#   ./scripts/release.sh v0.1.0 --notes "texto"
#   ./scripts/release.sh v0.1.0 --notes-file releases/release-notes-v0.1.0.md
#   ./scripts/release.sh v0.1.0   # usa --generate-notes
# Auth/push: scripts/lib/github-auth.sh (GH_TOKEN inválido + SSH automático)

set -e

VERSION="${1:-}"
if [ -z "$VERSION" ]; then
  echo "[release] Erro: versão obrigatória. Uso: ./scripts/release.sh v0.1.0 [--notes \"...\" | --notes-file PATH]"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib/github-auth.sh
source "$SCRIPT_DIR/lib/github-auth.sh"

lm_github_ensure_gh

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# Bump app/package.json para a versão do release (exibida no Footer)
VERSION_NUM="${VERSION#v}"
if [ -f "app/package.json" ]; then
  echo "[release] Atualizando app/package.json para $VERSION_NUM"
  (cd app && npm version "$VERSION_NUM" --no-git-tag-version --allow-same-version)
  git add app/package.json app/package-lock.json 2>/dev/null || true
  if git diff --staged --quiet 2>/dev/null; then
    : # no changes
  else
    git commit -m "chore: bump version to $VERSION"
    echo "[release] Commit de versão criado."
  fi
fi

lm_github_ensure_push_remote
lm_github_push

shift || true

if [ "$1" = "--notes" ]; then
  shift
  echo "[release] Criando release $VERSION com --notes"
  gh release create "$VERSION" --notes "$*"
elif [ "$1" = "--notes-file" ] && [ -n "$2" ]; then
  FILE="$2"
  if [ ! -f "$FILE" ]; then
    echo "[release] Erro: arquivo não encontrado: $FILE"
    exit 1
  fi
  echo "[release] Criando release $VERSION com notas de $FILE"
  gh release create "$VERSION" -F "$FILE"
else
  echo "[release] Criando release $VERSION com --generate-notes"
  gh release create "$VERSION" --generate-notes
fi

lm_github_push

echo "[release] OK — $VERSION publicado"
