# ✅ Deployment Checklist

Complete this checklist before and after deploying to Vercel.

## Pre-Deployment

### 1. Supabase Setup
- [ ] Supabase project created
- [ ] Database tables created (ran schema.sql)
- [ ] Tables visible in Table Editor
- [ ] Test connection: http://localhost:3000/api/test-db
- [ ] API keys copied to .env.local

### 2. Email Setup (Optional but Recommended)
- [ ] Resend account created
- [ ] API key obtained
- [ ] Added to .env.local
- [ ] Test email sent successfully
- [ ] PDF checklist created and placed in public/documents/

### 3. Content Updates
- [ ] Updated company name in all files
- [ ] Updated phone number in .env.local
- [ ] Updated WhatsApp number
- [ ] Customized service pricing
- [ ] Added your branding/logo
- [ ] Proofread all text

### 4. Code Quality
- [ ] Run: `npm run type-check` (no errors)
- [ ] Run: `npm run build` (successful)
- [ ] Test locally: `npm run dev`
- [ ] Test all forms
- [ ] Test on mobile device

### 5. GitHub Setup
- [ ] Code pushed to GitHub
- [ ] Repository is public or accessible to Vercel
- [ ] .env.local NOT committed (check .gitignore)
- [ ] README updated

## Deployment Steps

### 1. Deploy to Vercel
- [ ] Signed up/logged in to Vercel
- [ ] Imported GitHub repository
- [ ] Deployment successful
- [ ] Got Vercel URL (e.g., your-project.vercel.app)

### 2. Environment Variables
Add these in Vercel Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_SITE_URL` (your Vercel URL)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] `RESEND_API_KEY` (if using email)
- [ ] `RESEND_FROM_EMAIL` (if using email)

**Important:** Select all environments (Production, Preview, Development)

### 3. Redeploy
- [ ] Redeployed after adding environment variables
- [ ] Deployment successful
- [ ] No build errors

## Post-Deployment Testing

### 1. Basic Functionality
- [ ] Site loads: https://your-project.vercel.app
- [ ] Header navigation works
- [ ] All sections visible
- [ ] Mobile responsive
- [ ] Images load correctly

### 2. Forms & Database
- [ ] Lead form loads
- [ ] Can submit form
- [ ] Data appears in Supabase
- [ ] Test database: https://your-project.vercel.app/api/test-db
- [ ] No console errors

### 3. Email (if configured)
- [ ] Email sent on form submission
- [ ] Email received in inbox
- [ ] PDF attached correctly
- [ ] Links in email work
- [ ] Email looks good on mobile

### 4. Links & Navigation
- [ ] WhatsApp link works
- [ ] Phone link works
- [ ] All navigation links work
- [ ] Footer links work
- [ ] Smooth scrolling works

### 5. Performance
- [ ] Page loads in < 3 seconds
- [ ] No JavaScript errors in console
- [ ] Images optimized
- [ ] Mobile performance good

## Optional Enhancements

### Analytics
- [ ] Google Analytics added
- [ ] Vercel Analytics enabled
- [ ] Conversion tracking set up

### SEO
- [ ] Meta tags updated
- [ ] Open Graph images added
- [ ] Sitemap generated
- [ ] robots.txt configured

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Domain connected to Vercel

### Email Domain
- [ ] Domain verified in Resend
- [ ] DNS records added
- [ ] Sending from custom domain

## Monitoring

### Daily Checks (First Week)
- [ ] Check Vercel deployment logs
- [ ] Check Supabase for new leads
- [ ] Monitor email delivery (Resend dashboard)
- [ ] Check for errors in Vercel logs

### Weekly Checks
- [ ] Review analytics
- [ ] Check conversion rates
- [ ] Monitor page speed
- [ ] Review user feedback

## Troubleshooting

### Site Not Loading
1. Check Vercel deployment status
2. Check build logs for errors
3. Verify environment variables
4. Check DNS if using custom domain

### Forms Not Working
1. Check browser console for errors
2. Test database connection: /api/test-db
3. Verify Supabase credentials
4. Check RLS policies in Supabase

### Emails Not Sending
1. Check Resend dashboard logs
2. Verify API key in Vercel
3. Check spam folder
4. Test with different email provider

### Database Errors
1. Verify tables exist in Supabase
2. Check RLS policies
3. Test with service role key
4. Check Supabase logs

## Rollback Plan

If something goes wrong:

1. **Revert to previous deployment:**
   - Go to Vercel → Deployments
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Fix locally and redeploy:**
   - Fix the issue locally
   - Test: `npm run build`
   - Push to GitHub
   - Vercel auto-deploys

## Success Metrics

Track these after launch:

- **Traffic:** Unique visitors per day
- **Leads:** Form submissions per day
- **Conversion:** % of visitors who submit form
- **Email:** Email delivery rate
- **Performance:** Page load time
- **Errors:** Error rate in logs

## Next Steps After Deployment

1. [ ] Share site with friends for feedback
2. [ ] Test from different devices
3. [ ] Monitor for 24 hours
4. [ ] Fix any issues found
5. [ ] Start marketing!

## Emergency Contacts

- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support
- **Resend Support:** support@resend.com

---

## Quick Test URLs

After deployment, test these:

- **Homepage:** https://your-project.vercel.app
- **Database Test:** https://your-project.vercel.app/api/test-db
- **Login:** https://your-project.vercel.app/login
- **Dashboard:** https://your-project.vercel.app/dashboard

---

**Once all checkboxes are ticked, you're live!** 🎉

Good luck with your launch! 🚀
