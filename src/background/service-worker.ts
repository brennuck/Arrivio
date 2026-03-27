import { geocode, getETAsToPlaces } from '../shared/mapbox'
import { getSettings, getPlaces } from '../shared/storage'
import { getCachedETAs, setCachedETAs } from '../shared/cache'
import type { Message, GetETAsResponse, GeocodeResponse } from '../shared/messages'

chrome.runtime.onMessage.addListener(
  (message: Message, _sender, sendResponse) => {
    handleMessage(message).then(sendResponse)
    return true
  },
)

async function handleMessage(message: Message): Promise<unknown> {
  switch (message.type) {
    case 'GET_ETAS':
      return handleGetETAs(message.address)
    case 'GEOCODE':
      return handleGeocode(message.address)
    case 'GET_PLACES':
      return { places: await getPlaces() }
    default:
      return { error: 'Unknown message type' }
  }
}

async function handleGetETAs(address: string): Promise<GetETAsResponse> {
  try {
    const settings = await getSettings()

    if (!settings.mapboxToken) {
      return { type: 'GET_ETAS_RESPONSE', etas: [], error: 'NO_TOKEN' }
    }

    const geocoded = await geocode(address)
    if (!geocoded) {
      return {
        type: 'GET_ETAS_RESPONSE',
        etas: [],
        error: 'Could not find this address',
      }
    }

    const cached = await getCachedETAs(geocoded.lat, geocoded.lng)
    if (cached) {
      return { type: 'GET_ETAS_RESPONSE', etas: cached }
    }

    if (settings.places.length === 0) {
      return { type: 'GET_ETAS_RESPONSE', etas: [], error: 'NO_PLACES' }
    }

    const etas = await getETAsToPlaces(
      geocoded.lat,
      geocoded.lng,
      settings.places,
      settings.transportMode,
    )
    await setCachedETAs(geocoded.lat, geocoded.lng, etas)

    return { type: 'GET_ETAS_RESPONSE', etas }
  } catch (err) {
    return {
      type: 'GET_ETAS_RESPONSE',
      etas: [],
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

async function handleGeocode(address: string): Promise<GeocodeResponse> {
  try {
    const result = await geocode(address)
    return { type: 'GEOCODE_RESPONSE', result }
  } catch (err) {
    return {
      type: 'GEOCODE_RESPONSE',
      result: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
