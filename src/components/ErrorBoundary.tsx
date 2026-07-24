"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
    // Here we can log the error to an error reporting service
  }

  public componentWillUnmount() {
    // Clean up to prevent memory leaks if necessary
    // e.g., clearing timers or event listeners
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#000',
          color: 'var(--accent-red)',
          flexDirection: 'column',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2>Something went wrong in the 3D scene.</h2>
          <p>{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-primary"
            style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
