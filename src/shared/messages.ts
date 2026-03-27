import type { ETAResult, GeocodingResult } from './types'

export interface GetETAsRequest {
  type: 'GET_ETAS'
  address: string
}

export interface GeocodeRequest {
  type: 'GEOCODE'
  address: string
}

export interface GetPlacesRequest {
  type: 'GET_PLACES'
}

export interface GetETAsResponse {
  type: 'GET_ETAS_RESPONSE'
  etas: ETAResult[]
  error?: string
}

export interface GeocodeResponse {
  type: 'GEOCODE_RESPONSE'
  result: GeocodingResult | null
  error?: string
}

export type Message = GetETAsRequest | GeocodeRequest | GetPlacesRequest

export function sendMessage<T>(message: Message): Promise<T> {
  return chrome.runtime.sendMessage(message)
}
