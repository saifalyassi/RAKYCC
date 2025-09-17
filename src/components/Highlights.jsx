
import React, { useEffect, useState, useRef } from 'react'
import data from '../data/highlights.json'
import LazyImage from './LazyImage'

export default function Highlights() {
  const items = data
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState({ open: false, item: null })

  // No auto-advance or keyboard navigation for main view

    function openAdjacent(dir) {
      const idx = items.findIndex(x => x.id === (lightbox.item?.id))
      const next = (idx + dir + items.length) % items.length
      setLightbox({ open: true, item: items[next] })
    }

    function goLeft() {
      setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    }
    function goRight() {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }

  return (
    <div className="cards-bg">
      <section className="cards-grid" style={{ maxWidth: 1100 }}>
        <header style={{ gridColumn: '1/-1', padding: '0 16px', textAlign: 'right', direction: 'rtl' }}>
          <h2 className="home-title">أبرز اللقاءات</h2>
          <p className="home-sub">مجموعتنا المصورة — تصفح سريع، صور عالية الجودة، وعرض تفصيلي عند النقر.</p>
        </header>

  <div className="highlights-hero" style={{ gridColumn: '1/-1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, minWidth: 900 }}>
          <button
            className="arrow left"
            onClick={goLeft}
            style={{
              position: 'absolute',
              left: '-90px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: '48px',
              height: '48px',
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
            }}
            aria-label="السابق"
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="25,7 13,19 25,31" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="hero-slider" style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center', transition:'transform 0.5s cubic-bezier(.77,0,.18,1)', minWidth:0}}>
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.5s cubic-bezier(.77,0,.18,1)',
              transform: `translateX(0)`
            }}>
              <div className="hero-media" style={{width: 380, height: 320, minWidth: 380, minHeight: 320, maxWidth: 380, maxHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'visible'}} onClick={() => setLightbox({ open: true, item: items[index] })}>
                <div className="hero-placeholder" aria-hidden />
                <div className="media-counter" aria-hidden style={{position: 'absolute'}}>{index + 1}/{items.length}</div>
              </div>
              <div className="hero-body" style={{minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'rtl', textAlign: 'right', alignItems: 'flex-start'}}>
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{items[index].title}</h3>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center', color: 'var(--muted)', fontWeight: 700, direction: 'rtl', justifyContent: 'flex-start' }}>
                  <span>{items[index].location}</span>
                  <span>—</span>
                  <span>{items[index].date}</span>
                </div>
                <p style={{ marginTop: 12, color: '#2d2320', lineHeight: 1.6 }}>{items[index].summary}</p>
                <div style={{ marginTop: 14 }}>
                  <button className="btn" onClick={() => setLightbox({ open: true, item: items[index] })}>إقـرأ الـمـزيـد</button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="arrow right"
            onClick={goRight}
            style={{
              position: 'absolute',
              right: '-90px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: '48px',
              height: '48px',
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
            }}
            aria-label="التالي"
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="13,7 25,19 13,31" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Removed highlights grid for manual navigation only */}
      </section>

      {lightbox.open && (
        <Lightbox
          item={lightbox.item}
          items={items}
          onClose={() => setLightbox({ open: false, item: null })}
          openAdjacent={openAdjacent}
        />
      )}
    </div>
  )
}

function Lightbox({ item, items, onClose, openAdjacent }) {
  const backdropRef = useRef(null)
  const closeButtonRef = useRef(null)
  const idx = items.findIndex(x => x.id === item.id)

  useEffect(() => {
    const previous = document.activeElement
    // focus the close button for keyboard users
    closeButtonRef.current?.focus()
    return () => previous?.focus()
  }, [])

  return (
    <div className="lightbox-backdrop" ref={backdropRef} onClick={onClose} role="presentation">
      <div className="lightbox" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={item.title}>
        <div className="lb-top">
          <div className="lb-top-right">
            <button ref={closeButtonRef} className="lb-close-x" onClick={onClose} aria-label="Close">✕</button>
            <div className="lb-counter">{idx + 1} / {items.length}</div>
          </div>
        </div>
        <div className="lb-body">
          <div className="lb-media">
            <div className="lb-placeholder" />
          </div>
          <div className="lb-content">
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <small style={{ color: 'var(--muted)' }}>{item.location} — {item.date}</small>
            <p style={{ marginTop: 12, lineHeight: 1.6 }}>{item.summary}</p>
            <div style={{ marginTop: 6, color: 'var(--muted)' }}>{item.caption}</div>
            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={() => openAdjacent(-1)} style={{ marginRight: 8 }}>السابق</button>
              <button className="btn" onClick={() => openAdjacent(1)}>التالي</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

