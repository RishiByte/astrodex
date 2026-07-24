"use client"

import { useState, useCallback } from "react"
import { useAppState } from "@/lib/store"

// Refactor the User profile modal (#397)
// Decoupled from sidebar, uses controlled open/close state with useCallback
interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { claimedAsteroids } = useAppState()

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(10,16,28,0.95)",
          border: "1px solid rgba(56,189,248,0.3)",
          borderRadius: "12px",
          padding: "32px",
          minWidth: "320px",
          color: "#e2e8f0",
        }}
      >
        <h2 id="profile-modal-title" style={{ color: "#38bdf8", marginBottom: "16px" }}>
          Explorer Profile
        </h2>
        <p>Claimed asteroids: <strong>{claimedAsteroids.size}</strong></p>
        <button
          onClick={onClose}
          aria-label="Close profile modal"
          style={{ marginTop: "24px", background: "#38bdf8", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer", color: "#000" }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
