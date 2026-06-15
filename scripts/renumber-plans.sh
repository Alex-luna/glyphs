#!/usr/bin/env bash
# renumber-plans.sh — Renumera .cursor/plans/*.plan.md (01_ = mais antigo)
# Sort: frontmatter created → mtime. Chamado por commit-push.sh.

set -e
REPO_ROOT="$(git rev-parse --show-toplevel)"
PLANS_DIR="$REPO_ROOT/.cursor/plans"
[ ! -d "$PLANS_DIR" ] && exit 0

plan_sort_key() {
  local file="$1"
  local created
  created=$(awk '
    NR == 1 && $0 == "---" { in_fm = 1; next }
    in_fm && $0 == "---" { exit }
    in_fm && $0 ~ /^created:/ {
      sub(/^created:[[:space:]]*/, "")
      gsub(/'\''|"/, "")
      print
      exit
    }
  ' "$file" 2>/dev/null)
  if [ -n "$created" ]; then
    echo "$created" | tr -d '-'
  else
    stat -f '%m' "$file" 2>/dev/null || echo "0"
  fi
}

cd "$PLANS_DIR"
shopt -s nullglob
list=()
while IFS= read -r f; do
  [ -n "$f" ] && list+=("$f")
done < <(
  for f in *.plan.md; do
    [ -f "$f" ] && printf '%s %s\n' "$(plan_sort_key "$f")" "$f"
  done | sort -n -k1,1 | cut -d' ' -f2-
)

n=${#list[@]}
[ "$n" -eq 0 ] && exit 0

i=$n
while [ "$i" -ge 1 ]; do
  src="${list[i-1]}"
  base=$(basename "$src")
  canonical=$(echo "$base" | sed -E 's/^[0-9]{1,}_//')
  target=$(printf '%02d_%s' "$i" "$canonical")
  [ "$base" != "$target" ] && mv "$src" "$target"
  i=$(( i - 1 ))
done
