#!/usr/bin/env bash
# report-path.sh — Próximo path disponível para raio-x de hoje
# Uso: ./.agents/skills/repo-audit/scripts/report-path.sh

set -e

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

DATE=$(date +"%d-%m-%y")
DIR="Docs/Aprendizados do Projeto"
BASE="$DIR/raio-x-${DATE}.md"

if [ ! -f "$BASE" ]; then
  echo "$BASE"
  exit 0
fi

n=2
while [ -f "$DIR/raio-x-${DATE}-${n}.md" ]; do
  n=$((n + 1))
done
echo "$DIR/raio-x-${DATE}-${n}.md"
