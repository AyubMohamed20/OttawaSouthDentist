import type { Metadata } from 'next';
import {
  CreditCard,
  Banknote,
  FileCheck,
  Shield,
  CheckCircle2,
  HeartHandshake,
  Phone,
  Building2,
  ClipboardList,
  Wallet,
  BadgeCheck,
  HelpCircle,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { FAQAccordion, type FAQItem } from '@/components/ui/faq-accordion';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { contactInfo } from '@/data/site-config';

// Page Metadata for SEO
export const metadata: Metadata = {
  title: 'Payment & Insurance | Ottawa South Dental',
  description:
    'Learn about payment options and insurance at Ottawa South Dental. We accept all major credit cards, offer direct billing to insurance, and participate in the Canadian Dental Care Plan (CDCP).',
  keywords: [
    'dental payment options Ottawa',
    'dental insurance Ottawa',
    'direct billing dentist Ottawa',
    'CDCP dentist Ottawa',
    'Canadian Dental Care Plan',
    'dental financing Ottawa',
    'insurance accepted dentist',
    'Ottawa South Dental payment',
  ],
  openGraph: {
    title: 'Payment & Insurance | Ottawa South Dental',
    description:
      'Flexible payment options and direct insurance billing at Ottawa South Dental. We accept the Canadian Dental Care Plan (CDCP).',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payment & Insurance | Ottawa South Dental',
    description:
      'Flexible payment options and direct insurance billing at Ottawa South Dental.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/patient-info/payment-insurance',
  },
};

// Payment methods
const paymentMethods = [
  { icon: CreditCard, name: 'Visa', description: 'Credit & Debit' },
  { icon: CreditCard, name: 'MasterCard', description: 'Credit & Debit' },
  { icon: CreditCard, name: 'American Express', description: 'Credit' },
  { icon: Banknote, name: 'Interac / Debit', description: 'Direct payment' },
  { icon: Wallet, name: 'Cash', description: 'Accepted' },
];

// Direct billing steps
const directBillingSteps = [
  {
    step: 1,
    title: 'Provide Your Insurance Info',
    description: 'Give us your insurance details at your appointment',
    icon: ClipboardList,
  },
  {
    step: 2,
    title: 'We Verify Coverage',
    description: 'Our team confirms your benefits with your insurance provider',
    icon: FileCheck,
  },
  {
    step: 3,
    title: 'Treatment Is Performed',
    description: 'You receive your dental care',
    icon: HeartHandshake,
  },
  {
    step: 4,
    title: 'We Bill Directly',
    description: 'We submit the claim directly to your insurance company',
    icon: Building2,
  },
  {
    step: 5,
    title: 'Pay Only Your Portion',
    description: 'You only pay any remaining balance not covered by insurance',
    icon: Wallet,
  },
];

// Direct billing benefits
const directBillingBenefits = [
  {
    title: 'No Upfront Payment',
    description: "You don't have to pay the full amount and wait for reimbursement",
  },
  {
    title: 'Less Paperwork',
    description: 'We handle the claim submission for you',
  },
  {
    title: 'Know Your Costs',
    description: 'We can estimate your out-of-pocket costs before treatment',
  },
  {
    title: 'Convenient',
    description: 'Makes dental care more accessible',
  },
];

// CDCP services covered
const cdcpServices = [
  'Preventive care (cleanings, checkups)',
  'Diagnostic services (X-rays, exams)',
  'Restorative treatments (fillings)',
  'Endodontic services (root canals)',
  'Periodontal services (gum treatments)',
  'Prosthodontic services (dentures)',
  'Oral surgery services',
];

// CDCP eligibility points
const cdcpEligibility = [
  'Be a Canadian resident',
  'Have an adjusted family net income below the threshold',
  'Not have access to dental insurance',
];

// Financial policy points
const financialPolicyPoints = [
  'Payment is expected at the time of service',
  'For patients with insurance, we will collect any estimated patient portion at the time of service',
  'We will provide a detailed treatment plan with cost estimates before proceeding with non-emergency treatment',
  'Please inform us of any changes to your insurance coverage',
];

// FAQ items
const faqItems: FAQItem[] = [
  {
    question: 'Do you accept my insurance?',
    answer:
      "We work with most major insurance providers in Canada. Contact our office with your insurance information, and we'll verify your coverage before your appointment.",
  },
  {
    question: "What if my insurance doesn't cover the full cost?",
    answer:
      'You will be responsible for any portion not covered by your insurance. We can provide an estimate before treatment so you know what to expect and can plan accordingly.',
  },
  {
    question: 'Can you help me understand my insurance benefits?',
    answer:
      'Yes! Our team can help explain your coverage and estimate your out-of-pocket costs for recommended treatments. We want you to make informed decisions about your dental care.',
  },
  {
    question: "What if I don't have insurance?",
    answer:
      'We welcome patients without insurance. We offer various payment options and can discuss treatment plans that fit your budget. Your oral health is important to us.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Please contact our office to discuss payment options for larger treatments. We work with patients to make dental care accessible and affordable.',
  },
  {
    question: 'How does direct billing work?',
    answer:
      'With direct billing, we submit your insurance claim directly to your provider. You only pay any portion not covered by your plan. This eliminates the need for you to pay upfront and wait for reimbursement.',
  },
];

export default function PaymentInsurancePage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* ========== HERO SECTION ========== */}
      <SectionContainer
        as="section"
        background="secondary"
        paddingY="lg"
        size="xl"
        aria-labelledby="payment-insurance-heading"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6">
            <Wallet className="w-4 h-4" />
            <span>Patient Information</span>
          </div>
          <Heading
            variant="page-title"
            subtitle="We believe quality dental care should be accessible to everyone. We offer flexible payment options, direct insurance billing, and participate in the Canadian Dental Care Plan (CDCP)."
            align="center"
            id="payment-insurance-heading"
          >
            Payment & Insurance
          </Heading>
        </div>
      </SectionContainer>

      {/* ========== PAYMENT METHODS SECTION ========== */}
      <SectionContainer
        as="section"
        background="white"
        paddingY="lg"
        size="xl"
        aria-labelledby="payment-methods-heading"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            <span>Accepted Payments</span>
          </div>
          <h2
            id="payment-methods-heading"
            className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight"
          >
            Payment Methods <span className="text-[#722F37]">Accepted</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            We accept a variety of payment methods for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="group bg-white rounded-2xl p-6 border border-neutral-100 shadow-soft hover:shadow-soft-lg hover:border-[#722F37]/20 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-[#722F37] group-hover:to-[#5a252c] transition-all duration-300 mb-3">
                <method.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-neutral-900">{method.name}</h3>
              <p className="text-sm text-neutral-500 mt-1">{method.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ========== DIRECT BILLING SECTION ========== */}
      <SectionContainer
        as="section"
        background="secondary"
        paddingY="lg"
        size="xl"
        aria-labelledby="direct-billing-heading"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-6">
              <FileCheck className="w-4 h-4" />
              <span>Insurance</span>
            </div>

            <h2
              id="direct-billing-heading"
              className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight"
            >
              Direct Billing to <span className="text-[#722F37]">Insurance</span>
            </h2>

            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              We offer <strong>direct billing</strong> to most insurance companies, making dental
              care more accessible and hassle-free. No more paying upfront and waiting for
              reimbursement.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {directBillingBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white rounded-xl p-5 border border-neutral-100 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{benefit.title}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Insurance providers note */}
            <div className="mt-8 bg-gradient-to-r from-[#FDF8F3] to-[#FFFBF8] rounded-2xl p-6 border border-[#722F37]/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-[#722F37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Insurance Providers</p>
                  <p className="text-sm text-neutral-600 mt-1">
                    We work with most major insurance providers in Canada. Please bring your
                    insurance card to your appointment, and our team will verify your coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              How Direct Billing Works
            </h3>
            <div className="space-y-4">
              {directBillingSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-neutral-100 shadow-soft animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <step.icon className="w-5 h-5 text-[#722F37]" />
                      <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                    </div>
                    <p className="text-neutral-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ========== CDCP SECTION ========== */}
      <section className="relative bg-[#722F37] overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect fill="url(#dots)" width="100%" height="100%" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                <BadgeCheck className="w-4 h-4" />
                <span>Government Program</span>
              </div>

              <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-white tracking-tight">
                Canadian Dental Care Plan <span className="text-primary-200">(CDCP)</span>
              </h2>

              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                We are proud to accept the <strong className="text-white">Canadian Dental Care Plan (CDCP)</strong>,
                making dental care more accessible to eligible Canadians.
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Eligibility Requirements</h3>
                <ul className="space-y-3">
                  {cdcpEligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-primary-300" />
                      </div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to use CDCP */}
              <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">How to Use CDCP at Our Office</h3>
                <ol className="space-y-2 text-white/80">
                  <li className="flex gap-2">
                    <span className="font-semibold text-white">1.</span>
                    Apply for CDCP through the federal government
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-white">2.</span>
                    Bring your CDCP documentation to your appointment
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-white">3.</span>
                    We bill the program directly for covered services
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-white">4.</span>
                    You may pay for any services not covered
                  </li>
                </ol>
              </div>
            </div>

            {/* Services covered */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Services Covered by CDCP</h3>
              </div>

              <ul className="space-y-4">
                {cdcpServices.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{service}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Note:</strong> Coverage details may vary. Contact
                  our office or visit the federal government website for complete eligibility
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINANCIAL POLICY SECTION ========== */}
      <SectionContainer
        as="section"
        background="white"
        paddingY="lg"
        size="xl"
        aria-labelledby="financial-policy-heading"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
              <ClipboardList className="w-4 h-4" />
              <span>Policy</span>
            </div>
            <h2
              id="financial-policy-heading"
              className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight"
            >
              Our Financial <span className="text-[#722F37]">Policy</span>
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#FDF8F3] via-white to-[#FFFBF8] rounded-3xl p-8 md:p-10 border border-neutral-100 shadow-soft">
            <ul className="space-y-5">
              {financialPolicyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#722F37]" />
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* ========== FAQ SECTION ========== */}
      <SectionContainer
        as="section"
        background="secondary"
        paddingY="lg"
        size="xl"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </div>
            <h2
              id="faq-heading"
              className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-neutral-900 tracking-tight"
            >
              Frequently Asked <span className="text-[#722F37]">Questions</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-xl mx-auto">
              Have questions about payment or insurance? Find answers to common questions below.
            </p>
          </div>

          <FAQAccordion items={faqItems} allowMultiple={false} />
        </div>
      </SectionContainer>

      {/* ========== CONTACT CTA ========== */}
      <ContactCTA
        id="contact-billing"
        variant="full"
        background="gradient"
        headline="Questions About Billing?"
        description="Our friendly team is happy to help with any payment, insurance, or billing questions. Don't hesitate to reach out."
        phoneNumber={contactInfo.phone}
        phoneDisplay={`(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`}
        showEmergency={false}
        showHours={true}
        hoursText="Mon-Fri: 9am-5pm | Sat: 9am-2pm"
        bookUrl="/contact"
        bookText="Contact Us"
      />
    </main>
  );
}
