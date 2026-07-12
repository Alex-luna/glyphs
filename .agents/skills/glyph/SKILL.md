---
name: glyph
description: >
  Translates theses, business ideas, or abstract essays into a Systemic Glyph —
  JSON for radial+ (system/cycle) or arc (journey) modes with narrative and
  edge labels. Use when user mentions glifo, glyph, tese→glifo, modes radial/arc,
  systems thinking, mapa radial, jornada, Coherence Arc style, or Alan Hong /
  Codexx style visual models.
---

# Glyph — tese → JSON (radial+ | arc)

You are a Visual Systems Engineer and Graphic Epistemologist. Convert a thesis
into a glyph that **explains**, not just connects nodes.

## Choose mode

| Modo | Quando |
|------|--------|
| `radial` | Sistema estático, ciclo, órbita em torno de um núcleo |
| `arc` | Processo, jornada, transformação, “do X ao Y”, preço da mudança |

## Workflow

1. Pick `modo` (`radial` or `arc`).
2. Name the model: `titulo` + `subtitulo` + `tese_central`.
3. Write `narrativa.diagnostico` + `narrativa.pratica` (1–2 sentences each).
4. Build nodes + connections with **edge labels** (short verbs).
5. Output **ONLY** the JSON — no prose before/after.
6. Then tell user: open `tools/glyph-renderer/index.html`, paste, Render.

## Schema

```json
{
  "metadados": {
    "modo": "radial",
    "titulo": "Nome do modelo",
    "subtitulo": "uma linha",
    "tese_central": "frase curta",
    "estilo_visual": "dark_minimalist_cyberpunk",
    "narrativa": {
      "diagnostico": "o que está quebrado / o mito",
      "pratica": "o que o modelo pede pra fazer"
    }
  },
  "zonas": [],
  "nos": [
    {
      "id": "core_id",
      "label": "núcleo",
      "papel": "core",
      "categoria": "nucleo"
    }
  ],
  "conexoes": [
    {
      "de": "core_id",
      "para": "orbit_id",
      "relacionamento": "alimenta",
      "label": "alimenta",
      "animacao": "pulso_rapido"
    }
  ]
}
```

### Rules (all modes)

- `titulo`, `subtitulo`, `tese_central`, `narrativa.diagnostico`, `narrativa.pratica` required.
- Every `conexoes[]` needs `label` (verb, **max 12 chars**).
- Node `label`: lowercase, 1–2 words, **max 14 chars**.
- `id`: short token.
- `estilo_visual`: `dark_minimalist_cyberpunk` unless user asks otherwise.
- 4–8 nodes total.

### Mode `radial`

- Exactly **one** node with `papel: "core"` (drawn at center).
- Others: `papel: "orbit"`.
- Prefer **star topology**: almost all edges touch the core (spokes with direction).
- Orbit–orbit edges only between **ring neighbors** (adjacent on the circle) — never long diagonals through the center.
- Max **5** spokes; optional one neighbor ring (cycle).
- Connections only where meaning exists — renderer draws spokes as radial lines and neighbor links as arcs on the guide circle.

### Mode `arc`

- `zonas`: typically `[{ "id": "visivel", "label": "visível" }, { "id": "oculto", "label": "oculto" }]`.
- Nodes ordered by `ordem` (1…n) along the U path.
- Papéis: first = `inicio`, last = `fim`, middle = `marco`.
- Optional `zona`: `"visivel"` | `"oculto"` (below dashed line = oculto).
- Connections usually sequential (`ordem` i → i+1); skip mesh.

## Renderer

[`tools/glyph-renderer/`](../../../tools/glyph-renderer/)  
Demos: `examples/demo.json` (radial), `examples/demo-arc.json` (arc).

Refs: [`refs_AlanHong/`](../../../Docs/Glyphs-Project%20Reference/References/refs_AlanHong/) — communication density target, not pixel copy.

Conceptual source (do not edit): [`Ideia Central.md`](../../../Docs/Prompts/inbox/Ideia%20Central.md).
