#!/usr/bin/env bash
# report-path.sh — Próximo path disponível para compare de hoje
# Uso: ./.agents/skills/compare/scripts/report-path.sh <slug>
# slug: basename do repo origem (ex.: solo-os)

set -e

if [ $# -lt 1 ] || [ -z "$1" ]; then
  echo "Uso: $0 <slug>" >&2
  exit 1
fi

SLUG="$1"
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

DATE=$(date +"%d-%m-%y")
DIR="Docs/Aprendizados do Projeto"
BASE="$DIR/compare-${SLUG}-${DATE}.md"

if [ ! -f "$BASE" ]; then
  echo "$BASE"
  exit 0
fi

n=2
while [ -f "$DIR/compare-${SLUG}-${DATE}-${n}.md" ]; do
  n=$((n + 1))
done
echo "$DIR/compare-${SLUG}-${DATE}-${n}.md"
