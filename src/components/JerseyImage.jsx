/**
 * SVG-drawn football jersey with team colors, stripes and collar styles.
 * Renders a realistic-looking kit illustration — no external images needed.
 */
export default function JerseyImage({ kit, size = 200 }) {
  const {
    base = '#ffffff',
    secondary = '#cccccc',
    collar = '#cccccc',
    collarType = 'v', // 'v' | 'round' | 'polo'
    pattern = 'solid', // 'solid' | 'stripes-v' | 'stripes-h' | 'diagonal' | 'half' | 'sash' | 'hoops'
    stripeColor = secondary,
    badge = null,
    sleeves = base,
    glow = base,
  } = kit

  const w = 200
  const h = 220

  // Jersey body path
  const bodyPath = 'M68,32 L68,178 Q68,184 74,184 L126,184 Q132,184 132,178 L132,32 Z'
  // Left sleeve
  const leftSleeve = 'M68,32 L68,68 L18,82 L8,58 L52,32 Z'
  // Right sleeve
  const rightSleeve = 'M132,32 L132,68 L182,82 L192,58 L148,32 Z'
  // Collar V
  const collarV = 'M84,32 L100,52 L116,32'
  // Collar round
  const collarRound = 'M82,32 Q100,48 118,32'
  // Collar polo
  const collarPolo = 'M82,32 L82,44 Q91,52 100,52 Q109,52 118,44 L118,32'

  const collarPath = collarType === 'round' ? collarRound : collarType === 'polo' ? collarPolo : collarV

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={size * (h / w)}
      style={{ overflow: 'visible', filter: `drop-shadow(0 8px 24px ${glow}44)` }}
    >
      <defs>
        {/* Vertical stripes */}
        <pattern id={`sv-${base}`} x="0" y="0" width="16" height="200" patternUnits="userSpaceOnUse">
          <rect width="8" height="200" fill={base} />
          <rect x="8" width="8" height="200" fill={stripeColor} />
        </pattern>
        {/* Horizontal stripes */}
        <pattern id={`sh-${base}`} x="0" y="0" width="200" height="16" patternUnits="userSpaceOnUse">
          <rect width="200" height="8" fill={base} />
          <rect y="8" width="200" height="8" fill={stripeColor} />
        </pattern>
        {/* Hoops (wide horizontal) */}
        <pattern id={`ho-${base}`} x="0" y="0" width="200" height="28" patternUnits="userSpaceOnUse">
          <rect width="200" height="14" fill={base} />
          <rect y="14" width="200" height="14" fill={stripeColor} />
        </pattern>
        {/* Diagonal sash */}
        <linearGradient id={`sash-${base}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={base} />
          <stop offset="38%" stopColor={base} />
          <stop offset="38%" stopColor={stripeColor} />
          <stop offset="62%" stopColor={stripeColor} />
          <stop offset="62%" stopColor={base} />
          <stop offset="100%" stopColor={base} />
        </linearGradient>
        {/* Half/split */}
        <linearGradient id={`half-${base}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="50%" stopColor={base} />
          <stop offset="50%" stopColor={stripeColor} />
        </linearGradient>
        {/* Ambient shadow on body */}
        <linearGradient id={`shade-${base}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
          <stop offset="20%" stopColor="rgba(0,0,0,0)" />
          <stop offset="80%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
        </linearGradient>
      </defs>

      {/* ── Sleeves ── */}
      <path
        d={leftSleeve}
        fill={
          pattern === 'stripes-v' ? `url(#sv-${base})`
          : pattern === 'stripes-h' ? `url(#sh-${base})`
          : pattern === 'hoops' ? `url(#ho-${base})`
          : sleeves
        }
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
      />
      <path
        d={rightSleeve}
        fill={
          pattern === 'stripes-v' ? `url(#sv-${base})`
          : pattern === 'stripes-h' ? `url(#sh-${base})`
          : pattern === 'hoops' ? `url(#ho-${base})`
          : sleeves
        }
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
      />

      {/* ── Body ── */}
      <path
        d={bodyPath}
        fill={
          pattern === 'stripes-v' ? `url(#sv-${base})`
          : pattern === 'stripes-h' ? `url(#sh-${base})`
          : pattern === 'hoops' ? `url(#ho-${base})`
          : pattern === 'half' ? `url(#half-${base})`
          : pattern === 'sash' ? base
          : base
        }
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
      />

      {/* Diagonal sash overlay */}
      {pattern === 'sash' && (
        <path
          d={bodyPath}
          fill={`url(#sash-${base})`}
          clipPath="url(#body-clip)"
        />
      )}

      {/* Body ambient shading */}
      <path d={bodyPath} fill={`url(#shade-${base})`} />

      {/* ── Collar ── */}
      <path
        d={collarPath}
        fill="none"
        stroke={collar}
        strokeWidth={collarType === 'polo' ? 8 : 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {collarType === 'polo' && (
        <path d={collarPath} fill={collar} opacity="0.3" />
      )}

      {/* ── Badge placeholder ── */}
      {badge && (
        <text
          x="100"
          y="105"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          style={{ userSelect: 'none' }}
        >
          {badge}
        </text>
      )}

      {/* ── Highlight sheen ── */}
      <path
        d="M85,40 Q88,38 91,55 Q89,72 86,80 Q82,60 85,40 Z"
        fill="rgba(255,255,255,0.12)"
      />
    </svg>
  )
}
