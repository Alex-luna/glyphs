# Repo audit — checklist

Filtro central: **repo serve infra Cursor enxuta + stack escolhida no fork?** Tudo fora → delete, merge ou optional-ize.

## Saída

- [ ] Path via `.agents/skills/repo-audit/scripts/report-path.sh` → `Docs/Aprendizados do Projeto/raio-x-{dd-MM-aa}.md`
- [ ] Se existir no mesmo dia → sufixo `-2`, `-3`, …
- [ ] Relatório completo no MD ([REPORT-TEMPLATE.md](REPORT-TEMPLATE.md))
- [ ] Chat: path + 2–3 bullets — **sem** dump do audit

## 1. Detectar tipo

- [ ] Template puro (sem `app/`, sem `server.js`) vs fork com app
- [ ] Stack: Next (`app/`), Easypanel (`server.js`), ambos, ou infra only
- [ ] Convex (`app/convex/`), Prompts (`Docs/Prompts/`), Blueprint

## 2. Inventário

Rodar:

```bash
./.agents/skills/repo-audit/scripts/inventory.sh
```

- [ ] Listar `.cursor/rules/*.mdc`
- [ ] Listar `.agents/skills/*/SKILL.md`
- [ ] Listar `Docs/` e `scripts/`
- [ ] Pastas vazias, plans versionados, lockfile ausente
- [ ] Output colado no §2 do relatório MD

## 3. Relevância (espelha Docs/FORK.md)

| Se NÃO usa… | Candidato a delete |
|-------------|-------------------|
| Next/front | `template-onboarding.mdc` |
| Convex | `convex-module-deploy.mdc` |
| Easypanel simples | `easypanel-simple.mdc` + `03-easypanel/` (fork produto puro Vercel) |
| Prompts salvos | `prompts.mdc` |
| Persona Conselho | `O Conselho.mdc` |

## 4. Duplicação

- [ ] Rule ↔ skill com mesmo corpo (ex.: caveman) → **rule = fonte única**
- [ ] Doc ↔ rule com mesmo conteúdo → doc = referência humana; rule = ponteiro curto
- [ ] README drift (rules/skills/scripts não listados)
- [ ] `default.mdc` referências a conteúdo inexistente

## 5. Classificar → escrever §5 do MD

| Veredito | Critério |
|----------|----------|
| **DELETE** | Artefato de sessão, pasta vazia, rule de stack não usada |
| **MERGE** | Dois arquivos dizem a mesma coisa — unificar fonte |
| **REFACTOR** | Alinhar docs, gitignore, README |
| **KEEP** | Serve ciclo fork → stack → deploy |

Tabela ranked no arquivo: `# | item | veredito | motivo`

## 6. Confirmar com user

Proposta no MD — chat aponta path. **Não deletar sem confirmar** (exceto lixo óbvio acordado no plano).

## 7. Executar

- [ ] Aplicar deletes/merges aprovados
- [ ] `./scripts/commit-push.sh "chore: repo audit …"`

## 8. Registrar

- [ ] Relatório `raio-x-{dd-MM-aa}.md` salvo (obrigatório)
- [ ] Entrada em `changelogs.md` se houve mudanças
- [ ] Aprendizado meta opcional (`aprendizado-{tema}-{dd-MM-aa}.md`) — processo, não substitui raio-x
