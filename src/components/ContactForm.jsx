import React, { useState } from 'react'

export default function ContactForm(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)

  const validateEmail = (em) => /\S+@\S+\.\S+/.test(em)

  const sendMail = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!name.trim()) return setStatus({ error: true, message: 'الاسم مطلوب' })
    if (!validateEmail(email)) return setStatus({ error: true, message: 'البريد الإلكتروني غير صالح' })
    if (!message.trim()) return setStatus({ error: true, message: 'الرسالة فارغة' })

    setBusy(true)
    try {
      // If a Formspree endpoint is provided (good for GitHub Pages), POST to it
      const formspree = process.env.FORMSPREE_ENDPOINT || ''
      if (formspree) {
        const res = await fetch(formspree, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
        if (res.ok) {
          setStatus({ ok: true, message: 'تم الإرسال. شكراً لك.' })
          setName('')
          setEmail('')
          setMessage('')
        } else {
          const data = await res.json()
          setStatus({ error: true, message: data?.error || 'فشل الإرسال' })
        }
      } else {
        // fallback to API (if available) or mailto
        if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
          // default: use Formspree public endpoint placeholder (replace with your project endpoint)
          const placeholder = 'https://formspree.io/f/your-form-id'
          const res = await fetch(placeholder, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
          })
          if (res.ok) {
            setStatus({ ok: true, message: 'تم الإرسال. شكراً لك.' })
            setName('')
            setEmail('')
            setMessage('')
          } else {
            setStatus({ error: true, message: 'فشل الإرسال' })
          }
        } else {
          const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
          })
          const data = await res.json()
          if (res.ok) {
            setStatus({ ok: true, message: 'تم الإرسال. شكراً لك.' })
            setName('')
            setEmail('')
            setMessage('')
          } else {
            setStatus({ error: true, message: data?.error || 'فشل الإرسال' })
          }
        }
      }
    } catch (err) {
      setStatus({ error: true, message: 'فشل الاتصال بالخادم' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="contact-page" dir="rtl">
      <h2>اترك رسالة</h2>
      <form onSubmit={sendMail} className="contact-form">
  <label>الاسم *</label>
  <input value={name} onChange={e=>setName(e.target.value)} placeholder="اسمك" required />
  <label>البريد الإلكتروني *</label>
  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@mail.com" required />
        <label>الرسالة</label>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="اكتب رسالتك هنا..." rows={8} className="contact-textarea" />
        <div className="contact-actions">
          <button type="submit" className="btn" disabled={busy}>{busy ? 'جارٍ الإرسال...' : 'إرسال'}</button>
          {status?.message && (
            <div className={`contact-status ${status.error ? 'error' : 'ok'}`}>{status.message}</div>
          )}
        </div>
      </form>
    </div>
  )
}
