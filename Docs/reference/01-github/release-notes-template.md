# Template de Release Notes

Use este formato para clareza: **de onde viemos**, **onde estamos**, **para onde vamos**.

## Formato

```markdown
## De onde viemos
[Última release ou estado inicial do projeto. Ex: "Estado inicial sem app. Linha Mestra em Sheets."]

## Onde estamos
[O que esta release contém. Pode usar o entry do changelog da sessão.]

## Para onde vamos
[Próximo passo do PRD/roadmap. User pode ajustar. Ex: "Tabelas extras do Manual; cálculos GAP/TAXA."]
```

## Exemplo — v0.1.0 (MVP)

```markdown
## De onde viemos
Linha Mestra em três formas desconectadas: DOC teórico, DOC preenchido, OS em Sheets. Sem visão do todo.

## Onde estamos
- App Next.js + ShadCN + Convex
- DOC: 11 partes editáveis
- OS: 6 tabelas (coreIdentity, cashScoreboard, offerHypotheses, marketPressure, executionLog, expertStatus)
- Dashboard: status preenchido vs vazio

## Para onde vamos
- Refinar no uso diário
- Tabelas extras (STORYLINES, CONTENT_ENGINE, etc.) conforme dor
- Cálculos GAP e TAXA_FECHAMENTO
```

## Versionamento

- **Semver:** v0.1.0, v0.2.0
- Patch (0.1.x): fixes e ajustes
- Minor (0.x.0): novas features
