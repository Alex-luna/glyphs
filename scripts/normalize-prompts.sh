#!/usr/bin/env bash
# normalize-prompts.sh — Docs/Prompts/ (default: light; --full = legado)
# Chamado por commit-push.sh. Uso: ./scripts/normalize-prompts.sh [--full]

set -e
REPO_ROOT="$(git rev-parse --show-toplevel)"
PROMPTS_DIR="$REPO_ROOT/Docs/Prompts"
INBOX_DIR="$PROMPTS_DIR/inbox"
MODE="light"

for arg in "$@"; do
  [ "$arg" = "--full" ] && MODE="full"
done

# shellcheck source=lib/prompt-normalize.sh
source "$REPO_ROOT/scripts/lib/prompt-normalize.sh"

[ ! -d "$PROMPTS_DIR" ] && exit 0

mkdir -p "$INBOX_DIR"

if [ "$MODE" = "light" ]; then
  shopt -s nullglob
  for f in "$PROMPTS_DIR"/*.md; do
    [ -f "$f" ] || continue
    [ "$(basename "$f")" = "README.md" ] && continue
    pn_prepend_minimal_frontmatter "$f"
  done
  pn_renumber_prompts_dir "$PROMPTS_DIR"
  exit 0
fi

# --- full (legacy) ---
shopt -s nullglob

candidates=()
for f in "$PROMPTS_DIR"/*.md "$INBOX_DIR"/*.md; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  [ "$base" = "README.md" ] && continue
  candidates+=("$f")
done
for f in "$PROMPTS_DIR"/*; do
  [ -f "$f" ] || continue
  [[ "$f" == *.md ]] && continue
  [ "$(basename "$f")" = "README.md" ] && continue
  candidates+=("$f")
done

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

for src in "${candidates[@]}"; do
  [ -f "$src" ] || continue

  fm=$(mktemp "$work/fm.XXXXXX")
  body=$(mktemp "$work/body.XXXXXX")
  pn_split_file "$src" "$fm" "$body"

  birth=$(pn_birth_date "$src")
  promote=0
  pn_body_nonempty "$body" && promote=1

  slug=$(pn_fm_get "$fm" slug)
  [ -z "$slug" ] && slug=$(pn_slug_from_title "$(pn_title_from_filename "$src")")

  if pn_body_nonempty "$body"; then
    dest="$PROMPTS_DIR/${slug}.md"
    label="ok"
  else
    dest="$INBOX_DIR/${slug}.md"
    label="stub"
  fi

  pn_write_with_frontmatter "$dest" "$fm" "$body" "$birth" "$promote"

  src_abs=$(cd "$(dirname "$src")" && pwd)/$(basename "$src")
  dest_abs=$(cd "$(dirname "$dest")" && pwd)/$(basename "$dest")
  [ "$src_abs" != "$dest_abs" ] && rm -f "$src"

  rel="${dest#$PROMPTS_DIR/}"
  echo "prompt: ${rel} (${label})"
done

pn_renumber_prompts_dir "$PROMPTS_DIR"
