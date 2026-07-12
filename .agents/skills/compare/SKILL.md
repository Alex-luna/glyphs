---
name: compare
description: >
  Compare fork/sibling project with current template — diff rules, skills,
  scripts; classify portable vs fork-specific changes. Use when user invokes
  /compare, pastes an external project path, asks to port/sync fork changes
  to template, or audit inherited scripts from another Luna repo.
argument-hint: "/absolute/path/to/fork-or-sibling-project"
---

# Compare — fork → template

Origem = path do fork. Destino = repo atual (template). Foco: infra Cursor reutilizável.

Template do relatório: [REPORT-TEMPLATE.md](REPORT-TEMPLATE.md)  
Critérios de relevância: [repo-audit CHECKLIST.md](../repo-audit/CHECKLIST.md)

## Quick start

```bash
SOURCE="/Users/.../solo-os"
SLUG=$(basename "$SOURCE")
./.agents/skills/compare/scripts/compare-diff.sh "$SOURCE"
REPORT=$(./.agents/skills/compare/scripts/report-path.sh "$SLUG")
# Escrever relatório completo em $REPORT — ver pipeline fases 1–8
```

Invocação: `/compare /path/to/fork` ou path na mensagem.

## Fora de escopo

- `app/`, `public/`, `server.js` de produto, `Docs/` de feature
- Copiar `.cursor/plans/` ou histórico de sessão de outro repo (`Docs/FORK.md`)

## Saída — arquivo, não chat

| | Onde |
|---|---|
| Relatório compare | `Docs/Aprendizados do Projeto/compare-{slug}-{dd-MM-aa}.md` |
| Colisão mesmo dia | `compare-{slug}-{dd-MM-aa}-2.md`, `-3`, … |
| Path | `./.agents/skills/compare/scripts/report-path.sh <slug>` |

### Resposta no chat (obrigatório)

Máximo após compare:

```markdown
Compare gravado em `Docs/Aprendizados do Projeto/compare-solo-os-25-06-26.md`

- N itens PORT, M FORK_ONLY
- Scripts: X candidatos DELETE/MERGE
- Próximo: aprovar §6 para aplicar
```

**Não** colar inventário ou tabelas completas no chat.

## Pipeline (8 fases)

### 1. Validar origem

- Path existe, é diretório
- Sinais Luna: pelo menos um de `.cursor/rules/`, `.agents/skills/`, `scripts/commit-push.sh`
- Slug = `basename` do path

### 2. Diff determinístico

```bash
./.agents/skills/compare/scripts/compare-diff.sh "$SOURCE"
```

Áreas: `.cursor/rules/*.mdc`, `.agents/skills/**`, `scripts/**`, `.gitignore` (linha plans).

### 3. Classificar deltas

| Veredito | Significado |
|----------|-------------|
| **PORT** | Melhoria genérica → template |
| **FORK_ONLY** | Específico do fork — ignorar |
| **MERGE** | Unificar numa versão |
| **DELETE** | Legacy no template |
| **REFACTOR** | Alinhar docs/gitignore/README |
| **KEEP** | Sem ação |

Heurísticas: menção a produto fork (`chronos`, `solo`) → **FORK_ONLY**; fix em handoff/commit-push/github-workflow → **PORT**; script idêntico → **KEEP**; script órfão no template → **DELETE**/**REVIEW**.

Para arquivos alterados: ler diff antes de classificar.

### 4. Scripts audit (§4 do relatório)

- Inventário `scripts/*.sh` + `scripts/lib/*.sh`
- Referências: `README.md`, hooks em `commit-push.sh`, cross-calls
- Órfãos, duplicatas, herança morta — ponytail: deletion over addition

### 5. Gitignore plans (§5)

Template default: linha `.cursor/plans/` **comentada** (versiona plans). Fork pode descomentar — **FORK_ONLY**. Template errado → **REFACTOR** no apply.

### 6. Escrever relatório

Path via `report-path.sh`. Seguir [REPORT-TEMPLATE.md](REPORT-TEMPLATE.md). Colar output de `compare-diff.sh` em §2.

### 7. Confirmar

User aprova §6 antes de apply. Proposta já está no MD — apontar path no chat.

### 8. Apply (após aprovação)

- Copiar/adaptar só **PORT** / **MERGE** / **REFACTOR** aprovados
- Atualizar `README.md` se skills/scripts mudarem
- `changelogs.md` + `./scripts/commit-push.sh`
- Mudanças grandes → sugerir `repo-audit` depois

## vs repo-audit

| | repo-audit | compare |
|---|------------|---------|
| Escopo | 1 repo | origem → template |
| Pergunta | O que limpar? | O que portar do fork? |
| Saída | `raio-x-*.md` | `compare-*.md` |

## Não fazer

- Dump do compare completo no chat
- Trazer código de produto ou plans de outro repo
- Apply sem aprovação explícita do user
