# Handoff — Hero viz (iii.dev style) · expert-os

**Date:** 15-06-26  
**Repo:** `/Users/alexluna/Documents/Luna-Labs-Cursor/expert-os`  
**Last commit:** `7c61317` — `add mvp/hero-viz standalone iii-style graph demo`

> **Superseded (12-07-26):** uso diário do glifo → [`tools/glyph-renderer/`](../../../tools/glyph-renderer/) + skill [`.agents/skills/glyph/`](../../../.agents/skills/glyph/SKILL.md).  
> Este MVP (`mvp/hero-viz/`) permanece como referência do engine iii (stages mesh/actual/iii). Não é o pipeline tese→JSON→SVG.

---

## Goal of the conversation

User asked to identify and replicate the animated SVG hero visualization seen on a landing page (DOM: `#hero-viz` → `#hv-canvas` → `svg.main`, `viewBox="0 0 400 400"`). They wanted to understand the **technology/animation** and adopt the **design style**. A standalone MVP was requested and delivered.

---

## Source of truth

| Artifact | Role |
|----------|------|
| **Live site:** [https://iii.dev/](https://iii.dev/) | Original product (III, Inc. / Motia LLC). Hero narrates *quadratic → linear → ephemeral*. |
| `iii - Three primitives. Zero integration cost..html` (repo root) | User-downloaded SavePage snapshot. **CSS + static SVG snapshot present; JS stripped** (`<script type="text/plain">` empty). Good for design tokens, not for running animation. |
| `mvp/hero-viz/` | **Working MVP** — vanilla HTML/CSS/JS, no deps. |

---

## Tech stack (confirmed)

- **Not** GSAP, D3, Lottie, React on the hero viz.
- **Vanilla JS** + **inline SVG** + **CSS** (`data-stage` gating) + **`requestAnimationFrame`** packet loop.
- Engine on live site: inline script block `<!-- ============= HERO VIZ ENGINE ============= -->` (~line 8550 on `iii.dev` HTML).

### Behavior summary

1. **10 nodes** on a circle (`N=10`, `R=144`, `viewBox 400×400`): orchestrator, db, cache, queue, stream, agent, http, cron, obs, memory.
2. **Three edge layers:** `hv-edge-mesh` (complete graph, 45 edges), `hv-edge-actual` (~20 curated), `hv-edge-ephemeral` (spawned only in `iii` stage).
3. **Packets:** `<circle class="hv-packet">` interpolated along edges; ephemeral lines fade in/out in `iii` stage.
4. **Stages / tabs:** `mesh` (problem space), `actual` (current/implementation), `iii`. CSS opacity on `[data-stage="…"]`.
5. **Footer:** integration count + complexity chart (`hv-cc-q/l/f`) with MathML formulas.
6. **Auto-cycle:** 4.2s unless user clicks tab (`userPinned`).
7. **IntersectionObserver** pauses RAF when offscreen.
8. **Design:** Chivo Mono (original); dark tokens `--bg #111110`, `--accent #3ea8ff`, hard edges, lowercase labels.

---

## What was built

```
mvp/hero-viz/
├── index.html    # demo shell + empty SVG groups
├── hero-viz.css  # tokens + stage styles + complexity chart
└── hero-viz.js   # simplified engine (mesh/actual/iii, RAF, tabs, cycle)
```

**Run locally:**

```bash
open mvp/hero-viz/index.html
# or
cd mvp/hero-viz && python3 -m http.server 8765
```

**MVP omits (vs full iii.dev):** triptych design variant, tweaks panel, `heroVizSetDesign` API, agent-section viz reuse, analytics (`iiiTrack`), Chivo Mono font file (uses system mono stack).

---

## Design fit with expert-os

`Design-System/monoblock_studio/DESIGN.md` — brutalist dark, monospace, tonal layering, 0px radius. Hero viz aligns if kept schematic (1 accent, subtle motion). Not yet wired into `app/` or Easypanel scaffold.

---

## Open / suggested next work

1. ~~Customize nodes via JSON~~ → feito em `tools/glyph-renderer/` (pipeline tese→glifo).
2. **Integrate** renderer into a real page if/when `app/` exists.
3. **Adapt tokens** to monoblock if product UI lands.
4. **Port to React** only if app stack needs it (keep RAF/SVG).
5. **Remove or gitignore** large iii HTML snapshot if repo hygiene demands.

---

## Key paths

| Path | Notes |
|------|--------|
| `mvp/hero-viz/index.html` | Entry point |
| `mvp/hero-viz/hero-viz.js` | Engine |
| `mvp/hero-viz/hero-viz.css` | Styles |
| `iii - Three primitives. Zero integration cost..html` | Reference snapshot |
| `Design-System/monoblock_studio/DESIGN.md` | Local design system |
| `changelogs.md` | Last entry documents MVP |

---

## Suggested skills (next agent)

| Skill | When |
|-------|------|
| `.agents/skills/handoff/SKILL.md` | If user asks for another handoff |
| `.cursor/rules/template-onboarding.mdc` | If integrating into `app/` (Next + Tailwind + Convex) |
| `.cursor/rules/ponytail.mdc` | Keep integration minimal |
| `.agents/skills/repo-audit/SKILL.md` | If pruning committed iii HTML snapshot / repo hygiene |
| `create-rule` / `create-skill` | If hero viz becomes a reusable project convention |

---

## Constraints / rules

- **Commit:** `./scripts/commit-push.sh` after repo edits (template rule).
- User may say "don't commit" — exception only when explicit in that message.
- Convex deploy rule irrelevant for this MVP (no `app/convex/` changes).
- Caveman mode active in workspace rules for terse comms.

---

## User intent (inferred)

Wants the **iii.dev schematic terminal aesthetic** for their own product storytelling—not necessarily the iii product itself. MVP was for **visual/technical understanding** before deeper integration.
