import type { GeocodingResult, TransportMode, ETAResult, Place } from './types'
import { getSettings } from './storage'

const MAPBOX_BASE = 'https://api.mapbox.com'

async function getToken(): Promise<string> {
  const settings = await getSettings()
  return settings.mapboxToken
}

export async function geocode(
  address: string,
): Promise<GeocodingResult | null> {
  const token = await getToken()
  if (!token) return null

  const encoded = encodeURIComponent(address)
  const url = `${MAPBOX_BASE}/geocoding/v5/mapbox.places/${encoded}.json?access_token=${token}&limit=1`

  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data.features?.length) return null

  const [lng, lat] = data.features[0].center
  return {
    lat,
    lng,
    formattedAddress: data.features[0].place_name,
  }
}

export async function getDirections(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  mode: TransportMode = 'driving',
): Promise<{ durationMinutes: number; distanceKm: number } | null> {
  const token = await getToken()
  if (!token) return null

  const profile = mode === 'driving' ? 'driving-traffic' : mode
  const coords = `${fromLng},${fromLat};${toLng},${toLat}`
  const url = `${MAPBOX_BASE}/directions/v5/mapbox/${profile}/${coords}?access_token=${token}`

  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data.routes?.length) return null

  const route = data.routes[0]
  return {
    durationMinutes: Math.round(route.duration / 60),
    distanceKm: Math.round((route.distance / 1000) * 10) / 10,
  }
}

export async function getETAsToPlaces(
  fromLat: number,
  fromLng: number,
  places: Place[],
  mode: TransportMode,
): Promise<ETAResult[]> {
  const results = await Promise.all(
    places.map(async (place) => {
      const directions = await getDirections(
        fromLat,
        fromLng,
        place.lat,
        place.lng,
        mode,
      )
      return {
        placeId: place.id,
        name: place.name,
        durationMinutes: directions?.durationMinutes ?? -1,
        distanceKm: directions?.distanceKm ?? -1,
        mode,
      }
    }),
  )
  return results
}
