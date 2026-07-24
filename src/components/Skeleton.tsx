"use client"

import React, { useMemo } from "react"

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
  // Fix edge cases in the Loading skeleton UI (#416): 
  // Add animation delay to prevent simultaneous flashing across many skeletons
  delay?: number 
}

export function Skeleton({ 
  width = "100%", 
  height = "20px", 
  borderRadius = "4px", 
  className = "",
  delay = 0
}: SkeletonProps) {
  
  const style = useMemo(() => ({
    width,
    height,
    borderRadius,
    background: "linear-gradient(90deg, rgba(56, 189, 248, 0.05) 25%, rgba(56, 189, 248, 0.1) 50%, rgba(56, 189, 248, 0.05) 75%)",
    backgroundSize: "200% 100%",
    animationDelay: `${delay}ms`
  }), [width, height, borderRadius, delay])

  return (
    <div
      className={`animate-pulse ${className}`}
      style={style}
      suppressHydrationWarning
    />
  )
}
