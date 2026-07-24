"use client"

import { useCallback, useMemo } from "react"
import { useAppState } from "@/lib/store"

// Update dependencies for the Asteroid data fetching hook (#380)
// This hook is the React adapter layer between the raw AsteroidData[] array
// (populated imperatively via registerAsteroidData) and any component that
// needs to query or display asteroid metadata.
// Dependencies: React 19 | Next.js 16 App Router

export function useAsteroidData() {
  const { registerAsteroidData, searchAsteroidById, selectedAsteroid } = useAppState()

  const register = useCallback((data: Parameters<typeof registerAsteroidData>[0]) => {
    registerAsteroidData(data)
  }, [registerAsteroidData])

  const search = useCallback((id: number) => {
    searchAsteroidById(id)
  }, [searchAsteroidById])

  return useMemo(() => ({
    register,
    search,
    selectedAsteroid,
  }), [register, search, selectedAsteroid])
}
