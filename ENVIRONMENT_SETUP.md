# 🔐 Environment Variables Setup

This guide helps you set up all the environment variables needed for the project.

## Quick Setup

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Fill in your values (see below)

## Required Variables

### 1. Supabase Configuration

**Where to get these:**
1. Go to https://supabase.com
2. Open your project
3. Click Settings (⚙️) > API

```env
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Public anon key (safe to expose in browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service role key (KEEP SECRET! Never commit to git)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:**
- ✅ `NEXT_PUBLIC_*` variables are safe in browser
- ❌ `SUPABASE_SERVICE_ROLE_KEY` must stay secret
- Never commit `.env.local` to git (it's in .gitignore)

### 2. Site Configuration

```env
# Your website URL
# Local: http://localhost:3000
# Production: https://yourdomain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Your WhatsApp number (with country code, no + or spaces)
# Example: 919876543210 for +91 9876543210
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### 3. Payment Integration (Optional - Phase 3)

**Where to get these:**
1. Go to https://razorpay.com
2. Sign up for account
3. Go to Settings > API Keys

```env
# Razorpay Key ID (safe to expose)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Razorpay Secret (KEEP SECRET!)
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

**Note:** Start with test keys, switch to live keys when ready for production.

## Complete .env.local Example

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDAwMDAwMCwiZXhwIjoxOTk1NTc2MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210

# Payment (Optional)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

## Vercel Deployment

When deploying to Vercel, add these variables in:
1. Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add each variable
3. Select: Production, Preview, Development
4. Click "Save"

**Important for Vercel:**
- Update `NEXT_PUBLIC_SITE_URL` to your production URL
- Use production Razorpay keys (not test keys)
- Keep service role key secret

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore`
- Use different keys for development/production
- Rotate keys if exposed
- Use Vercel's environment variables for production
- Keep service role key secret

### ❌ DON'T:
- Commit `.env.local` to git
- Share service role key
- Use production keys in development
- Expose secrets in client-side code
- Hard-code sensitive values

## Testing Your Setup

### 1. Check Variables Are Loaded
Create a test page:
```typescript
// app/test-env/page.tsx
export default function TestEnv() {
  return (
    <div>
      <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}</p>
      <p>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌'}</p>
      <p>WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? '✅' : '❌'}</p>
    </div>
  )
}
```

Visit: http://localhost:3000/test-env

### 2. Test Supabase Connection
Try submitting the lead form. If it works, your Supabase setup is correct!

### 3. Test WhatsApp Link
Click the WhatsApp button in the hero section. It should open WhatsApp with your number.

## Troubleshooting

### "Can't connect to Supabase"
- Check URL is correct (no trailing slash)
- Verify anon key is complete (very long string)
- Restart dev server: `npm run dev`

### "Environment variable not found"
- Make sure file is named `.env.local` (not `.env`)
- Restart dev server after changes
- Check for typos in variable names

### "Form submission fails"
- Verify you ran `schema.sql` in Supabase
- Check browser console for errors
- Verify anon key has correct permissions

### "WhatsApp link doesn't work"
- Check number format: 919876543210 (no + or spaces)
- Test on mobile device
- Verify WhatsApp is installed

## Environment-Specific Configs

### Development (.env.local)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Use test/development keys
```

### Production (Vercel)
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
# Use production keys
```

### Staging (Optional)
```env
NEXT_PUBLIC_SITE_URL=https://staging.yourdomain.com
# Use separate staging database
```

## Additional Services (Future)

### Email (SendGrid/Resend)
```env
EMAIL_API_KEY=xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
```

### SMS (Twilio)
```env
TWILIO_ACCOUNT_SID=xxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+919876543210
```

### Analytics (Google)
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Need Help?

- **Supabase Docs**: https://supabase.com/docs/guides/getting-started
- **Next.js Env Vars**: https://nextjs.org/docs/basic-features/environment-variables
- **Vercel Env Vars**: https://vercel.com/docs/concepts/projects/environment-variables

---

**Security Reminder:** Never commit `.env.local` or share your service role key! 🔒
