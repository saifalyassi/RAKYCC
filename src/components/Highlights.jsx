
import React, { useEffect, useState, useRef } from 'react'
import data from '../data/highlights.json'
import LazyImage from './LazyImage'
import VideoPlayer from './VideoPlayer'

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
        <header style={{ gridColumn: '1/-1', padding: '0 16px' }}>
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
              <div className="hero-media" style={{width: 380, height: 320, minWidth: 380, minHeight: 320, maxWidth: 380, maxHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden'}} onClick={() => setLightbox({ open: true, item: items[index] })}>
                {items[index].video ? (
                  <VideoPlayer src={items[index].video} poster={items[index].img} autoplay={false} muted={true} />
                ) : (
                  <img src={items[index].img} alt={items[index].title} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} onError={e => { e.target.style.objectFit = 'contain'; }} />
                )}
              </div>
              <div className="hero-body" style={{minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{items[index].title}</h3>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center', color: 'var(--muted)', fontWeight: 700 }}>
                  <span>{items[index].date}</span>
                  <span>—</span>
                  <span>{items[index].location}</span>
                </div>
                <p style={{ marginTop: 12, color: '#2d2320', lineHeight: 1.6 }}>{items[index].summary}</p>
                <div style={{ marginTop: 14 }}>
                  <button className="btn" onClick={() => setLightbox({ open: true, item: items[index] })}>شاهد الصورة</button>
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
          <div className="lb-toolbar">
            <div className="lb-counter">{idx + 1} / {items.length}</div>
          </div>
          <div>
            <a className="lb-action" href={item.video || item.img} download target="_blank" rel="noreferrer">تحميل</a>
            <button ref={closeButtonRef} className="lb-action" style={{ marginLeft: 8 }} onClick={onClose} aria-label="Close">إغلاق</button>
          </div>
        </div>
        <div className="lb-body">
          <div className="lb-media">
            {item.video ? (
              <VideoPlayer src={item.video} poster={item.img} controls autoplay={false} muted={false} />
            ) : (
              <LazyImage src={item.img} alt={item.title} />
            )}
          </div>
          <div className="lb-content">
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <small style={{ color: 'var(--muted)' }}>{item.date} — {item.location}</small>
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

