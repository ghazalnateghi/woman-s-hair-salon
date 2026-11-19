type Zone = [x0: number, y0: number, x1: number, y1: number] // percentages

/* tiny seeded PRNG so every render places the dots identically */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A field of evenly-sized polka dots scattered like the reference card:
 * random but never touching, and kept out of the given content zones.
 */
export function Dots({
  count = 14,
  seed = 7,
  avoid = [],
  tone = 'dark',
  edges = true,
  className = '',
}: {
  count?: number
  seed?: number
  avoid?: Zone[]
  tone?: 'dark' | 'light'
  /** false keeps dots clear of the top/bottom edge, so they are never sliced by a neighbouring white section */
  edges?: boolean
  className?: string
}) {
  const dots = (() => {
    const r = rng(seed)
    const out: { x: number; y: number; d: number }[] = []
    let tries = 0
    while (out.length < count && tries < 4000) {
      tries++
      const x = r() * 104 - 2
      const y = edges ? r() * 104 - 2 : 8 + r() * 84
      // clamp so dots generated just past an edge still respect zones that touch it
      const cx = Math.min(Math.max(x, 0), 100)
      const cy = Math.min(Math.max(y, 0), 100)
      if (avoid.some(([x0, y0, x1, y1]) => cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1)) continue
      if (out.some((o) => Math.hypot(o.x - x, (o.y - y) * 0.7) < 13)) continue
      out.push({ x, y, d: r() * -8 })
    }
    return out
  })()

  return (
    <div className={`dots dots--${tone} ${className}`} aria-hidden>
      {dots.map((o, i) => (
        <i
          key={i}
          data-mid={o.x > 12 && o.x < 88 ? '' : undefined}
          style={{ left: `${o.x}%`, top: `${o.y}%`, animationDelay: `${o.d}s` }}
        />
      ))}
    </div>
  )
}
