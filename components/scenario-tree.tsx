"use client";

import { useEffect, useRef, useState } from "react";
import type { Anim } from "./scenario-anim-data";

const T = {
  dark: { bg: "#0c0e12", fg: "#f2f0ee", dim: "rgba(255,255,255,0.55)", faint: "rgba(255,255,255,0.32)", line: "rgba(255,255,255,0.14)", accent: "#ff7a45", metric: "#8fa4ff", person: "#ffb26b" },
  light: { bg: "#f5f5f4", fg: "#0b0b0c", dim: "rgba(11,11,12,0.6)", faint: "rgba(11,11,12,0.4)", line: "rgba(11,11,12,0.16)", accent: "#e04e1f", metric: "#2b4bff", person: "#b8410c" },
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

  const nodes = [
    { id: "root", x: 76, y: 132, r: 7, color: c.fg, label: anim.merged },
    { id: "ev", x: 218, y: 132, r: 6, color: c.accent, label: anim.event },
    { id: "ca", x: 352, y: 132, r: 6, color: c.metric, label: anim.cause },
    { id: "de", x: 462, y: 64, r: 5, color: c.accent, label: anim.decision },
    { id: "pe", x: 462, y: 200, r: 5, color: c.person, label: anim.person },
  ];

  const link = (a: string, b: string) => {
    const p1 = nodes.find((n) => n.id === a)!;
    const p2 = nodes.find((n) => n.id === b)!;
    const mx = (p1.x + p2.x) / 2;
    return "M" + p1.x + " " + p1.y + " C" + mx + " " + p1.y + " " + mx + " " + p2.y + " " + p2.x + " " + p2.y;
  };

  const edges: Array<{ d: string; min: number }> = [
    { d: link("root", "ev"), min: 1 },
    { d: link("ev", "ca"), min: 3 },
    { d: link("ca", "de"), min: 4 },
    { d: link("ca", "pe"), min: 5 },
  ];

  return (
    <div ref={ref} style={{ marginTop: 18, borderRadius: 12, background: c.bg, border: "1px solid " + c.line, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px 0", fontFamily: "ui-monospace,Menlo,monospace", fontSize: 9.5, letterSpacing: ".14em", color: c.faint }}>
        {on(5) ? "С ЯДРОМ · " + anim.to + " ВМЕСТО " + anim.from : "БЕЗ ЯДРА · " + anim.from}
      </div>

      <svg viewBox="0 0 560 250" style={{ width: "100%", display: "block" }} role="img" aria-label={"Дерево онтологии: " + anim.merged}>
        <text x="14" y="26" fontSize="9.5" fill={c.faint} fontFamily="ui-monospace,Menlo,monospace" letterSpacing="0.1em">
          {anim.docs.length} ДОКУМЕНТА, ОДИН ОБЪЕКТ
        </text>

        {edges.map((e, k) => (
          <path key={k} d={e.d} fill="none" stroke={on(e.min) ? c.accent : c.line} strokeOpacity={on(e.min) ? 0.9 : 0.55} strokeWidth={on(e.min) ? 2 : 1} />
        ))}

        {nodes.map((n, k) => {
          const lit = k === 0 || on([1, 2, 3, 4, 5][k - 1] ?? 0);
          return (
            <g key={n.id} opacity={lit ? 1 : 0.28} style={{ transition: "opacity .5s ease" }}>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
              <text x={n.x} y={n.y - 14} textAnchor="middle" fontSize="11.5" fill={lit ? c.fg : c.dim}>
                {n.label}
              </text>
            </g>
          );
        })}

        <text x={352} y={172} textAnchor="middle" fontFamily="ui-monospace,Menlo,monospace" fontSize="12" fill={c.accent} opacity={on(3) ? 1 : 0} style={{ transition: "opacity .5s ease" }}>
          {anim.numbers[1]}
        </text>
      </svg>
    </div>
  );
}
