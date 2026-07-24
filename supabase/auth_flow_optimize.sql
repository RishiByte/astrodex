-- Optimize the Supabase Auth flow (#376)
-- Adds a partial index on auth_error_log for fast recent-error lookups,
-- and a GIN index on the context JSONB column for operator filtering.

-- Fast lookup: most recent errors in the last 24 hours
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_auth_error_log_recent
  ON auth_error_log (created_at DESC)
  WHERE created_at > NOW() - INTERVAL '24 hours';

-- JSONB operator filtering (e.g., context->>'provider' = 'google')
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_auth_error_log_context_gin
  ON auth_error_log USING GIN (context);

-- Optimize: session lookups by user_id are frequent — add a covering index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_auth_error_log_user
  ON auth_error_log (user_id, created_at DESC);
