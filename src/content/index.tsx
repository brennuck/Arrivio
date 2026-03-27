import { createRoot, Root } from 'react-dom/client'
import { extractAddress } from './sites'
import { App } from './widget/App'
import widgetStyles from './widget/widget.css?inline'

let root: Root | null = null
let currentAddress: string | null = null
let hostElement: HTMLDivElement | null = null

function mountWidget(address: string) {
  if (hostElement) {
    currentAddress = address
    root?.render(<App address={address} />)
    return
  }

  hostElement = document.createElement('div')
  hostElement.id = 'arrivio-root'
  hostElement.style.cssText =
    'position:fixed;bottom:0;right:0;z-index:2147483647;pointer-events:none;'
  document.body.appendChild(hostElement)

  const shadow = hostElement.attachShadow({ mode: 'closed' })

  const style = document.createElement('style')
  style.textContent = widgetStyles
  shadow.appendChild(style)

  const container = document.createElement('div')
  container.style.pointerEvents = 'auto'
  shadow.appendChild(container)

  root = createRoot(container)
  currentAddress = address
  root.render(<App address={address} />)
}

function unmountWidget() {
  root?.unmount()
  root = null
  hostElement?.remove()
  hostElement = null
  currentAddress = null
}

async function checkPage() {
  try {
    const result = await chrome.storage.local.get('settings') as { settings?: { enabled?: boolean } }
    if (result.settings?.enabled === false) {
      unmountWidget()
      return
    }
  } catch {
    return
  }

  const address = extractAddress()
  if (address && address !== currentAddress) {
    mountWidget(address)
  } else if (!address && currentAddress) {
    unmountWidget()
  }
}

function init() {
  setTimeout(checkPage, 600)

  let lastUrl = location.href
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href
      setTimeout(checkPage, 1200)
    }
  }).observe(document.documentElement, { childList: true, subtree: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
