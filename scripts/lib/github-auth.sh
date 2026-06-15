#!/usr/bin/env bash
# github-auth.sh — Auth/push helpers para commit-push.sh e release.sh
# Corrige GH_TOKEN inválido no ambiente e prefere SSH para git push.

lm_github_ensure_gh() {
  if ! command -v gh &>/dev/null; then
    echo "[github] Erro: gh CLI não encontrado. Instale: brew install gh"
    exit 1
  fi

  local status_out
  status_out="$(gh auth status 2>&1)" || true

  if echo "$status_out" | grep -q "Failed to log in to github.com using token (GH_TOKEN)"; then
    echo "[github] GH_TOKEN inválido no ambiente — usando login do gh (keyring)"
    unset GH_TOKEN
    export GH_TOKEN
    status_out="$(gh auth status 2>&1)" || true
  fi

  if ! gh auth status &>/dev/null; then
    echo "[github] gh não autenticado. Rode uma vez: gh auth login"
    exit 1
  fi
}

lm_github_ensure_push_remote() {
  local url
  url="$(git remote get-url origin 2>/dev/null || true)"
  if [[ -z "$url" ]]; then
    return 0
  fi

  if [[ "$url" == https://github.com/* ]] || [[ "$url" == http://github.com/* ]]; then
    local ssh_url=""
    if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
      ssh_url="$(gh repo view --json sshUrl -q .sshUrl 2>/dev/null || true)"
    fi
    if [[ -z "$ssh_url" ]]; then
      local path="${url#https://github.com/}"
      path="${path#http://github.com/}"
      path="${path%.git}"
      ssh_url="git@github.com:${path}.git"
    fi
    if [[ -n "$ssh_url" && "$ssh_url" != "$url" ]]; then
      git remote set-url origin "$ssh_url"
      echo "[github] origin → SSH ($ssh_url)"
    fi
  fi
}

lm_github_push() {
  local branch
  branch="$(git branch --show-current)"
  if [[ -z "$branch" ]]; then
    echo "[github] Erro: branch atual não detectada"
    exit 1
  fi
  echo "[github] push origin $branch"
  git push origin "$branch"
  echo "[github] push tags"
  git push origin --tags
}
