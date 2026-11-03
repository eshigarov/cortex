"use client";

import { useEffect, useRef, useState } from "react";
import demo from "./ontology-demo.json";

type Node = { id: string; label: string; type: string };

const LAYOUT: Record<string, { x: number; y: number }> = {
  "asset-crusher": { x: 20, y: 24 },
  "event-stop": { x: 295, y: 24 },
  "metric-downtime": { x: 570, y: 24 },
  "decision-repair": { x: 570, y: 196 },
  "person-ivanov": { x: 295, y: 196 },
  "doc-reg": { x: 20, y: 196 },
};

const BOX = { w: 205, h: 84 };

const EDGES: Array<{ from: string; to: string; label: string; path: string; lx: number; ly: number }> = [
  { from: "asset-crusher", to: "event-stop", label: "простой", path: "M225 66 H295", lx: 260, ly: 56 },
  { from: "event-stop", to: "metric-downtime", label: "влияет на", path: "M500 66 H570", lx: 535, ly: 56 },
  { from: "metric-downtime", to: "decision-repair", label: "основание", path: "M672 108 V196", lx: 682, ly: 156 },
  { from: "decision-repair", to: "person-ivanov", label: "принято", path: "M570 238 H500", lx: 535, ly: 228 },
  { from: "person-ivanov", to: "doc-reg", label: "регламент", path: "M295 238 H225", lx: 260, ly: 228 },
];

function wrap(text: string, max = 20): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

export default function AnswerPath() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(demo.story.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let i = 0;
        const t = setInterval(() => {
          i += 1;
          setStep(i);
          if (i >= demo.story.length) clearInterval(t);
        }, 620);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const nodes: Node[] = demo.nodes;
  const order = demo.story.map((s) => s.node);
  const visible = new Set(order.slice(0, step + 1));

  return (
    <div ref={ref} className="mt-12">
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-mute)]">
        вопрос
      </p>
      <p className="mt-2 max-w-[46ch] text-[17px] font-medium">{demo.question}</p>

      <svg
        viewBox="0 0 800 320"
        className="mt-8 w-full"
        role="img"
        aria-label="Путь ответа по графу онтологии: дробилка, простой, показатель, решение, автор, регламент"
      >
        {EDGES.map((e, i) => {
          const on = step > i;
          return (
            <g key={e.from + e.to} style={{ opacity: on ? 1 : 0, transition: "opacity .5s ease" }}>
              <path d={e.path} stroke="var(--color-ink)" strokeWidth="1" fill="none" opacity="0.35" />
              <text
                x={e.lx}
                y={e.ly}
                textAnchor="middle"
                className="font-mono"
                fontSize="10"
                fill="var(--color-mute)"
              >
                {e.label}
              </text>
            </g>
          );
        })}

        {nodes.map((n) => {
          const pos = LAYOUT[n.id];
          if (!pos) return null;
          const active = visible.has(n.id);
          const isLast = demo.story[step - 1]?.node === n.id;
          return (
            <g
              key={n.id}
              style={{
                opacity: active ? 1 : 0.18,
                transition: "opacity .5s ease, transform .5s ease",
                transformOrigin: `${pos.x + BOX.w / 2}px ${pos.y + BOX.h / 2}px`,
                transform: isLast ? "scale(1.02)" : "scale(1)",
              }}
            >
              <rect
                x={pos.x}
                y={pos.y}
                width={BOX.w}
                height={BOX.h}
                rx="3"
                fill="var(--color-ink)"
                opacity={active ? 0.03 : 0}
              />
              <rect
                x={pos.x}
                y={pos.y}
                width={BOX.w}
                height={BOX.h}
                rx="3"
                fill="none"
                stroke={isLast ? "var(--color-acid-ink)" : "var(--color-line)"}
                strokeWidth={isLast ? 1.5 : 1}
              />
              <text x={pos.x + 14} y={pos.y + 20} className="font-mono" fontSize="9" fill="var(--color-mute)">
                {n.type.toUpperCase()}
              </text>
              {wrap(n.label).map((line, i) => (
                <text key={i} x={pos.x + 14} y={pos.y + 44 + i * 18} fontSize="14" fill="var(--color-ink)">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      <p className="mt-4 text-[12.5px] text-[var(--color-mute)]">
        Узлы и связи взяты из онтологии: <span className="font-mono">ontology/demo.ttl</span>. Подписи связей —
        из <span className="font-mono">core.ttl</span>.
      </p>
    </div>
  );
}
