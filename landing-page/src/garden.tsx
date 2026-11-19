import { useEffect, useRef, useState, type ReactNode } from 'react'

const BASE = import.meta.env.BASE_URL

/* a decorative blue flower, positioned by its CSS class; the vine finds it by [data-flower] */
export function Flower({ kind, className = '' }: { kind: 'pearl' | 'bloom'; className?: string }) {
  return (
    <img
      data-flower
      className={`fl fl--${kind} ${className}`}
      src={`${BASE}img/flower-${kind}.webp`}
      alt=""
      aria-hidden
      draggable={false}
      width={kind === 'pearl' ? 615 : 532}
      height={kind === 'pearl' ? 640 : 508}
    />
  )
}

type Pt = { x: number; y: number }

/* Catmull-Rom → cubic Bézier, so the line flows smoothly through every flower */
function smoothPath(p: Pt[]) {
  if (p.length < 2) return ''
  let d = `M${p[0].x},${p[0].y}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] ?? p2
    const c1 = { x: p1.x + (p2.x - p0.x) / 5, y: p1.y + (p2.y - p0.y) / 5 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 5, y: p2.y - (p3.y - p1.y) / 5 }
    d += ` C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`
  }
  return d
}

/**
 * Wraps the home sections. Measures every flower, threads one fine line through
 * them (ending at the bottom, toward the footer) and draws it in as you scroll.
 */
export function Garden({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const pathEl = useRef<SVGPathElement>(null)
  const [geo, setGeo] = useState({ w: 0, h: 0, d: '' })

  // measure flowers → path
  useEffect(() => {
    const el = root.current
    if (!el) return
    const measure = () => {
      const box = el.getBoundingClientRect()
      const pts = [...el.querySelectorAll<HTMLElement>('[data-flower]')]
        .filter((f) => f.offsetParent !== null)
        .map((f) => {
          const r = f.getBoundingClientRect()
          return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
        })
        .sort((a, b) => a.y - b.y)
      if (pts.length) pts.push({ x: box.width / 2, y: box.height }) // run on into the footer
      setGeo({ w: box.width, h: box.height, d: smoothPath(pts) })
    }
    measure()
    // re-measure whenever the page or any flower changes size (fonts, images, viewport);
    // observing each flower also catches cached images that never fire 'load'
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    el.querySelectorAll('[data-flower]').forEach((f) => ro.observe(f))
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  // draw-on-scroll
  useEffect(() => {
    const p = pathEl.current, el = root.current
    if (!p || !el || !geo.d) return
    const len = p.getTotalLength()
    p.style.strokeDasharray = `${len}`
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { p.style.strokeDashoffset = '0'; return }
    let raf = 0
    const update = () => {
      raf = 0
      const top = el.getBoundingClientRect().top + window.scrollY
      const reach = window.scrollY + window.innerHeight * 0.7 - top
      const k = Math.min(1, Math.max(0.04, reach / geo.h))
      p.style.strokeDashoffset = `${len * (1 - k)}`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [geo])

  return (
    <div className="garden" ref={root}>
      {children}
      <svg className="vine" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w || 1} ${geo.h || 1}`} aria-hidden>
        <path ref={pathEl} d={geo.d} />
      </svg>
    </div>
  )
}
