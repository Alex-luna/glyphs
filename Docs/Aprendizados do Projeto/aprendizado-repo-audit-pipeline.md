# Aprendizado — repo-audit pipeline no template

## Ocorrido

Raio-X do template-simple-v3 + criação da skill `repo-audit` como pipeline replicável. Primeira execução no próprio template (meta-audit).

## O que funcionou

- **Skill > rule** para audit completo — checklist pesado on-demand; `ponytail.mdc` cobre YAGNI no dia a dia; `default.mdc` só ponteiro.
- **Rule = fonte única** para caveman always-on; skill virou thin wrapper (~20 linhas vs ~50 duplicadas).
- **`inventory.sh`** dá baseline determinística antes do agent classificar.
- **`.cursor/plans/` no gitignore** — alinha com FORK.md; plans são sessão, não doc.

## Ações aplicadas neste batch

| Item | Veredito |
|------|----------|
| `.cursor/plans/01_merge_avaliar…` | DELETE |
| `Docs/images/` vazia | DELETE |
| `.gitignore` plans | REFACTOR |
| caveman skill ↔ rule | MERGE → rule fonte única |
| skill `repo-audit` + CHECKLIST + inventory | KEEP (novo) |
| `default.mdc`, README, FORK passo 11 | REFACTOR |
| `O Conselho`, releases, Design-System, dev-v2 | KEEP |

## Lição

Template deve comer própria simplificação — prova que rotina funciona em forks. Invocar: "raio-x do repo" / skill `repo-audit`. Repetir após init ou trimestral.

## Data

14-06-26
