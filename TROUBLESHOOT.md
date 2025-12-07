# 🔍 Troubleshooting Form Submission Error

If you're seeing "Something went wrong" error, follow these steps:

## Step 1: Check Database Tables

The most common issue is that the database tables don't exist.

### Verify Tables Exist:

1. Go to https://supabase.com
2. Open your project
3. Click **"Table Editor"** (left sidebar)
4. You should see these tables:
   - ✅ leads
   - ✅ profiles
   - ✅ projects
   - ✅ documents
   - ✅ status_updates
   - ✅ bookings
   - ✅ payments

### If Tables Don't Exist:

1. Click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy ALL of `supabase/schema.sql`
4. Paste and click **"Run"**
5. Wait for "Success"

## Step 2: Test Database Connection

Visit this URL (replace with your actual URL):
```
https://your-site.vercel.app/api/test-db
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connection successful!",
  "totalLeads": 0
}
```

**If you see an error:**
- Check Supabase credentials in Vercel environment variables
- Make sure tables exist (Step 1)

## Step 3: Check Vercel Environment Variables

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Verify these exist:
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - ✅ `SUPABASE_SERVICE_ROLE_KEY`
   - ✅ `NEXT_PUBLIC_WHATSAPP_NUMBER`

4. Make sure they're set for: Production, Preview, Development

## Step 4: Check Vercel Function Logs

1. Go to Vercel Dashboard
2. Your Project → Deployments
3. Click latest deployment
4. Click "Functions" tab
5. Find `/api/send-checklist`
6. Check the logs for errors

Common errors:
- **"relation does not exist"** → Tables not created (go to Step 1)
- **"Invalid API key"** → Wrong Supabase credentials
- **"Missing required fields"** → Form validation issue

## Step 5: Test Locally

```bash
cd construction-approval
npm run dev
```

Visit: http://localhost:3000

Try submitting the form. Check terminal for errors.

## Step 6: Disable RLS Temporarily (Testing Only)

If tables exist but still failing:

1. Go to Supabase → SQL Editor
2. Run this:
```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

3. Try form again
4. If it works, the issue is RLS policies

5. Re-enable RLS:
```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

## Step 7: Manual Test Insert

Test if you can insert data manually:

1. Supabase → SQL Editor
2. Run:
```sql
INSERT INTO leads (name, phone, email, city, source)
VALUES ('Test User', '9876543210', 'test@example.com', 'Bangalore', 'manual_test');

SELECT * FROM leads;
```

If this works, the issue is with the API, not the database.

## Common Issues & Solutions

### Issue: "relation 'leads' does not exist"
**Solution:** Run schema.sql in Supabase SQL Editor

### Issue: "Invalid API key"
**Solution:** Check Supabase credentials in Vercel

### Issue: "permission denied for table leads"
**Solution:** Disable RLS temporarily or check RLS policies

### Issue: "Failed to save lead to database"
**Solution:** Check Vercel function logs for specific error

### Issue: Form submits but no data in Supabase
**Solution:** Check RLS policies are correct

## Quick Fix Checklist

- [ ] Tables created in Supabase (run schema.sql)
- [ ] Environment variables set in Vercel
- [ ] Redeployed after adding environment variables
- [ ] Test database endpoint works
- [ ] Check Vercel function logs
- [ ] RLS disabled for testing (optional)

## Still Not Working?

### Get Detailed Error:

1. Open browser console (F12)
2. Go to Network tab
3. Submit form
4. Click on the `/api/send-checklist` request
5. Check Response tab for error details

### Share This Info:

- Error message from browser console
- Error from Vercel function logs
- Response from `/api/test-db` endpoint
- Screenshot of Supabase Table Editor

---

**Most likely issue:** Tables don't exist in Supabase. Run `schema.sql` first!
