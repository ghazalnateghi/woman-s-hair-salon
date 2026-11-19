import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { byId, ui, type Lang, type T } from './data'

export type CartItem = { id: string; size: string; qty: number }
export type Route = { page: 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'done'; id?: string; section?: string }

function parseHash(): Route {
  const h = location.hash.replace(/^#\/?/, '')
  const [path, query] = h.split('?')
  const section = new URLSearchParams(query).get('s') ?? undefined
  const [page, id] = path.split('/')
  if (page === 'shop') return { page: 'shop', section }
  if (page === 'product' && id) return { page: 'product', id }
  if (page === 'cart') return { page: 'cart' }
  if (page === 'checkout') return { page: 'checkout' }
  if (page === 'done') return { page: 'done' }
  return { page: 'home', section }
}

function load<V>(key: string, fallback: V): V {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as V) : fallback
  } catch { return fallback }
}
function save(key: string, v: unknown) {
  try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ }
}

function initialLang(): Lang {
  const q = new URLSearchParams(location.search).get('lang')
  if (q === 'en' || q === 'fa') return q
  const v = load<string>('lang', 'fa')
  return v === 'en' ? 'en' : 'fa'
}

function useStoreValue() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [route, setRoute] = useState<Route>(parseHash)
  const [cart, setCart] = useState<CartItem[]>(() => load('cart', []))
  const [favs, setFavs] = useState<string[]>(() => load('favs', []))
  const [promo, setPromo] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    // plain anchors like #footer only scroll; they must not change the page
    const on = () => { if (!location.hash || location.hash.startsWith('#/')) setRoute(parseHash()) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  // scroll to the requested section, or to the top on a page change
  useEffect(() => {
    const id = route.section
    requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    })
  }, [route.page, route.id, route.section])

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.title = lang === 'fa' ? 'ولورا | سالن زیبایی بانوان' : 'Velora | Women’s Beauty Salon'
    save('lang', lang)
  }, [lang])
  useEffect(() => save('cart', cart), [cart])
  useEffect(() => save('favs', favs), [favs])
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const L = useCallback((x: T) => x[lang], [lang])
  const nf = useMemo(() => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US'), [lang])
  const money = useCallback((n: number) => `${nf.format(n)} ${ui[lang].toman}`, [nf, lang])
  const num = useCallback((n: number) => nf.format(n), [nf])

  const add = useCallback((id: string, size: string, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === id && x.size === size)
      if (i < 0) return [...c, { id, size, qty }]
      const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n
    })
    setToast(ui[lang].product.added)
  }, [lang])
  const setQty = (id: string, size: string, qty: number) =>
    setCart((c) => c.flatMap((x) => (x.id === id && x.size === size ? (qty > 0 ? [{ ...x, qty }] : []) : [x])))
  const clearCart = () => { setCart([]); setPromo(false) }
  const toggleFav = (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  const count = cart.reduce((s, x) => s + x.qty, 0)
  const subtotal = cart.reduce((s, x) => s + (byId(x.id)?.price ?? 0) * x.qty, 0)
  const discount = promo ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal === 0 || subtotal - discount >= 2_000_000 ? 0 : 85_000

  return {
    lang, setLang, u: ui[lang], L, money, num,
    route,
    cart, add, setQty, clearCart, count, subtotal, discount, shipping, total: subtotal - discount + shipping,
    promo, setPromo,
    favs, toggleFav,
    toast,
  }
}

type Store = ReturnType<typeof useStoreValue>
const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const v = useStoreValue()
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore outside StoreProvider')
  return v
}
