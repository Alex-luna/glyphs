## De onde viemos

[v0.1.4](https://github.com/Alex-luna/template-simple-v3/releases/tag/v0.1.4) — prompts light + `Docs/reference/` reorganizado; sem skill de raio-x replicável; relatório de audit só no chat.

## Onde estamos

- **Skill `repo-audit`** — pipeline em 8 fases (inventário, relevância, duplicação, vereditos DELETE/MERGE/REFACTOR/KEEP); `inventory.sh` + CHECKLIST
- **Raio-x em MD** — relatório completo em `Docs/Aprendizados do Projeto/raio-x-{dd-MM-aa}.md`; chat só path + resumo; `REPORT-TEMPLATE.md` + `report-path.sh`
- **Template cleanup** — caveman skill dedup (rule always-on); `.cursor/plans/` no gitignore; plan session removido; rule `ponytail.mdc`
- **Easypanel** — conteúdo Avaliar/ mesclado em `Docs/reference/03-easypanel/` e rules existentes

## Para onde vamos

- Rodar raio-x periódico em forks (`repo-audit` skill)
- Executar vereditos pendentes do relatório (drift README/rules)
- Continuar enxugar infra Cursor sem perder stack do fork
