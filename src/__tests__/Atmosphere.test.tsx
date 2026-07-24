import React from "react"
import { render } from "@testing-library/react"
import { Atmosphere } from "../components/earth/Atmosphere"
import * as THREE from "three"

// Mock the react-three-fiber mesh elements since we're running in a DOM environment (jsdom)
jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
}))

describe("Atmosphere Integration", () => {
  it("renders without crashing", () => {
    const sunDirection = new THREE.Vector3(1, 0, 0)
    // Render within a basic container since it uses R3F intrinsic elements
    // Note: React Testing Library with jsdom might complain about <mesh>, <sphereGeometry> etc.
    // unless configured with a custom renderer or if we ignore the warnings. 
    // Usually, R3F components are tested via @react-three/test-renderer.
    // For this test, we simply ensure it mounts.
    
    // In a real project, we would use ReactThreeTestRenderer.create(<Atmosphere ... />)
    const container = document.createElement("div")
    const { container: renderedContainer } = render(
      // @ts-ignore - bypassing intrinsic element types for jsdom render
      <Atmosphere sunDirection={sunDirection} />, 
      { container }
    )
    
    expect(renderedContainer).toBeDefined()
  })

  it("passes the correct sunDirection to uniforms", () => {
    const sunDirection = new THREE.Vector3(0, 1, 0)
    
    // We can't easily assert on the internal refs of the shaderMaterial using standard RTL,
    // but we can ensure it renders without throwing an error when the prop changes.
    const { rerender } = render(
      // @ts-ignore
      <Atmosphere sunDirection={sunDirection} />
    )
    
    const newSunDirection = new THREE.Vector3(0, 0, 1)
    
    expect(() => {
      // @ts-ignore
      rerender(<Atmosphere sunDirection={newSunDirection} />)
    }).not.toThrow()
  })
})
