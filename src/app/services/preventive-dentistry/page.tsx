import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Calendar,
  ShieldCheck,
  Droplets,
  Shield,
  GraduationCap,
  Apple,
  BadgeCheck,
  Moon,
  Heart,
  DollarSign,
  Smile,
  Clock,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/card';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { ContactCtaBanner } from '@/components/sections/contact-cta';
import { contactInfo } from '@/data/site-config';
import { structuredData, JsonLd } from '@/lib/metadata';

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

// Preventive services data
const preventiveServices = [
  {
    icon: <Droplets className="w-6 h-6" />,
    title: 'Fluoride Treatments',
    description:
      'Professional fluoride applications strengthen tooth enamel and help repair early stages of decay.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Dental Sealants',
    description:
      'Thin protective coatings applied to chewing surfaces of back teeth to prevent cavities.',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Oral Hygiene Education',
    description:
      'Personalized instruction on proper brushing, flossing, and daily care techniques.',
  },
  {
    icon: <Apple className="w-6 h-6" />,
    title: 'Nutritional Counseling',
    description:
      'Expert guidance on diet choices that support healthy teeth and gums.',
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: 'Custom Mouthguards',
    description:
      'Professional sports mouthguards designed to protect teeth during athletic activities.',
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: 'Night Guards',
    description:
      'Custom-fitted guards to protect teeth from grinding and clenching during sleep.',
  },
];

// Benefits data
const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Reduced Risk of Cavities',
    description: 'Proactive treatments significantly lower your chance of developing tooth decay and gum disease.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Early Problem Detection',
    description: 'Regular preventive visits catch issues early when they\'re easier and less costly to treat.',
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Long-Term Savings',
    description: 'Investing in prevention saves money on extensive dental work down the road.',
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: 'Healthier, Beautiful Smile',
    description: 'Maintain the natural beauty and health of your teeth for a lifetime.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Better Overall Health',
    description: 'Good oral health is linked to improved heart health and lower risk of systemic diseases.',
  },
];

// FAQ data
const faqItems = [
  {
    question: 'What are dental sealants and who can benefit from them?',
    answer:
      'Dental sealants are thin protective coatings applied to the chewing surfaces of back teeth (molars and premolars) to prevent cavities. They work by sealing the grooves and pits where food particles and bacteria often get trapped. While sealants are especially beneficial for children when their permanent molars come in, adults with deep grooves in their teeth can also benefit from this simple, painless preventive treatment.',
  },
  {
    question: 'How does professional fluoride treatment protect my teeth?',
    answer:
      'Professional fluoride treatments strengthen tooth enamel and help repair early stages of tooth decay before cavities form. The fluoride concentration in professional treatments is much higher than what\'s found in toothpaste or tap water, providing superior protection. We typically recommend fluoride treatments every 6 months during your regular dental visits, though some patients may benefit from more frequent applications.',
  },
  {
    question: 'How often should I visit for preventive care?',
    answer:
      'Most patients benefit from preventive dental visits every 6 months. However, the ideal frequency depends on your individual oral health needs. Patients with a history of cavities, gum disease, or other risk factors may need more frequent visits. During your examination, we\'ll assess your oral health and recommend a personalized preventive care schedule.',
  },
  {
    question: 'Do I need a custom mouthguard for sports?',
    answer:
      'If you or your child participates in any contact sports or activities with a risk of falls, a custom mouthguard is highly recommended. Custom-fitted mouthguards from your dentist provide significantly better protection than store-bought options because they\'re designed to fit your teeth precisely. They\'re more comfortable, stay in place better, and don\'t interfere with breathing or speaking.',
  },
  {
    question: 'What causes teeth grinding and how can a night guard help?',
    answer:
      'Teeth grinding (bruxism) is often caused by stress, anxiety, sleep disorders, or an abnormal bite. It can lead to worn teeth, jaw pain, headaches, and even cracked teeth. A custom night guard creates a protective barrier between your upper and lower teeth, preventing damage from grinding and clenching. It also helps relax jaw muscles and can reduce associated pain and discomfort.',
  },
];

// Related services
const relatedServices = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Dental Hygiene',
    description: 'Professional teeth cleaning to remove plaque and tartar for optimal oral health.',
    href: '/services/dental-hygiene',
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Routine Checkups',
    description: 'Comprehensive dental exams and checkups to maintain your oral health.',
    href: '/services/routine-checkups',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Gum Therapy',
    description: 'Specialized treatment for gum disease to restore your periodontal health.',
    href: '/services/gum-therapy',
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
  const phoneHref = `tel:${contactInfo.phone}`;
  const formattedPhone = `(${contactInfo.phone.slice(0, 3)}) ${contactInfo.phone.slice(3, 6)}-${contactInfo.phone.slice(6)}`;

  return (
    <main id="main-content" className="min-h-screen">
      {/* Structured Data */}
      <JsonLd data={structuredData.service(serviceData)} />
      <JsonLd data={structuredData.breadcrumb(breadcrumbItems)} />
      <JsonLd data={structuredData.faq(faqItems)} />
      <JsonLd data={structuredData.medicalWebPage({
        name: 'Preventive Dentistry',
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
                    <li className="text-[#722F37] font-medium">Preventive Dentistry</li>
                  </ol>
                </nav>

                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] text-sm font-medium mb-6 animate-fade-in"
                  style={{ animationDelay: '50ms' }}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Protection for Your Whole Family
                </div>

                {/* Headline */}
                <h1
                  className="font-display font-bold tracking-tight text-fluid-4xl sm:text-fluid-5xl lg:text-fluid-6xl text-foreground leading-[1.1] animate-fade-in-up"
                  style={{ animationDelay: '100ms' }}
                >
                  Preventive
                  <br />
                  <span className="text-[#722F37]">Dentistry</span>
                </h1>

                {/* Description */}
                <p
                  className="mt-6 text-fluid-lg text-foreground-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: '200ms' }}
                >
                  Protect your smile before problems start. Our preventive care services—from fluoride
                  treatments and dental sealants to custom mouthguards—help keep your teeth healthy
                  and strong for life.
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
                      src="/images/hygiene/hygiene-05.jpg"
                      alt="Dental hygienist performing preventive care treatment"
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

      {/* Services Grid Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
              Our Preventive <span className="text-[#722F37]">Services</span>
            </h2>
            <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
              We offer comprehensive preventive care to protect your smile at every stage of life.
              From children to seniors, we have solutions tailored to your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {preventiveServices.map((service, index) => (
              <div
                key={service.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-br from-[#722F37]/5 via-primary-100/20 to-transparent rounded-[2rem] -z-10"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hygiene/hygiene-08.jpg"
                  alt="Happy family with healthy smiles after preventive dental care"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display font-bold text-fluid-3xl md:text-fluid-4xl text-foreground">
                Why Choose <span className="text-[#722F37]">Preventive Care?</span>
              </h2>
              <p className="mt-4 text-foreground-secondary text-fluid-base leading-relaxed">
                Prevention is the foundation of good oral health. Regular preventive care not only
                keeps your smile looking great—it helps you avoid costly and uncomfortable dental
                problems in the future.
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
              Your preventive care visit is designed to be comfortable, thorough, and educational.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Comprehensive Exam',
                description:
                  'We examine your teeth, gums, and mouth for any signs of problems or areas of concern.',
              },
              {
                step: '2',
                title: 'Professional Cleaning',
                description:
                  'Our hygienists remove plaque and tartar buildup, then polish your teeth for a fresh feel.',
              },
              {
                step: '3',
                title: 'Preventive Treatments',
                description:
                  'Based on your needs, we apply fluoride, sealants, or fit you for custom guards.',
              },
              {
                step: '4',
                title: 'Personalized Plan',
                description:
                  'We create a tailored home care plan and schedule your next preventive visit.',
              },
            ].map((item, index) => (
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
              Get answers to common questions about preventive dentistry.
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
              Explore other services that complement your preventive care.
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
        headline="Ready to Protect Your Smile?"
        description="Schedule your preventive care appointment today and take the first step toward a lifetime of healthy teeth. Our caring team is here to help your whole family."
        bookText="Book This Service"
        background="gradient"
      />
    </main>
  );
}
