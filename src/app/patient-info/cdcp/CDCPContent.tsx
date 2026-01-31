'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Shield,
  Phone,
  Calendar,
  FileText,
  Users,
  Heart,
  ClipboardCheck,
  HelpCircle,
  Stethoscope,
  BadgeCheck,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the Canadian Dental Care Plan (CDCP)?',
    answer:
      'The Canadian Dental Care Plan is a federal government program designed to help Canadians who don\'t have access to dental insurance. The program provides coverage for various dental services to make oral health care more accessible and affordable for eligible Canadians.',
  },
  {
    question: 'Am I eligible for CDCP?',
    answer:
      'To be eligible for CDCP, you generally must be a Canadian resident, have an adjusted family net income below the program threshold, and not have access to private dental insurance. Specific income thresholds and eligibility requirements are set by the federal government and may change. Visit the official CDCP website or contact our office for the most current information.',
  },
  {
    question: 'How do I apply for CDCP?',
    answer:
      'You can apply for the Canadian Dental Care Plan through the federal government\'s official channels. Once approved, you\'ll receive documentation confirming your coverage. Bring this documentation to your dental appointment at Ottawa South Dental, and we\'ll take care of the billing directly.',
  },
  {
    question: 'What services does CDCP cover?',
    answer:
      'CDCP covers a range of dental services including preventive care (cleanings, checkups), diagnostic services (X-rays, exams), restorative treatments (fillings), endodontic services (root canals), periodontal services (gum treatments), prosthodontic services (dentures), and oral surgery. Coverage may vary, and some services may have limitations.',
  },
  {
    question: 'Do I pay anything out of pocket with CDCP?',
    answer:
      'Depending on your income level and the specific services you receive, you may have some out-of-pocket costs. Some services may not be fully covered under the plan. Our team will explain any potential costs before proceeding with treatment so there are no surprises.',
  },
  {
    question: 'Does Ottawa South Dental accept CDCP?',
    answer:
      'Yes! Ottawa South Dental is proud to be a registered CDCP provider. We accept CDCP and will bill the program directly for covered services. Simply bring your CDCP documentation to your appointment, and our team will handle the rest.',
  },
  {
    question: 'What do I need to bring to my appointment?',
    answer:
      'Please bring your CDCP member card or letter of eligibility, a valid government-issued photo ID, and any other dental records if you\'re a new patient. Having your documentation ready helps us verify your coverage and process your visit smoothly.',
  },
  {
    question: 'Can I use CDCP if I have other dental insurance?',
    answer:
      'Generally, CDCP is designed for Canadians who don\'t have access to dental insurance through an employer, pension, or other sources. If you have questions about your specific situation, contact the CDCP program directly or speak with our team for guidance.',
  },
];

const coveredServices = [
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: 'Preventive Care',
    services: ['Regular checkups', 'Professional cleanings', 'Fluoride treatments'],
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Diagnostic Services',
    services: ['Dental examinations', 'X-rays', 'Oral health assessments'],
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Restorative Treatments',
    services: ['Fillings', 'Crown repairs', 'Basic restorations'],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Periodontal Services',
    services: ['Gum disease treatment', 'Deep cleanings', 'Periodontal maintenance'],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Endodontic Services',
    services: ['Root canal therapy', 'Pulp treatments', 'Endodontic retreatment'],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Prosthodontics & Oral Surgery',
    services: ['Dentures', 'Tooth extractions', 'Oral surgery procedures'],
  },
];

const howToUseSteps = [
  {
    step: 1,
    title: 'Apply for CDCP',
    description:
      'Apply for the Canadian Dental Care Plan through the federal government. You can apply online or by phone through official government channels.',
  },
  {
    step: 2,
    title: 'Receive Your Approval',
    description:
      'Once approved, you\'ll receive documentation confirming your CDCP coverage. Keep this safe as you\'ll need it for your dental visits.',
  },
  {
    step: 3,
    title: 'Book Your Appointment',
    description:
      'Call Ottawa South Dental at (613) 733-6446 or book online. Let us know you\'re a CDCP member when scheduling.',
  },
  {
    step: 4,
    title: 'Bring Your Documents',
    description:
      'Bring your CDCP documentation and photo ID to your appointment. Our team will verify your coverage.',
  },
  {
    step: 5,
    title: 'Receive Your Care',
    description:
      'We\'ll provide your dental care and bill CDCP directly for covered services. You\'ll only pay for any uncovered portions.',
  },
];

const eligibilityCriteria = [
  'Be a Canadian resident',
  'Have an adjusted family net income below the program threshold',
  'Not have access to dental insurance through an employer, pension, or other sources',
  'File an annual tax return (income is verified through tax information)',
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={[
            'rounded-2xl border transition-all duration-300',
            openIndex === index
              ? 'border-[#722F37]/20 bg-gradient-to-br from-white to-[#FDF8F3]/50 shadow-soft'
              : 'border-[#EDE5DD] bg-white hover:border-[#722F37]/10',
          ].join(' ')}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2 rounded-2xl"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-[#1e293b] pr-4">{item.question}</span>
            <ChevronDown
              className={[
                'w-5 h-5 text-[#722F37] flex-shrink-0 transition-transform duration-300',
                openIndex === index ? 'rotate-180' : '',
              ].join(' ')}
            />
          </button>
          <div
            className={[
              'overflow-hidden transition-all duration-300 ease-out',
              openIndex === index ? 'max-h-96' : 'max-h-0',
            ].join(' ')}
          >
            <div className="px-6 pb-5 text-[#64748b] leading-relaxed">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CDCPContent() {
  return (
    <>
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]">
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#722F37]/5" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-100/30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
            <div className="max-w-3xl">
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-[#64748b] hover:text-[#722F37] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-[#64748b]">/</li>
                  <li>
                    <Link
                      href="/patient-info"
                      className="text-[#64748b] hover:text-[#722F37] transition-colors"
                    >
                      Patient Info
                    </Link>
                  </li>
                  <li className="text-[#64748b]">/</li>
                  <li className="text-[#722F37] font-medium">CDCP Information</li>
                </ol>
              </nav>

              {/* CDCP Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] font-medium text-sm mb-6">
                <BadgeCheck className="w-5 h-5" />
                <span>Registered CDCP Provider</span>
              </div>

              <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                Canadian Dental Care Plan (CDCP)
              </h1>

              <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                Ottawa South Dental is proud to accept the Canadian Dental Care Plan,
                making quality dental care more accessible to eligible Canadians.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book an Appointment
                </Button>
                <a
                  href="tel:+16137336446"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-6 py-3 rounded-xl font-medium',
                    'bg-white text-[#722F37] border-2 border-[#722F37]/20',
                    'hover:border-[#722F37]/40 hover:bg-[#FDF8F3]',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-6446
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What is CDCP Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display font-semibold text-fluid-3xl text-[#1e293b] tracking-tight mb-6">
                What is the Canadian Dental Care Plan?
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  The Canadian Dental Care Plan (CDCP) is a federal government program
                  designed to help Canadians who don't have access to dental insurance.
                  The program provides coverage for various dental services, making
                  essential oral health care more accessible and affordable.
                </p>

                <p>
                  The CDCP aims to reduce financial barriers to dental care, helping
                  eligible Canadians maintain good oral health. The program covers a
                  wide range of services, from preventive care like cleanings and
                  checkups to restorative treatments and oral surgery.
                </p>

                <p>
                  At Ottawa South Dental, we're committed to making dental care
                  accessible to everyone. As a registered CDCP provider, we handle
                  the billing directly with the program, making your visit as simple
                  and stress-free as possible.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <BadgeCheck className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">We're here to help!</span> Our team
                  can answer your questions about CDCP and help you understand your
                  coverage options.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] rounded-3xl p-8 lg:p-10">
              <h3 className="font-display font-semibold text-xl text-[#1e293b] mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#722F37]" />
                Quick Facts About CDCP
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#64748b]">
                    Federal program for Canadians without dental insurance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#64748b]">
                    Covers a wide range of dental services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#64748b]">
                    Based on family income thresholds
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#64748b]">
                    We bill CDCP directly for covered services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[#64748b]">
                    No paperwork hassles for you
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </SectionContainer>

        {/* Eligibility Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Who is Eligible for CDCP?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              The Canadian Dental Care Plan is designed to help Canadians who need
              it most. Here are the general eligibility requirements.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-[#EDE5DD]">
              <h3 className="font-semibold text-xl text-[#1e293b] mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-[#722F37]" />
                General Eligibility Criteria
              </h3>

              <ul className="space-y-4 mb-8">
                {eligibilityCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <span className="text-[#64748b] leading-relaxed pt-1">
                      {criteria}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
                <p className="text-sm text-[#64748b]">
                  <span className="font-semibold text-[#1e293b]">Note:</span> Eligibility
                  requirements and income thresholds are set by the federal government
                  and may change. For the most current eligibility information, please
                  visit the official CDCP website or contact Service Canada.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Covered Services Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Services Covered by CDCP
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              The Canadian Dental Care Plan covers a comprehensive range of dental
              services to keep your smile healthy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coveredServices.map((service, index) => (
              <div
                key={index}
                className={[
                  'p-6 rounded-2xl',
                  'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                  'border border-[#EDE5DD]',
                  'transition-all duration-300',
                  'hover:shadow-soft hover:-translate-y-1 hover:border-[#722F37]/20',
                ].join(' ')}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-4 text-[#722F37]">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-[#1e293b] mb-3">{service.title}</h3>
                <ul className="space-y-2">
                  {service.services.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-sm text-[#64748b]"
                    >
                      <Check className="w-4 h-4 text-[#722F37] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200 max-w-3xl mx-auto">
            <p className="text-center text-[#64748b]">
              <span className="font-semibold text-[#1e293b]">Coverage may vary.</span>{' '}
              Some services may have limitations or require co-payments depending on
              your income level. Our team can help explain your specific coverage.
            </p>
          </div>
        </SectionContainer>

        {/* How to Use CDCP at Our Practice */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              How to Use CDCP at Ottawa South Dental
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Using your CDCP benefits at our practice is simple. Here's what you
              need to know.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {howToUseSteps.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className={[
                    'relative p-6 rounded-2xl',
                    'bg-white',
                    'border border-[#EDE5DD]',
                    'shadow-soft',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e293b] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {howToUseSteps.slice(3).map((item, index) => (
                <div
                  key={index}
                  className={[
                    'relative p-6 rounded-2xl',
                    'bg-white',
                    'border border-[#EDE5DD]',
                    'shadow-soft',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e293b] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* FAQ Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#64748b] text-lg">
                Have questions about CDCP? Find answers to common questions below.
              </p>
            </div>

            <FAQAccordion items={faqs} />

            <div className="mt-10 text-center">
              <p className="text-[#64748b] mb-4">
                Still have questions? We're happy to help.
              </p>
              <a
                href="tel:+16137336446"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                Call us at (613) 733-6446
              </a>
            </div>
          </div>
        </SectionContainer>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]">
          {/* Decorative elements */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center">
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-white tracking-tight mb-4">
                Ready to Use Your CDCP Benefits?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Ottawa South Dental is here to help you make the most of your Canadian
                Dental Care Plan coverage. Book your appointment today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book Your Appointment
                </Button>
                <a
                  href="tel:+16137336446"
                  className={[
                    'inline-flex items-center justify-center gap-2',
                    'px-8 py-4 rounded-xl font-medium text-lg',
                    'bg-white/10 text-white border-2 border-white/20',
                    'hover:bg-white/20',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]',
                  ].join(' ')}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-6446
                </a>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-100 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>1980 Ogilvie Rd, Ottawa</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-primary-200" />
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5" />
                  <span>Registered CDCP Provider</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
