/**
 * Glyph renderer — radial+ | arc (Alan Hong–inspired communication).
 * ponytail: vanilla SVG + RAF; no mesh K_n; edge labels carry meaning.
 */
(function glyphRenderer() {
  const DEMO_RADIAL = {
    metadados: {
      modo: "radial",
      titulo: "Glifo Sistêmico",
      subtitulo: "Circuito: núcleo + spokes + anel de vizinhos",
      tese_central:
        "Toda ideia complexa pode ser mapeada como sistema fechado radial.",
      estilo_visual: "dark_minimalist_cyberpunk",
      narrativa: {
        diagnostico:
          "Listas e pirâmides escondem interações; o leitor vê partes, não o sistema.",
        pratica:
          "Coloque a tese no centro. Spokes nomeados. Anel só entre vizinhos.",
      },
    },
    zonas: [],
    nos: [
      { id: "tese", label: "tese", papel: "core", categoria: "nucleo" },
      { id: "nos", label: "nós", papel: "orbit", categoria: "estrutura" },
      { id: "fluxos", label: "fluxos", papel: "orbit", categoria: "relacao" },
      { id: "ritmo", label: "ritmo", papel: "orbit", categoria: "dinamica" },
      { id: "canvas", label: "canvas", papel: "orbit", categoria: "geometria" },
      { id: "ink", label: "data-ink", papel: "orbit", categoria: "principio" },
    ],
    conexoes: [
      {
        de: "tese",
        para: "nos",
        relacionamento: "decompõe",
        label: "decompõe",
        animacao: "pulso_rapido",
      },
      {
        de: "tese",
        para: "fluxos",
        relacionamento: "alimenta",
        label: "alimenta",
        animacao: "pulso_rapido",
      },
      {
        de: "tese",
        para: "ritmo",
        relacionamento: "define",
        label: "define",
        animacao: "fluxo_lento",
      },
      {
        de: "tese",
        para: "canvas",
        relacionamento: "contém",
        label: "contém",
        animacao: "fluxo_lento",
      },
      {
        de: "tese",
        para: "ink",
        relacionamento: "restringe",
        label: "corta",
        animacao: "fluxo_lento",
      },
      {
        de: "nos",
        para: "fluxos",
        relacionamento: "alimenta",
        label: "liga",
        animacao: "fluxo_lento",
      },
      {
        de: "fluxos",
        para: "ritmo",
        relacionamento: "equilibra",
        label: "equilibra",
        animacao: "fluxo_lento",
      },
      {
        de: "ritmo",
        para: "canvas",
        relacionamento: "equilibra",
        label: "equilibra",
        animacao: "fluxo_lento",
      },
      {
        de: "canvas",
        para: "ink",
        relacionamento: "contém",
        label: "contém",
        animacao: "fluxo_lento",
      },
      {
        de: "ink",
        para: "nos",
        relacionamento: "restringe",
        label: "corta",
        animacao: "fluxo_lento",
      },
    ],
  };

  const DEMO_ARC = {
    metadados: {
      modo: "arc",
      titulo: "Arco de Coerência",
      subtitulo: "Do automático ao soberano — o preço de se tornar",
      tese_central: "Mudança real desce ao oculto antes de emergir de novo.",
      estilo_visual: "dark_minimalist_cyberpunk",
      narrativa: {
        diagnostico:
          "Tentar mudar só o visível (hábito, output) ignora a ruptura e o trabalho interno.",
        pratica:
          "Nomeie a descida, o fundo e a subida. Trate o oculto como zona, não como falha.",
      },
    },
    zonas: [
      { id: "visivel", label: "visível" },
      { id: "oculto", label: "oculto" },
    ],
    nos: [
      {
        id: "herdado",
        label: "herdado",
        papel: "inicio",
        zona: "visivel",
        ordem: 1,
      },
      {
        id: "ruptura",
        label: "ruptura",
        papel: "marco",
        zona: "visivel",
        ordem: 2,
      },
      {
        id: "dissolucao",
        label: "dissolução",
        papel: "marco",
        zona: "oculto",
        ordem: 3,
      },
      {
        id: "regulacao",
        label: "regulação",
        papel: "marco",
        zona: "oculto",
        ordem: 4,
      },
      {
        id: "renascimento",
        label: "renascimento",
        papel: "marco",
        zona: "visivel",
        ordem: 5,
      },
      {
        id: "soberano",
        label: "soberano",
        papel: "fim",
        zona: "visivel",
        ordem: 6,
      },
    ],
    conexoes: [
      {
        de: "herdado",
        para: "ruptura",
        relacionamento: "quebra",
        label: "quebra",
        animacao: "pulso_rapido",
      },
      {
        de: "ruptura",
        para: "dissolucao",
        relacionamento: "desce",
        label: "desce",
        animacao: "fluxo_lento",
      },
      {
        de: "dissolucao",
        para: "regulacao",
        relacionamento: "trabalha",
        label: "trabalha",
        animacao: "fluxo_lento",
      },
      {
        de: "regulacao",
        para: "renascimento",
        relacionamento: "sobe",
        label: "sobe",
        animacao: "pulso_rapido",
      },
      {
        de: "renascimento",
        para: "soberano",
        relacionamento: "emerge",
        label: "emerge",
        animacao: "pulso_rapido",
      },
    ],
  };

  const ANIM = {
    pulso_rapido: { rate: 110, duration: [500, 800], packetClass: "gr-packet" },
    fluxo_lento: {
      rate: 380,
      duration: [1100, 1600],
      packetClass: "gr-packet dim",
    },
    default: { rate: 220, duration: [700, 1050], packetClass: "gr-packet dim" },
  };

  const VB = 400;
  const cx = VB / 2;
  const cy = VB / 2;
  const R = 110;
  const LABEL_MAX = 14;
  const EDGE_LABEL_MAX = 12;
  const SVG_NS = "http://www.w3.org/2000/svg";

  // Quadratic U: P0(40,80) P1(200,340) P2(360,80)
  const ARC = { x0: 40, y0: 80, x1: 200, y1: 340, x2: 360, y2: 80, splitY: 175 };

  const $json = document.getElementById("glyph-json");
  const $err = document.getElementById("glyph-error");
  const $tese = document.getElementById("glyph-tese");
  const $sub = document.getElementById("glyph-sub");
  const $meta = document.getElementById("glyph-meta");
  const $narr = document.getElementById("glyph-narrative");
  const $diagnostico = document.getElementById("glyph-diagnostico");
  const $pratica = document.getElementById("glyph-pratica");
  const $zones = document.getElementById("gr-zones");
  const $mesh = document.getElementById("gr-edges-mesh");
  const $edges = document.getElementById("gr-edges");
  const $edgeLabels = document.getElementById("gr-edge-labels");
  const $packets = document.getElementById("gr-packets");
  const $nodes = document.getElementById("gr-nodes");
  const $labels = document.getElementById("gr-labels");
  const root = document.getElementById("glyph-viz");

  const mk = (tag, attrs) => {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };

  const clear = (el) => {
    while (el.firstChild) el.removeChild(el.firstChild);
  };

  let mode = "radial";
  let nodes = [];
  let edges = [];
  let arcSamples = [];
  let packets = [];
  let lastSpawn = 0;
  let raf = null;
  let visible = true;

  function animKey(name) {
    if (name === "pulso_rapido" || name === "fluxo_lento") return name;
    return "default";
  }

  function showError(msg) {
    $err.hidden = !msg;
    $err.textContent = msg || "";
  }

  function stripFence(raw) {
    const t = raw.trim();
    const m = t.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    return m ? m[1].trim() : t;
  }

  function truncate(s, max) {
    const full = String(s).toLowerCase();
    if (full.length <= max) return { display: full, full };
    return { display: full.slice(0, max - 1) + "…", full };
  }

  function quadPoint(t) {
    const u = 1 - t;
    return {
      x: u * u * ARC.x0 + 2 * u * t * ARC.x1 + t * t * ARC.x2,
      y: u * u * ARC.y0 + 2 * u * t * ARC.y1 + t * t * ARC.y2,
    };
  }

  function buildArcSamples(steps) {
    const pts = [];
    let len = 0;
    let prev = quadPoint(0);
    pts.push({ t: 0, x: prev.x, y: prev.y, dist: 0 });
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const p = quadPoint(t);
      len += Math.hypot(p.x - prev.x, p.y - prev.y);
      pts.push({ t, x: p.x, y: p.y, dist: len });
      prev = p;
    }
    pts.totalLen = len;
    return pts;
  }

  function pointAtArcLength(samples, dist) {
    const target = Math.max(0, Math.min(dist, samples.totalLen));
    for (let i = 1; i < samples.length; i++) {
      if (samples[i].dist >= target) {
        const a = samples[i - 1];
        const b = samples[i];
        const span = b.dist - a.dist || 1;
        const u = (target - a.dist) / span;
        return {
          x: a.x + (b.x - a.x) * u,
          y: a.y + (b.y - a.y) * u,
          t: a.t + (b.t - a.t) * u,
        };
      }
    }
    const last = samples[samples.length - 1];
    return { x: last.x, y: last.y, t: last.t };
  }

  function parseGlyph(raw) {
    let data;
    try {
      data = JSON.parse(stripFence(raw));
    } catch (e) {
      throw new Error("JSON inválido: " + e.message);
    }
    if (!data || typeof data !== "object") throw new Error("Root deve ser object");
    if (!Array.isArray(data.nos) || data.nos.length < 4 || data.nos.length > 8) {
      throw new Error("nos: precisa 4–8 itens");
    }
    if (!Array.isArray(data.conexoes)) throw new Error("conexoes: array obrigatório");

    const meta = data.metadados || {};
    const modo = meta.modo === "arc" ? "arc" : "radial";
    data.metadados = meta;
    meta.modo = modo;

    const ids = new Set();
    for (const n of data.nos) {
      if (!n || !n.id || !n.label) throw new Error("cada nó precisa id + label");
      if (ids.has(n.id)) throw new Error("id duplicado: " + n.id);
      ids.add(n.id);
    }

    if (modo === "radial") {
      const cores = data.nos.filter((n) => n.papel === "core");
      if (cores.length === 0) {
        // compat: first node becomes core
        data.nos[0].papel = "core";
      } else if (cores.length > 1) {
        throw new Error("radial: exatamente 1 nó com papel core");
      }
    }

    return data;
  }

  function buildLayout(data) {
    mode = data.metadados.modo;
    const idToIdx = new Map();
    edges = [];
    arcSamples = [];

    if (mode === "arc") {
      const sorted = data.nos
        .slice()
        .sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
      arcSamples = buildArcSamples(64);
      const n = sorted.length;
      nodes = sorted.map((spec, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const p = pointAtArcLength(arcSamples, t * arcSamples.totalLen);
        idToIdx.set(spec.id, i);
        const lab = truncate(spec.label, LABEL_MAX);
        let papel = spec.papel;
        if (!papel) {
          if (i === 0) papel = "inicio";
          else if (i === n - 1) papel = "fim";
          else papel = "marco";
        }
        return {
          x: p.x,
          y: p.y,
          t,
          label: lab.display,
          labelFull: lab.full,
          id: spec.id,
          papel,
          zona: spec.zona || (p.y > ARC.splitY ? "oculto" : "visivel"),
          arcDist: t * arcSamples.totalLen,
        };
      });
    } else {
      const coreSpec =
        data.nos.find((n) => n.papel === "core") || data.nos[0];
      const orbits = data.nos.filter((n) => n.id !== coreSpec.id);
      const labCore = truncate(coreSpec.label, LABEL_MAX);
      nodes = [
        {
          x: cx,
          y: cy,
          angle: 0,
          label: labCore.display,
          labelFull: labCore.full,
          id: coreSpec.id,
          papel: "core",
        },
      ];
      idToIdx.set(coreSpec.id, 0);
      const m = orbits.length || 1;
      orbits.forEach((spec, i) => {
        const a = (i / m) * Math.PI * 2 - Math.PI / 2;
        const lab = truncate(spec.label, LABEL_MAX);
        idToIdx.set(spec.id, nodes.length);
        nodes.push({
          x: cx + R * Math.cos(a),
          y: cy + R * Math.sin(a),
          angle: a,
          label: lab.display,
          labelFull: lab.full,
          id: spec.id,
          papel: "orbit",
        });
      });
    }

    for (const c of data.conexoes) {
      const fi = idToIdx.get(c.de);
      const ti = idToIdx.get(c.para);
      if (fi === undefined || ti === undefined) {
        console.warn("glyph-renderer skip edge", c.de, "→", c.para);
        continue;
      }
      const rawLabel = c.label || c.relacionamento || "";
      const elab = truncate(rawLabel, EDGE_LABEL_MAX);
      const a = nodes[fi];
      const b = nodes[ti];
      const spoke =
        mode === "radial" &&
        (a.papel === "core" || b.papel === "core");
      edges.push({
        fromIdx: fi,
        toIdx: ti,
        a,
        b,
        kind: spoke ? "spoke" : mode === "radial" ? "ring" : "edge",
        relacionamento: c.relacionamento || "",
        animKey: animKey(c.animacao),
        label: elab.display,
        labelFull: elab.full,
      });
    }
  }

  function strokeClass(rel, anim) {
    const r = String(rel || "").toLowerCase();
    let kind = "solid";
    if (/op[oõ]e|corr[oó]i|quebra|restringe|corta|doma/.test(r)) kind = "dash";
    else if (/equilibra|cont[eé]m/.test(r)) kind = "dot";
    const thick = anim === "fluxo_lento" ? " thick" : "";
    return "gr-edge " + kind + thick;
  }

  function shortArcDelta(a0, a1) {
    let d = a1 - a0;
    while (d <= -Math.PI) d += Math.PI * 2;
    while (d > Math.PI) d -= Math.PI * 2;
    return d;
  }

  function ringArcSpec(a, b) {
    const d = shortArcDelta(a.angle, b.angle);
    const large = 0;
    const sweep = d >= 0 ? 1 : 0;
    const path =
      "M " +
      a.x +
      " " +
      a.y +
      " A " +
      R +
      " " +
      R +
      " 0 " +
      large +
      " " +
      sweep +
      " " +
      b.x +
      " " +
      b.y;
    const mid = a.angle + d / 2;
    return {
      path,
      midX: cx + R * Math.cos(mid),
      midY: cy + R * Math.sin(mid),
      outX: Math.cos(mid),
      outY: Math.sin(mid),
    };
  }

  function insetSpoke(from, to, insetFrom, insetTo) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    return {
      x1: from.x + ux * insetFrom,
      y1: from.y + uy * insetFrom,
      x2: to.x - ux * insetTo,
      y2: to.y - uy * insetTo,
    };
  }

  function drawNode(nd) {
    const open = nd.papel === "inicio" || nd.papel === "fim";
    const isCore = nd.papel === "core";
    const rRing = isCore ? 16 : open ? 9 : 8;
    if (isCore) {
      $nodes.appendChild(
        mk("circle", {
          cx: nd.x,
          cy: nd.y,
          r: 26,
          class: "gr-node-ring outer pulse",
        })
      );
    }
    const ring = mk("circle", {
      cx: nd.x,
      cy: nd.y,
      r: rRing,
      class: open ? "gr-node-ring open" : "gr-node-ring",
    });
    $nodes.appendChild(ring);
    if (!open) {
      $nodes.appendChild(
        mk("circle", {
          cx: nd.x,
          cy: nd.y,
          r: isCore ? 3.5 : 2,
          class: "gr-node-dot",
        })
      );
    }
  }

  function placeLabel(nd, offset) {
    let lx;
    let ly;
    let anchor = "middle";
    let cls = "gr-node-label";
    if (mode === "arc") {
      const below = nd.zona === "oculto" || nd.y >= ARC.splitY;
      const gap = below ? offset + 4 : -(offset + 4);
      lx = nd.x;
      ly = nd.y + gap;
    } else if (nd.papel === "core") {
      lx = nd.x;
      ly = nd.y + 40;
      cls = "gr-node-label core";
    } else {
      const lr = R + 20;
      lx = cx + lr * Math.cos(nd.angle);
      ly = cy + lr * Math.sin(nd.angle);
      anchor =
        Math.abs(Math.cos(nd.angle)) < 0.2
          ? "middle"
          : Math.cos(nd.angle) > 0
            ? "start"
            : "end";
    }
    const t = mk("text", {
      x: lx,
      y: ly,
      class: cls,
      "text-anchor": anchor,
      "dominant-baseline": "middle",
    });
    t.textContent = nd.label;
    if (nd.labelFull && nd.labelFull !== nd.label) {
      const title = mk("title");
      title.textContent = nd.labelFull;
      t.appendChild(title);
    }
    $labels.appendChild(t);
  }

  function placeEdgeLabelAt(mx, my, e) {
    if (!e.label) return;
    const approxW = Math.max(28, e.label.length * 5.2);
    const approxH = 11;
    $edgeLabels.appendChild(
      mk("rect", {
        x: mx - approxW / 2,
        y: my - approxH / 2 - 1,
        width: approxW,
        height: approxH,
        class: "gr-edge-halo",
        rx: 2,
      })
    );
    const t = mk("text", {
      x: mx,
      y: my,
      class: "gr-edge-label",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    t.textContent = e.label;
    if (e.labelFull && e.labelFull !== e.label) {
      const title = mk("title");
      title.textContent = e.labelFull;
      t.appendChild(title);
    }
    $edgeLabels.appendChild(t);
  }

  function drawEdgeLabel(e) {
    if (!e.label) return;

    if (mode === "radial" && e.kind === "ring") {
      const arc = ringArcSpec(e.a, e.b);
      const off = 14;
      placeEdgeLabelAt(arc.midX + arc.outX * off, arc.midY + arc.outY * off, e);
      return;
    }

    if (mode === "radial" && e.kind === "spoke") {
      const tAlong = 0.62;
      const orbit = e.a.papel === "core" ? e.b : e.a;
      const mx = cx + (orbit.x - cx) * tAlong;
      const my = cy + (orbit.y - cy) * tAlong;
      const fl = Math.hypot(orbit.x - cx, orbit.y - cy) || 1;
      const nx = (orbit.x - cx) / fl;
      const ny = (orbit.y - cy) / fl;
      // perpendicular offset so label sits beside spoke
      placeEdgeLabelAt(mx - ny * 12, my + nx * 12, e);
      return;
    }

    const dx = e.b.x - e.a.x;
    const dy = e.b.y - e.a.y;
    const tAlong = 0.5;
    const mx0 = e.a.x + dx * tAlong;
    const my0 = e.a.y + dy * tAlong;
    const toCtrlX = mx0 - ARC.x1;
    const toCtrlY = my0 - ARC.y1;
    const cl = Math.hypot(toCtrlX, toCtrlY) || 1;
    placeEdgeLabelAt(
      mx0 + (toCtrlX / cl) * 16,
      my0 + (toCtrlY / cl) * 16,
      e
    );
  }

  function drawRadial() {
    clear($zones);
    clear($mesh);

    $zones.appendChild(
      mk("circle", {
        cx: cx,
        cy: cy,
        r: R,
        class: "gr-guide-ring",
      })
    );
    $zones.appendChild(
      mk("circle", {
        cx: cx,
        cy: cy,
        r: R * 0.45,
        class: "gr-guide-ring inner",
      })
    );

    for (const e of edges) {
      const cls = strokeClass(e.relacionamento, e.animKey);
      if (e.kind === "spoke") {
        const from = e.a;
        const to = e.b;
        const insetA = from.papel === "core" ? 18 : 10;
        const insetB = to.papel === "core" ? 18 : 10;
        const s = insetSpoke(from, to, insetA, insetB);
        const line = mk("line", {
          x1: s.x1,
          y1: s.y1,
          x2: s.x2,
          y2: s.y2,
          class: cls,
          "marker-end": "url(#gr-arrow)",
        });
        $edges.appendChild(line);
      } else {
        const arc = ringArcSpec(e.a, e.b);
        const path = mk("path", {
          d: arc.path,
          class: cls + " ring",
          "marker-end": "url(#gr-arrow)",
        });
        $edges.appendChild(path);
      }
      drawEdgeLabel(e);
    }

    for (const nd of nodes) {
      drawNode(nd);
      placeLabel(nd, 16);
    }
  }

  function drawArc(data) {
    clear($mesh);
    const pathD = `M ${ARC.x0} ${ARC.y0} Q ${ARC.x1} ${ARC.y1} ${ARC.x2} ${ARC.y2}`;

    const hatch = mk("path", {
      d: `${pathD} L ${ARC.x2} ${ARC.splitY} L ${ARC.x0} ${ARC.splitY} Z`,
      class: "gr-hatch",
      fill: "url(#gr-hatch)",
    });
    $zones.appendChild(hatch);

    $zones.appendChild(
      mk("line", {
        x1: 24,
        y1: ARC.splitY,
        x2: 376,
        y2: ARC.splitY,
        class: "gr-zone-line",
      })
    );

    const zonas = Array.isArray(data.zonas) ? data.zonas : [];
    const topZ = zonas.find((z) => z.id === "visivel") || {
      label: "visível",
    };
    const botZ = zonas.find((z) => z.id === "oculto") || { label: "oculto" };
    const zt = mk("text", {
      x: 28,
      y: ARC.splitY - 8,
      class: "gr-zone-label",
      "text-anchor": "start",
    });
    zt.textContent = String(topZ.label || "visível").toLowerCase();
    $zones.appendChild(zt);
    const zb = mk("text", {
      x: 28,
      y: ARC.splitY + 14,
      class: "gr-zone-label",
      "text-anchor": "start",
    });
    zb.textContent = String(botZ.label || "oculto").toLowerCase();
    $zones.appendChild(zb);

    $edges.appendChild(mk("path", { d: pathD, class: "gr-arc-path" }));

    // path alone = journey; labels only (no faint chords)
    for (const e of edges) {
      drawEdgeLabel(e);
    }

    for (const nd of nodes) {
      drawNode(nd);
      placeLabel(nd, 16);
    }
  }

  function drawStatic(data) {
    clear($zones);
    clear($mesh);
    clear($edges);
    clear($edgeLabels);
    clear($nodes);
    clear($labels);
    clear($packets);
    packets = [];

    if (mode === "arc") drawArc(data);
    else drawRadial();
  }

  function spawnPacket(now) {
    if (mode === "arc" && arcSamples.length) {
      const cfg = ANIM.default;
      const [durMin, durMax] = cfg.duration;
      const startDist = Math.random() * arcSamples.totalLen * 0.85;
      const travel = arcSamples.totalLen * (0.12 + Math.random() * 0.2);
      const p0 = pointAtArcLength(arcSamples, startDist);
      const dot = mk("circle", {
        cx: p0.x,
        cy: p0.y,
        r: 2.2,
        class: "gr-packet",
      });
      $packets.appendChild(dot);
      packets.push({
        kind: "arc",
        startDist,
        travel,
        dot,
        start: now,
        duration: durMin + Math.random() * (durMax - durMin),
      });
      return;
    }

    const spokes = edges.filter((e) => e.kind === "spoke");
    if (!spokes.length) return;
    const e = spokes[Math.floor(Math.random() * spokes.length)];
    const cfg = ANIM[e.animKey] || ANIM.default;
    const [durMin, durMax] = cfg.duration;
    // follow direction de → para
    const a = e.a;
    const b = e.b;
    const dot = mk("circle", {
      cx: a.x,
      cy: a.y,
      r: 2.2,
      class: cfg.packetClass,
    });
    $packets.appendChild(dot);
    packets.push({
      kind: "edge",
      a,
      b,
      dot,
      start: now,
      duration: durMin + Math.random() * (durMax - durMin) + 200,
      animKey: e.animKey,
    });
  }

  function meanSpawnRate() {
    if (mode === "arc") return 280;
    const spokes = edges.filter((e) => e.kind === "spoke");
    if (!spokes.length) return 9999;
    return 320;
  }

  function tick(now) {
    if (!visible) {
      raf = null;
      return;
    }

    const rate = meanSpawnRate();
    const cap = mode === "arc" ? 6 : 4;

    if (now - lastSpawn > rate && packets.length < cap) {
      spawnPacket(now);
      lastSpawn = now;
    }

    for (let k = packets.length - 1; k >= 0; k--) {
      const p = packets[k];
      const t = (now - p.start) / p.duration;
      if (t >= 1) {
        p.dot.remove();
        packets.splice(k, 1);
        continue;
      }
      if (p.kind === "arc") {
        const d = p.startDist + p.travel * t;
        const pt = pointAtArcLength(arcSamples, d);
        p.dot.setAttribute("cx", pt.x);
        p.dot.setAttribute("cy", pt.y);
      } else {
        p.dot.setAttribute("cx", p.a.x + (p.b.x - p.a.x) * t);
        p.dot.setAttribute("cy", p.a.y + (p.b.y - p.a.y) * t);
      }
    }

    raf = requestAnimationFrame(tick);
  }

  function ensureLoop() {
    if (!raf && visible) raf = requestAnimationFrame(tick);
  }

  function setNarrative(meta) {
    const n = (meta && meta.narrativa) || {};
    const diagnostico = n.diagnostico || n.problema || "";
    const pratica = n.pratica || n.trabalho || "";
    if (!diagnostico && !pratica) {
      $narr.hidden = true;
      return;
    }
    $narr.hidden = false;
    $diagnostico.textContent = diagnostico;
    $pratica.textContent = pratica;
  }

  function render(data) {
    buildLayout(data);
    drawStatic(data);
    const meta = data.metadados || {};
    const title = meta.titulo || meta.tese_central || "glifo";
    $tese.textContent = title;
    $tese.title = meta.tese_central || title;
    $sub.textContent = meta.subtitulo || "";
    $meta.textContent =
      meta.modo + " · " + nodes.length + " nós · " + edges.length + " fluxos";
    setNarrative(meta);
    showError("");
    console.log("glyph-renderer render", {
      modo: mode,
      nos: nodes.length,
      conexoes: edges.length,
    });
    ensureLoop();
  }

  function onRenderClick() {
    console.log("glyph-renderer click render");
    try {
      render(parseGlyph($json.value.trim()));
    } catch (e) {
      showError(e.message);
      console.warn("glyph-renderer", e);
    }
  }

  function loadDemo(demo, name) {
    console.log("glyph-renderer exemplo", name);
    $json.value = JSON.stringify(demo, null, 2);
    render(demo);
  }

  document.getElementById("btn-render").addEventListener("click", onRenderClick);
  document
    .getElementById("btn-example-radial")
    .addEventListener("click", () => loadDemo(DEMO_RADIAL, "radial"));
  document
    .getElementById("btn-example-arc")
    .addEventListener("click", () => loadDemo(DEMO_ARC, "arc"));

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        visible = e.isIntersecting;
        if (visible) ensureLoop();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      }
    },
    { threshold: 0.1 }
  );
  io.observe(root);

  loadDemo(DEMO_RADIAL, "radial");
})();
