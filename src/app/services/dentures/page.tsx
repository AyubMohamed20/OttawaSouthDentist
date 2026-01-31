import type { Metadata } from 'next';
import { DenturesContent } from './DenturesContent';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Dentures | Ottawa South Dental',
  description:
    'Quality dentures at Ottawa South Dental. Full dentures, partial dentures, and implant-supported dentures to restore your smile and confidence. Expert fitting and comfortable, natural-looking results. Book your consultation today!',
  keywords: [
    'dentures Ottawa',
    'full dentures Ottawa',
    'partial dentures Ottawa',
    'implant-supported dentures',
    'denture fitting Ottawa',
    'tooth replacement Ottawa',
    'removable dentures',
    'Ottawa South Dental dentures',
    'affordable dentures',
    'natural-looking dentures',
  ],
  openGraph: {
    title: 'Dentures | Ottawa South Dental',
    description:
      'Restore your smile with quality dentures. Full dentures, partial dentures, and implant-supported options for natural-looking, comfortable tooth replacement.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/seniors/seniors-01.jpg',
        width: 1200,
        height: 630,
        alt: 'Senior patient smiling with dentures at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dentures | Ottawa South Dental',
    description:
      'Quality dentures for a confident smile. Full, partial, and implant-supported options available. Book your consultation today!',
    images: ['/images/seniors/seniors-01.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/dentures',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Dentures', url: '/services/dentures' },
];

// Service data for structured data
const serviceData = {
  name: 'Dentures',
  description: 'Quality dentures at Ottawa South Dental. Full dentures, partial dentures, and implant-supported dentures to restore your smile and confidence.',
  url: '/services/dentures',
  image: '/images/seniors/seniors-01.jpg',
};

export default function DenturesPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Dentures',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <DenturesContent />
    </>
  );
}
