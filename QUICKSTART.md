# 🚀 Quick Start (5 Minutes)

Get your construction approval platform running locally in 5 minutes!

## Step 1: Install & Run (2 min)

```bash
cd construction-approval
npm install
npm run dev
```

Visit: http://localhost:3000

You'll see the landing page! 🎉

## Step 2: Set Up Supabase (3 min)

### Create Account
1. Go to https://supabase.com
2. Sign up (free)
3. Click "New Project"
4. Name it: `construction-approval`
5. Set password (save it!)
6. Choose region: Mumbai/Singapore
7. Wait 2 minutes ⏰

### Get Your Keys
1. Click Settings (⚙️) > API
2. Copy these:
   - Project URL
   - anon public key

### Update .env.local
```bash
# Open .env.local and paste your keys:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### Create Tables
1. In Supabase, click "SQL Editor"
2. Click "New Query"
3. Copy ALL of `supabase/schema.sql`
4. Paste and click "Run"
5. Should say "Success" ✅

## Step 3: Test It! (1 min)

1. Refresh http://localhost:3000
2. Scroll to "Free Checklist" section
3. Fill the form
4. Click "Download"
5. Go to Supabase > Table Editor > leads
6. See your data! 🎊

## That's It!

Your platform is running. Now you can:

- ✅ Capture leads
- ✅ Store data in Supabase
- ✅ See beautiful landing page
- ✅ Mobile responsive

## What's Working

- Hero section with CTA
- Pain vs Solution comparison
- Services showcase (4 services)
- Lead capture form
- Supabase integration
- Responsive design
- Smooth animations

## What's Next

See `SETUP.md` for:
- WhatsApp integration
- Client dashboard
- Payment integration
- Deployment to Vercel

## Need Help?

Common issues:

**"Can't connect to Supabase"**
- Check .env.local has correct keys
- Restart dev server: `npm run dev`

**"Form not working"**
- Make sure you ran schema.sql
- Check browser console for errors

**"Page looks broken"**
- Clear browser cache
- Try incognito mode

## Pro Tips

1. **Test on mobile**: Open http://localhost:3000 on your phone (same WiFi)
2. **Edit content**: All text is in component files, easy to change
3. **Change colors**: Edit Tailwind classes (emerald-600 = green)
4. **Add logo**: Put image in `public/` folder

## File Structure

```
construction-approval/
├── app/
│   ├── page.tsx          ← Landing page
│   ├── dashboard/        ← Client portal (Phase 2)
│   └── login/            ← Login page (Phase 2)
├── components/
│   ├── hero-section.tsx  ← First screen
│   ├── services-section.tsx
│   └── lead-form.tsx     ← Form that saves to Supabase
├── lib/supabase/         ← Database connection
└── supabase/
    └── schema.sql        ← Database tables
```

## Customize It

### Change Colors
Find/replace in all files:
- `emerald-600` → `blue-600` (or any Tailwind color)

### Change Text
Edit these files:
- `components/hero-section.tsx` - Main headline
- `components/services-section.tsx` - Service prices
- `components/pain-solution-section.tsx` - Pain points

### Add Your Logo
1. Put logo.png in `public/`
2. Add to hero-section.tsx:
```tsx
<img src="/logo.png" alt="Logo" className="h-12" />
```

### Update Phone Number
In `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

## Deploy (Optional)

```bash
# Push to GitHub
git add .
git commit -m "Initial setup"
git push

# Deploy to Vercel
# Go to vercel.com
# Import your GitHub repo
# Add environment variables
# Deploy!
```

Your site will be live at: `your-project.vercel.app`

---

**You're all set!** 🎉

Start customizing and building your construction approval business.
