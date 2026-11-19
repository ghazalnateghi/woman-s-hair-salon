import { useEffect, useState, type ReactNode } from 'react'
import { contact, img, type Product } from './data'
import { Dots } from './decor'
import {
  ArrowUp, ArrowUR, Bag, Close, Heart, Insta, Menu, Phone, Pin, Star, Telegram, WhatsApp,
} from './icons'
import { useStore } from './store'

/* ───────── wireframe-style title: bold uppercase word + script word overlapping it ───────── */
export function Ttl({ a, em, center, light, as: Tag = 'h2' }: { a: string; em: string; center?: boolean; light?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <Tag className={`ttl ${center ? 'ttl--c' : ''} ${light ? 'ttl--light' : ''}`}>
      <b>{a}</b>
      <em>{em}</em>
    </Tag>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`wordmark ${className}`} lang="en">Velora</span>
}

export function Stars({ n, size = 12 }: { n: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${n}/5`}>
      {[0, 1, 2, 3, 4].map((k) => <Star key={k} width={size} className={k < n ? 'on' : ''} />)}
    </span>
  )
}

export function Crumbs({ items }: { items: [string, string?][] }) {
  return (
    <nav className="crumbs" aria-label="breadcrumb">
      {items.map(([label, href], i) => (
        <span key={label}>
          {href ? <a href={href}>{label}</a> : <b>{label}</b>}
          {i < items.length - 1 && <i>/</i>}
        </span>
      ))}
    </nav>
  )
}

export function Stepper({ step }: { step: 0 | 1 | 2 }) {
  const { u } = useStore()
  return (
    <ol className="stepper">
      {u.cart.steps.map((s, i) => (
        <li key={s} className={i < step ? 'done' : i === step ? 'now' : ''}>
          <i>{i + 1}</i><span>{s}</span>
        </li>
      ))}
    </ol>
  )
}

/* ───────── product card ───────── */
export function ProductCard({ p, variant = 'normal' }: { p: Product; variant?: 'normal' | 'tall' | 'small' | 'wide' }) {
  const { L, money, favs, toggleFav, add, u } = useStore()
  const fav = favs.includes(p.id)
  return (
    <article className={`pc pc--${variant} reveal`}>
      <a className="pc__img" href={`#/product/${p.id}`}>
        <img src={img(p.img)} alt={L(p.name)} loading="lazy" />
        {p.tag && <span className="pc__tag">{L(p.tag)}</span>}
      </a>
      <button className={`pc__fav ${fav ? 'on' : ''}`} onClick={() => toggleFav(p.id)} aria-label="favorite"><Heart /></button>
      <div className="pc__row">
        <a href={`#/product/${p.id}`}>
          <h3>{L(p.name)}</h3>
          <small>{money(p.price)}</small>
        </a>
        <button className="pc__add" onClick={() => add(p.id, p.sizes[0])} aria-label={u.product.add}><Bag /></button>
      </div>
    </article>
  )
}

/* ───────── nav ───────── */
export function Nav() {
  const { u, lang, setLang, route } = useStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links: [string, string, boolean][] = [
    [u.nav.home, '#/', route.page === 'home' && !route.section],
    [u.nav.shop, '#/shop', route.page === 'shop' || route.page === 'product'],
    [u.nav.services, '#/?s=services', route.section === 'services'],
    [u.nav.blog, '#/?s=blog', route.section === 'blog'],
    [u.nav.faq, '#/?s=faq', route.section === 'faq'],
    [u.nav.contact, '#footer', false],
  ]
  return (
    <header className={`nav ${scrolled || open ? 'nav--scrolled' : ''}`}>
      {/* physical layout: logo left, links centred, language right — in both languages */}
      <div className="nav__in wrap">
        <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <Close /> : <Menu />}</button>
        <a className="nav__logo" href="#/" aria-label="Velora"><Wordmark /></a>
        <nav className={`nav__links ${open ? 'open' : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} onClick={() => setOpen(false)}>
          {links.map(([l, h, on]) => <a key={l} href={h} className={on ? 'on' : ''}>{l}</a>)}
        </nav>
        <button className="nav__lang" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} aria-label={lang === 'fa' ? 'English' : 'فارسی'}>{u.langSwitch}</button>
      </div>
    </header>
  )
}

/* ───────── footer (black with white dots) ───────── */
export function Footer() {
  const { u, L } = useStore()
  const f = u.foot
  return (
    <footer className="foot" id="footer">
      <Dots count={10} seed={29} tone="light" avoid={[[6, 6, 94, 94]]} className="dots--float" />
      <div className="wrap foot__top">
        <div className="foot__cta">
          <Ttl a={f.t} em={f.em} light />
          <a className="btn btn--light" href={`tel:${contact.tel}`}>{f.cta}<ArrowUR /></a>
          <ul className="foot__contact">
            <li><Pin />{L(contact.address)}</li>
            <li><Phone /><span dir="ltr">{L(contact.phone)}</span></li>
          </ul>
        </div>
        <div className="foot__cols">
          <div>
            <h4>{f.cols[0]}</h4>
            {f.buyers.map((x, i) => <a key={x} href={i === 3 ? '#/?s=faq' : '#/shop'}>{x}</a>)}
          </div>
          <div>
            <h4>{f.cols[1]}</h4>
            {f.velora.map((x, i) => <a key={x} href={['#/?s=about', '#/?s=services', '#/?s=blog', '#footer'][i]}>{x}</a>)}
          </div>
          <div>
            <h4>{f.cols[2]}</h4>
            {[Insta, Telegram, WhatsApp].map((I, i) => (
              <a key={i} href="#footer" className="foot__soc"><I />{f.social[i]}</a>
            ))}
            <span className="foot__handle" dir="ltr">{contact.insta}</span>
          </div>
        </div>
      </div>
      <div className="foot__giant" aria-hidden><Wordmark /><Wordmark /></div>
      <div className="wrap foot__bar">
        <small>{f.rights}</small>
        <a href="#footer">{f.privacy}</a>
        <a href="#footer">{f.terms}</a>
        <a href="#/" className="totop" aria-label="top"><ArrowUp /></a>
      </div>
    </footer>
  )
}

/* with no cart icon in the header, the add-to-cart toast is the way into the cart */
export function Toast() {
  const { toast, u, count, num } = useStore()
  return (
    <a className={`toast ${toast ? 'show' : ''}`} role="status" href="#/cart" tabIndex={toast ? 0 : -1}>
      {toast && <><i />{toast} · <b>{u.cart.view} ({num(count)})</b></>}
    </a>
  )
}

export function Qty({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const { num } = useStore()
  return (
    <div className="qty">
      <button onClick={() => onChange(value - 1)} aria-label="-">−</button>
      <span>{num(value)}</span>
      <button onClick={() => onChange(value + 1)} aria-label="+">+</button>
    </div>
  )
}

export function Section({ id, className = '', children }: { id?: string; className?: string; children: ReactNode }) {
  return <section id={id} className={`sec ${className}`}>{children}</section>
}

