export function extractZillowAddress(): string | null {
  const selectors = [
    'h1[data-testid="bdp-address"]',
    '[data-testid="fs-chip-container"] h1',
    '.summary-container h1',
    'header h1',
  ]

  for (const sel of selectors) {
    const el = document.querySelector(sel)
    if (el?.textContent?.trim()) return el.textContent.trim()
  }

  return extractFromMeta()
}

function extractFromMeta(): string | null {
  const og = document.querySelector<HTMLMetaElement>(
    'meta[property="og:title"]',
  )
  if (og?.content) {
    const match = og.content.match(/^(.+?\d{5})/)
    if (match) return match[1]
  }
  return null
}
