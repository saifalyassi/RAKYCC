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
import ContactForm from './components/ContactForm'
import Highlights from './components/Highlights'

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
              <li><a href="#highlights">أبرز اللقاءات</a></li>
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
        ) : normalizedPage === 'highlights' ? (
          <Highlights />
        ) : normalizedPage === 'contact' ? (
          <ContactForm />
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
            <a className="contact-link whatsapp" href="https://chat.whatsapp.com/DzposFD8nmUJpkRbFrlzj6?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.373 0 .13 4.582.13 10.238c0 1.805.48 3.477 1.38 4.995L0 24l8.001-2.093a11.962 11.962 0 004.001.68c6.627 0 11.87-4.582 11.87-10.238 0-2.904-1.318-5.577-3.352-7.869z" fill="#25D366"/>
              </svg>
              واتساب
            </a>
            <a className="contact-link instagram" href="https://www.instagram.com/emiratesyouth" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#f58529"/>
                  <stop offset="0.5" stopColor="#dd2a7b"/>
                  <stop offset="1" stopColor="#8134af"/>
                </linearGradient>
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" fill="url(#g1)"/>
                <circle cx="12" cy="12" r="3" fill="#fff"/>
              </svg>
              انستغرام
            </a>
            <a className="contact-link message" href="#contact" onClick={()=>setShowContactBox(false)}>اترك رسالة</a>
          </div>
        </div>
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} RAKYC Council</footer>
      </div>
    </div>
  )
}
