/**
 * Glyph renderer — radial | arc | venn (blueprint / schematic).
 * ponytail: vanilla SVG + RAF; clarity > decoration.
 */
(function glyphRenderer() {
  const DEMO_RADIAL = {
    metadados: {
      modo: "radial",
      titulo: "Glifo Sistêmico",
      subtitulo: "Circuito: núcleo + spokes + anel",
      tese_central:
        "Toda ideia complexa pode ser mapeada como sistema fechado radial.",
      estilo_visual: "dark_minimalist_cyberpunk",
      narrativa: {
        diagnostico:
          "Listas e pirâmides escondem interações; o leitor vê partes, não o sistema.",
        pratica:
          "Coloque a tese no centro. Spokes nomeados. Anel só entre vizinhos.",
        sintese: "Núcleo orquestra. Órbita executa. Fluxo tem verbo.",
      },
    },
    zonas: [],
    nos: [
      {
        id: "tese",
        label: "tese",
        papel: "core",
        categoria: "nucleo",
        forma: "circle",
      },
      {
        id: "nos",
        label: "nós",
        papel: "orbit",
        categoria: "estrutura",
        forma: "square",
      },
      {
        id: "fluxos",
        label: "fluxos",
        papel: "orbit",
        categoria: "relacao",
        forma: "triangle",
      },
      {
        id: "ritmo",
        label: "ritmo",
        papel: "orbit",
        categoria: "dinamica",
        forma: "circle",
      },
      {
        id: "canvas",
        label: "canvas",
        papel: "orbit",
        categoria: "geometria",
        forma: "square",
      },
      {
        id: "ink",
        label: "data-ink",
        papel: "orbit",
        categoria: "principio",
        forma: "triangle",
      },
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
      subtitulo: "Do automático ao soberano",
      tese_central: "Mudança real desce ao oculto antes de emergir de novo.",
      estilo_visual: "dark_minimalist_cyberpunk",
      narrativa: {
        diagnostico:
          "Tentar mudar só o visível ignora a ruptura e o trabalho interno.",
        pratica:
          "Nomeie a descida, o fundo e a subida. Oculto é zona, não falha.",
        sintese: "Descer → trabalhar → emergir.",
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
        forma: "circle",
      },
      {
        id: "ruptura",
        label: "ruptura",
        papel: "marco",
        zona: "visivel",
        ordem: 2,
        forma: "triangle",
      },
      {
        id: "dissolucao",
        label: "dissolução",
        papel: "marco",
        zona: "oculto",
        ordem: 3,
        forma: "square",
      },
      {
        id: "regulacao",
        label: "regulação",
        papel: "marco",
        zona: "oculto",
        ordem: 4,
        forma: "square",
      },
      {
        id: "renascimento",
        label: "renascimento",
        papel: "marco",
        zona: "visivel",
        ordem: 5,
        forma: "triangle",
      },
      {
        id: "soberano",
        label: "soberano",
        papel: "fim",
        zona: "visivel",
        ordem: 6,
        forma: "circle",
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

  const DEMO_VENN = {
    metadados: {
      modo: "venn",
      titulo: "Ikigai",
      subtitulo: "Quatro universos → um propósito",
      tese_central:
        "Propósito nasce na interseção do que amo, faço bem, o mundo precisa e paga.",
      estilo_visual: "dark_minimalist_cyberpunk",
      narrativa: {
        diagnostico:
          "Escolher carreira por um só eixo deixa lacunas.",
        pratica:
          "Mapeie os quatro universos. Leia as interseções. Ajuste o centro.",
        sintese: "Ikigai = amar × bem × mundo × pagamento.",
      },
    },
    universos: [
      { id: "ama", label: "o que amo" },
      { id: "mundo", label: "mundo precisa" },
      { id: "pago", label: "posso cobrar" },
      { id: "bom", label: "faço bem" },
    ],
    intersecoes: [
      { de: ["ama", "bom"], label: "paixão" },
      { de: ["ama", "mundo"], label: "missão" },
      { de: ["mundo", "pago"], label: "vocação" },
      { de: ["pago", "bom"], label: "profissão" },
      {
        de: ["ama", "mundo", "pago"],
        label: "prazer sem riqueza",
        callout: true,
      },
      {
        de: ["ama", "bom", "pago"],
        label: "conforto vazio",
        callout: true,
      },
      {
        de: ["ama", "bom", "mundo", "pago"],
        label: "ikigai",
        papel: "core",
      },
    ],
  };

  const DEMO_ECONOMIA = {
    metadados: {
      modo: "radial",
      titulo: "Economia Invertida",
      subtitulo: "negócio ↔ lifestyle, sem início nem fim",
      tese_central:
        "Lifestyle não é prêmio do negócio — é combustível dele; o produto financia a vida que o alimenta.",
      estilo_visual: "dark_minimalist_cyberpunk",
      narrativa: {
        diagnostico:
          "O mito separa trabalho e vida: trabalhar para viver, ou viver para trabalhar — lifestyle vira recompensa atrasada.",
        pratica:
          "Viver de forma que o viver alimente o sistema: a vida construída é o produto; o produto financia a vida.",
        sintese:
          "Simbiose sem ponta: lifestyle alimenta o negócio que devolve liberdade.",
      },
    },
    zonas: [],
    nos: [
      { id: "liberdade", label: "liberdade", papel: "core", categoria: "nucleo" },
      {
        id: "lifestyle",
        label: "lifestyle",
        papel: "orbit",
        papel_semantico: "estado",
      },
      {
        id: "negocio",
        label: "negócio",
        papel: "orbit",
        papel_semantico: "motor",
      },
      {
        id: "produto",
        label: "produto",
        papel: "orbit",
        papel_semantico: "fluxo",
        apontar: "lifestyle",
      },
    ],
    conexoes: [
      {
        de: "liberdade",
        para: "lifestyle",
        relacionamento: "ancora",
        label: "ancora",
        animacao: "fluxo_lento",
      },
      {
        de: "liberdade",
        para: "negocio",
        relacionamento: "ancora",
        label: "ancora",
        animacao: "fluxo_lento",
      },
      {
        de: "liberdade",
        para: "produto",
        relacionamento: "ancora",
        label: "ancora",
        animacao: "fluxo_lento",
      },
      {
        de: "lifestyle",
        para: "negocio",
        relacionamento: "alimenta",
        label: "alimenta",
        animacao: "pulso_rapido",
      },
      {
        de: "negocio",
        para: "produto",
        relacionamento: "gera",
        label: "gera",
        animacao: "pulso_rapido",
      },
      {
        de: "produto",
        para: "lifestyle",
        relacionamento: "financia",
        label: "financia",
        animacao: "fluxo_lento",
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
  const ARC = { x0: 40, y0: 80, x1: 200, y1: 340, x2: 360, y2: 80, splitY: 175 };
  const VENN_R = 98;
  const VENN_OFF = 50;

  const $json = document.getElementById("glyph-json");
  const $err = document.getElementById("glyph-error");
  const $tese = document.getElementById("glyph-tese");
  const $sub = document.getElementById("glyph-sub");
  const $meta = document.getElementById("glyph-meta");
  const $narr = document.getElementById("glyph-narrative");
  const $diagnostico = document.getElementById("glyph-diagnostico");
  const $pratica = document.getElementById("glyph-pratica");
  const $sintese = document.getElementById("glyph-sintese");
  const $sinteseCol = document.getElementById("glyph-sintese-col");
  const $blueprint = document.getElementById("gr-blueprint");
  const $story = document.getElementById("gr-story");
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
  let universos = [];
  let intersecoes = [];
  let arcSamples = [];
  let packets = [];
  let edgeLabelPts = [];
  let lastSpawn = 0;
  let raf = null;
  let visible = true;
  let glyphData = null;

  function animKey(name) {
    if (name === "flujo_lento") return "fluxo_lento"; // typo alias
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

  function formaFromPapelSemantico(ps) {
    const k = String(ps || "").toLowerCase();
    if (k === "estado") return "circle";
    if (k === "motor") return "square";
    if (k === "fluxo") return "triangle";
    return null;
  }

  function formaFromCategoria(spec) {
    const cat = String(spec.categoria || "").toLowerCase();
    if (/estrutura|marco|geometria/.test(cat)) return "square";
    if (/relacao|tens|dinam/.test(cat)) return "triangle";
    return "circle";
  }

  function resolveForma(spec) {
    if (spec.forma === "square" || spec.forma === "triangle" || spec.forma === "circle")
      return spec.forma;
    const fromPs = formaFromPapelSemantico(spec.papel_semantico);
    if (fromPs) return fromPs;
    if (spec.papel === "core") return "circle";
    return null; // pending graph inference or categoria
  }

  function shouldInferForma(spec) {
    if (spec.forma === "square" || spec.forma === "triangle" || spec.forma === "circle")
      return false;
    if (formaFromPapelSemantico(spec.papel_semantico)) return false;
    if (spec.papel === "core") return false;
    return true;
  }

  function isTensionNode(nd) {
    if (nd.forma === "triangle") return true;
    if (nd.papel_semantico === "fluxo") return true;
    return /relacao|tens|dinam/.test(String(nd.categoria || "").toLowerCase());
  }

  /** Apex-up triangle → rotate so apex faces target. SVG y-down. */
  function resolveApontarTarget(nd) {
    if (nd.apontar) {
      const t = nodes.find((n) => n.id === nd.apontar);
      if (t) return t;
    }
    const ringPulse = edges.find(
      (e) => e.a.id === nd.id && e.kind === "ring" && e.animKey === "pulso_rapido"
    );
    if (ringPulse) return ringPulse.b;
    const out = edges.find((e) => e.a.id === nd.id);
    if (out) return out.b;
    const a = nd.angle != null ? nd.angle : Math.atan2(nd.y - cy, nd.x - cx);
    return { x: cx + Math.cos(a) * (R + 40), y: cy + Math.sin(a) * (R + 40) };
  }

  function triangleRotateDeg(nd) {
    const t = resolveApontarTarget(nd);
    const target = Math.atan2(t.y - nd.y, t.x - nd.x);
    const apexUp = -Math.PI / 2;
    return ((target - apexUp) * 180) / Math.PI;
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

  function vennCenters(n) {
    if (n === 2) {
      return [
        { x: cx - VENN_OFF, y: cy },
        { x: cx + VENN_OFF, y: cy },
      ];
    }
    if (n === 3) {
      return [0, 1, 2].map((i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
        return {
          x: cx + VENN_OFF * 1.05 * Math.cos(a),
          y: cy + VENN_OFF * 1.05 * Math.sin(a),
        };
      });
    }
    // 4 = Ikigai cardinal: top, right, bottom, left
    return [
      { x: cx, y: cy - VENN_OFF },
      { x: cx + VENN_OFF, y: cy },
      { x: cx, y: cy + VENN_OFF },
      { x: cx - VENN_OFF, y: cy },
    ];
  }

  function parseGlyph(raw) {
    let data;
    try {
      data = JSON.parse(stripFence(raw));
    } catch (e) {
      throw new Error("JSON inválido: " + e.message);
    }
    if (!data || typeof data !== "object") throw new Error("Root deve ser object");

    const meta = data.metadados || {};
    let modo = "radial";
    if (meta.modo === "arc") modo = "arc";
    else if (meta.modo === "venn") modo = "venn";
    data.metadados = meta;
    meta.modo = modo;

    if (modo === "venn") {
      if (!Array.isArray(data.universos) || data.universos.length < 2 || data.universos.length > 4) {
        throw new Error("venn: universos precisa 2–4 itens");
      }
      if (!Array.isArray(data.intersecoes)) data.intersecoes = [];
      return data;
    }

    if (!Array.isArray(data.nos) || data.nos.length < 4 || data.nos.length > 8) {
      throw new Error("nos: precisa 4–8 itens");
    }
    if (!Array.isArray(data.conexoes)) throw new Error("conexoes: array obrigatório");

    const ids = new Set();
    for (const n of data.nos) {
      if (!n || !n.id || !n.label) throw new Error("cada nó precisa id + label");
      if (ids.has(n.id)) throw new Error("id duplicado: " + n.id);
      ids.add(n.id);
    }

    if (modo === "radial") {
      const cores = data.nos.filter((n) => n.papel === "core");
      if (cores.length === 0) data.nos[0].papel = "core";
      else if (cores.length > 1) throw new Error("radial: exatamente 1 nó com papel core");
    }

    return data;
  }

  function buildLayout(data) {
    mode = data.metadados.modo;
    const idToIdx = new Map();
    edges = [];
    arcSamples = [];
    universos = [];
    intersecoes = [];
    edgeLabelPts = [];
    nodes = [];

    if (mode === "venn") {
      const n = data.universos.length;
      const centers = vennCenters(n);
      universos = data.universos.map((u, i) => {
        const lab = truncate(u.label, 16);
        return {
          id: u.id,
          label: lab.display,
          labelFull: lab.full,
          x: centers[i].x,
          y: centers[i].y,
          r: VENN_R,
        };
      });
      const byId = new Map(universos.map((u) => [u.id, u]));
      intersecoes = (data.intersecoes || []).map((it) => {
        const ids = it.de || [];
        const pts = ids.map((id) => byId.get(id)).filter(Boolean);
        let x = cx;
        let y = cy;
        if (pts.length) {
          x = pts.reduce((s, p) => s + p.x, 0) / pts.length;
          y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
        }
        if (ids.length >= 4 || it.papel === "core") {
          x = cx;
          y = cy;
        }
        const lab = truncate(it.label || "", ids.length >= 3 ? 18 : 12);
        return {
          ids,
          label: lab.display,
          labelFull: lab.full,
          x,
          y,
          papel: it.papel || (ids.length >= 4 ? "core" : "lobe"),
          callout: !!it.callout && ids.length === 3,
        };
      });
      return;
    }

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
          forma: resolveForma(spec),
          categoria: spec.categoria || "",
          zona: spec.zona || (p.y > ARC.splitY ? "oculto" : "visivel"),
          arcDist: t * arcSamples.totalLen,
          papel_semantico: spec.papel_semantico || null,
          inferForma: shouldInferForma(spec),
        };
      });
      for (const nd of nodes) {
        if (!nd.forma) nd.forma = formaFromCategoria(nd);
      }
    } else {
      const coreSpec = data.nos.find((n) => n.papel === "core") || data.nos[0];
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
          forma: resolveForma(coreSpec) || "circle",
          categoria: coreSpec.categoria || "",
          apontar: coreSpec.apontar || null,
          papel_semantico: coreSpec.papel_semantico || null,
          inferForma: false,
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
          forma: resolveForma(spec),
          categoria: spec.categoria || "",
          apontar: spec.apontar || null,
          papel_semantico: spec.papel_semantico || null,
          inferForma: shouldInferForma(spec),
        });
      });
    }

    for (const c of data.conexoes || []) {
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
        mode === "radial" && (a.papel === "core" || b.papel === "core");
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

    if (mode === "radial") applyRadialFormaInference();
  }

  function applyRadialFormaInference() {
    const pending = nodes.filter((n) => n.inferForma && n.papel === "orbit");
    if (!pending.length) return;

    if (!hasClosedRingCycle()) {
      for (const n of pending) {
        n.forma = formaFromCategoria(n);
        n.inferForma = false;
      }
      return;
    }

    const ringOuts = (nd) =>
      edges.filter((e) => e.kind === "ring" && e.a.id === nd.id);

    let fluxoNode = null;
    let best = -1;
    for (const n of pending) {
      const outs = ringOuts(n);
      const score =
        outs.length +
        outs.filter((e) => e.animKey === "pulso_rapido").length * 10;
      if (score > best) {
        best = score;
        fluxoNode = n;
      }
    }
    if (fluxoNode && best > 0) {
      fluxoNode.forma = "triangle";
      fluxoNode.papel_semantico = fluxoNode.papel_semantico || "fluxo";
      if (!fluxoNode.apontar) {
        const outs = ringOuts(fluxoNode);
        const pulse = outs.find((e) => e.animKey === "pulso_rapido");
        const pick = pulse || outs[0];
        if (pick) fluxoNode.apontar = pick.b.id;
      }
      fluxoNode.inferForma = false;
    }

    for (const n of pending) {
      if (n.forma) {
        n.inferForma = false;
        continue;
      }
      const outs = ringOuts(n);
      const motor = outs.some((e) =>
        /gera|decomp[oõ]e|cont[eé]m/.test(
          String(e.relacionamento || e.label || "").toLowerCase()
        )
      );
      if (motor) {
        n.forma = "square";
        n.papel_semantico = n.papel_semantico || "motor";
      } else {
        n.forma = "circle";
        n.papel_semantico = n.papel_semantico || "estado";
      }
      n.inferForma = false;
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
      " 0 0 " +
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

  function drawBlueprintFrame(refText) {
    clear($blueprint);
    $blueprint.appendChild(
      mk("rect", {
        x: -28,
        y: -28,
        width: 456,
        height: 456,
        class: "gr-blueprint-grid",
        fill: "url(#gr-blueprint-grid)",
      })
    );
    const corners = [
      [-24, -24, 1, 1],
      [424, -24, -1, 1],
      [-24, 424, 1, -1],
      [424, 424, -1, -1],
    ];
    for (const [x, y, sx, sy] of corners) {
      $blueprint.appendChild(
        mk("path", {
          d:
            "M " +
            (x + 14 * sx) +
            " " +
            y +
            " L " +
            x +
            " " +
            y +
            " L " +
            x +
            " " +
            (y + 14 * sy),
          class: "gr-blueprint-corner",
        })
      );
    }
    const t = mk("text", {
      x: -20,
      y: 428,
      class: "gr-blueprint-ref",
      "text-anchor": "start",
    });
    t.textContent = refText || "REF";
    $blueprint.appendChild(t);
  }

  function drawNodeShape(nd) {
    const open = nd.papel === "inicio" || nd.papel === "fim";
    const isCore = nd.papel === "core";
    const rRing = isCore ? 16 : open ? 9 : 9;
    const forma = nd.forma || "circle";

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

    $nodes.appendChild(
      mk("circle", {
        cx: nd.x,
        cy: nd.y,
        r: rRing,
        class: open ? "gr-node-ring open" : "gr-node-ring",
      })
    );

    if (open) return;

    const s = isCore ? 7 : 5;
    if (forma === "square") {
      $nodes.appendChild(
        mk("rect", {
          x: nd.x - s,
          y: nd.y - s,
          width: s * 2,
          height: s * 2,
          class: "gr-node-shape",
        })
      );
    } else if (forma === "triangle") {
      const h = s * 1.15;
      const d =
        "M " +
        nd.x +
        " " +
        (nd.y - h) +
        " L " +
        (nd.x + h) +
        " " +
        (nd.y + h * 0.7) +
        " L " +
        (nd.x - h) +
        " " +
        (nd.y + h * 0.7) +
        " Z";
      const rot = mode === "radial" ? triangleRotateDeg(nd) : 0;
      $nodes.appendChild(
        mk("path", {
          d: d,
          class: "gr-node-shape",
          transform: "rotate(" + rot + " " + nd.x + " " + nd.y + ")",
        })
      );
    } else {
      $nodes.appendChild(
        mk("circle", {
          cx: nd.x,
          cy: nd.y,
          r: isCore ? 3.5 : 2.2,
          class: "gr-node-dot",
        })
      );
    }
  }

  function placeLabel(nd, offset) {
    // radial core label omitted — title lives in head (avoids spoke collisions)
    if (mode === "radial" && nd.papel === "core") return;

    let lx;
    let ly;
    let anchor = "middle";
    let cls = "gr-node-label";
    if (mode === "arc") {
      const below = nd.zona === "oculto" || nd.y >= ARC.splitY;
      const gap = below ? offset + 4 : -(offset + 4);
      lx = nd.x;
      ly = nd.y + gap;
    } else {
      const lr = R + 22;
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

  function nudgeAwayFromCenter(x, y, minDist) {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.hypot(dx, dy) || 1;
    if (d >= minDist) return { x: x, y: y };
    const s = minDist / d;
    return { x: cx + dx * s, y: cy + dy * s };
  }

  function placeEdgeLabelAt(mx, my, e, tangent) {
    if (!e.label) return;
    let x = mx;
    let y = my;
    const tx = (tangent && tangent.x) || 0;
    const ty = (tangent && tangent.y) || 0;
    if (mode === "radial") {
      for (const prev of edgeLabelPts) {
        if (Math.hypot(x - prev.x, y - prev.y) < 16) {
          x += tx * 6;
          y += ty * 6;
        }
      }
      edgeLabelPts.push({ x: x, y: y });
    }

    const approxW = Math.max(30, e.label.length * 5.4);
    const approxH = 12;
    $edgeLabels.appendChild(
      mk("rect", {
        x: x - approxW / 2,
        y: y - approxH / 2 - 1,
        width: approxW,
        height: approxH,
        class: "gr-edge-halo",
        rx: 2,
      })
    );
    const t = mk("text", {
      x: x,
      y: y,
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
      const out = R * 0.14;
      const d = shortArcDelta(e.a.angle, e.b.angle);
      const sign = d >= 0 ? 1 : -1;
      const mid = e.a.angle + d / 2;
      const tangent = {
        x: -Math.sin(mid) * sign,
        y: Math.cos(mid) * sign,
      };
      placeEdgeLabelAt(
        arc.midX + arc.outX * out,
        arc.midY + arc.outY * out,
        e,
        tangent
      );
      return;
    }

    if (mode === "radial" && e.kind === "spoke") {
      const SPOKE_LABEL_R = 42;
      const PERP = 14;
      const orbit = e.a.papel === "core" ? e.b : e.a;
      const fl = Math.hypot(orbit.x - cx, orbit.y - cy) || 1;
      const nx = (orbit.x - cx) / fl;
      const ny = (orbit.y - cy) / fl;
      // left of outbound spoke (CCW) — same rule every spoke → symmetry
      const px = -ny;
      const py = nx;
      const mx = cx + nx * SPOKE_LABEL_R + px * PERP;
      const my = cy + ny * SPOKE_LABEL_R + py * PERP;
      placeEdgeLabelAt(mx, my, e, { x: nx, y: ny });
      return;
    }

    const dx = e.b.x - e.a.x;
    const dy = e.b.y - e.a.y;
    const mx0 = e.a.x + dx * 0.5;
    const my0 = e.a.y + dy * 0.5;
    const toCtrlX = mx0 - ARC.x1;
    const toCtrlY = my0 - ARC.y1;
    const cl = Math.hypot(toCtrlX, toCtrlY) || 1;
    placeEdgeLabelAt(mx0 + (toCtrlX / cl) * 16, my0 + (toCtrlY / cl) * 16, e);
  }

  function hasClosedRingCycle() {
    const orbits = nodes.filter((n) => n.papel === "orbit");
    if (orbits.length < 3) return false;
    const sorted = orbits.slice().sort((a, b) => a.angle - b.angle);
    const ringKeys = new Set();
    for (const e of edges) {
      if (e.kind !== "ring") continue;
      ringKeys.add([e.a.id, e.b.id].sort().join("|"));
    }
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i];
      const b = sorted[(i + 1) % sorted.length];
      if (!ringKeys.has([a.id, b.id].sort().join("|"))) return false;
    }
    return true;
  }

  function drawRingChevron(e) {
    const d = shortArcDelta(e.a.angle, e.b.angle);
    const mid = e.a.angle + d / 2;
    const mx = cx + R * Math.cos(mid);
    const my = cy + R * Math.sin(mid);
    // tangent in travel direction (increasing angle → (-sin, cos) in SVG coords)
    const sign = d >= 0 ? 1 : -1;
    const tx = -Math.sin(mid) * sign;
    const ty = Math.cos(mid) * sign;
    const nx = Math.cos(mid);
    const ny = Math.sin(mid);
    const len = 5;
    const wing = 3.5;
    const tipX = mx + tx * len;
    const tipY = my + ty * len;
    const b1x = mx - tx * 1.5 + nx * wing;
    const b1y = my - ty * 1.5 + ny * wing;
    const b2x = mx - tx * 1.5 - nx * wing;
    const b2y = my - ty * 1.5 - ny * wing;
    $story.appendChild(
      mk("path", {
        d:
          "M " +
          b1x +
          " " +
          b1y +
          " L " +
          tipX +
          " " +
          tipY +
          " L " +
          b2x +
          " " +
          b2y,
        class: "gr-story-chevron",
      })
    );
  }

  function drawRadialStoryMarks() {
    if (!$story) return;
    clear($story);

    for (const e of edges) {
      if (e.kind === "ring") drawRingChevron(e);
    }

    const tension = nodes.filter(
      (n) => n.papel === "orbit" && isTensionNode(n)
    );
    if (tension.length >= 3) {
      // prefer nodes with outbound ring/spoke; keep angular spread
      const ranked = tension.slice().sort((a, b) => {
        const outA = edges.filter((e) => e.a.id === a.id).length;
        const outB = edges.filter((e) => e.a.id === b.id).length;
        if (outB !== outA) return outB - outA;
        return a.angle - b.angle;
      });
      const pick = ranked.slice(0, 3).sort((a, b) => a.angle - b.angle);
      const inset = 0.72;
      const pts = pick.map((n) => ({
        x: cx + (n.x - cx) * inset,
        y: cy + (n.y - cy) * inset,
      }));
      $story.appendChild(
        mk("path", {
          d:
            "M " +
            pts[0].x +
            " " +
            pts[0].y +
            " L " +
            pts[1].x +
            " " +
            pts[1].y +
            " L " +
            pts[2].x +
            " " +
            pts[2].y +
            " Z",
          class: "gr-story-frame",
        })
      );
    }

    if (hasClosedRingCycle()) {
      const rTick = R * 0.45;
      const tick = 5;
      const cards = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
      for (const a of cards) {
        const ux = Math.cos(a);
        const uy = Math.sin(a);
        $story.appendChild(
          mk("line", {
            x1: cx + ux * (rTick - tick),
            y1: cy + uy * (rTick - tick),
            x2: cx + ux * (rTick + tick),
            y2: cy + uy * (rTick + tick),
            class: "gr-story-tick",
          })
        );
      }
    }
  }

  function drawRadial() {
    clear($zones);
    clear($mesh);
    if ($story) clear($story);

    $zones.appendChild(
      mk("circle", { cx: cx, cy: cy, r: R, class: "gr-guide-ring" })
    );
    $zones.appendChild(
      mk("circle", {
        cx: cx,
        cy: cy,
        r: R * 0.45,
        class: "gr-guide-ring inner",
      })
    );

    drawRadialStoryMarks();

    for (const e of edges) {
      const cls = strokeClass(e.relacionamento, e.animKey);
      if (e.kind === "spoke") {
        const insetA = e.a.papel === "core" ? 18 : 10;
        const insetB = e.b.papel === "core" ? 18 : 10;
        const s = insetSpoke(e.a, e.b, insetA, insetB);
        $edges.appendChild(
          mk("line", {
            x1: s.x1,
            y1: s.y1,
            x2: s.x2,
            y2: s.y2,
            class: cls,
            "marker-end": "url(#gr-arrow)",
          })
        );
      } else {
        const arc = ringArcSpec(e.a, e.b);
        $edges.appendChild(
          mk("path", {
            d: arc.path,
            class: cls + " ring",
            "marker-end": "url(#gr-arrow)",
          })
        );
      }
      drawEdgeLabel(e);
    }

    for (const nd of nodes) {
      drawNodeShape(nd);
      placeLabel(nd, 16);
    }
  }

  function drawArc(data) {
    clear($mesh);
    const pathD =
      "M " +
      ARC.x0 +
      " " +
      ARC.y0 +
      " Q " +
      ARC.x1 +
      " " +
      ARC.y1 +
      " " +
      ARC.x2 +
      " " +
      ARC.y2;

    $zones.appendChild(
      mk("path", {
        d:
          pathD +
          " L " +
          ARC.x2 +
          " " +
          ARC.splitY +
          " L " +
          ARC.x0 +
          " " +
          ARC.splitY +
          " Z",
        class: "gr-hatch",
        fill: "url(#gr-hatch)",
      })
    );
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
    const topZ = zonas.find((z) => z.id === "visivel") || { label: "visível" };
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

    for (const e of edges) drawEdgeLabel(e);
    for (const nd of nodes) {
      drawNodeShape(nd);
      placeLabel(nd, 16);
    }
  }

  function drawVenn() {
    clear($zones);
    clear($mesh);
    clear($edges);

    for (const u of universos) {
      $zones.appendChild(
        mk("circle", {
          cx: u.x,
          cy: u.y,
          r: u.r,
          class: "gr-venn-circle",
        })
      );
      // outer label: push away from canvas center
      const dx = u.x - cx;
      const dy = u.y - cy;
      const d = Math.hypot(dx, dy) || 1;
      const lx = u.x + (dx / d) * (u.r * 0.55);
      const ly = u.y + (dy / d) * (u.r * 0.55);
      const t = mk("text", {
        x: lx,
        y: ly,
        class: "gr-venn-universe",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      });
      t.textContent = u.label;
      $labels.appendChild(t);
    }

    let calloutIdx = 0;
    for (const it of intersecoes) {
      if (it.papel === "core") {
        $nodes.appendChild(
          mk("circle", {
            cx: it.x,
            cy: it.y,
            r: 22,
            class: "gr-node-ring outer pulse",
          })
        );
        $nodes.appendChild(
          mk("circle", {
            cx: it.x,
            cy: it.y,
            r: 14,
            class: "gr-venn-core",
          })
        );
        const t = mk("text", {
          x: it.x,
          y: it.y,
          class: "gr-node-label core",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
        });
        t.textContent = it.label;
        $labels.appendChild(t);
        continue;
      }

      if (it.callout) {
        const ang = (-Math.PI / 4) + calloutIdx * (Math.PI / 2.2);
        calloutIdx++;
        const ox = cx + 168 * Math.cos(ang);
        const oy = cy + 168 * Math.sin(ang);
        $edges.appendChild(
          mk("line", {
            x1: it.x,
            y1: it.y,
            x2: ox,
            y2: oy,
            class: "gr-venn-callout-line",
          })
        );
        $nodes.appendChild(
          mk("circle", {
            cx: it.x,
            cy: it.y,
            r: 2.2,
            class: "gr-node-dot",
          })
        );
        const t = mk("text", {
          x: ox,
          y: oy,
          class: "gr-venn-callout",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
        });
        t.textContent = it.label;
        $labels.appendChild(t);
        continue;
      }

      // 2-way lobe
      const t = mk("text", {
        x: it.x,
        y: it.y,
        class: "gr-venn-lobe",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      });
      t.textContent = it.label;
      $labels.appendChild(t);
    }
  }

  function radialFormaLegend() {
    const order = ["estado", "motor", "fluxo"];
    const sym = { estado: "○", motor: "□", fluxo: "△" };
    const found = new Set();
    for (const n of nodes) {
      if (n.papel === "core") continue;
      let ps = n.papel_semantico;
      if (!ps) {
        if (n.forma === "triangle") ps = "fluxo";
        else if (n.forma === "square") ps = "motor";
        else ps = "estado";
      }
      found.add(ps);
    }
    const parts = order.filter((k) => found.has(k)).map((k) => sym[k] + k);
    return parts.length ? " · " + parts.join(" ") : "";
  }

  function drawStatic(data) {
    clear($zones);
    clear($mesh);
    clear($edges);
    clear($edgeLabels);
    clear($nodes);
    clear($labels);
    clear($packets);
    if ($story) clear($story);
    packets = [];
    edgeLabelPts = [];

    const ref =
      "REF · " +
      mode +
      " · " +
      (mode === "venn"
        ? universos.length + " univ"
        : nodes.length + " nós") +
      (mode === "radial" ? radialFormaLegend() : "");
    drawBlueprintFrame(ref);

    if (mode === "arc") drawArc(data);
    else if (mode === "venn") drawVenn();
    else drawRadial();
  }

  function spawnPacket(now) {
    if (mode === "venn") return;
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
    const dot = mk("circle", {
      cx: e.a.x,
      cy: e.a.y,
      r: 2.2,
      class: cfg.packetClass,
    });
    $packets.appendChild(dot);
    packets.push({
      kind: "edge",
      a: e.a,
      b: e.b,
      dot,
      start: now,
      duration: durMin + Math.random() * (durMax - durMin) + 200,
    });
  }

  function meanSpawnRate() {
    if (mode === "venn") return 9999;
    if (mode === "arc") return 280;
    return edges.some((e) => e.kind === "spoke") ? 320 : 9999;
  }

  function tick(now) {
    if (!visible) {
      raf = null;
      return;
    }
    const rate = meanSpawnRate();
    const cap = mode === "arc" ? 6 : 4;
    if (mode !== "venn" && now - lastSpawn > rate && packets.length < cap) {
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
        const pt = pointAtArcLength(arcSamples, p.startDist + p.travel * t);
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
    const sintese = n.sintese || "";
    if (!diagnostico && !pratica && !sintese) {
      $narr.hidden = true;
      return;
    }
    $narr.hidden = false;
    $diagnostico.textContent = diagnostico;
    $pratica.textContent = pratica;
    if (sintese) {
      $sinteseCol.hidden = false;
      $sintese.textContent = sintese;
    } else {
      $sinteseCol.hidden = true;
      $sintese.textContent = "";
    }
  }

  function render(data) {
    glyphData = data;
    buildLayout(data);
    drawStatic(data);
    const meta = data.metadados || {};
    const title = meta.titulo || meta.tese_central || "glifo";
    $tese.textContent = title;
    $tese.title = meta.tese_central || title;
    $sub.textContent = meta.subtitulo || "";
    if (mode === "venn") {
      $meta.textContent =
        "venn · " +
        universos.length +
        " univ · " +
        intersecoes.length +
        " cruz";
    } else {
      $meta.textContent =
        meta.modo + " · " + nodes.length + " nós · " + edges.length + " fluxos";
    }
    setNarrative(meta);
    showError("");
    console.log("glyph-renderer render", { modo: mode });
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
  document
    .getElementById("btn-example-venn")
    .addEventListener("click", () => loadDemo(DEMO_VENN, "venn"));
  document
    .getElementById("btn-example-economia")
    .addEventListener("click", () => loadDemo(DEMO_ECONOMIA, "economia"));

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
