# 🚀 Deploy NOW (3 Steps)

## Step 1: Fix Supabase Database (2 min)

Your tables aren't showing because you need to run the SQL schema.

1. Go to https://supabase.com
2. Open your project
3. Click **SQL Editor** → **New Query**
4. Open `supabase/schema.sql` file
5. Copy ALL the SQL
6. Paste in Supabase SQL Editor
7. Click **Run**
8. Should say "Success"

**Verify:** Go to Table Editor → You should see 7 tables (leads, profiles, projects, etc.)

## Step 2: Push to GitHub (1 min)

```bash
cd construction-approval

# If not already initialized
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/your-repo.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (2 min)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Click "Deploy"
6. Wait 2 minutes ⏰

## Step 4: Add Environment Variables (1 min)

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://gtfwpixtwffcjydkistk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZndwaXh0d2ZmY2p5ZGtpc3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTMwMjMsImV4cCI6MjA4MDY2OTAyM30.bsEwqN8xoT-NRwTF336GMVpZ-3-8vzO7TQZe5pZL0h0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZndwaXh0d2ZmY2p5ZGtpc3RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5MzAyMywiZXhwIjoyMDgwNjY5MDIzfQ.mtSbNwWyTIAlUIvizBQy-JMU4Fv3qcECm54izjKvXqg
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=9491700493
```

Select: Production, Preview, Development

## Step 5: Redeploy (30 sec)

1. Go to Deployments tab
2. Click "..." on latest
3. Click "Redeploy"

## Done! 🎉

Your site is live at: `https://your-project.vercel.app`

## Test It

1. Visit your site
2. Fill the form
3. Check Supabase → Table Editor → leads
4. You should see the data!

## Test Database Connection

Visit: `https://your-project.vercel.app/api/test-db`

Should show:
```json
{
  "success": true,
  "message": "Database connection successful!",
  "totalLeads": 0
}
```

## Troubleshooting

**"relation does not exist"**
→ You didn't run schema.sql in Supabase

**"Invalid API key"**
→ Check environment variables in Vercel

**Site not loading**
→ Check Vercel deployment logs

---

**Need detailed guide?** See `DEPLOY_TO_VERCEL.md` or `FIX_SUPABASE.md`
