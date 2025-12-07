# Quick Setup Guide

## 1. Supabase Setup (5 minutes)

### Create Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Choose organization and set project name
4. Set a strong database password (save it!)
5. Choose region closest to your users (e.g., Mumbai for India)
6. Wait 2-3 minutes for project to be ready

### Get API Keys
1. Go to Project Settings (gear icon) > API
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Create Database Tables
1. Click "SQL Editor" in left sidebar
2. Click "New Query"
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

### Enable Phone Auth (Optional - for client login)
1. Go to Authentication > Providers
2. Enable "Phone" provider
3. Choose a provider (Twilio recommended for India)
4. Add Twilio credentials when ready

## 2. Local Development Setup

### Update Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your values
# Use any text editor
```

Fill in:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (keep secret!)
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 3. Test Lead Capture

1. Scroll to "Free Checklist" section
2. Fill in the form
3. Click "Download Free Checklist"
4. Check Supabase dashboard:
   - Go to Table Editor > leads
   - You should see your entry!

## 4. Create Sample PDF (Optional)

For now, the PDF download will fail. To fix:

1. Create a simple PDF checklist (use Canva/Google Docs)
2. Save as `approval-checklist.pdf`
3. Put it in `public/documents/` folder
4. Or update the download link in `components/lead-form.tsx`

## 5. Deploy to Vercel (10 minutes)

### Connect GitHub
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Vercel auto-detects Next.js

### Add Environment Variables
In Vercel dashboard:
1. Go to Settings > Environment Variables
2. Add all variables from `.env.local`
3. Make sure to add them for Production, Preview, and Development

### Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is live! 🎉

## 6. WhatsApp Integration (Later)

For WhatsApp notifications, you'll need:

### Option 1: WhatsApp Business API (Official)
- More reliable but requires approval
- Use providers like Gupshup, Interakt, or Twilio
- Cost: ~₹0.25-1 per message

### Option 2: Simple WhatsApp Link (Quick Start)
- Just use `https://wa.me/919876543210`
- Already implemented in hero section
- Free but manual

## Common Issues

### "Invalid API key"
- Double-check you copied the full key
- Make sure no extra spaces
- Restart dev server after changing .env.local

### "Row Level Security policy violation"
- Run the schema.sql again
- Make sure all policies were created

### Form not submitting
- Check browser console for errors
- Verify Supabase URL is correct
- Check if `leads` table exists

## Next Steps

1. ✅ Test lead capture form
2. ✅ Verify data in Supabase
3. 📝 Create actual PDF checklist
4. 🎨 Add your branding/logo
5. 📱 Update WhatsApp number
6. 🚀 Deploy to Vercel
7. 📊 Add Google Analytics

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs

## Cost Estimate

**Free Tier (Good for 6-12 months):**
- Supabase: Free (500MB DB, 1GB storage, 50K monthly active users)
- Vercel: Free (100GB bandwidth)
- Domain: ~₹800/year (.in domain)

**Total: ₹0/month + ₹800/year for domain**

You'll only need to upgrade when you get significant traffic!
