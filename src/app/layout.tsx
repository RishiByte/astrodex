// Update dependencies for the Next.js routing layer (#374)
// Next.js 16 App Router | Turbopack | React 19
// suppressHydrationWarning prevents hydration mismatches from browser extension DOM mutations.
// Fonts: Geist (sans) + JetBrains Mono loaded via next/font/google for zero-CLS font loading.
import type { Metadata } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AstroDex — Interactive 3D Asteroid Explorer",
  description:
    "Explore 600+ asteroids orbiting Earth in real-time 3D. Track conjunctions, inspect orbital parameters, and claim discoveries in this cinematic space mission control.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
