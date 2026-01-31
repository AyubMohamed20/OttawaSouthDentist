import type { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: "Children's Dentistry | Ottawa South Dental",
  description:
    "Gentle, kid-friendly dental care for children of all ages. Creating positive dental experiences with preventive care, cavity treatment, and education for healthy smiles that last a lifetime.",
  keywords: [
    "children's dentistry Ottawa",
    'pediatric dentist Ottawa',
    'kids dentist',
    'child dental care',
    'family dentist Ottawa',
    'gentle dental care for kids',
    'first dental visit',
    'children dental checkup',
    'Ottawa South Dental',
    'kid-friendly dentist',
  ],
  openGraph: {
    title: "Children's Dentistry | Ottawa South Dental",
    description:
      "Gentle, kid-friendly dental care creating positive experiences for children of all ages. Book your child's appointment today.",
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/services/childrens-dentistry.jpg',
        width: 1200,
        height: 630,
        alt: "Children's Dentistry at Ottawa South Dental",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Children's Dentistry | Ottawa South Dental",
    description:
      "Gentle, kid-friendly dental care for children of all ages. Creating positive dental experiences.",
    images: ['/images/services/childrens-dentistry.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/childrens-dentistry',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: "Children's Dentistry", url: '/services/childrens-dentistry' },
];

// Service data for structured data
const serviceData = {
  name: "Children's Dentistry",
  description: "Gentle, kid-friendly dental care for children of all ages. Creating positive dental experiences with preventive care, cavity treatment, and education for healthy smiles that last a lifetime.",
  url: '/services/childrens-dentistry',
  image: '/images/services/childrens-dentistry.jpg',
};

// FAQ data for structured data
const faqItems = [
  {
    question: "When should my child first visit the dentist?",
    answer: "We recommend bringing your child for their first dental visit by their first birthday or within 6 months of their first tooth appearing. Early visits help establish good habits and allow us to monitor development.",
  },
  {
    question: "How do you help children who are nervous about the dentist?",
    answer: "Our team is specially trained to work with children and create a calm, friendly environment. We use child-friendly language, show and tell techniques, and take things at your child's pace to build trust and comfort.",
  },
  {
    question: "How often should my child see the dentist?",
    answer: "Most children should visit the dentist every 6 months for checkups and cleanings. Some children may need more frequent visits depending on their oral health needs.",
  },
  {
    question: "Are dental X-rays safe for children?",
    answer: "Yes, dental X-rays are very safe. We use digital X-rays which emit minimal radiation, and we take X-rays only when necessary for proper diagnosis and treatment planning.",
  },
];

export default function ChildrensDentistryLayout({
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
        name: "Children's Dentistry",
        description: serviceData.description,
        url: serviceData.url,
      })} />
      {children}
    </>
  );
}
