import type { ArrivioSettings, Place } from './types'

const DEFAULT_SETTINGS: ArrivioSettings = {
  enabled: true,
  transportMode: 'driving',
  mapboxToken: '',
  places: [],
}

export async function getSettings(): Promise<ArrivioSettings> {
  const result = await chrome.storage.local.get('settings') as { settings?: Partial<ArrivioSettings> }
  return { ...DEFAULT_SETTINGS, ...(result.settings ?? {}) }
}

export async function saveSettings(
  updates: Partial<ArrivioSettings>,
): Promise<void> {
  const current = await getSettings()
  await chrome.storage.local.set({ settings: { ...current, ...updates } })
}

export async function getPlaces(): Promise<Place[]> {
  const settings = await getSettings()
  return settings.places
}

export async function savePlaces(places: Place[]): Promise<void> {
  await saveSettings({ places })
}

export async function addPlace(place: Place): Promise<void> {
  const places = await getPlaces()
  places.push(place)
  await savePlaces(places)
}

export async function removePlace(id: string): Promise<void> {
  const places = await getPlaces()
  await savePlaces(places.filter((p) => p.id !== id))
}

export async function updatePlace(
  id: string,
  updates: Partial<Place>,
): Promise<void> {
  const places = await getPlaces()
  const index = places.findIndex((p) => p.id === id)
  if (index !== -1) {
    places[index] = { ...places[index], ...updates }
    await savePlaces(places)
  }
}
