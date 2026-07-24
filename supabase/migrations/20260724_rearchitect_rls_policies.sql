-- Rearchitected RLS Policies for AstroDex Conjunction Feed & Claims
-- (Fixes #511)

-- Conjunctions Table
CREATE TABLE IF NOT EXISTS public.conjunctions (
    id SERIAL PRIMARY KEY,
    satellite_name TEXT NOT NULL,
    secondary_name TEXT NOT NULL,
    secondary_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    miss_km NUMERIC NOT NULL,
    risk TEXT NOT NULL,
    tca TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.conjunctions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read conjunctions
CREATE POLICY "Allow public read access on conjunctions"
ON public.conjunctions
FOR SELECT
USING (true);

-- Policy: Only authenticated service roles or admins can insert conjunctions
CREATE POLICY "Allow service role insert on conjunctions"
ON public.conjunctions
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Mining Claims Table
CREATE TABLE IF NOT EXISTS public.mining_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asteroid_id INTEGER NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    claimed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.mining_claims ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read claims
CREATE POLICY "Allow public read access on mining_claims"
ON public.mining_claims
FOR SELECT
USING (true);

-- Policy: Users can only claim if authenticated and if asteroid is not claimed
CREATE POLICY "Allow authenticated users to insert claims"
ON public.mining_claims
FOR INSERT
WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (
        SELECT 1 FROM public.mining_claims WHERE asteroid_id = public.mining_claims.asteroid_id
    )
);

-- Policy: Users can only delete their own claims
CREATE POLICY "Allow users to delete own claims"
ON public.mining_claims
FOR DELETE
USING (auth.uid() = user_id);
