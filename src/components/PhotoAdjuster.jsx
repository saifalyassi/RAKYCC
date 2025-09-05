import React from 'react'

export default function PhotoAdjuster({ members, adjustments, setAdjustments }) {
  if (!setAdjustments) return null
  return (
    <div style={{position:'fixed',right:16,top:80,background:'#fff',padding:12,borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,0.08)',zIndex:999}}>
      <h4 style={{margin:0,marginBottom:8}}>Photo adjuster</h4>
      <small style={{display:'block',marginBottom:8}}>Select member and change vertical %</small>
      {members.map(m=>{
        const val = adjustments[m.id] ?? m.photoPosition ?? 'center 50%'
        const current = parseInt((val.split(' ')[1]||'50%').replace('%',''))
        return (
          <div key={m.id} style={{marginBottom:8}}>
            <label style={{display:'block',fontSize:12}}>{m.id} — {m.name}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={current}
              onChange={e=>{
                const v = e.target.value+'%'
                setAdjustments(prev=>({ ...prev, [m.id]: `center ${v}` }))
              }}
            />
            <div style={{fontSize:11,opacity:0.8}}>{`center ${current}%`}</div>
          </div>
        )
      })}
      <div style={{marginTop:8}}>
        <button onClick={()=>{
          // copy JSON to clipboard so user can paste into members.js
          const obj = Object.fromEntries(Object.entries(adjustments||{}).map(([k,v])=>[k,v]))
          navigator.clipboard.writeText(JSON.stringify(obj,null,2))
        }}>Copy JSON</button>
      </div>
    </div>
  )
}
