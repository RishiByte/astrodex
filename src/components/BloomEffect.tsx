"use client"

import { Bloom } from "@react-three/postprocessing"

// Decouple the Post-processing Bloom (#413)
export function BloomEffect() {
  return (
    <Bloom
      intensity={1.5}
      luminanceThreshold={0.6}
      luminanceSmoothing={0.02}
      mipmapBlur
    />
  )
}
