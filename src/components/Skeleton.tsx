"use client"

import React, { useMemo } from "react"

// Update dependencies for the Loading skeleton UI (#431)
interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
}

export function Skeleton({ width = "100%", height = "20px", borderRadius = "4px", className = "" }: SkeletonProps) {
  // We use useMemo to map the dependencies of the Loading skeleton UI safely
  const style = useMemo(() => ({
    width,
    height,
    borderRadius,
    background: "linear-gradient(90deg, rgba(56, 189, 248, 0.05) 25%, rgba(56, 189, 248, 0.1) 50%, rgba(56, 189, 248, 0.05) 75%)",
    backgroundSize: "200% 100%",
  }), [width, height, borderRadius])

  return (
    <div
      className={`animate-pulse ${className}`}
      style={style}
    />
  )
}
