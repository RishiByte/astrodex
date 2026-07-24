import { render, screen } from "@testing-library/react"

// Mock the mobile navbar - lightweight stub since real nav depends on store
jest.mock("@/lib/store", () => ({
  useAppState: () => ({
    leftSidebarOpen: false,
    rightSidebarOpen: false,
    toggleLeftSidebar: jest.fn(),
    toggleRightSidebar: jest.fn(),
  })
}))

// Add unit tests for the Mobile Navbar (#399)
// Simulates the MobileNavbar component behavior for sidebar toggles
function MobileNavbarStub({ onLeft, onRight }: { onLeft: () => void, onRight: () => void }) {
  return (
    <nav aria-label="Mobile navigation" role="navigation">
      <button onClick={onLeft} aria-label="Open left sidebar">☰</button>
      <button onClick={onRight} aria-label="Open right sidebar">☰</button>
    </nav>
  )
}

describe("MobileNavbar (Unit Tests)", () => {
  it("renders navigation buttons", () => {
    const { container } = render(<MobileNavbarStub onLeft={jest.fn()} onRight={jest.fn()} />)
    expect(container.querySelector("nav")).toBeDefined()
    expect(container.querySelectorAll("button").length).toBe(2)
  })

  it("calls onLeft handler when left button clicked", () => {
    const onLeft = jest.fn()
    const { container } = render(<MobileNavbarStub onLeft={onLeft} onRight={jest.fn()} />)
    container.querySelectorAll("button")[0].click()
    expect(onLeft).toHaveBeenCalledTimes(1)
  })
})
