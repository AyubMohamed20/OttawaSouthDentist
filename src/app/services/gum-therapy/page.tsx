import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  Heart,
  ShieldCheck,
  AlertCircle,
  Activity,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Clock,
  HeartPulse,
  Syringe,
  Scissors,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/card';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';
import { structuredData, JsonLd } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Gum Therapy | Ottawa South Dental',
  description:
    'Expert periodontal treatment and gum disease management at Ottawa South Dental. Scaling and root planing, antibiotic therapy, and comprehensive maintenance programs to restore your gum health.',
  keywords: [
    'gum therapy Ottawa',
    'gum disease treatment Ottawa',
    'periodontal treatment Ottawa',
    'scaling and root planing',
    'gingivitis treatment',
    'periodontitis treatment',
    'bleeding gums treatment',
    'receding gums Ottawa',
    'deep cleaning dentist Ottawa',
    'gum health Ottawa',
    'Ottawa South Dental gum therapy',
  ],
  openGraph: {
    title: 'Gum Therapy | Ottawa South Dental',
    description:
      'Comprehensive periodontal treatment and gum disease management. Expert care to restore your gum health and prevent tooth loss.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'Ottawa South Dental',
    images: [
      {
        url: '/images/hygiene/hygiene-03.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional gum therapy treatment at Ottawa South Dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gum Therapy | Ottawa South Dental',
    description:
      'Expert periodontal treatment and gum disease management to restore your gum health.',
    images: ['/images/hygiene/hygiene-03.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/services/gum-therapy',
  },
};

// Signs of gum disease
const warningSign = [
  'Red, swollen, or tender gums',
  'Bleeding when brushing or flossing',
  'Receding gums or longer-appearing teeth',
  'Persistent bad breath (halitosis)',
  'Loose or shifting teeth',
  'Changes in your bite',
  'Pus between teeth and gums',
  'Pain when chewing',
];

// Stages of gum disease
const stages = [
  {
    stage: 'Gingivitis',
    severity: 'Early Stage',
    description:
      'Inflammation of the gums caused by plaque buildup. Gums may appear red, swollen, and bleed easily. This stage is fully reversible with proper treatment and improved oral hygiene.',
    reversible: true,
  },
  {
    stage: 'Periodontitis',
    severity: 'Moderate Stage',
    description:
      'The infection spreads below the gum line, causing pockets to form between teeth and gums. Bone loss begins, but significant damage can be prevented with prompt treatment.',
    reversible: false,
  },
  {
    stage: 'Advanced Periodontitis',
    severity: 'Severe Stage',
    description:
      'Extensive bone and tissue destruction leads to loose teeth and potential tooth loss. Aggressive treatment is needed to save remaining teeth and halt further damage.',
    reversible: false,
  },
];

// Non-surgical treatments
const nonSurgicalTreatments = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Deep Cleaning (Scaling & Root Planing)',
    description:
      'Thorough removal of plaque and tartar from below the gum line, followed by smoothing of tooth roots to help gums reattach.',
  },
  {
    icon: <Syringe className="w-6 h-6" />,
    title: 'Antibiotic Therapy',
    description:
      'Targeted antimicrobial treatments, including medicated mouth rinses and locally applied antibiotics, to control bacterial infection.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Improved Home Care Routine',
    description:
      'Personalized oral hygiene instructions and guidance on proper brushing, flossing, and interdental cleaning techniques.',
  },
];

// Surgical treatments
const surgicalTreatments = [
  {
    icon: <Scissors className="w-6 h-6" />,
    title: 'Pocket Reduction Surgery',
    description:
      'Reduces the depth of periodontal pockets by folding back gum tissue, removing bacteria, and securing the tissue in place.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Gum Grafting',
    description:
      'Transplants healthy gum tissue to cover exposed roots and restore gum coverage, reducing sensitivity and preventing further recession.',
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Bone Grafting',
    description:
      'Rebuilds bone lost to periodontitis using natural or synthetic bone material to support teeth and prepare for implants.',
  },
];

// Benefits
const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Prevent Tooth Loss',
    description:
      'Stop gum disease progression before it destroys the bone and tissue supporting your teeth.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Protect Overall Health',
    description:
      'Reduce your risk of heart disease, diabetes complications, and other systemic conditions linked to gum disease.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Fresher Breath',
    description:
      'Eliminate the bacteria and infection that cause persistent bad breath (halitosis).',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Early Intervention',
    description:
      'Catch and treat gum disease early when treatment is simpler, more effective, and less invasive.',
  },
];

// FAQ data
const faqItems = [
  {
    question: 'Is gum disease reversible?',
    answer:
      'Gingivitis, the early stage of gum disease, is fully reversible with proper professional treatment and improved home care. However, once gum disease progresses to periodontitis, the damage to bone and tissue cannot be fully reversed—but it can be managed effectively. Early intervention is key, which is why regular dental checkups are so important for catching gum disease in its earliest, most treatable stage.',
  },
  {
    question: 'How can I prevent gum disease?',
    answer:
      'Prevention involves a combination of excellent home care and regular professional visits. Brush twice daily with fluoride toothpaste, floss daily to remove plaque between teeth, and use an antimicrobial mouthwash if recommended. Avoid tobacco products, eat a balanced diet, and manage conditions like diabetes that can increase your risk. Most importantly, visit us regularly for professional cleanings and checkups—we can remove hardened plaque (tartar) that brushing alone cannot.',
  },
  {
    question: 'What does gum therapy treatment involve?',
    answer:
      'Treatment depends on the severity of your condition. For early gum disease, we typically start with scaling and root planing (deep cleaning), which removes bacteria and tartar from below the gum line and smooths the tooth roots. We may also prescribe antibiotics or antimicrobial rinses. For advanced cases, surgical options like pocket reduction, gum grafting, or bone grafting may be recommended. We\'ll create a personalized treatment plan based on your specific needs.',
  },
  {
    question: 'Is scaling and root planing painful?',
    answer:
      'We prioritize your comfort during every procedure. Scaling and root planing is performed under local anesthesia, so you should not feel pain during the treatment. You may experience some sensitivity or mild discomfort for a few days afterward, which can be managed with over-the-counter pain relievers and saltwater rinses. Our team will provide detailed aftercare instructions and is always available to address any concerns.',
  },
  {
    question: 'How often will I need to come in for maintenance after gum therapy?',
    answer:
      'After initial gum therapy, most patients require periodontal maintenance visits every 3 to 4 months rather than the standard 6-month cleaning schedule. These more frequent visits allow us to monitor your gum health closely, remove any new bacterial buildup, and catch any signs of disease recurrence early. Over time, if your gum health stabilizes, we may be able to extend the interval between visits.',
  },
];

// Related services
const relatedServices = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Dental Hygiene',
    description:
      'Professional teeth cleaning and periodontal maintenance to keep your gums healthy after treatment.',
    href: '/services/dental-hygiene',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Routine Checkups',
    description:
      'Regular examinations to monitor your gum health and catch any early signs of disease recurrence.',
    href: '/services/routine-checkups',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Preventive Dentistry',
    description:
      'Fluoride treatments and oral hygiene education to support your long-term gum health.',
    href: '/services/preventive-dentistry',
  },
];

// Process steps
const processSteps = [
  {
    step: '1',
    title: 'Comprehensive Evaluation',
    description:
      'We measure pocket depths, assess bone loss, and evaluate the overall health of your gums to determine the stage of disease.',
  },
  {
    step: '2',
    title: 'Personalized Treatment Plan',
    description:
      'Based on your evaluation, we create a customized treatment plan addressing your specific condition and goals.',
  },
  {
    step: '3',
    title: 'Active Treatment',
    description:
      'We perform the recommended procedures, whether non-surgical deep cleaning or surgical intervention, to eliminate infection.',
  },
  {
    step: '4',
    title: 'Ongoing Maintenance',
    description:
      'Regular maintenance visits and home care guidance help you maintain results and prevent disease recurrence.',
  },
];

// Breadcrumb data for structured data
const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Gum Therapy', url: '/services/gum-therapy' },
];

// Service data for structured data
const serviceData = {
  name: 'Gum Therapy',
  description: 'Expert periodontal treatment and gum disease management at Ottawa South Dental. Scaling and root planing, antibiotic therapy, and comprehensive maintenance programs.',
  url: '/services/gum-therapy',
  image: '/images/hygiene/hygiene-03.jpg',
};

export default function GumTherapyPage() {
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <main id="main-content" className="min-h-screen">
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Gum Therapy',
        description: serviceData.description,
        url: serviceData.url,
      })} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-primary-50/30">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/3 translate-x-1/4 rounded-full bg-gradient-to-br from-primary-100/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/2 -translate-x-1/4 rounded-full bg-gradient-to-tr from-secondary-100/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                {/* Breadcrumb */}
                <nav className="mb-6 animate-fade-in" aria-label="Breadcrumb">
                  <ol className="flex items-center justify-center lg:justify-start gap-2 text-sm text-foreground-secondary">
                    <li>
                      <Link href="/" className="hover:text-[#722F37] transition-colors">
                        Home
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <Link href="/services" className="hover:text-[#722F37] transition-colors">
                        Services
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-[#722F37] font-medium">Gum Therapy</li>
                  </ol>
                </nav>

                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6 animate-fade-in"
                  style={{ animationDelay: '50ms' }}
                >
                  <Heart className="w-4 h-4" />
                  Periodontal Care
                </div>

                {/* Headline */}
                <h1
                  className="font-display font-bold tracking-tight text-fluid-4xl sm:text-fluid-5xl lg:text-fluid-6xl text-foreground leading-[1.1] animate-fade-in-up"
                  style={{ animationDelay: '100ms' }}
                >
                  Gum
                  <br />
                  <span className="text-[#722F37]">Therapy</span>
                </h1>

                {/* Description */}
                <p
                  className="mt-6 text-fluid-lg text-foreground-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: '200ms' }}
                >
                  Restore your gum health with expert periodontal treatment. From early gingivitis to
                  advanced periodontitis, our comprehensive gum therapy programs help you protect your
                  teeth and maintain a healthy smile for life.
                </p>

                {/* CTA Buttons */}
                <div
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  <Link href="/book">
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<Calendar className="w-5 h-5" />}
                    >
                      Book This Service
                    </Button>
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white text-[#722F37] border-2 border-[#EDE5DD] shadow-sm hover:shadow-md hover:border-[#722F37]/20 hover:bg-[#FDF8F3] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span>{formattedPhone}</span>
                  </a>
                </div>

                {/* Trust indicators */}
                <div
                  className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    Gentle, Experienced Care
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    Personalized Treatment Plans
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    Ongoing Support
                  </span>
                </div>
              </div>

              {/* Hero Image */}
              <div
                className="relative order-1 lg:order-2 animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                <div className="relative">
                  <div
                    className="absolute -inset-4 lg:-inset-6 bg-gradient-to-br from-[#722F37]/10 via-primary-100/30 to-secondary-100/20 rounded-[2rem] lg:rounded-[2.5rem] -z-10"
                    aria-hidden="true"
                  />
                  <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/hygiene/hygiene-03.jpg"
                      alt="Professional gum therapy treatment at Ottawa South Dental"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-6">
                <AlertCircle className="w-4 h-4" />
                Know the Signs
              </div>
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
                Signs of <span className="text-[#722F37]">Gum Disease</span>
              </h2>
              <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
                Gum disease often develops silently, but there are warning signs you should not ignore.
                Early detection is crucial for successful treatment and preventing permanent damage.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {warningSign.map((sign, index) => (
                  <div
                    key={sign}
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-0.5">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <span className="text-foreground-secondary">{sign}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm text-foreground-secondary bg-[#FDF8F3] rounded-xl p-4 border border-[#EDE5DD]">
                <strong className="text-foreground">Notice any of these symptoms?</strong> Do not
                wait—contact us for an evaluation. Early treatment can save your teeth and prevent
                costly procedures later.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-br from-[#722F37]/5 via-primary-100/20 to-transparent rounded-[2rem] -z-10"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hygiene/hygiene-10.jpg"
                  alt="Dentist examining patient's gum health"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Stages of <span className="text-[#722F37]">Gum Disease</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
              Understanding the progression of gum disease helps you take action at the right time.
              The earlier we intervene, the better your outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <div
                key={stage.stage}
                className={`relative p-6 md:p-8 rounded-2xl border animate-fade-in-up ${
                  index === 0
                    ? 'bg-green-50/50 border-green-200'
                    : index === 1
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-red-50/50 border-red-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    index === 0
                      ? 'bg-green-100 text-green-700'
                      : index === 1
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stage.severity}
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {stage.stage}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  {stage.description}
                </p>
                {stage.reversible && (
                  <div className="mt-4 flex items-center gap-2 text-green-700 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Fully reversible with treatment
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Options Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Treatment <span className="text-[#722F37]">Options</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
              We offer a comprehensive range of treatments tailored to your specific condition, from
              conservative non-surgical approaches to advanced surgical solutions.
            </p>
          </div>

          {/* Non-Surgical */}
          <div className="mb-12">
            <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#722F37]" />
              </span>
              Non-Surgical Treatments
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonSurgicalTreatments.map((treatment, index) => (
                <div
                  key={treatment.title}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ServiceCard
                    icon={treatment.icon}
                    title={treatment.title}
                    description={treatment.description}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Surgical */}
          <div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-[#722F37]" />
              </span>
              Surgical Treatments
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {surgicalTreatments.map((treatment, index) => (
                <div
                  key={treatment.title}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ServiceCard
                    icon={treatment.icon}
                    title={treatment.title}
                    description={treatment.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div
                className="absolute -inset-4 bg-gradient-to-br from-[#722F37]/5 via-primary-100/20 to-transparent rounded-[2rem] -z-10"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hygiene/hygiene-15.jpg"
                  alt="Happy patient after successful gum therapy treatment"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
                Why Choose <span className="text-[#722F37]">Gum Therapy?</span>
              </h2>
              <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
                Treating gum disease is not just about your oral health—it is an investment in your
                overall wellbeing. Healthy gums support healthy teeth and a healthier body.
              </p>

              <div className="mt-8 space-y-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="flex gap-4 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE5] to-[#EDE5DD] text-[#722F37] flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-foreground-secondary mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              What to <span className="text-[#722F37]">Expect</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
              Our gum therapy process is designed to be thorough yet comfortable, with clear
              communication at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-white via-white to-[#FDF8F3]/50 border border-[#EDE5DD] animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#722F37] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Frequently Asked <span className="text-[#722F37]">Questions</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base">
              Get answers to common questions about gum therapy and periodontal treatment.
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Related <span className="text-[#722F37]">Services</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base">
              Explore other services that complement your gum therapy treatment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <div
                key={service.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactCtaBanner
        headline="Ready to Restore Your Gum Health?"
        description="Do not let gum disease compromise your smile or your health. Schedule your comprehensive periodontal evaluation today and take the first step toward healthier gums."
        bookText="Book This Service"
        background="gradient"
      />
    </main>
  );
}
