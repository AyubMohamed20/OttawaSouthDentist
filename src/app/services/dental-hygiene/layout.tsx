import type { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Dental Hygiene | Ottawa South Dental',
  description:
    'Professional dental hygiene services in Ottawa including teeth cleaning, deep cleaning (scaling and root planing), and periodontal maintenance. Keep your smile healthy with our expert hygienists.',
  keywords: [
    'dental hygiene Ottawa',
    'teeth cleaning Ottawa',
    'deep cleaning dentist Ottawa',
    'scaling and root planing Ottawa',
    'periodontal maintenance Ottawa',
    'dental cleaning near me',
    'professional teeth cleaning',
    'Ottawa South Dental hygiene',
  ],
  openGraph: {
    title: 'Dental Hygiene | Ottawa South Dental',
    description:
      'Professional dental hygiene services including teeth cleaning, deep cleaning, and periodontal maintenance. Expert care for healthy gums and teeth.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Hygiene | Ottawa South Dental',
    description:
      'Professional dental hygiene services including teeth cleaning, deep cleaning, and periodontal maintenance.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/dental-hygiene',
  },
};

// FAQ data for structured data
const faqs = [
  {
    question: 'Why is professional cleaning important if I brush and floss regularly?',
    answer:
      'Even with excellent home care, plaque can build up in hard-to-reach areas that your toothbrush and floss cannot effectively clean. Over time, this plaque hardens into tartar (calculus), which can only be removed by professional dental instruments. Regular professional cleanings help prevent gum disease, cavities, and other oral health issues while keeping your breath fresh and your smile bright.',
  },
  {
    question: 'What is the difference between regular cleaning and deep cleaning?',
    answer:
      'Regular cleaning (prophylaxis) removes plaque and tartar from above the gum line and is ideal for patients with healthy gums. Deep cleaning (scaling and root planing) treats buildup below the gum line and smooths the tooth roots to help gums reattach. Deep cleaning is typically recommended for patients showing signs of gum disease, such as bleeding gums, receding gums, or periodontal pockets.',
  },
  {
    question: 'How often should I get my teeth professionally cleaned?',
    answer:
      'Most patients benefit from professional cleanings every 6 months. However, if you have gum disease, a history of cavities, or other risk factors, your dentist may recommend more frequent visits—typically every 3 to 4 months. During your appointment, our hygienists will assess your oral health and recommend a cleaning schedule tailored to your needs.',
  },
  {
    question: 'Does teeth cleaning hurt?',
    answer:
      'Professional teeth cleaning is generally comfortable for most patients. You may feel some pressure or slight sensitivity during the process, particularly if you have sensitive teeth or significant tartar buildup. For patients who experience anxiety or discomfort, we offer gentle techniques and can discuss options to ensure your comfort throughout the procedure.',
  },
  {
    question: 'What can I expect during a dental hygiene appointment?',
    answer:
      'Your appointment typically includes a thorough examination of your teeth and gums, removal of plaque and tartar using specialized instruments, polishing to remove surface stains, flossing between all teeth, and personalized oral hygiene instructions. We may also recommend fluoride treatment for additional protection. The entire process usually takes 45 minutes to an hour.',
  },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Dental Hygiene', url: '/services/dental-hygiene' },
];

// Service data for structured data
const serviceData = {
  name: 'Dental Hygiene',
  description: 'Professional dental hygiene services in Ottawa including teeth cleaning, deep cleaning (scaling and root planing), and periodontal maintenance.',
  url: '/services/dental-hygiene',
  image: '/images/hygiene/hygiene-01.jpg',
};

export default function DentalHygieneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqs)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Dental Hygiene Services',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {children}
    </>
  );
}
