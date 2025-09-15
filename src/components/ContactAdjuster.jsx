import React from 'react'

export default function ContactAdjuster({ onChange, values }) {
  const v = values || {}

  // apply CSS variables live when values change
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement.style
    // translate values are percentages
    root.setProperty('--contact-translate-x', `${v.x ?? 0}%`)
    root.setProperty('--contact-translate-y', `${v.y ?? 0}%`)
    // scale is provided as percent (100 -> 1)
    const scaleVal = ((v.scale ?? 100) / 100).toString()
    root.setProperty('--contact-scale', scaleVal)
    root.setProperty('--contact-font-size', `${v.fs ?? 14}px`)
    return () => {
      // keep values as-is (do not reset)
    }
  }, [v.x, v.y, v.scale, v.fs])

  return (
    <div className="contact-adjuster" style={{position:'fixed',right:16,top:80,background:'#fff',padding:12,borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,0.08)',zIndex:999}}>
      <h4 style={{margin:0,marginBottom:8}}>Contact button tool</h4>
      <small style={{display:'block',marginBottom:8}}>Drag to adjust position and scale. Click Copy to copy CSS variables.</small>

      <label style={{display:'block',fontSize:12}}>Horizontal (%)</label>
      <input type="range" min="-100" max="100" value={v.x ?? 0} onChange={e=>onChange({ ...v, x: Number(e.target.value) })} />
      <div style={{fontSize:11,opacity:0.8}}>{`translateX: ${v.x ?? 0}%`}</div>

      <label style={{display:'block',fontSize:12,marginTop:8}}>Vertical (%)</label>
      <input type="range" min="-100" max="100" value={v.y ?? 0} onChange={e=>onChange({ ...v, y: Number(e.target.value) })} />
      <div style={{fontSize:11,opacity:0.8}}>{`translateY: ${v.y ?? 0}%`}</div>

      <label style={{display:'block',fontSize:12,marginTop:8}}>Scale (%)</label>
      <input type="range" min="50" max="150" value={v.scale ?? 100} onChange={e=>onChange({ ...v, scale: Number(e.target.value) })} />
      <div style={{fontSize:11,opacity:0.8}}>{`scale: ${v.scale ?? 100}%`}</div>

      <label style={{display:'block',fontSize:12,marginTop:8}}>Font size (px)</label>
      <input type="range" min="10" max="20" value={v.fs ?? 14} onChange={e=>onChange({ ...v, fs: Number(e.target.value) })} />
      <div style={{fontSize:11,opacity:0.8}}>{`font-size: ${v.fs ?? 14}px`}</div>

      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button onClick={()=>{
          const css = `:root { --contact-translate-x: ${v.x ?? 0}%; --contact-translate-y: ${v.y ?? 0}%; --contact-scale: ${((v.scale ?? 100)/100).toFixed(2)}; --contact-font-size: ${v.fs ?? 14}px; }`
          navigator.clipboard.writeText(css).then(()=>alert('CSS variables copied to clipboard'))
        }}>Copy CSS</button>
        <button onClick={()=>onChange({ x:0,y:0,scale:100,fs:14 })}>Reset</button>
      </div>
    </div>
  )
}
