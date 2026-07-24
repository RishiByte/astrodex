"use client"

import { Component, type ReactNode, type ErrorInfo } from "react"

// Fix edge cases in the React Error Boundary (#382)
// Handles: chunk load failures (dynamic imports), WebGL context loss, and R3F render errors.
interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, errorMessage: "" }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[AppErrorBoundary] Caught:", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div
          role="alert"
          style={{
            position: "fixed", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#000008", color: "#ef4444", fontFamily: "monospace",
          }}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>⚠ Render Error</h1>
          <p style={{ opacity: 0.7, fontSize: "13px" }}>{this.state.errorMessage}</p>
          <button
            onClick={() => this.setState({ hasError: false, errorMessage: "" })}
            style={{ marginTop: "20px", padding: "8px 20px", background: "#38bdf8", border: "none", borderRadius: "6px", cursor: "pointer", color: "#000" }}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
