-- Add error handling to the Supabase Auth flow (#396)
-- This migration adds an auth_errors log table so failed auth events
-- can be audited instead of silently dropped.

CREATE TABLE IF NOT EXISTS auth_error_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  error_code  TEXT NOT NULL,
  error_msg   TEXT,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address  INET,
  context     JSONB
);

ALTER TABLE auth_error_log ENABLE ROW LEVEL SECURITY;

-- Only service role can read error logs (no user-facing access)
CREATE POLICY "Service role only"
  ON auth_error_log FOR ALL
  USING (auth.role() = 'service_role');
