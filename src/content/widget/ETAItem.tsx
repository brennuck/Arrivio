import type { ETAResult } from '../../shared/types'

interface ETAItemProps {
  eta: ETAResult
}

function getTimeColor(minutes: number): string {
  if (minutes < 0) return '#6B7280'
  if (minutes <= 15) return '#059669'
  if (minutes <= 30) return '#D97706'
  return '#DC2626'
}

function formatDuration(minutes: number): string {
  if (minutes < 0) return '\u2014'
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function ETAItem({ eta }: ETAItemProps) {
  const color = getTimeColor(eta.durationMinutes)

  return (
    <div className="arrivio-item">
      <span className="arrivio-item-name">{eta.name}</span>
      <span className="arrivio-item-time" style={{ color }}>
        {formatDuration(eta.durationMinutes)}
      </span>
    </div>
  )
}
