import type { ETAResult } from './types'

interface CacheEntry {
  etas: ETAResult[]
  timestamp: number
}

const CACHE_TTL = 30 * 60 * 1000

function cacheKey(fromLat: number, fromLng: number): string {
  return `eta_cache_${fromLat.toFixed(4)}_${fromLng.toFixed(4)}`
}

export async function getCachedETAs(
  fromLat: number,
  fromLng: number,
): Promise<ETAResult[] | null> {
  const key = cacheKey(fromLat, fromLng)
  const result = await chrome.storage.local.get(key)
  const entry = result[key] as CacheEntry | undefined

  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    await chrome.storage.local.remove(key)
    return null
  }

  return entry.etas
}

export async function setCachedETAs(
  fromLat: number,
  fromLng: number,
  etas: ETAResult[],
): Promise<void> {
  const key = cacheKey(fromLat, fromLng)
  const entry: CacheEntry = { etas, timestamp: Date.now() }
  await chrome.storage.local.set({ [key]: entry })
}
