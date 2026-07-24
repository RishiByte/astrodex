"use client"

import { useAppState } from "@/lib/store"

// Improve accessibility of the Asteroid data fetching hook (#398)
// This component wraps the asteroid list with ARIA live region announcements
// so screen readers announce when the asteroid catalog updates.
export function AsteroidListAccessibility({ count }: { count: number }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      style={{ position: "absolute", left: "-9999px" }}
    >
      {count > 0 ? `Loaded ${count} orbital objects in the catalog.` : "Loading orbital catalog..."}
    </div>
  )
}
