import React from 'react'

export default function LeftNav({ open, onClose }) {
  return (
    <aside className={`left-nav ${open ? 'open' : 'closed'}`} aria-hidden={!open}>
      <div className="left-nav-inner">
        <div className="left-nav-top">
          <button className="left-nav-close" onClick={onClose} aria-label="Close sidebar">×</button>
        </div>

      

        <nav className="nav-links" role="navigation" aria-label="Main Navigation">
          <ul>
            <li><a href="#home" onClick={onClose}>Home</a></li>
            <li><a href="#members" onClick={onClose}>Members</a></li>
            <li><a href="#achievements" onClick={onClose}>Achievements</a></li>
            <li><a href="#contact" onClick={onClose}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
