import { extractZillowAddress } from './zillow'
import { extractRealtorAddress } from './realtor'
import { extractApartmentsAddress } from './apartments'
import { extractTruliaAddress } from './trulia'
import { extractRedfinAddress } from './redfin'

type Extractor = () => string | null

const siteExtractors: Record<string, Extractor> = {
  'zillow.com': extractZillowAddress,
  'realtor.com': extractRealtorAddress,
  'apartments.com': extractApartmentsAddress,
  'trulia.com': extractTruliaAddress,
  'redfin.com': extractRedfinAddress,
}

export function extractAddress(): string | null {
  const hostname = window.location.hostname

  for (const [domain, extractor] of Object.entries(siteExtractors)) {
    if (hostname.includes(domain)) {
      return extractor()
    }
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
      const addr = findAddressInSchema(data)
      if (addr) return addr
    } catch {
      /* skip malformed JSON-LD */
    }
  }
  return null
}

function findAddressInSchema(data: Record<string, unknown>): string | null {
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
      const addr = findAddressInSchema(item as Record<string, unknown>)
      if (addr) return addr
    }
  }

  return null
}
