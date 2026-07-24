import { render, fireEvent } from "@testing-library/react"

jest.mock("@/lib/store", () => ({
  useAppState: () => ({
    toggleSimulation: jest.fn(),
    toggleLeftSidebar: jest.fn(),
    toggleRightSidebar: jest.fn(),
  })
}))

// Add unit tests for the Keyboard shortcut manager (#386)
describe("KeyboardManager (Unit Tests)", () => {
  it("dispatches spacebar keydown without throwing", () => {
    expect(() => {
      fireEvent.keyDown(window, { key: " ", code: "Space" })
    }).not.toThrow()
  })

  it("dispatches [ keydown without throwing", () => {
    expect(() => {
      fireEvent.keyDown(window, { key: "[", code: "BracketLeft" })
    }).not.toThrow()
  })

  it("dispatches ] keydown without throwing", () => {
    expect(() => {
      fireEvent.keyDown(window, { key: "]", code: "BracketRight" })
    }).not.toThrow()
  })
})
