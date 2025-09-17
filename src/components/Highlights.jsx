
import React, { useEffect, useState, useRef } from 'react'
import data from '../data/highlights.json'
import LazyImage from './LazyImage'
import VideoPlayer from './VideoPlayer'

export default function Highlights() {
  const items = data
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState({ open: false, item: null })

  // Removed auto-advance and keyboard navigation for main view

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

        <div className="highlights-hero" style={{ gridColumn: '1/-1' }}>
          <div className="hero-media" onClick={() => setLightbox({ open: true, item: items[index] })}>
            {items[index].video ? (
              <VideoPlayer src={items[index].video} poster={items[index].img} autoplay={false} muted={true} />
            ) : (
              <LazyImage src={items[index].img} alt={items[index].title} onError={(e) => { e.target.style.objectFit = 'contain' }} />
            )}
          </div>

          <div className="hero-body">
            <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{items[index].title}</h3>
            <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center', color: 'var(--muted)', fontWeight: 700 }}>
              <span>{items[index].date}</span>
              <span>—</span>
              <span>{items[index].location}</span>
            </div>
            <p style={{ marginTop: 12, color: '#2d2320', lineHeight: 1.6 }}>{items[index].summary}</p>
            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={() => setLightbox({ open: true, item: items[index] })}>شاهد الصورة</button>
              <button className="btn btn-light" style={{ marginLeft: 12 }} onClick={() => setIndex((index + 1) % items.length)}>التالي</button>
            </div>
          </div>
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

