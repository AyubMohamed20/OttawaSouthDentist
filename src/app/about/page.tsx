import type { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';
import { ResponsiveWrapper } from '@/components/ui/responsive-wrapper';
import { AboutContent } from './AboutContent';
import { AboutContentMobile } from './AboutContent-mobile';

// Page Metadata for SEO
export const metadata: Metadata = {
  title: 'About Us | Ottawa South Dental',
  description:
    'Learn about Ottawa South Dental, your trusted family dentist in Ottawa. Discover our practice history, philosophy, team, and commitment to compassionate dental care.',
  keywords: [
    'about Ottawa South Dental',
    'Ottawa dentist history',
    'family dentist Ottawa',
    'dental practice philosophy',
    'Ottawa dental team',
    'CDCP dentist Ottawa',
    'multilingual dentist Ottawa',
  ],
  openGraph: {
    title: 'About Us | Ottawa South Dental',
    description:
      'Discover Ottawa South Dental - a family practice dedicated to stress-free, patient-centered dental care.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Ottawa South Dental',
    description:
      'Discover Ottawa South Dental - a family practice dedicated to stress-free, patient-centered dental care.',
  },
  alternates: {
    canonical: '/about',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
];

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.aboutPage()} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />

      {/* Responsive content switching */}
      <ResponsiveWrapper
        desktop={<AboutContent />}
        mobile={<AboutContentMobile />}
      />
    </>
  );
}
