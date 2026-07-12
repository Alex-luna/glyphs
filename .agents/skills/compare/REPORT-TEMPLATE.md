# Compare — {origem-slug} → template

**Data:** {dd-MM-aa HH:mm}  
**Origem:** `{path-origem}`  
**Destino:** `{path-destino}`  
**Tipo origem:** fork Next | fork Easypanel | híbrido | infra only

---

## 1. Contexto

- Por que comparar (1–2 frases)
- Stack detectada na origem vs template

---

## 2. Inventário (diff script)

<!-- Colar output de compare-diff.sh abaixo -->

---

## 3. Deltas classificados

| # | Item | Veredito | Motivo |
|---|------|----------|--------|
| 1 | | PORT / FORK_ONLY / MERGE / DELETE / REFACTOR / KEEP | |

Vereditos:

- **PORT** — melhoria genérica → trazer pro template
- **FORK_ONLY** — específico do produto fork — ignorar
- **MERGE** — unificar numa versão
- **DELETE** — legacy no template — remover
- **REFACTOR** — alinhar docs/gitignore/README
- **KEEP** — sem ação

---

## 4. Scripts audit

| Script | Origem | Destino | Referências (README/hooks) | Veredito |
|--------|--------|---------|----------------------------|----------|
| | | | | |

Órfãos, duplicatas, herança morta — proposta mínima de unificação.

---

## 5. Gitignore — `.cursor/plans/`

| Repo | Status esperado | Status atual | Ação |
|------|-----------------|--------------|------|
| Template | comentada (versiona) | | |
| Origem | (escolha do fork) | | FORK_ONLY se divergir |

---

## 6. Plano de apply

Lista de arquivos a tocar **após aprovação do user**:

- [ ] `path/to/file` — PORT / MERGE / REFACTOR — descrição curta

**Não aplicar:** itens FORK_ONLY, código de produto, plans de outro repo.

---

## 7. Pós-apply

- [ ] `README.md` atualizado se skills/scripts mudaram
- [ ] `changelogs.md` + `./scripts/commit-push.sh`
- [ ] Opcional: skill `repo-audit` se mudanças grandes
