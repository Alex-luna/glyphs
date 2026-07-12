# Changelogs

(12-07-26 13:26) Fix canvas SVG não-quadrado (círculo torto)
- Layout align-items start; canvas aspect-ratio 1 sem stretch 1fr

(12-07-26 13:20) Fix glifo fora do frame
- Renderer: R=110, viewBox padded, truncate labels 14 chars
- Parse aceita fence ```json; skill exige labels curtos

(12-07-26 13:15) Release v0.1.0 — primeira versão: template + skill glyph + renderer SVG

(12-07-26 13:05) Pipeline tese → glifo
- Skill `.agents/skills/glyph/` — tese → JSON sistêmico
- Renderer `tools/glyph-renderer/` — JSON → SVG radial + packets
- Demo `examples/demo.json`; handoff hero-viz aponta pro novo path

(12-07-26 12:50) Sync from template-simple-v3
- Rules, skills, scripts, Docs/reference, Design-System
- Fork: `.cursor/plans/` permanece ignorado no gitignore
