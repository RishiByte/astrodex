"use client"

import { Canvas } from "@react-three/fiber"
import { SceneContent } from "./SceneContent"

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
