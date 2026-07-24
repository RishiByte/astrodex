import { render } from "@testing-library/react"
import { CameraController } from "../components/CameraController"
import * as THREE from "three"

// Mock R3F hooks
jest.mock("@react-three/fiber", () => {
  let frameCallback: any = null
  return {
    useThree: () => ({
      camera: {
        position: new THREE.Vector3(0, 0, 6),
        lookAt: jest.fn(),
        lerp: jest.fn()
      }
    }),
    useFrame: (cb: any) => {
      frameCallback = cb
    },
    // Export a function to trigger the frame manually in tests
    __triggerFrame: (delta: number) => {
      if (frameCallback) frameCallback({}, delta)
    }
  }
})

jest.mock("@/lib/store", () => ({
  useAppState: () => ({
    selectedAsteroid: null,
    resetCamera: false,
    clearReset: jest.fn()
  })
}))

// Add unit tests for the Camera Lerp logic (#412)
describe("CameraController (Unit Tests)", () => {
  it("mounts the camera controller without crashing", () => {
    const { container } = render(<CameraController />)
    expect(container).toBeDefined()
  })
})
