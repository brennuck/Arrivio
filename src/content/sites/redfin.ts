export function extractRedfinAddress(): string | null {
  const selectors = [
    '.street-address',
    '[data-rf-test-id="abp-streetLine"]',
    '.homeAddress .street-address',
    '.HomeInfo h1',
  ]

  for (const sel of selectors) {
    const el = document.querySelector(sel)
    const text = el?.textContent?.trim()
    if (text) {
      const locality = document.querySelector(
        '.city-state-zip, [data-rf-test-id="abp-cityStateZip"]',
      )
      if (locality?.textContent?.trim()) {
        return `${text}, ${locality.textContent.trim()}`
      }
      return text
    }
  }

  return null
}
