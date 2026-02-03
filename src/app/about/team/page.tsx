import type { Metadata } from 'next';
import { TeamContent } from './TeamContent';
import { TeamContentMobile } from './TeamContent-mobile';
import { ResponsiveWrapper } from '@/components/ui/responsive-wrapper';

export const metadata: Metadata = {
  title: 'Our Team | Ottawa South Dental',
  description:
    'Meet the experienced dentists at Ottawa South Dental. Our caring team of 6 dentists provides compassionate, patient-centered dental care for the whole family. Multilingual services available.',
  keywords: [
    'Ottawa dentists',
    'dental team Ottawa',
    'family dentist Ottawa South',
    'Dr. Harvinder Sidhu',
    'multilingual dentist Ottawa',
    'gentle dentist Ottawa',
    'Ottawa South Dental team',
    'patient-centered dental care',
    'anxiety-free dentistry Ottawa',
    'female dentists Ottawa',
  ],
  openGraph: {
    title: 'Our Team | Ottawa South Dental',
    description:
      'Meet our experienced team of 6 dentists dedicated to providing compassionate, personalized dental care for your whole family. Multilingual services available.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/dr.sidhu.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Harvinder Sidhu and the Ottawa South Dental Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team | Ottawa South Dental',
    description:
      'Meet our caring team of 6 dentists. Patient-centered care, multilingual services, and anxiety-free dentistry for your whole family.',
    images: ['/dr.sidhu.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/about/team',
  },
};

export default function TeamPage() {
  return (
    <ResponsiveWrapper
      desktop={<TeamContent />}
      mobile={<TeamContentMobile />}
    />
  );
}
