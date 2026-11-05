type Props = { entities: string; steps: string[] };

function short(s: string, n = 18) {
  const t = s.trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
}

export default function ScenarioVisual({ entities, steps }: Props) {
  const left = entities.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3);
  const stages = ["связи", "проверка", "проект решения"];

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">
        <span>как есть</span>
        <span className="text-[var(--color-acid-ink)]">как стало</span>
      </div>

      <svg viewBox="0 0 380 118" className="mt-1.5 w-full" role="img" aria-label="Слева разрозненные объекты, справа связанная цепочка работы агента">
        <defs>
          <marker id="sv-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--color-line)" strokeWidth="1" />
          </marker>
        </defs>

        {left.map((label, i) => {
          const y = 8 + i * 34;
          return (
            <g key={label + i}>
              <rect x="4" y={y} width="132" height="26" rx="6" fill="none" stroke="var(--color-line)" strokeDasharray="3 3" />
              <text x="14" y={y + 17} fontSize="9.5" fill="var(--color-mute)">{short(label)}</text>
            </g>
          );
        })}

        <line x1="142" y1="59" x2="196" y2="59" stroke="var(--color-line)" strokeDasharray="4 4" markerEnd="url(#sv-arrow)" className="sv-flow" />
        <circle r="3" fill="var(--color-acid)" className="sv-dot">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M146 59 L192 59" />
        </circle>

        {stages.map((label, i) => {
          const y = 8 + i * 34;
          return (
            <g key={label} className="sv-node" style={{ animationDelay: (i * 0.6).toFixed(2) + "s" }}>
              <rect x="204" y={y} width="172" height="26" rx="6" fill="var(--color-acid)" fillOpacity="0.07" stroke="var(--color-acid)" strokeOpacity="0.45" />
              <circle cx="216" cy={y + 13} r="2.5" fill="var(--color-acid)" />
              <text x="226" y={y + 17} fontSize="10" fill="var(--color-ink)">{label}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 rounded-md border border-[var(--color-line)] bg-white/60 px-3 py-2 font-mono text-[10.5px] leading-[1.7] text-[var(--color-mute)]">
        {steps.map((s, i) => (
          <div key={s} className="flex gap-2">
            <span className="text-[var(--color-acid-ink)]">{">"}</span>
            <span>{s}{i === steps.length - 1 && <span className="sv-caret">▌</span>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
