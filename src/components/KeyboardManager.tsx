"use client"

import { useEffect, useState } from "react"
import { useAppState } from "@/lib/store"

// Update styling for the Keyboard shortcut manager (#418)
export function KeyboardManager() {
  const { toggleSimulation, toggleLeftSidebar, toggleRightSidebar } = useAppState()
  const [lastAction, setLastAction] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return
      }

      switch (e.key) {
        case " ":
          e.preventDefault()
          toggleSimulation()
          setLastAction("Toggled Simulation")
          break
        case "[":
          toggleLeftSidebar()
          setLastAction("Toggled Left Sidebar")
          break
        case "]":
          toggleRightSidebar()
          setLastAction("Toggled Right Sidebar")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSimulation, toggleLeftSidebar, toggleRightSidebar])

  return (
    <div
      aria-live="polite"
      className="sr-only"
      style={{
        position: "absolute",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(10, 16, 28, 0.95)",
        border: "1px solid var(--accent-cyan)",
        boxShadow: "0 0 15px var(--accent-cyan-dim)",
        borderRadius: "var(--radius-sm)",
        padding: "8px 16px",
        color: "var(--accent-cyan)",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "0.05em",
        zIndex: 999,
        pointerEvents: "none",
        opacity: lastAction ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {lastAction && `Keyboard Shortcut Activated: ${lastAction}`}
    </div>
  )
}
