const ACCENT = "#4aff91";
const LINE = "#2a2a2a";
const LINE_SOFT = "#1c1c1c";
const PANEL = "#0d0d0d";
const PANEL_DEEP = "#060606";

export function LaptopVisual() {
  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="laptopScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#131313" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect x="40" y="16" width="240" height="130" rx="10" fill="#141414" stroke="#242424" />
      <rect x="49" y="25" width="222" height="112" rx="4" fill="url(#laptopScreen)" />

      <circle cx="60" cy="34" r="2.4" fill="#3a3a3a" />
      <circle cx="68" cy="34" r="2.4" fill="#3a3a3a" />
      <circle cx="76" cy="34" r="2.4" fill={ACCENT} opacity="0.8" />
      <rect x="90" y="31" width="90" height="6" rx="3" fill="#1c1c1c" />

      <rect x="60" y="50" width="70" height="9" rx="2" fill={ACCENT} opacity="0.85" />
      <rect x="60" y="66" width="130" height="5" rx="2.5" fill={LINE} />
      <rect x="60" y="76" width="100" height="5" rx="2.5" fill={LINE} />
      <rect x="60" y="94" width="46" height="30" rx="5" fill="#161616" stroke="#232323" />
      <rect x="112" y="94" width="46" height="30" rx="5" fill="#161616" stroke="#232323" />
      <rect x="164" y="94" width="46" height="30" rx="5" fill="#161616" stroke="#232323" />
      <rect x="60" y="112" width="24" height="6" rx="3" fill={ACCENT} opacity="0.5" />
      <rect x="112" y="112" width="24" height="6" rx="3" fill="#2a2a2a" />
      <rect x="164" y="112" width="24" height="6" rx="3" fill="#2a2a2a" />

      <path d="M28 146 L292 146 L276 158 L44 158 Z" fill="#101010" stroke="#202020" />
    </svg>
  );
}

export function ServerVisual() {
  const rows = [
    { lit: true },
    { lit: false },
    { lit: true },
    { lit: false },
  ];
  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ledGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="70" y="18" width="180" height="154" rx="12" fill={PANEL} stroke="#232323" />
      {rows.map((row, i) => (
        <g key={i} transform={`translate(0 ${34 + i * 36})`}>
          <rect x="86" y="0" width="148" height="26" rx="6" fill={PANEL_DEEP} stroke="#1e1e1e" />
          <circle
            cx="102"
            cy="13"
            r={row.lit ? 3.4 : 2.6}
            fill={row.lit ? ACCENT : "#333333"}
            filter={row.lit ? "url(#ledGlow)" : undefined}
          />
          <rect x="118" y="10" width={row.lit ? 46 : 34} height="6" rx="3" fill={row.lit ? ACCENT : "#2a2a2a"} opacity={row.lit ? 0.7 : 1} />
          <line x1="196" y1="6" x2="196" y2="20" stroke="#262626" strokeWidth="2" />
          <line x1="204" y1="6" x2="204" y2="20" stroke="#262626" strokeWidth="2" />
          <line x1="212" y1="6" x2="212" y2="20" stroke="#262626" strokeWidth="2" />
          <line x1="220" y1="6" x2="220" y2="20" stroke="#262626" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

export function PhoneVisual() {
  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phoneProduct" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c2b22" />
          <stop offset="100%" stopColor="#0c120e" />
        </linearGradient>
      </defs>
      <rect x="118" y="10" width="84" height="170" rx="16" fill="#141414" stroke="#242424" />
      <rect x="124" y="20" width="72" height="150" rx="4" fill="#070707" />
      <rect x="152" y="14" width="16" height="4" rx="2" fill="#2a2a2a" />

      <rect x="130" y="28" width="60" height="52" rx="6" fill="url(#phoneProduct)" stroke="#223225" />
      <circle cx="160" cy="54" r="12" fill="none" stroke={ACCENT} strokeWidth="1.4" opacity="0.55" />

      <rect x="130" y="88" width="46" height="7" rx="3.5" fill="#e8e8e8" opacity="0.85" />
      <rect x="130" y="99" width="30" height="5" rx="2.5" fill="#2c2c2c" />
      <rect x="130" y="109" width="22" height="6" rx="3" fill={ACCENT} opacity="0.9" />

      <rect x="130" y="128" width="60" height="20" rx="10" fill={ACCENT} opacity="0.14" stroke={ACCENT} strokeOpacity="0.5" />
      <rect x="140" y="135" width="40" height="6" rx="3" fill={ACCENT} opacity="0.8" />
    </svg>
  );
}

export function DashboardVisual() {
  const bars = [0.35, 0.55, 0.4, 0.75, 0.6, 0.9];
  return (
    <svg viewBox="0 0 320 190" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="34" y="16" width="252" height="150" rx="10" fill={PANEL} stroke="#232323" />

      <rect x="52" y="32" width="46" height="8" rx="2" fill="#2a2a2a" />
      <rect x="52" y="44" width="30" height="12" rx="3" fill={ACCENT} opacity="0.85" />

      <polyline
        points="192,70 214,58 236,64 258,44 268,50"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {[
        [192, 70],
        [214, 58],
        [236, 64],
        [258, 44],
        [268, 50],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={ACCENT} />
      ))}

      <line x1="52" y1="146" x2="268" y2="146" stroke={LINE_SOFT} strokeWidth="1" />
      {bars.map((h, i) => {
        const barWidth = 22;
        const gap = 12;
        const x = 52 + i * (barWidth + gap);
        const maxHeight = 62;
        const barHeight = h * maxHeight;
        return (
          <rect
            key={i}
            x={x}
            y={146 - barHeight}
            width={barWidth}
            height={barHeight}
            rx="4"
            fill="url(#barFill)"
          />
        );
      })}
    </svg>
  );
}
