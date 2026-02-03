import type { Metadata } from 'next';
import { InvisalignContent } from './InvisalignContent';
import { InvisalignContentMobile } from './InvisalignContent-mobile';
import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Invisalign | Ottawa South Dental',
  description:
    'Clear aligner treatment at Ottawa South Dental. Straighten your teeth discreetly with Invisalign—nearly invisible, removable, and comfortable. See your results before you start. Book your consultation today!',
  keywords: [
    'Invisalign Ottawa',
    'clear aligners Ottawa',
    'invisible braces Ottawa',
    'teeth straightening Ottawa',
    'orthodontic treatment Ottawa',
    'clear braces',
    'Ottawa South Dental Invisalign',
    'removable aligners',
    'adult orthodontics',
    'teen Invisalign',
  ],
  openGraph: {
    title: 'Invisalign | Ottawa South Dental',
    description:
      'Straighten your teeth discreetly with Invisalign clear aligners. Nearly invisible, removable, and comfortable orthodontic treatment with predictable results.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/cosmetic/cosmetic-08.jpg',
        width: 1200,
        height: 630,
        alt: 'Invisalign Clear Aligners at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invisalign | Ottawa South Dental',
    description:
      'Clear aligner treatment for a straighter smile. Nearly invisible, removable aligners with predictable results. Book your consultation today!',
    images: ['/images/cosmetic/cosmetic-08.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/invisalign',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Invisalign', url: '/services/invisalign' },
];

// Service data for structured data
const serviceData = {
  name: 'Invisalign Clear Aligners',
  description: 'Clear aligner treatment at Ottawa South Dental. Straighten your teeth discreetly with Invisalign—nearly invisible, removable, and comfortable.',
  url: '/services/invisalign',
  image: '/images/cosmetic/cosmetic-08.jpg',
};

// FAQ data for structured data
const faqItems = [
  {
    question: 'How long does Invisalign treatment take?',
    answer: 'Treatment typically takes 12-18 months, though this varies based on the complexity of your case. Some minor cases can be completed in as few as 6 months. During your consultation, we\'ll provide a personalized timeline based on your specific needs.',
  },
  {
    question: 'How many hours a day should I wear my aligners?',
    answer: 'For best results, wear your aligners 20-22 hours per day, removing them only for eating, drinking (anything other than water), and oral hygiene. Consistent wear is essential for keeping your treatment on track.',
  },
  {
    question: 'Is Invisalign painful?',
    answer: 'You may experience some pressure or mild discomfort when starting a new set of aligners, but this typically subsides within a few days. Most patients find Invisalign significantly more comfortable than traditional braces since there are no metal brackets or wires to irritate your mouth.',
  },
  {
    question: 'Can I eat and drink with Invisalign?',
    answer: 'You should remove your aligners when eating or drinking anything other than water. This protects the aligners from damage and staining. Simply brush your teeth before putting them back in to maintain optimal oral hygiene.',
  },
  {
    question: 'Will people notice I\'m wearing aligners?',
    answer: 'Invisalign aligners are made from clear, medical-grade plastic that\'s virtually invisible. Most people won\'t notice you\'re wearing them unless you point them out. This makes Invisalign ideal for adults and teens who want to straighten their teeth discreetly.',
  },
];

export default function InvisalignPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Invisalign Clear Aligners',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <ResponsiveWrapper
        desktop={<InvisalignContent />}
        mobile={<InvisalignContentMobile />}
      />
    </>
  );
}
