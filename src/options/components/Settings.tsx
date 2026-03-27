import { useState, useEffect } from 'react'
import { getSettings, saveSettings } from '../../shared/storage'
import type { TransportMode } from '../../shared/types'

const MODES: { value: TransportMode; label: string }[] = [
  { value: 'driving', label: 'Drive' },
  { value: 'walking', label: 'Walk' },
  { value: 'cycling', label: 'Bike' },
]

export function Settings() {
  const [mode, setMode] = useState<TransportMode>('driving')
  const [token, setToken] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSettings().then((s) => {
      setMode(s.transportMode)
      setToken(s.mapboxToken)
    })
  }, [])

  async function handleSave() {
    await saveSettings({ transportMode: mode, mapboxToken: token })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="settings-block">
      <div className="form-field">
        <label className="form-label">Transport Mode</label>
        <div className="mode-selector">
          {MODES.map((m) => (
            <button
              key={m.value}
              className={`mode-btn ${mode === m.value ? 'mode-btn-active' : ''}`}
              onClick={() => setMode(m.value)}
              type="button"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="mapbox-token">
          MapBox Access Token
        </label>
        <input
          id="mapbox-token"
          className="form-input"
          type="text"
          placeholder="pk.eyJ1Ijoi..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <p className="form-hint">
          Get a free token at{' '}
          <a href="https://account.mapbox.com" target="_blank" rel="noopener noreferrer">
            mapbox.com
          </a>{' '}
          — 100k requests/month free.
        </p>
      </div>

      <button className="btn btn-primary" onClick={handleSave} type="button">
        {saved ? 'Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}
