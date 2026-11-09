"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SCENARIOS } from "./scenarios-data";
import { ANIM } from "./scenario-anim-data";
import ScenarioTree from "./scenario-tree";

const DIRECTIONS = ["Производство", "Документы", "Финансы", "Инженерия", "Продажи"];
const SECTORS = Array.from(new Set(SCENARIOS.map((s) => s.sector)));

export default function ScenariosExplorer() {
  const [sectors, setSectors] = useState<string[]>([]);
  const [dirs, setDirs] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const list = useMemo(
    () =>
      SCENARIOS.map((s, i) => ({ s, i })).filter(
        ({ s }) => (sectors.length === 0 || sectors.includes(s.sector)) && (dirs.length === 0 || dirs.includes(s.direction)),
      ),
    [sectors, dirs],
  );

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const active = open !== null ? SCENARIOS[open] : null;

  return (
    <div>
      <div className="mt-12 space-y-5 border-y border-[var(--color-line)] py-6">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">отрасль</span>
          {SECTORS.map((s) => {
            const on = sectors.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(sectors, setSectors, s)}
                aria-pressed={on}
                className={
                  "rounded-full border px-3 py-1.5 text-[12.5px] transition-colors " +
                  (on
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                    : "border-[var(--color-line)] text-[var(--color-ink)]/70 hover:border-[var(--color-ink)]/40")
                }
              >
                {s}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">направление</span>
          {DIRECTIONS.map((d) => {
            const on = dirs.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggle(dirs, setDirs, d)}
                aria-pressed={on}
                className={
                  "rounded-full border px-3 py-1.5 text-[12.5px] transition-colors " +
                  (on
                    ? "border-[var(--color-acid-ink)] bg-[var(--color-acid-ink)] text-white"
                    : "border-[var(--color-line)] text-[var(--color-ink)]/70 hover:border-[var(--color-ink)]/40")
                }
              >
                {d}
              </button>
            );
          })}
          {(sectors.length > 0 || dirs.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setSectors([]);
                setDirs([]);
              }}
              className="ml-1 text-[12px] underline decoration-[var(--color-line)] underline-offset-4 hover:decoration-[var(--color-ink)]"
            >
              сбросить
            </button>
          )}
          <span className="ml-auto font-mono text-[11px] text-[var(--color-mute)]">
            {list.length} из {SCENARIOS.length}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map(({ s, i }) => (
          <button
            key={s.process}
            type="button"
            onClick={() => setOpen(i)}
            className="card flex flex-col p-6 text-left transition-colors hover:border-[var(--color-ink)]/35"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-mute)]">
                {s.sector} · {s.direction}
              </span>
              <span className="text-[12px] font-medium text-[var(--color-acid-ink)]">{s.pct}</span>
            </div>
            <h3 className="mt-2 text-[18px] font-semibold">{s.process}</h3>
            <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{s.pain}</p>
            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-[13.5px] text-[var(--color-mute)]">{s.from}</span>
              <span className="text-[12px] text-[var(--color-mute)]">→</span>
              <span className="text-[26px] font-semibold leading-none text-[var(--color-acid-ink)]">{s.to}</span>
            </div>
            <div className="mt-2 text-[13px] font-medium">{s.gain}</div>
            <span className="mt-4 text-[12px] text-[var(--color-mute)] underline decoration-[var(--color-line)] underline-offset-4">
              подробно →
            </span>
          </button>
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-10 text-[13.5px] text-[var(--color-mute)]">Под такие фильтры сценариев нет, снимите один из них.</p>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/55 p-4 sm:p-8"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.process}
        >
          <div className="w-full max-w-[900px] rounded-2xl bg-[var(--color-paper)] p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">
                  {active.sector} · {active.direction}
                </span>
                <h2 className="mt-2 text-[26px] font-semibold leading-tight">{active.process}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Закрыть"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[18px] leading-none text-[var(--color-mute)] hover:border-[var(--color-ink)]/40"
              >
                ×
              </button>
            </div>

            <p className="mt-4 max-w-[70ch] text-[14px] leading-relaxed text-[var(--color-mute)]">{active.pain}</p>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-[14px] text-[var(--color-mute)]">{active.from}</span>
              <span className="text-[13px] text-[var(--color-mute)]">→</span>
              <span className="text-[32px] font-semibold leading-none text-[var(--color-acid-ink)]">{active.to}</span>
              <span className="text-[13px] font-medium text-[var(--color-mute)]">{active.pct} · {active.gain}</span>
            </div>

            <ScenarioTree anim={ANIM[open!]} theme={open! % 2 === 0 ? "dark" : "light"} index={open!} />

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">что делает агент</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed">{active.mech}</p>
                <ol className="mt-3 space-y-1.5">
                  {active.steps.map((st, k) => (
                    <li key={st} className="flex gap-3 text-[13px] leading-relaxed text-[var(--color-mute)]">
                      <span className="font-mono text-[10.5px] text-[var(--color-acid-ink)]">0{k + 1}</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">человек</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed">{active.human}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">связи</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{active.entities}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">мерим в пилоте</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{active.measure}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/pilot" className="btn btn-primary">Обсудить пилот</Link>
              <button type="button" onClick={() => setOpen(null)} className="text-[13px] underline decoration-[var(--color-line)] underline-offset-4">
                вернуться к списку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
