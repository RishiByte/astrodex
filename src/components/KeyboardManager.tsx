"use client"

import { useEffect, useCallback } from "react"
import { useAppState } from "@/lib/store"

// Improve accessibility of the Keyboard shortcut manager (#434)
export function KeyboardManager() {
  const { toggleSimulation, toggleLeftSidebar, toggleRightSidebar, selectAsteroid } = useAppState()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return
      }

      switch (e.key) {
        case " ":
          e.preventDefault()
          toggleSimulation()
          break
        case "Escape":
          e.preventDefault()
          selectAsteroid(null)
          break
        case "[":
          e.preventDefault()
          toggleLeftSidebar()
          break
        case "]":
          e.preventDefault()
          toggleRightSidebar()
          break
      }
    },
    [toggleSimulation, toggleLeftSidebar, toggleRightSidebar, selectAsteroid]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="sr-only" aria-live="polite">
      Keyboard shortcuts active. Press space to toggle simulation, escape to clear selection.
    </div>
  )
}
