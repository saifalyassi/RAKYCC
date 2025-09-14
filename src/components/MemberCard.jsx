import React, { useState } from 'react'

export default function MemberCard({ name, role, photo, description, className = '', photoPosition }) {
  const [expanded, setExpanded] = useState(false)
  const imgStyle = photoPosition ? { objectPosition: photoPosition } : undefined

  const toggle = (e) => {
    // allow external controls later; prevent double toggles when children handle clicks
    setExpanded(prev => !prev)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <article
      className={`member-card ${className} ${expanded ? 'expanded' : ''}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="photo-wrap">
        <img src={photo} alt={name} style={imgStyle} />
      </div>
      <div className="card-body">
        <h3 className="member-name">{name}</h3>
        <p className="member-role">{role}</p>
        <p className="member-desc">{description}</p>
      </div>
    </article>
  )
}
