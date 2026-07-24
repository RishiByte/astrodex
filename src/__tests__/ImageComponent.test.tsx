import { render, screen } from "@testing-library/react"
import Image from "next/image"
import "@testing-library/jest-dom"

describe("Next.js Image Component", () => {
  it("renders correctly with required props", () => {
    render(
      <Image
        src="/test-image.jpg"
        alt="Test Image"
        width={500}
        height={500}
      />
    )
    const img = screen.getByRole("img", { name: /test image/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src")
  })

  it("applies custom priority property", () => {
    render(
      <Image
        src="/test-priority.jpg"
        alt="Priority Image"
        width={100}
        height={100}
        priority
      />
    )
    const img = screen.getByRole("img", { name: /priority image/i })
    expect(img).toBeInTheDocument()
    // priority images should have fetchpriority="high" (or similar depending on Next.js version)
  })
})
