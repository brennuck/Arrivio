export interface Place {
  id: string
  name: string
  address: string
  lat: number
  lng: number
}

export interface ETAResult {
  placeId: string
  name: string
  durationMinutes: number
  distanceKm: number
  mode: TransportMode
}

export type TransportMode = 'driving' | 'walking' | 'cycling'

export interface ArrivioSettings {
  enabled: boolean
  transportMode: TransportMode
  mapboxToken: string
  places: Place[]
}

export interface GeocodingResult {
  lat: number
  lng: number
  formattedAddress: string
}
