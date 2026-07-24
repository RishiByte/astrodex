"use client"

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

import { useState } from "react"
import { useFrame } from "@react-three/fiber"

function AutomatedVignette() {
  const [darkness, setDarkness] = useState(0.7)

  useFrame(({ clock }) => {
    // Automate the vignette darkness to pulse slightly
    setDarkness(0.7 + Math.sin(clock.elapsedTime * 2) * 0.05)
  })

  return (
    <Vignette
      offset={0.3}
      darkness={darkness}
      blendFunction={BlendFunction.NORMAL}
    />
  )
}

export function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.02}
        mipmapBlur
      />
      <AutomatedVignette />
    </EffectComposer>
  )
}
