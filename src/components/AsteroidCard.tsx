"use client"

import { useAppState } from "@/lib/store"

export function AsteroidCard() {
  const {
    selectedAsteroid,
    claimedAsteroids,
    claimAsteroid,
    leftSidebarOpen,
    selectAsteroid,
  } = useAppState()

  if (!selectedAsteroid) return null

  const isClaimed = claimedAsteroids.has(selectedAsteroid.id)

  return (
    <div
      className="glass-panel animate-fade-in-left"
      style={{
        position: "fixed",
        top: "calc(var(--header-height) + 16px)",
        left: leftSidebarOpen ? "calc(var(--sidebar-width) + 24px)" : "24px",
        width: "300px",
        zIndex: 42,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        background: "rgba(10, 16, 28, 0.9)",
        transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: isClaimed ? "var(--accent-green)" : "var(--accent-cyan)",
              boxShadow: isClaimed
                ? "0 0 6px var(--accent-green)"
                : "0 0 6px var(--accent-cyan)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
            }}
          >
            Inspector: {selectedAsteroid.name}
          </span>
        </div>
        <button
          className="btn-ghost"
          onClick={() => selectAsteroid(null)}
          style={{ padding: 4, border: "none" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px" }}>
        {/* Claim Status Badge */}
        {isClaimed && (
          <div
            style={{
              marginBottom: 12,
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(52, 211, 153, 0.08)",
              border: "1px solid rgba(52, 211, 153, 0.2)",
              color: "var(--accent-green)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>STATUS: CLAIMED & SECURED</span>
            <span style={{ fontSize: 9, opacity: 0.8 }}>SEC-REG</span>
          </div>
        )}

        {/* Orbit Visual Diagram Placeholder or Stats */}
        <div className="panel-section" style={{ marginBottom: 14 }}>
          <div className="panel-section-title">Orbital Mechanics</div>
          {[
            { label: "Semi-Major Axis", value: `${(selectedAsteroid.orbitRadius * 0.15).toFixed(3)} AU` },
            { label: "Mean Orbit Radius", value: `${selectedAsteroid.orbitRadius.toFixed(2)} R⊕` },
            { label: "Inclination Angle", value: `${(selectedAsteroid.inclination * (180 / Math.PI)).toFixed(1)}°` },
            { label: "Object Velocity", value: selectedAsteroid.velocity },
            { label: "Est. Diameter", value: `${(selectedAsteroid.scale * 120).toFixed(1)} km` },
            { label: "Relative Dist.", value: selectedAsteroid.distance },
          ].map((stat, idx) => (
            <div className="kv-row" key={idx}>
              <span className="kv-label">{stat.label}</span>
              <span className="kv-value">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => claimAsteroid(selectedAsteroid.id)}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "var(--radius-md)",
              backgroundColor: isClaimed ? "rgba(248, 113, 113, 0.12)" : "rgba(56, 189, 248, 0.12)",
              borderColor: isClaimed ? "rgba(248, 113, 113, 0.4)" : "rgba(56, 189, 248, 0.4)",
              color: isClaimed ? "var(--accent-red)" : "var(--accent-cyan)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {isClaimed ? "Release Mining Claim" : "File Mining Claim"}
          </button>
        </div>
      </div>
    </div>
  )
}
