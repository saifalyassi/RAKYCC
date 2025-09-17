import React, { useEffect, useRef, useState } from 'react'

const TRANSPARENT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export default function LazyImage({ src, alt = '', className = '', style = {}, fallback = '/assets/RAKYC.png', ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [broken, setBroken] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    // Native lazy-loading is widely supported; use it if available
    if ('loading' in HTMLImageElement.prototype) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      })
    }, { rootMargin: '200px' })

    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [src])

  return (
    <img
      ref={ref}
      src={visible ? (broken ? fallback : src) : TRANSPARENT_PLACEHOLDER}
      alt={alt}
      loading="lazy"
      className={`lazy-img ${loaded ? 'loaded' : 'loading'} ${className}`}
      style={style}
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        // try to recover by switching to a known fallback image
        if (!broken) {
          setBroken(true)
        }
        if (props.onError) props.onError(e)
      }}
      {...props}
    />
  )
}
