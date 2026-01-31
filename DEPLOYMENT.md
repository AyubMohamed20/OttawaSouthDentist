# Ottawa South Dental - Deployment Guide

## Pre-Deployment Checklist

### Critical Items (Must Fix Before Launch)

- [ ] **Verify Phone Number**: Three different numbers exist in the codebase:
  - `613-733-6446` (Header, Footer, service pages)
  - `613-733-1118` (Hero sections, about, contact)
  - `613-733-1312` (site-config.ts, metadata/structured data)
  - **Action Required**: Confirm the authoritative phone number and update all files

- [ ] **Replace Placeholder Team Photos**: Located in `src/app/about/team/TeamContent.tsx`
  - Files named `placeholder-female-1.jpg` through `placeholder-female-5.jpg`
  - Replace with actual team member photos in `/public/images/team/`

- [ ] **Implement Contact Form Backend**: Currently simulated in `src/app/contact/actions.ts`
  - Email sending is commented out with a 1-second delay simulation
  - Integrate with email service (SendGrid, AWS SES, Mailgun, etc.)

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://ottawasouthdental.com

# Analytics (Google Analytics 4)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form Email Service
# Choose one: SendGrid, AWS SES, Mailgun, Resend, etc.
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxx

# Alternative: AWS SES
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=ca-central-1
# SES_FROM_EMAIL=noreply@ottawasouthdental.com

# Alternative: Resend
# RESEND_API_KEY=re_xxxxxxxxxx

# Business Information (override site-config if needed)
NEXT_PUBLIC_PHONE_NUMBER=6137336446
NEXT_PUBLIC_EMAIL=info@ottawasouthdental.com

# Optional: Error Tracking
# SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Required for Production

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL for canonical links |
| `NEXT_PUBLIC_GA_ID` | Recommended | Google Analytics 4 measurement ID |
| `EMAIL_PROVIDER` | Yes | Email service for contact form |
| `SENDGRID_API_KEY` | If using SendGrid | API key for email delivery |

---

## Analytics Setup Guide

### Google Analytics 4 (GA4)

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property for "Ottawa South Dental"
   - Select "Web" as platform
   - Enter domain: `ottawasouthdental.com`

2. **Get Measurement ID**
   - Navigate to Admin > Data Streams > Web
   - Copy Measurement ID (format: `G-XXXXXXXXXX`)

3. **Add to Environment**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Implement Analytics Component**
   Create `src/components/analytics/GoogleAnalytics.tsx`:
   ```tsx
   'use client';

   import Script from 'next/script';

   export function GoogleAnalytics() {
     const gaId = process.env.NEXT_PUBLIC_GA_ID;

     if (!gaId) return null;

     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
           strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${gaId}');
           `}
         </Script>
       </>
     );
   }
   ```

5. **Add to Root Layout**
   In `src/app/layout.tsx`, import and add `<GoogleAnalytics />` component.

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://ottawasouthdental.com`
3. Verify ownership via:
   - HTML tag (add to `<head>` in layout.tsx)
   - DNS TXT record
   - Google Analytics (if already configured)
4. Submit sitemap: `https://ottawasouthdental.com/sitemap.xml`

### Recommended Tracking Events

```javascript
// Contact form submission
gtag('event', 'form_submit', {
  event_category: 'Contact',
  event_label: 'Contact Form'
});

// Phone click
gtag('event', 'click', {
  event_category: 'Contact',
  event_label: 'Phone Call'
});

// Appointment booking click
gtag('event', 'click', {
  event_category: 'Conversion',
  event_label: 'Book Appointment'
});
```

---

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   npx vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Add all variables from `.env.local`

3. **Configure Domain**
   - Add custom domain: `ottawasouthdental.com`
   - Configure DNS:
     - A Record: `76.76.21.21`
     - CNAME: `cname.vercel-dns.com`

4. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Option 2: Self-Hosted (Node.js)

1. **Build Production**
   ```bash
   npm run build
   ```

2. **Start Server**
   ```bash
   npm start
   # or with PM2
   pm2 start npm --name "ottawa-dental" -- start
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name ottawasouthdental.com www.ottawasouthdental.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name ottawasouthdental.com www.ottawasouthdental.com;

       ssl_certificate /etc/letsencrypt/live/ottawasouthdental.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/ottawasouthdental.com/privkey.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## SSL Certificate

### Using Let's Encrypt (Self-Hosted)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain Certificate
sudo certbot --nginx -d ottawasouthdental.com -d www.ottawasouthdental.com

# Auto-renewal (cron)
0 12 * * * /usr/bin/certbot renew --quiet
```

### Vercel

SSL is automatically provisioned when you add a custom domain.

---

## Post-Deployment Verification

### Technical Checks

- [ ] All pages load without errors
- [ ] Contact form submits successfully
- [ ] Phone links are clickable on mobile
- [ ] Images load properly
- [ ] SSL certificate is valid (green padlock)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

### SEO Verification

- [ ] Structured data validates: [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Mobile-friendly: [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Page speed: [PageSpeed Insights](https://pagespeed.web.dev/)

### Analytics Verification

- [ ] GA4 receiving data (check Real-Time report)
- [ ] Search Console showing indexed pages
- [ ] Form submission tracking working

---

## Monitoring & Maintenance

### Recommended Tools

1. **Uptime Monitoring**: UptimeRobot, Pingdom, or Better Uptime
2. **Error Tracking**: Sentry (free tier available)
3. **Performance Monitoring**: Vercel Analytics or SpeedCurve

### Regular Maintenance

- **Weekly**: Check contact form submissions, monitor analytics
- **Monthly**: Review Core Web Vitals, update dependencies
- **Quarterly**: Security audit, content review, SEO checkup

---

## Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Contact Form Not Working

1. Check email service API key is set
2. Verify email service quota not exceeded
3. Check server logs for error details
4. Test with a simple console.log first

### Images Not Loading

1. Verify images exist in `/public/images/`
2. Check image paths are correct (case-sensitive on Linux)
3. Ensure image optimization is configured in `next.config.mjs`

---

## Support Contacts

- **Technical Issues**: [Developer Contact]
- **Content Updates**: [Content Manager]
- **Hosting Support**: Vercel Support / Hosting Provider

---

*Last Updated: January 2026*
