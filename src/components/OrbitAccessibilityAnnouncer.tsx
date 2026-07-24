"use client"

import { useMemo } from "react"
import { useAppState } from "@/lib/store"

// Improve accessibility of the Orbit visualizer (#404)
// Adds ARIA live region to announce conjunction alerts to screen readers.
export function OrbitAccessibilityAnnouncer() {
  const { conjunctions } = useAppState()

  const announcement = useMemo(() => {
    if (!conjunctions.length) return ""
    const latest = conjunctions[conjunctions.length - 1]
    return `Conjunction alert: ${latest.risk} risk. Object ${latest.secondaryName} approaching ${latest.satelliteName}. Miss distance: ${latest.missKm} km at ${latest.tca}.`
  }, [conjunctions])

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="additions"
      className="sr-only"
      style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}
    >
      {announcement}
    </div>
  )
}
