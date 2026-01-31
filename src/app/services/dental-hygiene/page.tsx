import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Clock,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowRight,
  Stethoscope,
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Dental Hygiene | Ottawa South Dental',
  description:
    'Professional dental hygiene services in Ottawa including teeth cleaning, deep cleaning (scaling and root planing), and periodontal maintenance. Keep your smile healthy with our expert hygienists.',
  keywords: [
    'dental hygiene Ottawa',
    'teeth cleaning Ottawa',
    'deep cleaning dentist Ottawa',
    'scaling and root planing Ottawa',
    'periodontal maintenance Ottawa',
    'dental cleaning near me',
    'professional teeth cleaning',
    'Ottawa South Dental hygiene',
  ],
  openGraph: {
    title: 'Dental Hygiene | Ottawa South Dental',
    description:
      'Professional dental hygiene services including teeth cleaning, deep cleaning, and periodontal maintenance. Expert care for healthy gums and teeth.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Hygiene | Ottawa South Dental',
    description:
      'Professional dental hygiene services including teeth cleaning, deep cleaning, and periodontal maintenance.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/dental-hygiene',
  },
};

// FAQ data for the accordion
const faqs = [
  {
    question: 'Why is professional cleaning important if I brush and floss regularly?',
    answer:
      'Even with excellent home care, plaque can build up in hard-to-reach areas that your toothbrush and floss cannot effectively clean. Over time, this plaque hardens into tartar (calculus), which can only be removed by professional dental instruments. Regular professional cleanings help prevent gum disease, cavities, and other oral health issues while keeping your breath fresh and your smile bright.',
  },
  {
    question: 'What is the difference between regular cleaning and deep cleaning?',
    answer:
      'Regular cleaning (prophylaxis) removes plaque and tartar from above the gum line and is ideal for patients with healthy gums. Deep cleaning (scaling and root planing) treats buildup below the gum line and smooths the tooth roots to help gums reattach. Deep cleaning is typically recommended for patients showing signs of gum disease, such as bleeding gums, receding gums, or periodontal pockets.',
  },
  {
    question: 'How often should I get my teeth professionally cleaned?',
    answer:
      'Most patients benefit from professional cleanings every 6 months. However, if you have gum disease, a history of cavities, or other risk factors, your dentist may recommend more frequent visits—typically every 3 to 4 months. During your appointment, our hygienists will assess your oral health and recommend a cleaning schedule tailored to your needs.',
  },
  {
    question: 'Does teeth cleaning hurt?',
    answer:
      'Professional teeth cleaning is generally comfortable for most patients. You may feel some pressure or slight sensitivity during the process, particularly if you have sensitive teeth or significant tartar buildup. For patients who experience anxiety or discomfort, we offer gentle techniques and can discuss options to ensure your comfort throughout the procedure.',
  },
  {
    question: 'What can I expect during a dental hygiene appointment?',
    answer:
      'Your appointment typically includes a thorough examination of your teeth and gums, removal of plaque and tartar using specialized instruments, polishing to remove surface stains, flossing between all teeth, and personalized oral hygiene instructions. We may also recommend fluoride treatment for additional protection. The entire process usually takes 45 minutes to an hour.',
  },
];

// Related services data
const relatedServices = [
  {
    title: 'Routine Checkups',
    description:
      'Comprehensive dental examinations to detect problems early and maintain your oral health.',
    href: '/services/routine-checkups',
    icon: Stethoscope,
  },
  {
    title: 'Preventive Dentistry',
    description:
      'Fluoride treatments, sealants, and custom mouthguards to protect your teeth from decay and damage.',
    href: '/services/preventive-dentistry',
    icon: ShieldCheck,
  },
  {
    title: 'Gum Therapy',
    description:
      'Specialized treatment for gum disease to restore your periodontal health and prevent tooth loss.',
    href: '/services/gum-therapy',
    icon: Heart,
  },
];

// Benefits data
const benefits = [
  {
    icon: Sparkles,
    title: 'Brighter, Cleaner Smile',
    description:
      'Remove stubborn stains and tartar buildup that brushing alone cannot eliminate.',
  },
  {
    icon: ShieldCheck,
    title: 'Prevent Gum Disease',
    description:
      'Regular cleanings significantly reduce your risk of gingivitis and periodontitis.',
  },
  {
    icon: Heart,
    title: 'Better Overall Health',
    description:
      'Good oral health is linked to lower risk of heart disease, diabetes complications, and more.',
  },
  {
    icon: Clock,
    title: 'Early Problem Detection',
    description:
      'Catch cavities, oral cancer, and other issues early when they are easier to treat.',
  },
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Assessment',
    description:
      'We examine your teeth and gums, checking for signs of decay, gum disease, and other concerns.',
  },
  {
    step: 2,
    title: 'Scaling',
    description:
      'Using specialized instruments, we carefully remove plaque and tartar from all tooth surfaces.',
  },
  {
    step: 3,
    title: 'Polishing',
    description:
      'We polish your teeth with a gentle gritty paste to remove surface stains and smooth enamel.',
  },
  {
    step: 4,
    title: 'Flossing',
    description:
      'A thorough flossing removes any remaining debris and cleans between your teeth.',
  },
  {
    step: 5,
    title: 'Fluoride Treatment',
    description:
      'Optional protective fluoride treatment helps strengthen enamel and prevent cavities.',
  },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Dental Hygiene', url: '/services/dental-hygiene' },
];

// Service data for structured data
const serviceData = {
  name: 'Dental Hygiene',
  description: 'Professional dental hygiene services in Ottawa including teeth cleaning, deep cleaning (scaling and root planing), and periodontal maintenance.',
  url: '/services/dental-hygiene',
  image: '/images/hygiene/hygiene-01.jpg',
};

export default function DentalHygienePage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqs)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Dental Hygiene Services',
        description: serviceData.description,
        url: serviceData.url,
      })} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-100/30" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#722F37]/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Professional Care
              </span>
              <h1 className="font-display font-bold tracking-tight text-fluid-4xl md:text-fluid-5xl text-foreground leading-tight">
                Dental Hygiene
                <span className="block text-[#722F37]">For a Healthier Smile</span>
              </h1>
              <p className="mt-6 text-fluid-lg text-foreground-secondary max-w-xl">
                Professional cleaning, deep cleaning (scaling and root planing), and personalized
                periodontal maintenance to keep your teeth and gums healthy for life.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact#book">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                  >
                    Book Cleaning
                  </Button>
                </Link>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3] transition-all duration-200 shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                  ({contactInfo.phone.slice(0, 3)}) {contactInfo.phone.slice(3, 6)}-{contactInfo.phone.slice(6)}
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
                  Gentle, Experienced Hygienists
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hygiene/hygiene-01.jpg"
                  alt="Professional dental hygiene cleaning at Ottawa South Dental"
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
                    <Sparkles className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">20+ Years</p>
                    <p className="text-sm text-foreground-secondary">Expert Care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description Section */}
      <SectionContainer background="white" paddingY="lg">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Heading
            variant="section-title"
            align="center"
            subtitle="Our comprehensive dental hygiene services help you maintain optimal oral health and a beautiful smile"
          >
            What We Offer
          </Heading>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Main description */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 md:p-8">
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                Professional Teeth Cleaning
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Our skilled dental hygienists provide thorough teeth cleaning (prophylaxis) that
                goes beyond what you can achieve at home. We carefully remove plaque and tartar
                buildup, polish your teeth to remove surface stains, and assess your gum health
                to catch any early signs of disease.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 md:p-8">
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                Deep Cleaning (Scaling & Root Planing)
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                For patients with gum disease or significant buildup below the gum line, we offer
                deep cleaning treatments. Scaling removes hardened deposits from below the gums,
                while root planing smooths the tooth roots to help your gums heal and reattach
                properly.
              </p>
            </div>
          </div>

          {/* Services list */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-6 md:p-8">
            <h3 className="font-display font-semibold text-xl text-foreground mb-6">
              Our Hygiene Services Include
            </h3>
            <ul className="space-y-4">
              {[
                'Thorough teeth cleaning (prophylaxis)',
                'Removal of plaque and tartar buildup',
                'Polishing to remove surface stains',
                'Comprehensive gum health assessment',
                'Personalized oral hygiene instructions',
                'Deep cleaning (scaling and root planing)',
                'Periodontal maintenance programs',
                'Fluoride treatments for cavity prevention',
              ].map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-secondary">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Regular professional dental hygiene appointments offer benefits that extend far beyond a clean smile"
        >
          Why Regular Cleanings Matter
        </Heading>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 border border-[#EDE5DD]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center mb-5">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Process Section */}
      <SectionContainer background="white" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Heading
              variant="section-title"
              subtitle="Our gentle, thorough cleaning process ensures you leave with a fresh, healthy smile"
            >
              What to Expect
            </Heading>

            <div className="mt-8 space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#722F37] text-white font-semibold flex items-center justify-center">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hygiene/hygiene-05.jpg"
                alt="Dental hygienist performing professional teeth cleaning"
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

      {/* FAQ Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Find answers to common questions about our dental hygiene services"
        >
          Frequently Asked Questions
        </Heading>

        <div className="mt-12 max-w-3xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
      </SectionContainer>

      {/* Related Services Section */}
      <SectionContainer background="white" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Complete your oral health care with these complementary services"
        >
          Related Services
        </Heading>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedServices.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-[#722F37] transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-[#722F37] transition-colors">
                {service.title}
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-[#722F37] group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <ContactCtaBanner
        variant="full"
        background="gradient"
        headline="Ready for Your Professional Cleaning?"
        description="Book your dental hygiene appointment today and experience the difference professional care makes. Our gentle hygienists are here to help you achieve your healthiest smile."
        phoneNumber={contactInfo.phone}
        showEmergency={false}
        showHours={true}
        showLocation={true}
        showLanguages={true}
        bookUrl="/contact#book"
        bookText="Book This Service"
      />
    </main>
  );
}
