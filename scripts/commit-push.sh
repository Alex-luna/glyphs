#!/usr/bin/env bash
# commit-push.sh — Commit e push com mensagem oneliner
# Uso: ./scripts/commit-push.sh "mensagem do commit"
# Faz: git add ., git commit -m "...", git push origin <branch>

set -e

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "[commit-push] Erro: mensagem obrigatória. Uso: ./scripts/commit-push.sh \"mensagem\""
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib/github-auth.sh
source "$SCRIPT_DIR/lib/github-auth.sh"

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# Renumerar plans e normalizar prompts antes do commit
[ -f "$REPO_ROOT/scripts/renumber-plans.sh" ] && "$REPO_ROOT/scripts/renumber-plans.sh" || true
[ -f "$REPO_ROOT/scripts/normalize-prompts.sh" ] && "$REPO_ROOT/scripts/normalize-prompts.sh" || true

BRANCH=$(git branch --show-current)
echo "[commit-push] Branch: $BRANCH | Mensagem: $MSG"

git add .
git status --short
git commit -m "$MSG"

lm_github_ensure_push_remote
git push origin "$BRANCH"

echo "[commit-push] OK — commit e push concluídos"
