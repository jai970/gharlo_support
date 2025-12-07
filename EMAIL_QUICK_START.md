# 📧 Email Quick Start (2 Minutes)

Get email sending working in 2 minutes!

## Step 1: Get Resend API Key (1 min)

1. Go to https://resend.com/signup
2. Sign up (free)
3. Go to **API Keys** → Click "Create API Key"
4. Copy the key (starts with `re_`)

## Step 2: Add to .env.local (30 sec)

Open `.env.local` and add:

```env
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:** Use `onboarding@resend.dev` for testing (it's free and works immediately)

## Step 3: Create PDF (30 sec for now)

For testing, create a simple PDF:

1. Open any text editor
2. Write: "Construction Approval Checklist - Coming Soon!"
3. Print to PDF
4. Save as: `public/documents/approval-checklist.pdf`

**Or download a sample:** You can use any PDF temporarily for testing.

## Step 4: Test It! (30 sec)

```bash
npm run dev
```

1. Go to http://localhost:3000
2. Scroll to "Free Checklist" section
3. Fill form with YOUR email
4. Click "Download Free Checklist"
5. Check your email! 📧

## That's It!

✅ Email will be sent with PDF attached
✅ Lead saved to Supabase
✅ Professional email template
✅ Works on mobile

## What Happens When User Submits?

1. Form data saved to Supabase `leads` table
2. Email sent to user with PDF attached
3. Beautiful HTML email with your branding
4. PDF also downloads in browser (backup)
5. Success message shown

## Email Template Includes:

- Welcome message with user's name
- What's inside the PDF
- Your services and pricing
- Contact buttons (Call & WhatsApp)
- Professional design
- Mobile-friendly

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify API key in .env.local
- Restart dev server: `npm run dev`
- Check terminal for errors

**PDF not attached?**
- Make sure file exists: `public/documents/approval-checklist.pdf`
- Check file name matches exactly
- File size should be under 10MB

**Form not submitting?**
- Check browser console (F12)
- Verify Supabase is set up
- Check terminal for API errors

## Free Tier Limits

- **100 emails/day**
- **3,000 emails/month**
- Perfect for starting out!

## Next Steps

1. ✅ Test with your email
2. ✅ Create proper PDF checklist (use Canva)
3. ✅ Customize email template
4. ✅ Add your branding
5. ✅ Deploy to production

## Production Setup

When deploying to Vercel:

1. Add `RESEND_API_KEY` to Vercel environment variables
2. Keep `RESEND_FROM_EMAIL=onboarding@resend.dev` (or use your verified domain)
3. Deploy!

## Cost

**Free forever** for up to 3,000 emails/month!

---

**Need detailed guide?** See `EMAIL_SETUP.md`

**Ready to test?** Run `npm run dev` and try it! 🚀
