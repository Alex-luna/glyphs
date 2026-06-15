---
name: repo-audit
description: >
  Raio-X impiedoso do repo — inventário, relevância, duplicação, proposta
  delete/merge/refactor/keep. Pipeline replicável para template e forks.
  Use when user asks to audit repo, simplify template, prune rules/skills/docs,
  raio-x, repo hygiene, or periodic cleanup.
---

# Repo audit

Filtro: **infra Cursor enxuta + stack do fork.** Simples vence.

Checklist detalhado: [CHECKLIST.md](CHECKLIST.md)  
Template do relatório: [REPORT-TEMPLATE.md](REPORT-TEMPLATE.md)

## Quick start

```bash
./.agents/skills/repo-audit/scripts/inventory.sh
REPORT=$(./.agents/skills/repo-audit/scripts/report-path.sh)
# Escrever relatório completo em $REPORT — ver pipeline fases 5–8
```

## Saída — arquivo, não chat

**Relatório completo → markdown.** Chat só confirma path + 2–3 bullets.

| | Onde |
|---|------|
| Relatório raio-x | `Docs/Aprendizados do Projeto/raio-x-{dd-MM-aa}.md` |
| Colisão mesmo dia | `raio-x-{dd-MM-aa}-2.md`, `-3`, … |
| Path disponível | `./.agents/skills/repo-audit/scripts/report-path.sh` |

### Resposta no chat (obrigatório)

Máximo após audit:

```markdown
Raio-x gravado em `Docs/Aprendizados do Projeto/raio-x-14-06-26.md`

- Veredito geral: …
- N itens pendentes (ver tabela §5)
- Próximo passo: …
```

**Não** colar inventário, tabelas ranked ou vereditos completos no chat.

## Pipeline (8 fases)

### 1. Detectar tipo

Template puro vs fork. Presença de `app/`, `server.js`, `app/convex/`, `Docs/Prompts/`.

### 2. Inventário

Rodar `scripts/inventory.sh`. Complementar com leitura de `README.md`, `Docs/FORK.md`, `.cursor/rules/default.mdc`.

### 3. Relevância

Marcar rules/skills/docs fora do stack — ver tabela em CHECKLIST.md (espelha FORK steps 4–7).

### 4. Duplicação

- Rule ↔ skill overlap → rule fonte única se always-on
- Doc ↔ rule → doc referência humana; rule ponteiro
- README drift

### 5. Propor → escrever MD

Obter path: `report-path.sh` ou regra de sufixo acima.

Criar arquivo seguindo [REPORT-TEMPLATE.md](REPORT-TEMPLATE.md):

- Colar output de `inventory.sh` em §2
- Tabela ranked §5: item | veredito | motivo

Vereditos: **DELETE** | **MERGE** | **REFACTOR** | **KEEP**

Respeitar `ponytail.mdc`: deletion over addition.

### 6. Confirmar

User aprova antes de deletes não triviais. Proposta já está no MD — apontar path no chat.

### 7. Executar

Aplicar mudanças aprovadas. Template: `./scripts/commit-push.sh` ao fim do batch.

### 8. Registrar

- Relatório raio-x no path acima (fonte de verdade do audit)
- Entrada em `changelogs.md` se houve execução de mudanças
- Aprendizado meta opcional: `Docs/Aprendizados do Projeto/aprendizado-{tema}-{dd-MM-aa}.md` — só quando lição de processo vale documentar à parte

## Critérios rápidos

| Sinal | Ação típica |
|-------|-------------|
| `.cursor/plans/*.plan.md` versionados | DELETE + gitignore |
| Pasta vazia sem referências | DELETE |
| Rule de stack não usada | DELETE no fork |
| Skill duplica rule always-on | MERGE → skill thin wrapper |
| Script sem doc no README | REFACTOR README |
| Stub doc apontando rule | KEEP |

## Não fazer

- Dump do audit completo no chat
- Checklist completo em rule `alwaysApply` (token burn)
- Deletar `O Conselho.mdc` / releases / Design-System sem user pedir
- Expandir docs stub só para “completar”

## Referências do template

- Fork checklist: `Docs/FORK.md`
- YAGNI: `.cursor/rules/ponytail.mdc`
- Aprendizados: `.cursor/rules/aprendizados-projeto.mdc`
