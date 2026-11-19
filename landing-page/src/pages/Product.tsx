import { useState } from 'react'
import { byId, categories, img, products } from '../data'
import { Bag, Shield, Truck } from '../icons'
import { useStore } from '../store'
import { Crumbs, ProductCard, Qty, Section, Stars, Ttl } from '../ui'

export default function Product({ id }: { id: string }) {
  const { u, L, money, add } = useStore()
  const p = byId(id) ?? products[0]
  const [shot, setShot] = useState(0)
  const [size, setSize] = useState(p.sizes[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'desc' | 'use'>('desc')
  const cat = categories.find((c) => c.id === p.cat)
  // same category first, then bestsellers, never the product itself
  const related = [...products.filter((x) => x.cat === p.cat && x.id !== p.id), ...products.filter((x) => x.cat !== p.cat)].slice(0, 3)
  const thumbs = p.gallery.length > 1 ? p.gallery : [p.img, p.img, p.img]

  return (
    <>
      <Section className="pdp">
        <div className="wrap" key={p.id}>
          <Crumbs items={[[u.shop.crumbs[0], '#/'], [u.shop.crumbs[1], '#/shop'], [cat ? L(cat.title) : '', '#/shop'], [L(p.name)]]} />
          <div className="pdp__in">
            <div className="pdp__thumbs">
              {thumbs.slice(0, 3).map((g, i) => (
                <button key={i} className={shot === i ? 'on' : ''} onClick={() => setShot(i)} aria-label={`${i + 1}`}>
                  <img src={img(g)} alt="" />
                </button>
              ))}
            </div>
            <figure className="pdp__main">
              <img src={img(thumbs[shot] ?? p.img)} alt={L(p.name)} />
              {p.tag && <span className="pc__tag">{L(p.tag)}</span>}
            </figure>
            <div className="pdp__info">
              <small className="pdp__brand">{u.product.brand}: {p.brand}</small>
              <h1>{L(p.name)}</h1>
              <Stars n={p.rating} size={14} />

              <div className="tabs">
                <button className={tab === 'desc' ? 'on' : ''} onClick={() => setTab('desc')}>{u.product.desc}</button>
                <button className={tab === 'use' ? 'on' : ''} onClick={() => setTab('use')}>{u.product.use}</button>
              </div>
              <p className="pdp__text">{L(tab === 'desc' ? p.desc : p.use)}</p>

              <div className="pdp__opt">
                <span>{u.product.size}</span>
                <div className="seg">
                  {p.sizes.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}
                </div>
              </div>

              <div className="pdp__buy">
                <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />
                <b className="pdp__price">{money(p.price * qty)}</b>
                <button className="btn btn--dark" onClick={() => add(p.id, size, qty)}><Bag />{u.product.add}</button>
              </div>

              <ul className="pdp__perks">
                <li><Shield />{u.product.original}</li>
                <li><Truck />{u.product.ship}</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="related">
        <div className="wrap">
          <div className="reveal"><Ttl a={u.product.related} em={u.product.relatedEm} /></div>
          <div className="pgrid pgrid--3">
            {related.map((r, i) => <ProductCard key={r.id} p={r} variant={(['normal', 'small', 'tall'] as const)[i]} />)}
          </div>
        </div>
      </Section>
    </>
  )
}
