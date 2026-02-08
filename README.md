# SP Digital Studio & Color Lab

Professional photography & video services website for SP Digital Studio & Color Lab, established 1996 in Najafgarh, New Delhi.

## Live Website

Deployed on Vercel: [Coming Soon]

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **CMS**: Sanity (schemas ready)
- **Payments**: PayPal (Razorpay coming)
- **Email**: Resend
- **SMS**: Twilio (configured)
- **Images**: Cloudinary

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Animated hero, services, stats |
| About | `/about` | Founder story, timeline |
| Services | `/services` | 13 services with details |
| Portfolio | `/portfolio` | Filterable image gallery |
| Products | `/products` | Shop with cart |
| Checkout | `/checkout` | Multi-step checkout |
| Booking | `/booking` | Event booking form |
| Contact | `/contact` | Contact form + map |
| Testimonials | `/testimonials` | Client reviews |
| Equipment Rental | `/equipment-rental` | Rental pricing |
| Instant Services | `/instant-services` | Passport photos, prints |
| Restoration | `/restoration` | Photo restoration |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=

# Razorpay (after deployment)
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Resend (Email)
RESEND_API_KEY=

# Twilio (SMS)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Google
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Sanity (optional)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

## Database Setup

Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor to create all tables.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

Or use CLI:
```bash
npx vercel login
npx vercel --prod
```

## Contact

- **Phone**: +91 99106 43200
- **Email**: satpalsolanki1636@gmail.com
- **Address**: RZ-10, Vijay Park, Naya Bazar, Najafgarh, New Delhi - 110043

## License

Private - All rights reserved by SP Digital Studio & Color Lab
