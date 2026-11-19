import { useState } from 'react'
import { faqs, img, posts, reviews, services } from '../data'
import { Dots } from '../decor'
import { Flower, Garden } from '../garden'
import { ArrowUR, ChevL, ChevR, Plus } from '../icons'
import { useStore } from '../store'
import { Section, Stars, Ttl } from '../ui'

export default function Home() {
  const { u, L, money, lang } = useStore()
  const [slide, setSlide] = useState(0)
  const [open, setOpen] = useState(0)
  const [rev, setRev] = useState(0)
  // arrows point the way the content moves, so they swap in RTL
  const Prev = lang === 'fa' ? ChevR : ChevL
  const Next = lang === 'fa' ? ChevL : ChevR
  const post = posts[slide]
  const shownReviews = [0, 1, 2].map((k) => reviews[(rev + k) % reviews.length])

  return (
    <Garden>
      {/* ── 1. hero: "we make — [image] — with love" ── */}
      <Section className="hero" id="home">
        <Flower kind="pearl" className="fl--hero" />
        <Dots count={14} seed={11} edges={false} avoid={[[3, 14, 97, 86]]} className="dots--float" />
        <div className="wrap hero__in">
          <h1 className="hero__side hero__side--a reveal">
            <b>{u.hero.a}</b>
            <em>{u.hero.aEm}</em>
          </h1>
          <figure className="hero__frame reveal">
            <img src={img('hero')} alt="" />
          </figure>
          <div className="hero__side hero__side--b reveal">
            <p className="hero__word"><b>{u.hero.b}</b> <em>{u.hero.bEm}</em></p>
            <p className="hero__text">{u.hero.text}</p>
            <div className="hero__ctas">
              <a className="btn btn--dark" href="#footer">{u.hero.cta}<ArrowUR /></a>
              <a className="btn btn--line" href="#/shop">{u.hero.shop}</a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 2. service catalogue strip (cards of varying heights, bleeding off-screen) ── */}
      <Section className="cat" id="services">
        <Flower kind="bloom" className="fl--cat" />
        <div className="wrap sec__head reveal">
          <Ttl a={u.catalog.t} em={u.catalog.em} />
          <a className="link" href="#footer">{u.catalog.all}<ArrowUR /></a>
        </div>
        <div className="strip reveal" tabIndex={0}>
          {services.map((s, i) => (
            <a key={s.id} href="#footer" className={`strip__card strip__card--${['m', 's', 'l', 's', 'm', 'l', 's'][i]}`}>
              <div className="strip__img"><img src={img(s.img)} alt="" loading="lazy" /></div>
              <span>{L(s.title)}</span>
              <small>{u.from} {money(s.from)}</small>
            </a>
          ))}
        </div>
      </Section>

      {/* ── 3. about ── */}
      <Section className="about" id="about">
        <Flower kind="pearl" className="fl--about" />
        <div className="wrap about__in">
          <div className="about__head reveal"><Ttl a={u.about.t} em={u.about.em} /></div>
          <div className="about__pics reveal">
            <img className="about__p1" src={img('salon1')} alt="" loading="lazy" />
            <img className="about__p2" src={img('portrait')} alt="" loading="lazy" />
          </div>
          <div className="about__copy reveal">
            <h3>{u.about.lead}</h3>
            <p>{u.about.text}</p>
            <div className="about__stats">
              {u.about.stats.map(([v, k]) => <div key={k}><b>{v}</b><small>{k}</small></div>)}
            </div>
            <a className="link" href="#/?s=blog">[ {u.about.more} ]</a>
          </div>
        </div>
      </Section>

      {/* ── 4. blog slider ── */}
      <Section className="blog" id="blog">
        <Flower kind="bloom" className="fl--blog" />
        <div className="wrap">
          <div className="reveal"><Ttl a={u.blog.t} em={u.blog.em} center /></div>
          <div className="slider reveal">
            <button className="slider__arrow" onClick={() => setSlide((slide - 1 + posts.length) % posts.length)} aria-label="prev"><Prev /></button>
            <article className="slide" key={slide}>
              <img src={img(post.img)} alt="" />
              <div className="slide__body">
                <small>{L(post.date)}</small>
                <h3>{L(post.title)}</h3>
                <p>{L(post.text)}</p>
                <a className="link link--light" href="#/?s=blog">{u.blog.read}<ArrowUR /></a>
              </div>
            </article>
            <button className="slider__arrow" onClick={() => setSlide((slide + 1) % posts.length)} aria-label="next"><Next /></button>
          </div>
          <div className="dots-nav">
            {posts.map((_, i) => <button key={i} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} aria-label={`${i + 1}`} />)}
          </div>
        </div>
      </Section>

      {/* ── 5. faq ── */}
      <Section className="faq" id="faq">
        <Flower kind="pearl" className="fl--faq" />
        <div className="wrap faq__in">
          <div className="faq__intro reveal">
            <Ttl a={u.faq.t} em={u.faq.em} />
            <p>{u.faq.text}</p>
          </div>
          <div className="acc reveal">
            {faqs.map((f, i) => (
              <div key={i} className={`acc__item ${open === i ? 'open' : ''}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <i><Plus /></i>{L(f.q)}
                </button>
                <div className="acc__body"><p>{L(f.a)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. reviews ── */}
      <Section className="reviews" id="reviews">
        <Flower kind="bloom" className="fl--rev" />
        <div className="wrap">
          <div className="reveal"><Ttl a={u.rev.t} em={u.rev.em} /></div>
          <div className="rev__row reveal">
            <div className="rev__score">
              <small>{u.rev.score}</small>
              <b>{lang === 'fa' ? '۴٫۹' : '4.9'}</b>
              <Stars n={5} size={16} />
              <small>{u.rev.count}</small>
            </div>
            {shownReviews.map((r) => (
              <article className="rev" key={L(r.name)}>
                <header><b>{L(r.name)}</b><Stars n={5} /></header>
                <p>{L(r.text)}</p>
                <small>{L(r.service)}</small>
              </article>
            ))}
          </div>
          <div className="rev__nav">
            <button onClick={() => setRev((rev - 1 + reviews.length) % reviews.length)} aria-label="prev"><Prev /></button>
            <button onClick={() => setRev((rev + 1) % reviews.length)} aria-label="next"><Next /></button>
          </div>
        </div>
      </Section>
    </Garden>
  )
}
