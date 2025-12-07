# 🚀 Deploy to Vercel (5 Minutes)

## Step 1: Push to GitHub (2 min)

First, make sure your code is on GitHub:

```bash
cd construction-approval

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Construction Approval Platform"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/construction-approval.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel (2 min)

### Option A: Using Vercel Website (Easiest)

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In" (use GitHub)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

## Step 3: Add Environment Variables (1 min)

In Vercel Dashboard:

1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gtfwpixtwffcjydkistk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZndwaXh0d2ZmY2p5ZGtpc3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTMwMjMsImV4cCI6MjA4MDY2OTAyM30.bsEwqN8xoT-NRwTF336GMVpZ-3-8vzO7TQZe5pZL0h0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZndwaXh0d2ZmY2p5ZGtpc3RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5MzAyMywiZXhwIjoyMDgwNjY5MDIzfQ.mtSbNwWyTIAlUIvizBQy-JMU4Fv3qcECm54izjKvXqg
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=9491700493
RESEND_API_KEY=your_resend_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Important:** 
- Select "Production", "Preview", and "Development" for each variable
- Update `NEXT_PUBLIC_SITE_URL` after first deployment

## Step 4: Redeploy (30 sec)

After adding environment variables:

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"

## Your Site is Live! 🎉

Your URL will be: `https://your-project.vercel.app`

## Update Site URL

After deployment:

1. Copy your Vercel URL
2. Go to Settings → Environment Variables
3. Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
4. Redeploy

## Custom Domain (Optional)

To use your own domain:

1. Go to Settings → Domains
2. Add your domain
3. Update DNS records at your domain registrar
4. Wait for DNS propagation (5-30 minutes)

## Troubleshooting

### Build Failed
- Check build logs in Vercel
- Make sure all dependencies are in package.json
- Verify no TypeScript errors: `npm run type-check`

### Environment Variables Not Working
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding variables
- Check variable names match exactly

### Site Loads but Features Don't Work
- Check browser console for errors
- Verify Supabase connection
- Check API routes are working

## Monitoring

After deployment:

- **Analytics**: Vercel provides built-in analytics
- **Logs**: Check function logs in Vercel dashboard
- **Performance**: Monitor Core Web Vitals

## Continuous Deployment

Every time you push to GitHub:
- Vercel automatically deploys
- Preview deployments for pull requests
- Production deployment for main branch

## Next Steps

1. ✅ Test your live site
2. ✅ Submit a test form
3. ✅ Check Supabase for data
4. ✅ Test email delivery
5. ✅ Share with friends for feedback

---

**Your site is now live!** 🚀
