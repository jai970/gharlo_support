# 📧 Email Setup Guide (Resend)

This guide will help you set up email functionality to send the PDF checklist to users.

## Why Resend?

- **Free tier**: 100 emails/day, 3,000/month
- **Easy setup**: No complex configuration
- **Reliable**: Built by the Vercel team
- **Great for India**: Works globally
- **Modern API**: Simple to use

## Step 1: Create Resend Account (2 minutes)

1. Go to https://resend.com
2. Click "Sign Up" (free)
3. Sign up with GitHub or email
4. Verify your email

## Step 2: Get API Key (1 minute)

1. After login, go to **API Keys** in sidebar
2. Click "Create API Key"
3. Name it: `construction-approval-production`
4. Copy the key (starts with `re_`)
5. Save it securely (you won't see it again!)

## Step 3: Add to Environment Variables

### Local Development (.env.local)
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:** For testing, use `onboarding@resend.dev` (Resend's test email)

### Production (Vercel)
1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add `RESEND_API_KEY` with your key
3. Add `RESEND_FROM_EMAIL` with your email
4. Select: Production, Preview, Development

## Step 4: Verify Your Domain (Optional but Recommended)

To send from your own domain (e.g., `support@yourdomain.com`):

1. In Resend dashboard, go to **Domains**
2. Click "Add Domain"
3. Enter your domain: `yourdomain.com`
4. Add the DNS records shown (in your domain registrar)
5. Wait for verification (5-30 minutes)
6. Update `.env.local`:
   ```env
   RESEND_FROM_EMAIL=support@yourdomain.com
   ```

**DNS Records to Add:**
- **SPF**: TXT record for email authentication
- **DKIM**: TXT record for email signing
- **MX**: Mail exchange record (optional)

## Step 5: Create the PDF Checklist

You need to create the actual PDF file:

### Option 1: Use Canva (Easiest)
1. Go to https://canva.com
2. Search "Checklist Template"
3. Create your construction approval checklist
4. Download as PDF
5. Save as `public/documents/approval-checklist.pdf`

### Option 2: Use Google Docs
1. Create document in Google Docs
2. Add your checklist content
3. File > Download > PDF
4. Save as `public/documents/approval-checklist.pdf`

### Option 3: Use Microsoft Word
1. Create document in Word
2. Add your checklist content
3. Save As > PDF
4. Save as `public/documents/approval-checklist.pdf`

### What to Include in the PDF:
- **Cover page** with your branding
- **Introduction** about construction approvals
- **Document checklist** by category:
  - Ownership documents
  - Site documents
  - Plan documents
  - NOC documents
  - Other requirements
- **City-specific requirements** (Bangalore, Pune, Mumbai, etc.)
- **Common rejection reasons**
- **Timeline expectations**
- **Contact information**
- **Call to action** to book your services

## Step 6: Test Email Sending

### Test Locally
```bash
npm run dev
```

1. Go to http://localhost:3000
2. Scroll to "Free Checklist" section
3. Fill the form with YOUR email
4. Submit
5. Check your email inbox (and spam folder)

### Check Logs
If email doesn't arrive:
1. Check terminal for errors
2. Check Resend dashboard > Logs
3. Verify API key is correct
4. Check spam folder

## Troubleshooting

### "Invalid API key"
- Check you copied the full key
- Make sure it starts with `re_`
- Restart dev server after adding to .env.local

### "Email not received"
- Check spam folder
- Verify email address is correct
- Check Resend dashboard > Logs for delivery status
- Try with a different email provider (Gmail, Outlook)

### "PDF not attached"
- Make sure PDF exists at `public/documents/approval-checklist.pdf`
- Check file size (should be under 10MB)
- Verify file name matches exactly

### "Rate limit exceeded"
- Free tier: 100 emails/day
- Wait 24 hours or upgrade plan
- Check Resend dashboard for usage

## Email Template Customization

The email template is in: `app/api/send-checklist/route.ts`

You can customize:
- **Subject line**: Change the subject
- **Content**: Edit the HTML
- **Colors**: Match your branding
- **Services**: Update pricing
- **Contact info**: Add your details

## Cost Breakdown

### Free Tier (Perfect for Starting)
- 100 emails/day
- 3,000 emails/month
- All features included
- **Cost: ₹0**

### Paid Plans (When You Scale)
- **Pro**: $20/month (~₹1,600)
  - 50,000 emails/month
  - Custom domain
  - Priority support

### When to Upgrade?
- When you get 100+ leads/day
- When you need custom domain
- When you need higher limits

## Alternative Email Providers

If you prefer something else:

### SendGrid
- Free: 100 emails/day
- More complex setup
- Good for bulk emails

### Mailgun
- Free: 5,000 emails/month (first 3 months)
- Developer-friendly
- Good for transactional emails

### AWS SES
- Very cheap: $0.10 per 1,000 emails
- Complex setup
- Good for high volume

## Best Practices

### ✅ DO:
- Use a professional "from" email
- Keep subject line clear and relevant
- Include unsubscribe link (for marketing emails)
- Test emails before going live
- Monitor delivery rates in Resend dashboard
- Keep email content mobile-friendly

### ❌ DON'T:
- Send spam or unsolicited emails
- Use misleading subject lines
- Send without user consent
- Forget to attach the PDF
- Use all caps in subject
- Send too frequently

## Email Deliverability Tips

To ensure emails reach inbox (not spam):

1. **Verify your domain** (most important)
2. **Use professional content** (no spammy words)
3. **Include unsubscribe link**
4. **Don't use URL shorteners**
5. **Keep good sender reputation**
6. **Warm up your domain** (start with low volume)

## Testing Checklist

Before going live:

- [ ] Resend API key added to .env.local
- [ ] PDF file created and placed in public/documents/
- [ ] Test email sent to yourself
- [ ] Email received in inbox (not spam)
- [ ] PDF attachment opens correctly
- [ ] All links in email work
- [ ] Email looks good on mobile
- [ ] Tested with different email providers (Gmail, Outlook, Yahoo)

## Production Deployment

When deploying to Vercel:

1. Add `RESEND_API_KEY` to Vercel environment variables
2. Update `RESEND_FROM_EMAIL` to your verified domain
3. Make sure PDF is in the repository
4. Test on production URL
5. Monitor Resend dashboard for delivery

## Support

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: support@resend.com
- **Status Page**: https://status.resend.com

## Quick Start Commands

```bash
# Install Resend (already done)
npm install resend

# Test locally
npm run dev

# Check for errors
# Look at terminal output when submitting form
```

---

**You're all set!** Once you add your Resend API key and create the PDF, emails will be sent automatically when users download the checklist. 🎉
