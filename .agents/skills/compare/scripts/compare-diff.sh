#!/usr/bin/env bash
# compare-diff.sh — Diff determinístico origem (fork) vs destino (template)
# Uso: ./.agents/skills/compare/scripts/compare-diff.sh SOURCE [DEST]

set -e

if [ $# -lt 1 ] || [ -z "$1" ]; then
  echo "Uso: $0 SOURCE [DEST]" >&2
  exit 1
fi

SOURCE="$(cd "$1" && pwd)"
DEST="${2:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
DEST="$(cd "$DEST" && pwd)"

if [ ! -d "$SOURCE" ]; then
  echo "SOURCE não encontrado: $SOURCE" >&2
  exit 1
fi

if [ ! -d "$DEST" ]; then
  echo "DEST não encontrado: $DEST" >&2
  exit 1
fi

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

rel() {
  local root="$1" file="$2"
  echo "${file#"$root"/}"
}

collect_rel_files() {
  local root="$1"
  shift
  local spec f
  for spec in "$@"; do
    if [ -d "$root" ]; then
      while IFS= read -r f; do
        [ -n "$f" ] && rel "$root" "$f"
      done < <(find "$root" -path "$root/$spec" -type f 2>/dev/null | sort)
    fi
  done | sort -u
}

hash_file() {
  if [ -f "$1" ]; then
    shasum -a 256 "$1" 2>/dev/null | awk '{print $1}'
  else
    echo "missing"
  fi
}

plans_gitignore_status() {
  local root="$1" label="$2"
  local file="$root/.gitignore"
  if [ ! -f "$file" ]; then
    echo "| $label | (sem .gitignore) |"
    return
  fi
  local line num content
  line=$(grep -n '\.cursor/plans' "$file" 2>/dev/null | head -1 || true)
  if [ -z "$line" ]; then
    echo "| $label | (sem linha .cursor/plans) |"
    return
  fi
  num="${line%%:*}"
  content="${line#*:}"
  if echo "$content" | grep -q '^[[:space:]]*#'; then
    echo "| $label | comentada (versiona plans) — linha $num |"
  else
    echo "| $label | **ativa** (ignora plans) — linha $num |"
  fi
}

compare_area() {
  local title="$1"
  shift
  local specs=("$@")

  echo "### $title"
  echo ""

  collect_rel_files "$SOURCE" "${specs[@]}" > "$TMP/source.list"
  collect_rel_files "$DEST" "${specs[@]}" > "$TMP/dest.list"

  echo "#### Só na origem"
  if comm -23 "$TMP/source.list" "$TMP/dest.list" | grep -q .; then
    comm -23 "$TMP/source.list" "$TMP/dest.list" | sed 's/^/- `/' | sed 's/$/`/'
  else
    echo "(nenhum)"
  fi
  echo ""

  echo "#### Só no destino (template)"
  if comm -13 "$TMP/source.list" "$TMP/dest.list" | grep -q .; then
    comm -13 "$TMP/source.list" "$TMP/dest.list" | sed 's/^/- `/' | sed 's/$/`/'
  else
    echo "(nenhum)"
  fi
  echo ""

  echo "#### Alterados (hash diferente)"
  local changed=0 rel_path sf df
  while IFS= read -r rel_path; do
    [ -z "$rel_path" ] && continue
    sf="$SOURCE/$rel_path"
    df="$DEST/$rel_path"
    if [ "$(hash_file "$sf")" != "$(hash_file "$df")" ]; then
      echo "- \`$rel_path\`"
      changed=1
    fi
  done < <(comm -12 "$TMP/source.list" "$TMP/dest.list")
  [ "$changed" -eq 0 ] && echo "(nenhum)"
  echo ""

  echo "#### Idênticos"
  local identical=0
  while IFS= read -r rel_path; do
    [ -z "$rel_path" ] && continue
    sf="$SOURCE/$rel_path"
    df="$DEST/$rel_path"
    if [ "$(hash_file "$sf")" = "$(hash_file "$df")" ]; then
      identical=$((identical + 1))
    fi
  done < <(comm -12 "$TMP/source.list" "$TMP/dest.list")
  echo "$identical arquivo(s)"
  echo ""
}

echo "# Compare diff"
echo ""
echo "**Origem:** \`$SOURCE\`"
echo "**Destino:** \`$DEST\`"
echo "**Data:** $(date +"%d-%m-%y %H:%M")"
echo ""

echo "## Stack (origem vs destino)"
echo "| Sinal | Origem | Destino |"
echo "|-------|--------|---------|"
for item in "app/" "app/convex/" "server.js" "Docs/Prompts/" "scripts/commit-push.sh"; do
  o="não"; d="não"
  [ -e "$SOURCE/$item" ] && o="sim"
  [ -e "$DEST/$item" ] && d="sim"
  echo "| \`$item\` | $o | $d |"
done
echo ""

compare_area "Rules" ".cursor/rules/*.mdc"
compare_area "Skills" ".agents/skills" ".agents/skills/*/SKILL.md" ".agents/skills/*/*.md" ".agents/skills/*/*.sh" ".agents/skills/*/*/*.sh"
compare_area "Scripts" "scripts/*.sh" "scripts/lib/*.sh"

echo "## Gitignore — .cursor/plans/"
echo "| Repo | Status |"
echo "|------|--------|"
plans_gitignore_status "$SOURCE" "Origem"
plans_gitignore_status "$DEST" "Destino"
echo ""
