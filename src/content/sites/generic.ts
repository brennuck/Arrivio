const ADDRESS_REGEX = /\d{1,5}\s+[\w\s.]+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Dr|Drive|Rd|Road|Ln|Lane|Way|Ct|Court|Pl|Place|Cir|Circle|Ter|Terrace|Pkwy|Parkway|Hwy|Highway)\b[.,]?\s*[\w\s]*,\s*[A-Z]{2}\s*\d{5}/i

const HEADING_SELECTORS = [
  'h1',
  '[class*="address"]',
  '[class*="Address"]',
  '[data-testid*="address"]',
  '[class*="listing-title"]',
  '[class*="listingTitle"]',
  '[class*="property-address"]',
  '[class*="propertyAddress"]',
  '[class*="detail-address"]',
  '[class*="detailAddress"]',
  '[class*="street-address"]',
  '[class*="streetAddress"]',
  '[itemprop="streetAddress"]',
  '[class*="location"]',
  '[class*="prop-address"]',
]

const META_PROPERTIES = [
  'og:title',
  'og:street-address',
  'twitter:title',
]

function extractFromMeta(): string | null {
  for (const prop of META_PROPERTIES) {
    const meta =
      document.querySelector(`meta[property="${prop}"]`) ??
      document.querySelector(`meta[name="${prop}"]`)
    if (meta) {
      const content = meta.getAttribute('content')
      if (content && ADDRESS_REGEX.test(content)) {
        return content.trim()
      }
    }
  }
  return null
}

function extractFromSelectors(): string | null {
  for (const selector of HEADING_SELECTORS) {
    try {
      const els = document.querySelectorAll(selector)
      for (const el of els) {
        const text = el.textContent?.trim()
        if (text && text.length > 8 && text.length < 200) {
          if (ADDRESS_REGEX.test(text)) {
            return text.replace(/\s+/g, ' ').trim()
          }
        }
      }
    } catch {
      /* selector may be invalid on some pages */
    }
  }
  return null
}

function extractFromTitle(): string | null {
  const title = document.title
  if (title && ADDRESS_REGEX.test(title)) {
    const match = title.match(ADDRESS_REGEX)
    return match ? match[0].trim() : null
  }
  return null
}

function extractFromMicrodata(): string | null {
  const streetEl = document.querySelector('[itemprop="streetAddress"]')
  const localityEl = document.querySelector('[itemprop="addressLocality"]')
  const regionEl = document.querySelector('[itemprop="addressRegion"]')
  const postalEl = document.querySelector('[itemprop="postalCode"]')

  if (streetEl?.textContent) {
    return [
      streetEl.textContent.trim(),
      localityEl?.textContent?.trim(),
      regionEl?.textContent?.trim(),
      postalEl?.textContent?.trim(),
    ]
      .filter(Boolean)
      .join(', ')
  }
  return null
}

export function extractGenericAddress(): string | null {
  return (
    extractFromMicrodata() ??
    extractFromSelectors() ??
    extractFromMeta() ??
    extractFromTitle()
  )
}
