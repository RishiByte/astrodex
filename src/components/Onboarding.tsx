"use client"

import { useState, useEffect } from "react"
import { useAppState } from "@/lib/store"

export function Onboarding() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show onboarding once per session/browser
    const hasSeenOnboarding = localStorage.getItem("astrodex_onboarding_seen")
    if (!hasSeenOnboarding) {
      setIsVisible(true)
    }
  }, [])

  const handleComplete = () => {
    setIsVisible(false)
    localStorage.setItem("astrodex_onboarding_seen", "true")
  }

  if (!isVisible) return null

  return (
    <div
      className="glass-panel"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "rgba(10, 16, 28, 0.95)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          borderRadius: "var(--radius-lg)",
          padding: "24px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            color: "var(--text-primary)",
            marginBottom: "16px",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Welcome to AstroDex
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
          Explore 600+ near-Earth objects in real-time. 
          Use the left panel to filter the catalog, and the terminal to monitor conjunctions. 
          Click on any asteroid in the 3D view to inspect its orbital parameters.
        </p>
        <button
          className="btn-primary"
          onClick={handleComplete}
          style={{ width: "100%", padding: "12px", fontWeight: "bold" }}
        >
          START EXPLORING
        </button>
      </div>
    </div>
  )
}
