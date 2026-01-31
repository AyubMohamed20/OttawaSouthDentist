import { Metadata } from 'next';
import { structuredData, JsonLd } from '@/lib/metadata';
import { PreventiveDentistryContent } from './PreventiveDentistryContent';

export const metadata: Metadata = {
  title: 'Preventive Dentistry | Ottawa South Dental',
  description:
    'Protect your smile with preventive dentistry at Ottawa South Dental. Fluoride treatments, dental sealants, oral hygiene education, and custom mouthguards for the whole family.',
  keywords: [
    'preventive dentistry Ottawa',
    'dental sealants',
    'fluoride treatment',
    'oral hygiene education',
    'custom mouthguards',
    'night guards Ottawa',
    'teeth grinding protection',
    'dental cleaning',
    'Ottawa South Dental',
  ],
  openGraph: {
    title: 'Preventive Dentistry | Ottawa South Dental',
    description:
      'Protect your smile with preventive dentistry at Ottawa South Dental. Fluoride treatments, dental sealants, and oral hygiene education for the whole family.',
    type: 'website',
    locale: 'en_CA',
  },
};

// FAQ data for structured data
const faqItems = [
  {
    question: 'What are dental sealants and who can benefit from them?',
    answer:
      'Dental sealants are thin protective coatings applied to the chewing surfaces of back teeth (molars and premolars) to prevent cavities. They work by sealing the grooves and pits where food particles and bacteria often get trapped. While sealants are especially beneficial for children when their permanent molars come in, adults with deep grooves in their teeth can also benefit from this simple, painless preventive treatment.',
  },
  {
    question: 'How does professional fluoride treatment protect my teeth?',
    answer:
      "Professional fluoride treatments strengthen tooth enamel and help repair early stages of tooth decay before cavities form. The fluoride concentration in professional treatments is much higher than what's found in toothpaste or tap water, providing superior protection. We typically recommend fluoride treatments every 6 months during your regular dental visits, though some patients may benefit from more frequent applications.",
  },
  {
    question: 'How often should I visit for preventive care?',
    answer:
      "Most patients benefit from preventive dental visits every 6 months. However, the ideal frequency depends on your individual oral health needs. Patients with a history of cavities, gum disease, or other risk factors may need more frequent visits. During your examination, we'll assess your oral health and recommend a personalized preventive care schedule.",
  },
  {
    question: 'Do I need a custom mouthguard for sports?',
    answer:
      "If you or your child participates in any contact sports or activities with a risk of falls, a custom mouthguard is highly recommended. Custom-fitted mouthguards from your dentist provide significantly better protection than store-bought options because they're designed to fit your teeth precisely. They're more comfortable, stay in place better, and don't interfere with breathing or speaking.",
  },
  {
    question: 'What causes teeth grinding and how can a night guard help?',
    answer:
      'Teeth grinding (bruxism) is often caused by stress, anxiety, sleep disorders, or an abnormal bite. It can lead to worn teeth, jaw pain, headaches, and even cracked teeth. A custom night guard creates a protective barrier between your upper and lower teeth, preventing damage from grinding and clenching. It also helps relax jaw muscles and can reduce associated pain and discomfort.',
  },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Preventive Dentistry', url: '/services/preventive-dentistry' },
];

// Service data for structured data
const serviceData = {
  name: 'Preventive Dentistry',
  description: 'Protect your smile with preventive dentistry at Ottawa South Dental. Fluoride treatments, dental sealants, oral hygiene education, and custom mouthguards.',
  url: '/services/preventive-dentistry',
  image: '/images/hygiene/hygiene-05.jpg',
};

export default function PreventiveDentistryPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Preventive Dentistry',
        description: serviceData.description,
        url: serviceData.url,
      })} />

      <PreventiveDentistryContent />
    </>
  );
}
