import { useMemo, useState } from 'react'
import { categories, img, products } from '../data'
import { Dots } from '../decor'
import { ArrowUR, ChevD, Close, Filter } from '../icons'
import { useStore } from '../store'
import { Crumbs, ProductCard, Section, Ttl } from '../ui'

/* rhythm of card sizes, like the wireframe's mixed grid */
const rhythm = ['normal', 'small', 'tall', 'normal', 'normal', 'wide', 'small', 'normal', 'tall', 'normal', 'small', 'normal'] as const
const PAGE = 9

export default function Shop() {
  const { u, L, money, num } = useStore()
  const s = u.shop
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [])
  const maxPrice = Math.max(...products.map((p) => p.price))

  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [shown, setShown] = useState(PAGE)
  // draft filters live in the drawer; applied ones drive the grid
  const blank = { min: 0, max: maxPrice, brand: 'all', rating: 0 }
  const [draft, setDraft] = useState(blank)
  const [applied, setApplied] = useState(blank)

  const list = useMemo(() => {
    const l = products.filter((p) =>
      (cat === 'all' || p.cat === cat) &&
      p.price >= applied.min && p.price <= applied.max &&
      (applied.brand === 'all' || p.brand === applied.brand) &&
      p.rating >= applied.rating)
    if (sort === 1) l.sort((a, b) => a.price - b.price)
    if (sort === 2) l.sort((a, b) => b.price - a.price)
    if (sort === 3) l.sort((a, b) => b.rating - a.rating)
    return l
  }, [cat, sort, applied])

  const activeCount = (applied.brand !== 'all' ? 1 : 0) + (applied.rating ? 1 : 0) + (applied.min > 0 || applied.max < maxPrice ? 1 : 0)

  return (
    <>
      {/* ── categories strip ── */}
      <Section className="shop-cats">
        <div className="wrap">
          <Crumbs items={[[s.crumbs[0], '#/'], [s.crumbs[1]]]} />
          <div className="reveal"><Ttl a={s.cats} em={s.catsEm} as="h1" /></div>
        </div>
        <div className="strip strip--cats reveal">
          {categories.map((c, i) => (
            <button
              key={c.id}
              className={`strip__card strip__card--${['m', 's', 'l', 's', 'm', 's'][i]} ${cat === c.id ? 'on' : ''}`}
              onClick={() => { setCat(cat === c.id ? 'all' : c.id); setShown(PAGE) }}
            >
              <div className="strip__img"><img src={img(c.img)} alt="" loading="lazy" /></div>
              <span>{L(c.title)}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* ── catalogue grid ── */}
      <Section className="shop-grid" id="catalog">
        <div className="wrap">
          <div className="reveal"><Ttl a={s.catalog} em={s.catalogEm} /></div>
          <div className="toolbar">
            <button className="toolbar__btn" onClick={() => { setDraft(applied); setDrawer(true) }}>
              <Filter />{s.filters}{activeCount > 0 && <sup>{activeCount}</sup>}
            </button>
            <div className="chips">
              <button className={cat === 'all' ? 'on' : ''} onClick={() => setCat('all')}>{s.all}</button>
              {categories.map((c) => (
                <button key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>{L(c.title)}</button>
              ))}
            </div>
            <label className="toolbar__sort">
              <span>{s.sort}</span>
              <select value={sort} onChange={(e) => setSort(Number(e.target.value))}>
                {s.sorts.map((o, i) => <option key={o} value={i}>{o}</option>)}
              </select>
              <ChevD />
            </label>
          </div>
          <p className="toolbar__count">{num(list.length)} {s.count}</p>

          {list.length === 0 ? (
            <p className="empty">{s.empty}</p>
          ) : (
            <div className="pgrid">
              {list.slice(0, shown).map((p, i) => <ProductCard key={p.id} p={p} variant={rhythm[i % rhythm.length]} />)}
            </div>
          )}

          {shown < list.length && (
            <div className="more">
              <button className="btn btn--dark" onClick={() => setShown(shown + PAGE)}>{s.more}</button>
              <div className="dots-nav dots-nav--static">
                {Array.from({ length: Math.ceil(list.length / PAGE) }, (_, i) => <i key={i} className={i * PAGE < shown ? 'on' : ''} />)}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ── custom package ── */}
      <Section className="custom">
        <div className="wrap custom__in reveal">
          <Ttl a={s.custom} em={s.customEm} center />
          <p>{s.customText}</p>
          <a className="btn btn--dark" href="#footer">{s.customCta}<ArrowUR /></a>
        </div>
        <div className="custom__row reveal">
          {['p16', 's-products', 'p7', 's-mask', 'p2'].map((n, i) => (
            <img key={n} className={`custom__img custom__img--${i}`} src={img(n)} alt="" loading="lazy" />
          ))}
        </div>
      </Section>

      {/* ── delivery banner ── */}
      <Section className="deliver">
        <Dots count={10} seed={41} avoid={[[16, 8, 84, 92]]} className="dots--float" />
        <div className="wrap deliver__in reveal">
          <h2>{s.deliver.map((l, i) => <span key={i}>{l}</span>)}</h2>
          <p>{s.deliverText}</p>
          <a className="btn btn--dark" href="#catalog">{s.deliverCta}</a>
        </div>
      </Section>

      {/* ── filter drawer ── */}
      <div className={`drawer ${drawer ? 'open' : ''}`} aria-hidden={!drawer}>
        <button className="drawer__shade" onClick={() => setDrawer(false)} aria-label="close" tabIndex={-1} />
        <aside className="drawer__panel" role="dialog" aria-label={s.filters}>
          <header><h3>{s.filters}</h3><button onClick={() => setDrawer(false)} aria-label="close"><Close /></button></header>

          <div className="field">
            <span className="field__label">{s.price}</span>
            <div className="range2">
              <label><small>{s.min}</small><input type="number" min={0} step={10000} value={draft.min} onChange={(e) => setDraft({ ...draft, min: Number(e.target.value) })} /></label>
              <label><small>{s.max}</small><input type="number" min={0} step={10000} value={draft.max} onChange={(e) => setDraft({ ...draft, max: Number(e.target.value) })} /></label>
            </div>
            <input type="range" min={0} max={maxPrice} step={10000} value={draft.max} onChange={(e) => setDraft({ ...draft, max: Number(e.target.value) })} />
            <small className="field__hint">{money(draft.min)} — {money(draft.max)}</small>
          </div>

          <label className="field">
            <span className="field__label">{s.cat}</span>
            <div className="select"><select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="all">{s.all}</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{L(c.title)}</option>)}
            </select><ChevD /></div>
          </label>

          <label className="field">
            <span className="field__label">{s.brand}</span>
            <div className="select"><select value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })}>
              <option value="all">{s.all}</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select><ChevD /></div>
          </label>

          <div className="field">
            <span className="field__label">{s.rating}</span>
            <div className="seg">
              {[0, 4, 5].map((r) => (
                <button key={r} className={draft.rating === r ? 'on' : ''} onClick={() => setDraft({ ...draft, rating: r })}>
                  {r === 0 ? s.all : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          <footer>
            <button className="btn btn--dark" onClick={() => { setApplied(draft); setShown(PAGE); setDrawer(false) }}>{s.apply}</button>
            <button className="btn btn--line" onClick={() => { setDraft(blank); setApplied(blank); setCat('all') }}>{s.reset}</button>
          </footer>
        </aside>
      </div>
    </>
  )
}
