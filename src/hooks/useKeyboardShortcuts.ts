"use client"

import { useEffect } from "react"
import { useAppState } from "@/lib/store"

export function useKeyboardShortcuts() {
  const {
    selectAsteroid,
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleTerminal,
  } = useAppState()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return
      }

      switch (e.key) {
        case "Escape":
          selectAsteroid(null)
          break
        case "[":
          toggleLeftSidebar()
          break
        case "]":
          toggleRightSidebar()
          break
        case "\\":
          toggleTerminal()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectAsteroid, toggleLeftSidebar, toggleRightSidebar, toggleTerminal])
}
