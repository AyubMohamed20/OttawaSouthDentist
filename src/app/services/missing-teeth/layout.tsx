import type { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Missing Teeth Solutions | Ottawa South Dental',
  description:
    'Comprehensive missing teeth replacement options in Ottawa including dental implants, bridges, partial and full dentures. Restore your smile and confidence with our expert tooth replacement solutions.',
  keywords: [
    'missing teeth Ottawa',
    'tooth replacement Ottawa',
    'dental bridges Ottawa',
    'partial dentures Ottawa',
    'full dentures Ottawa',
    'implant-supported dentures Ottawa',
    'replace missing tooth Ottawa',
    'Ottawa South Dental tooth replacement',
  ],
  openGraph: {
    title: 'Missing Teeth Solutions | Ottawa South Dental',
    description:
      'Comprehensive tooth replacement options including dental implants, bridges, and dentures. Expert solutions to restore your smile and oral function.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Missing Teeth Solutions | Ottawa South Dental',
    description:
      'Comprehensive tooth replacement options including dental implants, bridges, and dentures.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/missing-teeth',
  },
};

const faqs = [
  {
    question: 'What is the best option for replacing a missing tooth?',
    answer:
      'The best option depends on your specific situation, including the location of the missing tooth, bone density, budget, and personal preferences. Dental implants are often recommended as the ideal solution because they preserve bone, look natural, and can last a lifetime. However, bridges may be preferred when neighboring teeth need crowns, and dentures offer a cost-effective solution for multiple missing teeth. During your consultation, we\'ll discuss all options and recommend the best choice for your needs.',
  },
  {
    question: 'How long after extraction can I get a tooth replacement?',
    answer:
      'The timeline varies depending on your chosen replacement option. In some cases, an implant can be placed immediately after extraction (immediate implant placement). Otherwise, a healing period of 2-3 months is typical before implant placement. Bridges and dentures can often be started sooner, with temporary solutions available while permanent restorations are being crafted.',
  },
  {
    question: "What happens if I don't replace missing teeth?",
    answer:
      'Leaving missing teeth unreplaced can lead to several problems: remaining teeth may shift into the gap causing bite issues, jawbone loss occurs where the tooth root was, facial appearance can change as bone deteriorates, chewing efficiency decreases, speech may be affected, and there\'s increased risk of decay and gum disease on adjacent teeth. Early replacement helps prevent these complications.',
  },
  {
    question: 'Are dentures comfortable to wear?',
    answer:
      "Modern dentures are designed for comfort and a natural fit. There's typically an adjustment period of a few weeks while your mouth adapts. We take precise impressions and make adjustments to ensure the best fit possible. Implant-supported dentures offer superior stability and comfort because they're anchored securely rather than relying solely on suction or adhesives.",
  },
  {
    question: 'How do I care for my tooth replacement?',
    answer:
      'Care depends on the type of replacement. Implants and bridges are cared for like natural teeth—brush twice daily, floss (including under bridges), and maintain regular dental visits. Removable dentures should be taken out at night, cleaned daily with denture cleaner, and soaked in water or denture solution. All replacements benefit from regular dental checkups to ensure proper fit and function.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Missing Teeth Solutions', url: '/services/missing-teeth' },
];

const serviceData = {
  name: 'Missing Teeth Solutions',
  description: 'Comprehensive missing teeth replacement options in Ottawa including dental implants, bridges, partial and full dentures.',
  url: '/services/missing-teeth',
  image: '/images/implants/implants-01.jpg',
};

export default function MissingTeethLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqs)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Missing Teeth Solutions',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {children}
    </>
  );
}
