# Handoff — Pipeline tese → glifo (blueprint / venn)

**Data:** 12-07-26 16:55  
**Próxima sessão:** Validar venn/radial no browser; enriquecer modos restantes (layers/polarity) ou polish tipográfico/export se user pedir

## Contexto

- Produto = motor conceitual: tese → JSON → SVG animado (estilo iii + refs Alan Hong / Ikigai).
- Skill Cursor + renderer local (sem `app/` Next).
- Evolução visual: mesh mudo → radial+labels → circuito (spokes/anel) → blueprint + formas + modo `venn`.
- Narrativa passou de problema/trabalho → diagnóstico/prática → + síntese (3ª coluna).
- Caveman + ponytail ativos na sessão.

## Estado atual

- Branch: `main` (synced `origin/main`)
- Commits chave:
  - `95cf093` — blueprint, shapes, sintese, venn
  - `fad1cfc` — radial circuito lógico
  - `2e53c99` / `505accd` — modos radial+/arc + legibilidade
  - Releases docs até `v0.4.0` (`04b6bef`)
- Paths principais:
  - [`.agents/skills/glyph/SKILL.md`](.agents/skills/glyph/SKILL.md)
  - [`tools/glyph-renderer/`](tools/glyph-renderer/) (`index.html`, `glyph-renderer.js`, `.css`)
  - Demos: `examples/demo.json`, `demo-arc.json`, `demo-venn.json`
  - Refs: `Docs/Glyphs-Project Reference/References/refs_AlanHong/`, `Batch ReFs/`
  - Aprendizado: `Docs/Aprendizados do Projeto/aprendizado-glyph-comunicacao-modos.md`
- MVP hero-viz original: `Docs/Glyphs-Project Reference/mvp/hero-viz/` (superseded pelo renderer)
- **Não** editar corpo de `Docs/Prompts/inbox/Ideia Central.md` (rule prompts)

## Próximos passos

1. Hard-refresh `tools/glyph-renderer/index.html` — validar botões **radial / arc / venn** + coluna síntese.
2. Testar skill com tese real (ciclo → radial; jornada → arc; propósito/overlap → venn).
3. Se venn ainda fraco: ajustar offsets de labels/callouts e densidade de interseções.
4. Só depois (YAGNI até user pedir): modos `layers` / `polarity` / `spectrum`; export PNG; tipografia hand-lettered.
5. Se integrar em produto: port RAF/SVG para página real (ainda sem `app/`).

## Artefatos (referenciar, não duplicar)

- Plans: `.cursor/plans/pipeline_tese_glifo_*.plan.md`, `radial_circuit_visual_*.plan.md`, `blueprint_venn_richness_*.plan.md`, `fix_glyph_*.plan.md`
- Ideia: [`Docs/Prompts/inbox/Ideia Central.md`](Docs/Prompts/inbox/Ideia%20Central.md)
- Handoff antigo hero-viz: [`Docs/Glyphs-Project Reference/mvp/handoff-hero-viz.md`](Docs/Glyphs-Project%20Reference/mvp/handoff-hero-viz.md)
- Changelog: [`changelogs.md`](changelogs.md)

## Skills sugeridas

- `glyph` — gerar JSON nos modos radial|arc|venn
- `starter` — caveman + ponytail
- `ponytail` (rule) — não over-engineer próximos modos
- `repo-audit` — se higiene de refs/webp/Batch ficar pesada

## Não repetir aqui

Schema JSON completo, CSS tokens, implementação SVG — ver skill + `glyph-renderer.js`.
