#!/usr/bin/env bash
# install-optional-skills.sh — Copia skills de UI para .agents/skills/
# Uso: ./scripts/install-optional-skills.sh ui-ux-pro-max shadcn-ui
# SKILLS_SOURCE: pasta com subpastas ui-ux-pro-max/ e shadcn-ui/
# Padrão Alex: $HOME/Documents/Luna-Labs-Cursor/skills-bundle

set -e

ALLOWED="ui-ux-pro-max shadcn-ui"
DEST=".agents/skills"
DEFAULT_SKILLS_SOURCE="${HOME}/Documents/Luna-Labs-Cursor/skills-bundle"
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

if [ $# -eq 0 ]; then
  echo "[install-optional-skills] Uso: ./scripts/install-optional-skills.sh <skill>..."
  echo "Skills permitidas: $ALLOWED"
  echo "SKILLS_SOURCE padrão: $DEFAULT_SKILLS_SOURCE"
  exit 1
fi

SKILLS_SOURCE="${SKILLS_SOURCE:-$DEFAULT_SKILLS_SOURCE}"
if [ ! -d "$SKILLS_SOURCE" ]; then
  echo "[install-optional-skills] Pasta não encontrada: $SKILLS_SOURCE"
  echo "Crie o bundle com ui-ux-pro-max/ e shadcn-ui/ ou export SKILLS_SOURCE=/outro/caminho"
  echo "Alternativa: git checkout <tag> -- .agents/skills/ui-ux-pro-max .agents/skills/shadcn-ui"
  exit 1
fi

echo "[install-optional-skills] SKILLS_SOURCE=$SKILLS_SOURCE"
mkdir -p "$DEST"

for skill in "$@"; do
  ok=0
  for a in $ALLOWED; do
    [ "$a" = "$skill" ] && ok=1 && break
  done
  if [ "$ok" -eq 0 ]; then
    echo "[install-optional-skills] Skill desconhecida: $skill (permitidas: $ALLOWED)"
    exit 1
  fi
  src="$SKILLS_SOURCE/$skill"
  if [ ! -d "$src" ]; then
    echo "[install-optional-skills] Não encontrado: $src"
    exit 1
  fi
  rm -rf "$DEST/$skill"
  cp -R "$src" "$DEST/$skill"
  echo "[install-optional-skills] Instalado: $DEST/$skill"
done

echo "[install-optional-skills] Concluído."
