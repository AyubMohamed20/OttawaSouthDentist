import type { Metadata } from 'next';
import {
  Stethoscope,
  Sparkles,
  Smile,
  ShieldCheck,
  ScanFace,
  Bone,
  CircleDot,
  Lightbulb,
  Layers,
  Scissors,
  Baby,
  AlertTriangle,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { ServiceCard } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Dental Services | Ottawa South Dental',
  description:
    'Comprehensive dental services at Ottawa South Dental. From general dentistry and cosmetic treatments to children\'s dentistry and emergency care. Book your appointment today.',
  keywords: [
    'dental services Ottawa',
    'general dentistry',
    'cosmetic dentistry',
    'children\'s dentistry',
    'emergency dental care',
    'teeth whitening',
    'dental implants',
    'Invisalign Ottawa',
    'root canal',
    'dental crowns',
    'Ottawa dentist services',
  ],
  openGraph: {
    title: 'Dental Services | Ottawa South Dental',
    description:
      'Comprehensive dental services for your whole family. General, cosmetic, restorative, and emergency dental care in Ottawa.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Services | Ottawa South Dental',
    description:
      'Comprehensive dental services for your whole family. General, cosmetic, restorative, and emergency dental care.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services',
  },
};

// Complete list of all dental services (matching actual page folders)
const allServices = [
  {
    id: 'routine-checkups',
    title: 'Routine Checkups',
    description:
      'Comprehensive care including cleanings, exams, and preventive treatments to maintain your oral health.',
    icon: <Stethoscope className="w-6 h-6" />,
    href: '/services/routine-checkups',
  },
  {
    id: 'dental-hygiene',
    title: 'Dental Hygiene',
    description:
      'Professional cleanings and hygiene treatments to keep your teeth and gums healthy.',
    icon: <ShieldCheck className="w-6 h-6" />,
    href: '/services/dental-hygiene',
  },
  {
    id: 'preventive-dentistry',
    title: 'Preventive Dentistry',
    description:
      'Fluoride treatments, sealants, and oral cancer screenings to protect your smile for years to come.',
    icon: <ShieldCheck className="w-6 h-6" />,
    href: '/services/preventive-dentistry',
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description:
      'Transform your smile with teeth whitening, veneers, bonding, and other aesthetic treatments for a radiant look.',
    icon: <Sparkles className="w-6 h-6" />,
    href: '/services/cosmetic-dentistry',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description:
      'Professional whitening treatments to brighten your smile. Achieve noticeable results safely and effectively.',
    icon: <Lightbulb className="w-6 h-6" />,
    href: '/services/teeth-whitening',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description:
      'Straighten your teeth discreetly with clear aligners. A comfortable alternative to traditional braces.',
    icon: <ScanFace className="w-6 h-6" />,
    href: '/services/invisalign',
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description:
      'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    icon: <Bone className="w-6 h-6" />,
    href: '/services/dental-implants',
  },
  {
    id: 'dentures',
    title: 'Dentures',
    description:
      'Custom-fitted dentures to restore your smile and confidence. Full and partial options available.',
    icon: <Smile className="w-6 h-6" />,
    href: '/services/dentures',
  },
  {
    id: 'missing-teeth',
    title: 'Missing Teeth Solutions',
    description:
      'Comprehensive options for replacing missing teeth including bridges, implants, and dentures.',
    icon: <Layers className="w-6 h-6" />,
    href: '/services/missing-teeth',
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description:
      'Save damaged or infected teeth with gentle root canal treatment to relieve pain and preserve your natural smile.',
    icon: <CircleDot className="w-6 h-6" />,
    href: '/services/root-canal',
  },
  {
    id: 'white-fillings',
    title: 'White Fillings',
    description:
      'Natural-looking composite fillings that blend seamlessly with your teeth for a beautiful, healthy smile.',
    icon: <CircleDot className="w-6 h-6" />,
    href: '/services/white-fillings',
  },
  {
    id: 'gum-therapy',
    title: 'Gum Therapy',
    description:
      'Treatment for gum disease and periodontal issues to restore your gum health and protect your teeth.',
    icon: <ShieldCheck className="w-6 h-6" />,
    href: '/services/gum-therapy',
  },
  {
    id: 'oral-surgery',
    title: 'Oral Surgery',
    description:
      'Safe and comfortable surgical procedures including extractions and wisdom teeth removal.',
    icon: <Scissors className="w-6 h-6" />,
    href: '/services/oral-surgery',
  },
  {
    id: 'childrens-dentistry',
    title: "Children's Dentistry",
    description:
      'Gentle, kid-friendly dental care creating positive experiences for children of all ages.',
    icon: <Baby className="w-6 h-6" />,
    href: '/services/childrens-dentistry',
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description:
      'Same-day emergency appointments for toothaches, broken teeth, and urgent dental issues.',
    icon: <AlertTriangle className="w-6 h-6" />,
    href: '/services/emergency-care',
  },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
];

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <JsonLd data={structuredData.servicesList()} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.webPage({
        name: 'Dental Services',
        description: 'Comprehensive dental services at Ottawa South Dental. From general dentistry and cosmetic treatments to emergency care.',
        url: '/services',
      })} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={[{ label: 'Services', href: '/services' }]} />
      </div>

      {/* Page Header */}
      <SectionContainer
        as="section"
        background="secondary"
        paddingY="lg"
        size="xl"
        aria-labelledby="services-page-heading"
      >
        <div className="text-center">
          <Heading
            variant="page-title"
            subtitle="From routine checkups to advanced treatments, we provide comprehensive dental care for your entire family. Our experienced team is dedicated to helping you achieve and maintain a healthy, beautiful smile."
            align="center"
            id="services-page-heading"
          >
            Our Dental Services
          </Heading>
        </div>
      </SectionContainer>

      {/* Services Grid */}
      <SectionContainer
        as="section"
        background="white"
        paddingY="lg"
        size="xl"
        aria-labelledby="all-services-heading"
      >
        <h2 id="all-services-heading" className="sr-only">
          All Services
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Dental services"
        >
          {allServices.map((service) => (
            <div key={service.id} role="listitem">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Contact CTA Banner */}
      <ContactCTA
        id="book-appointment"
        variant="full"
        background="gradient"
        headline="Ready to Get Started?"
        description="Whether you need a routine cleaning or a specific treatment, our team is here to help. Book your appointment today and take the first step towards a healthier smile."
        phoneNumber="6137331118"
        phoneDisplay="(613) 733-1118"
        showEmergency={true}
        emergencyMessage="Dental emergency? We offer same-day appointments for urgent cases."
        showHours={true}
        hoursText="Mon-Fri: 9am-5pm | Sat: 9am-2pm"
        bookUrl="/contact#book"
        bookText="Book Your Appointment"
      />
    </main>
  );
}
