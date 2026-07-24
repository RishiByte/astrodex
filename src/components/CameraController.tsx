"use client"

import { useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useAppState } from "@/lib/store"
import { trackedPosition } from "./AsteroidField"

const EARTH_POSITION = new THREE.Vector3(0, 0, 6)
const EARTH_TARGET = new THREE.Vector3(0, 0, 0)

// Pre-allocate module-level vectors to prevent GC thrashing inside useFrame
const _offset = new THREE.Vector3()
const _lookTarget = new THREE.Vector3()

/**
 * Write inline documentation for the Camera Lerp logic (#411)
 * 
 * CameraController orchestrates the cinematic camera movements in the scene.
 * It uses a linear interpolation (Lerp) algorithm inside the React Three Fiber `useFrame`
 * hook to smoothly transition the camera position between Earth (default) and any
 * selected asteroid.
 * 
 * Performance Note: We intentionally pre-allocate `_offset` and `_lookTarget` 
 * globally to avoid instantiating new THREE.Vector3 objects at 60 FPS.
 */
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
