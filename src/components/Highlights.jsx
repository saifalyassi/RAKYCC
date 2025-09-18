import React, { useEffect, useState, useRef } from 'react'
import data from '../data/highlights.json'
import LazyImage from './LazyImage'

export default function Highlights() {
  const items = data
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState({ open: false, item: null })

  const heroVideoRef = useRef(null)
  // Use native browser controls for video; no custom control state required
  const [heroCurrentTime, setHeroCurrentTime] = useState(0)
  const [heroDuration, setHeroDuration] = useState(0)

  // No auto-advance or keyboard navigation for main view

  // Toggle a root-level class when the lightbox opens so CSS can scope overlay fixes.
  useEffect(() => {
    try {
      if (lightbox.open) document.documentElement.classList.add('lightbox-open')
      else document.documentElement.classList.remove('lightbox-open')
    } catch (e) {}
    return () => { try { document.documentElement.classList.remove('lightbox-open') } catch (e) {} }
  }, [lightbox.open])

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
        <header className="highlights-header" style={{ gridColumn: '1/-1', padding: '0 16px', direction: 'rtl' }}>
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
              <div className="hero-media" style={{width: 520, height: 360, minWidth: 520, minHeight: 360, maxWidth: 520, maxHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'visible'}}>
                {/* show video in hero if available, otherwise the representative image */}
                {items[index].video ? (
                  <div style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
                    <video
                      ref={heroVideoRef}
                      src={items[index].video}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      playsInline
                      controls
                      onTimeUpdate={() => { const v = heroVideoRef.current; if (!v) return; setHeroCurrentTime(v.currentTime) }}
                      onLoadedMetadata={() => { const v = heroVideoRef.current; if (!v) return; setHeroDuration(v.duration) }}
                    />
                  </div>
                ) : ((items[index].gallery && items[index].gallery.length) || items[index].img) ? (
                  <img
                    src={items[index].img || (items[index].gallery && items[index].gallery[0])}
                    alt={items[index].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20, display: 'block' }}
                    onClick={() => setLightbox({ open: true, item: items[index] })}
                  />
                ) : (
                  <div className="hero-placeholder" aria-hidden />
                )}
                {/* media counter removed per user request */}
              </div>
              <div className="hero-body" style={{minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'rtl', textAlign: 'right', alignItems: 'flex-start'}}>
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{items[index].title}</h3>
                <div className="highlight-meta" style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center', direction: 'rtl', justifyContent: 'flex-start' }}>
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
  const [galleryIndex, setGalleryIndex] = useState(0)
  useEffect(() => {
    const previous = document.activeElement
    closeButtonRef.current?.focus()
    return () => previous?.focus()
  }, [])
  // Gallery logic
  const gallery = item.gallery && item.gallery.length ? item.gallery : item.img ? [item.img] : [];
  const hasVideo = !!item.video;
  const totalMedia = gallery.length + (hasVideo ? 1 : 0);
  const showVideo = hasVideo && galleryIndex === 0;
  const showImage = gallery.length && (hasVideo ? galleryIndex > 0 : true);
  const imageSrc = showImage ? gallery[hasVideo ? galleryIndex - 1 : galleryIndex] : null;

  return (
    <div className="lightbox-backdrop" ref={backdropRef} onClick={onClose} role="presentation">
      <div className="lightbox" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={item.title}>
        <div className="lb-top" style={{ position: 'relative', width: '100%' }}>
          <div className="lb-toolbar">
            <div className="lb-counter">{idx + 1} / {items.length}</div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="إغلاق"
            style={{
              position: 'absolute',
              top: 2,
              right: 16,
              background: 'none',
              border: 'none',
              color: '#0a2342',
              fontSize: '2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              zIndex: 10,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
        <div className="lb-body">
          <div className="lb-media" style={{ position: 'relative' }}>
            {showVideo ? (
              <video src={item.video} poster={item.img} controls style={{ width: '100%', maxHeight: 400, objectFit: 'contain', background: '#000' }} />
            ) : null}
            {showImage && imageSrc ? (
              <LazyImage src={imageSrc} alt={item.title} />
            ) : null}
          </div>
          {totalMedia > 1 && (
            <div className="lb-gallery-controls" style={{ marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
              <button className="lb-action" onClick={e => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + totalMedia) % totalMedia); }} aria-label="السابق">❮</button>
              <div className="lb-gallery-counter">{galleryIndex + 1} / {totalMedia}</div>
              <button className="lb-action" onClick={e => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % totalMedia); }} aria-label="التالي">❯</button>
            </div>
          )}
          <div className="lb-content">
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <small style={{ color: 'var(--muted)' }}>{item.date} — {item.location}</small>
            <div style={{ marginTop: 12, lineHeight: 1.6, maxHeight: 260, overflowY: 'auto', padding: '0 8px', textAlign: 'right' }}>
              {item.lightboxDescription || item.longDescription || item.summary}
            </div>
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
