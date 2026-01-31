import type { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Emergency Dental Care | Ottawa South Dental',
  description:
    'Same-day emergency dental appointments in Ottawa. Immediate relief for toothaches, broken teeth, lost fillings, and dental trauma. Call now for urgent dental care.',
  keywords: [
    'emergency dentist Ottawa',
    'urgent dental care',
    'same-day dental appointment',
    'toothache emergency',
    'broken tooth repair',
    'dental trauma',
    'emergency dental clinic Ottawa',
    'after-hours dentist',
    'Ottawa South Dental',
    'dental emergency near me',
  ],
  openGraph: {
    title: 'Emergency Dental Care | Ottawa South Dental',
    description:
      'Same-day emergency dental appointments. Immediate relief for toothaches, broken teeth, and dental trauma. Call now.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/services/emergency-care.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Dental Care at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Dental Care | Ottawa South Dental',
    description:
      'Same-day emergency dental appointments. Immediate relief for dental emergencies.',
    images: ['/images/services/emergency-care.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/emergency-care',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Emergency Care', url: '/services/emergency-care' },
];

// Service data for structured data
const serviceData = {
  name: 'Emergency Dental Care',
  description: 'Same-day emergency dental appointments in Ottawa. Immediate relief for toothaches, broken teeth, lost fillings, and dental trauma.',
  url: '/services/emergency-care',
  image: '/images/services/emergency-care.jpg',
};

// FAQ data for structured data
const faqItems = [
  {
    question: 'What constitutes a dental emergency?',
    answer: 'Dental emergencies include severe toothache, knocked-out teeth, broken or cracked teeth, lost fillings or crowns, dental abscesses, bleeding that won\'t stop, and injuries to the mouth or jaw.',
  },
  {
    question: 'Can I get a same-day appointment for a dental emergency?',
    answer: 'Yes, we reserve time in our schedule for dental emergencies and strive to see emergency patients the same day. Call us immediately if you have a dental emergency.',
  },
  {
    question: 'What should I do if a tooth is knocked out?',
    answer: 'Handle the tooth by the crown only, rinse gently without scrubbing, try to place it back in the socket if possible, or keep it moist in milk or saliva. See a dentist within 30 minutes for the best chance of saving the tooth.',
  },
  {
    question: 'How can I manage dental pain before my appointment?',
    answer: 'Take over-the-counter pain relievers as directed, apply a cold compress to the outside of your cheek, rinse with warm salt water, and avoid hot, cold, or sweet foods that may aggravate the pain.',
  },
];

export default function EmergencyCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Emergency Dental Care',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {children}
    </>
  );
}
