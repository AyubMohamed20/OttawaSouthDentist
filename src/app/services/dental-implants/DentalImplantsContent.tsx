'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Sparkles,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { ServiceCard } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Am I a candidate for dental implants?',
    answer:
      'Most adults with good general health are candidates for dental implants. Adequate jawbone density is needed to support the implant, though bone grafting procedures can help those who have experienced bone loss. During your consultation, we\'ll evaluate your oral health, medical history, and bone structure to determine if implants are right for you.',
  },
  {
    question: 'How long do dental implants last?',
    answer:
      'With proper care and maintenance, dental implants can last a lifetime. The titanium implant post integrates permanently with your jawbone. The crown (visible tooth portion) may need replacement after 10-15 years due to normal wear, but the implant itself is designed to be a permanent solution.',
  },
  {
    question: 'Is the dental implant procedure painful?',
    answer:
      'The implant procedure is performed under local anesthesia, ensuring you feel no pain during the surgery. Most patients report that the procedure is less uncomfortable than they expected. Post-operative discomfort is typically manageable with over-the-counter pain medication and usually subsides within a few days.',
  },
  {
    question: 'How long does the entire implant process take?',
    answer:
      'The complete implant process typically takes 3-6 months from start to finish. After the implant post is placed, a healing period of 3-6 months allows for osseointegration (bone fusion). Once healed, the abutment and crown are placed. Some cases may qualify for same-day implants with immediate loading.',
  },
  {
    question: 'How do I care for my dental implants?',
    answer:
      'Dental implants are easy to maintain—care for them just like your natural teeth. Brush twice daily, floss regularly, and maintain routine dental checkups. While implants cannot develop cavities, the surrounding gum tissue still needs proper care to prevent gum disease and ensure long-term success.',
  },
];

const benefits = [
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Permanent Solution',
    description:
      'Implants can last a lifetime with proper care, unlike dentures or bridges that need replacement.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Natural Look & Feel',
    description:
      'Designed to match your natural teeth in color, shape, and function for a seamless smile.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Preserve Bone Health',
    description:
      'Stimulate the jawbone to prevent bone loss that naturally occurs with missing teeth.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Protect Adjacent Teeth',
    description:
      'Unlike bridges, implants don\'t require altering healthy neighboring teeth for support.',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation & Planning',
    description:
      'Comprehensive assessment including X-rays and 3D imaging to evaluate bone structure and create your personalized treatment plan.',
  },
  {
    step: 2,
    title: 'Implant Placement',
    description:
      'The titanium implant post is surgically placed into your jawbone under local anesthesia. This serves as the root for your new tooth.',
  },
  {
    step: 3,
    title: 'Healing & Integration',
    description:
      'Over 3-6 months, the implant fuses with your jawbone through osseointegration, creating a strong, permanent foundation.',
  },
  {
    step: 4,
    title: 'Abutment Attachment',
    description:
      'Once healed, a connector piece (abutment) is attached to the implant to support your custom crown.',
  },
  {
    step: 5,
    title: 'Crown Placement',
    description:
      'Your custom-made crown is secured to the abutment, completing your restoration with a natural-looking tooth.',
  },
];

const implantTypes = [
  {
    title: 'Single Tooth Implants',
    description: 'Replace individual missing teeth without affecting neighboring teeth.',
  },
  {
    title: 'Multiple Tooth Implants',
    description: 'Restore several teeth with strategically placed implants.',
  },
  {
    title: 'Implant-Supported Bridges',
    description: 'Replace multiple adjacent teeth with implant-anchored bridges.',
  },
  {
    title: 'All-on-4 Dentures',
    description: 'Full arch restoration supported by just four strategically placed implants.',
  },
];

const relatedServices = [
  {
    title: 'Missing Teeth Solutions',
    description:
      'Explore all options for replacing missing teeth, including bridges and dentures.',
    href: '/services/missing-teeth',
    icon: <Check className="w-6 h-6" />,
  },
  {
    title: 'Dental Crowns',
    description:
      'Custom crowns to restore damaged teeth or complete your implant restoration.',
    href: '/services/crowns',
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: 'Routine Checkups',
    description:
      'Regular examinations to maintain your implants and overall oral health.',
    href: '/services/routine-checkups',
    icon: <Shield className="w-6 h-6" />,
  },
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
            <span className="font-semibold text-[#1e293b] pr-4">
              {item.question}
            </span>
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
            <div className="px-6 pb-5 text-[#64748b] leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DentalImplantsContent() {
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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <Breadcrumb
                  items={[
                    { label: 'Services', href: '/services' },
                    { label: 'Dental Implants', href: '/services/dental-implants' },
                  ]}
                  className="mb-6"
                />

                <h1 className="font-display font-bold text-fluid-4xl md:text-fluid-5xl text-[#1e293b] tracking-tight mb-6">
                  Dental Implants
                </h1>

                <p className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl">
                  Restore your smile permanently with dental implants—the gold
                  standard for replacing missing teeth. Natural-looking,
                  long-lasting, and designed to function just like real teeth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                    onClick={() => (window.location.href = '/contact#book')}
                  >
                    Book Consultation
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

              {/* Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-[4/3]">
                  <Image
                    src="/images/implants/implants-08.jpg"
                    alt="Patient smiling with dental implants at Ottawa South Dental"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-soft-lg border border-[#EDE5DD] hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e293b]">
                        Lifetime Solution
                      </p>
                      <p className="text-sm text-[#64748b]">
                        Permanent results
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Why Choose Dental Implants?
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Dental implants offer significant advantages over traditional
              tooth replacement options for a healthier, more confident smile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
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
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-[#1e293b] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Detailed Description Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display font-semibold text-fluid-3xl text-[#1e293b] tracking-tight mb-6">
                The Gold Standard for Missing Teeth
              </h2>

              <div className="space-y-4 text-[#64748b] leading-relaxed">
                <p>
                  Dental implants are the most advanced solution for replacing
                  missing teeth. A dental implant consists of three parts: a
                  titanium implant post that acts as an artificial root, an
                  abutment connector, and a custom crown that looks and functions
                  like your natural tooth.
                </p>

                <p>
                  Unlike dentures or bridges, implants are permanently anchored in
                  your jawbone through a process called osseointegration. This
                  creates an incredibly stable foundation that allows you to eat,
                  speak, and smile with complete confidence—just like you would
                  with natural teeth.
                </p>

                <p>
                  At Ottawa South Dental, we use the latest implant technology and
                  techniques to ensure predictable, long-lasting results. Whether
                  you're missing a single tooth or need full arch restoration,
                  we'll create a personalized treatment plan to restore your
                  smile.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-[#722F37]/5 border border-[#722F37]/10">
                <Shield className="w-8 h-8 text-[#722F37] flex-shrink-0" />
                <p className="text-sm text-[#1e293b]">
                  <span className="font-semibold">Biocompatible Materials:</span>{' '}
                  Our implants use medical-grade titanium that integrates safely
                  with your natural bone structure.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <Image
                  src="/images/implants/implants-14.jpg"
                  alt="Dental implant procedure illustration showing implant components"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Implant Types Section */}
        <SectionContainer background="white" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Implant Solutions for Every Need
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              We offer a full range of implant options to address various tooth
              replacement needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {implantTypes.map((type, index) => (
              <div
                key={index}
                className={[
                  'p-6 rounded-2xl',
                  'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                  'border border-[#EDE5DD]',
                  'transition-all duration-300',
                  'hover:shadow-soft hover:border-[#722F37]/20',
                ].join(' ')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e293b] mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Procedure Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              The Implant Process
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Understanding what to expect at each stage helps ensure a smooth,
              successful implant journey.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {procedureSteps.map((step, index) => (
                <div
                  key={index}
                  className={[
                    'relative p-6 rounded-2xl',
                    'bg-gradient-to-br from-white to-[#FDF8F3]/50',
                    'border border-[#EDE5DD]',
                    'transition-all duration-300',
                    'hover:shadow-soft hover:border-[#722F37]/20',
                    index === procedureSteps.length - 1 && procedureSteps.length % 2 !== 0
                      ? 'md:col-span-2 md:max-w-md md:mx-auto'
                      : '',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#722F37] text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1e293b] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">
                    Healing Time Is Worth the Wait
                  </h3>
                  <p className="text-[#64748b]">
                    The 3-6 month healing period allows your implant to fuse
                    permanently with your jawbone, ensuring exceptional stability
                    and longevity for your restoration.
                  </p>
                </div>
              </div>
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
                Have questions about dental implants? Find answers to common
                questions below.
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

        {/* Related Services Section */}
        <SectionContainer background="secondary" paddingY="lg">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-fluid-3xl md:text-fluid-4xl text-[#1e293b] tracking-tight mb-4">
              Related Services
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              Explore other services that complement your dental implant treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
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
                Ready to Restore Your Smile?
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                Schedule your implant consultation today and discover how dental
                implants can give you a permanent, natural-looking smile you'll
                love.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => (window.location.href = '/contact#book')}
                >
                  Book Consultation
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
