export function CortexMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeLinecap="round" transform="rotate(18 256 256)">
        <circle cx="256" cy="256" r="168" stroke="currentColor" strokeWidth="24" strokeDasharray="791.68 263.90" />
        <circle cx="256" cy="256" r="114" stroke="currentColor" strokeWidth="24" strokeDasharray="537.21 179.07" />
        <circle cx="256" cy="256" r="60" stroke="#FF5A1F" strokeWidth="30" strokeDasharray="282.74 94.25" />
      </g>
    </svg>
  );
}
