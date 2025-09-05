import React from 'react'
import MemberCard from './components/MemberCard'
import members from './data/members'
import { useState } from 'react'
import PhotoAdjuster from './components/PhotoAdjuster'

export default function App() {
  const [adjustments, setAdjustments] = useState({})

  const showAdjuster = typeof window !== 'undefined' && window.location.search.includes('adjust=1')

  return (
    <div className="app-root">
      <div className="top-bg">
        <header className="site-header">
          <div className="header-flex">
            <div className="header-text">
              <h1>RAKYC</h1>
              <p className="lead">Meet the 10 members - click a card for more info</p>
            </div>
            <img src="assets/Fedral Youth .png" alt="Federal Youth Logo" className="council-logo" />
          </div>
        </header>
      </div>
      <main>
        <div className="cards-bg">
          <section className="cards-grid">
            {members.map((m, idx) => (
              <MemberCard key={m.id} {...m} photoPosition={adjustments[m.id] ?? m.photoPosition} className={idx === 0 ? 'highlight-card' : ''} />
            ))}
          </section>
        </div>
        {/* PhotoAdjuster: toggle via ?adjust=1 in URL */}
        {showAdjuster && (
          <PhotoAdjuster members={members} adjustments={adjustments} setAdjustments={setAdjustments} />
        )}
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} RAKYC Council</footer>
    </div>
  )
}
