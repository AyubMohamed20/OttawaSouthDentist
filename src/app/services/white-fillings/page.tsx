import type { Metadata } from 'next';
import { WhiteFillingsContent } from './WhiteFillingsContent';
import { WhiteFillingsContentMobile } from './WhiteFillingsContent-mobile';
import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'White Fillings | Ottawa South Dental',
  description:
    'Natural-looking white fillings (composite fillings) at Ottawa South Dental. Mercury-free, tooth-colored restorations that blend seamlessly with your smile. Book your appointment today!',
  keywords: [
    'white fillings Ottawa',
    'composite fillings',
    'tooth-colored fillings',
    'mercury-free fillings',
    'dental fillings Ottawa',
    'cavity treatment Ottawa',
    'Ottawa South Dental fillings',
    'natural looking fillings',
    'amalgam replacement',
  ],
  openGraph: {
    title: 'White Fillings | Ottawa South Dental',
    description:
      'Restore your smile naturally with mercury-free white fillings. Our tooth-colored composite restorations blend seamlessly for beautiful, lasting results.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/cosmetic/cosmetic-10.jpg',
        width: 1200,
        height: 630,
        alt: 'White Fillings at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White Fillings | Ottawa South Dental',
    description:
      'Natural-looking, mercury-free white fillings for beautiful, lasting results. Book your appointment today!',
    images: ['/images/cosmetic/cosmetic-10.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/white-fillings',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'White Fillings', url: '/services/white-fillings' },
];

// Service data for structured data
const serviceData = {
  name: 'White Fillings',
  description: 'Natural-looking white fillings (composite fillings) at Ottawa South Dental. Mercury-free, tooth-colored restorations that blend seamlessly with your smile.',
  url: '/services/white-fillings',
  image: '/images/cosmetic/cosmetic-10.jpg',
};

export default function WhiteFillingsPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'White Fillings',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <ResponsiveWrapper
        desktop={<WhiteFillingsContent />}
        mobile={<WhiteFillingsContentMobile />}
      />
    </>
  );
}
