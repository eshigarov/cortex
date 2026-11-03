"use client";

import { useEffect, useState } from "react";

const profiles = [
  { name: "Средний бизнес", scale: "300 сотрудников · 20 тыс. документов", entities: "11 500", links: "37 000" },
  { name: "Логистика", scale: "800 сотрудников · 60 тыс. документов", entities: "34 000", links: "112 000" },
  { name: "Финансы", scale: "1 500 сотрудников · 90 тыс. документов", entities: "65 000", links: "210 000" },
  { name: "Энергетика", scale: "2 000 сотрудников · 120 тыс. документов", entities: "86 000", links: "280 000" },
  { name: "ГМК", scale: "5 000 сотрудников · 300 тыс. документов", entities: "216 000", links: "700 000" },
  { name: "Холдинг", scale: "10 000 сотрудников · 500 тыс. документов", entities: "360 000", links: "1,17 млн" },
];

export function MetricsCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profiles.length), 4200);
    return () => clearInterval(t);
  }, []);

  const p = profiles[i];

  return (
    <div className="border border-white/15">
      <div className="flex items-center justify-between border-b border-white/15 px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-paper)]/65">
          оценка масштаба
        </span>
        <div className="flex gap-1.5">
          {profiles.map((_, n) => (
            <button
              key={n}
              aria-label={`Профиль ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                n === i ? "bg-[var(--color-acid)]" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-3">
        <div className="bg-[var(--color-ink)] p-5">
          <div className="text-[13px] text-[var(--color-paper)]/70">{p.name}</div>
          <div className="mt-1 text-[12.5px] leading-relaxed text-[var(--color-paper)]/60">{p.scale}</div>
        </div>
        <div className="bg-[var(--color-ink)] p-5">
          <div className="font-mono text-[26px] tracking-[-0.03em]">{p.entities}</div>
          <div className="mt-1 text-[11px] text-[var(--color-paper)]/70">сущностей</div>
        </div>
        <div className="col-span-2 bg-[var(--color-ink)] p-5 md:col-span-1">
          <div className="font-mono text-[26px] tracking-[-0.03em]">{p.links}</div>
          <div className="mt-1 text-[11px] text-[var(--color-paper)]/70">связей</div>
        </div>
      </div>

      <div className="border-t border-white/15 px-5 py-3 text-[11px] leading-relaxed text-[var(--color-paper)]/60">
        модельная оценка по нашим коэффициентам (1 сущность на ~3 500 символов, 3,25 связи на сущность).
        На пилоте считаем по вашему корпусу.
      </div>
    </div>
  );
}
