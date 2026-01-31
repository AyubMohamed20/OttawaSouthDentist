import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Puzzle,
  ShieldCheck,
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Phone,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { ContactCTA } from '@/components/sections/ContactCTA';
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

// FAQ data for the accordion
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
    question: 'What happens if I don\'t replace missing teeth?',
    answer:
      'Leaving missing teeth unreplaced can lead to several problems: remaining teeth may shift into the gap causing bite issues, jawbone loss occurs where the tooth root was, facial appearance can change as bone deteriorates, chewing efficiency decreases, speech may be affected, and there\'s increased risk of decay and gum disease on adjacent teeth. Early replacement helps prevent these complications.',
  },
  {
    question: 'Are dentures comfortable to wear?',
    answer:
      'Modern dentures are designed for comfort and a natural fit. There\'s typically an adjustment period of a few weeks while your mouth adapts. We take precise impressions and make adjustments to ensure the best fit possible. Implant-supported dentures offer superior stability and comfort because they\'re anchored securely rather than relying solely on suction or adhesives.',
  },
  {
    question: 'How do I care for my tooth replacement?',
    answer:
      'Care depends on the type of replacement. Implants and bridges are cared for like natural teeth—brush twice daily, floss (including under bridges), and maintain regular dental visits. Removable dentures should be taken out at night, cleaned daily with denture cleaner, and soaked in water or denture solution. All replacements benefit from regular dental checkups to ensure proper fit and function.',
  },
];

// Related services data
const relatedServices = [
  {
    title: 'Dental Implants',
    description:
      'Permanent, natural-looking tooth replacements that preserve bone and function like real teeth.',
    href: '/services/dental-implants',
    icon: Puzzle,
  },
  {
    title: 'Dentures',
    description:
      'Complete and partial dentures for comfortable, affordable tooth replacement solutions.',
    href: '/services/dentures',
    icon: Sparkles,
  },
  {
    title: 'Cosmetic Dentistry',
    description:
      'Enhance your smile with whitening, veneers, and other aesthetic dental treatments.',
    href: '/services/cosmetic-dentistry',
    icon: Heart,
  },
];

// Benefits data
const benefits = [
  {
    icon: Sparkles,
    title: 'Restore Your Smile',
    description:
      'Fill gaps and regain confidence with natural-looking tooth replacements.',
  },
  {
    icon: ShieldCheck,
    title: 'Prevent Further Problems',
    description:
      'Stop teeth shifting, bone loss, and bite issues caused by missing teeth.',
  },
  {
    icon: Heart,
    title: 'Improve Quality of Life',
    description:
      'Eat, speak, and smile comfortably without worrying about your teeth.',
  },
  {
    icon: Puzzle,
    title: 'Multiple Options Available',
    description:
      'Choose from implants, bridges, or dentures based on your needs and budget.',
  },
];

// Treatment options data
const treatmentOptions = [
  {
    title: 'Dental Implants',
    description: 'Permanent, standalone tooth replacements with titanium posts that fuse with your jawbone.',
    benefits: [
      'Best for long-term durability',
      'Preserves jawbone health',
      'Looks and functions like natural teeth',
      'No impact on adjacent teeth',
    ],
    ideal: 'Single or multiple missing teeth with adequate bone',
  },
  {
    title: 'Dental Bridges',
    description: 'Fixed prosthetic anchored to adjacent teeth to span the gap of missing teeth.',
    benefits: [
      'Non-surgical solution',
      'Fixed (non-removable) restoration',
      'Faster treatment timeline',
      'Good when neighbors need crowns',
    ],
    ideal: 'One or a few adjacent missing teeth',
  },
  {
    title: 'Partial Dentures',
    description: 'Removable appliance that replaces multiple missing teeth while preserving remaining teeth.',
    benefits: [
      'Cost-effective option',
      'Easily adjusted or replaced',
      'Non-invasive treatment',
      'Can replace teeth anywhere in arch',
    ],
    ideal: 'Multiple missing teeth with healthy remaining teeth',
  },
  {
    title: 'Full Dentures',
    description: 'Complete tooth replacement for upper or lower arch when all teeth are missing.',
    benefits: [
      'Restores full smile',
      'Improves chewing ability',
      'Traditional or implant-supported',
      'Affordable full-arch solution',
    ],
    ideal: 'Complete tooth loss in one or both arches',
  },
];

// Consequences data
const consequences = [
  'Shifting of remaining teeth into gaps',
  'Bone loss in the jaw where roots are missing',
  'Changes in facial appearance over time',
  'Difficulty chewing and speaking',
  'Increased risk of decay and gum disease',
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Missing Teeth Solutions', url: '/services/missing-teeth' },
];

// Service data for structured data
const serviceData = {
  name: 'Missing Teeth Solutions',
  description: 'Comprehensive missing teeth replacement options in Ottawa including dental implants, bridges, partial and full dentures.',
  url: '/services/missing-teeth',
  image: '/images/implants/implants-01.jpg',
};

export default function MissingTeethPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqs)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Missing Teeth Solutions',
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
                <Puzzle className="w-4 h-4" />
                Restorative Solutions
              </span>
              <h1 className="font-display font-bold tracking-tight text-fluid-4xl md:text-fluid-5xl text-foreground leading-tight">
                Missing Teeth Solutions
                <span className="block text-[#722F37]">Restore Your Complete Smile</span>
              </h1>
              <p className="mt-6 text-fluid-lg text-foreground-secondary max-w-xl">
                Comprehensive tooth replacement options including dental implants, bridges, and
                dentures. We&apos;ll help you find the perfect solution to restore your smile,
                confidence, and oral function.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact#book">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                  >
                    Book Consultation
                  </Button>
                </Link>
                <a
                  href="tel:6137331118"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] hover:border-[#722F37]/30 hover:bg-[#FDF8F3] transition-all duration-200 shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1118
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  Free Consultation
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  Multiple Options
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  Flexible Payment Plans
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/implants/implants-01.jpg"
                  alt="Missing teeth replacement solutions at Ottawa South Dental"
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
                    <Puzzle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Complete Solutions</p>
                    <p className="text-sm text-foreground-secondary">For Every Need</p>
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
            subtitle="Missing teeth can affect your appearance, speech, and ability to chew. We offer several proven options to replace missing teeth and restore your oral health"
          >
            Treatment Options Comparison
          </Heading>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {treatmentOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] rounded-2xl p-6 md:p-8"
            >
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {option.title}
              </h3>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                {option.description}
              </p>
              <ul className="space-y-2 mb-4">
                {option.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                    <span className="text-sm text-foreground-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-[#EDE5DD]">
                <p className="text-sm">
                  <span className="font-medium text-foreground">Ideal for: </span>
                  <span className="text-foreground-secondary">{option.ideal}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Replacing missing teeth does more than improve your appearance—it protects your long-term oral and overall health"
        >
          Why Replace Missing Teeth
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

      {/* Consequences Section */}
      <SectionContainer background="white" paddingY="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Heading
              variant="section-title"
              subtitle="Understanding the risks of leaving gaps in your smile helps you make an informed decision about treatment"
            >
              Consequences of Not Replacing Missing Teeth
            </Heading>

            <div className="mt-8 space-y-4">
              {consequences.map((consequence, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-foreground-secondary leading-relaxed pt-1">
                    {consequence}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-foreground-secondary leading-relaxed">
              The good news is that all of these problems can be prevented with timely tooth
              replacement. Our team will help you choose the best option for your situation.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/implants/implants-05.jpg"
                alt="Dental consultation for missing teeth replacement"
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

      {/* Process Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="We guide you through every step of your tooth replacement journey"
        >
          What to Expect
        </Heading>

        <div className="mt-12 grid md:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              step: 1,
              title: 'Consultation',
              description:
                'Comprehensive exam, X-rays, and discussion of your goals and options.',
            },
            {
              step: 2,
              title: 'Treatment Planning',
              description:
                'We create a personalized plan based on your needs, timeline, and budget.',
            },
            {
              step: 3,
              title: 'Treatment',
              description:
                'Comfortable procedures with clear communication at every step.',
            },
            {
              step: 4,
              title: 'Follow-Up Care',
              description:
                'Regular checkups to ensure long-lasting results and your satisfaction.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-soft border border-[#EDE5DD]"
            >
              <div className="w-12 h-12 rounded-full bg-[#722F37] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {item.step}
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
          subtitle="Find answers to common questions about missing teeth replacement options"
        >
          Frequently Asked Questions
        </Heading>

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 rounded-2xl border border-[#EDE5DD] overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-foreground hover:bg-[#FDF8F3]/50 transition-colors">
                <span className="pr-4">{faq.question}</span>
                <ChevronRight className="w-5 h-5 text-[#722F37] flex-shrink-0 transition-transform duration-200 group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-foreground-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </SectionContainer>

      {/* Related Services Section */}
      <SectionContainer background="secondary" paddingY="lg">
        <Heading
          variant="section-title"
          align="center"
          subtitle="Explore these related services to complete your smile restoration"
        >
          Related Services
        </Heading>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedServices.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-white border border-[#EDE5DD] rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
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
      <ContactCTA
        variant="full"
        background="gradient"
        headline="Ready to Restore Your Complete Smile?"
        description="Book a consultation today to discuss your missing teeth replacement options. Our experienced team will help you find the perfect solution for your needs and budget."
        phoneNumber="6137331118"
        phoneDisplay="(613) 733-1118"
        showEmergency={false}
        showHours={true}
        hoursText="Mon-Sat: 9am-5pm"
        bookUrl="/contact#book"
        bookText="Book This Service"
      />
    </main>
  );
}
