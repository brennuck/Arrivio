import { useState } from 'react'
import { ETAItem } from './ETAItem'
import type { ETAResult } from '../../shared/types'
import { LOGO_DATA_URI } from './logo'

interface ETAPanelProps {
  etas: ETAResult[]
  loading: boolean
  error: string | null
}

export function ETAPanel({ etas, loading, error }: ETAPanelProps) {
  const [expanded, setExpanded] = useState(true)

  const showSetup = error === 'NO_TOKEN'
  const showNoPlaces = error === 'NO_PLACES'

  return (
    <div className="arrivio-panel">
      <button
        className="arrivio-toggle"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <img className="arrivio-logo" src={LOGO_DATA_URI} alt="Arrivio" />
        {!expanded && etas.length > 0 && (
          <span className="arrivio-badge">{etas.length}</span>
        )}
        <span className="arrivio-chevron" data-expanded={expanded}>
          {expanded ? '\u25BC' : '\u25B2'}
        </span>
      </button>

      {expanded && (
        <div className="arrivio-body">
          {loading ? (
            <div className="arrivio-status">
              <div className="arrivio-spinner" />
              <span>Calculating ETAs...</span>
            </div>
          ) : showSetup ? (
            <div className="arrivio-status arrivio-setup">
              <span>
                Add your MapBox token in Arrivio settings to get started.
              </span>
              <button
                className="arrivio-settings-link"
                onClick={() => chrome.runtime.openOptionsPage()}
                type="button"
              >
                Open Settings
              </button>
            </div>
          ) : showNoPlaces ? (
            <div className="arrivio-status">
              <span>Add places in settings to see ETAs here.</span>
              <button
                className="arrivio-settings-link"
                onClick={() => chrome.runtime.openOptionsPage()}
                type="button"
              >
                Add Places
              </button>
            </div>
          ) : error ? (
            <div className="arrivio-status arrivio-error">{error}</div>
          ) : (
            <div className="arrivio-list">
              {etas.map((eta) => (
                <ETAItem key={eta.placeId} eta={eta} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
