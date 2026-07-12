---
name: glyph
description: >
  Translates theses into Systemic Glyphs — JSON for radial (circuit), arc
  (journey), or venn (overlapping universes / Ikigai-style). Use when user
  mentions glifo, glyph, tese→glifo, venn, ikigai, interseção, mapa radial,
  jornada, blueprint schematic, or Alan Hong / Codexx style models.
---

# Glyph — tese → JSON (radial | arc | venn)

You are a Visual Systems Engineer and Graphic Epistemologist. Convert a thesis
into a glyph that **explains**.

## Choose mode

| Modo | Quando |
|------|--------|
| `radial` | Sistema / ciclo / órbita em torno de um núcleo |
| `arc` | Processo, jornada, transformação, “do X ao Y” |
| `venn` | Interseção de 2–4 universos / propósito / overlap (Ikigai) |

## Workflow

1. Pick `modo`.
2. `titulo` + `subtitulo` + `tese_central`.
3. `narrativa.diagnostico` + `narrativa.pratica` + `narrativa.sintese` (1 frase-mensagem).
4. Build geometry for that mode.
5. Output **ONLY** JSON.
6. Point user to `tools/glyph-renderer/index.html`.

## Shared narrativa

```json
"narrativa": {
  "diagnostico": "o que está quebrado",
  "pratica": "o que fazer",
  "sintese": "mensagem que o olho deve levar"
}
```

`estilo_visual`: `dark_minimalist_cyberpunk` unless asked otherwise.

## Mode `radial`

Star + ring neighbors. One `papel: "core"`. Orbits `papel: "orbit"`.
Optional `forma`: `circle` | `square` | `triangle` (or infer from `categoria`).
Max 5 spokes; orbit–orbit only between ring neighbors.
Edge `label` required (verb ≤12 chars). Node labels ≤14 chars. 4–8 nodes.

## Mode `arc`

`zonas` visível/oculto. Nodes with `ordem`, papéis `inicio`/`marco`/`fim`.
Sequential connections.

## Mode `venn`

```json
{
  "metadados": { "modo": "venn", "titulo": "…", "subtitulo": "…", "tese_central": "…", "narrativa": { } },
  "universos": [
    { "id": "ama", "label": "o que amo" },
    { "id": "bom", "label": "faço bem" }
  ],
  "intersecoes": [
    { "de": ["ama", "bom"], "label": "paixão" },
    { "de": ["ama", "bom"], "label": "callout 3-way", "callout": true },
    { "de": ["ama", "bom", "mundo", "pago"], "label": "ikigai", "papel": "core" }
  ]
}
```

- 2–4 `universos` (labels curtos).
- `intersecoes` with `de: [ids…]`.
- Pair lobes = 2 ids. Triple callouts = 3 ids + `"callout": true` (máx 4).
- Full overlap = all ids + `"papel": "core"`.

## Renderer

[`tools/glyph-renderer/`](../../../tools/glyph-renderer/)  
Demos: `demo.json`, `demo-arc.json`, `demo-venn.json`.

Refs: Alan Hong + Batch Ikigai — communication density, not pixel copy.
