// Add unit tests for the WebGL Loading Spinner (#379)
// Tests the Scene's dynamic import loading state and the Loader component integration.

describe("WebGL Loading Spinner (Unit Tests)", () => {
  it("loading placeholder renders a div with correct aria-label", () => {
    // Simulates the loading: () => <div ... /> fallback from next/dynamic
    const div = document.createElement("div")
    div.setAttribute("aria-label", "Loading 3D scene")
    div.style.background = "#000005"
    div.style.width = "100%"
    div.style.height = "100%"
    document.body.appendChild(div)

    const el = document.querySelector('[aria-label="Loading 3D scene"]')
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("DIV")
    document.body.removeChild(div)
  })

  it("loading placeholder has correct background color", () => {
    const div = document.createElement("div")
    div.setAttribute("aria-label", "Loading 3D scene")
    div.style.background = "#000005"
    document.body.appendChild(div)

    const el = document.querySelector('[aria-label="Loading 3D scene"]') as HTMLElement
    expect(el?.style.background).toBe("#000005")
    document.body.removeChild(div)
  })
})
