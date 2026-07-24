"use client"

import { useMemo } from "react"

// Standardize formatting in the Leaderboard UI (#392)
// Leaderboard entries are sorted by claimCount descending, then by username ascending.
// All display values are formatted with consistent number/date formatting helpers.

interface LeaderboardEntry {
  rank: number
  username: string
  claimCount: number
  joinedAt: string
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

function formatRank(rank: number): string {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  return `#${rank}`
}

export function Leaderboard({ entries }: LeaderboardProps) {
  const sorted = useMemo(
    () => [...entries].sort((a, b) => b.claimCount - a.claimCount || a.username.localeCompare(b.username)),
    [entries]
  )

  return (
    <section aria-label="Leaderboard" style={{ fontFamily: "var(--font-geist-sans, sans-serif)" }}>
      <h2 style={{ color: "#38bdf8", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
        Explorer Rankings
      </h2>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {sorted.map((entry, i) => (
          <li
            key={entry.username}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 12px",
              background: i === 0 ? "rgba(56,189,248,0.08)" : "rgba(255,255,255,0.03)",
              borderRadius: "6px",
              fontSize: "13px",
            }}
          >
            <span style={{ width: "28px", textAlign: "center" }}>{formatRank(i + 1)}</span>
            <span style={{ flex: 1, color: "#e2e8f0" }}>{entry.username}</span>
            <span style={{ color: "#38bdf8", fontWeight: 600 }}>{entry.claimCount}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
