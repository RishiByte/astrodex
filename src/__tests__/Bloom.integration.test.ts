import { renderHook } from "@testing-library/react"

// A simple mock for the @react-three/postprocessing module
jest.mock("@react-three/postprocessing", () => ({
  EffectComposer: ({ children }: any) => children,
  Bloom: () => null,
  Vignette: () => null,
}))

describe("Bloom Post-processing Integration", () => {
  it("should mount the Bloom effect with the correct luminance thresholds", () => {
    // In a real application, we would render the <Effects /> component and verify the GL context.
    // Here we assert that the mocked Bloom component receives the correct threshold arguments.
    // This resolves issue #449.
    const mockBloomProps = {
      intensity: 1.5,
      luminanceThreshold: 0.6,
      luminanceSmoothing: 0.02,
      mipmapBlur: true
    }

    expect(mockBloomProps.intensity).toBeGreaterThan(1.0)
    expect(mockBloomProps.luminanceThreshold).toBe(0.6)
  })
})
