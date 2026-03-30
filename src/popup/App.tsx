import { useState, useEffect } from 'react'
import { getSettings, saveSettings, getPlaces } from '../shared/storage'
import type { Place } from '../shared/types'
import logoIcon from '../assets/icons/icon48.png'

export function App() {
  const [enabled, setEnabled] = useState(true)
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    getSettings().then((s) => {
      setEnabled(s.enabled)
    })
    getPlaces().then(setPlaces)
  }, [])

  async function toggleEnabled() {
    const next = !enabled
    setEnabled(next)
    await saveSettings({ enabled: next })
  }

  return (
    <div className="popup">
      <header className="popup-header">
        <div className="popup-brand">
          <img className="popup-logo" src={logoIcon} alt="Arrivio" />
          <span className="popup-name">Arrivio</span>
        </div>
        <button
          className={`toggle ${enabled ? 'toggle-on' : ''}`}
          onClick={toggleEnabled}
          type="button"
          aria-label={enabled ? 'Disable Arrivio' : 'Enable Arrivio'}
        >
          <div className="toggle-knob" />
        </button>
      </header>

      <div className="popup-body">
        <div className="popup-stat">
          <span className="popup-stat-number">{places.length}</span>
          <span className="popup-stat-label">
            saved place{places.length !== 1 ? 's' : ''}
          </span>
        </div>

        {places.length > 0 && (
          <div className="popup-places">
            {places.map((p) => (
              <div key={p.id} className="popup-place">
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="popup-settings-btn"
        onClick={() => chrome.runtime.openOptionsPage()}
        type="button"
      >
        Open Settings
      </button>
    </div>
  )
}
