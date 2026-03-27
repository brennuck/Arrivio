import { useState } from 'react'
import { addPlace } from '../../shared/storage'
import type { GeocodeResponse } from '../../shared/messages'

interface PlaceFormProps {
  onSave: () => void
  onCancel: () => void
}

export function PlaceForm({ onSave, onCancel }: PlaceFormProps) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !address.trim()) return

    setSaving(true)
    setError(null)

    try {
      const response: GeocodeResponse = await chrome.runtime.sendMessage({
        type: 'GEOCODE',
        address: address.trim(),
      })

      if (!response.result) {
        setError(
          'Could not find that address. Try adding city and state.',
        )
        return
      }

      await addPlace({
        id: crypto.randomUUID(),
        name: name.trim(),
        address: response.result.formattedAddress,
        lat: response.result.lat,
        lng: response.result.lng,
      })

      onSave()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="place-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="place-name">
          Label
        </label>
        <input
          id="place-name"
          className="form-input"
          type="text"
          placeholder="e.g. Work, Mom's House, Gym"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="place-address">
          Address
        </label>
        <input
          id="place-address"
          className="form-input"
          type="text"
          placeholder="123 Main St, City, State"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Place'}
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
