# Changelogs

(12-07-26 17:18) Release v0.5.0 — storytelling geométrico radial (triângulo+gr-story)

(12-07-26 17:17) Storytelling geométrico radial
- Triângulo aponta outflow (`apontar` ou 1ª conexão `de`); layer `gr-story` (chevrons, framing, ticks)
- Skill story grammar; demo com formas explícitas; aprendizado forma≠decoração

(12-07-26 16:50) Release v0.4.0 — blueprint + formas + modo venn/Ikigai

(12-07-26 16:45) Blueprint + venn + alinhamento
- Grid/cantoneiras; core label no head; edge labels longe do centro
- Formas nos nós; narrativa.sintese; modo venn (Ikigai) + demo

(12-07-26 16:34) Release v0.3.0 — radial como circuito lógico (spokes, anéis, traços)

(12-07-26 14:00) Radial como circuito lógico
- Guias circulares, spokes+seta, anel em arco (sem cordas)
- Traços solid/dash/dot, pulse no core, packets só em spokes

(12-07-26 13:56) Release v0.2.0 — modos radial+/arc + labels de aresta legíveis

(12-07-26 13:51) Fix legibilidade labels + nomenclatura narrativa
- Edge labels: offset, halo, contraste; arc sem cordas faint
- Narrativa: diagnóstico / prática (compat problema/trabalho)

(12-07-26 13:36) Modos radial+ e arc (comunicação Alan Hong–style)
- Skill escolhe radial|arc; titulo/subtitulo/narrativa; labels de aresta
- Renderer: núcleo central, sem mesh K_n, modo arc U + zonas + demos

(12-07-26 13:28) Release v0.1.1 — fixes frame overflow + canvas círculo oval

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
