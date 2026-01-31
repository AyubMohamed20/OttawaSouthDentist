import type { Metadata } from 'next';
import { RootCanalContent } from './RootCanalContent';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Root Canal Treatment | Ottawa South Dental',
  description:
    'Gentle, pain-free root canal treatment at Ottawa South Dental. Our endodontic therapy saves infected teeth and relieves pain while preserving your natural smile. Book your appointment today!',
  keywords: [
    'root canal Ottawa',
    'root canal treatment',
    'endodontic therapy Ottawa',
    'tooth infection treatment',
    'save infected tooth',
    'pain-free root canal',
    'Ottawa South Dental root canal',
    'tooth pain relief Ottawa',
    'dental pulp treatment',
  ],
  openGraph: {
    title: 'Root Canal Treatment | Ottawa South Dental',
    description:
      'Save your natural teeth with gentle root canal treatment. Our experienced team provides comfortable, effective endodontic therapy to relieve pain and preserve your smile.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/clinic/clinic-08.jpg',
        width: 1200,
        height: 630,
        alt: 'Root Canal Treatment at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Root Canal Treatment | Ottawa South Dental',
    description:
      'Pain-free root canal treatment to save your natural teeth. Over 95% success rate. Book your appointment today!',
    images: ['/images/clinic/clinic-08.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/root-canal',
  },
};

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Root Canal Treatment', url: '/services/root-canal' },
];

// Service data for structured data
const serviceData = {
  name: 'Root Canal Treatment',
  description: 'Gentle, pain-free root canal treatment at Ottawa South Dental. Our endodontic therapy saves infected teeth and relieves pain while preserving your natural smile.',
  url: '/services/root-canal',
  image: '/images/clinic/clinic-08.jpg',
};

// FAQ data for structured data
const faqItems = [
  {
    question: 'Is root canal treatment painful?',
    answer: 'Modern root canal treatment is performed with effective local anesthesia and is generally no more uncomfortable than getting a filling. Most patients report significant relief from the pain caused by the infection. Our gentle approach and advanced techniques ensure your comfort throughout the procedure.',
  },
  {
    question: 'What happens if I don\'t get a root canal?',
    answer: 'Without treatment, the infection can spread beyond the tooth, causing an abscess, bone loss, and potentially affecting neighboring teeth. In severe cases, the infection can spread to other parts of the body. Ultimately, delaying treatment often leads to tooth extraction, which requires more complex and costly replacement options.',
  },
  {
    question: 'How successful is root canal treatment?',
    answer: 'Root canal treatment has a very high success rate of over 95%. With proper care, including a dental crown and good oral hygiene, your treated tooth can last a lifetime. Regular checkups allow us to monitor the tooth and ensure it remains healthy.',
  },
  {
    question: 'How long does a root canal take?',
    answer: 'Most root canal treatments can be completed in one to two appointments, depending on the complexity of the case. Each appointment typically lasts about 60-90 minutes. We\'ll provide you with a clear treatment timeline during your initial consultation.',
  },
  {
    question: 'Will I need a crown after my root canal?',
    answer: 'In most cases, yes. A crown is recommended to protect the treated tooth, which may become more brittle after the procedure. The crown restores full function and provides long-term protection, helping your tooth last for many years to come.',
  },
];

export default function RootCanalPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Root Canal Treatment',
        description: serviceData.description,
        url: serviceData.url,
      })} />
      <RootCanalContent />
    </>
  );
}
