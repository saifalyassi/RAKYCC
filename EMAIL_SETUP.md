To send email from the Contact form using the included serverless endpoint, set these environment variables before running or deploying:

- SMTP_HOST (e.g. smtp.gmail.com)
- SMTP_PORT (587 or 465)
- SMTP_USER (SMTP username, usually an email)
- SMTP_PASS (SMTP password or app-password)
- SMTP_SECURE (true for port 465, false for 587)
- EMAIL_TO (optional, default: saifalyassi49@gmail.com)

Local testing:
- Use a dev SMTP server like MailHog or Mailtrap, or set the variables to your SMTP provider credentials.

Deployment:
- On Vercel: add the env vars in Project Settings > Environment Variables.
- On Netlify: add env vars in Site Settings > Build & deploy > Environment.

Notes:
- For Gmail you may need to enable app passwords and use `SMTP_USER` as the app password owner email and `SMTP_PASS` as the app password.
- Keep secrets out of source control and use environment variables.

Formspree quick setup (for GitHub Pages)
- Create a free Formspree account at https://formspree.io
- Create a new form and copy the endpoint id (looks like `https://formspree.io/f/your-form-id`)
- Replace the placeholder endpoint in `src/components/ContactForm.jsx` or set the env var `FORMSPREE_ENDPOINT` with that URL.
- Deploy to GitHub Pages; Formspree will forward submissions to your email.

Note: Formspree free plan has a submission limit and includes a footer in emails for the free tier.
