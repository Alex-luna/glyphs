---
name: release
description: >
  Cria release GitHub com notas no formato do repo e publica via release.sh.
  Use when user invokes /release, "release", "fazer release", "publicar versão",
  or pede tag vX.Y.Z no GitHub.
argument-hint: "vX.Y.Z (opcional — inferir se omitido)"
---

# Release GitHub

Fluxo completo — **não** delegar ao user (`gh release create` manual, push manual).

Referências:
- Template notas: [`Docs/reference/01-github/release-notes-template.md`](../../../Docs/reference/01-github/release-notes-template.md)
- Script: [`scripts/release.sh`](../../../scripts/release.sh)
- Rule: [`.cursor/rules/github-workflow.mdc`](../../../.cursor/rules/github-workflow.mdc)

## 1. Versão

- User passou `vX.Y.Z` nos args → usar
- Senão: última tag em `releases/release-notes-v*.md` ou `gh release list` → sugerir **minor** bump (ex. v1.4.0 → v1.5.0) se houve features; **patch** se só fixes. Confirmar com user **só se** ambíguo

## 2. Coletar conteúdo

- Ler `changelogs.md` — entradas **desde** a última release (linha com "Release v…")
- Skim commits/diff recente se changelog incompleto
- Formato das notas (`releases/release-notes-vX.Y.Z.md`):

```markdown
## De onde viemos
[Link/release anterior + resumo 1–2 frases]

## Onde estamos
[Bullets do que entra nesta release]

## Para onde vamos
[Próximo passo roadmap — inferir de handoff/PRD se existir]
```

## 3. Gravar e publicar

1. Criar `releases/release-notes-vX.Y.Z.md`
2. Entrada em `changelogs.md`: `(dd-MM-YY HH:mm) Release vX.Y.Z — …`
3. **Executar:** `./scripts/commit-push.sh "docs: release notes vX.Y.Z"` — permissões `git_write`, `network`, `all`
4. **Executar:** `./scripts/release.sh vX.Y.Z --notes-file releases/release-notes-vX.Y.Z.md` — mesmas permissões

Script já: bump `app/package.json` se existir, push, `gh release create`.

## 4. Confirmar

- URL da release (`gh release view vX.Y.Z --web` ou output do script)
- Versão + 2–3 bullets do que saiu

## Erros

- Push/release falhou → rerun script com `all` — **nunca** instruir user a configurar GH_TOKEN ou push manual
- `gh auth` ausente → única vez: `gh auth login`

## Chat

Resposta caveman se `/starter` ou caveman ativo nesta sessão; senão prose normal concisa.
