import { solveKepler, meanMotion, visViva } from "../lib/kepler"

// Add unit tests for the Asteroid InstancedMesh — physics layer (#388)
describe("Asteroid InstancedMesh physics (Unit Tests)", () => {
  describe("solveKepler", () => {
    it("returns E ≈ M for circular orbit (e=0)", () => {
      const M = Math.PI / 4
      expect(solveKepler(M, 0)).toBeCloseTo(M, 5)
    })

    it("converges for high eccentricity (e=0.9)", () => {
      const E = solveKepler(Math.PI / 2, 0.9)
      expect(isFinite(E)).toBe(true)
    })
  })

  describe("meanMotion", () => {
    it("returns a positive value for positive semi-major axis", () => {
      expect(meanMotion(2.5)).toBeGreaterThan(0)
    })

    it("LEO orbit (a≈1.91 units) has period ~235 scene-seconds", () => {
      const n = meanMotion(1.91)
      const period = (2 * Math.PI) / n
      expect(period).toBeGreaterThan(200)
      expect(period).toBeLessThan(280)
    })
  })

  describe("visViva", () => {
    it("returns 0 for r=0 (guard clause)", () => {
      expect(visViva(0, 2)).toBe(0)
    })

    it("returns higher speed at perigee than apogee for elliptical orbit", () => {
      const a = 3, e = 0.5
      const rPeri = a * (1 - e)
      const rApo = a * (1 + e)
      expect(visViva(rPeri, a)).toBeGreaterThan(visViva(rApo, a))
    })
  })
})
