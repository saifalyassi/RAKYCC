import React from 'react'

// Small inline SVG icon set used by Plan.jsx
export default function Icon({ name, className = '', size = 28, ariaLabel }){
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': ariaLabel ? 'false' : 'true', role: ariaLabel ? 'img' : 'presentation' }
  const common = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

  const icons = {
    eye: (
      // more realistic eye with iris and subtle shading
      <svg {...props} className={className} viewBox="0 0 24 24" fill="none" aria-hidden={ariaLabel ? 'false' : 'true'} role={ariaLabel ? 'img' : 'presentation'}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.03" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    ),
    target: (
      // target/goal with concentric rings and pointer
      <svg {...props} className={className} viewBox="0 0 24 24" fill="none" aria-hidden={ariaLabel ? 'false' : 'true'} role={ariaLabel ? 'img' : 'presentation'}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.04" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.18" />
        <path d="M12 3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M21 12h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    education: (
      // mortarboard + book icon for education
      <svg {...props} className={className} viewBox="0 0 24 24" fill="none" aria-hidden={ariaLabel ? 'false' : 'true'} role={ariaLabel ? 'img' : 'presentation'}>
        <path d="M12 3l9 5-9 5-9-5 9-5z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M4 14v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    innovation: (
      // richer network + lightbulb icon (inspired by the attached image)
      <svg {...props} className={className} viewBox="0 0 24 24" aria-hidden={ariaLabel ? 'false' : 'true'} role={ariaLabel ? 'img' : 'presentation'}>
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* outer nodes and connecting lines */}
          <circle cx="4" cy="7" r="1.6" fill="currentColor" fillOpacity="0.12" />
          <circle cx="20" cy="7" r="1.6" fill="currentColor" fillOpacity="0.12" />
          <circle cx="4" cy="17" r="1.6" fill="currentColor" fillOpacity="0.12" />
          <circle cx="20" cy="17" r="1.6" fill="currentColor" fillOpacity="0.12" />
          <line x1="5.4" y1="8.2" x2="9" y2="11" />
          <line x1="19" y1="8.2" x2="15" y2="11" />
          <line x1="5.4" y1="15.8" x2="9" y2="13" />
          <line x1="19" y1="15.8" x2="15" y2="13" />
          {/* central bulb */}
          <path d="M12 9a3 3 0 00-1 5.8V16a1 1 0 001 1h0a1 1 0 001-1v-1.2A3 3 0 0012 9z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" />
          <path d="M11 17h2v1.2a1 1 0 01-1 1 1 1 0 01-1-1V17z" fill="currentColor" fillOpacity="0.12" />
        </g>
      </svg>
    ),
    sustainability: (
      <svg {...props} className={className} aria-label={ariaLabel || 'sustainability'} role={ariaLabel ? 'img' : 'presentation'}>
        {/* background circle (soft) */}
        <circle cx="32" cy="28" r="18" fill="currentColor" fillOpacity="0.18" />
        {/* land shapes */}
        <path d="M24 22c4-4 10-4 14-2 2 1 4 3 4 5 0 1-2 2-3 2-3 0-8-1-12 1-3 1-5 3-7 2-1-1-1-6 4-8z" fill="currentColor" fillOpacity="0.32" />
        {/* leaf at bottom */}
        <path d="M44 38c-2 2-5 4-8 5-1 0-2 0-3-1 0 2-1 4-1 6 0 1 1 2 2 2 3 0 6-2 9-5 3-3 4-6 1-7z" fill="currentColor" fillOpacity="0.52" />
        {/* ring outline */}
        <circle cx="32" cy="28" r="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.9" />
        {/* subtle inner stroke */}
        <circle cx="32" cy="28" r="18" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="2" />
      </svg>
    ),
    community: (
      // community / people cluster with friendly rounded shapes
      <svg {...props} className={className} viewBox="0 0 24 24" fill="none" aria-hidden={ariaLabel ? 'false' : 'true'} role={ariaLabel ? 'img' : 'presentation'}>
        <g fill="currentColor" fillOpacity="0.14">
          <circle cx="7" cy="9" r="2" />
          <circle cx="17" cy="9" r="2" />
        </g>
        <path d="M2 20c2-6 8-8 10-8s8 2 10 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="2.2" fill="currentColor" fillOpacity="0.16" />
      </svg>
    )
  }

  return icons[name] || null
}
