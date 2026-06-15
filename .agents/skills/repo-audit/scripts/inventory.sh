#!/usr/bin/env bash
# inventory.sh — Inventário determinístico para repo-audit skill
# Uso: ./.agents/skills/repo-audit/scripts/inventory.sh

set -e

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

count_lines() {
  local dir="$1"
  local name="$2"
  if [ -d "$dir" ]; then
    find "$dir" -type f -name "$name" 2>/dev/null | wc -l | tr -d ' '
  else
    echo "0"
  fi
}

sum_lines() {
  local dir="$1"
  local name="$2"
  if [ -d "$dir" ]; then
    find "$dir" -type f -name "$name" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}'
  else
    echo "0"
  fi
}

flag() { [ -e "$1" ] && echo "sim" || echo "não"; }

echo "# Repo inventory"
echo ""
echo "Root: \`$REPO_ROOT\`"
echo "Date: $(date +"%d-%m-%y %H:%M")"
echo ""

echo "## Stack detectada"
echo "| Item | Presente |"
echo "|------|----------|"
echo "| \`app/\` (Next) | $(flag app) |"
echo "| \`app/convex/\` | $(flag app/convex) |"
echo "| \`server.js\` na raiz | $(flag server.js) |"
echo "| \`Docs/Prompts/\` | $(flag Docs/Prompts) |"
echo "| \`Design-System/\` | $(flag Design-System) |"
echo ""

echo "## Contagens"
echo "| Área | Arquivos | Linhas (aprox.) |"
echo "|------|----------|-----------------|"
echo "| \`.cursor/rules/*.mdc\` | $(count_lines .cursor/rules '*.mdc') | $(sum_lines .cursor/rules '*.mdc') |"
echo "| \`.agents/skills/\` | $(find .agents/skills -type f -name 'SKILL.md' 2>/dev/null | wc -l | tr -d ' ') skills | — |"
echo "| \`Docs/\` (md) | $(count_lines Docs '*.md') | $(sum_lines Docs '*.md') |"
echo "| \`scripts/\` (sh) | $(count_lines scripts '*.sh') | $(sum_lines scripts '*.sh') |"
echo ""

echo "## Rules"
if [ -d .cursor/rules ]; then
  for f in .cursor/rules/*.mdc; do
    [ -f "$f" ] || continue
    lines=$(wc -l < "$f" | tr -d ' ')
    always=$(grep -m1 '^alwaysApply:' "$f" 2>/dev/null | sed 's/alwaysApply: //' || echo "?")
    echo "- \`$(basename "$f")\` — ${lines} linhas, alwaysApply: ${always}"
  done
else
  echo "(sem .cursor/rules/)"
fi
echo ""

echo "## Skills"
if [ -d .agents/skills ]; then
  for f in .agents/skills/*/SKILL.md; do
    [ -f "$f" ] || continue
    lines=$(wc -l < "$f" | tr -d ' ')
    echo "- \`$(basename "$(dirname "$f")")\` — ${lines} linhas"
  done
else
  echo "(sem .agents/skills/)"
fi
echo ""

echo "## Alertas"
if [ -d .cursor/plans ] && [ "$(ls -A .cursor/plans 2>/dev/null | wc -l | tr -d ' ')" -gt 0 ]; then
  tracked=$(git ls-files .cursor/plans 2>/dev/null | wc -l | tr -d ' ')
  echo "- \`.cursor/plans/\` tem arquivos ($tracked versionados no git)"
fi
if [ -d Docs/images ] && [ -z "$(ls -A Docs/images 2>/dev/null)" ]; then
  echo "- \`Docs/images/\` vazia"
fi
if [ -f package.json ] && [ ! -f package-lock.json ]; then
  echo "- \`package.json\` na raiz sem \`package-lock.json\`"
fi
if [ -f app/package.json ] && [ ! -f app/package-lock.json ]; then
  echo "- \`app/package.json\` sem \`app/package-lock.json\`"
fi
