#!/usr/bin/env bash
# prompt-normalize.sh — helpers Docs/Prompts (light + full legacy)

pn_today() { date '+%Y-%m-%d'; }

pn_birth_date() {
  stat -f '%SB' -t '%Y-%m-%d' "$1" 2>/dev/null || pn_today
}

pn_mtime_sort_key() {
  stat -f '%m' "$1" 2>/dev/null || echo "0"
}

pn_mtime_date() {
  stat -f '%Sm' -t '%Y-%m-%d' "$1" 2>/dev/null || pn_today
}

pn_kebab() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g; s/-+$//'
}

pn_strip_number_prefix() {
  basename "$1" | sed -E 's/^[0-9]{1,}_//'
}

pn_title_from_filename() {
  local base
  base=$(pn_strip_number_prefix "$1")
  base="${base%.md}"
  base=$(echo "$base" | sed -E 's/^[Pp]rompt-//')
  echo "$base" | tr '-' ' ' | awk '{
    for (i = 1; i <= NF; i++) {
      w = $i
      $i = toupper(substr(w, 1, 1)) substr(w, 2)
    }
    print
  }'
}

pn_slug_from_title() {
  local k
  k=$(pn_kebab "$1")
  [ -z "$k" ] && k="untitled"
  case "$k" in
    prompt-*) echo "$k" ;;
    *) echo "prompt-$k" ;;
  esac
}

pn_extract_h1() {
  local body_file="$1"
  grep -m1 -E '^#[[:space:]]+' "$body_file" 2>/dev/null | sed -E 's/^#[[:space:]]+//'
}

pn_body_nonempty() {
  local body_file="$1"
  grep -q '[^[:space:]]' "$body_file" 2>/dev/null
}

pn_has_frontmatter() {
  head -1 "$1" 2>/dev/null | grep -qx -- '---'
}

pn_split_file() {
  local file="$1"
  local fm_out="$2"
  local body_out="$3"
  : > "$fm_out"
  : > "$body_out"
  PN_HAS_FM=0

  [ ! -f "$file" ] && return 1

  if ! pn_has_frontmatter "$file"; then
    cp "$file" "$body_out"
    return 0
  fi

  PN_HAS_FM=1
  awk '
    BEGIN { in_fm = 0; fm_done = 0 }
    NR == 1 && $0 == "---" { in_fm = 1; next }
    in_fm && $0 == "---" { in_fm = 0; fm_done = 1; next }
    in_fm { print > fm; next }
    fm_done || (!in_fm && NR > 1) { print > body }
  ' fm="$fm_out" body="$body_out" "$file"
}

pn_fm_get() {
  local fm_file="$1"
  local key="$2"
  grep -E "^${key}:" "$fm_file" 2>/dev/null | head -1 | sed -E "s/^${key}:[[:space:]]*//; s/^['\"]//; s/['\"]$//"
}

# Sort key: frontmatter created (YYYYMMDD) → mtime unix
pn_prompt_sort_key() {
  local file="$1"
  local work fm body created
  work=$(mktemp -d)
  fm="$work/fm"
  body="$work/body"
  pn_split_file "$file" "$fm" "$body"
  created=$(pn_fm_get "$fm" created)
  rm -rf "$work"
  if [ -n "$created" ]; then
    echo "$created" | tr -d '-'
  else
    pn_mtime_sort_key "$file"
  fi
}

# Prepend minimal FM only when absent; body untouched
pn_prepend_minimal_frontmatter() {
  local file="$1"
  pn_has_frontmatter "$file" && return 0

  local title created tmp
  title=$(pn_title_from_filename "$file")
  created=$(pn_mtime_date "$file")
  tmp=$(mktemp)
  {
    echo "---"
    echo "type: prompt"
    echo "title: ${title}"
    echo "created: ${created}"
    echo "---"
    echo ""
    cat "$file"
  } > "$tmp"
  mv "$tmp" "$file"
  echo "prompt: frontmatter + $(basename "$file")"
}

# Renumber NN_ prefix: 01 = oldest, NN = newest
pn_renumber_prompts_dir() {
  local dir="$1"
  local list=() sort_lines line f n i base canonical target src

  cd "$dir" || return 0
  shopt -s nullglob

  sort_lines=$(
    for f in *.md; do
      [ -f "$f" ] || continue
      [ "$f" = "README.md" ] && continue
      printf '%s %s\n' "$(pn_prompt_sort_key "$f")" "$f"
    done | sort -n -k1,1
  )

  while IFS= read -r line; do
    [ -n "$line" ] || continue
    f="${line#* }"
    list+=("$f")
  done <<< "$sort_lines"

  n=${#list[@]}
  [ "$n" -eq 0 ] && return 0

  i=$n
  while [ "$i" -ge 1 ]; do
    src="${list[i-1]}"
    base=$(basename "$src")
    canonical=$(echo "$base" | sed -E 's/^[0-9]{1,}_//')
    target=$(printf '%02d_%s' "$i" "$canonical")
    if [ "$base" != "$target" ]; then
      mv "$src" "$target"
      echo "prompt: renumber ${base} -> ${target}"
    fi
    i=$(( i - 1 ))
  done
}

# --- full mode (legacy) ---

pn_write_with_frontmatter() {
  local dest="$1"
  local fm_file="$2"
  local body_file="$3"
  local birth_date="$4"
  local promote="${5:-0}"

  local type title slug status pipeline created updated
  local default_title default_slug h1

  default_title=$(pn_title_from_filename "$dest")
  default_slug=$(pn_slug_from_title "$default_title")

  type=$(pn_fm_get "$fm_file" type)
  title=$(pn_fm_get "$fm_file" title)
  slug=$(pn_fm_get "$fm_file" slug)
  status=$(pn_fm_get "$fm_file" status)
  pipeline=$(pn_fm_get "$fm_file" pipeline)
  created=$(pn_fm_get "$fm_file" created)
  updated=$(pn_fm_get "$fm_file" updated)

  h1=$(pn_extract_h1 "$body_file")
  [ -n "$h1" ] && default_title="$h1"

  [ -z "$type" ] && type="prompt"
  [ -z "$title" ] && title="$default_title"
  [ -z "$slug" ] && slug=$(pn_slug_from_title "$title")
  [ -z "$pipeline" ] && pipeline="null"
  [ -z "$created" ] && created="$birth_date"
  updated=$(pn_today)

  if [ -z "$status" ]; then
    if [ "$promote" = "1" ]; then
      status="active"
    else
      status="inbox"
    fi
  elif [ "$promote" = "1" ] && [ "$status" = "inbox" ]; then
    status="active"
  fi

  mkdir -p "$(dirname "$dest")"
  {
    echo "---"
    echo "type: ${type}"
    echo "title: ${title}"
    echo "slug: ${slug}"
    echo "status: ${status}"
    echo "pipeline: ${pipeline}"
    echo "created: ${created}"
    echo "updated: ${updated}"
    echo "---"
    echo ""
    if [ -s "$body_file" ]; then
      cat "$body_file"
    fi
  } > "$dest"

  PN_LAST_SLUG="$slug"
  PN_LAST_STATUS="$status"
}
