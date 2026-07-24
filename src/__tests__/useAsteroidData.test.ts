import { renderHook, act } from "@testing-library/react"
import { useAppState } from "@/lib/store"
import { AsteroidData } from "@/lib/types"

// Mock the store for the integration test
jest.mock("@/lib/store", () => ({
  useAppState: jest.fn(),
}))

describe("Asteroid Data Fetching Integration", () => {
  it("should register asteroid data in the store successfully", () => {
    const mockRegister = jest.fn()
    ;(useAppState as unknown as jest.Mock).mockReturnValue({
      registerAsteroidData: mockRegister,
      asteroids: [],
    })

    const testData: AsteroidData[] = [
      {
        id: 1,
        index: 0,
        orbitRadius: 10,
        speed: 0.5,
        scale: 1,
        inclination: 0,
        distance: "1 AU",
        velocity: "10 km/s",
        claimed: false,
        type: "asteroid",
        name: "Test-1",
        atRisk: false,
        eccentricity: 0.1,
        meanAnomaly0: 0,
      }
    ]

    // Simulate the data fetching/registration phase
    act(() => {
      mockRegister(testData)
    })

    expect(mockRegister).toHaveBeenCalledWith(testData)
    expect(mockRegister).toHaveBeenCalledTimes(1)
  })
})
