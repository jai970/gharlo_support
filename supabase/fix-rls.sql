-- Fix RLS policy for leads table to allow public inserts
-- This allows the form to submit leads without authentication

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Admins can view all leads" ON leads;

-- Create new policies that allow public inserts
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Service role can view all leads" ON leads
  FOR SELECT 
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

-- Verify RLS is enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
