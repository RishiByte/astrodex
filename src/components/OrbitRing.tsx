"use client"

// Standardize formatting in the Orbit visualizer (#375)
// Formatting standards for orbit ring components:
// - All angle values in radians internally; convert to degrees only at display layer
// - Color values use CSS custom properties (var(--accent-cyan)) not hardcoded hex
// - Orbit ring meshes use BufferGeometry — never legacy Geometry
// - Ring opacity scales linearly with eccentricity: opacity = 1 - 0.5 * e

import { useMemo } from "react"
import * as THREE from "three"

interface OrbitRingProps {
  semiMajorAxis: number
  eccentricity: number
  color?: string
  opacity?: number
}

export function OrbitRing({ semiMajorAxis: a, eccentricity: e, color = "#38bdf8", opacity }: OrbitRingProps) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const b = a * Math.sqrt(1 - e * e) // semi-minor axis
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(a * Math.cos(theta), 0, b * Math.sin(theta)))
    }
    return pts
  }, [a, e])

  const effectiveOpacity = opacity ?? 1 - 0.5 * e

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={effectiveOpacity} />
    </line>
  )
}
