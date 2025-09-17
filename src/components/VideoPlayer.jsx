import React, { useEffect, useRef, useState } from 'react'

export default function VideoPlayer({ src, poster, controls = true, autoplay = false, muted = true, className = '', hoverPreview = false }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const [canPlay, setCanPlay] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setCanPlay(true)
          obs.disconnect()
        }
      })
    }, { rootMargin: '300px' })

    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [src])

  useEffect(() => {
    if (!hoverPreview || !videoRef.current) return
    const v = videoRef.current
    function onEnter() {
      v.muted = true
      v.loop = true
      v.play().catch(() => {})
    }
    function onLeave() {
      v.pause()
      v.currentTime = 0
    }
    const el = ref.current
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [hoverPreview, canPlay])

  return (
    <div ref={ref} className={className} style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {canPlay ? (
        (!videoError ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls={controls}
            playsInline
            muted={muted}
            autoPlay={autoplay}
            onError={() => setVideoError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          (poster && <img src={poster} alt="video poster" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />)
        ))
      ) : (
        (poster && <img src={poster} alt="video poster" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />)
      )}
    </div>
  )
}
