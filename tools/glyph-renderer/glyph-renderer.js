/**
 * Glyph renderer — JSON → radial SVG + RAF packets (iii-style).
 * ponytail: no framework; mesh is O(n²) faint backdrop — fine for n≤8.
 */
(function glyphRenderer() {
  const DEMO = {
    metadados: {
      tese_central:
        "Toda ideia complexa pode ser mapeada como sistema fechado radial.",
      estilo_visual: "dark_minimalist_cyberpunk",
    },
    nos: [
      { id: "tese", label: "tese", categoria: "nucleo" },
      { id: "nos", label: "nós", categoria: "estrutura" },
      { id: "fluxos", label: "fluxos", categoria: "relacao" },
      { id: "ritmo", label: "ritmo", categoria: "dinamica" },
      { id: "canvas", label: "canvas", categoria: "geometria" },
      { id: "ink", label: "data-ink", categoria: "principio" },
    ],
    conexoes: [
      {
        de: "tese",
        para: "nos",
        relacionamento: "decompõe",
        animacao: "pulso_rapido",
      },
      {
        de: "nos",
        para: "fluxos",
        relacionamento: "alimenta",
        animacao: "pulso_rapido",
      },
      {
        de: "fluxos",
        para: "ritmo",
        relacionamento: "define",
        animacao: "fluxo_lento",
      },
      {
        de: "canvas",
        para: "nos",
        relacionamento: "contém",
        animacao: "fluxo_lento",
      },
      {
        de: "ink",
        para: "fluxos",
        relacionamento: "restringe",
        animacao: "fluxo_lento",
      },
      {
        de: "ritmo",
        para: "tese",
        relacionamento: "vivifica",
        animacao: "pulso_rapido",
      },
      { de: "canvas", para: "ink", relacionamento: "equilibra" },
    ],
  };

  const ANIM = {
    pulso_rapido: { rate: 90, duration: [450, 700], packetClass: "gr-packet" },
    fluxo_lento: {
      rate: 420,
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
  const SVG_NS = "http://www.w3.org/2000/svg";

  const $json = document.getElementById("glyph-json");
  const $err = document.getElementById("glyph-error");
  const $tese = document.getElementById("glyph-tese");
  const $meta = document.getElementById("glyph-meta");
  const $mesh = document.getElementById("gr-edges-mesh");
  const $edges = document.getElementById("gr-edges");
  const $packets = document.getElementById("gr-packets");
  const $nodes = document.getElementById("gr-nodes");
  const $labels = document.getElementById("gr-labels");
  const root = document.getElementById("glyph-viz");

  const mk = (tag, attrs) => {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      for (const k in attrs) el.setAttribute(k, attrs[k]);
    }
    return el;
  };

  const clear = (el) => {
    while (el.firstChild) el.removeChild(el.firstChild);
  };

  let nodes = [];
  let edges = []; // { a, b, animKey, fromIdx, toIdx }
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

  function truncateLabel(s) {
    const full = String(s).toLowerCase();
    if (full.length <= LABEL_MAX) return { display: full, full };
    return { display: full.slice(0, LABEL_MAX - 1) + "…", full };
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
    const ids = new Set();
    for (const n of data.nos) {
      if (!n || !n.id || !n.label) throw new Error("cada nó precisa id + label");
      if (ids.has(n.id)) throw new Error("id duplicado: " + n.id);
      ids.add(n.id);
    }
    return data;
  }

  function buildLayout(data) {
    const n = data.nos.length;
    const idToIdx = new Map();
    nodes = data.nos.map((spec, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      idToIdx.set(spec.id, i);
      const lab = truncateLabel(spec.label);
      return {
        x: cx + R * Math.cos(a),
        y: cy + R * Math.sin(a),
        angle: a,
        label: lab.display,
        labelFull: lab.full,
        id: spec.id,
      };
    });

    edges = [];
    for (const c of data.conexoes) {
      const fi = idToIdx.get(c.de);
      const ti = idToIdx.get(c.para);
      if (fi === undefined || ti === undefined) {
        console.warn("glyph-renderer skip edge", c.de, "→", c.para);
        continue;
      }
      edges.push({
        fromIdx: fi,
        toIdx: ti,
        a: nodes[fi],
        b: nodes[ti],
        animKey: animKey(c.animacao),
      });
    }
  }

  function drawStatic() {
    clear($mesh);
    clear($edges);
    clear($nodes);
    clear($labels);
    clear($packets);
    packets = [];

    const n = nodes.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        $mesh.appendChild(
          mk("line", {
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            class: "gr-edge-mesh",
          })
        );
      }
    }

    for (const e of edges) {
      $edges.appendChild(
        mk("line", {
          x1: e.a.x,
          y1: e.a.y,
          x2: e.b.x,
          y2: e.b.y,
          class: "gr-edge",
        })
      );
    }

    for (const nd of nodes) {
      $nodes.appendChild(
        mk("circle", { cx: nd.x, cy: nd.y, r: 8, class: "gr-node-ring" })
      );
      $nodes.appendChild(
        mk("circle", { cx: nd.x, cy: nd.y, r: 2, class: "gr-node-dot" })
      );
    }

    for (const nd of nodes) {
      const lr = R + 16;
      const lx = cx + lr * Math.cos(nd.angle);
      const ly = cy + lr * Math.sin(nd.angle);
      const t = mk("text", {
        x: lx,
        y: ly,
        class: "gr-node-label",
        "text-anchor":
          Math.abs(Math.cos(nd.angle)) < 0.2
            ? "middle"
            : Math.cos(nd.angle) > 0
              ? "start"
              : "end",
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
  }

  function spawnPacket(now) {
    if (!edges.length) return;
    const e = edges[Math.floor(Math.random() * edges.length)];
    const cfg = ANIM[e.animKey] || ANIM.default;
    const [durMin, durMax] = cfg.duration;
    const forward = Math.random() < 0.85;
    const a = forward ? e.a : e.b;
    const b = forward ? e.b : e.a;

    const dot = mk("circle", {
      cx: a.x,
      cy: a.y,
      r: 2.2,
      class: cfg.packetClass,
    });
    $packets.appendChild(dot);

    packets.push({
      a,
      b,
      dot,
      start: now,
      duration: durMin + Math.random() * (durMax - durMin),
      animKey: e.animKey,
    });
  }

  function meanSpawnRate() {
    if (!edges.length) return 9999;
    let sum = 0;
    for (const e of edges) sum += (ANIM[e.animKey] || ANIM.default).rate;
    return sum / edges.length;
  }

  function tick(now) {
    if (!visible) {
      raf = null;
      return;
    }

    const rate = meanSpawnRate();
    const cap = Math.min(24, Math.max(6, edges.length * 3));

    if (edges.length && now - lastSpawn > rate && packets.length < cap) {
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
      p.dot.setAttribute("cx", p.a.x + (p.b.x - p.a.x) * t);
      p.dot.setAttribute("cy", p.a.y + (p.b.y - p.a.y) * t);
    }

    raf = requestAnimationFrame(tick);
  }

  function ensureLoop() {
    if (!raf && visible) raf = requestAnimationFrame(tick);
  }

  function render(data) {
    buildLayout(data);
    drawStatic();
    const tese =
      (data.metadados && data.metadados.tese_central) || "glifo sem tese";
    $tese.textContent = tese;
    $tese.title = tese;
    $meta.textContent =
      nodes.length + " nós · " + edges.length + " fluxos";
    showError("");
    console.log("glyph-renderer render", {
      nos: nodes.length,
      conexoes: edges.length,
    });
    ensureLoop();
  }

  function onRenderClick() {
    console.log("glyph-renderer click render");
    try {
      const data = parseGlyph($json.value.trim());
      render(data);
    } catch (e) {
      showError(e.message);
      console.warn("glyph-renderer", e);
    }
  }

  function loadExample() {
    console.log("glyph-renderer click exemplo");
    $json.value = JSON.stringify(DEMO, null, 2);
    render(DEMO);
  }

  document.getElementById("btn-render").addEventListener("click", onRenderClick);
  document.getElementById("btn-example").addEventListener("click", loadExample);

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

  // Boot with demo so file:// works without fetch
  loadExample();
})();
