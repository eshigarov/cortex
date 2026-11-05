import Link from "next/link";
import type { Metadata } from "next";
import { SCENARIOS } from "@/components/scenarios-data";
import ScenarioVisual from "@/components/scenario-visual";
import ScenarioFlow from "@/components/scenario-flow";

export const metadata: Metadata = {
  title: "Сценарии применения Cortex",
  description:
    "Десять сценариев: производство, логистика, лизинг, проектирование, ритейл, энергетика, нефтегаз, страхование, фарма, договорная работа. Задача, механика, эффект и что измерим в пилоте.",
};

export default function Scenarios() {
  return (
    <section className="wrap py-24">
      <span className="eyebrow">сценарии</span>
      <h1 className="h2 mt-4 max-w-[26ch]">Где ядро убирает ручную работу</h1>
      <p className="mt-6 max-w-[68ch] text-[15px] leading-relaxed text-[var(--color-mute)]">
        Десять отраслей и доменов. В каждом — задача, сущности, которые связывает граф, механика работы агента,
        эффект до и после и метрика, которую фиксируем в пилоте. Эффекты — проектные ориентиры, в пилоте фиксируем ваш факт.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SCENARIOS.map((s, i) => (
          <article key={s.process} className="card flex flex-col p-7">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-mute)]">{s.sector}</span>
              <span className="text-[12px] font-medium text-[var(--color-acid-ink)]">{s.pct}</span>
            </div>
            <h2 className="mt-2 text-[18px] font-semibold">{s.process}</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{s.pain}</p>

            <div className="mt-5 flex flex-wrap items-baseline gap-2">
              <span className="text-[14px] text-[var(--color-mute)]">{s.from}</span>
              <span className="text-[13px] text-[var(--color-mute)]">→</span>
              <span className="text-[26px] font-semibold leading-none text-[var(--color-acid-ink)]">{s.to}</span>
            </div>
            <div className="mt-2 text-[13.5px] font-medium">{s.gain}</div>

            <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-ink)]/80">{s.mech}</p>

            {i === 0 ? <ScenarioFlow entities={s.entities} process={s.process} /> : <ScenarioVisual entities={s.entities} steps={s.steps} />}

            <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--color-mute)]">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.1em]">человек</span> · {s.human}
            </p>

            <dl className="mt-5 space-y-2 border-t border-[var(--color-line)] pt-4 text-[12.5px] leading-relaxed">
              <div className="flex gap-2">
                <dt className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-mute)]">связи</dt>
                <dd className="text-[var(--color-mute)]">{s.entities}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-mute)]">мерим</dt>
                <dd className="text-[var(--color-mute)]">{s.measure}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4">
        <Link href="/pilot" className="btn btn-primary">Обсудить пилот →</Link>
        <Link href="/core" className="text-[13.5px] underline decoration-[var(--color-line)] underline-offset-4 hover:decoration-[var(--color-ink)]">
          Как устроено ядро
        </Link>
      </div>

      <p className="mt-10 max-w-[70ch] text-[12px] leading-relaxed text-[var(--color-mute)]">
        Эффект — расчёт при указанном объёме, а не результат завершённого внедрения. В пилоте фиксируем ваши
        исходные значения и итог.
      </p>
    </section>
  );
}
