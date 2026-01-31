import type { Metadata } from 'next';
import { TeethWhiteningContent } from './TeethWhiteningContent';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Teeth Whitening | Ottawa South Dental',
  description:
    'Professional teeth whitening at Ottawa South Dental using the Spa-Dent LED light-activated system. Achieve a brighter, whiter smile in a single visit with safe, effective results. Book your appointment today!',
  keywords: [
    'teeth whitening Ottawa',
    'professional teeth whitening',
    'Spa-Dent whitening',
    'LED teeth whitening',
    'cosmetic dentistry Ottawa',
    'tooth whitening',
    'bright smile Ottawa',
    'Ottawa South Dental whitening',
    'in-office teeth whitening',
    'safe teeth whitening',
  ],
  openGraph: {
    title: 'Teeth Whitening | Ottawa South Dental',
    description:
      'Transform your smile with professional Spa-Dent LED whitening. Safe, effective results in a single visit at Ottawa South Dental.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/cosmetic/cosmetic-15.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Teeth Whitening at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teeth Whitening | Ottawa South Dental',
    description:
      'Professional LED teeth whitening for a brighter, whiter smile. Safe and effective results in a single visit!',
    images: ['/images/cosmetic/cosmetic-15.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/teeth-whitening',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Teeth Whitening', url: '/services/teeth-whitening' },
];

// Service data for structured data
const serviceData = {
  name: 'Professional Teeth Whitening',
  description: 'Professional teeth whitening at Ottawa South Dental using the Spa-Dent LED light-activated system. Achieve a brighter, whiter smile in a single visit.',
  url: '/services/teeth-whitening',
  image: '/images/cosmetic/cosmetic-15.jpg',
};

export default function TeethWhiteningPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Teeth Whitening',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <TeethWhiteningContent />
    </>
  );
}
