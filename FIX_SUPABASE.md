# 🔧 Fix Supabase Database - Nothing Showing

If you don't see any tables in Supabase, follow these steps:

## Problem: Tables Not Created

You need to run the SQL schema to create the database tables.

## Solution: Run the Schema SQL

### Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com
2. Open your project: `gtfwpixtwffcjydkistk`
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### Step 2: Copy the Schema

Open the file: `supabase/schema.sql`

Or copy this entire SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  source TEXT DEFAULT 'website',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_type TEXT NOT NULL,
  construction_type TEXT,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  plot_area NUMERIC,
  built_up_area NUMERIC,
  status TEXT DEFAULT 'pending',
  current_stage TEXT,
  rejection_count INTEGER DEFAULT 0,
  approval_date DATE,
  estimated_timeline_days INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Status updates table
CREATE TABLE status_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  office_name TEXT,
  stage TEXT,
  updated_by UUID REFERENCES profiles(id),
  is_milestone BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings/Services table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  service_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_id TEXT,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads
CREATE POLICY "Admins can view all leads" ON leads
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for documents
CREATE POLICY "Users can view own project documents" ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = documents.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents to own projects" ON documents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = documents.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for status_updates
CREATE POLICY "Users can view own project status updates" ON status_updates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = status_updates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = payments.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_status_updates_project_id ON status_updates(project_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Run the SQL

1. Paste the entire SQL into the editor
2. Click **"Run"** button (or press Ctrl+Enter)
3. Wait for it to complete (should take 2-3 seconds)
4. You should see: **"Success. No rows returned"**

### Step 4: Verify Tables Created

1. Click **"Table Editor"** in left sidebar
2. You should now see these tables:
   - leads
   - profiles
   - projects
   - documents
   - status_updates
   - bookings
   - payments

## Test the Connection

### Method 1: Submit a Test Form

1. Go to your site: http://localhost:3000
2. Scroll to "Free Checklist" section
3. Fill out the form
4. Submit
5. Go to Supabase → Table Editor → leads
6. You should see your entry!

### Method 2: Insert Test Data Manually

In Supabase SQL Editor:

```sql
-- Insert a test lead
INSERT INTO leads (name, phone, email, city, source)
VALUES ('Test User', '9876543210', 'test@example.com', 'Bangalore', 'manual_test');

-- Check if it worked
SELECT * FROM leads;
```

## Common Issues

### "relation does not exist"
- You haven't run the schema SQL yet
- Run the complete schema.sql file

### "permission denied"
- RLS policies are blocking you
- Use the service role key for admin access
- Or disable RLS temporarily for testing

### "syntax error"
- Make sure you copied the ENTIRE SQL
- Don't miss any lines
- Run it all at once

### Tables exist but can't insert data
- Check RLS policies
- For testing, you can disable RLS:
```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

## Disable RLS for Testing (Optional)

If you want to test without authentication:

```sql
-- Disable RLS on leads table
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Re-enable when ready
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

## Check Current Tables

To see what tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

## Drop All Tables (Start Fresh)

If you need to start over:

```sql
-- WARNING: This deletes everything!
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS status_updates CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- Then run the schema.sql again
```

## Verify Connection from Your App

Create a test API route:

```typescript
// app/api/test-db/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .limit(5)
  
  return NextResponse.json({ data, error })
}
```

Visit: http://localhost:3000/api/test-db

## Success Checklist

- [ ] SQL schema ran without errors
- [ ] Tables visible in Table Editor
- [ ] Can insert test data manually
- [ ] Form submission works
- [ ] Data appears in Supabase
- [ ] No RLS errors

---

**Once tables are created, your database is ready!** 🎉

Need help? Check the Supabase logs in the dashboard.
