import React from 'react'
import MemberCard from './components/MemberCard'
import members from './data/members'
import { useState } from 'react'
import PhotoAdjuster from './components/PhotoAdjuster'
import LeftNav from './components/LeftNav'
import Achievements from './components/Achievements'
import Home from './components/Home'

export default function App() {
  const [adjustments, setAdjustments] = useState({})

  const showAdjuster = typeof window !== 'undefined' && window.location.search.includes('adjust=1')
  const [navOpen, setNavOpen] = useState(false)
  // default to 'home' when there is no hash so the site opens on the Home page
  const [page, setPage] = useState(() => (typeof window !== 'undefined' ? (window.location.hash.replace('#','') || 'home') : 'home'))

  React.useEffect(() => {
    const onHash = () => setPage(window.location.hash.replace('#','') || 'members')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // ensure page picks up the hash
  const currentPage = (window.location.hash || '#home').replace('#','') || 'home'
  // normalize common aliases/typos to canonical page names
  const normalizedPage = currentPage === 'acheivments' ? 'achievements' : currentPage

  // ensure document body receives the home-mode class so CSS can target the full viewport
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      if (normalizedPage === 'home') {
        document.body.classList.add('home-mode')
      } else {
        document.body.classList.remove('home-mode')
      }
    }
    return () => {
      if (typeof document !== 'undefined') document.body.classList.remove('home-mode')
    }
  }, [normalizedPage])

  return (
    <div className="app-root">
      <button className="hamburger" aria-label="Toggle menu" onClick={()=>setNavOpen(v=>!v)}>☰</button>
      <LeftNav open={navOpen} onClose={()=>setNavOpen(false)} items={[
        { label: 'Home', href: '#home' , onClick: ()=> setNavOpen(false)},
        { label: 'Achievements', href: '#achievements', onClick: ()=> setNavOpen(false) },
        { label: 'Members', href: '#members', onClick: ()=> setNavOpen(false) },
        { label: 'Contact', href: '#contact', onClick: ()=> setNavOpen(false) }
      ]} />
  {navOpen && <div className="sidebar-backdrop" onClick={()=>setNavOpen(false)} />}
      <div className="content-with-sidebar">
      <div>
        <header className="navbar" role="banner">
          <div className="left-side">
            <a href="#contact" className="btn-contact">تواصل معنا</a>
          </div>

          <nav className="center-nav" role="navigation" aria-label="Main">
            <ul>
              <li><a href="#home">الرئيسية</a></li>
              <li><a href="#members">الأعضاء</a></li>
              <li><a href="#strategic-plan">الخطة</a></li>
              <li><a href="#achievements">الإنجازات</a></li>
            </ul>
          </nav>

          <div className="right-side">
            <div className="logo">
              <img src="assets/Fedral Youth .png" alt="Federal Youth Authority" height="40" />
              <span>RAKYC | مجلس رأس الخيمة للشباب</span>
            </div>
          </div>
        </header>
      </div>
      <main>
        {normalizedPage === 'home' ? (
          <Home />
        ) : normalizedPage === 'achievements' ? (
          <Achievements />
        ) : (
          <div className="cards-bg">
            <section className="cards-grid">
              {members.map((m, idx) => (
                <MemberCard key={m.id} {...m} photoPosition={adjustments[m.id] ?? m.photoPosition} className={idx === 0 ? 'highlight-card' : ''} />
              ))}
            </section>
          </div>
        )}
        {/* PhotoAdjuster: toggle via ?adjust=1 in URL */}
        {showAdjuster && (
          <PhotoAdjuster members={members} adjustments={adjustments} setAdjustments={setAdjustments} />
        )}
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} RAKYC Council</footer>
      </div>
    </div>
  )
}
