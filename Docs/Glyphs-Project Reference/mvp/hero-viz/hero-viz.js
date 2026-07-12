/**
 * Hero viz MVP — vanilla SVG + requestAnimationFrame (inspired by iii.dev).
 */
(function heroViz() {
  const root = document.getElementById("hero-viz");
  if (!root) return;

  const N = 10;
  const VB = 400;
  const cx = VB / 2;
  const cy = VB / 2;
  const R = 144;
  const NODE_LABELS = [
    "orchestrator",
    "db",
    "cache",
    "queue",
    "stream",
    "agent",
    "http",
    "cron",
    "obs",
    "memory",
  ];

  const nodes = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + R * Math.cos(a),
      y: cy + R * Math.sin(a),
      angle: a,
      label: NODE_LABELS[i],
    };
  });

  const allEdges = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) allEdges.push([i, j]);
  }

  const actualEdges = [
    [0, 1],
    [0, 3],
    [0, 5],
    [0, 6],
    [0, 7],
    [3, 4],
    [1, 8],
    [5, 9],
    [2, 6],
    [7, 8],
    [1, 2],
    [2, 3],
    [4, 5],
    [4, 6],
    [6, 9],
    [3, 8],
    [0, 2],
    [0, 9],
    [5, 7],
    [1, 4],
  ];

  const SVG_NS = "http://www.w3.org/2000/svg";
  const mk = (tag, attrs) => {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      for (const k in attrs) el.setAttribute(k, attrs[k]);
    }
    return el;
  };

  const $mesh = document.getElementById("hv-edges-mesh");
  const $actual = document.getElementById("hv-edges-actual");
  const $eph = document.getElementById("hv-edges-ephemeral");
  const $packets = document.getElementById("hv-packets");
  const $nodes = document.getElementById("hv-nodes");
  const $labels = document.getElementById("hv-labels");

  for (const [i, j] of allEdges) {
    $mesh.appendChild(
      mk("line", {
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[j].x,
        y2: nodes[j].y,
        class: "hv-edge-mesh",
      })
    );
  }

  for (const [i, j] of actualEdges) {
    $actual.appendChild(
      mk("line", {
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[j].x,
        y2: nodes[j].y,
        class: "hv-edge-actual",
      })
    );
  }

  for (const n of nodes) {
    $nodes.appendChild(
      mk("circle", { cx: n.x, cy: n.y, r: 8, class: "hv-node-ring" })
    );
    $nodes.appendChild(
      mk("circle", { cx: n.x, cy: n.y, r: 2, class: "hv-node-dot" })
    );
  }

  for (const n of nodes) {
    const lr = R + 22;
    const lx = cx + lr * Math.cos(n.angle);
    const ly = cy + lr * Math.sin(n.angle);
    const t = mk("text", {
      x: lx,
      y: ly,
      class: "hv-node-label",
      "text-anchor":
        Math.abs(Math.cos(n.angle)) < 0.2
          ? "middle"
          : Math.cos(n.angle) > 0
            ? "start"
            : "end",
      "dominant-baseline": "middle",
    });
    t.textContent = n.label;
    $labels.appendChild(t);
  }

  const STAGES = {
    mesh: {
      name: "problem space",
      count: "45",
      accentCount: false,
      formula:
        "<math><mi>O</mi><mo>(</mo><mfrac><mrow><mi>n</mi><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><mn>2</mn></mfrac><mo>)</mo></math>",
    },
    actual: {
      name: "implementation",
      count: String(actualEdges.length),
      accentCount: false,
      formula:
        "<math><mi>O</mi><mo>(</mo><mfrac><mrow><mi>n</mi><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><mrow><mn>2</mn><mo>·</mo><mtext>tolerance</mtext></mrow></mfrac><mo>)</mo></math>",
    },
    iii: {
      name: "iii",
      count: "0",
      accentCount: true,
      formula: "<math><mi>O</mi><mo>(</mo><mn>0</mn><mo>)</mo></math>",
    },
  };

  const stageOrder = ["mesh", "actual", "iii"];
  const $stageName = document.getElementById("hv-stage-name");
  const $count = document.getElementById("hv-count");
  const $formula = document.getElementById("hv-formula");
  const $tabs = root.querySelectorAll(".hero-viz-tabs button");

  let currentStage = "mesh";
  let userPinned = false;
  let cycleTimer = null;

  function setStage(stage) {
    currentStage = stage;
    root.setAttribute("data-stage", stage);
    const s = STAGES[stage];
    $stageName.textContent = s.name;
    $count.textContent = s.count;
    $count.classList.toggle("accent", s.accentCount);
    if ($formula) $formula.innerHTML = s.formula;
    $tabs.forEach((b) => b.classList.toggle("on", b.dataset.stage === stage));
    console.log("hero-viz stage", stage);
  }

  $tabs.forEach((b) => {
    b.addEventListener("click", () => {
      console.log("hero-viz tab", b.dataset.stage);
      userPinned = true;
      stopCycle();
      setStage(b.dataset.stage);
    });
  });

  function startCycle() {
    stopCycle();
    if (userPinned) return;
    let idx = stageOrder.indexOf(currentStage);
    cycleTimer = setInterval(() => {
      idx = (idx + 1) % stageOrder.length;
      setStage(stageOrder[idx]);
    }, 4200);
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  const packets = [];
  let lastSpawn = 0;
  let raf = null;

  function spawnPacket(now) {
    let edge;
    if (currentStage === "actual") {
      edge = actualEdges[Math.floor(Math.random() * actualEdges.length)];
    } else {
      edge = allEdges[Math.floor(Math.random() * allEdges.length)];
    }

    const [i, j] = Math.random() < 0.5 ? edge : [edge[1], edge[0]];
    const a = nodes[i];
    const b = nodes[j];

    let lineEl = null;
    if (currentStage === "iii") {
      lineEl = mk("line", {
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        class: "hv-edge-ephemeral",
      });
      $eph.appendChild(lineEl);
    }

    const dot = mk("circle", {
      cx: a.x,
      cy: a.y,
      r: currentStage === "iii" ? 2.6 : 2.2,
      class: currentStage === "iii" ? "hv-packet" : "hv-packet dim",
    });
    $packets.appendChild(dot);

    packets.push({
      a,
      b,
      dot,
      line: lineEl,
      start: now,
      duration: 700 + Math.random() * 350,
    });
  }

  function tick(now) {
    const rate =
      currentStage === "mesh" ? 80 : currentStage === "actual" ? 220 : 320;
    const cap =
      currentStage === "mesh" ? 36 : currentStage === "actual" ? 14 : 8;

    if (now - lastSpawn > rate && packets.length < cap) {
      spawnPacket(now);
      lastSpawn = now;
    }

    for (let k = packets.length - 1; k >= 0; k--) {
      const p = packets[k];
      const t = (now - p.start) / p.duration;
      if (t >= 1) {
        p.dot.remove();
        if (p.line) {
          p.line.style.transition = "opacity .25s ease";
          p.line.style.opacity = "0";
          const ln = p.line;
          setTimeout(() => ln.remove(), 280);
        }
        packets.splice(k, 1);
        continue;
      }

      p.dot.setAttribute("cx", p.a.x + (p.b.x - p.a.x) * t);
      p.dot.setAttribute("cy", p.a.y + (p.b.y - p.a.y) * t);
      if (p.line) {
        p.line.style.opacity = String(0.85 * Math.min(1, t * 6));
      }
    }

    raf = requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(tick);
          startCycle();
        } else {
          if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
          stopCycle();
        }
      }
    },
    { threshold: 0.1 }
  );

  io.observe(root);
  setStage("mesh");
})();
