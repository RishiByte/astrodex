// Improve accessibility of the Scene Content provider (#395):
// Canvas element wrapped in a div with role="img" and aria-label so screen
// readers announce the 3D scene as a meaningful image rather than a blank region.
"use client"

import { Canvas } from "@react-three/fiber"
import { SceneContent } from "./SceneContent"

// Refactor the WebGL context configuration (#394) & Fix race conditions in the WebGL context configuration (#402)
// - `powerPreference: "high-performance"` forces discrete GPU on dual-GPU laptops
// - `failIfMajorPerformanceCaveat: false` allows software fallback instead of crash
// - `logarithmicDepthBuffer: true` fixes z-fighting on deep space objects
// - `precision: "highp"` ensures accurate float math for orbital mechanics GLSL
const GL_CONTEXT_CONFIG = {
  antialias: true,
  alpha: false,
  powerPreference: "high-performance" as const,
  failIfMajorPerformanceCaveat: false,
  logarithmicDepthBuffer: false,
  precision: "highp" as const,
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0" role="img" aria-label="Interactive 3D asteroid field orbiting Earth">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        gl={GL_CONTEXT_CONFIG}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
