import type { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Routine Checkups | Ottawa South Dental',
  description:
    'Regular dental checkups every 6 months help prevent cavities, gum disease, and catch problems early. Comprehensive exams, oral cancer screening, and professional cleanings in Ottawa.',
  keywords: [
    'routine dental checkup',
    'dental examination',
    'dental checkup Ottawa',
    '6 month dental visit',
    'preventive dental care',
    'oral cancer screening',
    'dental cleaning',
    'family dentist Ottawa',
    'Ottawa South Dental',
    'dental exam near me',
  ],
  openGraph: {
    title: 'Routine Checkups | Ottawa South Dental',
    description:
      'Regular dental checkups every 6 months help prevent cavities, gum disease, and catch problems early. Book your comprehensive dental exam today.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/hygiene/hygiene-03.jpg',
        width: 1200,
        height: 630,
        alt: 'Routine Dental Checkup at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Routine Checkups | Ottawa South Dental',
    description:
      'Regular dental checkups every 6 months help prevent cavities, gum disease, and catch problems early. Book your exam today.',
    images: ['/images/hygiene/hygiene-03.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/routine-checkups',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Routine Checkups', url: '/services/routine-checkups' },
];

// Service data for structured data
const serviceData = {
  name: 'Routine Dental Checkups',
  description: 'Regular dental checkups every 6 months help prevent cavities, gum disease, and catch problems early. Comprehensive exams, oral cancer screening, and professional cleanings.',
  url: '/services/routine-checkups',
  image: '/images/hygiene/hygiene-03.jpg',
};

// FAQ data for structured data
const faqItems = [
  {
    question: 'How often should I have a dental checkup?',
    answer: 'Most patients should visit the dentist every 6 months for a routine checkup and cleaning. However, some patients may need more frequent visits based on their oral health needs.',
  },
  {
    question: 'What happens during a dental checkup?',
    answer: 'During a checkup, your dentist will thoroughly examine your teeth, gums, and mouth for any signs of problems. We\'ll check for cavities and tooth decay, evaluate your bite and jaw alignment, screen for oral cancer, and review your oral hygiene habits.',
  },
  {
    question: 'Why are regular checkups important if my teeth feel fine?',
    answer: 'Many dental problems don\'t cause pain in their early stages. Cavities, gum disease, and even oral cancer can develop without noticeable symptoms. Regular checkups allow us to catch these issues early when they\'re easier and less expensive to treat.',
  },
  {
    question: 'Are dental checkups covered by insurance?',
    answer: 'Most dental insurance plans cover preventive care, including routine checkups and cleanings, at 80-100%. Coverage typically includes two checkups per year.',
  },
];

export default function RoutineCheckupsLayout({
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
        name: 'Routine Dental Checkups',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {children}
    </>
  );
}
