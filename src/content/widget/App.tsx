import { useState, useEffect } from 'react'
import { ETAPanel } from './ETAPanel'
import type { ETAResult } from '../../shared/types'
import type { GetETAsResponse } from '../../shared/messages'

interface AppProps {
  address: string
}

export function App({ address }: AppProps) {
  const [etas, setEtas] = useState<ETAResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setEtas([])

    chrome.runtime
      .sendMessage({ type: 'GET_ETAS', address })
      .then((response: GetETAsResponse) => {
        setEtas(response.etas)
        if (response.error) setError(response.error)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [address])

  return <ETAPanel etas={etas} loading={loading} error={error} />
}
