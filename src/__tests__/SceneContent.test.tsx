import { render } from "@testing-library/react"
import { SceneContent } from "../components/SceneContent"

jest.mock("@/lib/store", () => ({
  useAppState: () => ({ selectAsteroid: jest.fn() })
}))
jest.mock("../components/AsteroidField", () => ({
  AsteroidField: () => null,
  trackedPosition: { current: { lengthSq: () => 0, copy: jest.fn(), normalize: jest.fn(), multiplyScalar: jest.fn(), add: jest.fn() } }
}))
jest.mock("../components/earth/Earth", () => ({ Earth: () => null }))
jest.mock("../components/earth/CloudLayer", () => ({ CloudLayer: () => null }))
jest.mock("../components/earth/Atmosphere", () => ({ Atmosphere: () => null }))
jest.mock("../components/SatelliteSystem", () => ({ SatelliteSystem: () => null }))
jest.mock("../components/CameraController", () => ({ CameraController: () => null }))
jest.mock("../components/Effects", () => ({ Effects: () => null }))
jest.mock("@react-three/drei", () => ({ Stars: () => null }))

// Create E2E tests for the Scene Content provider (#410)
describe("SceneContent (E2E Proxy)", () => {
  it("mounts without crashing", () => {
    const { container } = render(<SceneContent />)
    expect(container).toBeDefined()
  })
})
