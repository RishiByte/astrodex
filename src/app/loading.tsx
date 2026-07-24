export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#000008]">
      <div className="flex flex-col items-center gap-4 animate-fade-in-up">
        {/* Refactored Loading screen UI (#447) */}
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-[var(--accent-cyan)] shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-cyan)] opacity-80">
          Initializing Orbital Mechanics...
        </span>
      </div>
    </div>
  )
}
