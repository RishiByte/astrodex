"use client"

import { useAppState } from "@/lib/store"

/**
 * Analysis of Mobile Navbar:
 * - Current UI is optimized for desktop with heavy left/right sidebars.
 * - Mobile view needs a bottom tab-bar or a condensed top navbar with a hamburger menu.
 * - We use this component to conditionally render mobile controls when screen width < 768px.
 * - This resolves issue #467.
 */
export function MobileNavbar() {
  const { setLeftSidebarOpen, setRightSidebarOpen } = useAppState()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass-panel flex justify-around p-4 z-50">
      <button 
        className="btn-ghost text-xs" 
        onClick={() => setLeftSidebarOpen(prev => !prev)}
      >
        Toggle Catalog
      </button>
      <button 
        className="btn-ghost text-xs" 
        onClick={() => setRightSidebarOpen(prev => !prev)}
      >
        Toggle Settings
      </button>
    </div>
  )
}
