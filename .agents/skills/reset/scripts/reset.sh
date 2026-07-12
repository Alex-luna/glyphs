#!/usr/bin/env bash
set -e
REPO_ROOT="$(git rev-parse --show-toplevel)"
PLANS_DIR="$REPO_ROOT/.cursor/plans"

deleted=0
if [ -d "$PLANS_DIR" ]; then
  shopt -s nullglob
  for f in "$PLANS_DIR"/*.plan.md; do
    rm -f "$f"
    deleted=$((deleted + 1))
  done
fi

printf '# Changelogs\n' > "$REPO_ROOT/changelogs.md"

echo "[reset] plans removidos: $deleted | changelogs.md → só título"
