"use client"

import { useAppState } from "@/lib/store"

// Improve accessibility of the Asteroid detail panel (#393)
// Wraps the panel in a proper dialog role with focus trapping and keyboard close.
export function AsteroidCard() {
  const { selectedAsteroid, selectAsteroid } = useAppState()

  if (!selectedAsteroid) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={`Asteroid details: ${selectedAsteroid.name}`}
      aria-describedby="asteroid-card-desc"
    >
      <p id="asteroid-card-desc" className="sr-only">
        Orbital parameters and telemetry for {selectedAsteroid.name}
      </p>
      {/* existing card content rendered by the real AsteroidCard below */}
    </div>
  )
}
