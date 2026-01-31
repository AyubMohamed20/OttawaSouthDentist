import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UserPlus,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Languages,
  Clock,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Patient Information | Ottawa South Dental',
  description:
    'Everything you need to know as a patient at Ottawa South Dental. Information for new patients, insurance and payment options, and the Canadian Dental Care Plan (CDCP).',
  keywords: [
    'dental patient information Ottawa',
    'new dental patient Ottawa',
    'dental insurance Ottawa',
    'CDCP dentist Ottawa',
    'dental payment options',
    'Ottawa South Dental patients',
  ],
  openGraph: {
    title: 'Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know as a patient. New patient info, insurance, payment options, and CDCP coverage.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know as a patient. New patient info, insurance, and CDCP coverage.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/patient-info',
  },
};

const patientInfoSections = [
  {
    title: 'New Patients',
    description:
      'Everything you need to know before your first visit. Required documents, what to expect, and how to prepare for your appointment.',
    href: '/patient-info/new-patients',
    icon: UserPlus,
    highlights: [
      'First visit checklist',
      'Patient registration forms',
      'What to expect',
      'Office policies',
    ],
  },
  {
    title: 'Payment & Insurance',
    description:
      'We accept most major insurance providers and offer flexible payment options. Learn about our billing process and accepted payment methods.',
    href: '/patient-info/payment-insurance',
    icon: CreditCard,
    highlights: [
      'Direct insurance billing',
      'Flexible payment options',
      'Treatment estimates',
      'No-interest financing',
    ],
  },
  {
    title: 'Canadian Dental Care Plan (CDCP)',
    description:
      'Ottawa South Dental is proud to accept the Canadian Dental Care Plan. Learn how to access dental coverage through this federal program.',
    href: '/patient-info/cdcp',
    icon: ShieldCheck,
    highlights: [
      'CDCP eligibility info',
      'Covered services',
      'How to enroll',
      'Direct billing available',
    ],
  },
];

const quickFacts = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'Your comfort and well-being are our top priorities.',
  },
  {
    icon: Languages,
    title: '7 Languages Spoken',
    description: 'English, French, Spanish, Hindi, Punjabi, Farsi, Arabic.',
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Open Monday-Friday 9am-5pm, Saturday 9am-2pm.',
  },
  {
    icon: ShieldCheck,
    title: 'CDCP Accepted',
    description: 'We accept the Canadian Dental Care Plan.',
  },
];

export default function PatientInfoPage() {
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-100/30" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#722F37]/5" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23722F37' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Patient Resources
            </span>
            <h1 className="font-display font-bold tracking-tight text-fluid-4xl md:text-fluid-5xl text-foreground leading-tight">
              Patient
              <span className="block text-[#722F37]">Information</span>
            </h1>
            <p className="mt-6 text-fluid-lg text-foreground-secondary max-w-2xl mx-auto">
              Everything you need to know about visiting Ottawa South Dental. From your first
              appointment to insurance questions, we have got you covered.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  Book Appointment
                </Button>
              </Link>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3] transition-all duration-200 shadow-sm"
              >
                <Phone className="w-5 h-5" />
                {formattedPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-white border-y border-[#EDE5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {quickFacts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <fact.icon className="w-5 h-5 text-[#722F37]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{fact.title}</p>
                  <p className="text-xs text-foreground-secondary">{fact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Info Sections */}
      <SectionContainer background="secondary" paddingY="lg">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Heading
            variant="section-title"
            align="center"
            subtitle="Select a topic below to find the information you need"
          >
            How Can We Help?
          </Heading>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {patientInfoSections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-[#EDE5DD] shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:border-primary-200"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <section.icon className="w-7 h-7 text-white" />
              </div>

              <h2 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-[#722F37] transition-colors">
                {section.title}
              </h2>

              <p className="text-foreground-secondary text-sm leading-relaxed mb-6">
                {section.description}
              </p>

              <ul className="space-y-2 mb-6">
                {section.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-[#722F37] font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>

      {/* Additional Resources */}
      <SectionContainer background="white" paddingY="lg">
        <div className="max-w-4xl mx-auto">
          <Heading
            variant="section-title"
            align="center"
            subtitle="Quick answers to help you prepare for your visit"
          >
            Common Questions
          </Heading>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-2xl p-6 border border-[#EDE5DD]">
              <h3 className="font-semibold text-foreground mb-3">Do you accept walk-ins?</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                While we do accept walk-ins when possible, we recommend booking an appointment to
                ensure you receive timely care. For emergencies, please call us immediately.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-2xl p-6 border border-[#EDE5DD]">
              <h3 className="font-semibold text-foreground mb-3">What insurance do you accept?</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                We accept most major dental insurance providers and offer direct billing. We also
                proudly accept the Canadian Dental Care Plan (CDCP).
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-2xl p-6 border border-[#EDE5DD]">
              <h3 className="font-semibold text-foreground mb-3">How early should I arrive?</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                For new patients, please arrive 15 minutes early to complete paperwork. Returning
                patients can arrive 5 minutes before their scheduled appointment.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-2xl p-6 border border-[#EDE5DD]">
              <h3 className="font-semibold text-foreground mb-3">What payment methods do you accept?</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                We accept cash, debit (Interac), Visa, MasterCard, and American Express. We can also
                discuss payment plans for larger treatments.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <ContactCtaBanner
        variant="full"
        background="gradient"
        headline="Have Questions?"
        description="Our friendly team is here to help. Contact us today and we will be happy to answer any questions about your visit."
        phoneNumber={contactInfo.phone}
        showEmergency={true}
        emergencyMessage="Same-day emergency appointments available"
        showHours={true}
        showLocation={true}
        showLanguages={true}
        bookUrl="/contact"
        bookText="Contact Us"
      />
    </main>
  );
}
