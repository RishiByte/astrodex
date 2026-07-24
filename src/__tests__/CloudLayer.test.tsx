import { render } from "@testing-library/react"

// Mock the canvas 2D API for CloudLayer's procedural texture
HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  fillRect: jest.fn(), beginPath: jest.fn(), ellipse: jest.fn(), fill: jest.fn(),
  moveTo: jest.fn(), lineTo: jest.fn(), closePath: jest.fn(), arc: jest.fn(),
  createRadialGradient: jest.fn().mockReturnValue({ addColorStop: jest.fn() }),
  isPointInPath: jest.fn().mockReturnValue(false),
  getImageData: jest.fn().mockReturnValue({ data: [] }),
}) as any

jest.mock("@react-three/fiber", () => ({
  useFrame: jest.fn(),
}))

// Add unit tests for the CloudLayer shader (#385)
describe("CloudLayer Shader (Unit Tests)", () => {
  it("createProceduralCloudTexture returns a canvas element", () => {
    const { createProceduralCloudTexture } = require("../components/earth/textures")
    const canvas = createProceduralCloudTexture()
    expect(canvas).toBeDefined()
    expect(canvas.width).toBeGreaterThan(0)
  })
})
