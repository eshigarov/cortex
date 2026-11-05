"use client";

import { useEffect, useRef, useState } from "react";
import type { Anim } from "./scenario-anim-data";

const T = {
  dark: {
    bg: "#0c0e12",
    fg: "#f2f0ee",
    dim: "rgba(255,255,255,0.55)",
    faint: "rgba(255,255,255,0.35)",
    line: "rgba(255,255,255,0.14)",
    chip: "rgba(255,255,255,0.04)",
    accent: "#ff7a45",
    accentSoft: "rgba(255,122,69,0.10)",
    accentLine: "rgba(255,122,69,0.55)",
  },
  light: {
    bg: "#f5f5f4",
    fg: "#0b0b0c",
    dim: "rgba(11,11,12,0.62)",
    faint: "rgba(11,11,12,0.4)",
    line: "rgba(11,11,12,0.16)",
    chip: "rgba(11,11,12,0.02)",
    accent: "#e04e1f",
    accentSoft: "rgba(255,90,31,0.09)",
    accentLine: "rgba(224,78,31,0.55)",
  },
};

export default function ScenarioAnimation({ anim, theme, index }: { anim: Anim; theme: "dark" | "light"; index: number }) {
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
    const io = new IntersectionObserver(
      (entries) => setActive(entries.some((e) => e.isIntersecting)),
      { threshold: 0.25 },
    );
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
        }, 3200);
        return;
      }
      setStep(i);
      timer = setTimeout(tick, 1650);
    };
    timer = setTimeout(tick, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, reduced, index]);

  const merged = step >= 2;
  const numbers = step >= 3;
  const response = step >= 4;
  const human = step >= 5;

  const chip = (text: string, i: number) => {
    const pos = [
      { left: "4%", top: "6%" },
      { left: "54%", top: "4%" },
      { left: "8%", top: "44%" },
      { left: "56%", top: "42%" },
    ][i];
    const out = merged;
    return (
      <div
        key={text}
        style={{
          position: "absolute",
          ...pos,
          width: "41%",
          padding: "8px 10px",
          border: "1px dashed " + c.line,
          borderRadius: 8,
          background: c.chip,
          color: c.dim,
          fontSize: 11.5,
          opacity: out ? 0 : 1,
          transform: out ? "translate(9%, 14%) scale(.6)" : "none",
          transition: "opacity .55s ease, transform .55s ease",
          transitionDelay: out ? i * 0.05 + "s" : "0s",
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: 236,
        marginTop: 18,
        borderRadius: 12,
        background: c.bg,
        border: "1px solid " + c.line,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(" + c.faint + " 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.18,
        }}
      />

      <div style={{ position: "absolute", left: 12, top: 10, fontFamily: "ui-monospace,Menlo,monospace", fontSize: 9, letterSpacing: ".14em", color: c.faint }}>
        {human ? "С ЯДРОМ · " + anim.to : "БЕЗ ЯДРА · " + anim.from}
      </div>

      {anim.docs.map((d, i) => chip(d, i))}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 58,
          transform: "translateX(-50%) " + (merged ? "scale(1)" : "scale(.92)"),
          opacity: merged ? 1 : 0,
          transition: "opacity .5s ease, transform .5s ease",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 10,
          border: "1px solid " + c.accentLine,
          background: c.accentSoft,
          color: c.fg,
          fontSize: 13,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: 99, background: c.accent }} />
        {anim.merged}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 104,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 14,
          opacity: numbers ? 1 : 0,
          transform: numbers ? "none" : "translateY(6px)",
          transition: "opacity .5s ease, transform .5s ease",
        }}
      >
        <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 14, color: c.dim }}>{anim.numbers[0]}</span>
        <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontWeight: 700, fontSize: 24, color: c.accent }}>{anim.numbers[1]}</span>
        <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 14, color: c.dim }}>{anim.numbers[2]}</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 44,
          padding: "10px 12px",
          borderRadius: 9,
          border: "1px solid " + c.line,
          background: c.chip,
          opacity: response ? 1 : 0,
          transform: response ? "none" : "translateY(8px)",
          transition: "opacity .5s ease, transform .5s ease",
        }}
      >
        {anim.lines.map((l, i) => (
          <div key={l} style={{ fontSize: 11, lineHeight: 1.7, color: c.dim, display: "flex", gap: 6 }}>
            <span style={{ color: c.accent, fontFamily: "ui-monospace,Menlo,monospace" }}>0{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 14,
          bottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: 11.5,
          color: c.fg,
          opacity: human ? 1 : 0,
          transition: "opacity .5s ease",
        }}
      >
        <span
          style={{
            width: 15,
            height: 15,
            borderRadius: 4,
            border: "1px solid " + c.accentLine,
            background: c.accentSoft,
            color: c.accent,
            fontSize: 10,
            lineHeight: "15px",
            textAlign: "center",
          }}
        >
          ✓
        </span>
        {anim.human}
      </div>

      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 12,
          fontFamily: "ui-monospace,Menlo,monospace",
          fontSize: 11,
          color: c.faint,
          opacity: human ? 1 : 0,
          transition: "opacity .5s ease",
        }}
      >
        <b style={{ color: c.accent, fontSize: 13 }}>{anim.to}</b> вместо {anim.from}
      </div>
    </div>
  );
}
