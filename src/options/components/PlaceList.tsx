import { useState, useEffect } from 'react'
import { PlaceForm } from './PlaceForm'
import { getPlaces, removePlace } from '../../shared/storage'
import type { Place } from '../../shared/types'

export function PlaceList() {
  const [places, setPlaces] = useState<Place[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadPlaces()
  }, [])

  async function loadPlaces() {
    setPlaces(await getPlaces())
  }

  async function handleDelete(id: string) {
    await removePlace(id)
    await loadPlaces()
  }

  return (
    <div>
      {places.length === 0 ? (
        <div className="empty-state">
          <p>No places saved yet.</p>
          <p className="empty-hint">
            Add your first place to start seeing ETAs on listings.
          </p>
        </div>
      ) : (
        <div className="place-list">
          {places.map((place) => (
            <div key={place.id} className="place-card">
              <div className="place-info">
                <div className="place-details">
                  <span className="place-name">{place.name}</span>
                  <span className="place-address">{place.address}</span>
                </div>
              </div>
              <button
                className="btn btn-danger-text"
                onClick={() => handleDelete(place.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <PlaceForm
          onSave={() => {
            loadPlaces()
            setShowForm(false)
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          type="button"
        >
          + Add Place
        </button>
      )}
    </div>
  )
}
