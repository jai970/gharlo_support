# Construction Approval Support Platform

A modern Next.js application for managing construction approval services with Supabase backend.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Custom components with shadcn/ui patterns

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

### 3. Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL to create all tables and policies

### 4. Configure Storage (Optional)

For document uploads:
1. Go to Storage in Supabase dashboard
2. Create a new bucket called `documents`
3. Set appropriate policies for file uploads

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
construction-approval/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client setup
│   └── utils.ts
├── supabase/             # Database schema
└── public/               # Static assets
```

## Features Implemented

### Landing Page
- ✅ Hero section with CTA
- ✅ Google-style header with navigation
- ✅ Pain vs Solution comparison
- ✅ Services showcase
- ✅ Lead capture form with email delivery
- ✅ Professional footer
- ✅ Responsive design
- ✅ Smooth animations

### Backend (Supabase)
- ✅ Database schema with RLS policies
- ✅ Lead capture system
- ✅ User authentication setup
- ✅ Project tracking structure
- ✅ Document management
- ✅ Status updates system

### Email System (Resend)
- ✅ Automated email delivery
- ✅ PDF attachment support
- ✅ Professional HTML templates
- ✅ Mobile-friendly emails
- ✅ Lead notification system

## Next Steps

### Phase 1 - MVP Launch (Week 1-2)
- [ ] Add WhatsApp integration
- [ ] Create actual PDF checklist
- [ ] Add testimonials section
- [ ] Add footer with contact info
- [ ] Set up analytics (Google Analytics/Plausible)
- [ ] Deploy to Vercel

### Phase 2 - Client Portal (Month 2)
- [ ] Phone OTP authentication
- [ ] Client dashboard
- [ ] Project status tracking
- [ ] Document upload functionality
- [ ] Admin panel for status updates

### Phase 3 - Automation (Month 3+)
- [ ] Razorpay payment integration
- [ ] WhatsApp notifications (Twilio/Gupshup)
- [ ] Email notifications
- [ ] Automated invoice generation
- [ ] Analytics dashboard

## Environment Variables

Required variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919XXXXXXXXX
```

## Database Schema

Main tables:
- `leads` - Lead capture from forms
- `profiles` - User profiles (extends auth.users)
- `projects` - Construction projects
- `documents` - Uploaded documents
- `status_updates` - Project status timeline
- `bookings` - Service bookings
- `payments` - Payment records

See `supabase/schema.sql` for complete schema.

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Make sure to add all environment variables in Vercel dashboard.

## Support

For issues or questions, contact: [your-email@example.com]

## License

MIT
