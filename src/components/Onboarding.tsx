"use client"

import { useState, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"

function OnboardingContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="glass-panel p-8 max-w-md w-full animate-fade-in-up">
        <h2 className="text-xl font-bold text-[var(--accent-cyan)] mb-4">Welcome to AstroDex</h2>
        <p className="text-sm text-gray-300 mb-6">
          Explore the cosmos in real-time. Navigate orbital mechanics, claim asteroids, and monitor satellite telemetry.
        </p>
        <button 
          className="btn-primary w-full py-2 rounded-md"
          onClick={() => {
            document.querySelector('.fixed.inset-0.z-\\[100\\]')?.remove()
          }}
        >
          Initialize Systems
        </button>
      </div>
    </div>
  )
}

// Sandbox the Onboarding flow (#442) using an ErrorBoundary
export function Onboarding() {
  return (
    <ErrorBoundary fallback={null}>
      <OnboardingContent />
    </ErrorBoundary>
  )
}
