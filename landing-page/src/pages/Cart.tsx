import { useState } from 'react'
import { byId, img, products } from '../data'
import { ArrowUR, Close } from '../icons'
import { useStore } from '../store'
import { ProductCard, Qty, Section, Stepper, Ttl } from '../ui'

export function Summary({ cta }: { cta?: boolean }) {
  const { u, money, subtotal, discount, shipping, total, promo, setPromo, count } = useStore()
  const c = u.cart
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState<'' | 'ok' | 'bad'>(promo ? 'ok' : '')
  // not a <form>: the summary also sits inside the checkout form, and forms can't nest
  const apply = () => {
    const ok = code.trim().toUpperCase() === 'VELORA10'
    setPromo(ok); setMsg(ok ? 'ok' : 'bad')
  }
  return (
    <aside className="sum">
      <h3>{c.summary}</h3>
      <dl>
        <div><dt>{c.sub}</dt><dd>{money(subtotal)}</dd></div>
        <div><dt>{c.ship}</dt><dd>{shipping === 0 ? c.free : money(shipping)}</dd></div>
        {discount > 0 && <div><dt>{c.disc}</dt><dd>− {money(discount)}</dd></div>}
      </dl>
      <div className="sum__promo">
        <input
          value={code} onChange={(e) => setCode(e.target.value)} placeholder={c.promo} aria-label={c.promo} dir="ltr"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); apply() } }}
        />
        <button className="btn btn--line btn--sm" type="button" onClick={apply}>{c.apply}</button>
      </div>
      {msg && <small className={`sum__msg sum__msg--${msg}`}>{msg === 'ok' ? c.promoOk : c.promoBad}</small>}
      <div className="sum__total"><span>{c.total}</span><b>{money(total)}</b></div>
      {cta && <a className={`btn btn--dark btn--block ${count ? '' : 'is-disabled'}`} href={count ? '#/checkout' : '#/shop'}>{c.checkout}<ArrowUR /></a>}
    </aside>
  )
}

export default function Cart() {
  const { u, L, money, cart, setQty } = useStore()
  const c = u.cart
  const [joined, setJoined] = useState(false)
  const inCart = new Set(cart.map((x) => x.id))
  const like = products.filter((p) => !inCart.has(p.id)).slice(0, 3)

  return (
    <>
      <Section className="cartp">
        <div className="wrap">
          <Stepper step={0} />
          <Ttl a={c.t} em={c.em} as="h1" />
          <div className="cart__in">
            <div className="cart__list">
              {cart.length === 0 && (
                <div className="empty">
                  <p>{c.empty}</p>
                  <a className="btn btn--dark" href="#/shop">{c.go}</a>
                </div>
              )}
              {cart.map((x) => {
                const p = byId(x.id)
                if (!p) return null
                return (
                  <article className="line" key={x.id + x.size}>
                    <a href={`#/product/${p.id}`} className="line__img"><img src={img(p.img)} alt="" /></a>
                    <div className="line__body">
                      <a href={`#/product/${p.id}`}><h3>{L(p.name)}</h3></a>
                      <small>{p.brand} · {x.size}</small>
                      <p>{L(p.desc).slice(0, 90)}…</p>
                      <Qty value={x.qty} onChange={(n) => setQty(x.id, x.size, n)} />
                    </div>
                    <b className="line__price">{money(p.price * x.qty)}</b>
                    <button className="line__x" onClick={() => setQty(x.id, x.size, 0)} aria-label={c.remove}><Close /></button>
                  </article>
                )
              })}
            </div>
            <Summary cta />
          </div>
        </div>
      </Section>

      <Section className="related">
        <div className="wrap">
          <Ttl a={c.like} em={c.likeEm} />
          <div className="pgrid pgrid--3">
            {like.map((p, i) => <ProductCard key={p.id} p={p} variant={(['tall', 'small', 'normal'] as const)[i]} />)}
          </div>
        </div>
      </Section>

      <Section className="news">
        <div className="wrap news__in">
          <div className="news__copy">
            <h2>{c.news}</h2>
            {joined ? <p className="news__ok">{c.thanks}</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setJoined(true) }}>
                <input type="email" required placeholder={c.email} aria-label={c.email} />
                <label className="check"><input type="checkbox" required /><span>{c.agree}</span></label>
                <button className="btn btn--dark" type="submit">{c.join}</button>
              </form>
            )}
          </div>
          <img className="news__img" src={img('salon3')} alt="" loading="lazy" />
        </div>
      </Section>
    </>
  )
}
