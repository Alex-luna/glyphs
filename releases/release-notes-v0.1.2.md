## De onde viemos

[v0.1.1](https://github.com/Alex-luna/template-simple-v3/releases/tag/v0.1.1) — README/FORK v3, `default.mdc` enxuto, commit-push obrigatório nas rules.

## Onde estamos

- **`caveman.mdc`** — rule `alwaysApply: true`; caveman full desde turno 1 (não depende de agent ler skill on-demand)
- **`default.mdc`** — aponta `caveman.mdc`; índice de rules atualizado
- **Skill `caveman`** — description marca ALWAYS ACTIVE no template; off só com "stop caveman" / "normal mode"
- **`README.md`** — tabela de rules inclui `caveman.mdc`
- **`Docs/easypanel/easypanel.md`** — notas Easypanel adicionadas ao repo

## Para onde vamos

- Validar caveman em novos chats (primeira interação já tersa)
- Manter template enxuto; skills UI opcionais via `install-optional-skills.sh`
- Usar em novos forks; agent commita/pusha ao fim de batch
