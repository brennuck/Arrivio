export function extractTruliaAddress(): string | null {
  const selectors = [
    '[data-testid="home-details-summary-headline"]',
    '[data-testid="home-details-summary-address"]',
    'h1[data-testid="hdp-address"]',
    '.hdp-header h1',
  ]

  for (const sel of selectors) {
    const el = document.querySelector(sel)
    if (el?.textContent?.trim()) return el.textContent.trim()
  }

  const og = document.querySelector<HTMLMetaElement>(
    'meta[property="og:title"]',
  )
  if (og?.content) {
    const match = og.content.match(/^(.+?\d{5})/)
    if (match) return match[1]
  }

  return null
}
