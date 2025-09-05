import React from 'react'

export default function MemberCard({ name, role, photo, description, className = '', photoPosition }) {
  const imgStyle = photoPosition ? { objectPosition: photoPosition } : undefined
  return (
    <article className={`member-card ${className}`}>
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
