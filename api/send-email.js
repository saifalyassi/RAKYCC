import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  // SMTP configuration should be provided via environment variables
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = process.env.SMTP_SECURE === 'true'
  const to = process.env.EMAIL_TO || 'saifalyassi49@gmail.com'

  if (!host || !user || !pass) {
    console.error('Missing SMTP configuration environment variables')
    return res.status(500).json({ error: 'Server not configured' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    const mail = {
      from: `${name} <${email}>`,
      to,
      subject: `رسالة من موقع المجلس - ${name}`,
      text: `${message}\n\n-----\nالاسم: ${name}\nالبريد: ${email}`,
    }

    await transporter.sendMail(mail)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-email error', err)
    return res.status(500).json({ error: 'send_failed' })
  }
}
