"use client"

import { useEffect, useState } from "react"
import { Html, useProgress } from "@react-three/drei"

/**
 * WebGLFallback
 * 
 * Provides a fallback UI for the WebGL Canvas during loading and handles 
 * WebGL initialization errors gracefully.
 * 
 * Used inside a React Suspense boundary that wraps the 3D `<Canvas>`.
 * The `@react-three/drei` `useProgress` hook tracks the loading status of textures, models, and assets.
 * 
 * @returns An HTML overlay containing a styled spinner and loading progress.
 */
export function WebGLFallback() {
  const { progress, errors } = useProgress()
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    // If there are any asset loading errors from THREE.DefaultLoadingManager, flag it
    if (errors.length > 0) {
      setHasError(true)
    }
  }, [errors])

  if (hasError) {
    return (
      <Html center>
        <div style={{ color: "var(--accent-red)", textAlign: "center", width: 300, padding: 20, background: "rgba(0,0,0,0.8)", border: "1px solid var(--accent-red)", borderRadius: 8 }}>
          <h3 style={{ marginBottom: 10 }}>WebGL Error</h3>
          <p style={{ fontSize: 14 }}>Failed to initialize the 3D environment or load critical assets. Please check your graphics drivers or refresh the page.</p>
        </div>
      </Html>
    )
  }

  return (
    <Html center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* Loading Spinner */}
        <div 
          className="loading-spinner" 
          style={{
            width: 40, 
            height: 40, 
            border: "3px solid rgba(56, 189, 248, 0.2)",
            borderTop: "3px solid var(--accent-cyan)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} 
        />
        <div style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em" }}>
          INITIALIZING {Math.round(progress)}%
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  )
}
