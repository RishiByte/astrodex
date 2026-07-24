"use client"

import { EffectComposer, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { BloomEffect } from "./BloomEffect"

export function Effects() {
  return (
    <EffectComposer>
      <BloomEffect />
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
