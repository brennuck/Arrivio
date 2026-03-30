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
  const [minimized, setMinimized] = useState(false)

  const showNoPlaces = error === 'NO_PLACES'

  if (minimized) {
    return (
      <button
        className="arrivio-fab"
        onClick={() => setMinimized(false)}
        type="button"
        title="Show Arrivio"
      >
        <img className="arrivio-fab-logo" src={LOGO_DATA_URI} alt="Arrivio" />
      </button>
    )
  }

  return (
    <div className="arrivio-card">
      <div className="arrivio-header">
        <div className="arrivio-brand">
          <img className="arrivio-logo" src={LOGO_DATA_URI} alt="" />
          <span className="arrivio-title">Arrivio</span>
        </div>
        <button
          className="arrivio-minimize"
          onClick={() => setMinimized(true)}
          type="button"
          title="Minimize"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="arrivio-content">
        {loading ? (
          <div className="arrivio-status">
            <div className="arrivio-spinner" />
            <span>Calculating ETAs...</span>
          </div>
        ) : showNoPlaces ? (
          <div className="arrivio-status">
            <span>Add places in settings to see ETAs here.</span>
            <button
              className="arrivio-action-btn"
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
    </div>
  )
}
