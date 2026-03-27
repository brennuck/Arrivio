export function extractRealtorAddress(): string | null {
  const selectors = [
    '[data-testid="address-line"]',
    '[data-testid="ldp-address"]',
    '.listing-address',
    '.address-detail h1',
  ]

  for (const sel of selectors) {
    const el = document.querySelector(sel)
    if (el?.textContent?.trim()) return el.textContent.trim()
  }

  return extractFromJsonLd()
}

function extractFromJsonLd(): string | null {
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  )
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.textContent || '')
      const addr = findAddress(data)
      if (addr) return addr
    } catch {
      /* skip malformed JSON-LD */
    }
  }
  return null
}

function findAddress(data: Record<string, unknown>): string | null {
  if (!data) return null

  if (data.address && typeof data.address === 'object') {
    const a = data.address as Record<string, string>
    if (a.streetAddress) {
      return [a.streetAddress, a.addressLocality, a.addressRegion, a.postalCode]
        .filter(Boolean)
        .join(', ')
    }
  }

  if (Array.isArray(data['@graph'])) {
    for (const item of data['@graph']) {
      const addr = findAddress(item as Record<string, unknown>)
      if (addr) return addr
    }
  }

  return null
}
