import React from "react"
import { render } from "@testing-library/react"
import { Effects } from "../components/Effects"

// Mock the Drei and Postprocessing components
jest.mock("@react-three/postprocessing", () => ({
  EffectComposer: ({ children }: any) => <div data-testid="effect-composer">{children}</div>,
  Bloom: () => <div data-testid="bloom-effect" />,
  Vignette: () => <div data-testid="vignette-effect" />,
}))

// Mock React Three Fiber's useFrame since Effects uses it
jest.mock("@react-three/fiber", () => ({
  useFrame: () => null,
}))

describe("Effects Component (Bloom Unit Tests)", () => {
  it("renders the EffectComposer with Bloom and Vignette effects", () => {
    // Render the Effects component
    // This resolves issue #438
    const { getByTestId } = render(<Effects />)
    
    // Assert that the effect composer and its children are mounted
    expect(getByTestId("effect-composer")).toBeInTheDocument()
    expect(getByTestId("bloom-effect")).toBeInTheDocument()
    expect(getByTestId("vignette-effect")).toBeInTheDocument()
  })
})
