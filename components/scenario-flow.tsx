type Props = { entities: string; process: string };

function short(s: string, n = 16) {
  const t = s.trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
}

const LAYERS = ["онтология", "память", "граф", "контур", "журнал"];

export default function ScenarioFlow({ entities, process }: Props) {
  const left = entities.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3);
  const right = ["связи и расхождения", "проект решения", "проверка по правилам", "человек решает"];

  return (
    <div className="mt-5">
      <svg viewBox="0 0 520 230" className="w-full" role="img" aria-label="Разрозненные документы проходят через слои ядра и превращаются в упорядоченную цепочку решения">
        <text x="6" y="12" fontSize="8.5" fill="var(--color-mute)" letterSpacing="0.12em">КАК ЕСТЬ</text>
        <text x="165" y="12" fontSize="8.5" fill="var(--color-acid-ink)" letterSpacing="0.12em">ЯДРО</text>
        <text x="368" y="12" fontSize="8.5" fill="var(--color-acid-ink)" letterSpacing="0.12em">КАК СТАЛО</text>

        {left.map((label, i) => {
          const y = 26 + i * 54;
          return (
            <g key={label + i}>
              <rect x="6" y={y} width="134" height="28" rx="6" fill="none" stroke="var(--color-line)" strokeDasharray="3 3" />
              <text x="16" y={y + 18} fontSize="10" fill="var(--color-mute)">{short(label)}</text>
            </g>
          );
        })}

        <path d="M140 92 L160 92" stroke="var(--color-line)" strokeDasharray="4 4" />
        <circle r="3" fill="var(--color-acid)">
          <animateMotion dur="3.4s" repeatCount="indefinite" path="M146 92 L356 92" />
        </circle>

        {LAYERS.map((l, i) => {
          const y = 24 + i * 34;
          return (
            <g key={l} className="sv-layer" style={{ animationDelay: (i * 0.45).toFixed(2) + "s" }}>
              <rect x="165" y={y} width="182" height="27" rx="6" fill="var(--color-acid)" fillOpacity="0.05" stroke="var(--color-acid)" strokeOpacity="0.3" />
              <text x="177" y={y + 18} fontSize="9.5" fill="var(--color-ink)">{l}</text>
            </g>
          );
        })}

        <path d="M352 92 L366 92" stroke="var(--color-line)" strokeDasharray="4 4" />

        {right.map((label, i) => {
          const y = 26 + i * 44;
          const last = i === right.length - 1;
          return (
            <g key={label} className="sv-step" style={{ animationDelay: (0.5 + i * 0.5).toFixed(2) + "s" }}>
              <rect x="370" y={y} width="144" height="28" rx="6"
                fill={last ? "rgba(0,0,0,0.02)" : "var(--color-acid)"} fillOpacity={last ? 1 : 0.07}
                stroke={last ? "var(--color-line)" : "var(--color-acid)"} strokeOpacity={last ? 0.9 : 0.45}
                strokeDasharray={last ? "4 3" : "0"} />
              <circle cx="382" cy={y + 14} r="2.6" fill={last ? "var(--color-mute)" : "var(--color-acid)"} />
              <text x="392" y={y + 18} fontSize="9.5" fill={last ? "var(--color-mute)" : "var(--color-ink)"}>{label}</text>
            </g>
          );
        })}

        <text x="6" y="216" fontSize="9.5" fill="var(--color-mute)">≈ 4 ч вручную</text>
        <text x="368" y="216" fontSize="9.5" fill="var(--color-acid-ink)">журнал: источники → цепочка → версия</text>
      </svg>
    </div>
  );
}
