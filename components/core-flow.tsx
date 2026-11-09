"use client";

import { useEffect, useRef, useState } from "react";

const GATES = ["онтология", "память", "граф", "контур", "журнал"];
const GATE_HINT = ["тип · ключ", "эпизод", "связи", "права", "версия"];

const DOCS = ["накладная", "акт", "фото", "письмо", "копия", "паспорт"];

const CHAIN = ["рейс, претензия", "расхождение 6%", "проект ответа", "человек подтверждает"];

const STEPS = [
  { t: 0, caption: "Шесть источников: накладная, акт, фото, переписка, копия, паспорт. Связей между ними нет.", timer: "4 ч 00 мин" },
  { t: 1, caption: "Документы проходят онтологию: файлы становятся сущностями с типом и ключом.", timer: "3 ч 20 мин" },
  { t: 2, caption: "Граф связывает объекты: накладная, акт и фото сходятся в один рейс, копия склеивается с оригиналом.", timer: "2 ч 10 мин" },
  { t: 3, caption: "Контур исполнения: агент проверяет по правилам и в пределах выданных прав.", timer: "1 ч 05 мин" },
  { t: 4, caption: "Журнал фиксирует источники, цепочку вывода и версию модели и данных.", timer: "40 мин" },
  { t: 5, caption: "На выходе, один проект решения; сложное подтверждает человек.", timer: "25 мин" },
];

export default function CoreFlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setStep(STEPS.length - 1);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let i = 0;
        const tick = () => {
          if (cancelled) return;
          i += 1;
          if (i >= STEPS.length) {
            timer = setTimeout(() => {
              i = 0;
              setStep(0);
              timer = setTimeout(tick, 400);
            }, 3000);
            return;
          }
          setStep(i);
          timer = setTimeout(tick, 2000);
        };
        timer = setTimeout(tick, 400);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const cur = STEPS[step];
  const gatesDone = step >= 2;
  const chainCount = step >= 5 ? 4 : step === 4 ? 3 : step === 3 ? 2 : step === 2 ? 1 : 0;
  const journalOn = step >= 4;

  return (
    <div ref={ref} className={"w-full bg-[#0c0e12] py-6 " + className}>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[11px] text-white/40">как это работает</p>
          <p className="font-mono text-[11px] tracking-[0.12em] text-white/40">
            <span className="text-white/70">{cur.timer}</span>
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <svg viewBox="0 0 1160 360" className="min-w-[860px] w-full" role="img" aria-label="Поток документов слева направо через слои ядра к решению">
            <defs>
              <pattern id="cf-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#ffffff" opacity="0.05" />
              </pattern>
            </defs>
            <rect width="1160" height="360" fill="url(#cf-dots)" />

            <text x="20" y="26" fontSize="10" fill="#5f646c" letterSpacing="0.14em">ИСТОЧНИКИ</text>
            {DOCS.map((d, i) => {
              const x = 20 + (i % 2) * 118;
              const y = 52 + Math.floor(i / 2) * 84;
              const on = step >= 1;
              return (
                <g key={d} opacity={on ? 1 : 0.25} style={{ transition: "opacity .6s ease" }}>
                  <rect x={x} y={y} width="108" height="46" rx="7" fill="none" stroke="#ffffff" strokeOpacity={0.18} strokeDasharray="4 4" />
                  <text x={x + 12} y={y + 28} fontSize="11" fill="#b6b9bf">{d}</text>
                </g>
              );
            })}

            {GATES.map((g, i) => {
              const x = 276 + i * 96;
              const active = step >= 1 && (step === 1 || gatesDone);
              const lit = step > 1 + i || gatesDone;
              return (
                <g key={g} opacity={lit || active ? 1 : 0.35} style={{ transition: "opacity .5s ease" }}>
                  <rect x={x} y="46" width="72" height="252" rx="9" fill={lit ? "rgba(255,122,69,0.06)" : "rgba(255,255,255,0.02)"}
                    stroke={lit ? "rgba(255,122,69,0.45)" : "rgba(255,255,255,0.12)"} />
                  <text x={x + 36} y="38" textAnchor="middle" fontSize="10" fill={lit ? "#ffb08a" : "#8d9298"}>{g}</text>
                  <text
                    transform={"rotate(-90 " + (x + 36) + " 180)"}
                    x={x + 36}
                    y={184}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill={lit ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.28)"}
                    style={{ transition: "fill .4s ease" }}
                  >
                    {GATE_HINT[i]}
                  </text>
                </g>
              );
            })}


            {CHAIN.map((c, i) => {
              const y = 62 + i * 62;
              const on = i < chainCount;
              return (
                <g key={c} opacity={on ? 1 : 0.15} style={{ transition: "opacity .5s ease" }}>
                  <rect x="800" y={y} width="300" height="44" rx="8" fill="rgba(255,122,69,0.08)" stroke="rgba(255,122,69,0.5)" />
                  <circle cx="816" cy={y + 22} r="3.4" fill="#ff7a45" />
                  <text x="830" y={y + 27} fontSize="12.5" fill="#f4f2ef">{c}</text>
                </g>
              );
            })}

            <g opacity={journalOn ? 1 : 0.2} style={{ transition: "opacity .5s ease" }}>
              <rect x="800" y="316" width="300" height="34" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
              <text x="814" y="338" fontSize="10" fill="#9aa0a6" fontFamily="ui-monospace,Menlo,monospace">
                журнал: источники, цепочка, версия
              </text>
            </g>

            <text x="20" y="340" fontSize="10" fill="#5f646c">без ядра, ручной сбор</text>
            <text x="800" y="352" fontSize="10" fill="#5f646c" opacity={step >= 5 ? 1 : 0.35}>с ядром, один ответ</text>
          </svg>
        </div>

        <div className="mt-4 flex min-h-[60px] items-baseline gap-3">
          <span className="font-mono text-[10.5px] text-[#ff9a6d]">шаг {step + 1} / {STEPS.length}</span>
          <span className="max-w-[92ch] text-[17px] leading-relaxed text-white/75">{cur.caption}</span>
        </div>

        <div className="mt-2 flex gap-1.5">
          {STEPS.map((s, i) => (
            <span key={s.caption} className="h-[3px] flex-1 rounded-full" style={{ background: i <= step ? "#ff7a45" : "rgba(255,255,255,0.12)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
