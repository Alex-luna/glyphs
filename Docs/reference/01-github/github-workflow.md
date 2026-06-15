# GitHub — workflow do template

**Obrigatório:** qualquer batch que altere arquivos termina com `./scripts/commit-push.sh`. Ver `default.mdc` e `github-workflow.mdc`.

## Scripts

- `./scripts/commit-push.sh "mensagem"` — add, commit, push (SSH)
- `./scripts/release.sh vX.Y.Z --notes-file releases/release-notes-vX.Y.Z.md`

## Auth

- Push: Git via SSH (`scripts/lib/github-auth.sh`)
- Release: `gh` keyring; não use `GH_TOKEN` expirado no ambiente

## Release notes

[release-notes-template.md](release-notes-template.md)

## Desativar auto commit/push

Edite ou remova seções Git em `default.mdc` e `github-workflow.mdc`.
