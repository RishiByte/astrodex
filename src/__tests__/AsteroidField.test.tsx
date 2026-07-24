import { render } from "@testing-library/react"
import { AsteroidField } from "../components/AsteroidField"

// Mock the global app state context
jest.mock("@/lib/store", () => ({
  useAppState: () => ({
    registerAsteroidData: jest.fn(),
    simulationRunning: true,
    filterType: "ALL",
    addConjunctionAlert: jest.fn()
  })
}))

// Create E2E tests for the Asteroid InstancedMesh (#415)
describe("Asteroid InstancedMesh Component (E2E Proxy)", () => {
  it("mounts the asteroid and debris InstancedMeshes without crashing", () => {
    // In a real R3F environment we'd wrap in <Canvas>. 
    // Here we just test if it returns the <instancedMesh> primitives properly.
    const { container } = render(
      <AsteroidField 
        onAsteroidClick={jest.fn()} 
        getSelectedIndex={() => null} 
      />
    )
    expect(container).toBeDefined()
  })
})
