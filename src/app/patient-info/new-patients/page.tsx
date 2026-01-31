import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  ClipboardList,
  Clock,
  CreditCard,
  Shield,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Sparkles,
  Users,
  Languages,
  MapPin,
  Building2,
  AlertCircle,
  Download,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'New Patient Information | Ottawa South Dental',
  description:
    'Everything you need to know before your first visit to Ottawa South Dental. Learn about required documents, patient forms, what to expect, and our office policies.',
  keywords: [
    'new patient Ottawa dentist',
    'first dental visit Ottawa',
    'dental patient forms Ottawa',
    'Ottawa South Dental new patient',
    'dentist registration Ottawa',
    'new patient appointment Ottawa',
    'dental intake forms',
    'first dental appointment',
  ],
  openGraph: {
    title: 'New Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know before your first visit. Required documents, patient forms, and what to expect at your appointment.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Patient Information | Ottawa South Dental',
    description:
      'Everything you need to know before your first visit. Required documents, patient forms, and what to expect.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/patient-info/new-patients',
  },
};

// FAQ data for the accordion
const faqs = [
  {
    question: 'What should I bring to my first appointment?',
    answer:
      'Please bring a valid government-issued photo ID, your dental insurance card (if applicable), a list of current medications, and any relevant dental records or X-rays from your previous dentist. If you have completed our patient forms online, bring a copy; otherwise, please arrive 15 minutes early to fill them out.',
  },
  {
    question: 'Do you accept new patients without insurance?',
    answer:
      'Absolutely! We welcome patients with or without dental insurance. We offer various payment options including cash, debit, Visa, MasterCard, and American Express. We can also provide treatment estimates and discuss payment arrangements for larger procedures.',
  },
  {
    question: 'Do you accept the Canadian Dental Care Plan (CDCP)?',
    answer:
      'Yes, Ottawa South Dental is proud to accept the Canadian Dental Care Plan (CDCP). If you are enrolled in the program, please bring your CDCP documentation to your appointment. We will bill the program directly for covered services.',
  },
  {
    question: 'How early should I arrive for my first appointment?',
    answer:
      'We recommend arriving 15-20 minutes before your scheduled appointment time. This allows you to complete any remaining paperwork, get comfortable with our office, and ask any questions you may have before your examination begins.',
  },
  {
    question: 'What happens during my first visit?',
    answer:
      'Your first visit typically includes a comprehensive oral examination, necessary X-rays, a discussion of your dental history and concerns, and a review of any treatment recommendations. We take time to listen to your needs and create a personalized care plan tailored to your oral health goals.',
  },
  {
    question: 'Can I transfer my dental records from my previous dentist?',
    answer:
      "Yes, we can request your dental records and X-rays from your previous dentist. Simply provide us with their contact information during your first visit, and we'll handle the transfer. Having your records helps us provide continuity of care and a complete picture of your dental health.",
  },
  {
    question: 'Do you offer services in languages other than English?',
    answer:
      'Yes! Our multilingual team can serve you in English, French, Spanish, Hindi, Punjabi, Farsi, and Arabic. Just let us know your language preference when booking your appointment, and we will do our best to accommodate you.',
  },
];

// What to expect timeline
const firstVisitSteps = [
  {
    step: 1,
    title: 'Welcome & Check-In',
    description:
      'Our friendly team will greet you, collect your paperwork, and verify your insurance information if applicable.',
    duration: '10-15 min',
  },
  {
    step: 2,
    title: 'Health History Review',
    description:
      'We will review your medical and dental history together to understand your unique needs and any concerns.',
    duration: '5-10 min',
  },
  {
    step: 3,
    title: 'Comprehensive Examination',
    description:
      'Your dentist will perform a thorough examination of your teeth, gums, jaw, and oral tissues to assess your overall oral health.',
    duration: '15-20 min',
  },
  {
    step: 4,
    title: 'Digital X-Rays',
    description:
      'If needed, we will take digital X-rays using low-radiation technology to see what is happening beneath the surface.',
    duration: '10-15 min',
  },
  {
    step: 5,
    title: 'Discussion & Treatment Plan',
    description:
      'We will discuss our findings, answer your questions, and create a personalized treatment plan together.',
    duration: '10-15 min',
  },
];

// Required documents
const requiredDocuments = [
  {
    icon: FileText,
    title: 'Photo ID',
    description: 'Valid government-issued identification (driver\'s license, passport, health card)',
  },
  {
    icon: CreditCard,
    title: 'Insurance Card',
    description: 'Your dental insurance card with member ID and group number (if applicable)',
  },
  {
    icon: ClipboardList,
    title: 'Medication List',
    description: 'List of all current medications, vitamins, and supplements you are taking',
  },
  {
    icon: FileText,
    title: 'Dental Records',
    description: 'Previous X-rays and dental records from your former dentist (if available)',
  },
];

// Office policies highlights
const policies = [
  {
    icon: Clock,
    title: 'Appointment Policy',
    items: [
      'Please arrive 15 minutes early for your first visit',
      '48-hour notice required for cancellations',
      'Late arrivals may need to be rescheduled',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment Policy',
    items: [
      'Payment is due at the time of service',
      'We accept cash, debit, Visa, MC, and AMEX',
      'Direct billing to most insurance companies',
    ],
  },
  {
    icon: Shield,
    title: 'Insurance & CDCP',
    items: [
      'We accept most major insurance providers',
      'CDCP (Canadian Dental Care Plan) accepted',
      'We will estimate your coverage before treatment',
    ],
  },
];

// Benefits of choosing Ottawa South Dental
const whyChooseUs = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'We take time to listen to your concerns and create personalized treatment plans.',
  },
  {
    icon: Languages,
    title: 'Multilingual Team',
    description: 'We speak English, French, Spanish, Hindi, Punjabi, Farsi, and Arabic.',
  },
  {
    icon: Sparkles,
    title: 'Modern Technology',
    description: 'Digital X-rays with 90% less radiation and advanced diagnostic tools.',
  },
  {
    icon: Shield,
    title: 'CDCP Accepted',
    description: 'Proud to accept the Canadian Dental Care Plan for eligible patients.',
  },
];

export default function NewPatientInfoPage() {
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Welcome New Patients
              </span>
              <h1 className="font-display font-bold tracking-tight text-fluid-4xl md:text-fluid-5xl text-foreground leading-tight">
                Your First Visit
                <span className="block text-[#722F37]">Made Simple</span>
              </h1>
              <p className="mt-6 text-fluid-lg text-foreground-secondary max-w-xl">
                We are excited to welcome you to our dental family! Here is everything you need
                to know to prepare for your first appointment with us.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact#book">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                  >
                    Book Your First Visit
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

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  CDCP Accepted
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  Direct Insurance Billing
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  7 Languages Spoken
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/clinic/clinic-01.jpg"
                  alt="Welcoming reception area at Ottawa South Dental"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-xl shadow-lg p-4 md:p-5 border border-[#EDE5DD]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">20+ Years</p>
                    <p className="text-sm text-foreground-secondary">Serving Ottawa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <SectionContainer background="white" paddingY="lg">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Heading
            variant="section-title"
            align="center"
            subtitle="Have these items ready to ensure a smooth check-in process"
          >
            What to Bring
          </Heading>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {requiredDocuments.map((doc, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center mb-5">
                <doc.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {doc.title}
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {doc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Patient Forms Note */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 md:p-8 border border-primary-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white shadow-soft flex items-center justify-center">
              <Download className="w-8 h-8 text-[#722F37]" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Save Time with Online Forms
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Complete your patient registration forms online before your visit to save time
                at check-in. Contact us to receive the forms by email, or pick them up at our
                office before your appointment.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  Request Forms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* What to Expect Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <Heading
              variant="section-title"
              subtitle="Your comfort is our priority. Here's what you can expect during your first visit with us"
            >
              Your First Appointment
            </Heading>

            <div className="mt-8 space-y-6">
              {firstVisitSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#722F37] text-white font-semibold flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <span className="text-xs text-foreground-secondary bg-white/80 px-2 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-white rounded-xl border border-[#EDE5DD] shadow-soft">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#722F37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Plan Ahead</p>
                  <p className="text-sm text-foreground-secondary">
                    Your first appointment typically lasts 60-90 minutes. Please plan accordingly
                    and arrive 15 minutes early to complete any remaining paperwork.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/clinic/clinic-05.jpg"
                alt="Dentist consulting with a patient at Ottawa South Dental"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary-100" />
          </div>
        </div>
      </SectionContainer>

      {/* Office Policies Section */}
      <SectionContainer background="white" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Understanding our policies helps ensure a smooth experience for all patients"
        >
          Office Policies
        </Heading>

        <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 md:p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-5">
                <policy.icon className="w-7 h-7 text-[#722F37]" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                {policy.title}
              </h3>
              <ul className="space-y-3">
                {policy.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 bg-[#722F37] rounded-2xl p-8 md:p-10 text-center">
          <h3 className="font-display font-semibold text-2xl text-white mb-3">
            Payment Methods Accepted
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            We offer flexible payment options to make dental care accessible for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Interac / Debit', 'Visa', 'MasterCard', 'American Express', 'Cash'].map(
              (method) => (
                <span
                  key={method}
                  className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>
      </SectionContainer>

      {/* Why Choose Us Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Discover what makes Ottawa South Dental the right choice for your family"
        >
          Why Choose Us
        </Heading>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 border border-[#EDE5DD] text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer background="white" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Find answers to common questions from new patients"
        >
          Frequently Asked Questions
        </Heading>

        <div className="mt-12 max-w-3xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
      </SectionContainer>

      {/* Location Quick Info */}
      <SectionContainer background="secondary" paddingY="md">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#EDE5DD] shadow-soft">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#722F37]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Our Location</p>
                <p className="text-sm text-foreground-secondary">
                  {contactInfo.address.street}, {contactInfo.address.city},{' '}
                  {contactInfo.address.province}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#722F37]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Office Hours</p>
                <p className="text-sm text-foreground-secondary">
                  Mon-Fri: 9am-5pm | Sat: 9am-2pm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-[#722F37]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Free Parking</p>
                <p className="text-sm text-foreground-secondary">
                  Convenient on-site parking available
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <ContactCtaBanner
        variant="full"
        background="gradient"
        headline="Ready to Join Our Dental Family?"
        description="We are excited to meet you! Book your first appointment today and experience the warm, welcoming care that Ottawa South Dental is known for."
        phoneNumber={contactInfo.phone}
        showEmergency={true}
        emergencyMessage="Same-day emergency appointments available"
        showHours={true}
        showLocation={true}
        showLanguages={true}
        bookUrl="/contact#book"
        bookText="Book Your First Visit"
      />
    </main>
  );
}
