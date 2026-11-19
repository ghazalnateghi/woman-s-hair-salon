import { useState, type FormEvent } from 'react'
import { byId, img } from '../data'
import { ArrowUR } from '../icons'
import { useStore } from '../store'
import { Section, Stepper, Ttl } from '../ui'
import { Summary } from './Cart'

export function Checkout() {
  const { u, L, money, cart, num, clearCart } = useStore()
  const c = u.co
  const [same, setSame] = useState(true)
  const [method, setMethod] = useState('courier')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const code = String(Math.floor(100000 + Math.random() * 900000))
    try { sessionStorage.setItem('velora-order', code) } catch { /* ignore */ }
    clearCart()
    location.hash = '#/done'
  }

  if (cart.length === 0) {
    return (
      <Section className="cartp">
        <div className="wrap empty">
          <p>{u.cart.empty}</p>
          <a className="btn btn--dark" href="#/shop">{u.cart.go}</a>
        </div>
      </Section>
    )
  }

  return (
    <Section className="cartp">
      <div className="wrap">
        <Stepper step={1} />
        <Ttl a={c.t} em={c.em} as="h1" />
        <form className="co" onSubmit={submit}>
          <div className="co__form">
            <fieldset>
              <legend>{c.buyer}</legend>
              <div className="grid2">
                <label className="inp"><span>{c.name}</span><input required autoComplete="name" /></label>
                <label className="inp"><span>{c.phone}</span><input required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9۰-۹+ ]{10,14}" dir="ltr" /></label>
                <label className="inp inp--full"><span>{c.email}</span><input type="email" autoComplete="email" dir="ltr" /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>{c.receiver}</legend>
              <label className="check"><input type="checkbox" checked={same} onChange={(e) => setSame(e.target.checked)} /><span>{c.same}</span></label>
              {!same && (
                <div className="grid2">
                  <label className="inp"><span>{c.rname}</span><input required /></label>
                  <label className="inp"><span>{c.rphone}</span><input required type="tel" inputMode="tel" dir="ltr" /></label>
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend>{c.callQ}</legend>
              <div className="radios">
                <label className="check"><input type="radio" name="call" defaultChecked /><span>{c.callYes}</span></label>
                <label className="check"><input type="radio" name="call" /><span>{c.callNo}</span></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>{c.delivery}</legend>
              <div className="radios radios--cards">
                {c.method.map(([k, l]) => (
                  <label key={k} className={`rcard ${method === k ? 'on' : ''}`}>
                    <input type="radio" name="method" checked={method === k} onChange={() => setMethod(k)} /><span>{l}</span>
                  </label>
                ))}
              </div>
              {method !== 'pickup' && (
                <div className="grid2">
                  <label className="inp"><span>{c.city}</span><input required defaultValue={method === 'courier' ? L({ fa: 'تهران', en: 'Tehran' }) : ''} /></label>
                  <label className="inp"><span>{c.postal}</span><input inputMode="numeric" dir="ltr" /></label>
                  <label className="inp inp--full"><span>{c.address}</span><input required autoComplete="street-address" /></label>
                  <label className="inp"><span>{c.date}</span><input type="date" /></label>
                </div>
              )}
              <label className="inp inp--full"><span>{c.note}</span><textarea rows={3} /></label>
              <label className="check"><input type="checkbox" /><span>{c.gift}</span></label>
              <label className="check"><input type="checkbox" required /><span>{c.agree}</span></label>
            </fieldset>

            <div className="co__actions">
              <button className="btn btn--dark" type="submit">{c.pay}<ArrowUR /></button>
              <a className="btn btn--line" href="#/cart">{c.back}</a>
            </div>
          </div>

          <div className="co__side">
            <div className="co__items">
              {cart.map((x) => {
                const p = byId(x.id)
                if (!p) return null
                return (
                  <div className="mini" key={x.id + x.size}>
                    <img src={img(p.img)} alt="" />
                    <div><b>{L(p.name)}</b><small>{x.size} × {num(x.qty)}</small></div>
                    <span>{money(p.price * x.qty)}</span>
                  </div>
                )
              })}
            </div>
            <Summary />
          </div>
        </form>
      </div>
    </Section>
  )
}

export function Done() {
  const { u } = useStore()
  const c = u.co
  let code = ''
  try { code = sessionStorage.getItem('velora-order') ?? '' } catch { /* ignore */ }
  return (
    <Section className="cartp done">
      <div className="wrap done__in">
        <Stepper step={2} />
        <Ttl a={c.doneT} em={c.doneEm} as="h1" center />
        <p>{c.doneText}</p>
        {code && <p className="done__code">{c.code}: <b dir="ltr">VL-{code}</b></p>}
        <a className="btn btn--dark" href="#/">{c.home}</a>
      </div>
    </Section>
  )
}
