import type { Metadata } from 'next';
import { OralSurgeryContent } from './OralSurgeryContent';
import { OralSurgeryContentMobile } from './OralSurgeryContent-mobile';
import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Oral Surgery | Ottawa South Dental',
  description:
    'Safe, comfortable oral surgery at Ottawa South Dental. Tooth extractions, wisdom teeth removal, bone grafting, and surgical procedures. Experienced team with gentle care. Book your consultation today!',
  keywords: [
    'oral surgery Ottawa',
    'tooth extraction Ottawa',
    'wisdom teeth removal Ottawa',
    'surgical extraction',
    'bone grafting Ottawa',
    'impacted wisdom teeth',
    'tooth removal Ottawa',
    'oral surgeon Ottawa South',
    'dental surgery Ottawa',
    'wisdom tooth extraction',
  ],
  openGraph: {
    title: 'Oral Surgery | Ottawa South Dental',
    description:
      'Expert oral surgery services including tooth extractions, wisdom teeth removal, and bone grafting. Comfortable, safe procedures with our experienced dental team.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/clinic/clinic-08.jpg',
        width: 1200,
        height: 630,
        alt: 'Oral Surgery Services at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oral Surgery | Ottawa South Dental',
    description:
      'Safe, comfortable oral surgery including extractions and wisdom teeth removal. Gentle care from our experienced team. Book your consultation today!',
    images: ['/images/clinic/clinic-08.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/oral-surgery',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Oral Surgery', url: '/services/oral-surgery' },
];

// Service data for structured data
const serviceData = {
  name: 'Oral Surgery',
  description: 'Safe, comfortable oral surgery at Ottawa South Dental. Tooth extractions, wisdom teeth removal, bone grafting, and surgical procedures.',
  url: '/services/oral-surgery',
  image: '/images/clinic/clinic-08.jpg',
};

export default function OralSurgeryPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Oral Surgery',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <ResponsiveWrapper
        desktop={<OralSurgeryContent />}
        mobile={<OralSurgeryContentMobile />}
      />
    </>
  );
}
