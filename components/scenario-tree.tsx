"use client";

import { useEffect, useRef, useState } from "react";
import type { Anim } from "./scenario-anim-data";

const T = {
  dark: { bg: "#0c0e12", fg: "#f2f0ee", dim: "rgba(255,255,255,0.55)", faint: "rgba(255,255,255,0.32)", line: "rgba(255,255,255,0.14)", accent: "#ff7a45", doc: "#9aa0a6", metric: "#8fa4ff", person: "#ffb26b" },
  light: { bg: "#f5f5f4", fg: "#0b0b0c", dim: "rgba(11,11,12,0.6)", faint: "rgba(11,11,12,0.4)", line: "rgba(11,11,12,0.16)", accent: "#e04e1f", doc: "#6f6c66", metric: "#2b4bff", person: "#b8410c" },
};

export default function ScenarioTree({ anim, theme, index }: { anim: Anim; theme: "dark" | "light"; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const c = T[theme];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setStep(5);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => setActive(es.some((e) => e.isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduced) return;
    let cancelled = false;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    setStep(0);
    const tick = () => {
      if (cancelled) return;
      i += 1;
      if (i > 5) {
        timer = setTimeout(() => {
          i = 0;
          setStep(0);
          timer = setTimeout(tick, 900);
        }, 3000);
        return;
      }
      setStep(i);
      timer = setTimeout(tick, 1900);
    };
    timer = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, reduced, index]);

  const on = (n: number) => step >= n;
  const docs = anim.docs.slice(0, 3);
  const nodes = [
    { id: "root", x: 64, y: 128, r: 6, color: c.fg, label: anim.merged, min: 0 },
    { id: "d0", x: 150, y: 44, r: 4, color: c.doc, label: docs[0], min: 0 },
    { id: "d1", x: 150, y: 128, r: 4, color: c.doc, label: docs[1], min: 0 },
    { id: "d2", x: 150, y: 212, r: 4, color: c.doc, label: docs[2], min: 0 },
    { id: "ev", x: 268, y: 128, r: 6, color: c.accent, label: anim.event, min: 2 },
    { id: "ca", x: 366, y: 128, r: 6, color: c.metric, label: anim.cause, min: 3 },
    { id: "de", x: 458, y: 66, r: 5, color: c.accent, label: anim.decision, min: 4 },
    { id: "pe", x: 458, y: 190, r: 5, color: c.person, label: anim.person, min: 5 },
  ];
  const edges: Array<[string, number]> = [["d0", 1], ["d1", 1], ["d2", 1], ["ev", 2], ["ca", 3], ["de", 4], ["pe", 5]];
  const pos = (id: string) => nodes.find((n) => n.id === id)!;
  const path = (a: string, b: string) => {
    const p1 = pos(a), p2 = pos(b);
    const mx = (p1.x + p2.x) / 2;
    return "M" + p1.x + " " + p1.y + " C" + mx + " " + p1.y + " " + mx + " " + p2.y + " " + p2.x + " " + p2.y;
  };

  return (
    <div ref={ref} style={{ marginTop: 18, borderRadius: 12, background: c.bg, border: "1px solid " + c.line, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px 0", fontFamily: "ui-monospace,Menlo,monospace", fontSize: 9.5, letterSpacing: ".14em", color: c.faint }}>
        {on(5) ? "С ЯДРОМ · " + anim.to + " ВМЕСТО " + anim.from : "БЕЗ ЯДРА · " + anim.from}
      </div>
      <svg viewBox="0 0 520 262" style={{ width: "100%", display: "block" }} role="img" aria-label={"Дерево онтологии: " + anim.merged}>
        <path d={path("root", "ev")} fill="none" stroke={on(2) ? c.accent : c.line} strokeOpacity={on(2) ? 0.9 : 0.5} strokeWidth={on(2) ? 2 : 1} />
        {edges.map(([id, min]) => {
          const p = pos(id);
          const e = id === "ev" ? null : id === "ca" ? path("ev", "ca") : id === "de" ? path("ca", "de") : id === "pe" ? path("ca", "pe") : path("root", id);
          if (!e) return null;
          return (
            <path key={id} d={e} fill="none" stroke={on(min) ? c.accent : c.line} strokeOpacity={on(min) ? 0.9 : 0.5} strokeWidth={on(min) ? 2 : 1} />
          );
        })}

        {nodes.map((n) => (
          <g key={n.id} opacity={n.id === "root" || n.id.startsWith("d") ? 1 : on(n.min) ? 1 : 0.28} style={{ transition: "opacity .5s ease" }}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
            <text x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10.5" fill={n.id === "root" || n.id.startsWith("d") || on(n.min) ? c.fg : c.dim}>
              {n.label}
            </text>
          </g>
        ))}

        <text x={pos("ca").x} y={pos("ca").y + 30} textAnchor="middle" fontFamily="ui-monospace,Menlo,monospace" fontSize="12" fill={c.accent} opacity={on(3) ? 1 : 0} style={{ transition: "opacity .5s ease" }}>
          {anim.numbers[1]}
        </text>
      </svg>
    </div>
  );
}
