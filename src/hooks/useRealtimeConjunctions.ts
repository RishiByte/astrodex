"use client"

import { useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useAppState, ConjunctionAlert } from "@/lib/store"
import { RealtimeChannel } from "@supabase/supabase-js"

export function useRealtimeConjunctions() {
  const { addConjunctionAlert } = useAppState()
  const channelRef = useRef<RealtimeChannel | null>(null)
  
  useEffect(() => {
    // Edge case: don't duplicate channels on strict mode or hot reloads
    if (channelRef.current) return

    channelRef.current = supabase
      .channel("conjunctions_feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conjunctions",
        },
        (payload) => {
          // Edge case: Ignore malformed payloads
          if (!payload.new || !payload.new.satellite_name) return
          
          addConjunctionAlert({
            tca: payload.new.tca || "unknown",
            missKm: (payload.new.miss_km || 0).toString(),
            risk: payload.new.risk || "LOW",
            secondaryId: payload.new.secondary_id,
            secondaryName: payload.new.secondary_name,
            type: payload.new.type,
            satelliteName: payload.new.satellite_name,
          })
        }
      )
      .subscribe((status) => {
        // Edge case: Handle subscription failures
        if (status === "CHANNEL_ERROR") {
          console.error("Supabase Realtime Channel Error")
        }
      })

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [addConjunctionAlert])
}
