export function extractApartmentsAddress(): string | null {
  const selectors = [
    '.propertyAddressContainer .delivery-address',
    '.propertyAddressContainer',
    'h1.propertyName',
    '[data-testid="property-address"]',
    'header .propertyAddress',
  ]

  for (const sel of selectors) {
    const el = document.querySelector(sel)
    if (el?.textContent?.trim()) return el.textContent.trim()
  }

  const meta = document.querySelector<HTMLMetaElement>(
    'meta[property="og:street-address"]',
  )
  if (meta?.content) return meta.content

  return null
}
