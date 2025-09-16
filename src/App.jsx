import React from 'react'
import MemberCard from './components/MemberCard'
import members from './data/members'
import { useState } from 'react'
import PhotoAdjuster from './components/PhotoAdjuster'
import ContactAdjuster from './components/ContactAdjuster'
import LeftNav from './components/LeftNav'
import Achievements from './components/Achievements'
import Home from './components/Home'
import Plan from './components/Plan'
import Events from './components/Events'

export default function App() {
  const [adjustments, setAdjustments] = useState({})

  const showAdjuster = typeof window !== 'undefined' && window.location.search.includes('adjust=1')
  const [showContactTool, setShowContactTool] = useState(() => (typeof window !== 'undefined' && window.location.search.includes('contactAdjust=1')))
  const [showContactBox, setShowContactBox] = useState(false)
  const [contactAdjust, setContactAdjust] = useState({ x: 0, y: 0, scale: 100, fs: 14 })
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
        { label: 'Events', href: '#events', onClick: ()=> setNavOpen(false) },
        { label: 'Contact', href: '#contact', onClick: ()=> setNavOpen(false) }
      ]} />
  {navOpen && <div className="sidebar-backdrop" onClick={()=>setNavOpen(false)} />}
      <div className="content-with-sidebar">
      <div>
        <header className="navbar" role="banner">
          <div className="left-side">
            <div className="logo">
              <img src="assets/Fedral Youth .png" alt="Federal Youth Authority" height="40" />
              <span>RAKYC | مجلس رأس الخيمة للشباب</span>
            </div>
          </div>

          <nav className="center-nav" role="navigation" aria-label="Main">
            <ul>
              <li><a href="#home">الرئيسية</a></li>
              <li><a href="#members">الأعضاء</a></li>
              <li><a href="#strategic-plan">الخطة</a></li>
              <li><a href="#achievements">الإنجازات</a></li>
              <li><a href="#events">الفعاليات</a></li>
            </ul>
          </nav>

          <div className="right-side">
          </div>
        </header>
      </div>
      <main>
        {normalizedPage === 'home' ? (
          <Home />
        ) : normalizedPage === 'achievements' ? (
          <Achievements />
        ) : normalizedPage === 'strategic-plan' ? (
          <Plan />
        ) : normalizedPage === 'events' ? (
          <Events />
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

        {showContactTool && (
          <ContactAdjuster values={contactAdjust} onChange={setContactAdjust} />
        )}

        {/* New bottom contact button + popover */}
        <div className="contact-bottom">
          <button className="contact-bottom-toggle" onClick={()=>setShowContactBox(v=>!v)} aria-expanded={showContactBox} aria-controls="contact-popover">تواصل معنا</button>
          <div id="contact-popover" className={`contact-popover ${showContactBox ? 'open' : ''}`} role="dialog" aria-hidden={!showContactBox}>
            <a className="contact-link whatsapp" href="https://chat.whatsapp.com/DzposFD8nmUJpkRbFrlzj6?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">🔗 واتساب</a>
            <a className="contact-link instagram" href="https://www.instagram.com/emiratesyouth" target="_blank" rel="noopener noreferrer" aria-label="Instagram">🔗 انستغرام</a>
          </div>
        </div>
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} RAKYC Council</footer>
      </div>
    </div>
  )
}
