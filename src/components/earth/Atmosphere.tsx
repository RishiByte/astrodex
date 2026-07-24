"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform vec3 sunDirection;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldNormal;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vPosition);

  // Optical depth approximation based on viewing angle
  float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
  fresnel = pow(fresnel, 4.0);

  vec3 sunDir = normalize(sunDirection);
  
  // Diffuse lighting from sun
  float sunFace = dot(normalize(vWorldNormal), sunDir);
  
  // Soften the terminator line for atmospheric scattering
  float terminator = smoothstep(-0.2, 0.2, sunFace);
  float daySide = clamp(sunFace * 0.5 + 0.5, 0.0, 1.0);

  // Rayleigh-like scattering color approximation
  vec3 dayColor = vec3(0.3, 0.6, 1.0); // Blue sky
  vec3 sunsetColor = vec3(0.8, 0.4, 0.2); // Sunset hues

  // Mix colors based on proximity to the terminator line
  vec3 atmosphereColor = mix(sunsetColor, dayColor, terminator);

  // Final alpha computation combining fresnel rim and day side
  float alpha = fresnel * daySide * 0.7;

  gl_FragColor = vec4(atmosphereColor, alpha);
}
`

interface AtmosphereProps {
  sunDirection: THREE.Vector3
}

export function Atmosphere({ sunDirection }: AtmosphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef({
    sunDirection: { value: sunDirection.clone() },
  })

  useEffect(() => {
    uniformsRef.current.sunDirection.value.copy(sunDirection)
  }, [sunDirection])

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.0, 64, 64]} />
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  )
}
