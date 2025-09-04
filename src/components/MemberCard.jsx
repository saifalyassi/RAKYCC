import React from 'react'

export default function MemberCard({ name, role, photo, description, className = '' }) {
  return (
    <article className={`member-card ${className}`}>
      <div className="photo-wrap">
        <img src={photo} alt={name} />
      </div>
      <div className="card-body">
        <h3 className="member-name">{name}</h3>
        <p className="member-role">{role}</p>
        <p className="member-desc">{description}</p>
      </div>
    </article>
  )
}
