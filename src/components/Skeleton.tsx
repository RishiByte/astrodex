// Standardize formatting in the Loading skeleton UI (#378)
// Standards: useMemo for all inline style objects, explicit prop types,
// suppressHydrationWarning on animated elements, aria attributes for error states.
"use client"

import React, { useMemo } from "react"

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  delay?: number
  error?: boolean
}

export function Skeleton({ width = "100%", height = "20px", borderRadius = "4px", delay = 0, error = false }: SkeletonProps) {
  const style = useMemo(() => ({
    width,
    height,
    borderRadius,
    background: error
      ? "rgba(239,68,68,0.15)"
      : "linear-gradient(90deg, rgba(56,189,248,0.05) 25%, rgba(56,189,248,0.1) 50%, rgba(56,189,248,0.05) 75%)",
    backgroundSize: "200% 100%",
    animationDelay: `${delay}ms`,
    border: error ? "1px solid rgba(239,68,68,0.3)" : "none",
  }), [width, height, borderRadius, delay, error])

  return (
    <div
      className={error ? "" : "animate-pulse"}
      style={style}
      role={error ? "alert" : undefined}
      aria-label={error ? "Failed to load content" : undefined}
      suppressHydrationWarning
    />
  )
}
