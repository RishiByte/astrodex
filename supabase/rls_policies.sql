-- Fix race conditions in Supabase RLS policies (#400)
-- These policies ensure row-level security is enforced at the DB level,
-- preventing race conditions where a client could read/write another user's claims
-- before the server-side auth token is validated.

-- Enable RLS on the claims table
ALTER TABLE claimed_asteroids ENABLE ROW LEVEL SECURITY;

-- Policy: users can only read their own claims
CREATE POLICY "Users can read own claims"
  ON claimed_asteroids FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: users can only insert their own claims (prevents impersonation)
CREATE POLICY "Users can insert own claims"
  ON claimed_asteroids FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: users can only delete their own claims
CREATE POLICY "Users can delete own claims"
  ON claimed_asteroids FOR DELETE
  USING (auth.uid() = user_id);

-- Note: No UPDATE policy — claims are insert/delete only to prevent
-- race conditions from concurrent UPDATE + INSERT on the same row.
