import type { Metadata } from 'next';
import { DentalImplantsContent } from './DentalImplantsContent';
import { DentalImplantsContentMobile } from './DentalImplantsContent-mobile';
import { ResponsiveWrapper } from '@/components/responsive-wrapper';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Dental Implants | Ottawa South Dental',
  description:
    'Permanent dental implants at Ottawa South Dental. Single tooth replacement, implant-supported dentures, and All-on-4 solutions. Natural-looking, long-lasting results. Book your consultation today!',
  keywords: [
    'dental implants Ottawa',
    'tooth implants Ottawa',
    'single tooth implant',
    'implant-supported dentures',
    'All-on-4 implants Ottawa',
    'tooth replacement Ottawa',
    'permanent tooth replacement',
    'Ottawa South Dental implants',
    'titanium dental implants',
    'missing tooth solution',
  ],
  openGraph: {
    title: 'Dental Implants | Ottawa South Dental',
    description:
      'Restore your smile with permanent dental implants. Natural-looking, long-lasting tooth replacement solutions including single implants, bridges, and implant-supported dentures.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/implants/implants-08.jpg',
        width: 1200,
        height: 630,
        alt: 'Dental Implants at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants | Ottawa South Dental',
    description:
      'Permanent dental implant solutions for missing teeth. Natural-looking results that last a lifetime. Book your consultation today!',
    images: ['/images/implants/implants-08.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/dental-implants',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Dental Implants', url: '/services/dental-implants' },
];

// Service data for structured data
const serviceData = {
  name: 'Dental Implants',
  description: 'Permanent dental implants at Ottawa South Dental. Single tooth replacement, implant-supported dentures, and All-on-4 solutions. Natural-looking, long-lasting results.',
  url: '/services/dental-implants',
  image: '/images/implants/implants-08.jpg',
};

// FAQ data for structured data
const faqItems = [
  {
    question: 'Am I a candidate for dental implants?',
    answer: 'Most adults with good general health are candidates for dental implants. Adequate jawbone density is needed to support the implant, though bone grafting procedures can help those who have experienced bone loss. During your consultation, we\'ll evaluate your oral health, medical history, and bone structure to determine if implants are right for you.',
  },
  {
    question: 'How long do dental implants last?',
    answer: 'With proper care and maintenance, dental implants can last a lifetime. The titanium implant post integrates permanently with your jawbone. The crown (visible tooth portion) may need replacement after 10-15 years due to normal wear, but the implant itself is designed to be a permanent solution.',
  },
  {
    question: 'Is the dental implant procedure painful?',
    answer: 'The implant procedure is performed under local anesthesia, ensuring you feel no pain during the surgery. Most patients report that the procedure is less uncomfortable than they expected. Post-operative discomfort is typically manageable with over-the-counter pain medication and usually subsides within a few days.',
  },
  {
    question: 'How long does the entire implant process take?',
    answer: 'The complete implant process typically takes 3-6 months from start to finish. After the implant post is placed, a healing period of 3-6 months allows for osseointegration (bone fusion). Once healed, the abutment and crown are placed. Some cases may qualify for same-day implants with immediate loading.',
  },
  {
    question: 'How do I care for my dental implants?',
    answer: 'Dental implants are easy to maintain—care for them just like your natural teeth. Brush twice daily, floss regularly, and maintain routine dental checkups. While implants cannot develop cavities, the surrounding gum tissue still needs proper care to prevent gum disease and ensure long-term success.',
  },
];

export default function DentalImplantsPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Dental Implants Services',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <ResponsiveWrapper
        desktop={<DentalImplantsContent />}
        mobile={<DentalImplantsContentMobile />}
      />
    </>
  );
}
