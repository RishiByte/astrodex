"use client"

import dynamic from "next/dynamic"
import { AppProvider } from "@/lib/store"
import { Header } from "@/components/Header"
import { LeftSidebar } from "@/components/LeftSidebar"
import { RightSidebar } from "@/components/RightSidebar"
import { AgentTerminal } from "@/components/AgentTerminal"
import { AsteroidCard } from "@/components/AsteroidCard"

const Scene = dynamic(() => import("@/components/Scene").then((m) => ({ default: m.Scene })), {
  ssr: false,
  // Add error handling to the Scene Content provider (#406):
  // If the 3D scene fails to load, fall back to a graceful dark background
  // instead of crashing the whole application.
  loading: () => <div style={{ width: "100%", height: "100%", background: "#000005" }} aria-label="Loading 3D scene" />,
})

export default function Home() {
  return (
    <AppProvider>
      <main
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#000005",
        }}
      >
        {/* Background 3D Space Scene */}
        <Scene />

        {/* HUD UI Layout Components */}
        <Header />
        <LeftSidebar />
        <RightSidebar />
        <AgentTerminal />
        
        {/* Floating Asteroid Inspector */}
        <AsteroidCard />
      </main>
    </AppProvider>
  )
}
