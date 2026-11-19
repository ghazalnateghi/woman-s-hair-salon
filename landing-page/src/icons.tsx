import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const line = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export const ArrowUR = (p: P) => <svg {...line} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
export const ArrowUp = (p: P) => <svg {...line} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
export const ChevL = (p: P) => <svg {...line} {...p}><path d="m15 5-7 7 7 7" /></svg>
export const ChevR = (p: P) => <svg {...line} {...p}><path d="m9 5 7 7-7 7" /></svg>
export const ChevD = (p: P) => <svg {...line} {...p}><path d="m6 9 6 6 6-6" /></svg>
export const Plus = (p: P) => <svg {...line} {...p}><path d="M12 5v14M5 12h14" /></svg>
export const Minus = (p: P) => <svg {...line} {...p}><path d="M5 12h14" /></svg>
export const Menu = (p: P) => <svg {...line} {...p}><path d="M4 8h16M4 16h16" /></svg>
export const Close = (p: P) => <svg {...line} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
export const Check = (p: P) => <svg {...line} strokeWidth={2} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
export const Heart = (p: P) => (
  <svg {...line} {...p}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" /></svg>
)
export const Bag = (p: P) => (
  <svg {...line} {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
)
export const User = (p: P) => (
  <svg {...line} {...p}><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></svg>
)
export const Filter = (p: P) => (
  <svg {...line} {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
)
export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2.8 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1L3.2 9.3l6.1-.9Z" /></svg>
)
export const Truck = (p: P) => (
  <svg {...line} {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
)
export const Shield = (p: P) => (
  <svg {...line} {...p}><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const Pin = (p: P) => (
  <svg {...line} {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></svg>
)
export const Phone = (p: P) => (
  <svg {...line} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg>
)
export const Insta = (p: P) => (
  <svg {...line} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.2 6.8h.01" strokeWidth={2.6} /></svg>
)
export const Telegram = (p: P) => (
  <svg {...line} {...p}><path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15ZM9 13l9-6-7 8" /></svg>
)
export const WhatsApp = (p: P) => (
  <svg {...line} {...p}>
    <path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.4 19L4 20Z" />
    <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1.2-.5-2.2-1.5-2.7-2.7l.9-1-1-2L9 8.5Z" strokeWidth={1.2} />
  </svg>
)
