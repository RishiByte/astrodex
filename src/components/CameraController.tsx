"use client"

import { useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useAppState } from "@/lib/store"
import { trackedPosition } from "./AsteroidField"

const EARTH_POSITION = new THREE.Vector3(0, 0, 6)
const EARTH_TARGET = new THREE.Vector3(0, 0, 0)
const _offset = new THREE.Vector3()
const _lookTarget = new THREE.Vector3()

// Audit memory leaks in the Camera Lerp logic (#390)
// Audit results: No leaks found. Pre-allocated scratch vectors (_offset, _lookTarget)
// are module-level singletons — they are never GC'd and never grow.
// useEffect cleanup: clearReset() is a stable reference (no closure capture of mutable state).
// useFrame: uses `delta` from R3F's internal scheduler — no timer or interval to clean up.
export function CameraController() {
  const { camera } = useThree()
  const { selectedAsteroid, resetCamera, clearReset } = useAppState()
  const targetPos = useRef(EARTH_POSITION.clone())
  const targetLook = useRef(EARTH_TARGET.clone())
  const hasSelection = useRef(false)

  useEffect(() => {
    if (resetCamera) {
      hasSelection.current = false
      targetPos.current.copy(EARTH_POSITION)
      targetLook.current.copy(EARTH_TARGET)
      clearReset()
    }
  }, [resetCamera, clearReset])

  useEffect(() => {
    if (selectedAsteroid) {
      hasSelection.current = true
    }
  }, [selectedAsteroid])

  useFrame((_, delta) => {
    if (hasSelection.current) {
      const pos = trackedPosition.current
      if (pos.lengthSq() > 0) {
        targetLook.current.copy(pos)
        _offset.copy(pos).normalize().multiplyScalar(1.5)
        targetPos.current.copy(pos).add(_offset)
      }
    }

    camera.position.lerp(targetPos.current, 3 * delta)
    _lookTarget.copy(targetLook.current)
    camera.lookAt(_lookTarget)
  })

  return null
}
