export function formatArabicDate(raw) {
  if (!raw) return raw
  const s = String(raw).trim()
  const parts = s.split(/\s+/)
  if (parts.length === 1) return s
  // guess last token is year if it's 4 digits
  let year = parts[parts.length - 1]
  if (!/^\d{4}$/.test(year)) {
    // fallback: return raw as-is
    return s
  }
  const day = parts[0].replace(/^0+/, '') // drop leading zeros
  const month = parts.slice(1, parts.length - 1).join(' ')
  // Return an object-like markup; consumer should render accordingly
  return { day, month, year }
}

// ensure trailing punctuation appears correctly in RTL by appending RLM
export function fixTrailingPunctuation(text) {
  if (typeof text !== 'string') return text
  return text.replace(/([.?!])\s*$/u, '$1\u200F')
}
