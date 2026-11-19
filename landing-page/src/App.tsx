import { useEffect } from 'react'
import './App.css'
import { Checkout, Done } from './pages/Checkout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Product from './pages/Product'
import Shop from './pages/Shop'
import { StoreProvider, useStore } from './store'
import { Footer, Nav, Toast } from './ui'

function Pages() {
  const { route, lang } = useStore()

  // fade sections in as they scroll into view (re-run per page/language)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.1 },
    )
    const t = setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el)), 30)
    return () => { clearTimeout(t); io.disconnect() }
  }, [route.page, route.id, lang])

  return (
    <div className={`page lang-${lang} page--${route.page}`}>
      <Nav />
      <main>
        {route.page === 'home' && <Home />}
        {route.page === 'shop' && <Shop />}
        {route.page === 'product' && <Product key={route.id} id={route.id!} />}
        {route.page === 'cart' && <Cart />}
        {route.page === 'checkout' && <Checkout />}
        {route.page === 'done' && <Done />}
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Pages />
    </StoreProvider>
  )
}
