"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null)

  const handleAuth = async (action: "login" | "signup") => {
    setLoading(true)
    setMessage(null)
    
    try {
      const { error } = action === "login" 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })
        
      if (error) throw error
      
      setMessage({ 
        text: action === "login" ? "Login successful!" : "Check your email for confirmation link.",
        type: "success"
      })
    } catch (err: any) {
      setMessage({ text: err.message || "Authentication failed", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-panel" style={{ padding: "24px", width: "320px" }}>
      <h2 style={{ fontSize: "16px", marginBottom: "16px", color: "var(--text-primary)" }}>
        Authentication
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mc-input"
          style={{ width: "100%" }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mc-input"
          style={{ width: "100%" }}
        />
        
        {message && (
          <div style={{ 
            fontSize: "12px", 
            color: message.type === "error" ? "var(--accent-red)" : "var(--accent-green)",
            padding: "8px",
            background: message.type === "error" ? "rgba(248, 113, 113, 0.1)" : "rgba(52, 211, 153, 0.1)",
            borderRadius: "4px"
          }}>
            {message.text}
          </div>
        )}
        
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button
            onClick={() => handleAuth("login")}
            disabled={loading}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            {loading ? "..." : "Login"}
          </button>
          
          <button
            onClick={() => handleAuth("signup")}
            disabled={loading}
            className="btn-ghost"
            style={{ flex: 1 }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
