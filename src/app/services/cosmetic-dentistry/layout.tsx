import { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Cosmetic Dentistry | Ottawa South Dental',
  description:
    'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers. Boost your confidence with a beautiful smile.',
  keywords: [
    'cosmetic dentistry Ottawa',
    'teeth whitening Ottawa',
    'dental veneers',
    'porcelain veneers Ottawa',
    'dental bonding',
    'smile makeover Ottawa',
    'gum contouring',
    'cosmetic dental work',
    'Ottawa South Dental',
    'beautiful smile',
  ],
  openGraph: {
    title: 'Cosmetic Dentistry | Ottawa South Dental',
    description:
      'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmetic Dentistry | Ottawa South Dental',
    description:
      'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/cosmetic-dentistry',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Cosmetic Dentistry', url: '/services/cosmetic-dentistry' },
];

// Service data for structured data
const serviceData = {
  name: 'Cosmetic Dentistry',
  description: 'Transform your smile with cosmetic dentistry at Ottawa South Dental. Teeth whitening, veneers, dental bonding, and complete smile makeovers.',
  url: '/services/cosmetic-dentistry',
  image: '/images/cosmetic/cosmetic-05.jpg',
};

// FAQ items for structured data
const faqItems = [
  {
    question: 'What cosmetic options are available for stained or discolored teeth?',
    answer:
      'We offer several options depending on the type and severity of staining. Professional teeth whitening is ideal for surface stains from coffee, tea, or wine. For deeper discoloration or teeth that don\'t respond to whitening, dental veneers or bonding can provide a permanently bright, natural-looking solution.',
  },
  {
    question: 'How long do dental veneers last?',
    answer:
      'With proper care, porcelain veneers typically last 10-15 years or longer. They\'re highly durable and resistant to staining.',
  },
  {
    question: 'Is teeth whitening safe for my enamel?',
    answer:
      'Yes, professional teeth whitening performed under dental supervision is completely safe for your enamel. We use carefully formulated whitening agents and monitor the process to ensure optimal results without damage.',
  },
  {
    question: 'What is the difference between veneers and dental bonding?',
    answer:
      'Both improve the appearance of teeth, but they differ in material, durability, and application. Veneers are thin porcelain shells custom-made in a lab and permanently bonded to teeth. Bonding uses tooth-colored composite resin applied directly to teeth in a single visit.',
  },
  {
    question: 'Is cosmetic dentistry covered by insurance?',
    answer:
      'Most cosmetic procedures are considered elective and may not be fully covered by dental insurance. However, some treatments that also restore function may have partial coverage.',
  },
];

export default function CosmeticDentistryLayout({
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
        name: 'Cosmetic Dentistry Services',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {children}
    </>
  );
}
