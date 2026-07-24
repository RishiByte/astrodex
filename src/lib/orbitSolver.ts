/**
 * Decoupled Kepler's Equation Solver
 *
 * Implements the Newton-Raphson method to solve Kepler's equation M = E - e*sin(E)
 * for the eccentric anomaly E. Extracted for decoupled unit testing and reusability.
 */

/**
 * Solve Kepler's equation  M = E − e·sin(E)  for the eccentric anomaly E.
 *
 * Uses Newton-Raphson with an initial guess that handles the high-eccentricity
 * regime robustly (E₀ = π when e ≥ 0.8).
 *
 * @param M Mean anomaly in radians (can be any real value; wrapped to [−π, π]).
 * @param e Eccentricity in [0, 1).
 * @param tolerance Convergence threshold on |ΔE|, default 1e-7.
 */
export function solveKepler(M: number, e: number, tolerance = 1e-7): number {
  // Wrap M to [−π, π] so the initial guess is meaningful for any time t.
  const TAU = Math.PI * 2
  const m = ((M % TAU) + TAU + Math.PI) % TAU - Math.PI

  // Robust initial guess.
  let E = e < 0.8 ? m : Math.PI * Math.sign(m || 1)

  for (let i = 0; i < 40; i++) {
    const f = E - e * Math.sin(E) - m
    const fp = 1 - e * Math.cos(E)
    const dE = f / fp
    E -= dE
    if (Math.abs(dE) < tolerance) break
  }

  return E
}
